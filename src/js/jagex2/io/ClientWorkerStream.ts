import LinkList from '../datastruct/LinkList';
import Linkable from '../datastruct/Linkable';

export default class ClientWorkerStream {
    // constructor
    private readonly worker: Worker;
    private readonly wwin: WorkerReader;
    private readonly wwout: WorkerWriter;

    // runtime
    private closed: boolean = false;
    private ioerror: boolean = false;

    constructor() {
        this.worker = new Worker('worker.js', {type: 'module'});
        this.wwin = new WorkerReader(this.worker, 5000);
        this.wwout = new WorkerWriter(this.worker, 5000);
    }

    get available(): number {
        return this.closed ? 0 : this.wwin.available;
    }

    write(src: Uint8Array, len: number): void {
        this.wwout.write(src, len);
    }

    async read(): Promise<number> {
        return this.closed ? 0 : this.wwin.fastByte() ?? (await this.wwin.slowByte());
    }

    async readBytes(dst: Uint8Array, off: number, len: number): Promise<void> {
        if (this.closed) {
            return;
        }
        while (len > 0) {
            const read: Uint8Array = this.wwin.fastBytes(dst, off, len) ?? (await this.wwin.slowBytes(dst, off, len));
            if (read.length <= 0) {
                throw new Error('EOF');
            }
            off += read.length;
            len -= read.length;
        }
    }

    close(): void {
        this.closed = true;
        this.worker.terminate();
        this.wwin.close();
        this.wwout.close();
        console.log('connection close!');
        if (this.ioerror) {
            console.log('connection error!');
        }
    }
}

class WorkerWriter {
    // constructor
    private readonly worker: Worker;
    private readonly limit: number;

    private closed: boolean = false;
    private ioerror: boolean = false;

    constructor(socket: Worker, limit: number) {
        this.worker = socket;
        this.limit = limit;
    }

    write(src: Uint8Array, len: number): void {
        if (this.closed) {
            return;
        }
        if (this.ioerror) {
            this.ioerror = false;
            throw new Error('Error in writer thread');
        }
        if (len > this.limit || src.length > this.limit) {
            throw new Error('buffer overflow');
        }
        try {
            this.worker.postMessage(src.subarray(0, len));
        } catch (e) {
            this.ioerror = true;
        }
    }

    close(): void {
        this.closed = true;
    }
}

class WorkerEvent extends Linkable {
    private readonly bytes: Uint8Array;
    private position: number;

    constructor(bytes: Uint8Array) {
        super();
        this.bytes = bytes;
        this.position = 0;
    }

    get available(): number {
        return this.bytes.length - this.position;
    }

    get read(): number {
        return this.bytes[this.position++];
    }

    get len(): number {
        return this.bytes.length;
    }
}

class WorkerReader {
    // constructor
    private readonly limit: number;

    // runtime
    private queue: LinkList = new LinkList();
    private event: WorkerEvent | null = null;
    private callback: ((data: WorkerEvent | null) => void) | null = null;
    private total: number = 0;
    private closed: boolean = false;

    constructor(worker: Worker, limit: number) {
        this.limit = limit;
        worker.onmessage = this.onmessage;
    }

    get available(): number {
        return this.total;
    }

    private onmessage = (e: MessageEvent): void => {
        switch (e.data.type) {
            case 'save': {
                const a: HTMLAnchorElement = document.createElement('a');
                a.href = e.data.value;
                a.download = e.data.path.split('/').pop();
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(e.data.value);
                break;
            }
            default: {
                if (this.closed) {
                    throw new Error('WorkerReader is closed!');
                }
                const event: WorkerEvent = new WorkerEvent(new Uint8Array(e.data));
                if (this.event) {
                    this.queue.addTail(event);
                } else {
                    this.event = event;
                }
                this.total += event.len;
                if (!this.callback) {
                    return;
                }
                this.callback(this.event);
                this.callback = null;
                // check for the overflow after the callback
                if (this.total > this.limit) {
                    throw new Error('buffer overflow');
                }
                break;
            }
        }
    };

    private readFastByte(): number | null {
        if (this.event && this.event.available > 0) {
            return this.event.read;
        }
        return null;
    }

    private async readSlowByte(len: number): Promise<number> {
        this.event = this.queue.removeHead() as WorkerEvent | null;
        while (this.total < len) {
            await new Promise((resolve): ((value: PromiseLike<((data: WorkerEvent | null) => void) | null>) => void) => (this.callback = resolve));
        }
        return this.event ? this.event.read : this.readSlowByte(len);
    }

    fastBytes(dst: Uint8Array, off: number, len: number): Uint8Array | null {
        if (this.closed) {
            throw new Error('WorkerReader is closed!');
        }
        if (!(this.event && this.event.available >= len)) {
            return null;
        }
        while (len > 0) {
            const fast: number | null = this.readFastByte();
            if (fast === null) {
                throw new Error('EOF - tried to read a fast byte when there was not enough immediate bytes.');
            }
            dst[off++] = fast;
            this.total--;
            len--;
        }
        return dst;
    }

    async slowBytes(dst: Uint8Array, off: number, len: number): Promise<Uint8Array> {
        if (this.closed) {
            throw new Error('WorkerReader is closed!');
        }
        while (len > 0) {
            dst[off++] = this.readFastByte() ?? (await this.readSlowByte(len));
            this.total--;
            len--;
        }
        return dst;
    }

    fastByte(): number | null {
        if (this.closed) {
            throw new Error('WorkerReader is closed!');
        }
        const fast: number | null = this.readFastByte();
        if (fast === null) {
            return null;
        }
        this.total--;
        return fast;
    }

    async slowByte(): Promise<number> {
        if (this.closed) {
            throw new Error('WorkerReader is closed!');
        }
        const slow: number = await this.readSlowByte(1);
        this.total--;
        return slow;
    }

    close(): void {
        this.closed = true;
        this.callback = null;
        this.total = 0;
        this.event = null;
        this.queue.clear();
    }
}
