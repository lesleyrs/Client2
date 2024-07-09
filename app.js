var __require = (x =>
    typeof require !== 'undefined'
        ? require
        : typeof Proxy !== 'undefined'
          ? new Proxy(x, {
                get: (a, b) => (typeof require !== 'undefined' ? require : a)[b]
            })
          : x)(function (x) {
    if (typeof require !== 'undefined') return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
});

// node_modules/kleur/index.mjs
var run = function (arr, str) {
    let i = 0,
        tmp,
        beg = '',
        end = '';
    for (; i < arr.length; i++) {
        tmp = arr[i];
        beg += tmp.open;
        end += tmp.close;
        if (!!~str.indexOf(tmp.close)) {
            str = str.replace(tmp.rgx, tmp.close + tmp.open);
        }
    }
    return beg + str + end;
};
var chain = function (has, keys) {
    let ctx = {has, keys};
    ctx.reset = $.reset.bind(ctx);
    ctx.bold = $.bold.bind(ctx);
    ctx.dim = $.dim.bind(ctx);
    ctx.italic = $.italic.bind(ctx);
    ctx.underline = $.underline.bind(ctx);
    ctx.inverse = $.inverse.bind(ctx);
    ctx.hidden = $.hidden.bind(ctx);
    ctx.strikethrough = $.strikethrough.bind(ctx);
    ctx.black = $.black.bind(ctx);
    ctx.red = $.red.bind(ctx);
    ctx.green = $.green.bind(ctx);
    ctx.yellow = $.yellow.bind(ctx);
    ctx.blue = $.blue.bind(ctx);
    ctx.magenta = $.magenta.bind(ctx);
    ctx.cyan = $.cyan.bind(ctx);
    ctx.white = $.white.bind(ctx);
    ctx.gray = $.gray.bind(ctx);
    ctx.grey = $.grey.bind(ctx);
    ctx.bgBlack = $.bgBlack.bind(ctx);
    ctx.bgRed = $.bgRed.bind(ctx);
    ctx.bgGreen = $.bgGreen.bind(ctx);
    ctx.bgYellow = $.bgYellow.bind(ctx);
    ctx.bgBlue = $.bgBlue.bind(ctx);
    ctx.bgMagenta = $.bgMagenta.bind(ctx);
    ctx.bgCyan = $.bgCyan.bind(ctx);
    ctx.bgWhite = $.bgWhite.bind(ctx);
    return ctx;
};
var init = function (open, close) {
    let blk = {
        open: `\x1B[${open}m`,
        close: `\x1B[${close}m`,
        rgx: new RegExp(`\\x1b\\[${close}m`, 'g')
    };
    return function (txt) {
        if (this !== undefined && this.has !== undefined) {
            !!~this.has.indexOf(open) || (this.has.push(open), this.keys.push(blk));
            return txt === undefined ? this : $.enabled ? run(this.keys, txt + '') : txt + '';
        }
        return txt === undefined ? chain([open], [blk]) : $.enabled ? run([blk], txt + '') : txt + '';
    };
};
var FORCE_COLOR;
var NODE_DISABLE_COLORS;
var NO_COLOR;
var TERM;
var isTTY = true;
if (typeof process !== 'undefined') {
    ({FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM} = process.env || {});
    isTTY = process.stdout && process.stdout.isTTY;
}
var $ = {
    enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== 'dumb' && ((FORCE_COLOR != null && FORCE_COLOR !== '0') || isTTY),
    reset: init(0, 0),
    bold: init(1, 22),
    dim: init(2, 22),
    italic: init(3, 23),
    underline: init(4, 24),
    inverse: init(7, 27),
    hidden: init(8, 28),
    strikethrough: init(9, 29),
    black: init(30, 39),
    red: init(31, 39),
    green: init(32, 39),
    yellow: init(33, 39),
    blue: init(34, 39),
    magenta: init(35, 39),
    cyan: init(36, 39),
    white: init(37, 39),
    gray: init(90, 39),
    grey: init(90, 39),
    bgBlack: init(40, 49),
    bgRed: init(41, 49),
    bgGreen: init(42, 49),
    bgYellow: init(43, 49),
    bgBlue: init(44, 49),
    bgMagenta: init(45, 49),
    bgCyan: init(46, 49),
    bgWhite: init(47, 49)
};
var kleur_default = $;

// src/jagex2/jstring/JString.ts
function toBase37(string) {
    string = string.trim();
    let l = 0n;
    for (let i = 0; i < string.length && i < 12; i++) {
        const c = string.charCodeAt(i);
        l *= 37n;
        if (c >= 65 && c <= 90) {
            l += BigInt(c + 1 - 65);
        } else if (c >= 97 && c <= 122) {
            l += BigInt(c + 1 - 97);
        } else if (c >= 48 && c <= 57) {
            l += BigInt(c + 27 - 48);
        }
    }
    return l;
}
function fromBase37(value) {
    if (value < 0n || value >= 6582952005840035281n) {
        return 'invalid_name';
    }
    if (value % 37n === 0n) {
        return 'invalid_name';
    }
    let len = 0;
    const chars = Array(12);
    while (value !== 0n) {
        const l1 = value;
        value /= 37n;
        chars[11 - len++] = BASE37_LOOKUP[Number(l1 - value * 37n)];
    }
    return chars.slice(12 - len).join('');
}
function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
function toSafeName(name) {
    return fromBase37(toBase37(name));
}
function toDisplayName(name) {
    return toTitleCase(toSafeName(name).replaceAll('_', ' '));
}
var BASE37_LOOKUP = ['_', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// src/jagex2/datastruct/Linkable.ts
class Linkable {
    key;
    next;
    prev;
    constructor() {
        this.key = 0n;
        this.next = this;
        this.prev = this;
    }
    unlink() {
        if (!this.prev || !this.next) {
            return;
        }
        this.prev.next = this.next;
        this.next.prev = this.prev;
        this.next = null;
        this.prev = null;
    }
}

// src/jagex2/datastruct/LinkList.ts
class LinkList {
    sentinel;
    cursor = null;
    constructor() {
        const head = new Linkable();
        head.next = head;
        head.prev = head;
        this.sentinel = head;
    }
    addTail(node) {
        if (node.prev) {
            node.unlink();
        }
        node.prev = this.sentinel.prev;
        node.next = this.sentinel;
        if (node.prev) {
            node.prev.next = node;
        }
        node.next.prev = node;
    }
    addHead(node) {
        if (node.prev) {
            node.unlink();
        }
        node.prev = this.sentinel;
        node.next = this.sentinel.next;
        node.prev.next = node;
        if (node.next) {
            node.next.prev = node;
        }
    }
    removeHead() {
        const node = this.sentinel.next;
        if (node === this.sentinel) {
            return null;
        }
        node?.unlink();
        return node;
    }
    head() {
        const node = this.sentinel.next;
        if (node === this.sentinel) {
            this.cursor = null;
            return null;
        }
        this.cursor = node?.next || null;
        return node;
    }
    tail() {
        const node = this.sentinel.prev;
        if (node === this.sentinel) {
            this.cursor = null;
            return null;
        }
        this.cursor = node?.prev || null;
        return node;
    }
    next() {
        const node = this.cursor;
        if (node === this.sentinel) {
            this.cursor = null;
            return null;
        }
        this.cursor = node?.next || null;
        return node;
    }
    prev() {
        const node = this.cursor;
        if (node === this.sentinel) {
            this.cursor = null;
            return null;
        }
        this.cursor = node?.prev || null;
        return node;
    }
    clear() {
        while (true) {
            const node = this.sentinel.next;
            if (node === this.sentinel) {
                return;
            }
            node?.unlink();
        }
    }
}

// src/jagex2/datastruct/Hashable.ts
class Hashable extends Linkable {
    nextHashable;
    prevHashable;
    constructor() {
        super();
        this.nextHashable = this;
        this.prevHashable = this;
    }
    uncache() {
        if (!this.prevHashable || !this.nextHashable) {
            return;
        }
        this.prevHashable.nextHashable = this.nextHashable;
        this.nextHashable.prevHashable = this.prevHashable;
        this.nextHashable = null;
        this.prevHashable = null;
    }
}

// src/jagex2/io/Packet.ts
class Packet extends Hashable {
    static crctable = new Int32Array(256);
    static bitmask = new Uint32Array(33);
    static crc32b = 3988292384;
    static {
        for (let i = 0; i < 32; i++) {
            this.bitmask[i] = (1 << i) - 1;
        }
        this.bitmask[32] = 4294967295;
        for (let b = 0; b < 256; b++) {
            let remainder = b;
            for (let bit = 0; bit < 8; bit++) {
                if ((remainder & 1) == 1) {
                    remainder = (remainder >>> 1) ^ this.crc32b;
                } else {
                    remainder >>>= 1;
                }
            }
            this.crctable[b] = remainder;
        }
    }
    static getcrc(src, offset, length) {
        let crc = 4294967295;
        for (let i = offset; i < length; i++) {
            crc = (crc >>> 8) ^ this.crctable[(crc ^ src[i]) & 255];
        }
        return ~crc;
    }
    static checkcrc(src, offset, length, expected = 0) {
        const checksum = Packet.getcrc(src, offset, length);
        return checksum == expected;
    }
    static alloc(type) {
        let packet = null;
        if (type === 0 && this.cacheMinCount > 0) {
            packet = this.cacheMin.removeHead();
            this.cacheMinCount--;
        } else if (type === 1 && this.cacheMidCount > 0) {
            packet = this.cacheMid.removeHead();
            this.cacheMidCount--;
        } else if (type === 2 && this.cacheMaxCount > 0) {
            packet = this.cacheMax.removeHead();
            this.cacheMaxCount--;
        } else if (type === 3 && this.cacheBigCount > 0) {
            packet = this.cacheBig.removeHead();
            this.cacheBigCount--;
        } else if (type === 4 && this.cacheHugeCount > 0) {
            packet = this.cacheHuge.removeHead();
            this.cacheHugeCount--;
        } else if (type === 5 && this.cacheUnimaginableCount > 0) {
            packet = this.cacheUnimaginable.removeHead();
            this.cacheUnimaginableCount--;
        }
        if (packet !== null) {
            packet.pos = 0;
            packet.bitPos = 0;
            return packet;
        }
        if (type === 0) {
            return new Packet(new Uint8Array(100));
        } else if (type === 1) {
            return new Packet(new Uint8Array(5000));
        } else if (type === 2) {
            return new Packet(new Uint8Array(30000));
        } else if (type === 3) {
            return new Packet(new Uint8Array(1e5));
        } else if (type === 4) {
            return new Packet(new Uint8Array(500000));
        } else if (type === 5) {
            return new Packet(new Uint8Array(2000000));
        } else {
            return new Packet(new Uint8Array(type));
        }
    }
    static async load(path, seekToEnd = false) {
        const packet = new Packet(new Uint8Array(await (await fetch(path)).arrayBuffer()));
        if (seekToEnd) {
            packet.pos = packet.data.length;
        }
        return packet;
    }
    static cacheMinCount = 0;
    static cacheMidCount = 0;
    static cacheMaxCount = 0;
    static cacheBigCount = 0;
    static cacheHugeCount = 0;
    static cacheUnimaginableCount = 0;
    static cacheMin = new LinkList();
    static cacheMid = new LinkList();
    static cacheMax = new LinkList();
    static cacheBig = new LinkList();
    static cacheHuge = new LinkList();
    static cacheUnimaginable = new LinkList();
    data;
    #view;
    pos;
    bitPos;
    constructor(src) {
        super();
        this.data = src;
        this.#view = new DataView(this.data.buffer);
        this.pos = 0;
        this.bitPos = 0;
    }
    get available() {
        return this.data.length - this.pos;
    }
    get length() {
        return this.data.length;
    }
    release() {
        this.pos = 0;
        this.bitPos = 0;
        if (this.data.length === 100 && Packet.cacheMinCount < 1000) {
            Packet.cacheMin.addTail(this);
            Packet.cacheMinCount++;
        } else if (this.data.length === 5000 && Packet.cacheMidCount < 250) {
            Packet.cacheMid.addTail(this);
            Packet.cacheMidCount++;
        } else if (this.data.length === 30000 && Packet.cacheMaxCount < 50) {
            Packet.cacheMax.addTail(this);
            Packet.cacheMaxCount++;
        } else if (this.data.length === 1e5 && Packet.cacheBigCount < 10) {
            Packet.cacheBig.addTail(this);
            Packet.cacheBigCount++;
        } else if (this.data.length === 500000 && Packet.cacheHugeCount < 5) {
            Packet.cacheHuge.addTail(this);
            Packet.cacheHugeCount++;
        } else if (this.data.length === 2000000 && Packet.cacheUnimaginableCount < 2) {
            Packet.cacheUnimaginable.addTail(this);
            Packet.cacheUnimaginableCount++;
        }
    }
    p1(value) {
        this.#view.setUint8(this.pos++, value);
    }
    p2(value) {
        this.#view.setUint16(this.pos, value);
        this.pos += 2;
    }
    ip2(value) {
        this.#view.setUint16(this.pos, value, true);
        this.pos += 2;
    }
    p3(value) {
        this.#view.setUint8(this.pos++, value >> 16);
        this.#view.setUint16(this.pos, value);
        this.pos += 2;
    }
    p4(value) {
        this.#view.setInt32(this.pos, value);
        this.pos += 4;
    }
    ip4(value) {
        this.#view.setInt32(this.pos, value, true);
        this.pos += 4;
    }
    p8(value) {
        this.#view.setBigInt64(this.pos, value);
        this.pos += 8;
    }
    pbool(value) {
        this.p1(value ? 1 : 0);
    }
    pjstr(str, terminator = 10) {
        const length = str.length;
        for (let i = 0; i < length; i++) {
            this.#view.setUint8(this.pos++, str.charCodeAt(i));
        }
        this.#view.setUint8(this.pos++, terminator);
    }
    pdata(src, offset, length) {
        this.data.set(src.subarray(offset, offset + length), this.pos);
        this.pos += length - offset;
    }
    psize4(size) {
        this.#view.setUint32(this.pos - size - 4, size);
    }
    psize2(size) {
        this.#view.setUint16(this.pos - size - 2, size);
    }
    psize1(size) {
        this.#view.setUint8(this.pos - size - 1, size);
    }
    psmarts(value) {
        if (value < 64 && value >= 64) {
            this.p1(value + 64);
        } else if (value < 16384 && value >= -16384) {
            this.p2(value + 49152);
        } else {
            throw new Error('Error psmarts out of range: ' + value);
        }
    }
    psmart(value) {
        if (value >= 0 && value < 128) {
            this.p1(value);
        } else if (value >= 0 && value < 32768) {
            this.p2(value + 32768);
        } else {
            throw new Error('Error psmart out of range: ' + value);
        }
    }
    g1() {
        return this.#view.getUint8(this.pos++);
    }
    g1b() {
        return this.#view.getInt8(this.pos++);
    }
    g2() {
        this.pos += 2;
        return this.#view.getUint16(this.pos - 2);
    }
    g2s() {
        this.pos += 2;
        return this.#view.getInt16(this.pos - 2);
    }
    ig2() {
        this.pos += 2;
        return this.#view.getUint16(this.pos - 2, true);
    }
    g3() {
        const result = (this.#view.getUint8(this.pos++) << 16) | this.#view.getUint16(this.pos);
        this.pos += 2;
        return result;
    }
    g4() {
        this.pos += 4;
        return this.#view.getInt32(this.pos - 4);
    }
    ig4() {
        this.pos += 4;
        return this.#view.getInt32(this.pos - 4, true);
    }
    g8() {
        this.pos += 8;
        return this.#view.getBigInt64(this.pos - 8);
    }
    gbool() {
        return this.g1() === 1;
    }
    gjstr(terminator = 10) {
        const length = this.data.length;
        let str = '';
        let b;
        while ((b = this.#view.getUint8(this.pos++)) !== terminator && this.pos < length) {
            str += String.fromCharCode(b);
        }
        return str;
    }
    gdata(dest, offset, length) {
        dest.set(this.data.subarray(this.pos, this.pos + length), offset);
        this.pos += length;
    }
    gsmarts() {
        return this.#view.getUint8(this.pos) < 128 ? this.g1() - 64 : this.g2() - 49152;
    }
    gsmart() {
        return this.#view.getUint8(this.pos) < 128 ? this.g1() : this.g2() - 32768;
    }
    bits() {
        this.bitPos = this.pos << 3;
    }
    bytes() {
        this.pos = (this.bitPos + 7) >>> 3;
    }
    gBit(n) {
        let bytePos = this.bitPos >>> 3;
        let remaining = 8 - (this.bitPos & 7);
        let value = 0;
        this.bitPos += n;
        for (; n > remaining; remaining = 8) {
            value += (this.#view.getUint8(bytePos++) & Packet.bitmask[remaining]) << (n - remaining);
            n -= remaining;
        }
        if (n == remaining) {
            value += this.#view.getUint8(bytePos) & Packet.bitmask[remaining];
        } else {
            value += (this.#view.getUint8(bytePos) >>> (remaining - n)) & Packet.bitmask[n];
        }
        return value;
    }
    pBit(n, value) {
        const pos = this.bitPos;
        this.bitPos += n;
        let bytePos = pos >>> 3;
        let remaining = 8 - (pos & 7);
        const view = this.#view;
        for (; n > remaining; remaining = 8) {
            const shift2 = (1 << remaining) - 1;
            const byte2 = view.getUint8(bytePos);
            view.setUint8(bytePos++, (byte2 & ~shift2) | ((value >>> (n - remaining)) & shift2));
            n -= remaining;
        }
        const r = remaining - n;
        const shift = (1 << n) - 1;
        const byte = view.getUint8(bytePos);
        view.setUint8(bytePos, (byte & (~shift << r)) | ((value & shift) << r));
    }
}

// src/lostcity/cache/config/ConfigType.ts
class ConfigType {
    id;
    debugname = null;
    constructor(id) {
        this.id = id;
    }
    decodeType(dat) {
        while (dat.available > 0) {
            const code = dat.g1();
            if (code === 0) {
                break;
            }
            this.decode(code, dat);
        }
    }
}

// src/lostcity/cache/config/CategoryType.ts
class CategoryType extends ConfigType {
    static configNames = new Map();
    static configs = [];
    static async load(dir) {
        CategoryType.configNames = new Map();
        CategoryType.configs = [];
        if (!(await fetch(`${dir}/server/category.dat`)).ok) {
            console.log('Warning: No category.dat found.');
            return;
        }
        const dat = await Packet.load(`${dir}/server/category.dat`);
        const count = dat.g2();
        for (let id = 0; id < count; id++) {
            const config = new CategoryType(id);
            config.decodeType(dat);
            CategoryType.configs[id] = config;
            if (config.debugname) {
                CategoryType.configNames.set(config.debugname, id);
            }
        }
    }
    static get(id) {
        return CategoryType.configs[id];
    }
    static getId(name) {
        return CategoryType.configNames.get(name) ?? -1;
    }
    static getByName(name) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }
        return this.get(id);
    }
    static get count() {
        return this.configs.length;
    }
    decode(code, dat) {
        this.debugname = dat.gjstr();
    }
    toString() {
        return this.debugname ?? `category_${this.id}`;
    }
}

// src/lostcity/cache/config/ScriptVarType.ts
class ScriptVarType {
    static INT = 105;
    static AUTOINT = 255;
    static STRING = 115;
    static ENUM = 103;
    static OBJ = 111;
    static LOC = 108;
    static COMPONENT = 73;
    static NAMEDOBJ = 79;
    static STRUCT = 74;
    static BOOLEAN = 49;
    static COORD = 99;
    static CATEGORY = 121;
    static SPOTANIM = 116;
    static NPC = 110;
    static INV = 118;
    static SYNTH = 80;
    static SEQ = 65;
    static STAT = 83;
    static VARP = 86;
    static PLAYER_UID = 112;
    static NPC_UID = 78;
    static INTERFACE = 97;
    static NPC_STAT = 254;
    static IDKIT = 75;
    static getType(type) {
        switch (type) {
            case ScriptVarType.INT:
                return 'int';
            case ScriptVarType.STRING:
                return 'string';
            case ScriptVarType.ENUM:
                return 'enum';
            case ScriptVarType.OBJ:
                return 'obj';
            case ScriptVarType.LOC:
                return 'loc';
            case ScriptVarType.COMPONENT:
                return 'component';
            case ScriptVarType.NAMEDOBJ:
                return 'namedobj';
            case ScriptVarType.STRUCT:
                return 'struct';
            case ScriptVarType.BOOLEAN:
                return 'boolean';
            case ScriptVarType.COORD:
                return 'coord';
            case ScriptVarType.CATEGORY:
                return 'category';
            case ScriptVarType.SPOTANIM:
                return 'spotanim';
            case ScriptVarType.NPC:
                return 'npc';
            case ScriptVarType.INV:
                return 'inv';
            case ScriptVarType.SYNTH:
                return 'synth';
            case ScriptVarType.SEQ:
                return 'seq';
            case ScriptVarType.STAT:
                return 'stat';
            case ScriptVarType.AUTOINT:
                return 'autoint';
            case ScriptVarType.VARP:
                return 'varp';
            case ScriptVarType.PLAYER_UID:
                return 'player_uid';
            case ScriptVarType.NPC_UID:
                return 'npc_uid';
            case ScriptVarType.INTERFACE:
                return 'interface';
            case ScriptVarType.NPC_STAT:
                return 'npc_stat';
            case ScriptVarType.IDKIT:
                return 'idkit';
            default:
                return 'unknown';
        }
    }
    static getTypeChar(type) {
        let char = 'i';
        switch (type) {
            case 'int':
                char = 'i';
                break;
            case 'autoint':
                char = '\xFF';
                break;
            case 'string':
                char = 's';
                break;
            case 'enum':
                char = 'g';
                break;
            case 'obj':
                char = 'o';
                break;
            case 'loc':
                char = 'l';
                break;
            case 'component':
                char = 'I';
                break;
            case 'namedobj':
                char = 'O';
                break;
            case 'struct':
                char = 'J';
                break;
            case 'boolean':
                char = '1';
                break;
            case 'coord':
                char = 'c';
                break;
            case 'category':
                char = 'y';
                break;
            case 'spotanim':
                char = 't';
                break;
            case 'npc':
                char = 'n';
                break;
            case 'inv':
                char = 'v';
                break;
            case 'synth':
                char = 'P';
                break;
            case 'seq':
                char = 'A';
                break;
            case 'stat':
                char = 'S';
                break;
            case 'varp':
                char = 'V';
                break;
            case 'player_uid':
                char = 'p';
                break;
            case 'npc_uid':
                char = 'N';
                break;
            case 'interface':
                char = 'a';
                break;
            case 'npc_stat':
                char = '\xFE';
                break;
            case 'idkit':
                char = 'K';
                break;
            default:
                return null;
        }
        return char.charCodeAt(0);
    }
    static getDefault(type) {
        if (type === ScriptVarType.STRING) {
            return '';
        } else if (type === ScriptVarType.BOOLEAN) {
            return 0;
        } else {
            return -1;
        }
    }
}

// src/lostcity/cache/config/DbTableType.ts
class DbTableType extends ConfigType {
    static configNames = new Map();
    static configs = [];
    static async load(dir) {
        DbTableType.configNames = new Map();
        DbTableType.configs = [];
        if (!(await fetch(`${dir}/server/dbtable.dat`)).ok) {
            console.log('Warning: No dbtable.dat found.');
            return;
        }
        const dat = await Packet.load(`${dir}/server/dbtable.dat`);
        const count = dat.g2();
        for (let id = 0; id < count; id++) {
            const config = new DbTableType(id);
            config.decodeType(dat);
            DbTableType.configs[id] = config;
            if (config.debugname) {
                DbTableType.configNames.set(config.debugname, id);
            }
        }
    }
    static get(id) {
        return DbTableType.configs[id];
    }
    static getId(name) {
        return DbTableType.configNames.get(name) ?? -1;
    }
    static getByName(name) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }
        return this.get(id);
    }
    static get count() {
        return this.configs.length;
    }
    types = [];
    defaultValues = [];
    columnNames = [];
    decode(code, dat) {
        if (code === 1) {
            this.types = new Array(dat.g1());
            for (let setting = dat.g1(); setting != 255; setting = dat.g1()) {
                const column = setting & 127;
                const hasDefault = (setting & 128) !== 0;
                const columnTypes = new Array(dat.g1());
                for (let i = 0; i < columnTypes.length; i++) {
                    columnTypes[i] = dat.g1();
                }
                this.types[column] = columnTypes;
                if (hasDefault) {
                    if (!this.defaultValues) {
                        this.defaultValues = new Array(this.types.length);
                    }
                    this.defaultValues[column] = this.decodeValues(dat, column);
                }
            }
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else if (code === 251) {
            this.columnNames = new Array(dat.g1());
            for (let i = 0; i < this.columnNames.length; i++) {
                this.columnNames[i] = dat.gjstr();
            }
        } else {
            throw new Error(`Unrecognized dbtable config code: ${code}`);
        }
    }
    getDefault(column) {
        if (!this.defaultValues[column]) {
            const defaults = [];
            for (let i = 0; i < this.types[column].length; i++) {
                defaults[i] = ScriptVarType.getDefault(this.types[column][i]);
            }
            return defaults;
        }
        return this.defaultValues[column];
    }
    decodeValues(dat, column) {
        const types = this.types[column];
        const fieldCount = dat.g1();
        const values = new Array(fieldCount * types.length);
        for (let fieldId = 0; fieldId < fieldCount; fieldId++) {
            for (let typeId = 0; typeId < types.length; typeId++) {
                const type = types[typeId];
                const index = typeId + fieldId * types.length;
                if (type === ScriptVarType.STRING) {
                    values[index] = dat.gjstr();
                } else {
                    values[index] = dat.g4();
                }
            }
        }
        return values;
    }
}

// src/lostcity/cache/config/DbRowType.ts
class DbRowType extends ConfigType {
    static configNames = new Map();
    static configs = [];
    static async load(dir) {
        DbRowType.configNames = new Map();
        DbRowType.configs = [];
        if (!(await fetch(`${dir}/server/dbrow.dat`)).ok) {
            console.log('Warning: No dbrow.dat found.');
            return;
        }
        const dat = await Packet.load(`${dir}/server/dbrow.dat`);
        const count = dat.g2();
        for (let id = 0; id < count; id++) {
            const config = new DbRowType(id);
            config.decodeType(dat);
            DbRowType.configs[id] = config;
            if (config.debugname) {
                DbRowType.configNames.set(config.debugname, id);
            }
        }
    }
    static get(id) {
        return DbRowType.configs[id];
    }
    static getId(name) {
        return DbRowType.configNames.get(name) ?? -1;
    }
    static getByName(name) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }
        return this.get(id);
    }
    static get count() {
        return this.configs.length;
    }
    static getInTable(tableId) {
        return DbRowType.configs.filter(config => config.tableId === tableId);
    }
    tableId = 0;
    types = [];
    columnValues = [];
    decode(code, dat) {
        if (code === 3) {
            const numColumns = dat.g1();
            this.types = new Array(numColumns);
            this.columnValues = new Array(numColumns);
            for (let columnId = dat.g1(); columnId != 255; columnId = dat.g1()) {
                const columnTypes = new Array(dat.g1());
                for (let i = 0; i < columnTypes.length; i++) {
                    columnTypes[i] = dat.g1();
                }
                this.types[columnId] = columnTypes;
                this.columnValues[columnId] = this.decodeValues(dat, columnId);
            }
        } else if (code === 4) {
            this.tableId = dat.g2();
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            throw new Error(`Unrecognized dbtable config code: ${code}`);
        }
    }
    getValue(column, listIndex) {
        const value = this.columnValues[column].slice(listIndex * this.types[column].length, (listIndex + 1) * this.types[column].length);
        if (!value.length) {
            return DbTableType.get(this.tableId).getDefault(column);
        }
        return value;
    }
    decodeValues(dat, column) {
        const types = this.types[column];
        const fieldCount = dat.g1();
        const values = new Array(fieldCount * types.length);
        for (let fieldId = 0; fieldId < fieldCount; fieldId++) {
            for (let typeId = 0; typeId < types.length; typeId++) {
                const type = types[typeId];
                const index = typeId + fieldId * types.length;
                if (type === ScriptVarType.STRING) {
                    values[index] = dat.gjstr();
                } else {
                    values[index] = dat.g4();
                }
            }
        }
        return values;
    }
}

// src/lostcity/cache/config/EnumType.ts
class EnumType extends ConfigType {
    static configNames = new Map();
    static configs = [];
    static async load(dir) {
        EnumType.configNames = new Map();
        EnumType.configs = [];
        if (!(await fetch(`${dir}/server/enum.dat`)).ok) {
            console.log('Warning: No enum.dat found.');
            return;
        }
        const dat = await Packet.load(`${dir}/server/enum.dat`);
        const count = dat.g2();
        for (let id = 0; id < count; id++) {
            const config = new EnumType(id);
            config.decodeType(dat);
            EnumType.configs[id] = config;
            if (config.debugname) {
                EnumType.configNames.set(config.debugname, id);
            }
        }
    }
    static get(id) {
        return EnumType.configs[id];
    }
    static getId(name) {
        return EnumType.configNames.get(name) ?? -1;
    }
    static getByName(name) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }
        return this.get(id);
    }
    static get count() {
        return this.configs.length;
    }
    inputtype = ScriptVarType.INT;
    outputtype = ScriptVarType.INT;
    defaultInt = 0;
    defaultString = 'null';
    values = new Map();
    decode(code, dat) {
        if (code === 1) {
            this.inputtype = dat.g1();
        } else if (code === 2) {
            this.outputtype = dat.g1();
        } else if (code === 3) {
            this.defaultString = dat.gjstr();
        } else if (code === 4) {
            this.defaultInt = dat.g4();
        } else if (code === 5) {
            const count = dat.g2();
            for (let i = 0; i < count; i++) {
                this.values.set(dat.g4(), dat.gjstr());
            }
        } else if (code === 6) {
            const count = dat.g2();
            for (let i = 0; i < count; i++) {
                this.values.set(dat.g4(), dat.g4());
            }
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            throw new Error(`Unrecognized enum config code: ${code}`);
        }
    }
}

// src/3rdparty/bz2.js
async function instantiate(module, imports = {}) {
    const adaptedImports = {
        env: Object.assign(Object.create(globalThis), imports.env || {}, {
            abort(message, fileName, lineNumber, columnNumber) {
                message = __liftString(message >>> 0);
                fileName = __liftString(fileName >>> 0);
                lineNumber = lineNumber >>> 0;
                columnNumber = columnNumber >>> 0;
                (() => {
                    throw Error(`${message} in ${fileName}:${lineNumber}:${columnNumber}`);
                })();
            }
        })
    };
    const {exports} = await WebAssembly.instantiate(module, adaptedImports);
    const memory = exports.memory || imports.env.memory;
    const adaptedExports = Object.setPrototypeOf(
        {
            read(length, stream, avail_in, next_in) {
                stream = __lowerStaticArray(__setU8, 6, 0, stream, Int8Array) || __notnull();
                return __liftStaticArray(__getI8, 0, exports.read(length, stream, avail_in, next_in) >>> 0);
            }
        },
        exports
    );
    function __liftString(pointer) {
        if (!pointer) return null;
        const end = (pointer + new Uint32Array(memory.buffer)[(pointer - 4) >>> 2]) >>> 1,
            memoryU16 = new Uint16Array(memory.buffer);
        let start = pointer >>> 1,
            string = '';
        while (end - start > 1024) string += String.fromCharCode(...memoryU16.subarray(start, (start += 1024)));
        return string + String.fromCharCode(...memoryU16.subarray(start, end));
    }
    function __liftStaticArray(liftElement, align, pointer) {
        if (!pointer) return null;
        const length = __getU32(pointer - 4) >>> align,
            values = new Array(length);
        for (let i = 0; i < length; ++i) values[i] = liftElement(pointer + ((i << align) >>> 0));
        return values;
    }
    function __lowerStaticArray(lowerElement, id, align, values, typedConstructor) {
        if (values == null) return 0;
        const length = values.length,
            buffer = exports.__pin(exports.__new(length << align, id)) >>> 0;
        if (typedConstructor) {
            new typedConstructor(memory.buffer, buffer, length).set(values);
        } else {
            for (let i = 0; i < length; i++) lowerElement(buffer + ((i << align) >>> 0), values[i]);
        }
        exports.__unpin(buffer);
        return buffer;
    }
    function __notnull() {
        throw TypeError('value must not be null');
    }
    let __dataview = new DataView(memory.buffer);
    function __setU8(pointer, value) {
        try {
            __dataview.setUint8(pointer, value, true);
        } catch {
            __dataview = new DataView(memory.buffer);
            __dataview.setUint8(pointer, value, true);
        }
    }
    function __getI8(pointer) {
        try {
            return __dataview.getInt8(pointer, true);
        } catch {
            __dataview = new DataView(memory.buffer);
            return __dataview.getInt8(pointer, true);
        }
    }
    function __getU32(pointer) {
        try {
            return __dataview.getUint32(pointer, true);
        } catch {
            __dataview = new DataView(memory.buffer);
            return __dataview.getUint32(pointer, true);
        }
    }
    return adaptedExports;
}

// src/3rdparty/bzip.ts
class Bzip {
    static bz2 = null;
    static load = async bytes => {
        this.bz2 = await instantiate(new WebAssembly.Module(bytes), {env: undefined});
    };
    static read = (length, stream, avail_in, next_in) => {
        if (!this.bz2) {
            throw new Error('bz2 not found!!');
        }
        return Int8Array.from(this.bz2.read(length, stream, avail_in, next_in));
    };
}

// src/jagex2/io/Jagfile.ts
function genHash(name) {
    let hash = 0;
    name = name.toUpperCase();
    for (let i = 0; i < name.length; i++) {
        hash = (hash * 61 + name.charCodeAt(i) - 32) | 0;
    }
    return hash;
}

class Jagfile {
    data = null;
    fileCount = 0;
    fileHash = [];
    fileName = [];
    fileUnpackedSize = [];
    filePackedSize = [];
    filePos = [];
    unpacked = false;
    fileQueue = [];
    fileWrite = [];
    static async load(path) {
        return new Jagfile(await Packet.load(path));
    }
    constructor(src) {
        if (!src) {
            return;
        }
        const unpackedSize = src.g3();
        const packedSize = src.g3();
        if (unpackedSize === packedSize) {
            this.data = new Uint8Array(src.data);
            this.unpacked = false;
        } else {
            this.data = new Uint8Array(Bzip.read(unpackedSize, src.data, packedSize, 6));
            src = new Packet(this.data);
            this.unpacked = true;
        }
        this.fileCount = src.g2();
        let pos = src.pos + this.fileCount * 10;
        for (let i = 0; i < this.fileCount; i++) {
            this.fileHash[i] = src.g4();
            const hashMatch = KNOWN_HASHES.findIndex(x => x === this.fileHash[i]);
            if (hashMatch !== -1) {
                this.fileName[i] = KNOWN_NAMES[hashMatch];
            }
            this.fileUnpackedSize[i] = src.g3();
            this.filePackedSize[i] = src.g3();
            this.filePos[i] = pos;
            pos += this.filePackedSize[i];
        }
    }
    get(index) {
        if (index < 0 || index >= this.fileCount) {
            return null;
        }
        if (this.data === null) {
            throw new Error('Jagfile data is not loaded');
        }
        const src = this.data.subarray(this.filePos[index], this.filePos[index] + this.filePackedSize[index]);
        if (this.unpacked) {
            return new Packet(src);
        } else {
            return new Packet(Uint8Array.from(Bzip.read(this.fileUnpackedSize[index], this.data, this.filePackedSize[index], this.filePos[index])));
        }
    }
    read(name) {
        const hash = genHash(name);
        for (let i = 0; i < this.fileCount; i++) {
            if (this.fileHash[i] === hash) {
                return this.get(i);
            }
        }
        return null;
    }
    write(name, data) {
        const hash = genHash(name);
        this.fileQueue.push({hash, name, write: true, data: data.data.subarray(0, data.pos)});
    }
    delete(name) {
        const hash = genHash(name);
        this.fileQueue.push({hash, name, delete: true});
    }
    rename(oldName, newName) {
        const oldHash = genHash(oldName);
        const newHash = genHash(newName);
        this.fileQueue.push({
            hash: oldHash,
            name: oldName,
            rename: true,
            newName,
            newHash
        });
    }
    save(path, doNotCompressWhole = false) {
        let buf = Packet.alloc(5);
        for (let i = 0; i < this.fileQueue.length; i++) {
            const queued = this.fileQueue[i];
            let index = this.fileHash.findIndex(x => x === queued.hash);
            if (queued.write) {
                if (index === -1) {
                    index = this.fileCount++;
                    this.fileHash[index] = queued.hash;
                    this.fileName[index] = queued.name;
                }
                if (!queued.data) {
                    throw new Error('Cannot write without data');
                }
                this.fileUnpackedSize[index] = queued.data.length;
                this.filePackedSize[index] = queued.data.length;
                this.filePos[index] = -1;
                this.fileWrite[index] = queued.data;
            }
            if (queued.delete && index !== -1) {
                this.fileHash.splice(index, 1);
                this.fileName.splice(index, 1);
                this.fileUnpackedSize.splice(index, 1);
                this.filePackedSize.splice(index, 1);
                this.filePos.splice(index, 1);
                this.fileCount--;
            }
            if (queued.rename && index !== -1) {
                if (!queued.newHash) {
                    throw new Error('Cannot rename without newHash');
                }
                if (!queued.newName) {
                    throw new Error('Cannot rename without newName');
                }
                this.fileHash[index] = queued.newHash;
                this.fileName[index] = queued.newName;
            }
            this.fileQueue.splice(i, 1);
            i--;
        }
        let compressWhole = this.fileCount === 1;
        if (doNotCompressWhole && compressWhole) {
            compressWhole = false;
        }
        buf.p2(this.fileCount);
        for (let i = 0; i < this.fileCount; i++) {
            buf.p4(this.fileHash[i]);
            buf.p3(this.fileUnpackedSize[i]);
            if (this.fileWrite[i] && !compressWhole) {
                this.fileWrite[i] = BZip2.compress(this.fileWrite[i], false, true);
                this.filePackedSize[i] = this.fileWrite[i].length;
            }
            buf.p3(this.filePackedSize[i]);
        }
        for (let i = 0; i < this.fileCount; i++) {
            const data = this.fileWrite[i];
            buf.pdata(data, 0, data.length);
        }
        const jag = Packet.alloc(5);
        jag.p3(buf.pos);
        if (compressWhole) {
            buf = new Packet(BZip2.compress(buf.data, false, true));
        }
        if (compressWhole) {
            jag.p3(buf.data.length);
            jag.pdata(buf.data, 0, buf.data.length);
        } else {
            jag.p3(buf.pos);
            jag.pdata(buf.data, 0, buf.pos);
        }
        jag.save(path);
        buf.release();
        jag.release();
    }
    deconstruct(name) {
        const dat = this.read(name + '.dat');
        const idx = this.read(name + '.idx');
        if (dat === null || idx === null) {
            throw new Error('Failed to read dat or idx');
        }
        const count = idx.g2();
        const sizes = new Array(count);
        const offsets = new Array(count);
        let offset = 2;
        for (let i = 0; i < count; i++) {
            sizes[i] = idx.g2();
            offsets[i] = offset;
            offset += sizes[i];
        }
        const checksums = new Array(count);
        for (let i = 0; i < count; i++) {
            dat.pos = offsets[i];
            checksums[i] = Packet.getcrc(dat.data, offset, sizes[i]);
        }
        return {count, sizes, offsets, checksums};
    }
}
var KNOWN_NAMES = [
    'index.dat',
    'logo.dat',
    'p11.dat',
    'p12.dat',
    'b12.dat',
    'q8.dat',
    'runes.dat',
    'title.dat',
    'titlebox.dat',
    'titlebutton.dat',
    'p11_full.dat',
    'p12_full.dat',
    'b12_full.dat',
    'q8_full.dat',
    'flo.dat',
    'flo.idx',
    'idk.dat',
    'idk.idx',
    'loc.dat',
    'loc.idx',
    'npc.dat',
    'npc.idx',
    'obj.dat',
    'obj.idx',
    'seq.dat',
    'seq.idx',
    'spotanim.dat',
    'spotanim.idx',
    'varp.dat',
    'varp.idx',
    'varbit.dat',
    'varbit.idx',
    'mesanim.dat',
    'mesanim.idx',
    'mes.dat',
    'mes.idx',
    'param.dat',
    'param.idx',
    'hunt.dat',
    'hunt.idx',
    'data',
    'backbase1.dat',
    'backbase2.dat',
    'backhmid1.dat',
    'backhmid2.dat',
    'backleft1.dat',
    'backleft2.dat',
    'backright1.dat',
    'backright2.dat',
    'backtop1.dat',
    'backtop2.dat',
    'backvmid1.dat',
    'backvmid2.dat',
    'backvmid3.dat',
    'chatback.dat',
    'combatboxes.dat',
    'combaticons.dat',
    'combaticons2.dat',
    'combaticons3.dat',
    'compass.dat',
    'cross.dat',
    'gnomeball_buttons.dat',
    'headicons.dat',
    'hitmarks.dat',
    'invback.dat',
    'leftarrow.dat',
    'magicoff.dat',
    'magicoff2.dat',
    'magicon.dat',
    'magicon2.dat',
    'mapback.dat',
    'mapdots.dat',
    'mapflag.dat',
    'mapfunction.dat',
    'mapscene.dat',
    'miscgraphics.dat',
    'miscgraphics2.dat',
    'miscgraphics3.dat',
    'prayerglow.dat',
    'prayeroff.dat',
    'prayeron.dat',
    'redstone1.dat',
    'redstone2.dat',
    'redstone3.dat',
    'rightarrow.dat',
    'scrollbar.dat',
    'sideicons.dat',
    'staticons.dat',
    'staticons2.dat',
    'steelborder.dat',
    'steelborder2.dat',
    'sworddecor.dat',
    'tradebacking.dat',
    'wornicons.dat',
    'mapmarker.dat',
    'mod_icons.dat',
    'mapedge.dat',
    'blackmark.dat',
    'button_brown.dat',
    'button_brown_big.dat',
    'button_red.dat',
    'chest.dat',
    'coins.dat',
    'headicons_hint.dat',
    'headicons_pk.dat',
    'headicons_prayer.dat',
    'key.dat',
    'keys.dat',
    'leftarrow_small.dat',
    'letter.dat',
    'number_button.dat',
    'overlay_duel.dat',
    'overlay_multiway.dat',
    'pen.dat',
    'rightarrow_small.dat',
    'startgame.dat',
    'tex_brown.dat',
    'tex_red.dat',
    'titlescroll.dat',
    'base_head.dat',
    'base_label.dat',
    'base_type.dat',
    'frame_del.dat',
    'frame_head.dat',
    'frame_tran1.dat',
    'frame_tran2.dat',
    'ob_axis.dat',
    'ob_face1.dat',
    'ob_face2.dat',
    'ob_face3.dat',
    'ob_face4.dat',
    'ob_face5.dat',
    'ob_head.dat',
    'ob_point1.dat',
    'ob_point2.dat',
    'ob_point3.dat',
    'ob_point4.dat',
    'ob_point5.dat',
    'ob_vertex1.dat',
    'ob_vertex2.dat',
    'anim_crc',
    'anim_index',
    'anim_version',
    'map_crc',
    'map_index',
    'map_version',
    'midi_crc',
    'midi_index',
    'midi_version',
    'model_crc',
    'model_index',
    'model_version',
    '0.dat',
    '1.dat',
    '2.dat',
    '3.dat',
    '4.dat',
    '5.dat',
    '6.dat',
    '7.dat',
    '8.dat',
    '9.dat',
    '10.dat',
    '11.dat',
    '12.dat',
    '13.dat',
    '14.dat',
    '15.dat',
    '16.dat',
    '17.dat',
    '18.dat',
    '19.dat',
    '20.dat',
    '21.dat',
    '22.dat',
    '23.dat',
    '24.dat',
    '25.dat',
    '26.dat',
    '27.dat',
    '28.dat',
    '29.dat',
    '30.dat',
    '31.dat',
    '32.dat',
    '33.dat',
    '34.dat',
    '35.dat',
    '36.dat',
    '37.dat',
    '38.dat',
    '39.dat',
    '40.dat',
    '41.dat',
    '42.dat',
    '43.dat',
    '44.dat',
    '45.dat',
    '46.dat',
    '47.dat',
    '48.dat',
    '49.dat',
    'badenc.txt',
    'domainenc.txt',
    'fragmentsenc.txt',
    'tldlist.txt',
    'sounds.dat',
    'labels.dat',
    'floorcol.dat',
    'underlay.dat',
    'overlay.dat',
    'size.dat'
];
var KNOWN_HASHES = [];
for (let i = 0; i < KNOWN_NAMES.length; i++) {
    KNOWN_HASHES[i] = genHash(KNOWN_NAMES[i]);
}

// src/lostcity/cache/config/FontType.ts
class FontType {
    static CHAR_LOOKUP = [];
    static instances = [];
    static {
        const charset = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"\xA3$%^&*()-_=+[{]};:'@#~,<.>/?\\| `;
        for (let i = 0; i < 256; i++) {
            let c = charset.indexOf(String.fromCharCode(i));
            if (c == -1) {
                c = 74;
            }
            FontType.CHAR_LOOKUP[i] = c;
        }
    }
    static async load(dir) {
        const title = await Jagfile.load(`${dir}/client/title`);
        FontType.instances[0] = new FontType(title, 'p11');
        FontType.instances[1] = new FontType(title, 'p12');
        FontType.instances[2] = new FontType(title, 'b12');
        FontType.instances[3] = new FontType(title, 'q8');
    }
    static get(id) {
        return FontType.instances[id];
    }
    static get count() {
        return this.instances.length;
    }
    charMask = new Array(94);
    charMaskWidth = new Uint8Array(94);
    charMaskHeight = new Uint8Array(94);
    charOffsetX = new Uint8Array(94);
    charOffsetY = new Uint8Array(94);
    charAdvance = new Uint8Array(95);
    drawWidth = new Uint8Array(256);
    height = 0;
    constructor(title, font) {
        const dat = title.read(`${font}.dat`);
        const idx = title.read('index.dat');
        if (!dat || !idx) {
            return;
        }
        idx.pos = dat.g2() + 4;
        const off = idx.g1();
        if (off > 0) {
            idx.pos += (off - 1) * 3;
        }
        for (let i = 0; i < 94; i++) {
            this.charOffsetX[i] = idx.g1();
            this.charOffsetY[i] = idx.g1();
            const w = (this.charMaskWidth[i] = idx.g2());
            const h = (this.charMaskHeight[i] = idx.g2());
            const type = idx.g1();
            const len = w * h;
            this.charMask[i] = new Uint8Array(len);
            if (type == 0) {
                for (let j = 0; j < len; j++) {
                    this.charMask[i][j] = dat.g1();
                }
            } else if (type == 1) {
                for (let x = 0; x < w; x++) {
                    for (let y = 0; y < h; y++) {
                        this.charMask[i][x + y * w] = dat.g1();
                    }
                }
            }
            if (h > this.height) {
                this.height = h;
            }
            this.charOffsetX[i] = 1;
            this.charAdvance[i] = w + 2;
            let space = 0;
            for (let y = Math.floor(h / 7); y < h; y++) {
                space += this.charMask[i][y * w];
            }
            if (space <= Math.floor(h / 7)) {
                this.charAdvance[i]--;
                this.charOffsetX[i] = 0;
            }
            space = 0;
            for (let y = Math.floor(h / 7); y < h; y++) {
                space += this.charMask[i][w + y * w - 1];
            }
            if (space <= Math.floor(h / 7)) {
                this.charAdvance[i]--;
            }
        }
        this.charAdvance[94] = this.charAdvance[8];
        for (let c = 0; c < 256; c++) {
            this.drawWidth[c] = this.charAdvance[FontType.CHAR_LOOKUP[c]];
        }
    }
    stringWidth(str) {
        if (str == null) {
            return 0;
        }
        let size = 0;
        for (let c = 0; c < str.length; c++) {
            if (str.charAt(c) == '@' && c + 4 < str.length && str.charAt(c + 4) == '@') {
                c += 4;
            } else {
                size += this.drawWidth[str.charCodeAt(c)];
            }
        }
        return size;
    }
    split(str, maxWidth) {
        if (str.length === 0) {
            return [str];
        }
        const lines = [];
        while (str.length > 0) {
            const width = this.stringWidth(str);
            if (width <= maxWidth && str.indexOf('|') === -1) {
                lines.push(str);
                break;
            }
            let splitIndex = str.length;
            for (let i = 0; i < str.length; i++) {
                if (str[i] === ' ') {
                    const w = this.stringWidth(str.substring(0, i));
                    if (w > maxWidth) {
                        break;
                    }
                    splitIndex = i;
                } else if (str[i] === '|') {
                    splitIndex = i;
                    break;
                }
            }
            lines.push(str.substring(0, splitIndex));
            str = str.substring(splitIndex + 1);
        }
        return lines;
    }
}

// src/lostcity/entity/hunt/HuntCheckNotTooStrong.ts
var HuntCheckNotTooStrong;
(HuntCheckNotTooStrong2 => {
    HuntCheckNotTooStrong2[(HuntCheckNotTooStrong2['OFF'] = 0)] = 'OFF';
    HuntCheckNotTooStrong2[(HuntCheckNotTooStrong2['OUTSIDE_WILDERNESS'] = 1)] = 'OUTSIDE_WILDERNESS';
})((HuntCheckNotTooStrong ||= {}));
var HuntCheckNotTooStrong_default = HuntCheckNotTooStrong;

// src/lostcity/entity/hunt/HuntModeType.ts
var HuntModeType;
(HuntModeType2 => {
    HuntModeType2[(HuntModeType2['OFF'] = 0)] = 'OFF';
    HuntModeType2[(HuntModeType2['PLAYER'] = 1)] = 'PLAYER';
    HuntModeType2[(HuntModeType2['NPC'] = 2)] = 'NPC';
    HuntModeType2[(HuntModeType2['OBJ'] = 3)] = 'OBJ';
    HuntModeType2[(HuntModeType2['SCENERY'] = 4)] = 'SCENERY';
})((HuntModeType ||= {}));
var HuntModeType_default = HuntModeType;

// src/lostcity/entity/hunt/HuntNobodyNear.ts
var HuntNobodyNear;
(HuntNobodyNear2 => {
    HuntNobodyNear2[(HuntNobodyNear2['KEEPHUNTING'] = 0)] = 'KEEPHUNTING';
    HuntNobodyNear2[(HuntNobodyNear2['PAUSEHUNT'] = 1)] = 'PAUSEHUNT';
})((HuntNobodyNear ||= {}));
var HuntNobodyNear_default = HuntNobodyNear;

// src/lostcity/entity/hunt/HuntVis.ts
var HuntVis;
(HuntVis2 => {
    HuntVis2[(HuntVis2['OFF'] = 0)] = 'OFF';
    HuntVis2[(HuntVis2['LINEOFSIGHT'] = 1)] = 'LINEOFSIGHT';
    HuntVis2[(HuntVis2['LINEOFWALK'] = 2)] = 'LINEOFWALK';
})((HuntVis ||= {}));
var HuntVis_default = HuntVis;

// src/lostcity/entity/NpcMode.ts
var NpcMode;
(NpcMode2 => {
    NpcMode2[(NpcMode2['NULL'] = -1)] = 'NULL';
    NpcMode2[(NpcMode2['NONE'] = 0)] = 'NONE';
    NpcMode2[(NpcMode2['WANDER'] = 1)] = 'WANDER';
    NpcMode2[(NpcMode2['PATROL'] = 2)] = 'PATROL';
    NpcMode2[(NpcMode2['PLAYERESCAPE'] = 3)] = 'PLAYERESCAPE';
    NpcMode2[(NpcMode2['PLAYERFOLLOW'] = 4)] = 'PLAYERFOLLOW';
    NpcMode2[(NpcMode2['PLAYERFACE'] = 5)] = 'PLAYERFACE';
    NpcMode2[(NpcMode2['PLAYERFACECLOSE'] = 6)] = 'PLAYERFACECLOSE';
    NpcMode2[(NpcMode2['OPPLAYER1'] = 7)] = 'OPPLAYER1';
    NpcMode2[(NpcMode2['OPPLAYER2'] = 8)] = 'OPPLAYER2';
    NpcMode2[(NpcMode2['OPPLAYER3'] = 9)] = 'OPPLAYER3';
    NpcMode2[(NpcMode2['OPPLAYER4'] = 10)] = 'OPPLAYER4';
    NpcMode2[(NpcMode2['OPPLAYER5'] = 11)] = 'OPPLAYER5';
    NpcMode2[(NpcMode2['APPLAYER1'] = 12)] = 'APPLAYER1';
    NpcMode2[(NpcMode2['APPLAYER2'] = 13)] = 'APPLAYER2';
    NpcMode2[(NpcMode2['APPLAYER3'] = 14)] = 'APPLAYER3';
    NpcMode2[(NpcMode2['APPLAYER4'] = 15)] = 'APPLAYER4';
    NpcMode2[(NpcMode2['APPLAYER5'] = 16)] = 'APPLAYER5';
    NpcMode2[(NpcMode2['OPLOC1'] = 17)] = 'OPLOC1';
    NpcMode2[(NpcMode2['OPLOC2'] = 18)] = 'OPLOC2';
    NpcMode2[(NpcMode2['OPLOC3'] = 19)] = 'OPLOC3';
    NpcMode2[(NpcMode2['OPLOC4'] = 20)] = 'OPLOC4';
    NpcMode2[(NpcMode2['OPLOC5'] = 21)] = 'OPLOC5';
    NpcMode2[(NpcMode2['APLOC1'] = 22)] = 'APLOC1';
    NpcMode2[(NpcMode2['APLOC2'] = 23)] = 'APLOC2';
    NpcMode2[(NpcMode2['APLOC3'] = 24)] = 'APLOC3';
    NpcMode2[(NpcMode2['APLOC4'] = 25)] = 'APLOC4';
    NpcMode2[(NpcMode2['APLOC5'] = 26)] = 'APLOC5';
    NpcMode2[(NpcMode2['OPOBJ1'] = 27)] = 'OPOBJ1';
    NpcMode2[(NpcMode2['OPOBJ2'] = 28)] = 'OPOBJ2';
    NpcMode2[(NpcMode2['OPOBJ3'] = 29)] = 'OPOBJ3';
    NpcMode2[(NpcMode2['OPOBJ4'] = 30)] = 'OPOBJ4';
    NpcMode2[(NpcMode2['OPOBJ5'] = 31)] = 'OPOBJ5';
    NpcMode2[(NpcMode2['APOBJ1'] = 32)] = 'APOBJ1';
    NpcMode2[(NpcMode2['APOBJ2'] = 33)] = 'APOBJ2';
    NpcMode2[(NpcMode2['APOBJ3'] = 34)] = 'APOBJ3';
    NpcMode2[(NpcMode2['APOBJ4'] = 35)] = 'APOBJ4';
    NpcMode2[(NpcMode2['APOBJ5'] = 36)] = 'APOBJ5';
    NpcMode2[(NpcMode2['OPNPC1'] = 37)] = 'OPNPC1';
    NpcMode2[(NpcMode2['OPNPC2'] = 38)] = 'OPNPC2';
    NpcMode2[(NpcMode2['OPNPC3'] = 39)] = 'OPNPC3';
    NpcMode2[(NpcMode2['OPNPC4'] = 40)] = 'OPNPC4';
    NpcMode2[(NpcMode2['OPNPC5'] = 41)] = 'OPNPC5';
    NpcMode2[(NpcMode2['APNPC1'] = 42)] = 'APNPC1';
    NpcMode2[(NpcMode2['APNPC2'] = 43)] = 'APNPC2';
    NpcMode2[(NpcMode2['APNPC3'] = 44)] = 'APNPC3';
    NpcMode2[(NpcMode2['APNPC4'] = 45)] = 'APNPC4';
    NpcMode2[(NpcMode2['APNPC5'] = 46)] = 'APNPC5';
    NpcMode2[(NpcMode2['QUEUE1'] = 47)] = 'QUEUE1';
    NpcMode2[(NpcMode2['QUEUE2'] = 48)] = 'QUEUE2';
    NpcMode2[(NpcMode2['QUEUE3'] = 49)] = 'QUEUE3';
    NpcMode2[(NpcMode2['QUEUE4'] = 50)] = 'QUEUE4';
    NpcMode2[(NpcMode2['QUEUE5'] = 51)] = 'QUEUE5';
    NpcMode2[(NpcMode2['QUEUE6'] = 52)] = 'QUEUE6';
    NpcMode2[(NpcMode2['QUEUE7'] = 53)] = 'QUEUE7';
    NpcMode2[(NpcMode2['QUEUE8'] = 54)] = 'QUEUE8';
    NpcMode2[(NpcMode2['QUEUE9'] = 55)] = 'QUEUE9';
    NpcMode2[(NpcMode2['QUEUE10'] = 56)] = 'QUEUE10';
    NpcMode2[(NpcMode2['QUEUE11'] = 57)] = 'QUEUE11';
    NpcMode2[(NpcMode2['QUEUE12'] = 58)] = 'QUEUE12';
    NpcMode2[(NpcMode2['QUEUE13'] = 59)] = 'QUEUE13';
    NpcMode2[(NpcMode2['QUEUE14'] = 60)] = 'QUEUE14';
    NpcMode2[(NpcMode2['QUEUE15'] = 61)] = 'QUEUE15';
    NpcMode2[(NpcMode2['QUEUE16'] = 62)] = 'QUEUE16';
    NpcMode2[(NpcMode2['QUEUE17'] = 63)] = 'QUEUE17';
    NpcMode2[(NpcMode2['QUEUE18'] = 64)] = 'QUEUE18';
    NpcMode2[(NpcMode2['QUEUE19'] = 65)] = 'QUEUE19';
    NpcMode2[(NpcMode2['QUEUE20'] = 66)] = 'QUEUE20';
})((NpcMode ||= {}));
var NpcMode_default = NpcMode;

// src/lostcity/cache/config/HuntType.ts
class HuntType extends ConfigType {
    static configNames = new Map();
    static configs = [];
    static async load(dir) {
        HuntType.configNames = new Map();
        HuntType.configs = [];
        if (!(await fetch(`${dir}/server/hunt.dat`)).ok) {
            console.log('Warning: No hunt.dat found.');
            return;
        }
        const dat = await Packet.load(`${dir}/server/hunt.dat`);
        const count = dat.g2();
        for (let id = 0; id < count; id++) {
            const config = new HuntType(id);
            config.decodeType(dat);
            HuntType.configs[id] = config;
            if (config.debugname) {
                HuntType.configNames.set(config.debugname, id);
            }
        }
    }
    static get(id) {
        return HuntType.configs[id];
    }
    static getId(name) {
        return HuntType.configNames.get(name) ?? -1;
    }
    static getByName(name) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }
        return this.get(id);
    }
    static get count() {
        return this.configs.length;
    }
    type = HuntModeType_default.OFF;
    checkVis = HuntVis_default.OFF;
    checkNotTooStrong = HuntCheckNotTooStrong_default.OFF;
    checkNotBusy = false;
    findKeepHunting = false;
    findNewMode = NpcMode_default.NONE;
    nobodyNear = HuntNobodyNear_default.PAUSEHUNT;
    checkNotCombat = -1;
    checkNotCombatSelf = -1;
    checkAfk = true;
    rate = 1;
    checkCategory = -1;
    checkNpc = -1;
    checkObj = -1;
    checkLoc = -1;
    checkInv = -1;
    checkObjParam = -1;
    checkInvMinQuantity = -1;
    checkInvMaxQuantity = -1;
    decode(code, dat) {
        if (code === 1) {
            this.type = dat.g1();
        } else if (code == 2) {
            this.checkVis = dat.g1();
        } else if (code == 3) {
            this.checkNotTooStrong = dat.g1();
        } else if (code == 4) {
            this.checkNotBusy = true;
        } else if (code == 5) {
            this.findKeepHunting = true;
        } else if (code == 6) {
            this.findNewMode = dat.g1();
        } else if (code == 7) {
            this.nobodyNear = dat.g1();
        } else if (code === 8) {
            this.checkNotCombat = dat.g2();
        } else if (code === 9) {
            this.checkNotCombatSelf = dat.g2();
        } else if (code === 10) {
            this.checkAfk = false;
        } else if (code === 11) {
            this.rate = dat.g2();
        } else if (code === 12) {
            this.checkCategory = dat.g2();
        } else if (code === 13) {
            this.checkNpc = dat.g2();
        } else if (code === 14) {
            this.checkObj = dat.g2();
        } else if (code === 15) {
            this.checkLoc = dat.g2();
        } else if (code === 16) {
            this.checkInv = dat.g2();
            this.checkObj = dat.g2();
            this.checkInvMinQuantity = dat.g4();
            this.checkInvMaxQuantity = dat.g4();
        } else if (code === 17) {
            this.checkInv = dat.g2();
            this.checkObjParam = dat.g2();
            this.checkInvMinQuantity = dat.g4();
            this.checkInvMaxQuantity = dat.g4();
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            throw new Error(`Unrecognized hunt config code: ${code}`);
        }
    }
}

// src/lostcity/cache/config/IdkType.ts
class IdkType extends ConfigType {
    static configNames = new Map();
    static configs = [];
    static async load(dir) {
        IdkType.configNames = new Map();
        IdkType.configs = [];
        if (!(await fetch(`${dir}/server/idk.dat`)).ok) {
            console.log('Warning: No idk.dat found.');
            return;
        }
        const server = await Packet.load(`${dir}/server/idk.dat`);
        const count = server.g2();
        const jag = await Jagfile.load(`${dir}/client/config`);
        const client = jag.read('idk.dat');
        client.pos = 2;
        for (let id = 0; id < count; id++) {
            const config = new IdkType(id);
            config.decodeType(server);
            config.decodeType(client);
            IdkType.configs[id] = config;
            if (config.debugname) {
                IdkType.configNames.set(config.debugname, id);
            }
        }
    }
    static get(id) {
        return IdkType.configs[id];
    }
    static getId(name) {
        return IdkType.configNames.get(name) ?? -1;
    }
    static getByName(name) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }
        return this.get(id);
    }
    static get count() {
        return this.configs.length;
    }
    type = -1;
    models = null;
    heads = new Uint16Array(5).fill(-1);
    recol_s = new Uint16Array(6).fill(0);
    recol_d = new Uint16Array(6).fill(0);
    disable = false;
    decode(code, dat) {
        if (code === 1) {
            this.type = dat.g1();
        } else if (code === 2) {
            const count = dat.g1();
            this.models = new Uint16Array(count);
            for (let i = 0; i < count; i++) {
                this.models[i] = dat.g2();
            }
        } else if (code === 3) {
            this.disable = true;
        } else if (code >= 40 && code < 50) {
            this.recol_s[code - 40] = dat.g2();
        } else if (code >= 50 && code < 60) {
            this.recol_d[code - 50] = dat.g2();
        } else if (code >= 60 && code < 70) {
            this.heads[code - 60] = dat.g2();
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            throw new Error(`Unrecognized idk config code: ${code}`);
        }
    }
}

// src/lostcity/cache/config/Component.ts
class Component {
    static TYPE_LAYER = 0;
    static TYPE_UNUSED = 1;
    static TYPE_INVENTORY = 2;
    static TYPE_RECT = 3;
    static TYPE_TEXT = 4;
    static TYPE_SPRITE = 5;
    static TYPE_MODEL = 6;
    static TYPE_INVENTORY_TEXT = 7;
    static NO_BUTTON = 0;
    static BUTTON = 1;
    static TARGET_BUTTON = 2;
    static CLOSE_BUTTON = 3;
    static TOGGLE_BUTTON = 4;
    static SELECT_BUTTON = 5;
    static PAUSE_BUTTON = 6;
    static componentNames = new Map();
    static components = [];
    static async load(dir) {
        this.componentNames = new Map();
        this.components = [];
        if (!(await fetch(`${dir}/server/interface.dat`)).ok) {
            console.log('Warning: No interface.dat found.');
            return;
        }
        const dat = await Packet.load(`${dir}/server/interface.dat`);
        dat.g2();
        let rootLayer = -1;
        while (dat.available > 0) {
            let id = dat.g2();
            if (id === 65535) {
                rootLayer = dat.g2();
                id = dat.g2();
            }
            const com = new Component();
            com.id = id;
            com.rootLayer = rootLayer;
            com.comName = dat.gjstr();
            com.overlay = dat.gbool();
            com.type = dat.g1();
            com.buttonType = dat.g1();
            com.clientCode = dat.g2();
            com.width = dat.g2();
            com.height = dat.g2();
            com.overLayer = dat.g1();
            if (com.overLayer == 0) {
                com.overLayer = -1;
            } else {
                com.overLayer = ((com.overLayer - 1) << 8) + dat.g1();
            }
            const comparatorCount = dat.g1();
            if (comparatorCount > 0) {
                com.scriptComparator = new Uint8Array(comparatorCount).fill(0);
                com.scriptOperand = new Uint16Array(comparatorCount).fill(0);
                for (let i = 0; i < comparatorCount; i++) {
                    com.scriptComparator[i] = dat.g1();
                    com.scriptOperand[i] = dat.g2();
                }
            }
            const scriptCount = dat.g1();
            if (scriptCount > 0) {
                com.scripts = new Array(scriptCount).fill(null);
                for (let i = 0; i < scriptCount; i++) {
                    const opcodeCount = dat.g2();
                    com.scripts[i] = new Uint16Array(opcodeCount).fill(0);
                    for (let j = 0; j < opcodeCount; j++) {
                        com.scripts[i][j] = dat.g2();
                    }
                }
            }
            switch (com.type) {
                case Component.TYPE_LAYER: {
                    com.scroll = dat.g2();
                    com.hide = dat.gbool();
                    const childCount = dat.g1();
                    com.childId = new Uint16Array(childCount).fill(0);
                    com.childX = new Uint16Array(childCount).fill(0);
                    com.childY = new Uint16Array(childCount).fill(0);
                    for (let i = 0; i < childCount; i++) {
                        com.childId[i] = dat.g2();
                        com.childX[i] = dat.g2s();
                        com.childY[i] = dat.g2s();
                    }
                    break;
                }
                case Component.TYPE_UNUSED:
                    dat.pos += 10;
                    break;
                case Component.TYPE_INVENTORY: {
                    com.draggable = dat.gbool();
                    com.interactable = dat.gbool();
                    com.usable = dat.gbool();
                    com.marginX = dat.g1();
                    com.marginY = dat.g1();
                    com.inventorySlotOffsetX = new Uint16Array(20).fill(0);
                    com.inventorySlotOffsetY = new Uint16Array(20).fill(0);
                    com.inventorySlotGraphic = new Array(20).fill(null);
                    for (let i = 0; i < 20; i++) {
                        if (dat.gbool()) {
                            com.inventorySlotOffsetX[i] = dat.g2s();
                            com.inventorySlotOffsetY[i] = dat.g2s();
                            com.inventorySlotGraphic[i] = dat.gjstr();
                        }
                    }
                    com.inventoryOptions = new Array(5).fill(null);
                    for (let i = 0; i < 5; i++) {
                        com.inventoryOptions[i] = dat.gjstr();
                    }
                    com.actionVerb = dat.gjstr();
                    com.action = dat.gjstr();
                    com.actionTarget = dat.g2();
                    break;
                }
                case Component.TYPE_RECT:
                    com.fill = dat.gbool();
                    com.colour = dat.g4();
                    com.activeColour = dat.g4();
                    com.overColour = dat.g4();
                    break;
                case Component.TYPE_TEXT:
                    com.center = dat.gbool();
                    com.font = dat.g1();
                    com.shadowed = dat.gbool();
                    com.text = dat.gjstr();
                    com.activeText = dat.gjstr();
                    com.colour = dat.g4();
                    com.activeColour = dat.g4();
                    com.overColour = dat.g4();
                    break;
                case Component.TYPE_SPRITE:
                    com.graphic = dat.gjstr();
                    com.activeGraphic = dat.gjstr();
                    break;
                case Component.TYPE_MODEL: {
                    com.model = dat.g1();
                    if (com.model != 0) {
                        com.model = ((com.model - 1) << 8) + dat.g1();
                    }
                    com.activeModel = dat.g1();
                    if (com.activeModel != 0) {
                        com.activeModel = ((com.activeModel - 1) << 8) + dat.g1();
                    }
                    com.anim = dat.g1();
                    if (com.anim == 0) {
                        com.anim = -1;
                    } else {
                        com.anim = ((com.anim - 1) << 8) + dat.g1();
                    }
                    com.activeAnim = dat.g1();
                    if (com.activeAnim == 0) {
                        com.activeAnim = -1;
                    } else {
                        com.activeAnim = ((com.activeAnim - 1) << 8) + dat.g1();
                    }
                    com.zoom = dat.g2();
                    com.xan = dat.g2();
                    com.yan = dat.g2();
                    break;
                }
                case Component.TYPE_INVENTORY_TEXT: {
                    com.center = dat.gbool();
                    com.font = dat.g1();
                    com.shadowed = dat.gbool();
                    com.colour = dat.g4();
                    com.marginX = dat.g2s();
                    com.marginY = dat.g2s();
                    com.interactable = dat.gbool();
                    com.inventoryOptions = new Array(5).fill(null);
                    for (let i = 0; i < 5; i++) {
                        com.inventoryOptions[i] = dat.gjstr();
                    }
                    break;
                }
            }
            switch (com.buttonType) {
                case Component.NO_BUTTON:
                    break;
                case Component.TARGET_BUTTON:
                    com.actionVerb = dat.gjstr();
                    com.action = dat.gjstr();
                    com.actionTarget = dat.g2();
                    break;
                case Component.BUTTON:
                case Component.TOGGLE_BUTTON:
                case Component.SELECT_BUTTON:
                case Component.PAUSE_BUTTON:
                    com.option = dat.gjstr();
                    break;
            }
            Component.components[id] = com;
            if (com.comName) {
                Component.componentNames.set(com.comName, id);
            }
        }
    }
    static get(id) {
        return Component.components[id];
    }
    static getId(name) {
        return Component.componentNames.get(name) ?? -1;
    }
    static getByName(name) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }
        return this.get(id);
    }
    id = -1;
    rootLayer = -1;
    comName = null;
    overlay = false;
    type = -1;
    buttonType = -1;
    clientCode = 0;
    width = 0;
    height = 0;
    overLayer = -1;
    scriptComparator = null;
    scriptOperand = null;
    scripts = null;
    scroll = 0;
    hide = false;
    draggable = false;
    interactable = false;
    usable = false;
    marginX = 0;
    marginY = 0;
    inventorySlotOffsetX = null;
    inventorySlotOffsetY = null;
    inventorySlotGraphic = null;
    inventoryOptions = null;
    fill = false;
    center = false;
    font = 0;
    shadowed = false;
    text = null;
    activeText = null;
    colour = 0;
    activeColour = 0;
    overColour = 0;
    graphic = null;
    activeGraphic = null;
    model = -1;
    activeModel = -1;
    anim = -1;
    activeAnim = -1;
    zoom = 0;
    xan = 0;
    yan = 0;
    actionVerb = null;
    action = null;
    actionTarget = -1;
    option = null;
    childId = null;
    childX = null;
    childY = null;
}

// src/lostcity/cache/config/InvType.ts
class InvType extends ConfigType {
    static configNames = new Map();
    static configs = [];
    static SCOPE_TEMP = 0;
    static SCOPE_PERM = 1;
    static SCOPE_SHARED = 2;
    static INV = -1;
    static WORN = -1;
    static async load(dir) {
        InvType.configNames = new Map();
        InvType.configs = [];
        if (!(await fetch(`${dir}/server/inv.dat`)).ok) {
            console.log('Warning: No inv.dat found.');
            return;
        }
        const dat = await Packet.load(`${dir}/server/inv.dat`);
        const count = dat.g2();
        for (let id = 0; id < count; id++) {
            const config = new InvType(id);
            config.decodeType(dat);
            InvType.configs[id] = config;
            if (config.debugname) {
                InvType.configNames.set(config.debugname, id);
            }
        }
        InvType.INV = InvType.getId('inv');
        InvType.WORN = InvType.getId('worn');
    }
    static get(id) {
        return InvType.configs[id];
    }
    static getId(name) {
        return InvType.configNames.get(name) ?? -1;
    }
    static getByName(name) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }
        return this.get(id);
    }
    static get count() {
        return this.configs.length;
    }
    scope = 0;
    size = 1;
    stackall = false;
    restock = false;
    allstock = false;
    stockobj = null;
    stockcount = null;
    stockrate = null;
    protect = true;
    runweight = false;
    dummyinv = false;
    decode(code, dat) {
        if (code === 1) {
            this.scope = dat.g1();
        } else if (code === 2) {
            this.size = dat.g2();
        } else if (code === 3) {
            this.stackall = true;
        } else if (code === 4) {
            const count = dat.g1();
            this.stockobj = new Uint16Array(count);
            this.stockcount = new Uint16Array(count);
            this.stockrate = new Int32Array(count);
            for (let j = 0; j < count; j++) {
                this.stockobj[j] = dat.g2();
                this.stockcount[j] = dat.g2();
                this.stockrate[j] = dat.g4();
            }
        } else if (code === 5) {
            this.restock = true;
        } else if (code === 6) {
            this.allstock = true;
        } else if (code === 7) {
            this.protect = false;
        } else if (code === 8) {
            this.runweight = true;
        } else if (code === 9) {
            this.dummyinv = true;
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            throw new Error(`Unrecognized inv config code: ${code}`);
        }
    }
}

// src/lostcity/cache/config/ParamHelper.ts
var ParamHelper = {
    getStringParam: function (id, holder, defaultValue) {
        const value = holder.params?.get(id);
        if (typeof value !== 'string') {
            return defaultValue ?? 'null';
        }
        return value;
    },
    getIntParam: function (id, holder, defaultValue) {
        const value = holder.params?.get(id);
        if (typeof value !== 'number') {
            return defaultValue;
        }
        return value;
    },
    decodeParams: function (dat) {
        const count = dat.g1();
        const params = new Map();
        for (let i = 0; i < count; i++) {
            const key = dat.g3();
            const isString = dat.gbool();
            if (isString) {
                params.set(key, dat.gjstr());
            } else {
                params.set(key, dat.g4());
            }
        }
        return params;
    }
};

// src/lostcity/cache/config/LocType.ts
class LocType extends ConfigType {
    static configNames = new Map();
    static configs = [];
    static async load(dir) {
        LocType.configNames = new Map();
        LocType.configs = [];
        if (!(await fetch(`${dir}/server/loc.dat`)).ok) {
            console.log('Warning: No loc.dat found.');
            return;
        }
        const server = await Packet.load(`${dir}/server/loc.dat`);
        const count = server.g2();
        const jag = await Jagfile.load(`${dir}/client/config`);
        const client = jag.read('loc.dat');
        client.pos = 2;
        for (let id = 0; id < count; id++) {
            const config = new LocType(id);
            config.active = -1;
            config.decodeType(server);
            config.decodeType(client);
            if (config.active === -1 && config.shapes) {
                config.active = config.shapes.length > 0 && config.shapes[0] === 10 ? 1 : 0;
                if (config.op && config.op.length > 0) {
                    config.active = 1;
                }
            }
            LocType.configs[id] = config;
            if (config.debugname) {
                LocType.configNames.set(config.debugname, id);
            }
        }
    }
    static get(id) {
        return LocType.configs[id];
    }
    static getId(name) {
        return LocType.configNames.get(name) ?? -1;
    }
    static getByName(name) {
        const id = this.getId(name);
        if (id === undefined || id === -1) {
            return null;
        }
        return this.get(id);
    }
    static get count() {
        return this.configs.length;
    }
    models = null;
    shapes = null;
    name = null;
    desc = null;
    recol_s = null;
    recol_d = null;
    width = 1;
    length = 1;
    blockwalk = true;
    blockrange = true;
    active = 0;
    hillskew = false;
    sharelight = false;
    occlude = false;
    anim = -1;
    hasalpha = false;
    wallwidth = 16;
    ambient = 0;
    contrast = 0;
    op = null;
    mapfunction = -1;
    mapscene = -1;
    mirror = false;
    shadow = true;
    resizex = 128;
    resizey = 128;
    resizez = 128;
    forceapproach = 0;
    xoff = 0;
    yoff = 0;
    zoff = 0;
    forcedecor = false;
    category = -1;
    params = new Map();
    decode(code, dat) {
        if (code === 1) {
            const count = dat.g1();
            this.models = new Uint16Array(count);
            this.shapes = new Uint8Array(count);
            for (let i = 0; i < count; i++) {
                this.models[i] = dat.g2();
                this.shapes[i] = dat.g1();
            }
        } else if (code === 2) {
            this.name = dat.gjstr();
        } else if (code === 3) {
            this.desc = dat.gjstr();
        } else if (code === 14) {
            this.width = dat.g1();
        } else if (code === 15) {
            this.length = dat.g1();
        } else if (code === 17) {
            this.blockwalk = false;
        } else if (code === 18) {
            this.blockrange = false;
        } else if (code === 19) {
            this.active = dat.g1();
        } else if (code === 21) {
            this.hillskew = true;
        } else if (code === 22) {
            this.sharelight = true;
        } else if (code === 23) {
            this.occlude = true;
        } else if (code === 24) {
            this.anim = dat.g2();
            if (this.anim == 65535) {
                this.anim = -1;
            }
        } else if (code === 25) {
            this.hasalpha = true;
        } else if (code === 28) {
            this.wallwidth = dat.g1();
        } else if (code === 29) {
            this.ambient = dat.g1b();
        } else if (code === 39) {
            this.contrast = dat.g1b();
        } else if (code >= 30 && code < 35) {
            if (!this.op) {
                this.op = new Array(5).fill(null);
            }
            this.op[code - 30] = dat.gjstr();
            if (this.op[code - 30] === 'hidden') {
                this.op[code - 30] = null;
            }
        } else if (code === 40) {
            const count = dat.g1();
            this.recol_s = new Uint16Array(count);
            this.recol_d = new Uint16Array(count);
            for (let i = 0; i < count; i++) {
                this.recol_s[i] = dat.g2();
                this.recol_d[i] = dat.g2();
            }
        } else if (code === 60) {
            this.mapfunction = dat.g2();
        } else if (code === 62) {
            this.mirror = true;
        } else if (code === 64) {
            this.shadow = false;
        } else if (code === 65) {
            this.resizex = dat.g2();
        } else if (code === 66) {
            this.resizey = dat.g2();
        } else if (code === 67) {
            this.resizez = dat.g2();
        } else if (code === 68) {
            this.mapscene = dat.g2();
        } else if (code === 69) {
            this.forceapproach = dat.g1();
        } else if (code === 70) {
            this.xoff = dat.g2s();
        } else if (code === 71) {
            this.yoff = dat.g2s();
        } else if (code === 72) {
            this.zoff = dat.g2s();
        } else if (code === 73) {
            this.forcedecor = true;
        } else if (code === 200) {
            this.category = dat.g2();
        } else if (code === 249) {
            this.params = ParamHelper.decodeParams(dat);
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            throw new Error(`Unrecognized loc config code: ${code}`);
        }
    }
}

// src/lostcity/cache/config/MesanimType.ts
class MesanimType extends ConfigType {
    static configNames = new Map();
    static configs = [];
    static async load(dir) {
        MesanimType.configNames = new Map();
        MesanimType.configs = [];
        if (!(await fetch(`${dir}/server/mesanim.dat`)).ok) {
            console.log('Warning: No mesanim.dat found.');
            return;
        }
        const dat = await Packet.load(`${dir}/server/mesanim.dat`);
        const count = dat.g2();
        for (let id = 0; id < count; id++) {
            const config = new MesanimType(id);
            config.decodeType(dat);
            MesanimType.configs[id] = config;
            if (config.debugname) {
                MesanimType.configNames.set(config.debugname, id);
            }
        }
    }
    static get(id) {
        return MesanimType.configs[id];
    }
    static getId(name) {
        return MesanimType.configNames.get(name) ?? -1;
    }
    static getByName(name) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }
        return this.get(id);
    }
    static get count() {
        return this.configs.length;
    }
    len = new Array(4).fill(-1);
    decode(code, dat) {
        if (code >= 1 && code < 5) {
            this.len[code - 1] = dat.g2();
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            throw new Error(`Unrecognized mesanim config code: ${code}`);
        }
    }
}

// src/lostcity/entity/BlockWalk.ts
var BlockWalk;
(BlockWalk2 => {
    BlockWalk2[(BlockWalk2['NONE'] = 0)] = 'NONE';
    BlockWalk2[(BlockWalk2['NPC'] = 1)] = 'NPC';
    BlockWalk2[(BlockWalk2['ALL'] = 2)] = 'ALL';
})((BlockWalk ||= {}));
var BlockWalk_default = BlockWalk;

// src/lostcity/entity/MoveRestrict.ts
var MoveRestrict;
(MoveRestrict2 => {
    MoveRestrict2[(MoveRestrict2['NORMAL'] = 0)] = 'NORMAL';
    MoveRestrict2[(MoveRestrict2['BLOCKED'] = 1)] = 'BLOCKED';
    MoveRestrict2[(MoveRestrict2['BLOCKED_NORMAL'] = 2)] = 'BLOCKED_NORMAL';
    MoveRestrict2[(MoveRestrict2['INDOORS'] = 3)] = 'INDOORS';
    MoveRestrict2[(MoveRestrict2['OUTDOORS'] = 4)] = 'OUTDOORS';
    MoveRestrict2[(MoveRestrict2['NOMOVE'] = 5)] = 'NOMOVE';
    MoveRestrict2[(MoveRestrict2['PASSTHRU'] = 6)] = 'PASSTHRU';
})((MoveRestrict ||= {}));
var MoveRestrict_default = MoveRestrict;

// src/lostcity/entity/NpcStat.ts
var NpcStat;
(NpcStat2 => {
    NpcStat2[(NpcStat2['ATTACK'] = 0)] = 'ATTACK';
    NpcStat2[(NpcStat2['DEFENCE'] = 1)] = 'DEFENCE';
    NpcStat2[(NpcStat2['STRENGTH'] = 2)] = 'STRENGTH';
    NpcStat2[(NpcStat2['HITPOINTS'] = 3)] = 'HITPOINTS';
    NpcStat2[(NpcStat2['RANGED'] = 4)] = 'RANGED';
    NpcStat2[(NpcStat2['MAGIC'] = 5)] = 'MAGIC';
})((NpcStat ||= {}));
var NpcStat_default = NpcStat;

// src/lostcity/cache/config/NpcType.ts
class NpcType extends ConfigType {
    static configNames = new Map();
    static configs = [];
    static async load(dir) {
        NpcType.configNames = new Map();
        NpcType.configs = [];
        if (!(await fetch(`${dir}/server/npc.dat`)).ok) {
            console.log('Warning: No npc.dat found.');
            return;
        }
        const server = await Packet.load(`${dir}/server/npc.dat`);
        const count = server.g2();
        const jag = await Jagfile.load(`${dir}/client/config`);
        const client = jag.read('npc.dat');
        client.pos = 2;
        for (let id = 0; id < count; id++) {
            const config = new NpcType(id);
            config.decodeType(server);
            config.decodeType(client);
            NpcType.configs[id] = config;
            if (config.debugname) {
                NpcType.configNames.set(config.debugname, id);
            }
        }
    }
    static get(id) {
        return NpcType.configs[id];
    }
    static getId(name) {
        return NpcType.configNames.get(name) ?? -1;
    }
    static getByName(name) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }
        return this.get(id);
    }
    static get count() {
        return this.configs.length;
    }
    name = null;
    desc = null;
    size = 1;
    models = null;
    heads = null;
    hasanim = false;
    readyanim = -1;
    walkanim = -1;
    walkanim_b = -1;
    walkanim_r = -1;
    walkanim_l = -1;
    hasalpha = false;
    recol_s = null;
    recol_d = null;
    op = null;
    resizex = -1;
    resizey = -1;
    resizez = -1;
    minimap = true;
    vislevel = -1;
    resizeh = 128;
    resizev = 128;
    category = -1;
    wanderrange = 5;
    maxrange = 10;
    huntrange = 5;
    timer = -1;
    respawnrate = 100;
    stats = [1, 1, 1, 1, 1, 1];
    moverestrict = MoveRestrict_default.NORMAL;
    attackrange = 7;
    huntmode = -1;
    defaultmode = NpcMode_default.WANDER;
    members = false;
    blockwalk = BlockWalk_default.NPC;
    params = new Map();
    patrolCoord = [];
    patrolDelay = [];
    givechase = true;
    decode(code, dat) {
        if (code === 1) {
            const count = dat.g1();
            this.models = new Uint16Array(count);
            for (let i = 0; i < count; i++) {
                this.models[i] = dat.g2();
            }
        } else if (code === 2) {
            this.name = dat.gjstr();
        } else if (code === 3) {
            this.desc = dat.gjstr();
        } else if (code === 12) {
            this.size = dat.g1();
        } else if (code === 13) {
            this.readyanim = dat.g2();
        } else if (code === 14) {
            this.walkanim = dat.g2();
        } else if (code === 16) {
            this.hasanim = true;
        } else if (code === 17) {
            this.walkanim = dat.g2();
            this.walkanim_b = dat.g2();
            this.walkanim_r = dat.g2();
            this.walkanim_l = dat.g2();
        } else if (code === 18) {
            this.category = dat.g2();
        } else if (code >= 30 && code < 40) {
            if (!this.op) {
                this.op = new Array(5).fill(null);
            }
            this.op[code - 30] = dat.gjstr();
            if (this.op[code - 30] === 'hidden') {
                this.op[code - 30] = null;
            }
        } else if (code === 40) {
            const count = dat.g1();
            this.recol_s = new Uint16Array(count);
            this.recol_d = new Uint16Array(count);
            for (let i = 0; i < count; i++) {
                this.recol_s[i] = dat.g2();
                this.recol_d[i] = dat.g2();
            }
        } else if (code === 60) {
            const count = dat.g1();
            this.heads = new Uint16Array(count);
            for (let i = 0; i < count; i++) {
                this.heads[i] = dat.g2();
            }
        } else if (code === 74) {
            this.stats[NpcStat_default.ATTACK] = dat.g2();
        } else if (code === 75) {
            this.stats[NpcStat_default.DEFENCE] = dat.g2();
        } else if (code === 76) {
            this.stats[NpcStat_default.STRENGTH] = dat.g2();
        } else if (code === 77) {
            this.stats[NpcStat_default.HITPOINTS] = dat.g2();
        } else if (code === 78) {
            this.stats[NpcStat_default.RANGED] = dat.g2();
        } else if (code === 79) {
            this.stats[NpcStat_default.MAGIC] = dat.g2();
        } else if (code === 90) {
            this.resizex = dat.g2();
        } else if (code === 91) {
            this.resizey = dat.g2();
        } else if (code === 92) {
            this.resizez = dat.g2();
        } else if (code === 93) {
            this.minimap = false;
        } else if (code === 95) {
            this.vislevel = dat.g2();
        } else if (code === 97) {
            this.resizeh = dat.g2();
        } else if (code === 98) {
            this.resizev = dat.g2();
        } else if (code === 200) {
            this.wanderrange = dat.g1();
        } else if (code === 201) {
            this.maxrange = dat.g1();
        } else if (code === 202) {
            this.huntrange = dat.g1();
        } else if (code === 203) {
            this.timer = dat.g2();
        } else if (code === 204) {
            this.respawnrate = dat.g2();
        } else if (code === 206) {
            this.moverestrict = dat.g1();
        } else if (code == 207) {
            this.attackrange = dat.g1();
        } else if (code === 208) {
            this.blockwalk = dat.g1();
        } else if (code === 209) {
            this.huntmode = dat.g1();
        } else if (code === 210) {
            this.defaultmode = dat.g1();
        } else if (code === 211) {
            this.members = true;
        } else if (code === 212) {
            const count = dat.g1();
            this.patrolCoord = new Array(count);
            this.patrolDelay = new Array(count);
            for (let j = 0; j < count; j++) {
                this.patrolCoord[j] = dat.g4();
                this.patrolDelay[j] = dat.g1();
            }
        } else if (code === 213) {
            this.givechase = false;
        } else if (code === 249) {
            this.params = ParamHelper.decodeParams(dat);
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            console.error('Unrecognized npc config code: ' + code);
            console.error('Try `npm run build` and report an issue if this still happens.');
            process.exit(1);
        }
    }
}

// src/lostcity/cache/config/ParamType.ts
class ParamType extends ConfigType {
    static configNames = new Map();
    static configs = [];
    static async load(dir) {
        ParamType.configNames = new Map();
        ParamType.configs = [];
        if (!(await fetch(`${dir}/server/param.dat`)).ok) {
            console.log('Warning: No param.dat found.');
        }
        const dat = await Packet.load(`${dir}/server/param.dat`);
        const count = dat.g2();
        for (let id = 0; id < count; id++) {
            const config = new ParamType(id);
            config.decodeType(dat);
            ParamType.configs[id] = config;
            if (config.debugname) {
                ParamType.configNames.set(config.debugname, id);
            }
        }
    }
    static get(id) {
        return ParamType.configs[id];
    }
    static getId(name) {
        return ParamType.configNames.get(name) ?? -1;
    }
    static getByName(name) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }
        return this.get(id);
    }
    static get count() {
        return this.configs.length;
    }
    type = ScriptVarType.INT;
    defaultInt = -1;
    defaultString = null;
    autodisable = true;
    decode(code, dat) {
        if (code === 1) {
            this.type = dat.g1();
        } else if (code === 2) {
            this.defaultInt = dat.g4();
        } else if (code === 4) {
            this.autodisable = false;
        } else if (code === 5) {
            this.defaultString = dat.gjstr();
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            throw new Error(`Unrecognized param config code: ${code}`);
        }
    }
    getType() {
        switch (this.type) {
            case ScriptVarType.INT:
                return 'int';
            case ScriptVarType.STRING:
                return 'string';
            case ScriptVarType.ENUM:
                return 'enum';
            case ScriptVarType.OBJ:
                return 'obj';
            case ScriptVarType.LOC:
                return 'loc';
            case ScriptVarType.COMPONENT:
                return 'component';
            case ScriptVarType.NAMEDOBJ:
                return 'namedobj';
            case ScriptVarType.STRUCT:
                return 'struct';
            case ScriptVarType.BOOLEAN:
                return 'boolean';
            case ScriptVarType.COORD:
                return 'coord';
            case ScriptVarType.CATEGORY:
                return 'category';
            case ScriptVarType.SPOTANIM:
                return 'spotanim';
            case ScriptVarType.NPC:
                return 'npc';
            case ScriptVarType.INV:
                return 'inv';
            case ScriptVarType.SYNTH:
                return 'synth';
            case ScriptVarType.SEQ:
                return 'seq';
            case ScriptVarType.STAT:
                return 'stat';
            case ScriptVarType.INTERFACE:
                return 'interface';
            default:
                return 'unknown';
        }
    }
    isString() {
        return this.type === ScriptVarType.STRING;
    }
    get default() {
        return this.isString() ? this.defaultString : this.defaultInt;
    }
}

// src/lostcity/cache/config/ObjType.ts
class ObjType extends ConfigType {
    static configNames = new Map();
    static configs = [];
    static async load(dir, members) {
        ObjType.configNames = new Map();
        ObjType.configs = [];
        if (!(await fetch(`${dir}/server/obj.dat`)).ok) {
            console.log('Warning: No obj.dat found.');
            return;
        }
        const server = await Packet.load(`${dir}/server/obj.dat`);
        const count = server.g2();
        const jag = await Jagfile.load(`${dir}/client/config`);
        const client = jag.read('obj.dat');
        client.pos = 2;
        for (let id = 0; id < count; id++) {
            const config = new ObjType(id);
            config.decodeType(server);
            config.decodeType(client);
            ObjType.configs[id] = config;
            if (config.debugname) {
                ObjType.configNames.set(config.debugname, id);
            }
        }
        for (let id = 0; id < count; id++) {
            const config = ObjType.configs[id];
            if (config.certtemplate != -1) {
                config.toCertificate();
            }
            if (!members && config.members) {
                config.tradeable = false;
                config.op = null;
                config.iop = null;
                config.params.forEach((_, key) => {
                    if (ParamType.get(key)?.autodisable) {
                        config.params.delete(key);
                    }
                });
            }
        }
    }
    static get(id) {
        return ObjType.configs[id];
    }
    static getId(name) {
        return ObjType.configNames.get(name) ?? -1;
    }
    static getByName(name) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }
        return this.get(id);
    }
    static get count() {
        return this.configs.length;
    }
    static getWearPosId(name) {
        switch (name) {
            case 'hat':
                return 0;
            case 'back':
                return 1;
            case 'front':
                return 2;
            case 'righthand':
                return 3;
            case 'torso':
                return 4;
            case 'lefthand':
                return 5;
            case 'arms':
                return 6;
            case 'legs':
                return 7;
            case 'head':
                return 8;
            case 'hands':
                return 9;
            case 'feet':
                return 10;
            case 'jaw':
                return 11;
            case 'ring':
                return 12;
            case 'quiver':
                return 13;
            default:
                return -1;
        }
    }
    model = 0;
    name = null;
    desc = null;
    recol_s = null;
    recol_d = null;
    zoom2d = 2000;
    xan2d = 0;
    yan2d = 0;
    zan2d = 0;
    xof2d = 0;
    yof2d = 0;
    code9 = false;
    code10 = -1;
    stackable = false;
    cost = 1;
    members = false;
    op = null;
    iop = null;
    manwear = -1;
    manwear2 = -1;
    manwearOffsetY = 0;
    womanwear = -1;
    womanwear2 = -1;
    womanwearOffsetY = 0;
    manwear3 = -1;
    womanwear3 = -1;
    manhead = -1;
    manhead2 = -1;
    womanhead = -1;
    womanhead2 = -1;
    countobj = null;
    countco = null;
    certlink = -1;
    certtemplate = -1;
    wearpos = -1;
    wearpos2 = -1;
    wearpos3 = -1;
    weight = 0;
    category = -1;
    dummyitem = 0;
    tradeable = false;
    respawnrate = 100;
    params = new Map();
    decode(code, dat) {
        if (code === 1) {
            this.model = dat.g2();
        } else if (code === 2) {
            this.name = dat.gjstr();
        } else if (code === 3) {
            this.desc = dat.gjstr();
        } else if (code === 4) {
            this.zoom2d = dat.g2();
        } else if (code === 5) {
            this.xan2d = dat.g2();
        } else if (code === 6) {
            this.yan2d = dat.g2();
        } else if (code === 7) {
            this.xof2d = dat.g2s();
        } else if (code === 8) {
            this.yof2d = dat.g2s();
        } else if (code === 9) {
            this.code9 = true;
        } else if (code === 10) {
            this.code10 = dat.g2();
        } else if (code === 11) {
            this.stackable = true;
        } else if (code === 12) {
            this.cost = dat.g4();
        } else if (code === 13) {
            this.wearpos = dat.g1();
        } else if (code === 14) {
            this.wearpos2 = dat.g1();
        } else if (code === 16) {
            this.members = true;
        } else if (code === 23) {
            this.manwear = dat.g2();
            this.manwearOffsetY = dat.g1b();
        } else if (code === 24) {
            this.manwear2 = dat.g2();
        } else if (code === 25) {
            this.womanwear = dat.g2();
            this.womanwearOffsetY = dat.g1b();
        } else if (code === 26) {
            this.womanwear2 = dat.g2();
        } else if (code === 27) {
            this.wearpos3 = dat.g1();
        } else if (code >= 30 && code < 35) {
            if (!this.op) {
                this.op = new Array(5).fill(null);
            }
            this.op[code - 30] = dat.gjstr();
        } else if (code >= 35 && code < 40) {
            if (!this.iop) {
                this.iop = new Array(5).fill(null);
            }
            this.iop[code - 35] = dat.gjstr();
        } else if (code === 40) {
            const count = dat.g1();
            this.recol_s = new Uint16Array(count);
            this.recol_d = new Uint16Array(count);
            for (let i = 0; i < count; i++) {
                this.recol_s[i] = dat.g2();
                this.recol_d[i] = dat.g2();
            }
        } else if (code === 75) {
            this.weight = dat.g2s();
        } else if (code === 78) {
            this.manwear3 = dat.g2();
        } else if (code === 79) {
            this.womanwear3 = dat.g2();
        } else if (code === 90) {
            this.manhead = dat.g2();
        } else if (code === 91) {
            this.womanhead = dat.g2();
        } else if (code === 92) {
            this.manhead2 = dat.g2();
        } else if (code === 93) {
            this.womanhead2 = dat.g2();
        } else if (code === 94) {
            this.category = dat.g2();
        } else if (code === 95) {
            this.zan2d = dat.g2();
        } else if (code === 96) {
            this.dummyitem = dat.g1();
        } else if (code === 97) {
            this.certlink = dat.g2();
        } else if (code === 98) {
            this.certtemplate = dat.g2();
        } else if (code >= 100 && code < 110) {
            if (!this.countobj || !this.countco) {
                this.countobj = new Uint16Array(10);
                this.countco = new Uint16Array(10);
            }
            this.countobj[code - 100] = dat.g2();
            this.countco[code - 100] = dat.g2();
        } else if (code === 200) {
            this.tradeable = true;
        } else if (code === 201) {
            this.respawnrate = dat.g2();
        } else if (code === 249) {
            this.params = ParamHelper.decodeParams(dat);
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            throw new Error(`Unrecognized obj config code: ${code}`);
        }
    }
    toCertificate() {
        const template = ObjType.get(this.certtemplate);
        this.model = template.model;
        this.zoom2d = template.zoom2d;
        this.xan2d = template.xan2d;
        this.yan2d = template.yan2d;
        this.zan2d = template.zan2d;
        this.xof2d = template.xof2d;
        this.yof2d = template.yof2d;
        this.recol_s = template.recol_s;
        this.recol_d = template.recol_d;
        const link = ObjType.get(this.certlink);
        this.name = link.name;
        this.members = link.members;
        this.cost = link.cost;
        this.tradeable = link.tradeable;
        let article = 'a';
        const c = (link.name || '').toLowerCase().charAt(0);
        if (c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u') {
            article = 'an';
        }
        this.desc = `Swap this note at any bank for ${article} ${link.name}.`;
        this.stackable = true;
    }
}

// src/lostcity/cache/config/SeqFrame.ts
class SeqFrame {
    static instances = [];
    static async load(dir) {
        SeqFrame.instances = [];
        const frame_del = await Packet.load(`${dir}/server/frame_del.dat`);
        for (let i = 0; i < frame_del.data.length; i++) {
            const frame = new SeqFrame();
            frame.delay = frame_del.g1();
            SeqFrame.instances[i] = frame;
        }
    }
    delay = 0;
}

// src/lostcity/cache/config/SeqType.ts
class SeqType extends ConfigType {
    static configNames = new Map();
    static configs = [];
    static async load(dir) {
        SeqType.configNames = new Map();
        SeqType.configs = [];
        if (!(await fetch(`${dir}/server/seq.dat`)).ok) {
            console.log('Warning: No seq.dat found.');
            return;
        }
        const server = await Packet.load(`${dir}/server/seq.dat`);
        const count = server.g2();
        const jag = await Jagfile.load(`${dir}/client/config`);
        const client = jag.read('seq.dat');
        client.pos = 2;
        for (let id = 0; id < count; id++) {
            const config = new SeqType(id);
            config.decodeType(server);
            config.decodeType(client);
            SeqType.configs[id] = config;
            if (config.debugname) {
                SeqType.configNames.set(config.debugname, id);
            }
        }
    }
    static get(id) {
        return SeqType.configs[id];
    }
    static getId(name) {
        return SeqType.configNames.get(name) ?? -1;
    }
    static getByName(name) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }
        return this.get(id);
    }
    static get count() {
        return SeqType.configs.length;
    }
    frames = null;
    iframes = null;
    delay = null;
    replayoff = -1;
    walkmerge = null;
    stretches = false;
    priority = 5;
    mainhand = -1;
    offhand = -1;
    replaycount = 99;
    duration = 0;
    decode(code, dat) {
        if (code === 1) {
            const count = dat.g1();
            this.frames = new Int32Array(count);
            this.iframes = new Int32Array(count);
            this.delay = new Int32Array(count);
            for (let i = 0; i < count; i++) {
                this.frames[i] = dat.g2();
                this.iframes[i] = dat.g2();
                if (this.iframes[i] === 65535) {
                    this.iframes[i] = -1;
                }
                this.delay[i] = dat.g2();
                if (this.delay[i] === 0) {
                    this.delay[i] = SeqFrame.instances[this.frames[i]].delay;
                }
                if (this.delay[i] === 0) {
                    this.delay[i] = 1;
                }
                this.duration += this.delay[i];
            }
        } else if (code === 2) {
            this.replayoff = dat.g2();
        } else if (code === 3) {
            const count = dat.g1();
            this.walkmerge = new Int32Array(count + 1);
            for (let i = 0; i < count; i++) {
                this.walkmerge[i] = dat.g1();
            }
            this.walkmerge[count] = 9999999;
        } else if (code === 4) {
            this.stretches = true;
        } else if (code === 5) {
            this.priority = dat.g1();
        } else if (code === 6) {
            this.mainhand = dat.g2();
        } else if (code === 7) {
            this.offhand = dat.g2();
        } else if (code === 8) {
            this.replaycount = dat.g1();
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            throw new Error(`Unrecognized seq config code: ${code}`);
        }
    }
}

// src/lostcity/cache/config/StructType.ts
class StructType extends ConfigType {
    static configNames = new Map();
    static configs = [];
    static async load(dir) {
        StructType.configNames = new Map();
        StructType.configs = [];
        if (!(await fetch(`${dir}/server/struct.dat`)).ok) {
            console.log('Warning: No struct.dat found.');
            return;
        }
        const dat = await Packet.load(`${dir}/server/struct.dat`);
        const count = dat.g2();
        for (let id = 0; id < count; id++) {
            const config = new StructType(id);
            config.decodeType(dat);
            StructType.configs[id] = config;
            if (config.debugname) {
                StructType.configNames.set(config.debugname, id);
            }
        }
    }
    static get(id) {
        return StructType.configs[id];
    }
    static getId(name) {
        return StructType.configNames.get(name) ?? -1;
    }
    static getByName(name) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }
        return this.get(id);
    }
    static get count() {
        return this.configs.length;
    }
    params = null;
    decode(code, dat) {
        if (code === 249) {
            this.params = ParamHelper.decodeParams(dat);
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            throw new Error(`Unrecognized struct config code: ${code}`);
        }
    }
}

// src/lostcity/cache/config/VarNpcType.ts
class VarNpcType extends ConfigType {
    static configNames = new Map();
    static configs = [];
    static async load(dir) {
        VarNpcType.configNames = new Map();
        VarNpcType.configs = [];
        if (!(await fetch(`${dir}/server/varn.dat`)).ok) {
            console.log('Warning: No varn.dat found.');
            return;
        }
        const dat = await Packet.load(`${dir}/server/varn.dat`);
        const count = dat.g2();
        for (let id = 0; id < count; id++) {
            const config = new VarNpcType(id);
            config.decodeType(dat);
            VarNpcType.configs[id] = config;
            if (config.debugname) {
                VarNpcType.configNames.set(config.debugname, id);
            }
        }
    }
    static get(id) {
        return VarNpcType.configs[id];
    }
    static getId(name) {
        return VarNpcType.configNames.get(name) ?? -1;
    }
    static getByName(name) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }
        return this.get(id);
    }
    static get count() {
        return this.configs.length;
    }
    type = ScriptVarType.INT;
    decode(code, dat) {
        if (code === 1) {
            this.type = dat.g1();
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            console.error(`Unrecognized varn config code: ${code}`);
        }
    }
}

// src/lostcity/cache/config/VarPlayerType.ts
class VarPlayerType extends ConfigType {
    static configNames = new Map();
    static configs = [];
    static SCOPE_TEMP = 0;
    static SCOPE_PERM = 1;
    static PLAYER_RUN = -1;
    static TEMP_RUN = -1;
    static LASTCOMBAT = -1;
    static async load(dir) {
        VarPlayerType.configNames = new Map();
        VarPlayerType.configs = [];
        if (!(await fetch(`${dir}/server/varp.dat`)).ok) {
            console.log('Warning: No varp.dat found.');
        }
        const server = await Packet.load(`${dir}/server/varp.dat`);
        const count = server.g2();
        const jag = await Jagfile.load(`${dir}/client/config`);
        const client = jag.read('varp.dat');
        client.pos = 2;
        for (let id = 0; id < count; id++) {
            const config = new VarPlayerType(id);
            config.decodeType(server);
            config.decodeType(client);
            VarPlayerType.configs[id] = config;
            if (config.debugname) {
                VarPlayerType.configNames.set(config.debugname, id);
            }
        }
        VarPlayerType.PLAYER_RUN = VarPlayerType.getId('player_run');
        VarPlayerType.TEMP_RUN = VarPlayerType.getId('temp_run');
        VarPlayerType.LASTCOMBAT = VarPlayerType.getId('lastcombat');
    }
    static get(id) {
        return VarPlayerType.configs[id];
    }
    static getId(name) {
        return VarPlayerType.configNames.get(name) ?? -1;
    }
    static getByName(name) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }
        return this.get(id);
    }
    static get count() {
        return this.configs.length;
    }
    clientcode = 0;
    scope = VarPlayerType.SCOPE_TEMP;
    type = ScriptVarType.INT;
    protect = true;
    transmit = false;
    decode(code, dat) {
        if (code === 1) {
            this.scope = dat.g1();
        } else if (code === 2) {
            this.type = dat.g1();
        } else if (code === 4) {
            this.protect = false;
        } else if (code === 5) {
            this.clientcode = dat.g2();
        } else if (code === 6) {
            this.transmit = true;
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            console.error(`Unrecognized varp config code: ${code}`);
        }
    }
}

// src/lostcity/cache/config/VarSharedType.ts
class VarSharedType extends ConfigType {
    static configNames = new Map();
    static configs = [];
    static async load(dir) {
        VarSharedType.configNames = new Map();
        VarSharedType.configs = [];
        if (!(await fetch(`${dir}/server/vars.dat`)).ok) {
            console.log('Warning: No vars.dat found.');
            return;
        }
        const dat = await Packet.load(`${dir}/server/vars.dat`);
        const count = dat.g2();
        for (let id = 0; id < count; id++) {
            const config = new VarSharedType(id);
            config.decodeType(dat);
            VarSharedType.configs[id] = config;
            if (config.debugname) {
                VarSharedType.configNames.set(config.debugname, id);
            }
        }
    }
    static get(id) {
        return VarSharedType.configs[id];
    }
    static getId(name) {
        return VarSharedType.configNames.get(name) ?? -1;
    }
    static getByName(name) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }
        return this.get(id);
    }
    static get count() {
        return this.configs.length;
    }
    type = ScriptVarType.INT;
    decode(code, dat) {
        switch (code) {
            case 1:
                this.type = dat.g1();
                break;
            case 250:
                this.debugname = dat.gjstr();
                break;
            default:
                console.error(`Unrecognized vars config code: ${code}`);
                break;
        }
    }
}

// src/lostcity/cache/wordenc/WordEncFragments.ts
class WordEncFragments {
    fragments = [];
    filter(chars) {
        for (let currentIndex = 0; currentIndex < chars.length; ) {
            const numberIndex = this.indexOfNumber(chars, currentIndex);
            if (numberIndex === -1) {
                return;
            }
            let isSymbolOrNotLowercaseAlpha = false;
            for (let index = currentIndex; index >= 0 && index < numberIndex && !isSymbolOrNotLowercaseAlpha; index++) {
                if (!WordEnc2.isSymbol(chars[index]) && !WordEnc2.isNotLowercaseAlpha(chars[index])) {
                    isSymbolOrNotLowercaseAlpha = true;
                }
            }
            let startIndex = 0;
            if (isSymbolOrNotLowercaseAlpha) {
                startIndex = 0;
            }
            if (startIndex === 0) {
                startIndex = 1;
                currentIndex = numberIndex;
            }
            let value = 0;
            for (let index = numberIndex; index < chars.length && index < currentIndex; index++) {
                value = value * 10 + chars[index].charCodeAt(0) - 48;
            }
            if (value <= 255 && currentIndex - numberIndex <= 8) {
                startIndex++;
            } else {
                startIndex = 0;
            }
            if (startIndex === 4) {
                WordEnc2.maskChars(numberIndex, currentIndex, chars);
                startIndex = 0;
            }
            currentIndex = this.indexOfNonNumber(currentIndex, chars);
        }
    }
    isBadFragment(chars) {
        if (WordEnc2.isNumericalChars(chars)) {
            return true;
        }
        const value = this.getInteger(chars);
        const fragments = this.fragments;
        const fragmentsLength = fragments.length;
        if (value === fragments[0] || value === fragments[fragmentsLength - 1]) {
            return true;
        }
        let start = 0;
        let end = fragmentsLength - 1;
        while (start <= end) {
            const mid = ((start + end) / 2) | 0;
            if (value === fragments[mid]) {
                return true;
            } else if (value < fragments[mid]) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }
        return false;
    }
    getInteger(chars) {
        if (chars.length > 6) {
            return 0;
        }
        let value = 0;
        for (let index = 0; index < chars.length; index++) {
            const char = chars[chars.length - index - 1];
            if (WordEnc2.isLowercaseAlpha(char)) {
                value = value * 38 + char.charCodeAt(0) + 1 - 'a'.charCodeAt(0);
            } else if (char == "'") {
                value = value * 38 + 27;
            } else if (WordEnc2.isNumerical(char)) {
                value = value * 38 + char.charCodeAt(0) + 28 - '0'.charCodeAt(0);
            } else if (char != '\0') {
                return 0;
            }
        }
        return value;
    }
    indexOfNumber(chars, offset) {
        for (let index = offset; index < chars.length && index >= 0; index++) {
            if (WordEnc2.isNumerical(chars[index])) {
                return index;
            }
        }
        return -1;
    }
    indexOfNonNumber(offset, chars) {
        for (let index = offset; index < chars.length && index >= 0; index++) {
            if (!WordEnc2.isNumerical(chars[index])) {
                return index;
            }
        }
        return chars.length;
    }
}

// src/lostcity/cache/wordenc/WordEncBadWords.ts
class WordEncBadWords {
    wordEncFragments;
    bads = [];
    badCombinations = [];
    constructor(wordEncFragments) {
        this.wordEncFragments = wordEncFragments;
    }
    filter(chars) {
        for (let comboIndex = 0; comboIndex < 2; comboIndex++) {
            for (let index = this.bads.length - 1; index >= 0; index--) {
                this.filterBadCombinations(this.badCombinations[index], chars, this.bads[index]);
            }
        }
    }
    filterBadCombinations(combos, chars, bads) {
        if (bads.length > chars.length) {
            return;
        }
        for (let startIndex = 0; startIndex <= chars.length - bads.length; startIndex++) {
            let currentIndex = startIndex;
            const {currentIndex: updatedCurrentIndex, badIndex, hasSymbol, hasNumber, hasDigit} = this.processBadCharacters(chars, bads, currentIndex);
            currentIndex = updatedCurrentIndex;
            let currentChar = chars[currentIndex];
            let nextChar = currentIndex + 1 < chars.length ? chars[currentIndex + 1] : '\0';
            if (!(badIndex >= bads.length && (!hasNumber || !hasDigit))) {
                continue;
            }
            let shouldFilter = true;
            let localIndex;
            if (hasSymbol) {
                let isBeforeSymbol = false;
                let isAfterSymbol = false;
                if (startIndex - 1 < 0 || (WordEnc2.isSymbol(chars[startIndex - 1]) && chars[startIndex - 1] != "'")) {
                    isBeforeSymbol = true;
                }
                if (currentIndex >= chars.length || (WordEnc2.isSymbol(chars[currentIndex]) && chars[currentIndex] != "'")) {
                    isAfterSymbol = true;
                }
                if (!isBeforeSymbol || !isAfterSymbol) {
                    let isSubstringValid = false;
                    localIndex = startIndex - 2;
                    if (isBeforeSymbol) {
                        localIndex = startIndex;
                    }
                    while (!isSubstringValid && localIndex < currentIndex) {
                        if (localIndex >= 0 && (!WordEnc2.isSymbol(chars[localIndex]) || chars[localIndex] == "'")) {
                            const localSubString = [];
                            let localSubStringIndex;
                            for (
                                localSubStringIndex = 0;
                                localSubStringIndex < 3 && localIndex + localSubStringIndex < chars.length && (!WordEnc2.isSymbol(chars[localIndex + localSubStringIndex]) || chars[localIndex + localSubStringIndex] == "'");
                                localSubStringIndex++
                            ) {
                                localSubString[localSubStringIndex] = chars[localIndex + localSubStringIndex];
                            }
                            let isSubStringValidCondition = true;
                            if (localSubStringIndex == 0) {
                                isSubStringValidCondition = false;
                            }
                            if (localSubStringIndex < 3 && localIndex - 1 >= 0 && (!WordEnc2.isSymbol(chars[localIndex - 1]) || chars[localIndex - 1] == "'")) {
                                isSubStringValidCondition = false;
                            }
                            if (isSubStringValidCondition && !this.wordEncFragments.isBadFragment(localSubString)) {
                                isSubstringValid = true;
                            }
                        }
                        localIndex++;
                    }
                    if (!isSubstringValid) {
                        shouldFilter = false;
                    }
                }
            } else {
                currentChar = ' ';
                if (startIndex - 1 >= 0) {
                    currentChar = chars[startIndex - 1];
                }
                nextChar = ' ';
                if (currentIndex < chars.length) {
                    nextChar = chars[currentIndex];
                }
                const current = this.getIndex(currentChar);
                const next = this.getIndex(nextChar);
                if (combos != null && this.comboMatches(current, combos, next)) {
                    shouldFilter = false;
                }
            }
            if (!shouldFilter) {
                continue;
            }
            let numeralCount = 0;
            let alphaCount = 0;
            for (let index = startIndex; index < currentIndex; index++) {
                if (WordEnc2.isNumerical(chars[index])) {
                    numeralCount++;
                } else if (WordEnc2.isAlpha(chars[index])) {
                    alphaCount++;
                }
            }
            if (numeralCount <= alphaCount) {
                WordEnc2.maskChars(startIndex, currentIndex, chars);
            }
        }
    }
    processBadCharacters(chars, bads, startIndex) {
        let index = startIndex;
        let badIndex = 0;
        let count = 0;
        let hasSymbol = false;
        let hasNumber = false;
        let hasDigit = false;
        for (; index < chars.length && !(hasNumber && hasDigit); ) {
            if (index >= chars.length || (hasNumber && hasDigit)) {
                break;
            }
            const currentChar = chars[index];
            const nextChar = index + 1 < chars.length ? chars[index + 1] : '\0';
            let currentLength;
            if (badIndex < bads.length && (currentLength = this.getEmulatedBadCharLen(nextChar, String.fromCharCode(bads[badIndex]), currentChar)) > 0) {
                if (currentLength === 1 && WordEnc2.isNumerical(currentChar)) {
                    hasNumber = true;
                }
                if (currentLength === 2 && (WordEnc2.isNumerical(currentChar) || WordEnc2.isNumerical(nextChar))) {
                    hasNumber = true;
                }
                index += currentLength;
                badIndex++;
            } else {
                if (badIndex === 0) {
                    break;
                }
                let previousLength;
                if ((previousLength = this.getEmulatedBadCharLen(nextChar, String.fromCharCode(bads[badIndex - 1]), currentChar)) > 0) {
                    index += previousLength;
                } else {
                    if (badIndex >= bads.length || !WordEnc2.isNotLowercaseAlpha(currentChar)) {
                        break;
                    }
                    if (WordEnc2.isSymbol(currentChar) && currentChar !== "'") {
                        hasSymbol = true;
                    }
                    if (WordEnc2.isNumerical(currentChar)) {
                        hasDigit = true;
                    }
                    index++;
                    count++;
                    if ((((count * 100) / (index - startIndex)) | 0) > 90) {
                        break;
                    }
                }
            }
        }
        return {
            currentIndex: index,
            badIndex,
            hasSymbol,
            hasNumber,
            hasDigit
        };
    }
    getEmulatedBadCharLen(nextChar, badChar, currentChar) {
        if (badChar == currentChar) {
            return 1;
        }
        if (badChar >= 'a' && badChar <= 'm') {
            if (badChar == 'a') {
                if (currentChar != '4' && currentChar != '@' && currentChar != '^') {
                    if (currentChar == '/' && nextChar == '\\') {
                        return 2;
                    }
                    return 0;
                }
                return 1;
            }
            if (badChar == 'b') {
                if (currentChar != '6' && currentChar != '8') {
                    if (currentChar == '1' && nextChar == '3') {
                        return 2;
                    }
                    return 0;
                }
                return 1;
            }
            if (badChar == 'c') {
                if (currentChar != '(' && currentChar != '<' && currentChar != '{' && currentChar != '[') {
                    return 0;
                }
                return 1;
            }
            if (badChar == 'd') {
                if (currentChar == '[' && nextChar == ')') {
                    return 2;
                }
                return 0;
            }
            if (badChar == 'e') {
                if (currentChar != '3' && currentChar != '\u20AC') {
                    return 0;
                }
                return 1;
            }
            if (badChar == 'f') {
                if (currentChar == 'p' && nextChar == 'h') {
                    return 2;
                }
                if (currentChar == '\xA3') {
                    return 1;
                }
                return 0;
            }
            if (badChar == 'g') {
                if (currentChar != '9' && currentChar != '6') {
                    return 0;
                }
                return 1;
            }
            if (badChar == 'h') {
                if (currentChar == '#') {
                    return 1;
                }
                return 0;
            }
            if (badChar == 'i') {
                if (currentChar != 'y' && currentChar != 'l' && currentChar != 'j' && currentChar != '1' && currentChar != '!' && currentChar != ':' && currentChar != ';' && currentChar != '|') {
                    return 0;
                }
                return 1;
            }
            if (badChar == 'j') {
                return 0;
            }
            if (badChar == 'k') {
                return 0;
            }
            if (badChar == 'l') {
                if (currentChar != '1' && currentChar != '|' && currentChar != 'i') {
                    return 0;
                }
                return 1;
            }
            if (badChar == 'm') {
                return 0;
            }
        }
        if (badChar >= 'n' && badChar <= 'z') {
            if (badChar == 'n') {
                return 0;
            }
            if (badChar == 'o') {
                if (currentChar != '0' && currentChar != '*') {
                    if ((currentChar != '(' || nextChar != ')') && (currentChar != '[' || nextChar != ']') && (currentChar != '{' || nextChar != '}') && (currentChar != '<' || nextChar != '>')) {
                        return 0;
                    }
                    return 2;
                }
                return 1;
            }
            if (badChar == 'p') {
                return 0;
            }
            if (badChar == 'q') {
                return 0;
            }
            if (badChar == 'r') {
                return 0;
            }
            if (badChar == 's') {
                if (currentChar != '5' && currentChar != 'z' && currentChar != '$' && currentChar != '2') {
                    return 0;
                }
                return 1;
            }
            if (badChar == 't') {
                if (currentChar != '7' && currentChar != '+') {
                    return 0;
                }
                return 1;
            }
            if (badChar == 'u') {
                if (currentChar == 'v') {
                    return 1;
                }
                if ((currentChar != '\\' || nextChar != '/') && (currentChar != '\\' || nextChar != '|') && (currentChar != '|' || nextChar != '/')) {
                    return 0;
                }
                return 2;
            }
            if (badChar == 'v') {
                if ((currentChar != '\\' || nextChar != '/') && (currentChar != '\\' || nextChar != '|') && (currentChar != '|' || nextChar != '/')) {
                    return 0;
                }
                return 2;
            }
            if (badChar == 'w') {
                if (currentChar == 'v' && nextChar == 'v') {
                    return 2;
                }
                return 0;
            }
            if (badChar == 'x') {
                if ((currentChar != ')' || nextChar != '(') && (currentChar != '}' || nextChar != '{') && (currentChar != ']' || nextChar != '[') && (currentChar != '>' || nextChar != '<')) {
                    return 0;
                }
                return 2;
            }
            if (badChar == 'y') {
                return 0;
            }
            if (badChar == 'z') {
                return 0;
            }
        }
        if (badChar >= '0' && badChar <= '9') {
            if (badChar == '0') {
                if (currentChar == 'o' || currentChar == 'O') {
                    return 1;
                } else if ((currentChar != '(' || nextChar != ')') && (currentChar != '{' || nextChar != '}') && (currentChar != '[' || nextChar != ']')) {
                    return 0;
                } else {
                    return 2;
                }
            } else if (badChar == '1') {
                return currentChar == 'l' ? 1 : 0;
            } else {
                return 0;
            }
        } else if (badChar == ',') {
            return currentChar == '.' ? 1 : 0;
        } else if (badChar == '.') {
            return currentChar == ',' ? 1 : 0;
        } else if (badChar == '!') {
            return currentChar == 'i' ? 1 : 0;
        }
        return 0;
    }
    comboMatches(currentIndex, combos, nextIndex) {
        let start = 0;
        let end = combos.length - 1;
        while (start <= end) {
            const mid = ((start + end) / 2) | 0;
            if (combos[mid][0] === currentIndex && combos[mid][1] === nextIndex) {
                return true;
            } else if (currentIndex < combos[mid][0] || (currentIndex === combos[mid][0] && nextIndex < combos[mid][1])) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }
        return false;
    }
    getIndex(char) {
        if (WordEnc2.isLowercaseAlpha(char)) {
            return char.charCodeAt(0) + 1 - 'a'.charCodeAt(0);
        } else if (char == "'") {
            return 28;
        } else if (WordEnc2.isNumerical(char)) {
            return char.charCodeAt(0) + 29 - '0'.charCodeAt(0);
        }
        return 27;
    }
}

// src/lostcity/cache/wordenc/WordEncDomains.ts
class WordEncDomains {
    wordEncBadWords;
    domains = [];
    constructor(wordEncBadWords) {
        this.wordEncBadWords = wordEncBadWords;
    }
    filter(chars) {
        const ampersat = [...chars];
        const period = [...chars];
        this.wordEncBadWords.filterBadCombinations(null, ampersat, WordEnc2.AMPERSAT);
        this.wordEncBadWords.filterBadCombinations(null, period, WordEnc2.PERIOD);
        for (let index = this.domains.length - 1; index >= 0; index--) {
            this.filterDomain(period, ampersat, this.domains[index], chars);
        }
    }
    getEmulatedDomainCharLen(nextChar, domainChar, currentChar) {
        if (domainChar == currentChar) {
            return 1;
        } else if (domainChar == 'o' && currentChar == '0') {
            return 1;
        } else if (domainChar == 'o' && currentChar == '(' && nextChar == ')') {
            return 2;
        } else if (domainChar == 'c' && (currentChar == '(' || currentChar == '<' || currentChar == '[')) {
            return 1;
        } else if (domainChar == 'e' && currentChar == '\u20AC') {
            return 1;
        } else if (domainChar == 's' && currentChar == '$') {
            return 1;
        } else if (domainChar == 'l' && currentChar == 'i') {
            return 1;
        }
        return 0;
    }
    filterDomain(period, ampersat, domain, chars) {
        const domainLength = domain.length;
        const charsLength = chars.length;
        for (let index = 0; index <= charsLength - domainLength; index++) {
            const {matched, currentIndex} = this.findMatchingDomain(index, domain, chars);
            if (!matched) {
                continue;
            }
            const ampersatStatus = WordEnc2.prefixSymbolStatus(index, chars, 3, ampersat, ['@']);
            const periodStatus = WordEnc2.suffixSymbolStatus(currentIndex - 1, chars, 3, period, ['.', ',']);
            const shouldFilter = ampersatStatus > 2 || periodStatus > 2;
            if (!shouldFilter) {
                continue;
            }
            WordEnc2.maskChars(index, currentIndex, chars);
        }
    }
    findMatchingDomain(startIndex, domain, chars) {
        const domainLength = domain.length;
        let currentIndex = startIndex;
        let domainIndex = 0;
        while (currentIndex < chars.length && domainIndex < domainLength) {
            const currentChar = chars[currentIndex];
            const nextChar = currentIndex + 1 < chars.length ? chars[currentIndex + 1] : '\0';
            const currentLength = this.getEmulatedDomainCharLen(nextChar, String.fromCharCode(domain[domainIndex]), currentChar);
            if (currentLength > 0) {
                currentIndex += currentLength;
                domainIndex++;
            } else {
                if (domainIndex === 0) break;
                const previousLength = this.getEmulatedDomainCharLen(nextChar, String.fromCharCode(domain[domainIndex - 1]), currentChar);
                if (previousLength > 0) {
                    currentIndex += previousLength;
                    if (domainIndex === 1) startIndex++;
                } else {
                    if (domainIndex >= domainLength || !WordEnc2.isSymbol(currentChar)) break;
                    currentIndex++;
                }
            }
        }
        return {matched: domainIndex >= domainLength, currentIndex};
    }
}

// src/lostcity/cache/wordenc/WordEncTlds.ts
class WordEncTlds {
    wordEncBadWords;
    wordEncDomains;
    tlds = [];
    tldTypes = [];
    constructor(wordEncBadWords, wordEncDomains) {
        this.wordEncBadWords = wordEncBadWords;
        this.wordEncDomains = wordEncDomains;
    }
    filter(chars) {
        const period = [...chars];
        const slash = [...chars];
        this.wordEncBadWords.filterBadCombinations(null, period, WordEnc2.PERIOD);
        this.wordEncBadWords.filterBadCombinations(null, slash, WordEnc2.SLASH);
        for (let index = 0; index < this.tlds.length; index++) {
            this.filterTld(slash, this.tldTypes[index], chars, this.tlds[index], period);
        }
    }
    filterTld(slash, tldType, chars, tld, period) {
        if (tld.length > chars.length) {
            return;
        }
        for (let index = 0; index <= chars.length - tld.length; index++) {
            const {currentIndex, tldIndex} = this.processTlds(chars, tld, index);
            if (tldIndex < tld.length) {
                continue;
            }
            let shouldFilter = false;
            const periodFilterStatus = WordEnc2.prefixSymbolStatus(index, chars, 3, period, [',', '.']);
            const slashFilterStatus = WordEnc2.suffixSymbolStatus(currentIndex - 1, chars, 5, slash, ['\\', '/']);
            if (tldType == 1 && periodFilterStatus > 0 && slashFilterStatus > 0) {
                shouldFilter = true;
            }
            if (tldType == 2 && ((periodFilterStatus > 2 && slashFilterStatus > 0) || (periodFilterStatus > 0 && slashFilterStatus > 2))) {
                shouldFilter = true;
            }
            if (tldType == 3 && periodFilterStatus > 0 && slashFilterStatus > 2) {
                shouldFilter = true;
            }
            if (!shouldFilter) {
                continue;
            }
            let startFilterIndex = index;
            let endFilterIndex = currentIndex - 1;
            let foundPeriod = false;
            let periodIndex;
            if (periodFilterStatus > 2) {
                if (periodFilterStatus == 4) {
                    foundPeriod = false;
                    for (periodIndex = index - 1; periodIndex >= 0; periodIndex--) {
                        if (foundPeriod) {
                            if (period[periodIndex] != '*') {
                                break;
                            }
                            startFilterIndex = periodIndex;
                        } else if (period[periodIndex] == '*') {
                            startFilterIndex = periodIndex;
                            foundPeriod = true;
                        }
                    }
                }
                foundPeriod = false;
                for (periodIndex = startFilterIndex - 1; periodIndex >= 0; periodIndex--) {
                    if (foundPeriod) {
                        if (WordEnc2.isSymbol(chars[periodIndex])) {
                            break;
                        }
                        startFilterIndex = periodIndex;
                    } else if (!WordEnc2.isSymbol(chars[periodIndex])) {
                        foundPeriod = true;
                        startFilterIndex = periodIndex;
                    }
                }
            }
            if (slashFilterStatus > 2) {
                if (slashFilterStatus == 4) {
                    foundPeriod = false;
                    for (periodIndex = endFilterIndex + 1; periodIndex < chars.length; periodIndex++) {
                        if (foundPeriod) {
                            if (slash[periodIndex] != '*') {
                                break;
                            }
                            endFilterIndex = periodIndex;
                        } else if (slash[periodIndex] == '*') {
                            endFilterIndex = periodIndex;
                            foundPeriod = true;
                        }
                    }
                }
                foundPeriod = false;
                for (periodIndex = endFilterIndex + 1; periodIndex < chars.length; periodIndex++) {
                    if (foundPeriod) {
                        if (WordEnc2.isSymbol(chars[periodIndex])) {
                            break;
                        }
                        endFilterIndex = periodIndex;
                    } else if (!WordEnc2.isSymbol(chars[periodIndex])) {
                        foundPeriod = true;
                        endFilterIndex = periodIndex;
                    }
                }
            }
            WordEnc2.maskChars(startFilterIndex, endFilterIndex + 1, chars);
        }
    }
    processTlds(chars, tld, currentIndex) {
        let tldIndex = 0;
        while (currentIndex < chars.length && tldIndex < tld.length) {
            const currentChar = chars[currentIndex];
            const nextChar = currentIndex + 1 < chars.length ? chars[currentIndex + 1] : '\0';
            let currentLength;
            if ((currentLength = this.wordEncDomains.getEmulatedDomainCharLen(nextChar, String.fromCharCode(tld[tldIndex]), currentChar)) > 0) {
                currentIndex += currentLength;
                tldIndex++;
            } else {
                if (tldIndex === 0) {
                    break;
                }
                let previousLength;
                if ((previousLength = this.wordEncDomains.getEmulatedDomainCharLen(nextChar, String.fromCharCode(tld[tldIndex - 1]), currentChar)) > 0) {
                    currentIndex += previousLength;
                } else {
                    if (!WordEnc2.isSymbol(currentChar)) {
                        break;
                    }
                    currentIndex++;
                }
            }
        }
        return {currentIndex, tldIndex};
    }
}

// src/lostcity/cache/wordenc/WordEnc.ts
class WordEnc2 {
    static PERIOD = new Uint16Array(
        ['d', 'o', 't']
            .join('')
            .split('')
            .map(char => char.charCodeAt(0))
    );
    static AMPERSAT = new Uint16Array(
        ['(', 'a', ')']
            .join('')
            .split('')
            .map(char => char.charCodeAt(0))
    );
    static SLASH = new Uint16Array(
        ['s', 'l', 'a', 's', 'h']
            .join('')
            .split('')
            .map(char => char.charCodeAt(0))
    );
    static wordEncFragments = new WordEncFragments();
    static wordEncBadWords = new WordEncBadWords(this.wordEncFragments);
    static wordEncDomains = new WordEncDomains(this.wordEncBadWords);
    static wordEncTlds = new WordEncTlds(this.wordEncBadWords, this.wordEncDomains);
    static whitelist = ['cook', "cook's", 'cooks', 'seeks', 'sheet'];
    static async load(dir) {
        if (!(await fetch(`${dir}/client/wordenc`)).ok) {
            console.log('Warning: No wordenc found.');
            return;
        }
        const wordenc = await Jagfile.load(`${dir}/client/wordenc`);
        const fragmentsenc = wordenc.read('fragmentsenc.txt');
        if (!fragmentsenc) {
            console.log('Warning: No fragmentsenc found.');
            return;
        }
        const badenc = wordenc.read('badenc.txt');
        if (!badenc) {
            console.log('Warning: No badenc found.');
            return;
        }
        const domainenc = wordenc.read('domainenc.txt');
        if (!domainenc) {
            console.log('Warning: No domainenc found.');
            return;
        }
        const tldlist = wordenc.read('tldlist.txt');
        if (!tldlist) {
            console.log('Warning: No tldlist found.');
            return;
        }
        this.decodeBadEnc(badenc);
        this.decodeDomainEnc(domainenc);
        this.decodeFragmentsEnc(fragmentsenc);
        this.decodeTldList(tldlist);
    }
    static filter(input) {
        const characters = [...input];
        this.format(characters);
        const trimmed = characters.join('').trim();
        const lowercase = trimmed.toLowerCase();
        const filtered = [...lowercase];
        this.wordEncTlds.filter(filtered);
        this.wordEncBadWords.filter(filtered);
        this.wordEncDomains.filter(filtered);
        this.wordEncFragments.filter(filtered);
        for (let index = 0; index < this.whitelist.length; index++) {
            let offset = -1;
            while ((offset = lowercase.indexOf(this.whitelist[index], offset + 1)) !== -1) {
                const whitelisted = [...this.whitelist[index]];
                for (let charIndex = 0; charIndex < whitelisted.length; charIndex++) {
                    filtered[charIndex + offset] = whitelisted[charIndex];
                }
            }
        }
        this.replaceUppercases(filtered, [...trimmed]);
        this.formatUppercases(filtered);
        return filtered.join('').trim();
    }
    static isSymbol(char) {
        return !this.isAlpha(char) && !this.isNumerical(char);
    }
    static isNotLowercaseAlpha(char) {
        return this.isLowercaseAlpha(char) ? char == 'v' || char == 'x' || char == 'j' || char == 'q' || char == 'z' : true;
    }
    static isAlpha(char) {
        return this.isLowercaseAlpha(char) || this.isUppercaseAlpha(char);
    }
    static isNumerical(char) {
        return char >= '0' && char <= '9';
    }
    static isLowercaseAlpha(char) {
        return char >= 'a' && char <= 'z';
    }
    static isUppercaseAlpha(char) {
        return char >= 'A' && char <= 'Z';
    }
    static isNumericalChars(chars) {
        for (let index = 0; index < chars.length; index++) {
            if (!this.isNumerical(chars[index]) && chars[index] !== '\0') {
                return false;
            }
        }
        return true;
    }
    static maskChars(offset, length, chars) {
        for (let index = offset; index < length; index++) {
            chars[index] = '*';
        }
    }
    static maskedCountBackwards(chars, offset) {
        let count = 0;
        for (let index = offset - 1; index >= 0 && WordEnc2.isSymbol(chars[index]); index--) {
            if (chars[index] === '*') {
                count++;
            }
        }
        return count;
    }
    static maskedCountForwards(chars, offset) {
        let count = 0;
        for (let index = offset + 1; index < chars.length && this.isSymbol(chars[index]); index++) {
            if (chars[index] === '*') {
                count++;
            }
        }
        return count;
    }
    static maskedCharsStatus(chars, filtered, offset, length, prefix) {
        const count = prefix ? this.maskedCountBackwards(filtered, offset) : this.maskedCountForwards(filtered, offset);
        if (count >= length) {
            return 4;
        } else if (this.isSymbol(prefix ? chars[offset - 1] : chars[offset + 1])) {
            return 1;
        }
        return 0;
    }
    static prefixSymbolStatus(offset, chars, length, symbolChars, symbols) {
        if (offset === 0) {
            return 2;
        }
        for (let index = offset - 1; index >= 0 && WordEnc2.isSymbol(chars[index]); index--) {
            if (symbols.includes(chars[index])) {
                return 3;
            }
        }
        return WordEnc2.maskedCharsStatus(chars, symbolChars, offset, length, true);
    }
    static suffixSymbolStatus(offset, chars, length, symbolChars, symbols) {
        if (offset + 1 === chars.length) {
            return 2;
        }
        for (let index = offset + 1; index < chars.length && WordEnc2.isSymbol(chars[index]); index++) {
            if (symbols.includes(chars[index])) {
                return 3;
            }
        }
        return WordEnc2.maskedCharsStatus(chars, symbolChars, offset, length, false);
    }
    static decodeTldList(packet) {
        const count = packet.g4();
        for (let index = 0; index < count; index++) {
            this.wordEncTlds.tldTypes[index] = packet.g1();
            this.wordEncTlds.tlds[index] = new Uint16Array(packet.g1()).map(() => packet.g1());
        }
    }
    static decodeBadEnc(packet) {
        const count = packet.g4();
        for (let index = 0; index < count; index++) {
            this.wordEncBadWords.bads[index] = new Uint16Array(packet.g1()).map(() => packet.g1());
            const combos = new Array(packet.g1()).fill([]).map(() => [packet.g1b(), packet.g1b()]);
            if (combos.length > 0) {
                this.wordEncBadWords.badCombinations[index] = combos;
            }
        }
    }
    static decodeDomainEnc(packet) {
        const count = packet.g4();
        for (let index = 0; index < count; index++) {
            this.wordEncDomains.domains[index] = new Uint16Array(packet.g1()).map(() => packet.g1());
        }
    }
    static decodeFragmentsEnc(packet) {
        const count = packet.g4();
        for (let index = 0; index < count; index++) {
            this.wordEncFragments.fragments[index] = packet.g2();
        }
    }
    static format(chars) {
        let pos = 0;
        for (let index = 0; index < chars.length; index++) {
            if (this.isCharacterAllowed(chars[index])) {
                chars[pos] = chars[index];
            } else {
                chars[pos] = ' ';
            }
            if (pos === 0 || chars[pos] !== ' ' || chars[pos - 1] !== ' ') {
                pos++;
            }
        }
        for (let index = pos; index < chars.length; index++) {
            chars[index] = ' ';
        }
    }
    static isCharacterAllowed(char) {
        return (char >= ' ' && char <= '\x7F') || char == ' ' || char == '\n' || char == '\t' || char == '\xA3' || char == '\u20AC';
    }
    static replaceUppercases(chars, comparison) {
        for (let index = 0; index < comparison.length; index++) {
            if (chars[index] !== '*' && this.isUppercaseAlpha(comparison[index])) {
                chars[index] = comparison[index];
            }
        }
    }
    static formatUppercases(chars) {
        let flagged = true;
        for (let index = 0; index < chars.length; index++) {
            const char = chars[index];
            if (!this.isAlpha(char)) {
                flagged = true;
            } else if (flagged) {
                if (this.isLowercaseAlpha(char)) {
                    flagged = false;
                }
            } else if (this.isUppercaseAlpha(char)) {
                chars[index] = String.fromCharCode(char.charCodeAt(0) + 'a'.charCodeAt(0) - 65);
            }
        }
    }
}

// src/lostcity/cache/config/SpotanimType.ts
class SpotanimType extends ConfigType {
    static configNames = new Map();
    static configs = [];
    static async load(dir) {
        SpotanimType.configNames = new Map();
        SpotanimType.configs = [];
        if (!(await fetch(`${dir}/server/spotanim.dat`)).ok) {
            console.log('Warning: No spotanim.dat found.');
            return;
        }
        const server = await Packet.load(`${dir}/server/spotanim.dat`);
        const count = server.g2();
        const jag = await Jagfile.load(`${dir}/client/config`);
        const client = jag.read('spotanim.dat');
        client.pos = 2;
        for (let id = 0; id < count; id++) {
            const config = new SpotanimType(id);
            config.decodeType(server);
            config.decodeType(client);
            SpotanimType.configs[id] = config;
            if (config.debugname) {
                SpotanimType.configNames.set(config.debugname, id);
            }
        }
    }
    static get(id) {
        return SpotanimType.configs[id];
    }
    static getId(name) {
        return SpotanimType.configNames.get(name) ?? -1;
    }
    static getByName(name) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }
        return this.get(id);
    }
    static get count() {
        return this.configs.length;
    }
    model = 0;
    anim = -1;
    hasalpha = false;
    recol_s = new Uint16Array(6);
    recol_d = new Uint16Array(6);
    resizeh = 128;
    resizev = 128;
    orientation = 0;
    ambient = 0;
    contrast = 0;
    decode(code, dat) {
        if (code === 1) {
            this.model = dat.g2();
        } else if (code === 2) {
            this.anim = dat.g2();
        } else if (code === 3) {
            this.hasalpha = true;
        } else if (code === 4) {
            this.resizeh = dat.g2();
        } else if (code === 5) {
            this.resizev = dat.g2();
        } else if (code === 6) {
            this.orientation = dat.g2();
        } else if (code === 7) {
            this.ambient = dat.g1();
        } else if (code === 8) {
            this.contrast = dat.g1();
        } else if (code >= 40 && code < 50) {
            this.recol_s[code - 40] = dat.g2();
        } else if (code >= 50 && code < 60) {
            this.recol_d[code - 50] = dat.g2();
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            throw new Error(`Unrecognized spotanim config code: ${code}`);
        }
    }
}

// src/lostcity/engine/script/ScriptPointer.ts
function checkedHandler(pointer, handler) {
    return function (state) {
        if (typeof pointer === 'number') {
            state.pointerCheck(pointer);
        } else {
            state.pointerCheck(pointer[state.intOperand]);
        }
        handler(state);
    };
}
var ScriptPointer;
(ScriptPointer2 => {
    ScriptPointer2[(ScriptPointer2['ActivePlayer'] = 0)] = 'ActivePlayer';
    ScriptPointer2[(ScriptPointer2['ActivePlayer2'] = 1)] = 'ActivePlayer2';
    ScriptPointer2[(ScriptPointer2['ProtectedActivePlayer'] = 2)] = 'ProtectedActivePlayer';
    ScriptPointer2[(ScriptPointer2['ProtectedActivePlayer2'] = 3)] = 'ProtectedActivePlayer2';
    ScriptPointer2[(ScriptPointer2['ActiveNpc'] = 4)] = 'ActiveNpc';
    ScriptPointer2[(ScriptPointer2['ActiveNpc2'] = 5)] = 'ActiveNpc2';
    ScriptPointer2[(ScriptPointer2['ActiveLoc'] = 6)] = 'ActiveLoc';
    ScriptPointer2[(ScriptPointer2['ActiveLoc2'] = 7)] = 'ActiveLoc2';
    ScriptPointer2[(ScriptPointer2['ActiveObj'] = 8)] = 'ActiveObj';
    ScriptPointer2[(ScriptPointer2['ActiveObj2'] = 9)] = 'ActiveObj2';
    ScriptPointer2[(ScriptPointer2['_LAST'] = 10)] = '_LAST';
})((ScriptPointer ||= {}));
var ActiveNpc = [4 /* ActiveNpc */, 5 /* ActiveNpc2 */];
var ActiveLoc = [6 /* ActiveLoc */, 7 /* ActiveLoc2 */];
var ActiveObj = [8 /* ActiveObj */, 9 /* ActiveObj2 */];
var ActivePlayer = [0 /* ActivePlayer */, 1 /* ActivePlayer2 */];
var ProtectedActivePlayer = [2 /* ProtectedActivePlayer */, 3 /* ProtectedActivePlayer2 */];
var ScriptPointer_default = ScriptPointer;

// node:path
var L = Object.create;
var b = Object.defineProperty;
var z = Object.getOwnPropertyDescriptor;
var D = Object.getOwnPropertyNames;
var T = Object.getPrototypeOf;
var R = Object.prototype.hasOwnProperty;
var _ = (f, e) => () => (e || f((e = {exports: {}}).exports, e), e.exports);
var E = (f, e) => {
    for (var r in e) b(f, r, {get: e[r], enumerable: true});
};
var C = (f, e, r, l) => {
    if ((e && typeof e == 'object') || typeof e == 'function') for (let i of D(e)) !R.call(f, i) && i !== r && b(f, i, {get: () => e[i], enumerable: !(l = z(e, i)) || l.enumerable});
    return f;
};
var A = (f, e, r) => (C(f, e, 'default'), r && C(r, e, 'default'));
var y = (f, e, r) => ((r = f != null ? L(T(f)) : {}), C(e || !f || !f.__esModule ? b(r, 'default', {value: f, enumerable: true}) : r, f));
var h = _((F, S) => {
    function c(f) {
        if (typeof f != 'string') throw new TypeError('Path must be a string. Received ' + JSON.stringify(f));
    }
    function w(f, e) {
        for (var r = '', l = 0, i = -1, s = 0, n, t = 0; t <= f.length; ++t) {
            if (t < f.length) n = f.charCodeAt(t);
            else {
                if (n === 47) break;
                n = 47;
            }
            if (n === 47) {
                if (!(i === t - 1 || s === 1))
                    if (i !== t - 1 && s === 2) {
                        if (r.length < 2 || l !== 2 || r.charCodeAt(r.length - 1) !== 46 || r.charCodeAt(r.length - 2) !== 46) {
                            if (r.length > 2) {
                                var a = r.lastIndexOf('/');
                                if (a !== r.length - 1) {
                                    a === -1 ? ((r = ''), (l = 0)) : ((r = r.slice(0, a)), (l = r.length - 1 - r.lastIndexOf('/'))), (i = t), (s = 0);
                                    continue;
                                }
                            } else if (r.length === 2 || r.length === 1) {
                                (r = ''), (l = 0), (i = t), (s = 0);
                                continue;
                            }
                        }
                        e && (r.length > 0 ? (r += '/..') : (r = '..'), (l = 2));
                    } else r.length > 0 ? (r += '/' + f.slice(i + 1, t)) : (r = f.slice(i + 1, t)), (l = t - i - 1);
                (i = t), (s = 0);
            } else n === 46 && s !== -1 ? ++s : (s = -1);
        }
        return r;
    }
    function J(f, e) {
        var r = e.dir || e.root,
            l = e.base || (e.name || '') + (e.ext || '');
        return r ? (r === e.root ? r + l : r + f + l) : l;
    }
    var g = {
        resolve: function () {
            for (var e = '', r = false, l, i = arguments.length - 1; i >= -1 && !r; i--) {
                var s;
                i >= 0 ? (s = arguments[i]) : (l === undefined && (l = process.cwd()), (s = l)), c(s), s.length !== 0 && ((e = s + '/' + e), (r = s.charCodeAt(0) === 47));
            }
            return (e = w(e, !r)), r ? (e.length > 0 ? '/' + e : '/') : e.length > 0 ? e : '.';
        },
        normalize: function (e) {
            if ((c(e), e.length === 0)) return '.';
            var r = e.charCodeAt(0) === 47,
                l = e.charCodeAt(e.length - 1) === 47;
            return (e = w(e, !r)), e.length === 0 && !r && (e = '.'), e.length > 0 && l && (e += '/'), r ? '/' + e : e;
        },
        isAbsolute: function (e) {
            return c(e), e.length > 0 && e.charCodeAt(0) === 47;
        },
        join: function () {
            if (arguments.length === 0) return '.';
            for (var e, r = 0; r < arguments.length; ++r) {
                var l = arguments[r];
                c(l), l.length > 0 && (e === undefined ? (e = l) : (e += '/' + l));
            }
            return e === undefined ? '.' : g.normalize(e);
        },
        relative: function (e, r) {
            if ((c(e), c(r), e === r || ((e = g.resolve(e)), (r = g.resolve(r)), e === r))) return '';
            for (var l = 1; l < e.length && e.charCodeAt(l) === 47; ++l);
            for (var i = e.length, s = i - l, n = 1; n < r.length && r.charCodeAt(n) === 47; ++n);
            for (var t = r.length, a = t - n, v = s < a ? s : a, u = -1, o = 0; o <= v; ++o) {
                if (o === v) {
                    if (a > v) {
                        if (r.charCodeAt(n + o) === 47) return r.slice(n + o + 1);
                        if (o === 0) return r.slice(n + o);
                    } else s > v && (e.charCodeAt(l + o) === 47 ? (u = o) : o === 0 && (u = 0));
                    break;
                }
                var k = e.charCodeAt(l + o),
                    P = r.charCodeAt(n + o);
                if (k !== P) break;
                k === 47 && (u = o);
            }
            var d = '';
            for (o = l + u + 1; o <= i; ++o) (o === i || e.charCodeAt(o) === 47) && (d.length === 0 ? (d += '..') : (d += '/..'));
            return d.length > 0 ? d + r.slice(n + u) : ((n += u), r.charCodeAt(n) === 47 && ++n, r.slice(n));
        },
        _makeLong: function (e) {
            return e;
        },
        dirname: function (e) {
            if ((c(e), e.length === 0)) return '.';
            for (var r = e.charCodeAt(0), l = r === 47, i = -1, s = true, n = e.length - 1; n >= 1; --n)
                if (((r = e.charCodeAt(n)), r === 47)) {
                    if (!s) {
                        i = n;
                        break;
                    }
                } else s = false;
            return i === -1 ? (l ? '/' : '.') : l && i === 1 ? '//' : e.slice(0, i);
        },
        basename: function (e, r) {
            if (r !== undefined && typeof r != 'string') throw new TypeError('"ext" argument must be a string');
            c(e);
            var l = 0,
                i = -1,
                s = true,
                n;
            if (r !== undefined && r.length > 0 && r.length <= e.length) {
                if (r.length === e.length && r === e) return '';
                var t = r.length - 1,
                    a = -1;
                for (n = e.length - 1; n >= 0; --n) {
                    var v = e.charCodeAt(n);
                    if (v === 47) {
                        if (!s) {
                            l = n + 1;
                            break;
                        }
                    } else a === -1 && ((s = false), (a = n + 1)), t >= 0 && (v === r.charCodeAt(t) ? --t === -1 && (i = n) : ((t = -1), (i = a)));
                }
                return l === i ? (i = a) : i === -1 && (i = e.length), e.slice(l, i);
            } else {
                for (n = e.length - 1; n >= 0; --n)
                    if (e.charCodeAt(n) === 47) {
                        if (!s) {
                            l = n + 1;
                            break;
                        }
                    } else i === -1 && ((s = false), (i = n + 1));
                return i === -1 ? '' : e.slice(l, i);
            }
        },
        extname: function (e) {
            c(e);
            for (var r = -1, l = 0, i = -1, s = true, n = 0, t = e.length - 1; t >= 0; --t) {
                var a = e.charCodeAt(t);
                if (a === 47) {
                    if (!s) {
                        l = t + 1;
                        break;
                    }
                    continue;
                }
                i === -1 && ((s = false), (i = t + 1)), a === 46 ? (r === -1 ? (r = t) : n !== 1 && (n = 1)) : r !== -1 && (n = -1);
            }
            return r === -1 || i === -1 || n === 0 || (n === 1 && r === i - 1 && r === l + 1) ? '' : e.slice(r, i);
        },
        format: function (e) {
            if (e === null || typeof e != 'object') throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e);
            return J('/', e);
        },
        parse: function (e) {
            c(e);
            var r = {root: '', dir: '', base: '', ext: '', name: ''};
            if (e.length === 0) return r;
            var l = e.charCodeAt(0),
                i = l === 47,
                s;
            i ? ((r.root = '/'), (s = 1)) : (s = 0);
            for (var n = -1, t = 0, a = -1, v = true, u = e.length - 1, o = 0; u >= s; --u) {
                if (((l = e.charCodeAt(u)), l === 47)) {
                    if (!v) {
                        t = u + 1;
                        break;
                    }
                    continue;
                }
                a === -1 && ((v = false), (a = u + 1)), l === 46 ? (n === -1 ? (n = u) : o !== 1 && (o = 1)) : n !== -1 && (o = -1);
            }
            return (
                n === -1 || a === -1 || o === 0 || (o === 1 && n === a - 1 && n === t + 1)
                    ? a !== -1 && (t === 0 && i ? (r.base = r.name = e.slice(1, a)) : (r.base = r.name = e.slice(t, a)))
                    : (t === 0 && i ? ((r.name = e.slice(1, n)), (r.base = e.slice(1, a))) : ((r.name = e.slice(t, n)), (r.base = e.slice(t, a))), (r.ext = e.slice(n, a))),
                t > 0 ? (r.dir = e.slice(0, t - 1)) : i && (r.dir = '/'),
                r
            );
        },
        sep: '/',
        delimiter: ':',
        win32: null,
        posix: null
    };
    g.posix = g;
    S.exports = g;
});
var m = {};
E(m, {default: () => q});
A(m, y(h()));
var q = y(h());

// src/lostcity/engine/script/ScriptOpcode.ts
var ScriptOpcode;
(ScriptOpcode2 => {
    ScriptOpcode2[(ScriptOpcode2['PUSH_CONSTANT_INT'] = 0)] = 'PUSH_CONSTANT_INT';
    ScriptOpcode2[(ScriptOpcode2['PUSH_VARP'] = 1)] = 'PUSH_VARP';
    ScriptOpcode2[(ScriptOpcode2['POP_VARP'] = 2)] = 'POP_VARP';
    ScriptOpcode2[(ScriptOpcode2['PUSH_CONSTANT_STRING'] = 3)] = 'PUSH_CONSTANT_STRING';
    ScriptOpcode2[(ScriptOpcode2['PUSH_VARN'] = 4)] = 'PUSH_VARN';
    ScriptOpcode2[(ScriptOpcode2['POP_VARN'] = 5)] = 'POP_VARN';
    ScriptOpcode2[(ScriptOpcode2['BRANCH'] = 6)] = 'BRANCH';
    ScriptOpcode2[(ScriptOpcode2['BRANCH_NOT'] = 7)] = 'BRANCH_NOT';
    ScriptOpcode2[(ScriptOpcode2['BRANCH_EQUALS'] = 8)] = 'BRANCH_EQUALS';
    ScriptOpcode2[(ScriptOpcode2['BRANCH_LESS_THAN'] = 9)] = 'BRANCH_LESS_THAN';
    ScriptOpcode2[(ScriptOpcode2['BRANCH_GREATER_THAN'] = 10)] = 'BRANCH_GREATER_THAN';
    ScriptOpcode2[(ScriptOpcode2['PUSH_VARS'] = 11)] = 'PUSH_VARS';
    ScriptOpcode2[(ScriptOpcode2['POP_VARS'] = 12)] = 'POP_VARS';
    ScriptOpcode2[(ScriptOpcode2['RETURN'] = 21)] = 'RETURN';
    ScriptOpcode2[(ScriptOpcode2['GOSUB'] = 22)] = 'GOSUB';
    ScriptOpcode2[(ScriptOpcode2['JUMP'] = 23)] = 'JUMP';
    ScriptOpcode2[(ScriptOpcode2['SWITCH'] = 24)] = 'SWITCH';
    ScriptOpcode2[(ScriptOpcode2['BRANCH_LESS_THAN_OR_EQUALS'] = 31)] = 'BRANCH_LESS_THAN_OR_EQUALS';
    ScriptOpcode2[(ScriptOpcode2['BRANCH_GREATER_THAN_OR_EQUALS'] = 32)] = 'BRANCH_GREATER_THAN_OR_EQUALS';
    ScriptOpcode2[(ScriptOpcode2['PUSH_INT_LOCAL'] = 33)] = 'PUSH_INT_LOCAL';
    ScriptOpcode2[(ScriptOpcode2['POP_INT_LOCAL'] = 34)] = 'POP_INT_LOCAL';
    ScriptOpcode2[(ScriptOpcode2['PUSH_STRING_LOCAL'] = 35)] = 'PUSH_STRING_LOCAL';
    ScriptOpcode2[(ScriptOpcode2['POP_STRING_LOCAL'] = 36)] = 'POP_STRING_LOCAL';
    ScriptOpcode2[(ScriptOpcode2['JOIN_STRING'] = 37)] = 'JOIN_STRING';
    ScriptOpcode2[(ScriptOpcode2['POP_INT_DISCARD'] = 38)] = 'POP_INT_DISCARD';
    ScriptOpcode2[(ScriptOpcode2['POP_STRING_DISCARD'] = 39)] = 'POP_STRING_DISCARD';
    ScriptOpcode2[(ScriptOpcode2['GOSUB_WITH_PARAMS'] = 40)] = 'GOSUB_WITH_PARAMS';
    ScriptOpcode2[(ScriptOpcode2['JUMP_WITH_PARAMS'] = 41)] = 'JUMP_WITH_PARAMS';
    ScriptOpcode2[(ScriptOpcode2['DEFINE_ARRAY'] = 44)] = 'DEFINE_ARRAY';
    ScriptOpcode2[(ScriptOpcode2['PUSH_ARRAY_INT'] = 45)] = 'PUSH_ARRAY_INT';
    ScriptOpcode2[(ScriptOpcode2['POP_ARRAY_INT'] = 46)] = 'POP_ARRAY_INT';
    ScriptOpcode2[(ScriptOpcode2['COORDX'] = 1000)] = 'COORDX';
    ScriptOpcode2[(ScriptOpcode2['COORDY'] = 1001)] = 'COORDY';
    ScriptOpcode2[(ScriptOpcode2['COORDZ'] = 1002)] = 'COORDZ';
    ScriptOpcode2[(ScriptOpcode2['DISTANCE'] = 1003)] = 'DISTANCE';
    ScriptOpcode2[(ScriptOpcode2['HUNTALL'] = 1004)] = 'HUNTALL';
    ScriptOpcode2[(ScriptOpcode2['HUNTNEXT'] = 1005)] = 'HUNTNEXT';
    ScriptOpcode2[(ScriptOpcode2['INZONE'] = 1006)] = 'INZONE';
    ScriptOpcode2[(ScriptOpcode2['LINEOFSIGHT'] = 1007)] = 'LINEOFSIGHT';
    ScriptOpcode2[(ScriptOpcode2['LINEOFWALK'] = 1008)] = 'LINEOFWALK';
    ScriptOpcode2[(ScriptOpcode2['MAP_BLOCKED'] = 1009)] = 'MAP_BLOCKED';
    ScriptOpcode2[(ScriptOpcode2['MAP_INDOORS'] = 1010)] = 'MAP_INDOORS';
    ScriptOpcode2[(ScriptOpcode2['MAP_CLOCK'] = 1011)] = 'MAP_CLOCK';
    ScriptOpcode2[(ScriptOpcode2['MAP_LOCADDUNSAFE'] = 1012)] = 'MAP_LOCADDUNSAFE';
    ScriptOpcode2[(ScriptOpcode2['MAP_MEMBERS'] = 1013)] = 'MAP_MEMBERS';
    ScriptOpcode2[(ScriptOpcode2['MAP_PLAYERCOUNT'] = 1014)] = 'MAP_PLAYERCOUNT';
    ScriptOpcode2[(ScriptOpcode2['MOVECOORD'] = 1015)] = 'MOVECOORD';
    ScriptOpcode2[(ScriptOpcode2['PLAYERCOUNT'] = 1016)] = 'PLAYERCOUNT';
    ScriptOpcode2[(ScriptOpcode2['PROJANIM_MAP'] = 1017)] = 'PROJANIM_MAP';
    ScriptOpcode2[(ScriptOpcode2['PROJANIM_NPC'] = 1018)] = 'PROJANIM_NPC';
    ScriptOpcode2[(ScriptOpcode2['PROJANIM_PL'] = 1019)] = 'PROJANIM_PL';
    ScriptOpcode2[(ScriptOpcode2['SEQLENGTH'] = 1020)] = 'SEQLENGTH';
    ScriptOpcode2[(ScriptOpcode2['SPLIT_GET'] = 1021)] = 'SPLIT_GET';
    ScriptOpcode2[(ScriptOpcode2['SPLIT_GETANIM'] = 1022)] = 'SPLIT_GETANIM';
    ScriptOpcode2[(ScriptOpcode2['SPLIT_INIT'] = 1023)] = 'SPLIT_INIT';
    ScriptOpcode2[(ScriptOpcode2['SPLIT_LINECOUNT'] = 1024)] = 'SPLIT_LINECOUNT';
    ScriptOpcode2[(ScriptOpcode2['SPLIT_PAGECOUNT'] = 1025)] = 'SPLIT_PAGECOUNT';
    ScriptOpcode2[(ScriptOpcode2['SPOTANIM_MAP'] = 1026)] = 'SPOTANIM_MAP';
    ScriptOpcode2[(ScriptOpcode2['STAT_RANDOM'] = 1027)] = 'STAT_RANDOM';
    ScriptOpcode2[(ScriptOpcode2['STRUCT_PARAM'] = 1028)] = 'STRUCT_PARAM';
    ScriptOpcode2[(ScriptOpcode2['WORLD_DELAY'] = 1029)] = 'WORLD_DELAY';
    ScriptOpcode2[(ScriptOpcode2['NPCCOUNT'] = 1030)] = 'NPCCOUNT';
    ScriptOpcode2[(ScriptOpcode2['ZONECOUNT'] = 1031)] = 'ZONECOUNT';
    ScriptOpcode2[(ScriptOpcode2['LOCCOUNT'] = 1032)] = 'LOCCOUNT';
    ScriptOpcode2[(ScriptOpcode2['OBJCOUNT'] = 1033)] = 'OBJCOUNT';
    ScriptOpcode2[(ScriptOpcode2['ALLOWDESIGN'] = 2000)] = 'ALLOWDESIGN';
    ScriptOpcode2[(ScriptOpcode2['ANIM'] = 2001)] = 'ANIM';
    ScriptOpcode2[(ScriptOpcode2['BAS_READYANIM'] = 2002)] = 'BAS_READYANIM';
    ScriptOpcode2[(ScriptOpcode2['BAS_RUNNING'] = 2003)] = 'BAS_RUNNING';
    ScriptOpcode2[(ScriptOpcode2['BAS_TURNONSPOT'] = 2004)] = 'BAS_TURNONSPOT';
    ScriptOpcode2[(ScriptOpcode2['BAS_WALK_B'] = 2005)] = 'BAS_WALK_B';
    ScriptOpcode2[(ScriptOpcode2['BAS_WALK_F'] = 2006)] = 'BAS_WALK_F';
    ScriptOpcode2[(ScriptOpcode2['BAS_WALK_L'] = 2007)] = 'BAS_WALK_L';
    ScriptOpcode2[(ScriptOpcode2['BAS_WALK_R'] = 2008)] = 'BAS_WALK_R';
    ScriptOpcode2[(ScriptOpcode2['BUFFER_FULL'] = 2009)] = 'BUFFER_FULL';
    ScriptOpcode2[(ScriptOpcode2['BUILDAPPEARANCE'] = 2010)] = 'BUILDAPPEARANCE';
    ScriptOpcode2[(ScriptOpcode2['BUSY'] = 2011)] = 'BUSY';
    ScriptOpcode2[(ScriptOpcode2['CAM_LOOKAT'] = 2012)] = 'CAM_LOOKAT';
    ScriptOpcode2[(ScriptOpcode2['CAM_MOVETO'] = 2013)] = 'CAM_MOVETO';
    ScriptOpcode2[(ScriptOpcode2['CAM_RESET'] = 2014)] = 'CAM_RESET';
    ScriptOpcode2[(ScriptOpcode2['CAM_SHAKE'] = 2015)] = 'CAM_SHAKE';
    ScriptOpcode2[(ScriptOpcode2['CLEARQUEUE'] = 2016)] = 'CLEARQUEUE';
    ScriptOpcode2[(ScriptOpcode2['CLEARSOFTTIMER'] = 2017)] = 'CLEARSOFTTIMER';
    ScriptOpcode2[(ScriptOpcode2['CLEARTIMER'] = 2018)] = 'CLEARTIMER';
    ScriptOpcode2[(ScriptOpcode2['COORD'] = 2019)] = 'COORD';
    ScriptOpcode2[(ScriptOpcode2['DAMAGE'] = 2020)] = 'DAMAGE';
    ScriptOpcode2[(ScriptOpcode2['DISPLAYNAME'] = 2021)] = 'DISPLAYNAME';
    ScriptOpcode2[(ScriptOpcode2['FACESQUARE'] = 2022)] = 'FACESQUARE';
    ScriptOpcode2[(ScriptOpcode2['FINDUID'] = 2023)] = 'FINDUID';
    ScriptOpcode2[(ScriptOpcode2['GENDER'] = 2024)] = 'GENDER';
    ScriptOpcode2[(ScriptOpcode2['GETQUEUE'] = 2025)] = 'GETQUEUE';
    ScriptOpcode2[(ScriptOpcode2['GIVEXP'] = 2026)] = 'GIVEXP';
    ScriptOpcode2[(ScriptOpcode2['HEADICONS_GET'] = 2027)] = 'HEADICONS_GET';
    ScriptOpcode2[(ScriptOpcode2['HEADICONS_SET'] = 2028)] = 'HEADICONS_SET';
    ScriptOpcode2[(ScriptOpcode2['HEALENERGY'] = 2029)] = 'HEALENERGY';
    ScriptOpcode2[(ScriptOpcode2['HINT_COORD'] = 2030)] = 'HINT_COORD';
    ScriptOpcode2[(ScriptOpcode2['HINT_NPC'] = 2031)] = 'HINT_NPC';
    ScriptOpcode2[(ScriptOpcode2['HINT_PLAYER'] = 2032)] = 'HINT_PLAYER';
    ScriptOpcode2[(ScriptOpcode2['HINT_STOP'] = 2033)] = 'HINT_STOP';
    ScriptOpcode2[(ScriptOpcode2['IF_CLOSE'] = 2034)] = 'IF_CLOSE';
    ScriptOpcode2[(ScriptOpcode2['IF_CLOSESTICKY'] = 2035)] = 'IF_CLOSESTICKY';
    ScriptOpcode2[(ScriptOpcode2['IF_MULTIZONE'] = 2036)] = 'IF_MULTIZONE';
    ScriptOpcode2[(ScriptOpcode2['IF_OPENCHAT'] = 2037)] = 'IF_OPENCHAT';
    ScriptOpcode2[(ScriptOpcode2['IF_OPENCHATSTICKY'] = 2038)] = 'IF_OPENCHATSTICKY';
    ScriptOpcode2[(ScriptOpcode2['IF_OPENMAINMODAL'] = 2039)] = 'IF_OPENMAINMODAL';
    ScriptOpcode2[(ScriptOpcode2['IF_OPENMAINMODALSIDEOVERLAY'] = 2040)] = 'IF_OPENMAINMODALSIDEOVERLAY';
    ScriptOpcode2[(ScriptOpcode2['IF_OPENSIDEOVERLAY'] = 2041)] = 'IF_OPENSIDEOVERLAY';
    ScriptOpcode2[(ScriptOpcode2['IF_SETANIM'] = 2042)] = 'IF_SETANIM';
    ScriptOpcode2[(ScriptOpcode2['IF_SETCOLOUR'] = 2043)] = 'IF_SETCOLOUR';
    ScriptOpcode2[(ScriptOpcode2['IF_SETHIDE'] = 2044)] = 'IF_SETHIDE';
    ScriptOpcode2[(ScriptOpcode2['IF_SETMODEL'] = 2045)] = 'IF_SETMODEL';
    ScriptOpcode2[(ScriptOpcode2['IF_SETRECOL'] = 2046)] = 'IF_SETRECOL';
    ScriptOpcode2[(ScriptOpcode2['IF_SETNPCHEAD'] = 2047)] = 'IF_SETNPCHEAD';
    ScriptOpcode2[(ScriptOpcode2['IF_SETOBJECT'] = 2048)] = 'IF_SETOBJECT';
    ScriptOpcode2[(ScriptOpcode2['IF_SETPLAYERHEAD'] = 2049)] = 'IF_SETPLAYERHEAD';
    ScriptOpcode2[(ScriptOpcode2['IF_SETPOSITION'] = 2050)] = 'IF_SETPOSITION';
    ScriptOpcode2[(ScriptOpcode2['IF_SETRESUMEBUTTONS'] = 2051)] = 'IF_SETRESUMEBUTTONS';
    ScriptOpcode2[(ScriptOpcode2['IF_SETTAB'] = 2052)] = 'IF_SETTAB';
    ScriptOpcode2[(ScriptOpcode2['IF_SETTABACTIVE'] = 2053)] = 'IF_SETTABACTIVE';
    ScriptOpcode2[(ScriptOpcode2['IF_SETTABFLASH'] = 2054)] = 'IF_SETTABFLASH';
    ScriptOpcode2[(ScriptOpcode2['IF_SETTEXT'] = 2055)] = 'IF_SETTEXT';
    ScriptOpcode2[(ScriptOpcode2['LAST_LOGIN_INFO'] = 2056)] = 'LAST_LOGIN_INFO';
    ScriptOpcode2[(ScriptOpcode2['LAST_COM'] = 2057)] = 'LAST_COM';
    ScriptOpcode2[(ScriptOpcode2['LAST_INT'] = 2058)] = 'LAST_INT';
    ScriptOpcode2[(ScriptOpcode2['LAST_ITEM'] = 2059)] = 'LAST_ITEM';
    ScriptOpcode2[(ScriptOpcode2['LAST_SLOT'] = 2060)] = 'LAST_SLOT';
    ScriptOpcode2[(ScriptOpcode2['LAST_TARGETSLOT'] = 2061)] = 'LAST_TARGETSLOT';
    ScriptOpcode2[(ScriptOpcode2['LAST_USEITEM'] = 2062)] = 'LAST_USEITEM';
    ScriptOpcode2[(ScriptOpcode2['LAST_USESLOT'] = 2063)] = 'LAST_USESLOT';
    ScriptOpcode2[(ScriptOpcode2['LONGQUEUE'] = 2064)] = 'LONGQUEUE';
    ScriptOpcode2[(ScriptOpcode2['MES'] = 2065)] = 'MES';
    ScriptOpcode2[(ScriptOpcode2['MIDI_JINGLE'] = 2066)] = 'MIDI_JINGLE';
    ScriptOpcode2[(ScriptOpcode2['MIDI_SONG'] = 2067)] = 'MIDI_SONG';
    ScriptOpcode2[(ScriptOpcode2['NAME'] = 2068)] = 'NAME';
    ScriptOpcode2[(ScriptOpcode2['P_APRANGE'] = 2069)] = 'P_APRANGE';
    ScriptOpcode2[(ScriptOpcode2['P_ARRIVEDELAY'] = 2070)] = 'P_ARRIVEDELAY';
    ScriptOpcode2[(ScriptOpcode2['P_COUNTDIALOG'] = 2071)] = 'P_COUNTDIALOG';
    ScriptOpcode2[(ScriptOpcode2['P_DELAY'] = 2072)] = 'P_DELAY';
    ScriptOpcode2[(ScriptOpcode2['P_EXACTMOVE'] = 2073)] = 'P_EXACTMOVE';
    ScriptOpcode2[(ScriptOpcode2['P_FINDUID'] = 2074)] = 'P_FINDUID';
    ScriptOpcode2[(ScriptOpcode2['P_LOCMERGE'] = 2075)] = 'P_LOCMERGE';
    ScriptOpcode2[(ScriptOpcode2['P_LOGOUT'] = 2076)] = 'P_LOGOUT';
    ScriptOpcode2[(ScriptOpcode2['P_OPHELD'] = 2077)] = 'P_OPHELD';
    ScriptOpcode2[(ScriptOpcode2['P_OPLOC'] = 2078)] = 'P_OPLOC';
    ScriptOpcode2[(ScriptOpcode2['P_OPNPC'] = 2079)] = 'P_OPNPC';
    ScriptOpcode2[(ScriptOpcode2['P_OPNPCT'] = 2080)] = 'P_OPNPCT';
    ScriptOpcode2[(ScriptOpcode2['P_OPOBJ'] = 2081)] = 'P_OPOBJ';
    ScriptOpcode2[(ScriptOpcode2['P_OPPLAYER'] = 2082)] = 'P_OPPLAYER';
    ScriptOpcode2[(ScriptOpcode2['P_OPPLAYERT'] = 2083)] = 'P_OPPLAYERT';
    ScriptOpcode2[(ScriptOpcode2['P_PAUSEBUTTON'] = 2084)] = 'P_PAUSEBUTTON';
    ScriptOpcode2[(ScriptOpcode2['P_STOPACTION'] = 2085)] = 'P_STOPACTION';
    ScriptOpcode2[(ScriptOpcode2['P_TELEJUMP'] = 2086)] = 'P_TELEJUMP';
    ScriptOpcode2[(ScriptOpcode2['P_TELEPORT'] = 2087)] = 'P_TELEPORT';
    ScriptOpcode2[(ScriptOpcode2['P_WALK'] = 2088)] = 'P_WALK';
    ScriptOpcode2[(ScriptOpcode2['PLAYER_FINDALLZONE'] = 2089)] = 'PLAYER_FINDALLZONE';
    ScriptOpcode2[(ScriptOpcode2['PLAYER_FINDNEXT'] = 2090)] = 'PLAYER_FINDNEXT';
    ScriptOpcode2[(ScriptOpcode2['QUEUE'] = 2091)] = 'QUEUE';
    ScriptOpcode2[(ScriptOpcode2['SAY'] = 2092)] = 'SAY';
    ScriptOpcode2[(ScriptOpcode2['WALKTRIGGER'] = 2093)] = 'WALKTRIGGER';
    ScriptOpcode2[(ScriptOpcode2['SETTIMER'] = 2094)] = 'SETTIMER';
    ScriptOpcode2[(ScriptOpcode2['SOFTTIMER'] = 2095)] = 'SOFTTIMER';
    ScriptOpcode2[(ScriptOpcode2['SOUND_SYNTH'] = 2096)] = 'SOUND_SYNTH';
    ScriptOpcode2[(ScriptOpcode2['SPOTANIM_PL'] = 2097)] = 'SPOTANIM_PL';
    ScriptOpcode2[(ScriptOpcode2['STAFFMODLEVEL'] = 2098)] = 'STAFFMODLEVEL';
    ScriptOpcode2[(ScriptOpcode2['STAT'] = 2099)] = 'STAT';
    ScriptOpcode2[(ScriptOpcode2['STAT_ADD'] = 2100)] = 'STAT_ADD';
    ScriptOpcode2[(ScriptOpcode2['STAT_BASE'] = 2101)] = 'STAT_BASE';
    ScriptOpcode2[(ScriptOpcode2['STAT_HEAL'] = 2102)] = 'STAT_HEAL';
    ScriptOpcode2[(ScriptOpcode2['STAT_SUB'] = 2103)] = 'STAT_SUB';
    ScriptOpcode2[(ScriptOpcode2['STRONGQUEUE'] = 2104)] = 'STRONGQUEUE';
    ScriptOpcode2[(ScriptOpcode2['UID'] = 2105)] = 'UID';
    ScriptOpcode2[(ScriptOpcode2['WEAKQUEUE'] = 2106)] = 'WEAKQUEUE';
    ScriptOpcode2[(ScriptOpcode2['IF_OPENMAINOVERLAY'] = 2107)] = 'IF_OPENMAINOVERLAY';
    ScriptOpcode2[(ScriptOpcode2['AFK_EVENT'] = 2108)] = 'AFK_EVENT';
    ScriptOpcode2[(ScriptOpcode2['LOWMEMORY'] = 2109)] = 'LOWMEMORY';
    ScriptOpcode2[(ScriptOpcode2['SETIDKIT'] = 2110)] = 'SETIDKIT';
    ScriptOpcode2[(ScriptOpcode2['P_CLEARPENDINGACTION'] = 2111)] = 'P_CLEARPENDINGACTION';
    ScriptOpcode2[(ScriptOpcode2['GETWALKTRIGGER'] = 2112)] = 'GETWALKTRIGGER';
    ScriptOpcode2[(ScriptOpcode2['BUSY2'] = 2113)] = 'BUSY2';
    ScriptOpcode2[(ScriptOpcode2['FINDHERO'] = 2114)] = 'FINDHERO';
    ScriptOpcode2[(ScriptOpcode2['BOTH_HEROPOINTS'] = 2115)] = 'BOTH_HEROPOINTS';
    ScriptOpcode2[(ScriptOpcode2['SETGENDER'] = 2116)] = 'SETGENDER';
    ScriptOpcode2[(ScriptOpcode2['SETSKINCOLOUR'] = 2117)] = 'SETSKINCOLOUR';
    ScriptOpcode2[(ScriptOpcode2['P_ANIMPROTECT'] = 2118)] = 'P_ANIMPROTECT';
    ScriptOpcode2[(ScriptOpcode2['NPC_ADD'] = 2500)] = 'NPC_ADD';
    ScriptOpcode2[(ScriptOpcode2['NPC_ANIM'] = 2501)] = 'NPC_ANIM';
    ScriptOpcode2[(ScriptOpcode2['NPC_BASESTAT'] = 2502)] = 'NPC_BASESTAT';
    ScriptOpcode2[(ScriptOpcode2['NPC_CATEGORY'] = 2503)] = 'NPC_CATEGORY';
    ScriptOpcode2[(ScriptOpcode2['NPC_CHANGETYPE'] = 2504)] = 'NPC_CHANGETYPE';
    ScriptOpcode2[(ScriptOpcode2['NPC_COORD'] = 2505)] = 'NPC_COORD';
    ScriptOpcode2[(ScriptOpcode2['NPC_DAMAGE'] = 2506)] = 'NPC_DAMAGE';
    ScriptOpcode2[(ScriptOpcode2['NPC_DEL'] = 2507)] = 'NPC_DEL';
    ScriptOpcode2[(ScriptOpcode2['NPC_DELAY'] = 2508)] = 'NPC_DELAY';
    ScriptOpcode2[(ScriptOpcode2['NPC_FACESQUARE'] = 2509)] = 'NPC_FACESQUARE';
    ScriptOpcode2[(ScriptOpcode2['NPC_FIND'] = 2510)] = 'NPC_FIND';
    ScriptOpcode2[(ScriptOpcode2['NPC_FINDALLANY'] = 2511)] = 'NPC_FINDALLANY';
    ScriptOpcode2[(ScriptOpcode2['NPC_FINDEXACT'] = 2512)] = 'NPC_FINDEXACT';
    ScriptOpcode2[(ScriptOpcode2['NPC_FINDHERO'] = 2513)] = 'NPC_FINDHERO';
    ScriptOpcode2[(ScriptOpcode2['NPC_FINDALLZONE'] = 2514)] = 'NPC_FINDALLZONE';
    ScriptOpcode2[(ScriptOpcode2['NPC_FINDNEXT'] = 2515)] = 'NPC_FINDNEXT';
    ScriptOpcode2[(ScriptOpcode2['NPC_FINDUID'] = 2516)] = 'NPC_FINDUID';
    ScriptOpcode2[(ScriptOpcode2['NPC_GETMODE'] = 2517)] = 'NPC_GETMODE';
    ScriptOpcode2[(ScriptOpcode2['NPC_HEROPOINTS'] = 2518)] = 'NPC_HEROPOINTS';
    ScriptOpcode2[(ScriptOpcode2['NPC_NAME'] = 2519)] = 'NPC_NAME';
    ScriptOpcode2[(ScriptOpcode2['NPC_PARAM'] = 2520)] = 'NPC_PARAM';
    ScriptOpcode2[(ScriptOpcode2['NPC_QUEUE'] = 2521)] = 'NPC_QUEUE';
    ScriptOpcode2[(ScriptOpcode2['NPC_RANGE'] = 2522)] = 'NPC_RANGE';
    ScriptOpcode2[(ScriptOpcode2['NPC_SAY'] = 2523)] = 'NPC_SAY';
    ScriptOpcode2[(ScriptOpcode2['NPC_HUNTALL'] = 2524)] = 'NPC_HUNTALL';
    ScriptOpcode2[(ScriptOpcode2['NPC_HUNTNEXT'] = 2525)] = 'NPC_HUNTNEXT';
    ScriptOpcode2[(ScriptOpcode2['NPC_SETHUNT'] = 2526)] = 'NPC_SETHUNT';
    ScriptOpcode2[(ScriptOpcode2['NPC_SETHUNTMODE'] = 2527)] = 'NPC_SETHUNTMODE';
    ScriptOpcode2[(ScriptOpcode2['NPC_SETMODE'] = 2528)] = 'NPC_SETMODE';
    ScriptOpcode2[(ScriptOpcode2['NPC_WALKTRIGGER'] = 2529)] = 'NPC_WALKTRIGGER';
    ScriptOpcode2[(ScriptOpcode2['NPC_SETTIMER'] = 2530)] = 'NPC_SETTIMER';
    ScriptOpcode2[(ScriptOpcode2['NPC_STAT'] = 2531)] = 'NPC_STAT';
    ScriptOpcode2[(ScriptOpcode2['NPC_STATADD'] = 2532)] = 'NPC_STATADD';
    ScriptOpcode2[(ScriptOpcode2['NPC_STATHEAL'] = 2533)] = 'NPC_STATHEAL';
    ScriptOpcode2[(ScriptOpcode2['NPC_STATSUB'] = 2534)] = 'NPC_STATSUB';
    ScriptOpcode2[(ScriptOpcode2['NPC_TELE'] = 2535)] = 'NPC_TELE';
    ScriptOpcode2[(ScriptOpcode2['NPC_TYPE'] = 2536)] = 'NPC_TYPE';
    ScriptOpcode2[(ScriptOpcode2['NPC_UID'] = 2537)] = 'NPC_UID';
    ScriptOpcode2[(ScriptOpcode2['SPOTANIM_NPC'] = 2538)] = 'SPOTANIM_NPC';
    ScriptOpcode2[(ScriptOpcode2['NPC_WALK'] = 2539)] = 'NPC_WALK';
    ScriptOpcode2[(ScriptOpcode2['NPC_ATTACKRANGE'] = 2540)] = 'NPC_ATTACKRANGE';
    ScriptOpcode2[(ScriptOpcode2['LOC_ADD'] = 3000)] = 'LOC_ADD';
    ScriptOpcode2[(ScriptOpcode2['LOC_ANGLE'] = 3001)] = 'LOC_ANGLE';
    ScriptOpcode2[(ScriptOpcode2['LOC_ANIM'] = 3002)] = 'LOC_ANIM';
    ScriptOpcode2[(ScriptOpcode2['LOC_CATEGORY'] = 3003)] = 'LOC_CATEGORY';
    ScriptOpcode2[(ScriptOpcode2['LOC_CHANGE'] = 3004)] = 'LOC_CHANGE';
    ScriptOpcode2[(ScriptOpcode2['LOC_COORD'] = 3005)] = 'LOC_COORD';
    ScriptOpcode2[(ScriptOpcode2['LOC_DEL'] = 3006)] = 'LOC_DEL';
    ScriptOpcode2[(ScriptOpcode2['LOC_FIND'] = 3007)] = 'LOC_FIND';
    ScriptOpcode2[(ScriptOpcode2['LOC_FINDALLZONE'] = 3008)] = 'LOC_FINDALLZONE';
    ScriptOpcode2[(ScriptOpcode2['LOC_FINDNEXT'] = 3009)] = 'LOC_FINDNEXT';
    ScriptOpcode2[(ScriptOpcode2['LOC_NAME'] = 3010)] = 'LOC_NAME';
    ScriptOpcode2[(ScriptOpcode2['LOC_PARAM'] = 3011)] = 'LOC_PARAM';
    ScriptOpcode2[(ScriptOpcode2['LOC_SHAPE'] = 3012)] = 'LOC_SHAPE';
    ScriptOpcode2[(ScriptOpcode2['LOC_TYPE'] = 3013)] = 'LOC_TYPE';
    ScriptOpcode2[(ScriptOpcode2['OBJ_ADD'] = 3500)] = 'OBJ_ADD';
    ScriptOpcode2[(ScriptOpcode2['OBJ_ADDALL'] = 3501)] = 'OBJ_ADDALL';
    ScriptOpcode2[(ScriptOpcode2['OBJ_COORD'] = 3502)] = 'OBJ_COORD';
    ScriptOpcode2[(ScriptOpcode2['OBJ_COUNT'] = 3503)] = 'OBJ_COUNT';
    ScriptOpcode2[(ScriptOpcode2['OBJ_DEL'] = 3504)] = 'OBJ_DEL';
    ScriptOpcode2[(ScriptOpcode2['OBJ_NAME'] = 3505)] = 'OBJ_NAME';
    ScriptOpcode2[(ScriptOpcode2['OBJ_PARAM'] = 3506)] = 'OBJ_PARAM';
    ScriptOpcode2[(ScriptOpcode2['OBJ_TAKEITEM'] = 3507)] = 'OBJ_TAKEITEM';
    ScriptOpcode2[(ScriptOpcode2['OBJ_TYPE'] = 3508)] = 'OBJ_TYPE';
    ScriptOpcode2[(ScriptOpcode2['NC_CATEGORY'] = 4000)] = 'NC_CATEGORY';
    ScriptOpcode2[(ScriptOpcode2['NC_DEBUGNAME'] = 4001)] = 'NC_DEBUGNAME';
    ScriptOpcode2[(ScriptOpcode2['NC_DESC'] = 4002)] = 'NC_DESC';
    ScriptOpcode2[(ScriptOpcode2['NC_NAME'] = 4003)] = 'NC_NAME';
    ScriptOpcode2[(ScriptOpcode2['NC_OP'] = 4004)] = 'NC_OP';
    ScriptOpcode2[(ScriptOpcode2['NC_PARAM'] = 4005)] = 'NC_PARAM';
    ScriptOpcode2[(ScriptOpcode2['LC_CATEGORY'] = 4100)] = 'LC_CATEGORY';
    ScriptOpcode2[(ScriptOpcode2['LC_DEBUGNAME'] = 4101)] = 'LC_DEBUGNAME';
    ScriptOpcode2[(ScriptOpcode2['LC_DESC'] = 4102)] = 'LC_DESC';
    ScriptOpcode2[(ScriptOpcode2['LC_NAME'] = 4103)] = 'LC_NAME';
    ScriptOpcode2[(ScriptOpcode2['LC_OP'] = 4104)] = 'LC_OP';
    ScriptOpcode2[(ScriptOpcode2['LC_PARAM'] = 4105)] = 'LC_PARAM';
    ScriptOpcode2[(ScriptOpcode2['LC_WIDTH'] = 4106)] = 'LC_WIDTH';
    ScriptOpcode2[(ScriptOpcode2['LC_LENGTH'] = 4107)] = 'LC_LENGTH';
    ScriptOpcode2[(ScriptOpcode2['OC_CATEGORY'] = 4200)] = 'OC_CATEGORY';
    ScriptOpcode2[(ScriptOpcode2['OC_CERT'] = 4201)] = 'OC_CERT';
    ScriptOpcode2[(ScriptOpcode2['OC_COST'] = 4202)] = 'OC_COST';
    ScriptOpcode2[(ScriptOpcode2['OC_DEBUGNAME'] = 4203)] = 'OC_DEBUGNAME';
    ScriptOpcode2[(ScriptOpcode2['OC_DESC'] = 4204)] = 'OC_DESC';
    ScriptOpcode2[(ScriptOpcode2['OC_IOP'] = 4205)] = 'OC_IOP';
    ScriptOpcode2[(ScriptOpcode2['OC_MEMBERS'] = 4206)] = 'OC_MEMBERS';
    ScriptOpcode2[(ScriptOpcode2['OC_NAME'] = 4207)] = 'OC_NAME';
    ScriptOpcode2[(ScriptOpcode2['OC_OP'] = 4208)] = 'OC_OP';
    ScriptOpcode2[(ScriptOpcode2['OC_PARAM'] = 4209)] = 'OC_PARAM';
    ScriptOpcode2[(ScriptOpcode2['OC_STACKABLE'] = 4210)] = 'OC_STACKABLE';
    ScriptOpcode2[(ScriptOpcode2['OC_TRADEABLE'] = 4211)] = 'OC_TRADEABLE';
    ScriptOpcode2[(ScriptOpcode2['OC_UNCERT'] = 4212)] = 'OC_UNCERT';
    ScriptOpcode2[(ScriptOpcode2['OC_WEARPOS2'] = 4213)] = 'OC_WEARPOS2';
    ScriptOpcode2[(ScriptOpcode2['OC_WEARPOS3'] = 4214)] = 'OC_WEARPOS3';
    ScriptOpcode2[(ScriptOpcode2['OC_WEARPOS'] = 4215)] = 'OC_WEARPOS';
    ScriptOpcode2[(ScriptOpcode2['OC_WEIGHT'] = 4216)] = 'OC_WEIGHT';
    ScriptOpcode2[(ScriptOpcode2['INV_ALLSTOCK'] = 4300)] = 'INV_ALLSTOCK';
    ScriptOpcode2[(ScriptOpcode2['INV_SIZE'] = 4301)] = 'INV_SIZE';
    ScriptOpcode2[(ScriptOpcode2['INV_STOCKBASE'] = 4302)] = 'INV_STOCKBASE';
    ScriptOpcode2[(ScriptOpcode2['INV_ADD'] = 4303)] = 'INV_ADD';
    ScriptOpcode2[(ScriptOpcode2['INV_CHANGESLOT'] = 4304)] = 'INV_CHANGESLOT';
    ScriptOpcode2[(ScriptOpcode2['INV_CLEAR'] = 4305)] = 'INV_CLEAR';
    ScriptOpcode2[(ScriptOpcode2['INV_DEL'] = 4306)] = 'INV_DEL';
    ScriptOpcode2[(ScriptOpcode2['INV_DELSLOT'] = 4307)] = 'INV_DELSLOT';
    ScriptOpcode2[(ScriptOpcode2['INV_DROPITEM'] = 4308)] = 'INV_DROPITEM';
    ScriptOpcode2[(ScriptOpcode2['INV_DROPSLOT'] = 4309)] = 'INV_DROPSLOT';
    ScriptOpcode2[(ScriptOpcode2['INV_FREESPACE'] = 4310)] = 'INV_FREESPACE';
    ScriptOpcode2[(ScriptOpcode2['INV_GETNUM'] = 4311)] = 'INV_GETNUM';
    ScriptOpcode2[(ScriptOpcode2['INV_GETOBJ'] = 4312)] = 'INV_GETOBJ';
    ScriptOpcode2[(ScriptOpcode2['INV_ITEMSPACE'] = 4313)] = 'INV_ITEMSPACE';
    ScriptOpcode2[(ScriptOpcode2['INV_ITEMSPACE2'] = 4314)] = 'INV_ITEMSPACE2';
    ScriptOpcode2[(ScriptOpcode2['INV_MOVEFROMSLOT'] = 4315)] = 'INV_MOVEFROMSLOT';
    ScriptOpcode2[(ScriptOpcode2['INV_MOVETOSLOT'] = 4316)] = 'INV_MOVETOSLOT';
    ScriptOpcode2[(ScriptOpcode2['BOTH_MOVEINV'] = 4317)] = 'BOTH_MOVEINV';
    ScriptOpcode2[(ScriptOpcode2['INV_MOVEITEM'] = 4318)] = 'INV_MOVEITEM';
    ScriptOpcode2[(ScriptOpcode2['INV_MOVEITEM_CERT'] = 4319)] = 'INV_MOVEITEM_CERT';
    ScriptOpcode2[(ScriptOpcode2['INV_MOVEITEM_UNCERT'] = 4320)] = 'INV_MOVEITEM_UNCERT';
    ScriptOpcode2[(ScriptOpcode2['INV_SETSLOT'] = 4321)] = 'INV_SETSLOT';
    ScriptOpcode2[(ScriptOpcode2['INV_TOTAL'] = 4322)] = 'INV_TOTAL';
    ScriptOpcode2[(ScriptOpcode2['INV_TOTALCAT'] = 4323)] = 'INV_TOTALCAT';
    ScriptOpcode2[(ScriptOpcode2['INV_TRANSMIT'] = 4324)] = 'INV_TRANSMIT';
    ScriptOpcode2[(ScriptOpcode2['INVOTHER_TRANSMIT'] = 4325)] = 'INVOTHER_TRANSMIT';
    ScriptOpcode2[(ScriptOpcode2['INV_STOPTRANSMIT'] = 4326)] = 'INV_STOPTRANSMIT';
    ScriptOpcode2[(ScriptOpcode2['BOTH_DROPSLOT'] = 4327)] = 'BOTH_DROPSLOT';
    ScriptOpcode2[(ScriptOpcode2['INV_DROPALL'] = 4328)] = 'INV_DROPALL';
    ScriptOpcode2[(ScriptOpcode2['INV_TOTALPARAM'] = 4329)] = 'INV_TOTALPARAM';
    ScriptOpcode2[(ScriptOpcode2['INV_TOTALPARAM_STACK'] = 4330)] = 'INV_TOTALPARAM_STACK';
    ScriptOpcode2[(ScriptOpcode2['ENUM'] = 4400)] = 'ENUM';
    ScriptOpcode2[(ScriptOpcode2['ENUM_GETOUTPUTCOUNT'] = 4401)] = 'ENUM_GETOUTPUTCOUNT';
    ScriptOpcode2[(ScriptOpcode2['APPEND_NUM'] = 4500)] = 'APPEND_NUM';
    ScriptOpcode2[(ScriptOpcode2['APPEND'] = 4501)] = 'APPEND';
    ScriptOpcode2[(ScriptOpcode2['APPEND_SIGNNUM'] = 4502)] = 'APPEND_SIGNNUM';
    ScriptOpcode2[(ScriptOpcode2['LOWERCASE'] = 4503)] = 'LOWERCASE';
    ScriptOpcode2[(ScriptOpcode2['TEXT_GENDER'] = 4504)] = 'TEXT_GENDER';
    ScriptOpcode2[(ScriptOpcode2['TOSTRING'] = 4505)] = 'TOSTRING';
    ScriptOpcode2[(ScriptOpcode2['COMPARE'] = 4506)] = 'COMPARE';
    ScriptOpcode2[(ScriptOpcode2['TEXT_SWITCH'] = 4507)] = 'TEXT_SWITCH';
    ScriptOpcode2[(ScriptOpcode2['APPEND_CHAR'] = 4508)] = 'APPEND_CHAR';
    ScriptOpcode2[(ScriptOpcode2['STRING_LENGTH'] = 4509)] = 'STRING_LENGTH';
    ScriptOpcode2[(ScriptOpcode2['SUBSTRING'] = 4510)] = 'SUBSTRING';
    ScriptOpcode2[(ScriptOpcode2['STRING_INDEXOF_CHAR'] = 4511)] = 'STRING_INDEXOF_CHAR';
    ScriptOpcode2[(ScriptOpcode2['STRING_INDEXOF_STRING'] = 4512)] = 'STRING_INDEXOF_STRING';
    ScriptOpcode2[(ScriptOpcode2['ADD'] = 4600)] = 'ADD';
    ScriptOpcode2[(ScriptOpcode2['SUB'] = 4601)] = 'SUB';
    ScriptOpcode2[(ScriptOpcode2['MULTIPLY'] = 4602)] = 'MULTIPLY';
    ScriptOpcode2[(ScriptOpcode2['DIVIDE'] = 4603)] = 'DIVIDE';
    ScriptOpcode2[(ScriptOpcode2['RANDOM'] = 4604)] = 'RANDOM';
    ScriptOpcode2[(ScriptOpcode2['RANDOMINC'] = 4605)] = 'RANDOMINC';
    ScriptOpcode2[(ScriptOpcode2['INTERPOLATE'] = 4606)] = 'INTERPOLATE';
    ScriptOpcode2[(ScriptOpcode2['ADDPERCENT'] = 4607)] = 'ADDPERCENT';
    ScriptOpcode2[(ScriptOpcode2['SETBIT'] = 4608)] = 'SETBIT';
    ScriptOpcode2[(ScriptOpcode2['CLEARBIT'] = 4609)] = 'CLEARBIT';
    ScriptOpcode2[(ScriptOpcode2['TESTBIT'] = 4610)] = 'TESTBIT';
    ScriptOpcode2[(ScriptOpcode2['MODULO'] = 4611)] = 'MODULO';
    ScriptOpcode2[(ScriptOpcode2['POW'] = 4612)] = 'POW';
    ScriptOpcode2[(ScriptOpcode2['INVPOW'] = 4613)] = 'INVPOW';
    ScriptOpcode2[(ScriptOpcode2['AND'] = 4614)] = 'AND';
    ScriptOpcode2[(ScriptOpcode2['OR'] = 4615)] = 'OR';
    ScriptOpcode2[(ScriptOpcode2['MIN'] = 4616)] = 'MIN';
    ScriptOpcode2[(ScriptOpcode2['MAX'] = 4617)] = 'MAX';
    ScriptOpcode2[(ScriptOpcode2['SCALE'] = 4618)] = 'SCALE';
    ScriptOpcode2[(ScriptOpcode2['BITCOUNT'] = 4619)] = 'BITCOUNT';
    ScriptOpcode2[(ScriptOpcode2['TOGGLEBIT'] = 4620)] = 'TOGGLEBIT';
    ScriptOpcode2[(ScriptOpcode2['SETBIT_RANGE'] = 4621)] = 'SETBIT_RANGE';
    ScriptOpcode2[(ScriptOpcode2['CLEARBIT_RANGE'] = 4622)] = 'CLEARBIT_RANGE';
    ScriptOpcode2[(ScriptOpcode2['GETBIT_RANGE'] = 4623)] = 'GETBIT_RANGE';
    ScriptOpcode2[(ScriptOpcode2['SETBIT_RANGE_TOINT'] = 4624)] = 'SETBIT_RANGE_TOINT';
    ScriptOpcode2[(ScriptOpcode2['SIN_DEG'] = 4625)] = 'SIN_DEG';
    ScriptOpcode2[(ScriptOpcode2['COS_DEG'] = 4626)] = 'COS_DEG';
    ScriptOpcode2[(ScriptOpcode2['ATAN2_DEG'] = 4627)] = 'ATAN2_DEG';
    ScriptOpcode2[(ScriptOpcode2['ABS'] = 4628)] = 'ABS';
    ScriptOpcode2[(ScriptOpcode2['DB_FIND_WITH_COUNT'] = 7500)] = 'DB_FIND_WITH_COUNT';
    ScriptOpcode2[(ScriptOpcode2['DB_FINDNEXT'] = 7501)] = 'DB_FINDNEXT';
    ScriptOpcode2[(ScriptOpcode2['DB_GETFIELD'] = 7502)] = 'DB_GETFIELD';
    ScriptOpcode2[(ScriptOpcode2['DB_GETFIELDCOUNT'] = 7503)] = 'DB_GETFIELDCOUNT';
    ScriptOpcode2[(ScriptOpcode2['DB_LISTALL_WITH_COUNT'] = 7504)] = 'DB_LISTALL_WITH_COUNT';
    ScriptOpcode2[(ScriptOpcode2['DB_GETROWTABLE'] = 7505)] = 'DB_GETROWTABLE';
    ScriptOpcode2[(ScriptOpcode2['DB_FINDBYINDEX'] = 7506)] = 'DB_FINDBYINDEX';
    ScriptOpcode2[(ScriptOpcode2['DB_FIND_REFINE_WITH_COUNT'] = 7507)] = 'DB_FIND_REFINE_WITH_COUNT';
    ScriptOpcode2[(ScriptOpcode2['DB_FIND'] = 7508)] = 'DB_FIND';
    ScriptOpcode2[(ScriptOpcode2['DB_FIND_REFINE'] = 7509)] = 'DB_FIND_REFINE';
    ScriptOpcode2[(ScriptOpcode2['DB_LISTALL'] = 7510)] = 'DB_LISTALL';
    ScriptOpcode2[(ScriptOpcode2['ERROR'] = 1e4)] = 'ERROR';
    ScriptOpcode2[(ScriptOpcode2['MAP_LOCALDEV'] = 10001)] = 'MAP_LOCALDEV';
    ScriptOpcode2[(ScriptOpcode2['MAP_LASTCLOCK'] = 10002)] = 'MAP_LASTCLOCK';
    ScriptOpcode2[(ScriptOpcode2['MAP_LASTWORLD'] = 10003)] = 'MAP_LASTWORLD';
    ScriptOpcode2[(ScriptOpcode2['MAP_LASTCLIENTIN'] = 10004)] = 'MAP_LASTCLIENTIN';
    ScriptOpcode2[(ScriptOpcode2['MAP_LASTNPC'] = 10005)] = 'MAP_LASTNPC';
    ScriptOpcode2[(ScriptOpcode2['MAP_LASTPLAYER'] = 10006)] = 'MAP_LASTPLAYER';
    ScriptOpcode2[(ScriptOpcode2['MAP_LASTLOGOUT'] = 10007)] = 'MAP_LASTLOGOUT';
    ScriptOpcode2[(ScriptOpcode2['MAP_LASTLOGIN'] = 10008)] = 'MAP_LASTLOGIN';
    ScriptOpcode2[(ScriptOpcode2['MAP_LASTZONE'] = 10009)] = 'MAP_LASTZONE';
    ScriptOpcode2[(ScriptOpcode2['MAP_LASTCLIENTOUT'] = 10010)] = 'MAP_LASTCLIENTOUT';
    ScriptOpcode2[(ScriptOpcode2['MAP_LASTCLEANUP'] = 10011)] = 'MAP_LASTCLEANUP';
    ScriptOpcode2[(ScriptOpcode2['MAP_LASTBANDWIDTHIN'] = 10012)] = 'MAP_LASTBANDWIDTHIN';
    ScriptOpcode2[(ScriptOpcode2['MAP_LASTBANDWIDTHOUT'] = 10013)] = 'MAP_LASTBANDWIDTHOUT';
})((ScriptOpcode ||= {}));
var ScriptOpcode_default = ScriptOpcode;

// src/lostcity/engine/script/Script.ts
class Script {
    info = {
        scriptName: '<unknown>',
        sourceFilePath: '<unknown>',
        lookupKey: -1,
        parameterTypes: [],
        pcs: [],
        lines: []
    };
    id;
    intLocalCount = 0;
    stringLocalCount = 0;
    intArgCount = 0;
    stringArgCount = 0;
    switchTables = [];
    opcodes = [];
    intOperands = [];
    stringOperands = [];
    static isLargeOperand(opcode) {
        if (opcode > 100) {
            return false;
        }
        switch (opcode) {
            case ScriptOpcode_default.RETURN:
            case ScriptOpcode_default.POP_INT_DISCARD:
            case ScriptOpcode_default.POP_STRING_DISCARD:
            case ScriptOpcode_default.GOSUB:
            case ScriptOpcode_default.JUMP:
                return false;
        }
        return true;
    }
    static decode(id, stream) {
        const length = stream.data.length;
        if (length < 16) {
            throw new Error('Invalid script file (minimum length)');
        }
        stream.pos = length - 2;
        const trailerLen = stream.g2();
        const trailerPos = length - trailerLen - 12 - 2;
        if (trailerPos < 0 || trailerPos >= length) {
            throw new Error('Invalid script file (bad trailer pos)');
        }
        stream.pos = trailerPos;
        const script = new Script(id);
        const _instructions = stream.g4();
        script.intLocalCount = stream.g2();
        script.stringLocalCount = stream.g2();
        script.intArgCount = stream.g2();
        script.stringArgCount = stream.g2();
        const switches = stream.g1();
        for (let i = 0; i < switches; i++) {
            const count = stream.g2();
            const table = [];
            for (let j = 0; j < count; j++) {
                const key = stream.g4();
                const offset = stream.g4();
                table[key] = offset;
            }
            script.switchTables[i] = table;
        }
        stream.pos = 0;
        script.info.scriptName = stream.gjstr(0);
        script.info.sourceFilePath = stream.gjstr(0);
        script.info.lookupKey = stream.g4();
        const parameterTypeCount = stream.g1();
        for (let i = 0; i < parameterTypeCount; i++) {
            script.info.parameterTypes.push(stream.g1());
        }
        const lineNumberTableLength = stream.g2();
        for (let i = 0; i < lineNumberTableLength; i++) {
            script.info.pcs.push(stream.g4());
            script.info.lines.push(stream.g4());
        }
        let instr = 0;
        while (trailerPos > stream.pos) {
            const opcode = stream.g2();
            if (opcode === ScriptOpcode_default.PUSH_CONSTANT_STRING) {
                script.stringOperands[instr] = stream.gjstr(0);
            } else if (Script.isLargeOperand(opcode)) {
                script.intOperands[instr] = stream.g4();
            } else {
                script.intOperands[instr] = stream.g1();
            }
            script.opcodes[instr++] = opcode;
        }
        return script;
    }
    constructor(id) {
        this.id = id;
    }
    get name() {
        return this.info.scriptName;
    }
    get fileName() {
        return q.basename(this.info.sourceFilePath);
    }
    lineNumber(pc) {
        for (let i = 0; i < this.info.pcs.length; i++) {
            if (this.info.pcs[i] > pc) {
                return this.info.lines[i - 1];
            }
        }
        return this.info.lines[this.info.lines.length - 1];
    }
}

// src/lostcity/engine/script/ScriptProvider.ts
class ScriptProvider {
    static COMPILER_VERSION = 18;
    static scripts = [];
    static scriptLookup = new Map();
    static scriptNames = new Map();
    static async load(dir) {
        const dat = await Packet.load(`${dir}/server/script.dat`);
        const idx = await Packet.load(`${dir}/server/script.idx`);
        if (!dat.data.length || !idx.data.length) {
            console.log('\nFatal: No script.dat or script.idx found. Please run the server:build script.');
            process.exit(1);
        }
        const entries = dat.g2();
        idx.pos += 2;
        const version = dat.g4();
        if (version !== ScriptProvider.COMPILER_VERSION) {
            console.error('\nFatal: Scripts were compiled with an older RuneScript compiler. Please update it, try `npm run build` and then restart the server.');
            process.exit(1);
        }
        const scripts = new Array(entries);
        const scriptNames = new Map();
        const scriptLookup = new Map();
        let loaded = 0;
        for (let id = 0; id < entries; id++) {
            const size = idx.g2();
            if (size === 0) {
                continue;
            }
            try {
                const data = new Uint8Array(size);
                dat.gdata(data, 0, data.length);
                const script = Script.decode(id, new Packet(data));
                scripts[id] = script;
                scriptNames.set(script.name, id);
                if (script.info.lookupKey !== 4294967295) {
                    scriptLookup.set(script.info.lookupKey, script);
                }
                loaded++;
            } catch (err) {
                console.error(err);
                console.error(`Warning: Failed to load script ${id}, something may have been partially written`);
                return -1;
            }
        }
        ScriptProvider.scripts = scripts;
        ScriptProvider.scriptNames = scriptNames;
        ScriptProvider.scriptLookup = scriptLookup;
        return loaded;
    }
    static get(id) {
        return this.scripts[id];
    }
    static getByName(name) {
        const id = ScriptProvider.scriptNames.get(name);
        if (id === undefined) {
            return;
        }
        return ScriptProvider.scripts[id];
    }
    static getByTrigger(trigger, type = -1, category = -1) {
        let script = ScriptProvider.scriptLookup.get(trigger | (2 << 8) | (type << 10));
        if (script) {
            return script;
        }
        script = ScriptProvider.scriptLookup.get(trigger | (1 << 8) | (category << 10));
        if (script) {
            return script;
        }
        return ScriptProvider.scriptLookup.get(trigger);
    }
    static getByTriggerSpecific(trigger, type = -1, category = -1) {
        if (type !== -1) {
            return ScriptProvider.scriptLookup.get(trigger | (2 << 8) | (type << 10));
        } else if (category !== -1) {
            return ScriptProvider.scriptLookup.get(trigger | (1 << 8) | (category << 10));
        }
        return ScriptProvider.scriptLookup.get(trigger);
    }
}

// src/lostcity/util/Numbers.ts
function toInt32(num) {
    return num | 0;
}
function bitcount(num) {
    num = num - ((num >> 1) & 1431655765);
    num = (num & 858993459) + ((num >> 2) & 858993459);
    return (((num + (num >> 4)) & 252645135) * 16843009) >> 24;
}
function setBitRange(num, startBit, endBit) {
    const mask = MASK[endBit - startBit + 1];
    return num | (mask << startBit);
}
function clearBitRange(num, startBit, endBit) {
    const mask = MASK[endBit - startBit + 1];
    return num & ~(mask << startBit);
}
var initMaskArray = function () {
    const data = [0];
    let incrementor = 2;
    for (let i = 1; i < 33; ++i) {
        data[i] = toInt32(incrementor - 1);
        incrementor += incrementor;
    }
    return data;
};
var MASK = initMaskArray();

// src/lostcity/engine/script/ScriptState.ts
class ScriptState {
    static ABORTED = -1;
    static RUNNING = 0;
    static FINISHED = 1;
    static SUSPENDED = 2;
    static PAUSEBUTTON = 3;
    static COUNTDIALOG = 4;
    static NPC_SUSPENDED = 5;
    static WORLD_SUSPENDED = 6;
    script;
    trigger;
    execution = ScriptState.RUNNING;
    executionHistory = [];
    pc = -1;
    opcount = 0;
    frames = [];
    fp = 0;
    debugFrames = [];
    debugFp = 0;
    intStack = [];
    isp = 0;
    stringStack = [];
    ssp = 0;
    intLocals = [];
    stringLocals = [];
    pointers = 0;
    self = null;
    _activePlayer = null;
    _activePlayer2 = null;
    _activeNpc = null;
    _activeNpc2 = null;
    _activeLoc = null;
    _activeLoc2 = null;
    _activeObj = null;
    _activeObj2 = null;
    splitPages = [];
    splitMesanim = -1;
    dbTable = null;
    dbColumn = -1;
    dbRow = -1;
    dbRowQuery = [];
    huntIterator = null;
    npcIterator = null;
    locIterator = null;
    lastInt = 0;
    constructor(script, args = []) {
        this.script = script;
        this.trigger = script.info.lookupKey & 255;
        if (args) {
            for (let i = 0; i < args.length; i++) {
                const arg = args[i];
                if (typeof arg === 'number') {
                    this.intLocals.push(arg);
                } else {
                    this.stringLocals.push(arg);
                }
            }
        }
    }
    pointerSet(...pointers) {
        this.pointers = 0;
        for (let i = 0; i < pointers.length; i++) {
            this.pointers |= 1 << pointers[i];
        }
    }
    pointerAdd(pointer) {
        this.pointers |= 1 << pointer;
    }
    pointerRemove(pointer) {
        this.pointers &= ~(1 << pointer);
    }
    pointerGet(pointer) {
        return (this.pointers & (1 << pointer)) != 0;
    }
    pointerCheck(...pointers) {
        for (let i = 0; i < pointers.length; i++) {
            const flag = 1 << pointers[i];
            if ((this.pointers & flag) != flag) {
                throw new Error(`Required pointer: ${ScriptState.pointerPrint(flag)}, current: ${ScriptState.pointerPrint(this.pointers)}`);
            }
        }
    }
    static pointerPrint(flags) {
        let text = '';
        for (let i = 0; i < ScriptPointer_default._LAST; i++) {
            if ((flags & (1 << i)) != 0) {
                text += `${ScriptPointer_default[i]}, `;
            }
        }
        return text.substring(0, text.lastIndexOf(','));
    }
    get activePlayer() {
        const player = this.intOperand === 0 ? this._activePlayer : this._activePlayer2;
        if (player === null) {
            throw new Error('Attempt to access null active_player');
        }
        return player;
    }
    set activePlayer(player) {
        if (this.intOperand === 0) {
            this._activePlayer = player;
        } else {
            this._activePlayer2 = player;
        }
    }
    get activeNpc() {
        const npc = this.intOperand === 0 ? this._activeNpc : this._activeNpc2;
        if (npc === null) {
            throw new Error('Attempt to access null active_npc');
        }
        return npc;
    }
    set activeNpc(npc) {
        if (this.intOperand === 0) {
            this._activeNpc = npc;
        } else {
            this._activeNpc2 = npc;
        }
    }
    get activeLoc() {
        const loc = this.intOperand === 0 ? this._activeLoc : this._activeLoc2;
        if (loc === null) {
            throw new Error('Attempt to access null active_loc');
        }
        return loc;
    }
    set activeLoc(loc) {
        if (this.intOperand === 0) {
            this._activeLoc = loc;
        } else {
            this._activeLoc2 = loc;
        }
    }
    get activeObj() {
        const obj = this.intOperand === 0 ? this._activeObj : this._activeObj2;
        if (obj === null) {
            throw new Error('Attempt to access null active_obj');
        }
        return obj;
    }
    set activeObj(obj) {
        if (this.intOperand === 0) {
            this._activeObj = obj;
        } else {
            this._activeObj2 = obj;
        }
    }
    get intOperand() {
        return this.script.intOperands[this.pc];
    }
    get stringOperand() {
        return this.script.stringOperands[this.pc];
    }
    popInt() {
        const value = this.intStack[--this.isp];
        if (!value) {
            return 0;
        }
        return toInt32(value);
    }
    popInts(amount) {
        const ints = Array(amount);
        for (let i = amount - 1; i >= 0; i--) {
            ints[i] = this.popInt();
        }
        return ints;
    }
    pushInt(value) {
        this.intStack[this.isp++] = toInt32(value);
    }
    popString() {
        return this.stringStack[--this.ssp] ?? '';
    }
    popStrings(amount) {
        const strings = Array(amount);
        for (let i = amount - 1; i >= 0; i--) {
            strings[i] = this.popString();
        }
        return strings;
    }
    pushString(value) {
        this.stringStack[this.ssp++] = value;
    }
    reset() {
        this.pc = -1;
        this.frames = [];
        this.fp = 0;
        this.intStack = [];
        this.isp = 0;
        this.stringStack = [];
        this.ssp = 0;
        this.intLocals = [];
        this.stringLocals = [];
        this.pointers = 0;
    }
}

// src/lostcity/engine/Inventory.ts
class InventoryTransaction {
    requested = 0;
    completed = 0;
    items = [];
    constructor(requested, completed = 0, items = []) {
        this.requested = requested;
        this.completed = completed;
        this.items = items;
    }
    getLeftOver() {
        return this.requested - this.completed;
    }
    hasSucceeded() {
        return this.completed == this.requested;
    }
    hasFailed() {
        return !this.hasSucceeded();
    }
    revert(from) {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i].item;
            from.remove(item.id, item.count, this.items[i].slot);
        }
    }
}

class Inventory {
    static STACK_LIMIT = 2147483647;
    static NORMAL_STACK = 0;
    static ALWAYS_STACK = 1;
    static NEVER_STACK = 2;
    static fromType(inv) {
        if (inv === -1) {
            throw new Error('Invalid inventory type');
        }
        const type = InvType.get(inv);
        let stackType = Inventory.NORMAL_STACK;
        if (type.stackall) {
            stackType = Inventory.ALWAYS_STACK;
        }
        const container = new Inventory(type.size, stackType);
        container.type = inv;
        if (type.stockobj && type.stockcount && type.stockobj.length) {
            for (let i = 0; i < type.stockobj.length; i++) {
                container.set(i, {
                    id: type.stockobj[i],
                    count: type.stockcount[i]
                });
            }
        }
        return container;
    }
    stackType = Inventory.NORMAL_STACK;
    capacity = 0;
    items = [];
    update = false;
    type = -1;
    constructor(capacity, stackType = Inventory.NORMAL_STACK) {
        this.capacity = capacity;
        this.stackType = stackType;
        for (let i = 0; i < capacity; i++) {
            this.items.push(null);
        }
    }
    contains(id) {
        return this.items.some(item => item && item.id == id);
    }
    hasAt(slot, id) {
        const item = this.items[slot];
        return item && item.id == id;
    }
    get nextFreeSlot() {
        return this.items.indexOf(null, 0);
    }
    get freeSlotCount() {
        return this.items.filter(item => item == null).length;
    }
    get occupiedSlotCount() {
        return this.items.filter(item => item != null).length;
    }
    get isFull() {
        return this.occupiedSlotCount == this.capacity;
    }
    get isEmpty() {
        return this.occupiedSlotCount == 0;
    }
    get hasAny() {
        return this.items.some(item => item != null);
    }
    get hasSpace() {
        return this.nextFreeSlot != -1;
    }
    get itemsFiltered() {
        return this.items.filter(item => item != null);
    }
    getItemCount(id) {
        let count = 0;
        for (let i = 0; i < this.capacity; i++) {
            const item = this.items[i];
            if (item && item.id == id) {
                count += item.count;
            }
        }
        return Math.min(Inventory.STACK_LIMIT, count);
    }
    getItemIndex(id) {
        return this.items.findIndex(item => item && item.id == id);
    }
    removeAll() {
        this.items.fill(null, 0, this.capacity);
        this.update = true;
    }
    add(id, count = 1, beginSlot = -1, assureFullInsertion = true, forceNoStack = false, dryRun = false) {
        const type = ObjType.get(id);
        const stockObj = InvType.get(this.type).stockobj?.includes(id) === true;
        const stack = !forceNoStack && this.stackType != Inventory.NEVER_STACK && (type.stackable || this.stackType == Inventory.ALWAYS_STACK);
        let previousCount = 0;
        if (stack) {
            previousCount = this.getItemCount(id);
        }
        if (previousCount == Inventory.STACK_LIMIT) {
            return new InventoryTransaction(count, 0, []);
        }
        const freeSlotCount = this.freeSlotCount;
        if (freeSlotCount == 0 && (!stack || (stack && previousCount == 0 && !stockObj))) {
            return new InventoryTransaction(count, 0, []);
        }
        if (assureFullInsertion) {
            if (stack && previousCount > Inventory.STACK_LIMIT - count) {
                return new InventoryTransaction(count, 0, []);
            }
            if (!stack && count > freeSlotCount) {
                return new InventoryTransaction(count, 0, []);
            }
        } else {
            if (stack && previousCount == Inventory.STACK_LIMIT) {
                return new InventoryTransaction(count, 0, []);
            } else if (!stack && freeSlotCount == 0) {
                return new InventoryTransaction(count, 0, []);
            }
        }
        let completed = 0;
        const added = [];
        if (!stack) {
            const startSlot = Math.max(0, beginSlot);
            for (let i = startSlot; i < this.capacity; i++) {
                if (this.items[i] != null) {
                    continue;
                }
                const add = {id, count: 1};
                if (!dryRun) {
                    this.set(i, add);
                }
                added.push({slot: i, item: add});
                if (++completed >= count) {
                    break;
                }
            }
        } else {
            let stackIndex = this.getItemIndex(id);
            if (stackIndex == -1) {
                if (beginSlot == -1) {
                    stackIndex = this.nextFreeSlot;
                } else {
                    stackIndex = this.items.indexOf(null, beginSlot);
                }
                if (stackIndex == -1) {
                    return new InventoryTransaction(count, completed, []);
                }
            }
            const stackCount = this.get(stackIndex)?.count ?? 0;
            const total = Math.min(Inventory.STACK_LIMIT, stackCount + count);
            const add = {id, count: total};
            if (!dryRun) {
                this.set(stackIndex, add);
            }
            added.push({slot: stackIndex, item: add});
            completed = total - stackCount;
        }
        return new InventoryTransaction(count, completed, added);
    }
    remove(id, count = 1, beginSlot = -1, assureFullRemoval = false) {
        const hasCount = this.getItemCount(id);
        const stockObj = InvType.get(this.type).stockobj?.includes(id) === true;
        if (assureFullRemoval && hasCount < count) {
            return new InventoryTransaction(count, 0, []);
        } else if (!assureFullRemoval && hasCount < 1) {
            return new InventoryTransaction(count, 0, []);
        }
        let totalRemoved = 0;
        const removed = [];
        let skippedIndices = null;
        if (beginSlot != -1) {
            skippedIndices = [];
            for (let i = 0; i < beginSlot; i++) {
                skippedIndices.push(i);
            }
        }
        let index = 0;
        if (beginSlot != -1) {
            index = beginSlot;
        }
        for (let i = index; i < this.capacity; i++) {
            const curItem = this.items[i];
            if (!curItem || curItem.id != id) {
                continue;
            }
            const removeCount = Math.min(curItem.count, count - totalRemoved);
            totalRemoved += removeCount;
            curItem.count -= removeCount;
            if (curItem.count == 0 && !stockObj) {
                const removedItem = this.items[i];
                this.items[i] = null;
                if (removedItem) {
                    removed.push({slot: i, item: removedItem});
                }
            }
            if (totalRemoved >= count) {
                break;
            }
        }
        if (skippedIndices != null && totalRemoved < count) {
            for (let i = 0; i < skippedIndices.length; i++) {
                const curItem = this.items[i];
                if (!curItem || curItem.id != id) {
                    continue;
                }
                const removeCount = Math.min(curItem.count, count - totalRemoved);
                totalRemoved += removeCount;
                curItem.count -= removeCount;
                if (curItem.count == 0 && !stockObj) {
                    const removedItem = this.items[i];
                    this.items[i] = null;
                    if (removedItem) {
                        removed.push({slot: i, item: removedItem});
                    }
                }
                if (totalRemoved >= count) {
                    break;
                }
            }
        }
        if (totalRemoved > 0) {
            this.update = true;
        }
        return new InventoryTransaction(count, totalRemoved, removed);
    }
    delete(slot) {
        this.items[slot] = null;
        this.update = true;
    }
    swap(from, to) {
        const temp = this.items[from];
        this.set(from, this.items[to]);
        this.set(to, temp);
    }
    shift() {
        this.items = this.items.sort((a, b2) => {
            if (a === null || b2 === null) {
                return +(a === null) - +(b2 === null);
            } else {
                return +(a > b2) || -(a < b2);
            }
        });
        this.update = true;
    }
    get(slot) {
        return this.items[slot];
    }
    set(slot, item) {
        this.items[slot] = item;
        this.update = true;
    }
    validSlot(slot) {
        return slot >= 0 && slot < this.capacity;
    }
    transfer(to, item, fromSlot = -1, toSlot = -1, note = false, unnote = false) {
        if (item.count <= 0) {
            return null;
        }
        const count = Math.min(item.count, this.getItemCount(item.id));
        const objType = ObjType.get(item.id);
        let finalItem = {id: item.id, count};
        if (note && objType.certlink !== -1 && objType.certtemplate === -1) {
            finalItem = {id: objType.certlink, count};
        } else if (unnote && objType.certlink !== -1 && objType.certtemplate >= 0) {
            finalItem = {id: objType.certlink, count};
        }
        const add = to.add(finalItem.id, finalItem.count, toSlot, false);
        if (add.completed == 0) {
            return null;
        }
        const remove = this.remove(item.id, add.completed, fromSlot, false);
        if (remove.completed == 0) {
            return null;
        }
        return remove;
    }
}

// node_modules/@2004scape/rsmod-pathfinder/dist/rsmod-pathfinder.js
async function instantiate2(module, imports = {}) {
    const adaptedImports = {
        env: Object.assign(Object.create(globalThis), imports.env || {}, {
            abort(message, fileName, lineNumber, columnNumber) {
                message = __liftString(message >>> 0);
                fileName = __liftString(fileName >>> 0);
                lineNumber = lineNumber >>> 0;
                columnNumber = columnNumber >>> 0;
                (() => {
                    throw Error(`${message} in ${fileName}:${lineNumber}:${columnNumber}`);
                })();
            },
            seed() {
                return (() => {
                    return Date.now() * Math.random();
                })();
            }
        })
    };
    const {exports} = await WebAssembly.instantiate(module, adaptedImports);
    const memory = exports.memory || imports.env.memory;
    const adaptedExports = Object.setPrototypeOf(
        {
            findPath(level, srcX, srcZ, destX, destZ, srcSize, destWidth, destHeight, angle, shape, moveNear, blockAccessFlags, maxWaypoints, collision) {
                moveNear = moveNear ? 1 : 0;
                exports.__setArgumentsLength(arguments.length);
                return __liftStaticArray(__getI32, 2, exports.findPath(level, srcX, srcZ, destX, destZ, srcSize, destWidth, destHeight, angle, shape, moveNear, blockAccessFlags, maxWaypoints, collision) >>> 0);
            },
            findNaivePath(level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, blockAccessFlags, collision) {
                exports.__setArgumentsLength(arguments.length);
                return __liftStaticArray(__getI32, 2, exports.findNaivePath(level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, blockAccessFlags, collision) >>> 0);
            },
            changeFloor(x, z2, level, add) {
                add = add ? 1 : 0;
                exports.changeFloor(x, z2, level, add);
            },
            changeLoc(x, z2, level, width, length, blockrange, breakroutefinding, add) {
                blockrange = blockrange ? 1 : 0;
                breakroutefinding = breakroutefinding ? 1 : 0;
                add = add ? 1 : 0;
                exports.changeLoc(x, z2, level, width, length, blockrange, breakroutefinding, add);
            },
            changeNpc(x, z2, level, size, add) {
                add = add ? 1 : 0;
                exports.changeNpc(x, z2, level, size, add);
            },
            changePlayer(x, z2, level, size, add) {
                add = add ? 1 : 0;
                exports.changePlayer(x, z2, level, size, add);
            },
            changeRoof(x, z2, level, add) {
                add = add ? 1 : 0;
                exports.changeRoof(x, z2, level, add);
            },
            changeWall(x, z2, level, angle, shape, blockrange, breakroutefinding, add) {
                blockrange = blockrange ? 1 : 0;
                breakroutefinding = breakroutefinding ? 1 : 0;
                add = add ? 1 : 0;
                exports.changeWall(x, z2, level, angle, shape, blockrange, breakroutefinding, add);
            },
            allocateIfAbsent(absoluteX, absoluteZ, level) {
                return __liftStaticArray(__getI32, 2, exports.allocateIfAbsent(absoluteX, absoluteZ, level) >>> 0);
            },
            isZoneAllocated(absoluteX, absoluteZ, level) {
                return exports.isZoneAllocated(absoluteX, absoluteZ, level) != 0;
            },
            isFlagged(x, z2, level, masks) {
                return exports.isFlagged(x, z2, level, masks) != 0;
            },
            canTravel(level, x, z2, offsetX, offsetZ, size, extraFlag, collision) {
                exports.__setArgumentsLength(arguments.length);
                return exports.canTravel(level, x, z2, offsetX, offsetZ, size, extraFlag, collision) != 0;
            },
            hasLineOfSight(level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, extraFlag) {
                exports.__setArgumentsLength(arguments.length);
                return exports.hasLineOfSight(level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, extraFlag) != 0;
            },
            hasLineOfWalk(level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, extraFlag) {
                exports.__setArgumentsLength(arguments.length);
                return exports.hasLineOfWalk(level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, extraFlag) != 0;
            },
            lineOfSight(level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, extraFlag) {
                exports.__setArgumentsLength(arguments.length);
                return __liftStaticArray(__getI32, 2, exports.lineOfSight(level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, extraFlag) >>> 0);
            },
            lineOfWalk(level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, extraFlag) {
                exports.__setArgumentsLength(arguments.length);
                return __liftStaticArray(__getI32, 2, exports.lineOfWalk(level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, extraFlag) >>> 0);
            },
            reached(level, srcX, srcZ, destX, destZ, destWidth, destHeight, srcSize, angle, shape, blockAccessFlags) {
                exports.__setArgumentsLength(arguments.length);
                return exports.reached(level, srcX, srcZ, destX, destZ, destWidth, destHeight, srcSize, angle, shape, blockAccessFlags) != 0;
            },
            __collides(srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight) {
                return exports.__collides(srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight) != 0;
            },
            __reachRectangle1(level, srcX, srcZ, destX, destZ, destWidth, destHeight, blockAccessFlags) {
                return exports.__reachRectangle1(level, srcX, srcZ, destX, destZ, destWidth, destHeight, blockAccessFlags) != 0;
            },
            __reachRectangleN(level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, blockAccessFlags) {
                return exports.__reachRectangleN(level, srcX, srcZ, destX, destZ, srcWidth, srcHeight, destWidth, destHeight, blockAccessFlags) != 0;
            },
            __reachRectangle(level, srcX, srcZ, destX, destZ, srcSize, destWidth, destHeight, angle, blockAccessFlags) {
                return exports.__reachRectangle(level, srcX, srcZ, destX, destZ, srcSize, destWidth, destHeight, angle, blockAccessFlags) != 0;
            },
            __reachExclusiveRectangle(level, srcX, srcZ, destX, destZ, srcSize, destWidth, destHeight, angle, blockAccessFlags) {
                return exports.__reachExclusiveRectangle(level, srcX, srcZ, destX, destZ, srcSize, destWidth, destHeight, angle, blockAccessFlags) != 0;
            },
            CollisionFlag: (values => (
                (values[(values.NULL = exports['CollisionFlag.NULL'].valueOf())] = 'NULL'),
                (values[(values.OPEN = exports['CollisionFlag.OPEN'].valueOf())] = 'OPEN'),
                (values[(values.WALL_NORTH_WEST = exports['CollisionFlag.WALL_NORTH_WEST'].valueOf())] = 'WALL_NORTH_WEST'),
                (values[(values.WALL_NORTH = exports['CollisionFlag.WALL_NORTH'].valueOf())] = 'WALL_NORTH'),
                (values[(values.WALL_NORTH_EAST = exports['CollisionFlag.WALL_NORTH_EAST'].valueOf())] = 'WALL_NORTH_EAST'),
                (values[(values.WALL_EAST = exports['CollisionFlag.WALL_EAST'].valueOf())] = 'WALL_EAST'),
                (values[(values.WALL_SOUTH_EAST = exports['CollisionFlag.WALL_SOUTH_EAST'].valueOf())] = 'WALL_SOUTH_EAST'),
                (values[(values.WALL_SOUTH = exports['CollisionFlag.WALL_SOUTH'].valueOf())] = 'WALL_SOUTH'),
                (values[(values.WALL_SOUTH_WEST = exports['CollisionFlag.WALL_SOUTH_WEST'].valueOf())] = 'WALL_SOUTH_WEST'),
                (values[(values.WALL_WEST = exports['CollisionFlag.WALL_WEST'].valueOf())] = 'WALL_WEST'),
                (values[(values.LOC = exports['CollisionFlag.LOC'].valueOf())] = 'LOC'),
                (values[(values.WALL_NORTH_WEST_PROJ_BLOCKER = exports['CollisionFlag.WALL_NORTH_WEST_PROJ_BLOCKER'].valueOf())] = 'WALL_NORTH_WEST_PROJ_BLOCKER'),
                (values[(values.WALL_NORTH_PROJ_BLOCKER = exports['CollisionFlag.WALL_NORTH_PROJ_BLOCKER'].valueOf())] = 'WALL_NORTH_PROJ_BLOCKER'),
                (values[(values.WALL_NORTH_EAST_PROJ_BLOCKER = exports['CollisionFlag.WALL_NORTH_EAST_PROJ_BLOCKER'].valueOf())] = 'WALL_NORTH_EAST_PROJ_BLOCKER'),
                (values[(values.WALL_EAST_PROJ_BLOCKER = exports['CollisionFlag.WALL_EAST_PROJ_BLOCKER'].valueOf())] = 'WALL_EAST_PROJ_BLOCKER'),
                (values[(values.WALL_SOUTH_EAST_PROJ_BLOCKER = exports['CollisionFlag.WALL_SOUTH_EAST_PROJ_BLOCKER'].valueOf())] = 'WALL_SOUTH_EAST_PROJ_BLOCKER'),
                (values[(values.WALL_SOUTH_PROJ_BLOCKER = exports['CollisionFlag.WALL_SOUTH_PROJ_BLOCKER'].valueOf())] = 'WALL_SOUTH_PROJ_BLOCKER'),
                (values[(values.WALL_SOUTH_WEST_PROJ_BLOCKER = exports['CollisionFlag.WALL_SOUTH_WEST_PROJ_BLOCKER'].valueOf())] = 'WALL_SOUTH_WEST_PROJ_BLOCKER'),
                (values[(values.WALL_WEST_PROJ_BLOCKER = exports['CollisionFlag.WALL_WEST_PROJ_BLOCKER'].valueOf())] = 'WALL_WEST_PROJ_BLOCKER'),
                (values[(values.LOC_PROJ_BLOCKER = exports['CollisionFlag.LOC_PROJ_BLOCKER'].valueOf())] = 'LOC_PROJ_BLOCKER'),
                (values[(values.FLOOR_DECORATION = exports['CollisionFlag.FLOOR_DECORATION'].valueOf())] = 'FLOOR_DECORATION'),
                (values[(values.NPC = exports['CollisionFlag.NPC'].valueOf())] = 'NPC'),
                (values[(values.PLAYER = exports['CollisionFlag.PLAYER'].valueOf())] = 'PLAYER'),
                (values[(values.FLOOR = exports['CollisionFlag.FLOOR'].valueOf())] = 'FLOOR'),
                (values[(values.WALL_NORTH_WEST_ROUTE_BLOCKER = exports['CollisionFlag.WALL_NORTH_WEST_ROUTE_BLOCKER'].valueOf())] = 'WALL_NORTH_WEST_ROUTE_BLOCKER'),
                (values[(values.WALL_NORTH_ROUTE_BLOCKER = exports['CollisionFlag.WALL_NORTH_ROUTE_BLOCKER'].valueOf())] = 'WALL_NORTH_ROUTE_BLOCKER'),
                (values[(values.WALL_NORTH_EAST_ROUTE_BLOCKER = exports['CollisionFlag.WALL_NORTH_EAST_ROUTE_BLOCKER'].valueOf())] = 'WALL_NORTH_EAST_ROUTE_BLOCKER'),
                (values[(values.WALL_EAST_ROUTE_BLOCKER = exports['CollisionFlag.WALL_EAST_ROUTE_BLOCKER'].valueOf())] = 'WALL_EAST_ROUTE_BLOCKER'),
                (values[(values.WALL_SOUTH_EAST_ROUTE_BLOCKER = exports['CollisionFlag.WALL_SOUTH_EAST_ROUTE_BLOCKER'].valueOf())] = 'WALL_SOUTH_EAST_ROUTE_BLOCKER'),
                (values[(values.WALL_SOUTH_ROUTE_BLOCKER = exports['CollisionFlag.WALL_SOUTH_ROUTE_BLOCKER'].valueOf())] = 'WALL_SOUTH_ROUTE_BLOCKER'),
                (values[(values.WALL_SOUTH_WEST_ROUTE_BLOCKER = exports['CollisionFlag.WALL_SOUTH_WEST_ROUTE_BLOCKER'].valueOf())] = 'WALL_SOUTH_WEST_ROUTE_BLOCKER'),
                (values[(values.WALL_WEST_ROUTE_BLOCKER = exports['CollisionFlag.WALL_WEST_ROUTE_BLOCKER'].valueOf())] = 'WALL_WEST_ROUTE_BLOCKER'),
                (values[(values.LOC_ROUTE_BLOCKER = exports['CollisionFlag.LOC_ROUTE_BLOCKER'].valueOf())] = 'LOC_ROUTE_BLOCKER'),
                (values[(values.ROOF = exports['CollisionFlag.ROOF'].valueOf())] = 'ROOF'),
                (values[(values.FLOOR_BLOCKED = exports['CollisionFlag.FLOOR_BLOCKED'].valueOf())] = 'FLOOR_BLOCKED'),
                (values[(values.WALK_BLOCKED = exports['CollisionFlag.WALK_BLOCKED'].valueOf())] = 'WALK_BLOCKED'),
                (values[(values.BLOCK_WEST = exports['CollisionFlag.BLOCK_WEST'].valueOf())] = 'BLOCK_WEST'),
                (values[(values.BLOCK_EAST = exports['CollisionFlag.BLOCK_EAST'].valueOf())] = 'BLOCK_EAST'),
                (values[(values.BLOCK_SOUTH = exports['CollisionFlag.BLOCK_SOUTH'].valueOf())] = 'BLOCK_SOUTH'),
                (values[(values.BLOCK_NORTH = exports['CollisionFlag.BLOCK_NORTH'].valueOf())] = 'BLOCK_NORTH'),
                (values[(values.BLOCK_SOUTH_WEST = exports['CollisionFlag.BLOCK_SOUTH_WEST'].valueOf())] = 'BLOCK_SOUTH_WEST'),
                (values[(values.BLOCK_SOUTH_EAST = exports['CollisionFlag.BLOCK_SOUTH_EAST'].valueOf())] = 'BLOCK_SOUTH_EAST'),
                (values[(values.BLOCK_NORTH_WEST = exports['CollisionFlag.BLOCK_NORTH_WEST'].valueOf())] = 'BLOCK_NORTH_WEST'),
                (values[(values.BLOCK_NORTH_EAST = exports['CollisionFlag.BLOCK_NORTH_EAST'].valueOf())] = 'BLOCK_NORTH_EAST'),
                (values[(values.BLOCK_NORTH_AND_SOUTH_EAST = exports['CollisionFlag.BLOCK_NORTH_AND_SOUTH_EAST'].valueOf())] = 'BLOCK_NORTH_AND_SOUTH_EAST'),
                (values[(values.BLOCK_NORTH_AND_SOUTH_WEST = exports['CollisionFlag.BLOCK_NORTH_AND_SOUTH_WEST'].valueOf())] = 'BLOCK_NORTH_AND_SOUTH_WEST'),
                (values[(values.BLOCK_NORTH_EAST_AND_WEST = exports['CollisionFlag.BLOCK_NORTH_EAST_AND_WEST'].valueOf())] = 'BLOCK_NORTH_EAST_AND_WEST'),
                (values[(values.BLOCK_SOUTH_EAST_AND_WEST = exports['CollisionFlag.BLOCK_SOUTH_EAST_AND_WEST'].valueOf())] = 'BLOCK_SOUTH_EAST_AND_WEST'),
                (values[(values.BLOCK_WEST_ROUTE_BLOCKER = exports['CollisionFlag.BLOCK_WEST_ROUTE_BLOCKER'].valueOf())] = 'BLOCK_WEST_ROUTE_BLOCKER'),
                (values[(values.BLOCK_EAST_ROUTE_BLOCKER = exports['CollisionFlag.BLOCK_EAST_ROUTE_BLOCKER'].valueOf())] = 'BLOCK_EAST_ROUTE_BLOCKER'),
                (values[(values.BLOCK_SOUTH_ROUTE_BLOCKER = exports['CollisionFlag.BLOCK_SOUTH_ROUTE_BLOCKER'].valueOf())] = 'BLOCK_SOUTH_ROUTE_BLOCKER'),
                (values[(values.BLOCK_NORTH_ROUTE_BLOCKER = exports['CollisionFlag.BLOCK_NORTH_ROUTE_BLOCKER'].valueOf())] = 'BLOCK_NORTH_ROUTE_BLOCKER'),
                (values[(values.BLOCK_SOUTH_WEST_ROUTE_BLOCKER = exports['CollisionFlag.BLOCK_SOUTH_WEST_ROUTE_BLOCKER'].valueOf())] = 'BLOCK_SOUTH_WEST_ROUTE_BLOCKER'),
                (values[(values.BLOCK_SOUTH_EAST_ROUTE_BLOCKER = exports['CollisionFlag.BLOCK_SOUTH_EAST_ROUTE_BLOCKER'].valueOf())] = 'BLOCK_SOUTH_EAST_ROUTE_BLOCKER'),
                (values[(values.BLOCK_NORTH_WEST_ROUTE_BLOCKER = exports['CollisionFlag.BLOCK_NORTH_WEST_ROUTE_BLOCKER'].valueOf())] = 'BLOCK_NORTH_WEST_ROUTE_BLOCKER'),
                (values[(values.BLOCK_NORTH_EAST_ROUTE_BLOCKER = exports['CollisionFlag.BLOCK_NORTH_EAST_ROUTE_BLOCKER'].valueOf())] = 'BLOCK_NORTH_EAST_ROUTE_BLOCKER'),
                (values[(values.BLOCK_NORTH_AND_SOUTH_EAST_ROUTE_BLOCKER = exports['CollisionFlag.BLOCK_NORTH_AND_SOUTH_EAST_ROUTE_BLOCKER'].valueOf())] = 'BLOCK_NORTH_AND_SOUTH_EAST_ROUTE_BLOCKER'),
                (values[(values.BLOCK_NORTH_AND_SOUTH_WEST_ROUTE_BLOCKER = exports['CollisionFlag.BLOCK_NORTH_AND_SOUTH_WEST_ROUTE_BLOCKER'].valueOf())] = 'BLOCK_NORTH_AND_SOUTH_WEST_ROUTE_BLOCKER'),
                (values[(values.BLOCK_NORTH_EAST_AND_WEST_ROUTE_BLOCKER = exports['CollisionFlag.BLOCK_NORTH_EAST_AND_WEST_ROUTE_BLOCKER'].valueOf())] = 'BLOCK_NORTH_EAST_AND_WEST_ROUTE_BLOCKER'),
                (values[(values.BLOCK_SOUTH_EAST_AND_WEST_ROUTE_BLOCKER = exports['CollisionFlag.BLOCK_SOUTH_EAST_AND_WEST_ROUTE_BLOCKER'].valueOf())] = 'BLOCK_SOUTH_EAST_AND_WEST_ROUTE_BLOCKER'),
                values
            ))({}),
            LocShape: (values => (
                (values[(values.WALL_STRAIGHT = exports['LocShape.WALL_STRAIGHT'].valueOf())] = 'WALL_STRAIGHT'),
                (values[(values.WALL_DIAGONAL_CORNER = exports['LocShape.WALL_DIAGONAL_CORNER'].valueOf())] = 'WALL_DIAGONAL_CORNER'),
                (values[(values.WALL_L = exports['LocShape.WALL_L'].valueOf())] = 'WALL_L'),
                (values[(values.WALL_SQUARE_CORNER = exports['LocShape.WALL_SQUARE_CORNER'].valueOf())] = 'WALL_SQUARE_CORNER'),
                (values[(values.WALLDECOR_STRAIGHT_NOOFFSET = exports['LocShape.WALLDECOR_STRAIGHT_NOOFFSET'].valueOf())] = 'WALLDECOR_STRAIGHT_NOOFFSET'),
                (values[(values.WALLDECOR_STRAIGHT_OFFSET = exports['LocShape.WALLDECOR_STRAIGHT_OFFSET'].valueOf())] = 'WALLDECOR_STRAIGHT_OFFSET'),
                (values[(values.WALLDECOR_DIAGONAL_OFFSET = exports['LocShape.WALLDECOR_DIAGONAL_OFFSET'].valueOf())] = 'WALLDECOR_DIAGONAL_OFFSET'),
                (values[(values.WALLDECOR_DIAGONAL_NOOFFSET = exports['LocShape.WALLDECOR_DIAGONAL_NOOFFSET'].valueOf())] = 'WALLDECOR_DIAGONAL_NOOFFSET'),
                (values[(values.WALLDECOR_DIAGONAL_BOTH = exports['LocShape.WALLDECOR_DIAGONAL_BOTH'].valueOf())] = 'WALLDECOR_DIAGONAL_BOTH'),
                (values[(values.WALL_DIAGONAL = exports['LocShape.WALL_DIAGONAL'].valueOf())] = 'WALL_DIAGONAL'),
                (values[(values.CENTREPIECE_STRAIGHT = exports['LocShape.CENTREPIECE_STRAIGHT'].valueOf())] = 'CENTREPIECE_STRAIGHT'),
                (values[(values.CENTREPIECE_DIAGONAL = exports['LocShape.CENTREPIECE_DIAGONAL'].valueOf())] = 'CENTREPIECE_DIAGONAL'),
                (values[(values.ROOF_STRAIGHT = exports['LocShape.ROOF_STRAIGHT'].valueOf())] = 'ROOF_STRAIGHT'),
                (values[(values.ROOF_DIAGONAL_WITH_ROOFEDGE = exports['LocShape.ROOF_DIAGONAL_WITH_ROOFEDGE'].valueOf())] = 'ROOF_DIAGONAL_WITH_ROOFEDGE'),
                (values[(values.ROOF_DIAGONAL = exports['LocShape.ROOF_DIAGONAL'].valueOf())] = 'ROOF_DIAGONAL'),
                (values[(values.ROOF_L_CONCAVE = exports['LocShape.ROOF_L_CONCAVE'].valueOf())] = 'ROOF_L_CONCAVE'),
                (values[(values.ROOF_L_CONVEX = exports['LocShape.ROOF_L_CONVEX'].valueOf())] = 'ROOF_L_CONVEX'),
                (values[(values.ROOF_FLAT = exports['LocShape.ROOF_FLAT'].valueOf())] = 'ROOF_FLAT'),
                (values[(values.ROOFEDGE_STRAIGHT = exports['LocShape.ROOFEDGE_STRAIGHT'].valueOf())] = 'ROOFEDGE_STRAIGHT'),
                (values[(values.ROOFEDGE_DIAGONAL_CORNER = exports['LocShape.ROOFEDGE_DIAGONAL_CORNER'].valueOf())] = 'ROOFEDGE_DIAGONAL_CORNER'),
                (values[(values.ROOFEDGE_L = exports['LocShape.ROOFEDGE_L'].valueOf())] = 'ROOFEDGE_L'),
                (values[(values.ROOFEDGE_SQUARE_CORNER = exports['LocShape.ROOFEDGE_SQUARE_CORNER'].valueOf())] = 'ROOFEDGE_SQUARE_CORNER'),
                (values[(values.GROUND_DECOR = exports['LocShape.GROUND_DECOR'].valueOf())] = 'GROUND_DECOR'),
                values
            ))({}),
            LocAngle: (values => (
                (values[(values.WEST = exports['LocAngle.WEST'].valueOf())] = 'WEST'),
                (values[(values.NORTH = exports['LocAngle.NORTH'].valueOf())] = 'NORTH'),
                (values[(values.EAST = exports['LocAngle.EAST'].valueOf())] = 'EAST'),
                (values[(values.SOUTH = exports['LocAngle.SOUTH'].valueOf())] = 'SOUTH'),
                values
            ))({}),
            CollisionType: (values => (
                (values[(values.NORMAL = exports['CollisionType.NORMAL'].valueOf())] = 'NORMAL'),
                (values[(values.BLOCKED = exports['CollisionType.BLOCKED'].valueOf())] = 'BLOCKED'),
                (values[(values.INDOORS = exports['CollisionType.INDOORS'].valueOf())] = 'INDOORS'),
                (values[(values.OUTDOORS = exports['CollisionType.OUTDOORS'].valueOf())] = 'OUTDOORS'),
                (values[(values.LINE_OF_SIGHT = exports['CollisionType.LINE_OF_SIGHT'].valueOf())] = 'LINE_OF_SIGHT'),
                values
            ))({}),
            LocLayer: (values => (
                (values[(values.WALL = exports['LocLayer.WALL'].valueOf())] = 'WALL'),
                (values[(values.WALL_DECOR = exports['LocLayer.WALL_DECOR'].valueOf())] = 'WALL_DECOR'),
                (values[(values.GROUND = exports['LocLayer.GROUND'].valueOf())] = 'GROUND'),
                (values[(values.GROUND_DECOR = exports['LocLayer.GROUND_DECOR'].valueOf())] = 'GROUND_DECOR'),
                values
            ))({}),
            BlockAccessFlag: (values => (
                (values[(values.BLOCK_NORTH = exports['BlockAccessFlag.BLOCK_NORTH'].valueOf())] = 'BLOCK_NORTH'),
                (values[(values.BLOCK_EAST = exports['BlockAccessFlag.BLOCK_EAST'].valueOf())] = 'BLOCK_EAST'),
                (values[(values.BLOCK_SOUTH = exports['BlockAccessFlag.BLOCK_SOUTH'].valueOf())] = 'BLOCK_SOUTH'),
                (values[(values.BLOCK_WEST = exports['BlockAccessFlag.BLOCK_WEST'].valueOf())] = 'BLOCK_WEST'),
                values
            ))({})
        },
        exports
    );
    function __liftString(pointer) {
        if (!pointer) return null;
        const end = (pointer + new Uint32Array(memory.buffer)[(pointer - 4) >>> 2]) >>> 1,
            memoryU16 = new Uint16Array(memory.buffer);
        let start = pointer >>> 1,
            string = '';
        while (end - start > 1024) string += String.fromCharCode(...memoryU16.subarray(start, (start += 1024)));
        return string + String.fromCharCode(...memoryU16.subarray(start, end));
    }
    function __liftStaticArray(liftElement, align, pointer) {
        if (!pointer) return null;
        const length = __getU32(pointer - 4) >>> align,
            values = new Array(length);
        for (let i = 0; i < length; ++i) values[i] = liftElement(pointer + ((i << align) >>> 0));
        return values;
    }
    let __dataview = new DataView(memory.buffer);
    function __getI32(pointer) {
        try {
            return __dataview.getInt32(pointer, true);
        } catch {
            __dataview = new DataView(memory.buffer);
            return __dataview.getInt32(pointer, true);
        }
    }
    function __getU32(pointer) {
        try {
            return __dataview.getUint32(pointer, true);
        } catch {
            __dataview = new DataView(memory.buffer);
            return __dataview.getUint32(pointer, true);
        }
    }
    return adaptedExports;
}
var {
    memory,
    findPath,
    findNaivePath,
    changeFloor,
    changeLoc,
    changeNpc,
    changePlayer,
    changeRoof,
    changeWall,
    allocateIfAbsent,
    deallocateIfPresent,
    isZoneAllocated,
    isFlagged,
    canTravel,
    hasLineOfSight,
    hasLineOfWalk,
    lineOfSight,
    lineOfWalk,
    reached,
    locShapeLayer,
    __get,
    __set,
    __add,
    __remove,
    __rotate,
    __rotateFlags,
    __collides,
    __reachRectangle1,
    __reachRectangleN,
    __alteredRotation,
    __reachRectangle,
    __reachExclusiveRectangle,
    CollisionFlag,
    LocShape,
    LocAngle,
    CollisionType,
    LocLayer,
    BlockAccessFlag
} = await (async url =>
    instantiate2(
        await (async () => {
            try {
                return await globalThis.WebAssembly.compileStreaming(globalThis.fetch(url));
            } catch {
                return globalThis.WebAssembly.compile(await (await import('node:fs/promises')).readFile(url));
            }
        })(),
        {}
    ))(new URL('rsmod-pathfinder.wasm', import.meta.url));

// src/lostcity/entity/Position.ts
var Direction = {
    NORTH_WEST: 0,
    NORTH: 1,
    NORTH_EAST: 2,
    WEST: 3,
    EAST: 4,
    SOUTH_WEST: 5,
    SOUTH: 6,
    SOUTH_EAST: 7
};
var Position = {
    zone: pos => pos >> 3,
    zoneCenter: pos => Position.zone(pos) - 6,
    zoneOrigin: pos => Position.zoneCenter(pos) << 3,
    mapsquare: pos => pos >> 6,
    local: pos => pos - (Position.zoneCenter(pos) << 3),
    localOrigin: pos => pos - (Position.mapsquare(pos) << 6),
    zoneUpdate: pos => pos - ((pos >> 3) << 3),
    face: (srcX, srcZ, dstX, dstZ) => {
        if (srcX == dstX) {
            if (srcZ > dstZ) {
                return Direction.SOUTH;
            } else if (srcZ < dstZ) {
                return Direction.NORTH;
            }
        } else if (srcX > dstX) {
            if (srcZ > dstZ) {
                return Direction.SOUTH_WEST;
            } else if (srcZ < dstZ) {
                return Direction.NORTH_WEST;
            } else {
                return Direction.WEST;
            }
        } else {
            if (srcZ > dstZ) {
                return Direction.SOUTH_EAST;
            } else if (srcZ < dstZ) {
                return Direction.NORTH_EAST;
            } else {
                return Direction.EAST;
            }
        }
        return -1;
    },
    moveX: (pos, dir) => {
        return pos + Position.deltaX(dir);
    },
    moveZ: (pos, dir) => {
        return pos + Position.deltaZ(dir);
    },
    distanceTo(pos, other) {
        const p1 = Position.closest(pos, other);
        const p2 = Position.closest(other, pos);
        return Math.max(Math.abs(p1.x - p2.x), Math.abs(p1.z - p2.z));
    },
    closest(pos, other) {
        const occupiedX = pos.x + pos.width - 1;
        const occupiedZ = pos.z + pos.length - 1;
        return {
            x: other.x <= pos.x ? pos.x : other.x >= occupiedX ? occupiedX : other.x,
            z: other.z <= pos.z ? pos.z : other.z >= occupiedZ ? occupiedZ : other.z
        };
    },
    distanceToSW(pos, other) {
        const deltaX = Math.abs(pos.x - other.x);
        const deltaZ = Math.abs(pos.z - other.z);
        return Math.max(deltaX, deltaZ);
    },
    isWithinDistanceSW(pos, other, distance) {
        const dx = Math.abs(pos.x - other.x);
        const dz = Math.abs(pos.z - other.z);
        return dz < distance && dx < distance;
    },
    deltaX(dir) {
        switch (dir) {
            case Direction.SOUTH_EAST:
            case Direction.NORTH_EAST:
            case Direction.EAST:
                return 1;
            case Direction.SOUTH_WEST:
            case Direction.NORTH_WEST:
            case Direction.WEST:
                return -1;
        }
        return 0;
    },
    deltaZ(dir) {
        switch (dir) {
            case Direction.NORTH_WEST:
            case Direction.NORTH_EAST:
            case Direction.NORTH:
                return 1;
            case Direction.SOUTH_WEST:
            case Direction.SOUTH_EAST:
            case Direction.SOUTH:
                return -1;
        }
        return 0;
    },
    unpackCoord(coord) {
        const level = (coord >> 28) & 3;
        const x = (coord >> 14) & 16383;
        const z2 = coord & 16383;
        return {level, x, z: z2};
    },
    packCoord(level, x, z2) {
        return (z2 & 16383) | ((x & 16383) << 14) | ((level & 3) << 28);
    },
    packZoneCoord(x, z2) {
        return ((x & 7) << 4) | (z2 & 7);
    },
    intersects(srcX, srcZ, srcWidth, srcHeight, destX, destZ, destWidth, destHeight) {
        const srcHorizontal = srcX + srcWidth;
        const srcVertical = srcZ + srcHeight;
        const destHorizontal = destX + destWidth;
        const destVertical = destZ + destHeight;
        return !(destX >= srcHorizontal || destHorizontal <= srcX || destZ >= srcVertical || destVertical <= srcZ);
    },
    formatString(level, x, z2, separator = '_') {
        const mx = x >> 6;
        const mz = z2 >> 6;
        const lx = x & 63;
        const lz = z2 & 63;
        return level + separator + mx + separator + mz + separator + lx + separator + lz;
    }
};

// src/lostcity/entity/HitType.ts
var HitType;
(HitType2 => {
    HitType2[(HitType2['BLOCK'] = 0)] = 'BLOCK';
    HitType2[(HitType2['DAMAGE'] = 1)] = 'DAMAGE';
    HitType2[(HitType2['POISON'] = 2)] = 'POISON';
})((HitType ||= {}));
var HitType_default = HitType;

// src/lostcity/entity/PlayerStat.ts
var PlayerStat;
(PlayerStat2 => {
    PlayerStat2[(PlayerStat2['ATTACK'] = 0)] = 'ATTACK';
    PlayerStat2[(PlayerStat2['DEFENCE'] = 1)] = 'DEFENCE';
    PlayerStat2[(PlayerStat2['STRENGTH'] = 2)] = 'STRENGTH';
    PlayerStat2[(PlayerStat2['HITPOINTS'] = 3)] = 'HITPOINTS';
    PlayerStat2[(PlayerStat2['RANGED'] = 4)] = 'RANGED';
    PlayerStat2[(PlayerStat2['PRAYER'] = 5)] = 'PRAYER';
    PlayerStat2[(PlayerStat2['MAGIC'] = 6)] = 'MAGIC';
    PlayerStat2[(PlayerStat2['COOKING'] = 7)] = 'COOKING';
    PlayerStat2[(PlayerStat2['WOODCUTTING'] = 8)] = 'WOODCUTTING';
    PlayerStat2[(PlayerStat2['FLETCHING'] = 9)] = 'FLETCHING';
    PlayerStat2[(PlayerStat2['FISHING'] = 10)] = 'FISHING';
    PlayerStat2[(PlayerStat2['FIREMAKING'] = 11)] = 'FIREMAKING';
    PlayerStat2[(PlayerStat2['CRAFTING'] = 12)] = 'CRAFTING';
    PlayerStat2[(PlayerStat2['SMITHING'] = 13)] = 'SMITHING';
    PlayerStat2[(PlayerStat2['MINING'] = 14)] = 'MINING';
    PlayerStat2[(PlayerStat2['HERBLORE'] = 15)] = 'HERBLORE';
    PlayerStat2[(PlayerStat2['AGILITY'] = 16)] = 'AGILITY';
    PlayerStat2[(PlayerStat2['THIEVING'] = 17)] = 'THIEVING';
    PlayerStat2[(PlayerStat2['STAT18'] = 18)] = 'STAT18';
    PlayerStat2[(PlayerStat2['STAT19'] = 19)] = 'STAT19';
    PlayerStat2[(PlayerStat2['RUNECRAFT'] = 20)] = 'RUNECRAFT';
})((PlayerStat ||= {}));
var PlayerStat_default = PlayerStat;

// src/lostcity/engine/script/ScriptValidators.ts
function check(input, validator) {
    return validator.validate(input);
}

class ScriptInputNumberNotNullValidator {
    validate(input) {
        if (input !== -1) return input;
        throw Error('An input number was null(-1).');
    }
}

class ScriptInputStringNotNullValidator {
    validate(input) {
        if (input.length > 0) return input;
        throw Error('An input string was null(-1).');
    }
}

class ScriptInputConfigTypeValidator {
    type;
    count;
    name;
    constructor(type, count, name) {
        this.type = type;
        this.count = count;
        this.name = name;
    }
    validate(input) {
        if (this.count(input)) return this.type(input);
        throw new Error(`An input for a ${this.name} type was not valid to use. Input was ${input}.`);
    }
}

class ScriptInputRangeValidator {
    min;
    max;
    name;
    constructor(min, max, name) {
        this.min = min;
        this.max = max;
        this.name = name;
    }
    validate(input) {
        if (input >= this.min && input <= this.max) {
            return input;
        }
        throw new Error(`An input for a ${this.name} was out of range. Range should be: ${this.min} to ${this.max}. Input was ${input}.`);
    }
}

class ScriptInputCoordValidator extends ScriptInputRangeValidator {
    validate(input) {
        if (input >= this.min && input <= this.max) {
            return Position.unpackCoord(input);
        }
        throw new Error(`An input for a ${this.name} was out of range. Range should be: ${this.min} to ${this.max}. Input was ${input}.`);
    }
}
var NumberNotNull = new ScriptInputNumberNotNullValidator();
var StringNotNull = new ScriptInputStringNotNullValidator();
var LocTypeValid = new ScriptInputConfigTypeValidator(LocType.get, input => input >= 0 && input < LocType.count, 'Loc');
var LocAngleValid = new ScriptInputRangeValidator(LocAngle.WEST, LocAngle.SOUTH, 'LocAngle');
var LocShapeValid = new ScriptInputRangeValidator(LocShape.WALL_STRAIGHT, LocShape.GROUND_DECOR, 'LocShape');
var DurationValid = new ScriptInputRangeValidator(1, 2147483647, 'Duration');
var CoordValid = new ScriptInputCoordValidator(0, 2147483647, 'Coord');
var ParamTypeValid = new ScriptInputConfigTypeValidator(ParamType.get, input => input >= 0 && input < ParamType.count, 'Param');
var NpcTypeValid = new ScriptInputConfigTypeValidator(NpcType.get, input => input >= 0 && input < NpcType.count, 'Npc');
var NpcStatValid = new ScriptInputRangeValidator(NpcStat_default.ATTACK, NpcStat_default.MAGIC, 'NpcStat');
var PlayerStatValid = new ScriptInputRangeValidator(PlayerStat_default.ATTACK, PlayerStat_default.RUNECRAFT, 'PlayerStat');
var QueueValid = new ScriptInputRangeValidator(0, 19, 'AIQueue');
var HuntTypeValid = new ScriptInputConfigTypeValidator(HuntType.get, input => input >= 0 && input < HuntType.count, 'Hunt');
var NpcModeValid = new ScriptInputRangeValidator(NpcMode_default.NULL, NpcMode_default.APNPC5, 'NpcMode');
var HitTypeValid = new ScriptInputRangeValidator(HitType_default.BLOCK, HitType_default.POISON, 'Hit');
var SpotAnimTypeValid = new ScriptInputConfigTypeValidator(SpotanimType.get, input => input >= 0 && input < SpotanimType.count, 'Spotanim');
var EnumTypeValid = new ScriptInputConfigTypeValidator(EnumType.get, input => input >= 0 && input < EnumType.count, 'Enum');
var ObjTypeValid = new ScriptInputConfigTypeValidator(ObjType.get, input => input >= 0 && input < ObjType.count, 'Obj');
var ObjStackValid = new ScriptInputRangeValidator(1, Inventory.STACK_LIMIT, 'ObjStack');
var InvTypeValid = new ScriptInputConfigTypeValidator(InvType.get, input => input >= 0 && input < InvType.count, 'Inv');
var CategoryTypeValid = new ScriptInputConfigTypeValidator(CategoryType.get, input => input >= 0 && input < CategoryType.count, 'Cat');
var IDKTypeValid = new ScriptInputConfigTypeValidator(IdkType.get, input => input >= 0 && input < IdkType.count, 'Idk');
var HuntVisValid = new ScriptInputRangeValidator(HuntVis_default.OFF, HuntVis_default.LINEOFWALK, 'HuntVis');
var SeqTypeValid = new ScriptInputConfigTypeValidator(SeqType.get, input => input >= 0 && input < SeqType.count, 'Seq');
var VarPlayerValid = new ScriptInputConfigTypeValidator(VarPlayerType.get, input => input >= 0 && input < VarPlayerType.count, 'Varp');
var VarNpcValid = new ScriptInputConfigTypeValidator(VarNpcType.get, input => input >= 0 && input < VarNpcType.count, 'Varn');
var VarSharedValid = new ScriptInputConfigTypeValidator(VarSharedType.get, input => input >= 0 && input < VarSharedType.count, 'Vars');
var FontTypeValid = new ScriptInputConfigTypeValidator(FontType.get, input => input >= 0 && input < FontType.count, 'Font');
var MesanimValid = new ScriptInputConfigTypeValidator(MesanimType.get, input => input >= 0 && input < MesanimType.count, 'Mesanim');
var StructTypeValid = new ScriptInputConfigTypeValidator(StructType.get, input => input >= 0 && input < StructType.count, 'Struct');
var DbRowTypeValid = new ScriptInputConfigTypeValidator(DbRowType.get, input => input >= 0 && input < DbRowType.count, 'Dbrow');
var DbTableTypeValid = new ScriptInputConfigTypeValidator(DbTableType.get, input => input >= 0 && input < DbTableType.count, 'Dbtable');
var GenderValid = new ScriptInputRangeValidator(0, 1, 'Gender');
var SkinColourValid = new ScriptInputRangeValidator(0, 7, 'SkinColour');

// src/lostcity/engine/script/handlers/CoreOps.ts
var gosub = function (state, id) {
    if (state.fp >= 50) {
        throw new Error('stack overflow');
    }
    state.frames[state.fp++] = {
        script: state.script,
        pc: state.pc,
        intLocals: state.intLocals,
        stringLocals: state.stringLocals
    };
    const script = ScriptProvider.get(id);
    if (!script) {
        throw new Error(`unable to find proc ${script}`);
    }
    setupNewScript(state, script);
};
var jump = function (state, id) {
    const label = ScriptProvider.get(id);
    if (!label) {
        throw new Error(`unable to find label ${id}`);
    }
    state.debugFrames[state.debugFp++] = {
        script: state.script,
        pc: state.pc
    };
    setupNewScript(state, label);
    state.fp = 0;
    state.frames = [];
};
var setupNewScript = function (state, script) {
    state.script = script;
    state.pc = -1;
    state.intLocals = state.popInts(script.intArgCount);
    state.stringLocals = state.popStrings(script.stringArgCount);
};
var CoreOps = {
    [ScriptOpcode_default.PUSH_CONSTANT_INT]: state => {
        state.pushInt(state.intOperand);
    },
    [ScriptOpcode_default.PUSH_CONSTANT_STRING]: state => {
        state.pushString(state.stringOperand);
    },
    [ScriptOpcode_default.PUSH_VARP]: state => {
        const secondary = (state.intOperand >> 16) & 1;
        if (secondary && !state._activePlayer2) {
            throw new Error('No secondary active_player.');
        } else if (!secondary && !state._activePlayer) {
            throw new Error('No active_player.');
        }
        const varpType = check(state.intOperand & 65535, VarPlayerValid);
        if (varpType.type === ScriptVarType.STRING) {
            state.pushString(secondary ? state._activePlayer2.getVar(varpType.id) : state._activePlayer.getVar(varpType.id));
        } else {
            state.pushInt(secondary ? state._activePlayer2.getVar(varpType.id) : state._activePlayer.getVar(varpType.id));
        }
    },
    [ScriptOpcode_default.POP_VARP]: state => {
        const secondary = (state.intOperand >> 16) & 1;
        if (secondary && !state._activePlayer2) {
            throw new Error('No secondary active_player.');
        } else if (!secondary && !state._activePlayer) {
            throw new Error('No active_player.');
        }
        const varpType = check(state.intOperand & 65535, VarPlayerValid);
        if (!state.pointerGet(ProtectedActivePlayer[secondary]) && varpType.protect) {
            throw new Error(`%${varpType.debugname} requires protected access`);
        }
        if (varpType.type === ScriptVarType.STRING) {
            const value = state.popString();
            if (secondary) {
                state._activePlayer2.setVar(varpType.id, value);
            } else {
                state._activePlayer.setVar(varpType.id, value);
            }
        } else {
            const value = state.popInt();
            if (secondary) {
                state._activePlayer2.setVar(varpType.id, value);
            } else {
                state._activePlayer.setVar(varpType.id, value);
            }
        }
    },
    [ScriptOpcode_default.PUSH_VARN]: state => {
        const secondary = (state.intOperand >> 16) & 1;
        if (secondary && !state._activeNpc2) {
            throw new Error('No secondary active_npc.');
        } else if (!secondary && !state._activeNpc) {
            throw new Error('No active_npc.');
        }
        const varnType = check(state.intOperand & 65535, VarNpcValid);
        if (varnType.type === ScriptVarType.STRING) {
            state.pushString(secondary ? state._activeNpc2.getVar(varnType.id) : state._activeNpc.getVar(varnType.id));
        } else {
            state.pushInt(secondary ? state._activeNpc2.getVar(varnType.id) : state._activeNpc.getVar(varnType.id));
        }
    },
    [ScriptOpcode_default.POP_VARN]: state => {
        const secondary = (state.intOperand >> 16) & 1;
        if (secondary && !state._activeNpc2) {
            throw new Error('No secondary active_npc.');
        } else if (!secondary && !state._activeNpc) {
            throw new Error('No active_npc.');
        }
        const varnType = check(state.intOperand & 65535, VarNpcValid);
        if (varnType.type === ScriptVarType.STRING) {
            const value = state.popInt();
            if (secondary) {
                state._activeNpc2.setVar(varnType.id, value);
            } else {
                state._activeNpc.setVar(varnType.id, value);
            }
        } else {
            const value = state.popInt();
            if (secondary) {
                state._activeNpc2.setVar(varnType.id, value);
            } else {
                state._activeNpc.setVar(varnType.id, value);
            }
        }
    },
    [ScriptOpcode_default.PUSH_INT_LOCAL]: state => {
        state.pushInt(state.intLocals[state.intOperand]);
    },
    [ScriptOpcode_default.POP_INT_LOCAL]: state => {
        state.intLocals[state.intOperand] = state.popInt();
    },
    [ScriptOpcode_default.PUSH_STRING_LOCAL]: state => {
        state.pushString(state.stringLocals[state.intOperand]);
    },
    [ScriptOpcode_default.POP_STRING_LOCAL]: state => {
        state.stringLocals[state.intOperand] = state.popString();
    },
    [ScriptOpcode_default.BRANCH]: state => {
        state.pc += state.intOperand;
    },
    [ScriptOpcode_default.BRANCH_NOT]: state => {
        const b2 = state.popInt();
        const a = state.popInt();
        if (a !== b2) {
            state.pc += state.intOperand;
        }
    },
    [ScriptOpcode_default.BRANCH_EQUALS]: state => {
        const b2 = state.popInt();
        const a = state.popInt();
        if (a === b2) {
            state.pc += state.intOperand;
        }
    },
    [ScriptOpcode_default.BRANCH_LESS_THAN]: state => {
        const b2 = state.popInt();
        const a = state.popInt();
        if (a < b2) {
            state.pc += state.intOperand;
        }
    },
    [ScriptOpcode_default.BRANCH_GREATER_THAN]: state => {
        const b2 = state.popInt();
        const a = state.popInt();
        if (a > b2) {
            state.pc += state.intOperand;
        }
    },
    [ScriptOpcode_default.BRANCH_LESS_THAN_OR_EQUALS]: state => {
        const b2 = state.popInt();
        const a = state.popInt();
        if (a <= b2) {
            state.pc += state.intOperand;
        }
    },
    [ScriptOpcode_default.BRANCH_GREATER_THAN_OR_EQUALS]: state => {
        const b2 = state.popInt();
        const a = state.popInt();
        if (a >= b2) {
            state.pc += state.intOperand;
        }
    },
    [ScriptOpcode_default.POP_INT_DISCARD]: state => {
        state.isp--;
    },
    [ScriptOpcode_default.POP_STRING_DISCARD]: state => {
        state.ssp--;
    },
    [ScriptOpcode_default.RETURN]: state => {
        if (state.fp === 0) {
            state.execution = ScriptState.FINISHED;
            return;
        }
        const frame = state.frames[--state.fp];
        state.pc = frame.pc;
        state.script = frame.script;
        state.intLocals = frame.intLocals;
        state.stringLocals = frame.stringLocals;
    },
    [ScriptOpcode_default.JOIN_STRING]: state => {
        const count = state.intOperand;
        const strings = [];
        for (let i = 0; i < count; i++) {
            strings.push(state.popString());
        }
        state.pushString(strings.reverse().join(''));
    },
    [ScriptOpcode_default.GOSUB]: state => {
        gosub(state, state.popInt());
    },
    [ScriptOpcode_default.GOSUB_WITH_PARAMS]: state => {
        gosub(state, state.intOperand);
    },
    [ScriptOpcode_default.JUMP]: state => {
        jump(state, state.popInt());
    },
    [ScriptOpcode_default.JUMP_WITH_PARAMS]: state => {
        jump(state, state.intOperand);
    },
    [ScriptOpcode_default.DEFINE_ARRAY]: state => {
        throw new Error('unimplemented');
    },
    [ScriptOpcode_default.PUSH_ARRAY_INT]: state => {
        throw new Error('unimplemented');
    },
    [ScriptOpcode_default.POP_ARRAY_INT]: state => {
        throw new Error('unimplemented');
    },
    [ScriptOpcode_default.SWITCH]: state => {
        const key = state.popInt();
        const table = state.script.switchTables[state.intOperand];
        if (table === undefined) {
            return;
        }
        const result = table[key];
        if (result) {
            state.pc += result;
        }
    },
    [ScriptOpcode_default.PUSH_VARS]: state => {
        const varsType = check(state.intOperand & 65535, VarSharedValid);
        if (varsType.type === ScriptVarType.STRING) {
            state.pushString(World_default.varsString[varsType.id] ?? '');
        } else {
            state.pushInt(World_default.vars[varsType.id]);
        }
    },
    [ScriptOpcode_default.POP_VARS]: state => {
        const varsType = check(state.intOperand & 65535, VarSharedValid);
        if (varsType.type === ScriptVarType.STRING) {
            World_default.varsString[varsType.id] = state.popString();
        } else {
            World_default.vars[varsType.id] = state.popInt();
        }
    }
};
var CoreOps_default = CoreOps;

// src/lostcity/engine/script/handlers/DbOps.ts
var DebugOps = {
    [ScriptOpcode_default.DB_FIND_WITH_COUNT]: state => {
        throw new Error('unimplemented');
    },
    [ScriptOpcode_default.DB_FINDNEXT]: state => {
        if (!state.dbTable) {
            throw new Error('No table selected');
        }
        if (state.dbRow + 1 >= state.dbRowQuery.length) {
            state.pushInt(-1);
            return;
        }
        state.dbRow++;
        state.pushInt(check(state.dbRowQuery[state.dbRow], DbRowTypeValid).id);
    },
    [ScriptOpcode_default.DB_GETFIELD]: state => {
        const [row, tableColumnPacked, listIndex] = state.popInts(3);
        const table = (tableColumnPacked >> 12) & 65535;
        const column = (tableColumnPacked >> 4) & 127;
        const tuple = tableColumnPacked & 63;
        const rowType = check(row, DbRowTypeValid);
        const tableType = check(table, DbTableTypeValid);
        let values;
        if (rowType.tableId !== table) {
            values = tableType.getDefault(column);
        } else {
            values = rowType.getValue(column, listIndex);
        }
        const valueTypes = tableType.types[column];
        for (let i = 0; i < values.length; i++) {
            if (valueTypes[i] === ScriptVarType.STRING) {
                state.pushString(values[i]);
            } else {
                state.pushInt(values[i]);
            }
        }
    },
    [ScriptOpcode_default.DB_GETFIELDCOUNT]: state => {
        const [row, tableColumnPacked] = state.popInts(2);
        const table = (tableColumnPacked >> 12) & 65535;
        const column = (tableColumnPacked >> 4) & 127;
        const tuple = tableColumnPacked & 63;
        const rowType = check(row, DbRowTypeValid);
        const tableType = check(table, DbTableTypeValid);
        if (rowType.tableId !== table) {
            state.pushInt(0);
            return;
        }
        state.pushInt(rowType.columnValues[column].length / tableType.types[column].length);
    },
    [ScriptOpcode_default.DB_LISTALL_WITH_COUNT]: state => {
        throw new Error('unimplemented');
    },
    [ScriptOpcode_default.DB_GETROWTABLE]: state => {
        state.pushInt(check(state.popInt(), DbRowTypeValid).tableId);
    },
    [ScriptOpcode_default.DB_FINDBYINDEX]: state => {
        throw new Error('unimplemented');
    },
    [ScriptOpcode_default.DB_FIND_REFINE_WITH_COUNT]: state => {
        throw new Error('unimplemented');
    },
    [ScriptOpcode_default.DB_FIND]: state => {
        const isString = state.popInt() == 2;
        const query = isString ? state.popString() : state.popInt();
        const tableColumnPacked = state.popInt();
        const table = (tableColumnPacked >> 12) & 65535;
        const column = (tableColumnPacked >> 4) & 127;
        const tuple = tableColumnPacked & 63;
        state.dbTable = check(table, DbTableTypeValid);
        state.dbRow = -1;
        state.dbRowQuery = [];
        const rows = DbRowType.getInTable(table);
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row.columnValues[column].includes(query)) {
                state.dbRowQuery.push(row.id);
            }
        }
        state.pushInt(state.dbRowQuery.length);
    },
    [ScriptOpcode_default.DB_FIND_REFINE]: state => {
        const isString = state.popInt() == 2;
        const query = isString ? state.popString() : state.popInt();
        const tableColumnPacked = state.popInt();
        const table = (tableColumnPacked >> 12) & 65535;
        const column = (tableColumnPacked >> 4) & 127;
        const tuple = tableColumnPacked & 63;
        const found = [];
        const rows = DbRowType.getInTable(table);
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row.columnValues[column].includes(query)) {
                found.push(row.id);
            }
        }
        const prevQuery = state.dbRowQuery;
        state.dbRow = -1;
        state.dbRowQuery = [];
        for (let i = 0; i < prevQuery.length; i++) {
            if (found.includes(prevQuery[i])) {
                state.dbRowQuery.push(prevQuery[i]);
            }
        }
        state.pushInt(state.dbRowQuery.length);
    },
    [ScriptOpcode_default.DB_LISTALL]: state => {
        throw new Error('unimplemented');
    }
};
var DbOps_default = DebugOps;

// src/lostcity/util/Environment.ts
var Environment_default = {
    PUBLIC_IP: 'localhost',
    WEB_PORT: 80,
    GAME_PORT: 43594,
    LOGIN_HOST: 'localhost',
    LOGIN_PORT: 43500,
    LOGIN_KEY: '',
    FRIEND_HOST: 'localhost',
    FRIEND_PORT: 43501,
    FRIEND_KEY: '',
    WORLD_ID: 0,
    LOCAL_DEV: true,
    MEMBERS_WORLD: true,
    XP_MULTIPLIER: 1,
    SHUTDOWN_TIMER: 50,
    HTTPS_ENABLED: false,
    ADDRESS_SHOWPORT: true,
    CLIRUNNER: false,
    CI_MODE: false,
    SKIP_CORS: false,
    DB_HOST: '',
    DB_USER: '',
    DB_PASS: '',
    DB_NAME: '',
    ADMIN_IP: 'localhost',
    SKIP_CRC: false,
    JAVA_PATH: 'java',
    DATA_SRC_DIR: 'data/src',
    VALIDATE_PACK: true,
    STRICT_FOLDERS: true,
    BUILD_ON_STARTUP: true,
    UPDATE_ON_STARTUP: true,
    JMODS: ['pazaz'],
    CLIENT_PATHFINDER: true,
    NO_SOCKET_TIMEOUT: false,
    PROFILE_SCRIPTS: false
};

// src/lostcity/engine/script/handlers/DebugOps.ts
var DebugOps2 = {
    [ScriptOpcode_default.ERROR]: state => {
        throw new Error(state.popString());
    },
    [ScriptOpcode_default.MAP_LOCALDEV]: state => {
        state.pushInt(Environment_default.LOCAL_DEV ? 1 : 0);
    }
};
var DebugOps_default = DebugOps2;

// src/lostcity/engine/script/handlers/EnumOps.ts
var EnumOps = {
    [ScriptOpcode_default.ENUM]: state => {
        const [inputType, outputType, enumId, key] = state.popInts(4);
        const enumType = check(enumId, EnumTypeValid);
        if (enumType.inputtype !== inputType || enumType.outputtype !== outputType) {
            throw new Error(`Type validation error: ${enumType.debugname} key: ${key}. Expected input: ${inputType} got: ${enumType.inputtype}. Expected output: ${outputType} got: ${enumType.outputtype}`);
        }
        const value = enumType.values.get(key);
        if (typeof value === 'string') {
            state.pushString(value ?? enumType.defaultString);
        } else {
            state.pushInt(value ?? enumType.defaultInt);
        }
    },
    [ScriptOpcode_default.ENUM_GETOUTPUTCOUNT]: state => {
        state.pushInt(check(state.popInt(), EnumTypeValid).values.size);
    }
};
var EnumOps_default = EnumOps;

// src/lostcity/entity/EntityLifeCycle.ts
var EntityLifeCycle;
(EntityLifeCycle2 => {
    EntityLifeCycle2[(EntityLifeCycle2['FOREVER'] = 0)] = 'FOREVER';
    EntityLifeCycle2[(EntityLifeCycle2['RESPAWN'] = 1)] = 'RESPAWN';
    EntityLifeCycle2[(EntityLifeCycle2['DESPAWN'] = 2)] = 'DESPAWN';
})((EntityLifeCycle ||= {}));
var EntityLifeCycle_default = EntityLifeCycle;

// src/lostcity/entity/Entity.ts
class Entity {
    level;
    x;
    z;
    width;
    length;
    lifecycle;
    lifecycleTick = -1;
    lastLifecycleTick = -1;
    constructor(level, x, z2, width, length, lifecycle) {
        this.level = level;
        this.x = x;
        this.z = z2;
        this.width = width;
        this.length = length;
        this.lifecycle = lifecycle;
    }
    updateLifeCycle(tick) {
        return this.lifecycleTick === tick && this.lifecycle !== EntityLifeCycle_default.FOREVER;
    }
    checkLifeCycle(tick) {
        if (this.lifecycle === EntityLifeCycle_default.FOREVER) {
            return true;
        }
        if (this.lifecycle === EntityLifeCycle_default.RESPAWN) {
            return this.lifecycleTick < tick;
        }
        if (this.lifecycle === EntityLifeCycle_default.DESPAWN) {
            return this.lifecycleTick > tick;
        }
        return false;
    }
    setLifeCycle(tick) {
        this.lifecycleTick = tick;
        this.lastLifecycleTick = World_default.currentTick;
    }
}

// src/lostcity/entity/NonPathingEntity.ts
class NonPathingEntity extends Entity {
    resetEntity(respawn) {}
}

// src/lostcity/entity/Obj.ts
class Obj extends NonPathingEntity {
    type;
    count;
    receiverId = -1;
    reveal = -1;
    constructor(level, x, z2, lifecycle, type, count) {
        super(level, x, z2, 1, 1, lifecycle);
        this.type = type;
        this.count = count;
    }
}

// src/lostcity/engine/script/handlers/InvOps.ts
var InvOps = {
    [ScriptOpcode_default.INV_ALLSTOCK]: state => {
        const invType = check(state.popInt(), InvTypeValid);
        state.pushInt(invType.allstock ? 1 : 0);
    },
    [ScriptOpcode_default.INV_SIZE]: state => {
        const invType = check(state.popInt(), InvTypeValid);
        state.pushInt(invType.size);
    },
    [ScriptOpcode_default.INV_STOCKBASE]: state => {
        const [inv, obj] = state.popInts(2);
        const invType = check(inv, InvTypeValid);
        const objType = check(obj, ObjTypeValid);
        if (!invType.stockobj || !invType.stockcount) {
            state.pushInt(-1);
            return;
        }
        const index = invType.stockobj.indexOf(objType.id);
        state.pushInt(index >= 0 ? invType.stockcount[index] : -1);
    },
    [ScriptOpcode_default.INV_ADD]: checkedHandler(ActivePlayer, state => {
        const [inv, objId, count] = state.popInts(3);
        const invType = check(inv, InvTypeValid);
        const objType = check(objId, ObjTypeValid);
        check(count, ObjStackValid);
        if (!state.pointerGet(ProtectedActivePlayer[state.intOperand]) && invType.protect && invType.scope !== InvType.SCOPE_SHARED) {
            throw new Error(`\$inv requires protected access: ${invType.debugname}`);
        }
        if (!invType.dummyinv && objType.dummyitem !== 0) {
            throw new Error(`dummyitem in non-dummyinv: ${objType.debugname} -> ${invType.debugname}`);
        }
        const player = state.activePlayer;
        const overflow = count - player.invAdd(invType.id, objType.id, count);
        if (overflow > 0) {
            World_default.addObj(new Obj(player.level, player.x, player.z, EntityLifeCycle_default.DESPAWN, objType.id, overflow), player.pid, 200);
        }
    }),
    [ScriptOpcode_default.INV_CHANGESLOT]: checkedHandler(ActivePlayer, state => {
        const [inv, find, replace, replaceCount] = state.popInts(4);
        throw new Error('unimplemented');
    }),
    [ScriptOpcode_default.INV_CLEAR]: checkedHandler(ActivePlayer, state => {
        const invType = check(state.popInt(), InvTypeValid);
        if (!state.pointerGet(ProtectedActivePlayer[state.intOperand]) && invType.protect && invType.scope !== InvType.SCOPE_SHARED) {
            throw new Error(`\$inv requires protected access: ${invType.debugname}`);
        }
        state.activePlayer.invClear(invType.id);
    }),
    [ScriptOpcode_default.INV_DEL]: checkedHandler(ActivePlayer, state => {
        const [inv, obj, count] = state.popInts(3);
        const invType = check(inv, InvTypeValid);
        const objType = check(obj, ObjTypeValid);
        check(count, ObjStackValid);
        if (!state.pointerGet(ProtectedActivePlayer[state.intOperand]) && invType.protect && invType.scope !== InvType.SCOPE_SHARED) {
            throw new Error(`\$inv requires protected access: ${invType.debugname}`);
        }
        state.activePlayer.invDel(invType.id, objType.id, count);
    }),
    [ScriptOpcode_default.INV_DELSLOT]: checkedHandler(ActivePlayer, state => {
        const [inv, slot] = state.popInts(2);
        const invType = check(inv, InvTypeValid);
        if (!state.pointerGet(ProtectedActivePlayer[state.intOperand]) && invType.protect && invType.scope !== InvType.SCOPE_SHARED) {
            throw new Error(`\$inv requires protected access: ${invType.debugname}`);
        }
        const obj = state.activePlayer.invGetSlot(invType.id, slot);
        if (!obj) {
            return;
        }
        state.activePlayer.invDelSlot(invType.id, slot);
    }),
    [ScriptOpcode_default.INV_DROPITEM]: checkedHandler(ActivePlayer, state => {
        const [inv, coord, obj, count, duration] = state.popInts(5);
        const invType = check(inv, InvTypeValid);
        const position = check(coord, CoordValid);
        const objType = check(obj, ObjTypeValid);
        check(count, ObjStackValid);
        check(duration, DurationValid);
        if (!state.pointerGet(ProtectedActivePlayer[state.intOperand]) && invType.protect && invType.scope !== InvType.SCOPE_SHARED) {
            throw new Error(`\$inv requires protected access: ${invType.debugname}`);
        }
        const player = state.activePlayer;
        const completed = player.invDel(invType.id, objType.id, count);
        if (completed == 0) {
            return;
        }
        player.playerLog('Dropped item from', invType.debugname, objType.debugname);
        const floorObj = new Obj(position.level, position.x, position.z, EntityLifeCycle_default.DESPAWN, objType.id, completed);
        World_default.addObj(floorObj, player.pid, duration);
        state.activeObj = floorObj;
        state.pointerAdd(ActiveObj[state.intOperand]);
    }),
    [ScriptOpcode_default.INV_DROPSLOT]: checkedHandler(ActivePlayer, state => {
        const [inv, coord, slot, duration] = state.popInts(4);
        const invType = check(inv, InvTypeValid);
        check(duration, DurationValid);
        const position = check(coord, CoordValid);
        if (!state.pointerGet(ProtectedActivePlayer[state.intOperand]) && invType.protect && invType.scope !== InvType.SCOPE_SHARED) {
            throw new Error(`\$inv requires protected access: ${invType.debugname}`);
        }
        const obj = state.activePlayer.invGetSlot(invType.id, slot);
        if (!obj) {
            throw new Error('$slot is empty');
        }
        const player = state.activePlayer;
        const completed = player.invDel(invType.id, obj.id, obj.count, slot);
        if (completed === 0) {
            return;
        }
        const objType = ObjType.get(obj.id);
        player.playerLog('Dropped item from', invType.debugname, objType.debugname);
        const floorObj = new Obj(position.level, position.x, position.z, EntityLifeCycle_default.DESPAWN, obj.id, completed);
        World_default.addObj(floorObj, player.pid, duration);
        state.activeObj = floorObj;
        state.pointerAdd(ActiveObj[state.intOperand]);
    }),
    [ScriptOpcode_default.INV_FREESPACE]: checkedHandler(ActivePlayer, state => {
        const invType = check(state.popInt(), InvTypeValid);
        state.pushInt(state.activePlayer.invFreeSpace(invType.id));
    }),
    [ScriptOpcode_default.INV_GETNUM]: checkedHandler(ActivePlayer, state => {
        const [inv, slot] = state.popInts(2);
        const invType = check(inv, InvTypeValid);
        state.pushInt(state.activePlayer.invGetSlot(invType.id, slot)?.count ?? 0);
    }),
    [ScriptOpcode_default.INV_GETOBJ]: checkedHandler(ActivePlayer, state => {
        const [inv, slot] = state.popInts(2);
        const invType = check(inv, InvTypeValid);
        state.pushInt(state.activePlayer.invGetSlot(invType.id, slot)?.id ?? -1);
    }),
    [ScriptOpcode_default.INV_ITEMSPACE]: checkedHandler(ActivePlayer, state => {
        const [inv, obj, count, size] = state.popInts(4);
        const invType = check(inv, InvTypeValid);
        const objType = check(obj, ObjTypeValid);
        check(count, ObjStackValid);
        if (size < 0 || size > invType.size) {
            throw new Error(`\$count is out of range: ${count}`);
        }
        state.pushInt(state.activePlayer.invItemSpace(invType.id, objType.id, count, size) === 0 ? 1 : 0);
    }),
    [ScriptOpcode_default.INV_ITEMSPACE2]: checkedHandler(ActivePlayer, state => {
        const [inv, obj, count, size] = state.popInts(4);
        const invType = check(inv, InvTypeValid);
        const objType = check(obj, ObjTypeValid);
        check(count, ObjStackValid);
        state.pushInt(state.activePlayer.invItemSpace(invType.id, objType.id, count, size));
    }),
    [ScriptOpcode_default.INV_MOVEFROMSLOT]: checkedHandler(ActivePlayer, state => {
        const [fromInv, toInv, fromSlot] = state.popInts(3);
        const fromInvType = check(fromInv, InvTypeValid);
        const toInvType = check(toInv, InvTypeValid);
        if (!state.pointerGet(ProtectedActivePlayer[state.intOperand]) && fromInvType.protect && fromInvType.scope !== InvType.SCOPE_SHARED) {
            throw new Error(`\$inv requires protected access: ${fromInvType.debugname}`);
        }
        if (!state.pointerGet(ProtectedActivePlayer[state.intOperand]) && toInvType.protect && fromInvType.scope !== InvType.SCOPE_SHARED) {
            throw new Error(`\$inv requires protected access: ${toInvType.debugname}`);
        }
        const player = state.activePlayer;
        const {overflow, fromObj} = player.invMoveFromSlot(fromInvType.id, toInvType.id, fromSlot);
        if (overflow > 0) {
            World_default.addObj(new Obj(player.level, player.x, player.z, EntityLifeCycle_default.DESPAWN, fromObj, overflow), player.pid, 200);
        }
    }),
    [ScriptOpcode_default.INV_MOVETOSLOT]: checkedHandler(ActivePlayer, state => {
        const [fromInv, toInv, fromSlot, toSlot] = state.popInts(4);
        const fromInvType = check(fromInv, InvTypeValid);
        const toInvType = check(toInv, InvTypeValid);
        if (!state.pointerGet(ProtectedActivePlayer[state.intOperand]) && fromInvType.protect && fromInvType.scope !== InvType.SCOPE_SHARED) {
            throw new Error(`\$inv requires protected access: ${fromInvType.debugname}`);
        }
        if (!state.pointerGet(ProtectedActivePlayer[state.intOperand]) && toInvType.protect && fromInvType.scope !== InvType.SCOPE_SHARED) {
            throw new Error(`\$inv requires protected access: ${toInvType.debugname}`);
        }
        state.activePlayer.invMoveToSlot(fromInvType.id, toInvType.id, fromSlot, toSlot);
    }),
    [ScriptOpcode_default.BOTH_MOVEINV]: checkedHandler(ActivePlayer, state => {
        const [from, to] = state.popInts(2);
        const fromInvType = check(from, InvTypeValid);
        const toInvType = check(to, InvTypeValid);
        const secondary = state.intOperand == 1;
        const fromPlayer = secondary ? state._activePlayer2 : state._activePlayer;
        const toPlayer = secondary ? state._activePlayer : state._activePlayer2;
        if (!fromPlayer || !toPlayer) {
            throw new Error('player is null');
        }
        if (!state.pointerGet(ProtectedActivePlayer[secondary ? 1 : 0]) && fromInvType.protect && fromInvType.scope !== InvType.SCOPE_SHARED) {
            throw new Error(`\$from_inv requires protected access: ${fromInvType.debugname}`);
        }
        if (!state.pointerGet(ProtectedActivePlayer[secondary ? 0 : 1]) && toInvType.protect && fromInvType.scope !== InvType.SCOPE_SHARED) {
            throw new Error(`\$to_inv requires protected access: ${toInvType.debugname}`);
        }
        const fromInv = fromPlayer.getInventory(from);
        const toInv = toPlayer.getInventory(to);
        if (!fromInv || !toInv) {
            throw new Error('inv is null');
        }
        for (let slot = 0; slot < fromInv.capacity; slot++) {
            const obj = fromInv.get(slot);
            if (!obj) {
                continue;
            }
            fromInv.delete(slot);
            toInv.add(obj.id, obj.count);
            fromPlayer.playerLog('Gave ' + ObjType.get(obj.id).name + ' x' + obj.count + ' during trade with ' + toPlayer.username);
            toPlayer.playerLog('Received ' + ObjType.get(obj.id).name + ' x' + obj.count + ' during trade with ' + fromPlayer.username);
        }
    }),
    [ScriptOpcode_default.INV_MOVEITEM]: checkedHandler(ActivePlayer, state => {
        const [fromInv, toInv, obj, count] = state.popInts(4);
        const fromInvType = check(fromInv, InvTypeValid);
        const toInvType = check(toInv, InvTypeValid);
        const objType = check(obj, ObjTypeValid);
        check(count, ObjStackValid);
        if (!state.pointerGet(ProtectedActivePlayer[state.intOperand]) && fromInvType.protect && fromInvType.scope !== InvType.SCOPE_SHARED) {
            throw new Error(`\$inv requires protected access: ${fromInvType.debugname}`);
        }
        if (!state.pointerGet(ProtectedActivePlayer[state.intOperand]) && toInvType.protect && fromInvType.scope !== InvType.SCOPE_SHARED) {
            throw new Error(`\$inv requires protected access: ${toInvType.debugname}`);
        }
        const player = state.activePlayer;
        const completed = player.invDel(fromInvType.id, objType.id, count);
        if (completed == 0) {
            return;
        }
        const overflow = count - player.invAdd(toInvType.id, objType.id, completed);
        if (overflow > 0) {
            World_default.addObj(new Obj(player.level, player.x, player.z, EntityLifeCycle_default.DESPAWN, objType.id, overflow), player.pid, 200);
        }
    }),
    [ScriptOpcode_default.INV_MOVEITEM_CERT]: checkedHandler(ActivePlayer, state => {
        const [fromInv, toInv, obj, count] = state.popInts(4);
        const fromInvType = check(fromInv, InvTypeValid);
        const toInvType = check(toInv, InvTypeValid);
        const objType = check(obj, ObjTypeValid);
        check(count, ObjStackValid);
        if (!state.pointerGet(ProtectedActivePlayer[state.intOperand]) && fromInvType.protect && fromInvType.scope !== InvType.SCOPE_SHARED) {
            throw new Error(`\$inv requires protected access: ${fromInvType.debugname}`);
        }
        if (!state.pointerGet(ProtectedActivePlayer[state.intOperand]) && toInvType.protect && fromInvType.scope !== InvType.SCOPE_SHARED) {
            throw new Error(`\$inv requires protected access: ${toInvType.debugname}`);
        }
        const player = state.activePlayer;
        const completed = player.invDel(fromInvType.id, objType.id, count);
        if (completed == 0) {
            return;
        }
        let finalObj = objType.id;
        if (objType.certtemplate === -1 && objType.certlink >= 0) {
            finalObj = objType.certlink;
        }
        const overflow = count - player.invAdd(toInvType.id, finalObj, completed);
        if (overflow > 0) {
            World_default.addObj(new Obj(player.level, player.x, player.z, EntityLifeCycle_default.DESPAWN, finalObj, overflow), player.pid, 200);
        }
    }),
    [ScriptOpcode_default.INV_MOVEITEM_UNCERT]: checkedHandler(ActivePlayer, state => {
        const [fromInv, toInv, obj, count] = state.popInts(4);
        const fromInvType = check(fromInv, InvTypeValid);
        const toInvType = check(toInv, InvTypeValid);
        const objType = check(obj, ObjTypeValid);
        check(count, ObjStackValid);
        if (!state.pointerGet(ProtectedActivePlayer[state.intOperand]) && fromInvType.protect && fromInvType.scope !== InvType.SCOPE_SHARED) {
            throw new Error(`\$inv requires protected access: ${fromInvType.debugname}`);
        }
        if (!state.pointerGet(ProtectedActivePlayer[state.intOperand]) && toInvType.protect && fromInvType.scope !== InvType.SCOPE_SHARED) {
            throw new Error(`\$inv requires protected access: ${toInvType.debugname}`);
        }
        const player = state.activePlayer;
        const completed = player.invDel(fromInvType.id, objType.id, count);
        if (completed == 0) {
            return;
        }
        if (objType.certtemplate >= 0 && objType.certlink >= 0) {
            player.invAdd(toInvType.id, objType.certlink, completed);
        } else {
            player.invAdd(toInvType.id, objType.id, completed);
        }
    }),
    [ScriptOpcode_default.INV_SETSLOT]: checkedHandler(ActivePlayer, state => {
        const [inv, slot, objId, count] = state.popInts(4);
        const invType = check(inv, InvTypeValid);
        const objType = check(objId, ObjTypeValid);
        check(count, ObjStackValid);
        if (!state.pointerGet(ProtectedActivePlayer[state.intOperand]) && invType.protect && invType.scope !== InvType.SCOPE_SHARED) {
            throw new Error(`\$inv requires protected access: ${invType.debugname}`);
        }
        if (!invType.dummyinv && objType.dummyitem !== 0) {
            throw new Error(`dummyitem in non-dummyinv: ${objType.debugname} -> ${invType.debugname}`);
        }
        state.activePlayer.invSet(invType.id, objType.id, count, slot);
    }),
    [ScriptOpcode_default.INV_TOTAL]: checkedHandler(ActivePlayer, state => {
        const [inv, obj] = state.popInts(2);
        const invType = check(inv, InvTypeValid);
        if (obj === -1) {
            state.pushInt(0);
            return;
        }
        state.pushInt(state.activePlayer.invTotal(invType.id, obj));
    }),
    [ScriptOpcode_default.INV_TOTALCAT]: checkedHandler(ActivePlayer, state => {
        const [inv, category] = state.popInts(2);
        const invType = check(inv, InvTypeValid);
        const catType = check(category, CategoryTypeValid);
        state.pushInt(state.activePlayer.invTotalCat(invType.id, catType.id));
    }),
    [ScriptOpcode_default.INV_TRANSMIT]: checkedHandler(ActivePlayer, state => {
        const [inv, com] = state.popInts(2);
        const invType = check(inv, InvTypeValid);
        check(com, NumberNotNull);
        state.activePlayer.invListenOnCom(invType.id, com, state.activePlayer.uid);
    }),
    [ScriptOpcode_default.INVOTHER_TRANSMIT]: checkedHandler(ActivePlayer, state => {
        const [uid, inv, com] = state.popInts(3);
        check(uid, NumberNotNull);
        const invType = check(inv, InvTypeValid);
        check(com, NumberNotNull);
        state.activePlayer.invListenOnCom(invType.id, com, uid);
    }),
    [ScriptOpcode_default.INV_STOPTRANSMIT]: checkedHandler(ActivePlayer, state => {
        const com = check(state.popInt(), NumberNotNull);
        state.activePlayer.invStopListenOnCom(com);
    }),
    [ScriptOpcode_default.BOTH_DROPSLOT]: checkedHandler(ActivePlayer, state => {
        const [inv, coord, slot, duration] = state.popInts(4);
        const invType = check(inv, InvTypeValid);
        check(duration, DurationValid);
        const position = check(coord, CoordValid);
        const secondary = state.intOperand == 1;
        const fromPlayer = secondary ? state._activePlayer2 : state._activePlayer;
        const toPlayer = secondary ? state._activePlayer : state._activePlayer2;
        if (!fromPlayer || !toPlayer) {
            throw new Error('player is null');
        }
        if (!state.pointerGet(ProtectedActivePlayer[secondary ? 1 : 0]) && invType.protect && invType.scope !== InvType.SCOPE_SHARED) {
            throw new Error(`inv requires protected access: ${invType.debugname}`);
        }
        const obj = fromPlayer.invGetSlot(invType.id, slot);
        if (!obj) {
            throw new Error('$slot is empty');
        }
        const completed = fromPlayer.invDel(invType.id, obj.id, obj.count, slot);
        if (completed === 0) {
            return;
        }
        const objType = ObjType.get(obj.id);
        fromPlayer.playerLog('Dropped item from', invType.debugname, objType.debugname);
        if (!objType.tradeable) {
            return;
        }
        World_default.addObj(new Obj(position.level, position.x, position.z, EntityLifeCycle_default.DESPAWN, obj.id, completed), toPlayer.pid, duration);
    }),
    [ScriptOpcode_default.INV_DROPALL]: checkedHandler(ActivePlayer, state => {
        const [inv, coord, duration] = state.popInts(3);
        const invType = check(inv, InvTypeValid);
        check(duration, DurationValid);
        const position = check(coord, CoordValid);
        if (!state.pointerGet(ProtectedActivePlayer[state.intOperand]) && invType.protect && invType.scope !== InvType.SCOPE_SHARED) {
            throw new Error(`\$inv requires protected access: ${invType.debugname}`);
        }
        const inventory = state.activePlayer.getInventory(invType.id);
        if (!inventory) {
            return;
        }
        for (let slot = 0; slot < inventory.capacity; slot++) {
            const obj = inventory.get(slot);
            if (!obj) {
                continue;
            }
            inventory.delete(slot);
            const objType = ObjType.get(obj.id);
            if (!objType.tradeable) {
                continue;
            }
            World_default.addObj(new Obj(position.level, position.x, position.z, EntityLifeCycle_default.DESPAWN, obj.id, obj.count), -1, duration);
        }
    }),
    [ScriptOpcode_default.INV_TOTALPARAM]: checkedHandler(ActivePlayer, state => {
        const [inv, param] = state.popInts(2);
        state.pushInt(state.activePlayer.invTotalParam(inv, param));
    }),
    [ScriptOpcode_default.INV_TOTALPARAM_STACK]: checkedHandler(ActivePlayer, state => {
        const [inv, param] = state.popInts(2);
        state.pushInt(state.activePlayer.invTotalParamStack(inv, param));
    })
};
var InvOps_default = InvOps;

// src/lostcity/entity/NpcIteratorType.ts
var NpcIteratorType;
(NpcIteratorType2 => {
    NpcIteratorType2[(NpcIteratorType2['ZONE'] = 0)] = 'ZONE';
    NpcIteratorType2[(NpcIteratorType2['DISTANCE'] = 1)] = 'DISTANCE';
})((NpcIteratorType ||= {}));
var NpcIteratorType_default = NpcIteratorType;

// src/lostcity/engine/script/ScriptIterators.ts
class ScriptIterator {
    iterator;
    tick;
    constructor(tick) {
        this.iterator = this.generator();
        this.tick = tick;
    }
    [Symbol.iterator]() {
        return this.iterator;
    }
    next() {
        return this.iterator.next();
    }
}

class HuntIterator extends ScriptIterator {
    x;
    z;
    level;
    minX;
    maxX;
    minZ;
    maxZ;
    distance;
    checkVis;
    checkType;
    checkCategory;
    type;
    constructor(tick, level, x, z2, distance, checkVis, checkType, checkCategory, type) {
        super(tick);
        const centerX = Position.zone(x);
        const centerZ = Position.zone(z2);
        const radius = (1 + distance / 8) | 0;
        this.x = x;
        this.z = z2;
        this.level = level;
        this.maxX = centerX + radius;
        this.minX = centerX - radius;
        this.maxZ = centerZ + radius;
        this.minZ = centerZ - radius;
        this.distance = distance;
        this.checkVis = checkVis;
        this.checkType = checkType;
        this.checkCategory = checkCategory;
        this.type = type;
    }
    *generator() {
        for (let x = this.maxX; x >= this.minX; x--) {
            const zoneX = x << 3;
            for (let z2 = this.maxZ; z2 >= this.minZ; z2--) {
                const zoneZ = z2 << 3;
                if (this.type === HuntModeType_default.PLAYER) {
                    for (const player of World_default.getZone(zoneX, zoneZ, this.level).getAllPlayersSafe()) {
                        if (World_default.currentTick > this.tick) {
                            throw new Error('[HuntIterator] tried to use an old iterator. Create a new iterator instead.');
                        }
                        if (Position.distanceToSW({x: this.x, z: this.z}, player) > this.distance) {
                            continue;
                        }
                        if (this.checkVis === HuntVis_default.LINEOFSIGHT && !hasLineOfSight(this.level, this.x, this.z, player.x, player.z, 1, 1, 1, 1)) {
                            continue;
                        }
                        if (this.checkVis === HuntVis_default.LINEOFWALK && !hasLineOfWalk(this.level, this.x, this.z, player.x, player.z, 1, 1, 1, 1)) {
                            continue;
                        }
                        yield player;
                    }
                } else if (this.type === HuntModeType_default.NPC) {
                    for (const npc of World_default.getZone(zoneX, zoneZ, this.level).getAllNpcsSafe()) {
                        if (World_default.currentTick > this.tick) {
                            throw new Error('[HuntIterator] tried to use an old iterator. Create a new iterator instead.');
                        }
                        if (this.checkType !== -1 && npc.type !== this.checkType) {
                            continue;
                        }
                        const npcType = NpcType.get(npc.type);
                        if (this.checkCategory !== -1 && npcType.category !== this.checkCategory) {
                            continue;
                        }
                        if (!npcType.op) {
                            continue;
                        }
                        if (!npcType.op[1]) {
                            continue;
                        }
                        if (Position.distanceToSW({x: this.x, z: this.z}, npc) > this.distance) {
                            continue;
                        }
                        if (this.checkVis === HuntVis_default.LINEOFSIGHT && !hasLineOfSight(this.level, this.x, this.z, npc.x, npc.z, 1, 1, 1, 1)) {
                            continue;
                        }
                        if (this.checkVis === HuntVis_default.LINEOFWALK && !hasLineOfWalk(this.level, this.x, this.z, npc.x, npc.z, 1, 1, 1, 1)) {
                            continue;
                        }
                        yield npc;
                    }
                } else if (this.type === HuntModeType_default.OBJ) {
                    for (const obj of World_default.getZone(zoneX, zoneZ, this.level).getAllObjsSafe()) {
                        if (World_default.currentTick > this.tick) {
                            throw new Error('[HuntIterator] tried to use an old iterator. Create a new iterator instead.');
                        }
                        if (this.checkType !== -1 && obj.type !== this.checkType) {
                            continue;
                        }
                        const objType = ObjType.get(obj.type);
                        if (this.checkCategory !== -1 && objType.category !== this.checkCategory) {
                            continue;
                        }
                        if (Position.distanceToSW({x: this.x, z: this.z}, obj) > this.distance) {
                            continue;
                        }
                        if (this.checkVis === HuntVis_default.LINEOFSIGHT && !hasLineOfSight(this.level, this.x, this.z, obj.x, obj.z, 1, 1, 1, 1)) {
                            continue;
                        }
                        if (this.checkVis === HuntVis_default.LINEOFWALK && !hasLineOfWalk(this.level, this.x, this.z, obj.x, obj.z, 1, 1, 1, 1)) {
                            continue;
                        }
                        yield obj;
                    }
                } else if (this.type === HuntModeType_default.SCENERY) {
                    for (const loc of World_default.getZone(zoneX, zoneZ, this.level).getAllLocsSafe()) {
                        if (World_default.currentTick > this.tick) {
                            throw new Error('[HuntIterator] tried to use an old iterator. Create a new iterator instead.');
                        }
                        if (this.checkType !== -1 && loc.type !== this.checkType) {
                            continue;
                        }
                        const locType = LocType.get(loc.type);
                        if (this.checkCategory !== -1 && locType.category !== this.checkCategory) {
                            continue;
                        }
                        if (Position.distanceToSW({x: this.x, z: this.z}, loc) > this.distance) {
                            continue;
                        }
                        if (this.checkVis === HuntVis_default.LINEOFSIGHT && !hasLineOfSight(this.level, this.x, this.z, loc.x, loc.z, 1, 1, 1, 1)) {
                            continue;
                        }
                        if (this.checkVis === HuntVis_default.LINEOFWALK && !hasLineOfWalk(this.level, this.x, this.z, loc.x, loc.z, 1, 1, 1, 1)) {
                            continue;
                        }
                        yield loc;
                    }
                }
            }
        }
    }
}

class NpcIterator extends ScriptIterator {
    level;
    x;
    z;
    minX;
    maxX;
    minZ;
    maxZ;
    distance;
    checkVis;
    type;
    constructor(tick, level, x, z2, distance, checkVis, type) {
        super(tick);
        const centerX = Position.zone(x);
        const centerZ = Position.zone(z2);
        const radius = (1 + distance / 8) | 0;
        this.x = x;
        this.z = z2;
        this.level = level;
        this.maxX = centerX + radius;
        this.minX = centerX - radius;
        this.maxZ = centerZ + radius;
        this.minZ = centerZ - radius;
        this.distance = distance;
        this.checkVis = checkVis;
        this.type = type;
    }
    *generator() {
        if (this.type === NpcIteratorType_default.ZONE) {
            for (const npc of World_default.getZone(this.x, this.z, this.level).getAllNpcsSafe()) {
                if (World_default.currentTick > this.tick) {
                    throw new Error('[NpcIterator] tried to use an old iterator. Create a new iterator instead.');
                }
                yield npc;
            }
        } else if (this.type === NpcIteratorType_default.DISTANCE) {
            for (let x = this.maxX; x >= this.minX; x--) {
                const zoneX = x << 3;
                for (let z2 = this.maxZ; z2 >= this.minZ; z2--) {
                    const zoneZ = z2 << 3;
                    for (const npc of World_default.getZone(zoneX, zoneZ, this.level).getAllNpcsSafe()) {
                        if (World_default.currentTick > this.tick) {
                            throw new Error('[NpcIterator] tried to use an old iterator. Create a new iterator instead.');
                        }
                        if (Position.distanceToSW({x: this.x, z: this.z}, npc) > this.distance) {
                            continue;
                        }
                        if (this.checkVis === HuntVis_default.LINEOFSIGHT && !hasLineOfSight(this.level, this.x, this.z, npc.x, npc.z, 1, 1, 1, 1)) {
                            continue;
                        }
                        if (this.checkVis === HuntVis_default.LINEOFWALK && !hasLineOfWalk(this.level, this.x, this.z, npc.x, npc.z, 1, 1, 1, 1)) {
                            continue;
                        }
                        yield npc;
                    }
                }
            }
        }
    }
}

class LocIterator extends ScriptIterator {
    level;
    x;
    z;
    constructor(tick, level, x, z2) {
        super(tick);
        this.level = level;
        this.x = x;
        this.z = z2;
    }
    *generator() {
        for (const loc of World_default.getZone(this.x, this.z, this.level).getAllLocsSafe()) {
            if (World_default.currentTick > this.tick) {
                throw new Error('[LocIterator] tried to use an old iterator. Create a new iterator instead.');
            }
            yield loc;
        }
    }
}

// src/lostcity/entity/Loc.ts
class Loc extends NonPathingEntity {
    info;
    constructor(level, x, z2, width, length, lifecycle, type, shape, angle) {
        super(level, x, z2, width, length, lifecycle);
        this.info = (type & 16383) | ((shape & 31) << 14) | ((angle & 3) << 19);
    }
    get type() {
        return this.info & 16383;
    }
    get shape() {
        return (this.info >> 14) & 31;
    }
    get angle() {
        return (this.info >> 19) & 3;
    }
}

// src/lostcity/engine/script/handlers/LocOps.ts
var LocOps = {
    [ScriptOpcode_default.LOC_ADD]: state => {
        const [coord, type, angle, shape, duration] = state.popInts(5);
        const position = check(coord, CoordValid);
        const locType = check(type, LocTypeValid);
        const locAngle = check(angle, LocAngleValid);
        const locShape = check(shape, LocShapeValid);
        check(duration, DurationValid);
        const created = new Loc(position.level, position.x, position.z, locType.width, locType.length, EntityLifeCycle_default.DESPAWN, locType.id, locShape, locAngle);
        const locs = World_default.getZone(position.x, position.z, position.level).getLocsUnsafe(Position.packZoneCoord(position.x, position.z));
        for (const loc of locs) {
            if (loc !== created && loc.angle === locAngle && loc.shape === locShape) {
                World_default.removeLoc(loc, duration);
                break;
            }
        }
        World_default.addLoc(created, duration);
        state.activeLoc = created;
        state.pointerAdd(ActiveLoc[state.intOperand]);
    },
    [ScriptOpcode_default.LOC_ANGLE]: checkedHandler(ActiveLoc, state => {
        state.pushInt(check(state.activeLoc.angle, LocAngleValid));
    }),
    [ScriptOpcode_default.LOC_ANIM]: checkedHandler(ActiveLoc, state => {
        const seqType = check(state.popInt(), SeqTypeValid);
        World_default.animLoc(state.activeLoc, seqType.id);
    }),
    [ScriptOpcode_default.LOC_CATEGORY]: checkedHandler(ActiveLoc, state => {
        state.pushInt(check(state.activeLoc.type, LocTypeValid).category);
    }),
    [ScriptOpcode_default.LOC_CHANGE]: checkedHandler(ActiveLoc, state => {
        const [id, duration] = state.popInts(2);
        const locType = check(id, LocTypeValid);
        check(duration, DurationValid);
        World_default.removeLoc(state.activeLoc, duration);
        const {level, x, z: z2, angle, shape} = state.activeLoc;
        const locs = World_default.getZone(x, z2, level).getLocsUnsafe(Position.packZoneCoord(x, z2));
        let found = null;
        for (const loc of locs) {
            if (loc.type === locType.id && loc.angle === angle && loc.shape === shape && loc.lifecycle === EntityLifeCycle_default.RESPAWN) {
                found = loc;
                World_default.addLoc(loc, 0);
                break;
            }
        }
        if (!found) {
            found = new Loc(level, x, z2, locType.width, locType.length, EntityLifeCycle_default.DESPAWN, locType.id, shape, angle);
            World_default.addLoc(found, duration);
        }
        state.activeLoc = found;
        state.pointerAdd(ActiveLoc[state.intOperand]);
    }),
    [ScriptOpcode_default.LOC_COORD]: checkedHandler(ActiveLoc, state => {
        const position = state.activeLoc;
        state.pushInt(Position.packCoord(position.level, position.x, position.z));
    }),
    [ScriptOpcode_default.LOC_DEL]: checkedHandler(ActiveLoc, state => {
        const duration = check(state.popInt(), DurationValid);
        const {level, x, z: z2, angle, shape} = state.activeLoc;
        const locs = World_default.getZone(x, z2, level).getLocsUnsafe(Position.packZoneCoord(x, z2));
        for (const loc of locs) {
            if (loc !== state.activeLoc && loc.angle === angle && loc.shape === shape) {
                World_default.removeLoc(loc, duration);
                break;
            }
        }
        World_default.removeLoc(state.activeLoc, duration);
    }),
    [ScriptOpcode_default.LOC_FIND]: state => {
        const [coord, locId] = state.popInts(2);
        const locType = check(locId, LocTypeValid);
        const position = check(coord, CoordValid);
        const loc = World_default.getLoc(position.x, position.z, position.level, locType.id);
        if (!loc) {
            state.pushInt(0);
            return;
        }
        state.activeLoc = loc;
        state.pointerAdd(ActiveLoc[state.intOperand]);
        state.pushInt(1);
    },
    [ScriptOpcode_default.LOC_FINDALLZONE]: state => {
        const position = check(state.popInt(), CoordValid);
        state.locIterator = new LocIterator(World_default.currentTick, position.level, position.x, position.z);
        if (state._activeLoc) {
            state._activeLoc2 = state._activeLoc;
            state.pointerAdd(ScriptPointer_default.ActiveLoc2);
        }
    },
    [ScriptOpcode_default.LOC_FINDNEXT]: state => {
        const result = state.locIterator?.next();
        if (!result || result.done) {
            state.pushInt(0);
            return;
        }
        state.activeLoc = result.value;
        state.pointerAdd(ActiveLoc[state.intOperand]);
        state.pushInt(1);
    },
    [ScriptOpcode_default.LOC_PARAM]: checkedHandler(ActiveLoc, state => {
        const paramType = check(state.popInt(), ParamTypeValid);
        const locType = check(state.activeLoc.type, LocTypeValid);
        if (paramType.isString()) {
            state.pushString(ParamHelper.getStringParam(paramType.id, locType, paramType.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramType.id, locType, paramType.defaultInt));
        }
    }),
    [ScriptOpcode_default.LOC_TYPE]: checkedHandler(ActiveLoc, state => {
        state.pushInt(check(state.activeLoc.type, LocTypeValid).id);
    }),
    [ScriptOpcode_default.LOC_NAME]: checkedHandler(ActiveLoc, state => {
        state.pushString(check(state.activeLoc.type, LocTypeValid).name ?? 'null');
    }),
    [ScriptOpcode_default.LOC_SHAPE]: checkedHandler(ActiveLoc, state => {
        state.pushInt(check(state.activeLoc.shape, LocShapeValid));
    })
};
var LocOps_default = LocOps;

// src/lostcity/engine/script/handlers/LocConfigOps.ts
var LocConfigOps = {
    [ScriptOpcode_default.LC_NAME]: state => {
        const locType = check(state.popInt(), LocTypeValid);
        state.pushString(locType.name ?? locType.debugname ?? 'null');
    },
    [ScriptOpcode_default.LC_PARAM]: state => {
        const [locId, paramId] = state.popInts(2);
        const locType = check(locId, LocTypeValid);
        const paramType = check(paramId, ParamTypeValid);
        if (paramType.isString()) {
            state.pushString(ParamHelper.getStringParam(paramType.id, locType, paramType.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramType.id, locType, paramType.defaultInt));
        }
    },
    [ScriptOpcode_default.LC_CATEGORY]: state => {
        state.pushInt(check(state.popInt(), LocTypeValid).category);
    },
    [ScriptOpcode_default.LC_DESC]: state => {
        state.pushString(check(state.popInt(), LocTypeValid).desc ?? 'null');
    },
    [ScriptOpcode_default.LC_DEBUGNAME]: state => {
        state.pushString(check(state.popInt(), LocTypeValid).debugname ?? 'null');
    },
    [ScriptOpcode_default.LC_WIDTH]: state => {
        state.pushInt(check(state.popInt(), LocTypeValid).width);
    },
    [ScriptOpcode_default.LC_LENGTH]: state => {
        state.pushInt(check(state.popInt(), LocTypeValid).length);
    }
};
var LocConfigOps_default = LocConfigOps;

// src/lostcity/engine/script/ServerTriggerType.ts
var ServerTriggerType;
(ServerTriggerType2 => {
    ServerTriggerType2[(ServerTriggerType2['PROC'] = 0)] = 'PROC';
    ServerTriggerType2[(ServerTriggerType2['LABEL'] = 1)] = 'LABEL';
    ServerTriggerType2[(ServerTriggerType2['DEBUGPROC'] = 2)] = 'DEBUGPROC';
    ServerTriggerType2[(ServerTriggerType2['APNPC1'] = 3)] = 'APNPC1';
    ServerTriggerType2[(ServerTriggerType2['APNPC2'] = 4)] = 'APNPC2';
    ServerTriggerType2[(ServerTriggerType2['APNPC3'] = 5)] = 'APNPC3';
    ServerTriggerType2[(ServerTriggerType2['APNPC4'] = 6)] = 'APNPC4';
    ServerTriggerType2[(ServerTriggerType2['APNPC5'] = 7)] = 'APNPC5';
    ServerTriggerType2[(ServerTriggerType2['APNPCU'] = 8)] = 'APNPCU';
    ServerTriggerType2[(ServerTriggerType2['APNPCT'] = 9)] = 'APNPCT';
    ServerTriggerType2[(ServerTriggerType2['OPNPC1'] = 10)] = 'OPNPC1';
    ServerTriggerType2[(ServerTriggerType2['OPNPC2'] = 11)] = 'OPNPC2';
    ServerTriggerType2[(ServerTriggerType2['OPNPC3'] = 12)] = 'OPNPC3';
    ServerTriggerType2[(ServerTriggerType2['OPNPC4'] = 13)] = 'OPNPC4';
    ServerTriggerType2[(ServerTriggerType2['OPNPC5'] = 14)] = 'OPNPC5';
    ServerTriggerType2[(ServerTriggerType2['OPNPCU'] = 15)] = 'OPNPCU';
    ServerTriggerType2[(ServerTriggerType2['OPNPCT'] = 16)] = 'OPNPCT';
    ServerTriggerType2[(ServerTriggerType2['AI_APNPC1'] = 17)] = 'AI_APNPC1';
    ServerTriggerType2[(ServerTriggerType2['AI_APNPC2'] = 18)] = 'AI_APNPC2';
    ServerTriggerType2[(ServerTriggerType2['AI_APNPC3'] = 19)] = 'AI_APNPC3';
    ServerTriggerType2[(ServerTriggerType2['AI_APNPC4'] = 20)] = 'AI_APNPC4';
    ServerTriggerType2[(ServerTriggerType2['AI_APNPC5'] = 21)] = 'AI_APNPC5';
    ServerTriggerType2[(ServerTriggerType2['AI_OPNPC1'] = 24)] = 'AI_OPNPC1';
    ServerTriggerType2[(ServerTriggerType2['AI_OPNPC2'] = 25)] = 'AI_OPNPC2';
    ServerTriggerType2[(ServerTriggerType2['AI_OPNPC3'] = 26)] = 'AI_OPNPC3';
    ServerTriggerType2[(ServerTriggerType2['AI_OPNPC4'] = 27)] = 'AI_OPNPC4';
    ServerTriggerType2[(ServerTriggerType2['AI_OPNPC5'] = 28)] = 'AI_OPNPC5';
    ServerTriggerType2[(ServerTriggerType2['APOBJ1'] = 31)] = 'APOBJ1';
    ServerTriggerType2[(ServerTriggerType2['APOBJ2'] = 32)] = 'APOBJ2';
    ServerTriggerType2[(ServerTriggerType2['APOBJ3'] = 33)] = 'APOBJ3';
    ServerTriggerType2[(ServerTriggerType2['APOBJ4'] = 34)] = 'APOBJ4';
    ServerTriggerType2[(ServerTriggerType2['APOBJ5'] = 35)] = 'APOBJ5';
    ServerTriggerType2[(ServerTriggerType2['APOBJU'] = 36)] = 'APOBJU';
    ServerTriggerType2[(ServerTriggerType2['APOBJT'] = 37)] = 'APOBJT';
    ServerTriggerType2[(ServerTriggerType2['OPOBJ1'] = 38)] = 'OPOBJ1';
    ServerTriggerType2[(ServerTriggerType2['OPOBJ2'] = 39)] = 'OPOBJ2';
    ServerTriggerType2[(ServerTriggerType2['OPOBJ3'] = 40)] = 'OPOBJ3';
    ServerTriggerType2[(ServerTriggerType2['OPOBJ4'] = 41)] = 'OPOBJ4';
    ServerTriggerType2[(ServerTriggerType2['OPOBJ5'] = 42)] = 'OPOBJ5';
    ServerTriggerType2[(ServerTriggerType2['OPOBJU'] = 43)] = 'OPOBJU';
    ServerTriggerType2[(ServerTriggerType2['OPOBJT'] = 44)] = 'OPOBJT';
    ServerTriggerType2[(ServerTriggerType2['AI_APOBJ1'] = 45)] = 'AI_APOBJ1';
    ServerTriggerType2[(ServerTriggerType2['AI_APOBJ2'] = 46)] = 'AI_APOBJ2';
    ServerTriggerType2[(ServerTriggerType2['AI_APOBJ3'] = 47)] = 'AI_APOBJ3';
    ServerTriggerType2[(ServerTriggerType2['AI_APOBJ4'] = 48)] = 'AI_APOBJ4';
    ServerTriggerType2[(ServerTriggerType2['AI_APOBJ5'] = 49)] = 'AI_APOBJ5';
    ServerTriggerType2[(ServerTriggerType2['AI_OPOBJ1'] = 52)] = 'AI_OPOBJ1';
    ServerTriggerType2[(ServerTriggerType2['AI_OPOBJ2'] = 53)] = 'AI_OPOBJ2';
    ServerTriggerType2[(ServerTriggerType2['AI_OPOBJ3'] = 54)] = 'AI_OPOBJ3';
    ServerTriggerType2[(ServerTriggerType2['AI_OPOBJ4'] = 55)] = 'AI_OPOBJ4';
    ServerTriggerType2[(ServerTriggerType2['AI_OPOBJ5'] = 56)] = 'AI_OPOBJ5';
    ServerTriggerType2[(ServerTriggerType2['APLOC1'] = 59)] = 'APLOC1';
    ServerTriggerType2[(ServerTriggerType2['APLOC2'] = 60)] = 'APLOC2';
    ServerTriggerType2[(ServerTriggerType2['APLOC3'] = 61)] = 'APLOC3';
    ServerTriggerType2[(ServerTriggerType2['APLOC4'] = 62)] = 'APLOC4';
    ServerTriggerType2[(ServerTriggerType2['APLOC5'] = 63)] = 'APLOC5';
    ServerTriggerType2[(ServerTriggerType2['APLOCU'] = 64)] = 'APLOCU';
    ServerTriggerType2[(ServerTriggerType2['APLOCT'] = 65)] = 'APLOCT';
    ServerTriggerType2[(ServerTriggerType2['OPLOC1'] = 66)] = 'OPLOC1';
    ServerTriggerType2[(ServerTriggerType2['OPLOC2'] = 67)] = 'OPLOC2';
    ServerTriggerType2[(ServerTriggerType2['OPLOC3'] = 68)] = 'OPLOC3';
    ServerTriggerType2[(ServerTriggerType2['OPLOC4'] = 69)] = 'OPLOC4';
    ServerTriggerType2[(ServerTriggerType2['OPLOC5'] = 70)] = 'OPLOC5';
    ServerTriggerType2[(ServerTriggerType2['OPLOCU'] = 71)] = 'OPLOCU';
    ServerTriggerType2[(ServerTriggerType2['OPLOCT'] = 72)] = 'OPLOCT';
    ServerTriggerType2[(ServerTriggerType2['AI_APLOC1'] = 73)] = 'AI_APLOC1';
    ServerTriggerType2[(ServerTriggerType2['AI_APLOC2'] = 74)] = 'AI_APLOC2';
    ServerTriggerType2[(ServerTriggerType2['AI_APLOC3'] = 75)] = 'AI_APLOC3';
    ServerTriggerType2[(ServerTriggerType2['AI_APLOC4'] = 76)] = 'AI_APLOC4';
    ServerTriggerType2[(ServerTriggerType2['AI_APLOC5'] = 77)] = 'AI_APLOC5';
    ServerTriggerType2[(ServerTriggerType2['AI_OPLOC1'] = 80)] = 'AI_OPLOC1';
    ServerTriggerType2[(ServerTriggerType2['AI_OPLOC2'] = 81)] = 'AI_OPLOC2';
    ServerTriggerType2[(ServerTriggerType2['AI_OPLOC3'] = 82)] = 'AI_OPLOC3';
    ServerTriggerType2[(ServerTriggerType2['AI_OPLOC4'] = 83)] = 'AI_OPLOC4';
    ServerTriggerType2[(ServerTriggerType2['AI_OPLOC5'] = 84)] = 'AI_OPLOC5';
    ServerTriggerType2[(ServerTriggerType2['APPLAYER1'] = 87)] = 'APPLAYER1';
    ServerTriggerType2[(ServerTriggerType2['APPLAYER2'] = 88)] = 'APPLAYER2';
    ServerTriggerType2[(ServerTriggerType2['APPLAYER3'] = 89)] = 'APPLAYER3';
    ServerTriggerType2[(ServerTriggerType2['APPLAYER4'] = 90)] = 'APPLAYER4';
    ServerTriggerType2[(ServerTriggerType2['APPLAYER5'] = 91)] = 'APPLAYER5';
    ServerTriggerType2[(ServerTriggerType2['APPLAYERU'] = 92)] = 'APPLAYERU';
    ServerTriggerType2[(ServerTriggerType2['APPLAYERT'] = 93)] = 'APPLAYERT';
    ServerTriggerType2[(ServerTriggerType2['OPPLAYER1'] = 94)] = 'OPPLAYER1';
    ServerTriggerType2[(ServerTriggerType2['OPPLAYER2'] = 95)] = 'OPPLAYER2';
    ServerTriggerType2[(ServerTriggerType2['OPPLAYER3'] = 96)] = 'OPPLAYER3';
    ServerTriggerType2[(ServerTriggerType2['OPPLAYER4'] = 97)] = 'OPPLAYER4';
    ServerTriggerType2[(ServerTriggerType2['OPPLAYER5'] = 98)] = 'OPPLAYER5';
    ServerTriggerType2[(ServerTriggerType2['OPPLAYERU'] = 99)] = 'OPPLAYERU';
    ServerTriggerType2[(ServerTriggerType2['OPPLAYERT'] = 100)] = 'OPPLAYERT';
    ServerTriggerType2[(ServerTriggerType2['AI_APPLAYER1'] = 101)] = 'AI_APPLAYER1';
    ServerTriggerType2[(ServerTriggerType2['AI_APPLAYER2'] = 102)] = 'AI_APPLAYER2';
    ServerTriggerType2[(ServerTriggerType2['AI_APPLAYER3'] = 103)] = 'AI_APPLAYER3';
    ServerTriggerType2[(ServerTriggerType2['AI_APPLAYER4'] = 104)] = 'AI_APPLAYER4';
    ServerTriggerType2[(ServerTriggerType2['AI_APPLAYER5'] = 105)] = 'AI_APPLAYER5';
    ServerTriggerType2[(ServerTriggerType2['AI_OPPLAYER1'] = 108)] = 'AI_OPPLAYER1';
    ServerTriggerType2[(ServerTriggerType2['AI_OPPLAYER2'] = 109)] = 'AI_OPPLAYER2';
    ServerTriggerType2[(ServerTriggerType2['AI_OPPLAYER3'] = 110)] = 'AI_OPPLAYER3';
    ServerTriggerType2[(ServerTriggerType2['AI_OPPLAYER4'] = 111)] = 'AI_OPPLAYER4';
    ServerTriggerType2[(ServerTriggerType2['AI_OPPLAYER5'] = 112)] = 'AI_OPPLAYER5';
    ServerTriggerType2[(ServerTriggerType2['QUEUE'] = 116)] = 'QUEUE';
    ServerTriggerType2[(ServerTriggerType2['AI_QUEUE1'] = 117)] = 'AI_QUEUE1';
    ServerTriggerType2[(ServerTriggerType2['AI_QUEUE2'] = 118)] = 'AI_QUEUE2';
    ServerTriggerType2[(ServerTriggerType2['AI_QUEUE3'] = 119)] = 'AI_QUEUE3';
    ServerTriggerType2[(ServerTriggerType2['AI_QUEUE4'] = 120)] = 'AI_QUEUE4';
    ServerTriggerType2[(ServerTriggerType2['AI_QUEUE5'] = 121)] = 'AI_QUEUE5';
    ServerTriggerType2[(ServerTriggerType2['AI_QUEUE6'] = 122)] = 'AI_QUEUE6';
    ServerTriggerType2[(ServerTriggerType2['AI_QUEUE7'] = 123)] = 'AI_QUEUE7';
    ServerTriggerType2[(ServerTriggerType2['AI_QUEUE8'] = 124)] = 'AI_QUEUE8';
    ServerTriggerType2[(ServerTriggerType2['AI_QUEUE9'] = 125)] = 'AI_QUEUE9';
    ServerTriggerType2[(ServerTriggerType2['AI_QUEUE10'] = 126)] = 'AI_QUEUE10';
    ServerTriggerType2[(ServerTriggerType2['AI_QUEUE11'] = 127)] = 'AI_QUEUE11';
    ServerTriggerType2[(ServerTriggerType2['AI_QUEUE12'] = 128)] = 'AI_QUEUE12';
    ServerTriggerType2[(ServerTriggerType2['AI_QUEUE13'] = 129)] = 'AI_QUEUE13';
    ServerTriggerType2[(ServerTriggerType2['AI_QUEUE14'] = 130)] = 'AI_QUEUE14';
    ServerTriggerType2[(ServerTriggerType2['AI_QUEUE15'] = 131)] = 'AI_QUEUE15';
    ServerTriggerType2[(ServerTriggerType2['AI_QUEUE16'] = 132)] = 'AI_QUEUE16';
    ServerTriggerType2[(ServerTriggerType2['AI_QUEUE17'] = 133)] = 'AI_QUEUE17';
    ServerTriggerType2[(ServerTriggerType2['AI_QUEUE18'] = 134)] = 'AI_QUEUE18';
    ServerTriggerType2[(ServerTriggerType2['AI_QUEUE19'] = 135)] = 'AI_QUEUE19';
    ServerTriggerType2[(ServerTriggerType2['AI_QUEUE20'] = 136)] = 'AI_QUEUE20';
    ServerTriggerType2[(ServerTriggerType2['SOFTTIMER'] = 137)] = 'SOFTTIMER';
    ServerTriggerType2[(ServerTriggerType2['TIMER'] = 138)] = 'TIMER';
    ServerTriggerType2[(ServerTriggerType2['AI_TIMER'] = 139)] = 'AI_TIMER';
    ServerTriggerType2[(ServerTriggerType2['OPHELD1'] = 140)] = 'OPHELD1';
    ServerTriggerType2[(ServerTriggerType2['OPHELD2'] = 141)] = 'OPHELD2';
    ServerTriggerType2[(ServerTriggerType2['OPHELD3'] = 142)] = 'OPHELD3';
    ServerTriggerType2[(ServerTriggerType2['OPHELD4'] = 143)] = 'OPHELD4';
    ServerTriggerType2[(ServerTriggerType2['OPHELD5'] = 144)] = 'OPHELD5';
    ServerTriggerType2[(ServerTriggerType2['OPHELDU'] = 145)] = 'OPHELDU';
    ServerTriggerType2[(ServerTriggerType2['OPHELDT'] = 146)] = 'OPHELDT';
    ServerTriggerType2[(ServerTriggerType2['IF_BUTTON'] = 147)] = 'IF_BUTTON';
    ServerTriggerType2[(ServerTriggerType2['INV_BUTTON1'] = 148)] = 'INV_BUTTON1';
    ServerTriggerType2[(ServerTriggerType2['INV_BUTTON2'] = 149)] = 'INV_BUTTON2';
    ServerTriggerType2[(ServerTriggerType2['INV_BUTTON3'] = 150)] = 'INV_BUTTON3';
    ServerTriggerType2[(ServerTriggerType2['INV_BUTTON4'] = 151)] = 'INV_BUTTON4';
    ServerTriggerType2[(ServerTriggerType2['INV_BUTTON5'] = 152)] = 'INV_BUTTON5';
    ServerTriggerType2[(ServerTriggerType2['INV_BUTTOND'] = 153)] = 'INV_BUTTOND';
    ServerTriggerType2[(ServerTriggerType2['IF_CLOSE'] = 154)] = 'IF_CLOSE';
    ServerTriggerType2[(ServerTriggerType2['LOGIN'] = 155)] = 'LOGIN';
    ServerTriggerType2[(ServerTriggerType2['LOGOUT'] = 156)] = 'LOGOUT';
    ServerTriggerType2[(ServerTriggerType2['TUTORIAL_CLICKSIDE'] = 157)] = 'TUTORIAL_CLICKSIDE';
    ServerTriggerType2[(ServerTriggerType2['MOVE'] = 158)] = 'MOVE';
    ServerTriggerType2[(ServerTriggerType2['WALKTRIGGER'] = 159)] = 'WALKTRIGGER';
    ServerTriggerType2[(ServerTriggerType2['AI_WALKTRIGGER'] = 160)] = 'AI_WALKTRIGGER';
    ServerTriggerType2[(ServerTriggerType2['LEVELUP'] = 161)] = 'LEVELUP';
})((ServerTriggerType ||= {}));
(ServerTriggerType => {
    function toString(trigger) {
        return ServerTriggerType[trigger].toLowerCase();
    }
    ServerTriggerType.toString = toString;
})((ServerTriggerType ||= {}));
var ServerTriggerType_default = ServerTriggerType;

// src/lostcity/entity/Interaction.ts
var Interaction;
(Interaction2 => {
    Interaction2[(Interaction2['SCRIPT'] = 0)] = 'SCRIPT';
    Interaction2[(Interaction2['ENGINE'] = 1)] = 'ENGINE';
})((Interaction ||= {}));
var Interaction_default = Interaction;

// src/lostcity/engine/script/handlers/NpcOps.ts
var NpcOps = {
    [ScriptOpcode_default.NPC_FINDUID]: state => {
        const npcUid = state.popInt();
        const slot = npcUid & 65535;
        const expectedType = (npcUid >> 16) & 65535;
        const npc = World_default.getNpc(slot);
        if (!npc || npc.type !== expectedType) {
            state.pushInt(0);
            return;
        }
        state.activeNpc = npc;
        state.pointerAdd(ActiveNpc[state.intOperand]);
        state.pushInt(1);
    },
    [ScriptOpcode_default.NPC_ADD]: state => {
        const [coord, id, duration] = state.popInts(3);
        const position = check(coord, CoordValid);
        const npcType = check(id, NpcTypeValid);
        check(duration, DurationValid);
        const npc = new Npc2(position.level, position.x, position.z, npcType.size, npcType.size, EntityLifeCycle_default.DESPAWN, World_default.getNextNid(), npcType.id, npcType.moverestrict, npcType.blockwalk);
        World_default.addNpc(npc, duration);
        state.activeNpc = npc;
        state.pointerAdd(ActiveNpc[state.intOperand]);
    },
    [ScriptOpcode_default.NPC_ANIM]: checkedHandler(ActiveNpc, state => {
        const delay = check(state.popInt(), NumberNotNull);
        const seq = state.popInt();
        state.activeNpc.playAnimation(seq, delay);
    }),
    [ScriptOpcode_default.NPC_BASESTAT]: checkedHandler(ActiveNpc, state => {
        const stat = check(state.popInt(), NpcStatValid);
        state.pushInt(state.activeNpc.baseLevels[stat]);
    }),
    [ScriptOpcode_default.NPC_CATEGORY]: checkedHandler(ActiveNpc, state => {
        state.pushInt(check(state.activeNpc.type, NpcTypeValid).category);
    }),
    [ScriptOpcode_default.NPC_COORD]: checkedHandler(ActiveNpc, state => {
        const position = state.activeNpc;
        state.pushInt(Position.packCoord(position.level, position.x, position.z));
    }),
    [ScriptOpcode_default.NPC_DEL]: checkedHandler(ActiveNpc, state => {
        if (Environment_default.CLIRUNNER) {
            return;
        }
        World_default.removeNpc(state.activeNpc, check(state.activeNpc.type, NpcTypeValid).respawnrate);
    }),
    [ScriptOpcode_default.NPC_DELAY]: checkedHandler(ActiveNpc, state => {
        if (Environment_default.CLIRUNNER) {
            return;
        }
        state.activeNpc.delay = state.popInt() + 1;
        state.execution = ScriptState.NPC_SUSPENDED;
    }),
    [ScriptOpcode_default.NPC_FACESQUARE]: checkedHandler(ActiveNpc, state => {
        const position = check(state.popInt(), CoordValid);
        state.activeNpc.faceSquare(position.x, position.z);
    }),
    [ScriptOpcode_default.NPC_FINDEXACT]: state => {
        const [coord, id] = state.popInts(2);
        const position = check(coord, CoordValid);
        const npcType = check(id, NpcTypeValid);
        state.npcIterator = new NpcIterator(World_default.currentTick, position.level, position.x, position.z, 0, 0, NpcIteratorType_default.ZONE);
        for (const npc of state.npcIterator) {
            if (npc.type === npcType.id && npc.x === position.x && npc.level === position.level && npc.z === position.z) {
                state.activeNpc = npc;
                state.pointerAdd(ActiveNpc[state.intOperand]);
                state.pushInt(1);
                return;
            }
        }
        state.pushInt(0);
        return;
    },
    [ScriptOpcode_default.NPC_FINDHERO]: checkedHandler(ActiveNpc, state => {
        const uid = state.activeNpc.findHero();
        if (uid === -1) {
            state.pushInt(0);
            return;
        }
        const player = World_default.getPlayerByUid(uid);
        if (!player) {
            state.pushInt(0);
            return;
        }
        state.activePlayer = player;
        state.pointerAdd(ScriptPointer_default.ActivePlayer);
        state.pushInt(1);
    }),
    [ScriptOpcode_default.NPC_PARAM]: checkedHandler(ActiveNpc, state => {
        const paramType = check(state.popInt(), ParamTypeValid);
        const npcType = check(state.activeNpc.type, NpcTypeValid);
        if (paramType.isString()) {
            state.pushString(ParamHelper.getStringParam(paramType.id, npcType, paramType.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramType.id, npcType, paramType.defaultInt));
        }
    }),
    [ScriptOpcode_default.NPC_QUEUE]: checkedHandler(ActiveNpc, state => {
        const delay = check(state.popInt(), NumberNotNull);
        const arg = state.popInt();
        const queueId = check(state.popInt(), QueueValid);
        const npcType = check(state.activeNpc.type, NpcTypeValid);
        const script = ScriptProvider.getByTrigger(ServerTriggerType_default.AI_QUEUE1 + queueId - 1, npcType.id, npcType.category);
        if (script) {
            state.activeNpc.enqueueScript(script, delay, arg);
        }
    }),
    [ScriptOpcode_default.NPC_RANGE]: checkedHandler(ActiveNpc, state => {
        const position = check(state.popInt(), CoordValid);
        const npc = state.activeNpc;
        if (position.level !== npc.level) {
            state.pushInt(-1);
        } else {
            state.pushInt(
                Position.distanceTo(npc, {
                    x: position.x,
                    z: position.z,
                    width: 1,
                    length: 1
                })
            );
        }
    }),
    [ScriptOpcode_default.NPC_SAY]: checkedHandler(ActiveNpc, state => {
        state.activeNpc.say(state.popString());
    }),
    [ScriptOpcode_default.NPC_SETHUNT]: checkedHandler(ActiveNpc, state => {
        state.activeNpc.huntrange = check(state.popInt(), NumberNotNull);
    }),
    [ScriptOpcode_default.NPC_SETHUNTMODE]: checkedHandler(ActiveNpc, state => {
        state.activeNpc.huntMode = check(state.popInt(), HuntTypeValid).id;
    }),
    [ScriptOpcode_default.NPC_SETMODE]: checkedHandler(ActiveNpc, state => {
        const mode = check(state.popInt(), NpcModeValid);
        state.activeNpc.clearWaypoints();
        if (mode === NpcMode_default.NULL || mode === NpcMode_default.NONE || mode === NpcMode_default.WANDER || mode === NpcMode_default.PATROL) {
            state.activeNpc.clearInteraction();
            state.activeNpc.targetOp = mode;
            return;
        }
        state.activeNpc.targetOp = mode;
        let target;
        if (mode >= NpcMode_default.OPNPC1) {
            target = state._activeNpc2;
        } else if (mode >= NpcMode_default.OPOBJ1) {
            target = state._activeObj;
        } else if (mode >= NpcMode_default.OPLOC1) {
            target = state._activeLoc;
        } else {
            target = state._activePlayer;
        }
        if (target) {
            if (target instanceof Npc2 || target instanceof Obj || target instanceof Loc) {
                state.activeNpc.setInteraction(Interaction_default.SCRIPT, target, mode, {type: target.type, com: -1});
            } else {
                state.activeNpc.setInteraction(Interaction_default.SCRIPT, target, mode);
            }
        } else {
            state.activeNpc.noMode();
        }
    }),
    [ScriptOpcode_default.NPC_STAT]: checkedHandler(ActiveNpc, state => {
        const stat = check(state.popInt(), NpcStatValid);
        state.pushInt(state.activeNpc.levels[stat]);
    }),
    [ScriptOpcode_default.NPC_STATHEAL]: checkedHandler(ActiveNpc, state => {
        const [stat, constant, percent] = state.popInts(3);
        check(stat, NpcStatValid);
        check(constant, NumberNotNull);
        check(percent, NumberNotNull);
        const npc = state.activeNpc;
        const base = npc.baseLevels[stat];
        const current = npc.levels[stat];
        const healed = current + (constant + (current * percent) / 100);
        npc.levels[stat] = Math.min(healed, base);
        if (stat === 0 && npc.levels[stat] === npc.baseLevels[stat]) {
            npc.resetHeroPoints();
        }
    }),
    [ScriptOpcode_default.NPC_TYPE]: checkedHandler(ActiveNpc, state => {
        state.pushInt(check(state.activeNpc.type, NpcTypeValid).id);
    }),
    [ScriptOpcode_default.NPC_DAMAGE]: checkedHandler(ActiveNpc, state => {
        const amount = check(state.popInt(), NumberNotNull);
        const type = check(state.popInt(), HitTypeValid);
        state.activeNpc.applyDamage(amount, type);
    }),
    [ScriptOpcode_default.NPC_NAME]: checkedHandler(ActiveNpc, state => {
        state.pushString(check(state.activeNpc.type, NpcTypeValid).name ?? 'null');
    }),
    [ScriptOpcode_default.NPC_UID]: checkedHandler(ActiveNpc, state => {
        state.pushInt(state.activeNpc.uid);
    }),
    [ScriptOpcode_default.NPC_SETTIMER]: checkedHandler(ActiveNpc, state => {
        state.activeNpc.setTimer(check(state.popInt(), NumberNotNull));
    }),
    [ScriptOpcode_default.SPOTANIM_NPC]: checkedHandler(ActiveNpc, state => {
        const delay = check(state.popInt(), NumberNotNull);
        const height = check(state.popInt(), NumberNotNull);
        const spotanimType = check(state.popInt(), SpotAnimTypeValid);
        state.activeNpc.spotanim(spotanimType.id, height, delay);
    }),
    [ScriptOpcode_default.NPC_FIND]: state => {
        const [coord, npc, distance, checkVis] = state.popInts(4);
        const position = check(coord, CoordValid);
        const npcType = check(npc, NpcTypeValid);
        check(distance, NumberNotNull);
        const huntvis = check(checkVis, HuntVisValid);
        let closestNpc;
        let closestDistance = distance;
        const npcs = new NpcIterator(World_default.currentTick, position.level, position.x, position.z, distance, huntvis, NpcIteratorType_default.DISTANCE);
        for (const npc2 of npcs) {
            if (npc2 && npc2.type === npcType.id) {
                const npcDistance = Position.distanceToSW(position, npc2);
                if (npcDistance <= closestDistance) {
                    closestNpc = npc2;
                    closestDistance = npcDistance;
                }
            }
        }
        if (!closestNpc) {
            state.pushInt(0);
            return;
        }
        state.activeNpc = closestNpc;
        state.pointerAdd(ActiveNpc[state.intOperand]);
        state.pushInt(1);
    },
    [ScriptOpcode_default.NPC_FINDALLANY]: state => {
        const [coord, distance, checkVis] = state.popInts(3);
        const position = check(coord, CoordValid);
        check(distance, NumberNotNull);
        const huntvis = check(checkVis, HuntVisValid);
        state.npcIterator = new NpcIterator(World_default.currentTick, position.level, position.x, position.z, distance, huntvis, NpcIteratorType_default.DISTANCE);
        if (state._activeNpc) {
            state._activeNpc2 = state._activeNpc;
            state.pointerAdd(ScriptPointer_default.ActiveNpc2);
        }
    },
    [ScriptOpcode_default.NPC_FINDALLZONE]: state => {
        const position = check(state.popInt(), CoordValid);
        state.npcIterator = new NpcIterator(World_default.currentTick, position.level, position.x, position.z, 0, 0, NpcIteratorType_default.ZONE);
        if (state._activeNpc) {
            state._activeNpc2 = state._activeNpc;
            state.pointerAdd(ScriptPointer_default.ActiveNpc2);
        }
    },
    [ScriptOpcode_default.NPC_FINDNEXT]: state => {
        const result = state.npcIterator?.next();
        if (!result || result.done) {
            state.pushInt(0);
            return;
        }
        state.activeNpc = result.value;
        state.pointerAdd(ActiveNpc[state.intOperand]);
        state.pushInt(1);
    },
    [ScriptOpcode_default.NPC_TELE]: checkedHandler(ActiveNpc, state => {
        const position = check(state.popInt(), CoordValid);
        state.activeNpc.teleport(position.x, position.z, position.level);
    }),
    [ScriptOpcode_default.NPC_WALK]: checkedHandler(ActiveNpc, state => {
        const position = check(state.popInt(), CoordValid);
        state.activeNpc.queueWaypoint(position.x, position.z);
    }),
    [ScriptOpcode_default.NPC_CHANGETYPE]: checkedHandler(ActiveNpc, state => {
        state.activeNpc.changeType(check(state.popInt(), NpcTypeValid).id);
    }),
    [ScriptOpcode_default.NPC_GETMODE]: checkedHandler(ActiveNpc, state => {
        state.pushInt(state.activeNpc.targetOp);
    }),
    [ScriptOpcode_default.NPC_HEROPOINTS]: checkedHandler([ScriptPointer_default.ActivePlayer, ...ActiveNpc], state => {
        state.activeNpc.addHero(state.activePlayer.uid, check(state.popInt(), NumberNotNull));
    }),
    [ScriptOpcode_default.NPC_WALKTRIGGER]: checkedHandler(ActiveNpc, state => {
        const [queueId, arg] = state.popInts(2);
        check(queueId, QueueValid);
        state.activeNpc.walktrigger = queueId - 1;
        state.activeNpc.walktriggerArg = arg;
    }),
    [ScriptOpcode_default.NPC_STATADD]: checkedHandler(ActiveNpc, state => {
        const [stat, constant, percent] = state.popInts(3);
        check(stat, NpcStatValid);
        check(constant, NumberNotNull);
        check(percent, NumberNotNull);
        const npc = state.activeNpc;
        const current = npc.levels[stat];
        const added = current + (constant + (current * percent) / 100);
        npc.levels[stat] = Math.min(added, 255);
        if (stat === 0 && npc.levels[stat] >= npc.baseLevels[stat]) {
            npc.resetHeroPoints();
        }
    }),
    [ScriptOpcode_default.NPC_STATSUB]: checkedHandler(ActiveNpc, state => {
        const [stat, constant, percent] = state.popInts(3);
        check(stat, NpcStatValid);
        check(constant, NumberNotNull);
        check(percent, NumberNotNull);
        const npc = state.activeNpc;
        const current = npc.levels[stat];
        const subbed = current - (constant + (current * percent) / 100);
        npc.levels[stat] = Math.max(subbed, 0);
    }),
    [ScriptOpcode_default.NPC_ATTACKRANGE]: checkedHandler(ActiveNpc, state => {
        state.pushInt(check(state.activeNpc.type, NpcTypeValid).attackrange);
    })
};
var NpcOps_default = NpcOps;

// src/lostcity/engine/script/handlers/NpcConfigOps.ts
var NpcConfigOps = {
    [ScriptOpcode_default.NC_NAME]: state => {
        const npcType = check(state.popInt(), NpcTypeValid);
        state.pushString(npcType.name ?? npcType.debugname ?? 'null');
    },
    [ScriptOpcode_default.NC_PARAM]: state => {
        const [npcId, paramId] = state.popInts(2);
        const npcType = check(npcId, NpcTypeValid);
        const paramType = check(paramId, ParamTypeValid);
        if (paramType.isString()) {
            state.pushString(ParamHelper.getStringParam(paramId, npcType, paramType.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramId, npcType, paramType.defaultInt));
        }
    },
    [ScriptOpcode_default.NC_CATEGORY]: state => {
        state.pushInt(check(state.popInt(), NpcTypeValid).category);
    },
    [ScriptOpcode_default.NC_DESC]: state => {
        state.pushString(check(state.popInt(), NpcTypeValid).desc ?? 'null');
    },
    [ScriptOpcode_default.NC_DEBUGNAME]: state => {
        state.pushString(check(state.popInt(), NpcTypeValid).debugname ?? 'null');
    },
    [ScriptOpcode_default.NC_OP]: state => {
        const [npcId, op] = state.popInts(2);
        const npcType = check(npcId, NpcTypeValid);
        check(op, NumberNotNull);
        if (!npcType.op) {
            state.pushString('');
            return;
        }
        state.pushString(npcType.op[op - 1] ?? '');
    }
};
var NpcConfigOps_default = NpcConfigOps;

// src/jagex2/Trig.ts
class Trig {
    static _sin = new Int32Array(16384);
    static _cos = new Int32Array(16384);
    static {
        const size = 0.0003834951969714103;
        for (let index = 0; index < 16384; index++) {
            this._sin[index] = (Math.sin(index * size) * 16384) | 0;
            this._cos[index] = (Math.cos(index * size) * 16384) | 0;
        }
    }
    static radians(x) {
        return ((x & 16383) / 16384) * 6.283185307179586;
    }
    static atan2(y2, x) {
        return (Math.round(Math.atan2(y2, x) * 2607.5945876176133) & 16383) | 0;
    }
    static sin(x) {
        return this._sin[x & 16383];
    }
    static cos(x) {
        return this._cos[x & 16383];
    }
}

// src/lostcity/engine/script/handlers/NumberOps.ts
var NumberOps = {
    [ScriptOpcode_default.ADD]: state => {
        const b2 = state.popInt();
        const a = state.popInt();
        state.pushInt(a + b2);
    },
    [ScriptOpcode_default.SUB]: state => {
        const b2 = state.popInt();
        const a = state.popInt();
        state.pushInt(a - b2);
    },
    [ScriptOpcode_default.MULTIPLY]: state => {
        const b2 = state.popInt();
        const a = state.popInt();
        state.pushInt(a * b2);
    },
    [ScriptOpcode_default.DIVIDE]: state => {
        const b2 = state.popInt();
        const a = state.popInt();
        state.pushInt(a / b2);
    },
    [ScriptOpcode_default.RANDOM]: state => {
        const a = state.popInt();
        state.pushInt(Math.random() * a);
    },
    [ScriptOpcode_default.RANDOMINC]: state => {
        const a = state.popInt();
        state.pushInt(Math.random() * (a + 1));
    },
    [ScriptOpcode_default.INTERPOLATE]: state => {
        const [y0, y1, x0, x1, x] = state.popInts(5);
        const lerp = Math.floor((y1 - y0) / (x1 - x0)) * (x - x0) + y0;
        state.pushInt(lerp);
    },
    [ScriptOpcode_default.ADDPERCENT]: state => {
        const [num, percent] = state.popInts(2);
        state.pushInt(((num * percent) / 100 + num) | 0);
    },
    [ScriptOpcode_default.SETBIT]: state => {
        const [value, bit] = state.popInts(2);
        state.pushInt(value | (1 << bit));
    },
    [ScriptOpcode_default.CLEARBIT]: state => {
        const [value, bit] = state.popInts(2);
        state.pushInt(value & ~(1 << bit));
    },
    [ScriptOpcode_default.TESTBIT]: state => {
        const [value, bit] = state.popInts(2);
        state.pushInt(value & (1 << bit) ? 1 : 0);
    },
    [ScriptOpcode_default.MODULO]: state => {
        const [n1, n2] = state.popInts(2);
        state.pushInt(n1 % n2);
    },
    [ScriptOpcode_default.POW]: state => {
        const [base, exponent] = state.popInts(2);
        state.pushInt(Math.pow(base, exponent));
    },
    [ScriptOpcode_default.INVPOW]: state => {
        const [n1, n2] = state.popInts(2);
        if (n1 === 0 || n2 === 0) {
            state.pushInt(0);
        } else {
            switch (n2) {
                case 1:
                    state.pushInt(n1);
                    return;
                case 2:
                    state.pushInt(Math.sqrt(n1));
                    return;
                case 3:
                    state.pushInt(Math.cbrt(n1));
                    return;
                case 4:
                    state.pushInt(Math.sqrt(Math.sqrt(n1)));
                    return;
                default:
                    state.pushInt(Math.pow(n1, 1 / n2));
                    return;
            }
        }
    },
    [ScriptOpcode_default.AND]: state => {
        const [n1, n2] = state.popInts(2);
        state.pushInt(n1 & n2);
    },
    [ScriptOpcode_default.OR]: state => {
        const [n1, n2] = state.popInts(2);
        state.pushInt(n1 | n2);
    },
    [ScriptOpcode_default.MIN]: state => {
        const [a, b2] = state.popInts(2);
        state.pushInt(Math.min(a, b2));
    },
    [ScriptOpcode_default.MAX]: state => {
        const [a, b2] = state.popInts(2);
        state.pushInt(Math.max(a, b2));
    },
    [ScriptOpcode_default.SCALE]: state => {
        const [a, b2, c] = state.popInts(3);
        state.pushInt((a * c) / b2);
    },
    [ScriptOpcode_default.BITCOUNT]: state => {
        state.pushInt(bitcount(state.popInt()));
    },
    [ScriptOpcode_default.TOGGLEBIT]: state => {
        const [value, bit] = state.popInts(2);
        state.pushInt(value ^ (1 << bit));
    },
    [ScriptOpcode_default.SETBIT_RANGE]: state => {
        const [num, startBit, endBit] = state.popInts(3);
        state.pushInt(setBitRange(num, startBit, endBit));
    },
    [ScriptOpcode_default.CLEARBIT_RANGE]: state => {
        const [num, startBit, endBit] = state.popInts(3);
        state.pushInt(clearBitRange(num, startBit, endBit));
    },
    [ScriptOpcode_default.GETBIT_RANGE]: state => {
        const [num, startBit, endBit] = state.popInts(3);
        const a = 31 - endBit;
        state.pushInt((num << a) >>> (startBit + a));
    },
    [ScriptOpcode_default.SETBIT_RANGE_TOINT]: state => {
        const [num, value, startBit, endBit] = state.popInts(4);
        const clearedBitRange = clearBitRange(num, startBit, endBit);
        const maxValue = MASK[endBit - startBit + 1];
        let assignValue = value;
        if (value > maxValue) {
            assignValue = maxValue;
        }
        state.pushInt(clearedBitRange | (assignValue << startBit));
    },
    [ScriptOpcode_default.SIN_DEG]: state => {
        state.pushInt(Trig.sin(state.popInt()));
    },
    [ScriptOpcode_default.COS_DEG]: state => {
        state.pushInt(Trig.cos(state.popInt()));
    },
    [ScriptOpcode_default.ATAN2_DEG]: state => {
        state.pushInt(Trig.atan2(state.popInt(), state.popInt()));
    },
    [ScriptOpcode_default.ABS]: state => {
        state.pushInt(Math.abs(state.popInt()));
    }
};
var NumberOps_default = NumberOps;

// src/lostcity/engine/script/handlers/ObjOps.ts
var ObjOps = {
    [ScriptOpcode_default.OBJ_ADD]: state => {
        const [coord, objId, count, duration] = state.popInts(4);
        if (objId === -1 || count === -1) {
            return;
        }
        const objType = check(objId, ObjTypeValid);
        check(duration, DurationValid);
        const position = check(coord, CoordValid);
        check(count, ObjStackValid);
        if (objType.dummyitem !== 0) {
            throw new Error(`attempted to add dummy item: ${objType.debugname}`);
        }
        const obj = new Obj(position.level, position.x, position.z, EntityLifeCycle_default.DESPAWN, objId, count);
        World_default.addObj(obj, state.activePlayer.pid, duration);
        state.activeObj = obj;
        state.pointerAdd(ActiveObj[state.intOperand]);
        if (Environment_default.CLIRUNNER) {
            state.activePlayer.invAdd(InvType.getByName('bank').id, objId, count);
        }
    },
    [ScriptOpcode_default.OBJ_ADDALL]: state => {
        const [coord, objId, count, duration] = state.popInts(4);
        if (objId === -1 || count === -1) {
            return;
        }
        const objType = check(objId, ObjTypeValid);
        check(duration, DurationValid);
        const position = check(coord, CoordValid);
        check(count, ObjStackValid);
        if (objType.dummyitem !== 0) {
            throw new Error(`attempted to add dummy item: ${objType.debugname}`);
        }
        const obj = new Obj(position.level, position.x, position.z, EntityLifeCycle_default.DESPAWN, objId, count);
        World_default.addObj(obj, -1, duration);
        state.activeObj = obj;
        state.pointerAdd(ActiveObj[state.intOperand]);
    },
    [ScriptOpcode_default.OBJ_PARAM]: state => {
        const paramType = check(state.popInt(), ParamTypeValid);
        const objType = check(state.activeObj.type, ObjTypeValid);
        if (paramType.isString()) {
            state.pushString(ParamHelper.getStringParam(paramType.id, objType, paramType.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramType.id, objType, paramType.defaultInt));
        }
    },
    [ScriptOpcode_default.OBJ_NAME]: state => {
        const objType = check(state.activeObj.type, ObjTypeValid);
        state.pushString(objType.name ?? objType.debugname ?? 'null');
    },
    [ScriptOpcode_default.OBJ_DEL]: state => {
        const duration = ObjType.get(state.activeObj.type).respawnrate;
        if (state.pointerGet(ActivePlayer[state.intOperand])) {
            World_default.removeObj(state.activeObj, duration);
        } else {
            World_default.removeObj(state.activeObj, duration);
        }
    },
    [ScriptOpcode_default.OBJ_COUNT]: state => {
        state.pushInt(check(state.activeObj.count, ObjStackValid));
    },
    [ScriptOpcode_default.OBJ_TYPE]: state => {
        state.pushInt(check(state.activeObj.type, ObjTypeValid).id);
    },
    [ScriptOpcode_default.OBJ_TAKEITEM]: state => {
        const invType = check(state.popInt(), InvTypeValid);
        const obj = state.activeObj;
        const objType = ObjType.get(obj.type);
        const zone = World_default.getZone(obj.x, obj.z, obj.level);
        for (const o of zone.getObjsSafe(Position.packZoneCoord(obj.x, obj.z))) {
            if (o.type !== obj.type || o.count !== obj.count) {
                continue;
            }
            if (o.receiverId !== -1 && o.receiverId !== state.activePlayer.pid) {
                continue;
            }
            state.activePlayer.playerLog('Picked up item', objType.debugname);
            state.activePlayer.invAdd(invType.id, obj.type, obj.count);
            if (obj.lifecycle === EntityLifeCycle_default.RESPAWN) {
                World_default.removeObj(obj, objType.respawnrate);
                break;
            } else if (obj.lifecycle === EntityLifeCycle_default.DESPAWN) {
                World_default.removeObj(obj, 0);
                break;
            }
        }
    },
    [ScriptOpcode_default.OBJ_COORD]: state => {
        const position = state.activeObj;
        state.pushInt(Position.packCoord(position.level, position.x, position.z));
    }
};
var ObjOps_default = ObjOps;

// src/lostcity/engine/script/handlers/ObjConfigOps.ts
var ObjConfigOps = {
    [ScriptOpcode_default.OC_NAME]: state => {
        const objType = check(state.popInt(), ObjTypeValid);
        state.pushString(objType.name ?? objType.debugname ?? 'null');
    },
    [ScriptOpcode_default.OC_PARAM]: state => {
        const [objId, paramId] = state.popInts(2);
        const objType = check(objId, ObjTypeValid);
        const paramType = check(paramId, ParamTypeValid);
        if (paramType.isString()) {
            state.pushString(ParamHelper.getStringParam(paramType.id, objType, paramType.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramType.id, objType, paramType.defaultInt));
        }
    },
    [ScriptOpcode_default.OC_CATEGORY]: state => {
        state.pushInt(check(state.popInt(), ObjTypeValid).category);
    },
    [ScriptOpcode_default.OC_DESC]: state => {
        state.pushString(check(state.popInt(), ObjTypeValid).desc ?? 'null');
    },
    [ScriptOpcode_default.OC_MEMBERS]: state => {
        state.pushInt(check(state.popInt(), ObjTypeValid).members ? 1 : 0);
    },
    [ScriptOpcode_default.OC_WEIGHT]: state => {
        state.pushInt(check(state.popInt(), ObjTypeValid).weight);
    },
    [ScriptOpcode_default.OC_WEARPOS]: state => {
        state.pushInt(check(state.popInt(), ObjTypeValid).wearpos);
    },
    [ScriptOpcode_default.OC_WEARPOS2]: state => {
        state.pushInt(check(state.popInt(), ObjTypeValid).wearpos2);
    },
    [ScriptOpcode_default.OC_WEARPOS3]: state => {
        state.pushInt(check(state.popInt(), ObjTypeValid).wearpos3);
    },
    [ScriptOpcode_default.OC_COST]: state => {
        state.pushInt(check(state.popInt(), ObjTypeValid).cost);
    },
    [ScriptOpcode_default.OC_TRADEABLE]: state => {
        state.pushInt(check(state.popInt(), ObjTypeValid).tradeable ? 1 : 0);
    },
    [ScriptOpcode_default.OC_DEBUGNAME]: state => {
        state.pushString(check(state.popInt(), ObjTypeValid).debugname ?? 'null');
    },
    [ScriptOpcode_default.OC_CERT]: state => {
        const objType = check(state.popInt(), ObjTypeValid);
        if (objType.certtemplate == -1 && objType.certlink >= 0) {
            state.pushInt(objType.certlink);
        } else {
            state.pushInt(objType.id);
        }
    },
    [ScriptOpcode_default.OC_UNCERT]: state => {
        const objType = check(state.popInt(), ObjTypeValid);
        if (objType.certtemplate >= 0 && objType.certlink >= 0) {
            state.pushInt(objType.certlink);
        } else {
            state.pushInt(objType.id);
        }
    },
    [ScriptOpcode_default.OC_STACKABLE]: state => {
        state.pushInt(check(state.popInt(), ObjTypeValid).stackable ? 1 : 0);
    }
};
var ObjConfigOps_default = ObjConfigOps;

// src/lostcity/entity/EntityQueueRequest.ts
class EntityQueueRequest extends Linkable {
    type;
    script;
    args;
    delay;
    lastInt = 0;
    constructor(type, script, args, delay) {
        super();
        this.type = type;
        this.script = script;
        this.args = args;
        this.delay = delay;
    }
}

class EntityQueueState extends Linkable {
    script;
    delay;
    constructor(script, delay) {
        super();
        this.script = script;
        this.delay = delay;
    }
}

// src/lostcity/network/225/outgoing/prot/ServerProt.ts
class ServerProt {
    id;
    length;
    static all = [];
    static byId = [];
    static IF_OPENCHATMODAL = new ServerProt(14, 2);
    static IF_OPENMAINSIDEMODAL = new ServerProt(28, 4);
    static IF_CLOSE = new ServerProt(129, 0);
    static IF_OPENSIDEOVERLAY = new ServerProt(167, 3);
    static IF_OPENMAINMODAL = new ServerProt(168, 2);
    static IF_OPENSIDEMODAL = new ServerProt(195, 2);
    static IF_SETCOLOUR = new ServerProt(2, 4);
    static IF_SETHIDE = new ServerProt(26, 3);
    static IF_SETOBJECT = new ServerProt(46, 6);
    static IF_SHOWSIDE = new ServerProt(84, 1);
    static IF_SETMODEL = new ServerProt(87, 4);
    static IF_SETRECOL = new ServerProt(103, 6);
    static IF_SETANIM = new ServerProt(146, 4);
    static IF_SETPLAYERHEAD = new ServerProt(197, 2);
    static IF_SETTEXT = new ServerProt(201, -2);
    static IF_SETNPCHEAD = new ServerProt(204, 4);
    static IF_SETPOSITION = new ServerProt(209, 6);
    static TUTORIAL_FLASHSIDE = new ServerProt(126, 1);
    static TUTORIAL_OPENCHAT = new ServerProt(185, 2);
    static UPDATE_INV_STOP_TRANSMIT = new ServerProt(15, 2);
    static UPDATE_INV_FULL = new ServerProt(98, -2);
    static UPDATE_INV_PARTIAL = new ServerProt(213, -2);
    static CAM_LOOKAT = new ServerProt(74, 6);
    static CAM_SHAKE = new ServerProt(13, 4);
    static CAM_MOVETO = new ServerProt(3, 6);
    static CAM_RESET = new ServerProt(239, 0);
    static NPC_INFO = new ServerProt(1, -2);
    static PLAYER_INFO = new ServerProt(184, -2);
    static FINISH_TRACKING = new ServerProt(133, 0);
    static ENABLE_TRACKING = new ServerProt(226, 0);
    static MESSAGE_GAME = new ServerProt(4, -1);
    static UPDATE_IGNORELIST = new ServerProt(21, -2);
    static CHAT_FILTER_SETTINGS = new ServerProt(32, 3);
    static MESSAGE_PRIVATE = new ServerProt(41, -1);
    static UPDATE_FRIENDLIST = new ServerProt(152, 9);
    static UNSET_MAP_FLAG = new ServerProt(19, 0);
    static UPDATE_RUNWEIGHT = new ServerProt(22, 2);
    static HINT_ARROW = new ServerProt(25, 6);
    static UPDATE_REBOOT_TIMER = new ServerProt(43, 2);
    static UPDATE_STAT = new ServerProt(44, 6);
    static UPDATE_RUNENERGY = new ServerProt(68, 1);
    static RESET_ANIMS = new ServerProt(136, 0);
    static UPDATE_UID192 = new ServerProt(139, 2);
    static LAST_LOGIN_INFO = new ServerProt(140, 9);
    static LOGOUT = new ServerProt(142, 0);
    static P_COUNTDIALOG = new ServerProt(243, 0);
    static SET_MULTIWAY = new ServerProt(254, 1);
    static DATA_LOC_DONE = new ServerProt(20, 2);
    static DATA_LAND_DONE = new ServerProt(80, 2);
    static DATA_LAND = new ServerProt(132, -2);
    static DATA_LOC = new ServerProt(220, -2);
    static REBUILD_NORMAL = new ServerProt(237, -2);
    static VARP_SMALL = new ServerProt(150, 3);
    static VARP_LARGE = new ServerProt(175, 6);
    static RESET_CLIENT_VARCACHE = new ServerProt(193, 0);
    static SYNTH_SOUND = new ServerProt(12, 5);
    static MIDI_SONG = new ServerProt(54, -1);
    static MIDI_JINGLE = new ServerProt(212, -2);
    static UPDATE_ZONE_PARTIAL_FOLLOWS = new ServerProt(7, 2);
    static UPDATE_ZONE_FULL_FOLLOWS = new ServerProt(135, 2);
    static UPDATE_ZONE_PARTIAL_ENCLOSED = new ServerProt(162, -2);
    constructor(id, length) {
        this.id = id;
        this.length = length;
        ServerProt.all.push(this);
        ServerProt.byId[id] = this;
    }
}

// src/lostcity/entity/MoveSpeed.ts
var MoveSpeed;
(MoveSpeed2 => {
    MoveSpeed2[(MoveSpeed2['STATIONARY'] = 0)] = 'STATIONARY';
    MoveSpeed2[(MoveSpeed2['CRAWL'] = 1)] = 'CRAWL';
    MoveSpeed2[(MoveSpeed2['WALK'] = 2)] = 'WALK';
    MoveSpeed2[(MoveSpeed2['RUN'] = 3)] = 'RUN';
    MoveSpeed2[(MoveSpeed2['INSTANT'] = 4)] = 'INSTANT';
})((MoveSpeed ||= {}));
var MoveSpeed_default = MoveSpeed;

// src/lostcity/entity/MoveStrategy.ts
var MoveStrategy;
(MoveStrategy2 => {
    MoveStrategy2[(MoveStrategy2['SMART'] = 0)] = 'SMART';
    MoveStrategy2[(MoveStrategy2['NAIVE'] = 1)] = 'NAIVE';
    MoveStrategy2[(MoveStrategy2['FLY'] = 2)] = 'FLY';
})((MoveStrategy ||= {}));
var MoveStrategy_default = MoveStrategy;

// src/lostcity/entity/PathingEntity.ts
class PathingEntity extends Entity {
    moveRestrict;
    blockWalk;
    moveStrategy;
    coordmask;
    entitymask;
    moveSpeed = MoveSpeed_default.INSTANT;
    walkDir = -1;
    runDir = -1;
    waypointIndex = -1;
    waypoints = new Int32Array(25);
    lastX = -1;
    lastZ = -1;
    tele = false;
    jump = false;
    lastStepX = -1;
    lastStepZ = -1;
    stepsTaken = 0;
    lastInt = -1;
    lastCrawl = false;
    walktrigger = -1;
    walktriggerArg = 0;
    orientation = Direction.SOUTH;
    interacted = false;
    repathed = false;
    target = null;
    targetOp = -1;
    targetSubject = {type: -1, com: -1};
    targetX = -1;
    targetZ = -1;
    apRange = 10;
    apRangeCalled = false;
    alreadyFacedCoord = false;
    alreadyFacedEntity = false;
    mask = 0;
    exactStartX = -1;
    exactStartZ = -1;
    exactEndX = -1;
    exactEndZ = -1;
    exactMoveStart = -1;
    exactMoveEnd = -1;
    exactMoveDirection = -1;
    faceX = -1;
    faceZ = -1;
    faceEntity = -1;
    damageTaken = -1;
    damageType = -1;
    animId = -1;
    animDelay = -1;
    chat = null;
    graphicId = -1;
    graphicHeight = -1;
    graphicDelay = -1;
    constructor(level, x, z2, width, length, lifecycle, moveRestrict, blockWalk, moveStrategy, coordmask, entitymask) {
        super(level, x, z2, width, length, lifecycle);
        this.moveRestrict = moveRestrict;
        this.blockWalk = blockWalk;
        this.moveStrategy = moveStrategy;
        this.coordmask = coordmask;
        this.entitymask = entitymask;
        this.lastStepX = x - 1;
        this.lastStepZ = z2;
    }
    processMovement() {
        if (!this.hasWaypoints() || this.moveSpeed === MoveSpeed_default.STATIONARY || this.moveSpeed === MoveSpeed_default.INSTANT) {
            return false;
        }
        if (this.moveSpeed === MoveSpeed_default.CRAWL) {
            this.lastCrawl = !this.lastCrawl;
            if (this.lastCrawl && this.walkDir === -1) {
                this.walkDir = this.validateAndAdvanceStep();
            }
            return true;
        }
        if (this.walkDir === -1) {
            this.walkDir = this.validateAndAdvanceStep();
            if (this.moveSpeed === MoveSpeed_default.RUN && this.walkDir !== -1 && this.runDir === -1) {
                this.runDir = this.validateAndAdvanceStep();
            }
        }
        return true;
    }
    refreshZonePresence(previousX, previousZ, previousLevel) {
        if (this.x != previousX || this.z !== previousZ || this.level !== previousLevel) {
            switch (this.blockWalk) {
                case BlockWalk_default.NPC:
                    World_default.gameMap.changeNpcCollision(this.width, previousX, previousZ, previousLevel, false);
                    World_default.gameMap.changeNpcCollision(this.width, this.x, this.z, this.level, true);
                    break;
                case BlockWalk_default.ALL:
                    World_default.gameMap.changeNpcCollision(this.width, previousX, previousZ, previousLevel, false);
                    World_default.gameMap.changeNpcCollision(this.width, this.x, this.z, this.level, true);
                    World_default.gameMap.changePlayerCollision(this.width, previousX, previousZ, previousLevel, false);
                    World_default.gameMap.changePlayerCollision(this.width, this.x, this.z, this.level, true);
                    break;
            }
            this.lastStepX = previousX;
            this.lastStepZ = previousZ;
        }
        if (Position.zone(previousX) !== Position.zone(this.x) || Position.zone(previousZ) !== Position.zone(this.z) || previousLevel != this.level) {
            World_default.getZone(previousX, previousZ, previousLevel).leave(this);
            World_default.getZone(this.x, this.z, this.level).enter(this);
        }
    }
    validateAndAdvanceStep() {
        const dir = this.takeStep();
        if (dir === null) {
            return -1;
        }
        if (dir === -1) {
            this.waypointIndex--;
            if (this.waypointIndex != -1) {
                return this.validateAndAdvanceStep();
            }
            return -1;
        }
        const previousX = this.x;
        const previousZ = this.z;
        this.x = Position.moveX(this.x, dir);
        this.z = Position.moveZ(this.z, dir);
        this.orientation = dir;
        this.stepsTaken++;
        this.refreshZonePresence(previousX, previousZ, this.level);
        return dir;
    }
    queueWaypoint(x, z2) {
        this.waypoints[0] = Position.packCoord(0, x, z2);
        this.waypointIndex = 0;
    }
    queueWaypoints(waypoints) {
        let index = -1;
        for (let input = waypoints.length - 1, output = 0; input >= 0 && output < this.waypoints.length; input--, output++) {
            this.waypoints[output] = waypoints[input];
            index++;
        }
        this.waypointIndex = index;
    }
    clearWaypoints() {
        this.waypointIndex = -1;
    }
    teleJump(x, z2, level) {
        this.teleport(x, z2, level);
        this.jump = true;
    }
    teleport(x, z2, level) {
        if (isNaN(level)) {
            level = 0;
        }
        level = Math.max(0, Math.min(level, 3));
        const previousX = this.x;
        const previousZ = this.z;
        const previousLevel = this.level;
        this.x = x;
        this.z = z2;
        this.level = level;
        this.refreshZonePresence(previousX, previousZ, previousLevel);
        this.lastStepX = this.x - 1;
        this.lastStepZ = this.z;
        this.moveSpeed = MoveSpeed_default.INSTANT;
        if (previousLevel != level) {
            this.jump = true;
        }
    }
    validateDistanceWalked() {
        const distanceCheck =
            Position.distanceTo(this, {
                x: this.lastX,
                z: this.lastZ,
                width: this.width,
                length: this.length
            }) > 2;
        if (distanceCheck) {
            this.jump = true;
        }
    }
    convertMovementDir() {
        let walkDir = this.walkDir;
        let runDir = this.runDir;
        let tele = this.moveSpeed === MoveSpeed_default.INSTANT;
        const distanceMoved = Position.distanceTo(this, {
            x: this.lastX,
            z: this.lastZ,
            width: this.width,
            length: this.length
        });
        if (tele && !this.jump && distanceMoved <= 2) {
            if (distanceMoved === 2) {
                const firstX = ((this.x + this.lastX) / 2) | 0;
                const firstZ = ((this.z + this.lastZ) / 2) | 0;
                walkDir = Position.face(this.lastX, this.lastZ, firstX, firstZ);
                runDir = Position.face(firstX, firstZ, this.x, this.z);
            } else {
                walkDir = Position.face(this.lastX, this.lastZ, this.x, this.z);
                runDir = -1;
            }
            tele = false;
        }
        this.walkDir = walkDir;
        this.runDir = runDir;
        this.tele = tele;
    }
    hasWaypoints() {
        return this.waypointIndex !== -1;
    }
    isLastOrNoWaypoint() {
        return this.waypointIndex <= 0;
    }
    inOperableDistance(target) {
        if (target.level !== this.level) {
            return false;
        }
        if (target instanceof PathingEntity) {
            return reached(this.level, this.x, this.z, target.x, target.z, target.width, target.length, this.width, target.orientation, -2);
        } else if (target instanceof Loc) {
            const forceapproach = LocType.get(target.type).forceapproach;
            return reached(this.level, this.x, this.z, target.x, target.z, target.width, target.length, this.width, target.angle, target.shape, forceapproach);
        }
        const reachedAdjacent = reached(this.level, this.x, this.z, target.x, target.z, target.width, target.length, this.width, 0, -2);
        if (isFlagged(target.x, target.z, target.level, CollisionFlag.WALK_BLOCKED)) {
            return reachedAdjacent;
        }
        if (!this.hasWaypoints() && reachedAdjacent) {
            return true;
        }
        return reached(this.level, this.x, this.z, target.x, target.z, target.width, target.length, this.width, 0, -1);
    }
    inApproachDistance(range, target) {
        if (target.level !== this.level) {
            return false;
        }
        if (target instanceof PathingEntity && Position.intersects(this.x, this.z, this.width, this.length, target.x, target.z, target.width, target.length)) {
            return false;
        }
        return Position.distanceTo(this, target) <= range && hasLineOfSight(this.level, this.x, this.z, target.x, target.z, this.width, this.length, target.width, target.length, CollisionFlag.PLAYER);
    }
    pathToMoveClick(input, needsfinding) {
        if (this.moveStrategy === MoveStrategy_default.SMART) {
            if (needsfinding) {
                const {x, z: z2} = Position.unpackCoord(input[0]);
                this.queueWaypoints(findPath(this.level, this.x, this.z, x, z2));
            } else {
                this.queueWaypoints(input);
            }
        } else {
            const {x, z: z2} = Position.unpackCoord(input[input.length - 1]);
            this.queueWaypoint(x, z2);
        }
    }
    pathToPathingTarget() {
        if (!this.target || !(this.target instanceof PathingEntity)) {
            return;
        }
        if (!this.isLastOrNoWaypoint()) {
            return;
        }
        if (this.targetOp === ServerTriggerType_default.APPLAYER3 || this.targetOp === ServerTriggerType_default.OPPLAYER3) {
            this.queueWaypoint(this.target.lastStepX, this.target.lastStepZ);
            return;
        }
        this.pathToTarget();
    }
    pathToTarget() {
        if (!this.target) {
            return;
        }
        this.targetX = this.target.x;
        this.targetZ = this.target.z;
        if (this.moveStrategy === MoveStrategy_default.SMART) {
            if (this.target instanceof PathingEntity) {
                this.queueWaypoints(findPath(this.level, this.x, this.z, this.target.x, this.target.z, this.width, this.target.width, this.target.length, this.target.orientation, -2));
            } else if (this.target instanceof Loc) {
                const forceapproach = LocType.get(this.target.type).forceapproach;
                this.queueWaypoints(findPath(this.level, this.x, this.z, this.target.x, this.target.z, this.width, this.target.width, this.target.length, this.target.angle, this.target.shape, true, forceapproach));
            } else {
                this.queueWaypoints(findPath(this.level, this.x, this.z, this.target.x, this.target.z));
            }
        } else if (this.moveStrategy === MoveStrategy_default.NAIVE) {
            const collisionStrategy = this.getCollisionStrategy();
            if (collisionStrategy === null) {
                return;
            }
            const extraFlag = this.blockWalkFlag();
            if (extraFlag === CollisionFlag.NULL) {
                return;
            }
            if (this.target instanceof PathingEntity) {
                this.queueWaypoints(findNaivePath(this.level, this.x, this.z, this.target.x, this.target.z, this.width, this.length, this.target.width, this.target.length, extraFlag, collisionStrategy));
            } else {
                this.queueWaypoint(this.target.x, this.target.z);
            }
        } else {
            const collisionStrategy = this.getCollisionStrategy();
            if (collisionStrategy === null) {
                return;
            }
            const extraFlag = this.blockWalkFlag();
            if (extraFlag === CollisionFlag.NULL) {
                return;
            }
            this.queueWaypoint(this.target.x, this.target.z);
        }
    }
    setInteraction(interaction, target, op, subject) {
        this.target = target;
        this.targetOp = op;
        this.targetSubject = subject ?? {type: -1, com: -1};
        this.targetX = target.x;
        this.targetZ = target.z;
        this.apRange = 10;
        this.apRangeCalled = false;
        if (target instanceof Player2) {
            const pid = target.pid + 32768;
            if (this.faceEntity !== pid) {
                this.faceEntity = pid;
                this.mask |= this.entitymask;
            }
        } else if (target instanceof Npc2) {
            const nid = target.nid;
            if (this.faceEntity !== nid) {
                this.faceEntity = nid;
                this.mask |= this.entitymask;
            }
        } else {
            const faceX = target.x * 2 + target.width;
            const faceZ = target.z * 2 + target.length;
            if (this.faceX !== faceX || this.faceZ !== faceZ) {
                this.faceX = faceX;
                this.faceZ = faceZ;
                this.mask |= this.coordmask;
            }
        }
        if (interaction === Interaction_default.SCRIPT) {
            this.pathToTarget();
        }
    }
    clearInteraction() {
        this.target = null;
        this.targetOp = -1;
        this.targetSubject = {type: -1, com: -1};
        this.targetX = -1;
        this.targetZ = -1;
        this.apRange = 10;
        this.apRangeCalled = false;
        this.alreadyFacedCoord = true;
        this.alreadyFacedEntity = true;
    }
    getCollisionStrategy() {
        if (this.moveRestrict === MoveRestrict_default.NORMAL) {
            return CollisionType.NORMAL;
        } else if (this.moveRestrict === MoveRestrict_default.BLOCKED) {
            return CollisionType.BLOCKED;
        } else if (this.moveRestrict === MoveRestrict_default.BLOCKED_NORMAL) {
            return CollisionType.LINE_OF_SIGHT;
        } else if (this.moveRestrict === MoveRestrict_default.INDOORS) {
            return CollisionType.INDOORS;
        } else if (this.moveRestrict === MoveRestrict_default.OUTDOORS) {
            return CollisionType.OUTDOORS;
        } else if (this.moveRestrict === MoveRestrict_default.NOMOVE) {
            return null;
        } else if (this.moveRestrict === MoveRestrict_default.PASSTHRU) {
            return CollisionType.NORMAL;
        }
        return null;
    }
    resetPathingEntity() {
        this.moveSpeed = this.defaultMoveSpeed();
        this.walkDir = -1;
        this.runDir = -1;
        this.jump = false;
        this.tele = false;
        this.lastX = this.x;
        this.lastZ = this.z;
        this.stepsTaken = 0;
        this.interacted = false;
        this.apRangeCalled = false;
        this.mask = 0;
        this.exactStartX = -1;
        this.exactStartZ = -1;
        this.exactEndX = -1;
        this.exactEndZ = -1;
        this.exactMoveStart = -1;
        this.exactMoveEnd = -1;
        this.exactMoveDirection = -1;
        this.animId = -1;
        this.animDelay = -1;
        this.animId = -1;
        this.animDelay = -1;
        this.chat = null;
        this.damageTaken = -1;
        this.damageType = -1;
        this.graphicId = -1;
        this.graphicHeight = -1;
        this.graphicDelay = -1;
        if (this.faceX !== -1) {
            this.orientation = Position.face(this.x, this.z, this.faceX, this.faceZ);
        } else if (this.target) {
            this.orientation = Position.face(this.x, this.z, this.target.x, this.target.z);
        }
        if (this.alreadyFacedCoord && this.faceX !== -1 && !this.hasWaypoints()) {
            this.faceX = -1;
            this.faceZ = -1;
            this.alreadyFacedCoord = false;
        } else if (this.alreadyFacedEntity && !this.target && this.faceEntity !== -1) {
            this.mask |= this.entitymask;
            this.faceEntity = -1;
            this.alreadyFacedEntity = false;
        }
    }
    takeStep() {
        if (this.waypointIndex === -1) {
            return null;
        }
        const srcX = this.x;
        const srcZ = this.z;
        const {x, z: z2} = Position.unpackCoord(this.waypoints[this.waypointIndex]);
        const dir = Position.face(srcX, srcZ, x, z2);
        const dx = Position.deltaX(dir);
        const dz = Position.deltaZ(dir);
        if (dx == 0 && dz == 0) {
            return -1;
        }
        const collisionStrategy = this.getCollisionStrategy();
        if (collisionStrategy === null) {
            return -1;
        }
        const extraFlag = this.blockWalkFlag();
        if (extraFlag === CollisionFlag.NULL) {
            return -1;
        }
        if (this.moveStrategy === MoveStrategy_default.FLY) {
            return dir;
        }
        if (canTravel(this.level, this.x, this.z, dx, dz, this.width, extraFlag, collisionStrategy)) {
            return dir;
        }
        if (dx != 0 && canTravel(this.level, this.x, this.z, dx, 0, this.width, extraFlag, collisionStrategy)) {
            return Position.face(srcX, srcZ, x, srcZ);
        }
        if (dz != 0 && canTravel(this.level, this.x, this.z, 0, dz, this.width, extraFlag, collisionStrategy)) {
            return Position.face(srcX, srcZ, srcX, z2);
        }
        return null;
    }
}

// src/jagex2/datastruct/Stack.ts
class Stack {
    sentinel;
    cursor = null;
    constructor() {
        const head = new Hashable();
        head.nextHashable = head;
        head.prevHashable = head;
        this.sentinel = head;
    }
    push(node) {
        if (node.prevHashable) {
            node.uncache();
        }
        node.prevHashable = this.sentinel.prevHashable;
        node.nextHashable = this.sentinel;
        if (node.prevHashable) {
            node.prevHashable.nextHashable = node;
        }
        node.nextHashable.prevHashable = node;
    }
    pop() {
        const node = this.sentinel.nextHashable;
        if (node === this.sentinel) {
            return null;
        }
        node?.uncache();
        return node;
    }
    head() {
        const node = this.sentinel.nextHashable;
        if (node === this.sentinel) {
            this.cursor = null;
            return null;
        }
        this.cursor = node?.nextHashable || null;
        return node;
    }
    next() {
        const node = this.cursor;
        if (node === this.sentinel) {
            this.cursor = null;
            return null;
        }
        this.cursor = node?.nextHashable || null;
        return node;
    }
}

// src/lostcity/server/PreloadedPacks.ts
async function preloadClient() {
    const allMaps = [
        'l29_75',
        'l30_75',
        'l31_75',
        'l32_70',
        'l32_71',
        'l32_72',
        'l32_73',
        'l32_74',
        'l32_75',
        'l33_70',
        'l33_71',
        'l33_72',
        'l33_73',
        'l33_74',
        'l33_75',
        'l33_76',
        'l34_70',
        'l34_71',
        'l34_72',
        'l34_73',
        'l34_74',
        'l34_75',
        'l34_76',
        'l35_20',
        'l35_75',
        'l35_76',
        'l36_146',
        'l36_147',
        'l36_148',
        'l36_149',
        'l36_150',
        'l36_153',
        'l36_154',
        'l36_52',
        'l36_53',
        'l36_54',
        'l36_72',
        'l36_73',
        'l36_74',
        'l36_75',
        'l36_76',
        'l37_146',
        'l37_147',
        'l37_148',
        'l37_149',
        'l37_150',
        'l37_151',
        'l37_152',
        'l37_153',
        'l37_154',
        'l37_48',
        'l37_49',
        'l37_50',
        'l37_51',
        'l37_52',
        'l37_53',
        'l37_54',
        'l37_55',
        'l37_72',
        'l37_73',
        'l37_74',
        'l37_75',
        'l38_146',
        'l38_147',
        'l38_148',
        'l38_149',
        'l38_150',
        'l38_151',
        'l38_152',
        'l38_153',
        'l38_154',
        'l38_155',
        'l38_45',
        'l38_46',
        'l38_47',
        'l38_48',
        'l38_49',
        'l38_50',
        'l38_51',
        'l38_52',
        'l38_53',
        'l38_54',
        'l38_55',
        'l38_72',
        'l38_73',
        'l38_74',
        'l39_147',
        'l39_148',
        'l39_149',
        'l39_150',
        'l39_151',
        'l39_152',
        'l39_153',
        'l39_154',
        'l39_155',
        'l39_45',
        'l39_46',
        'l39_47',
        'l39_48',
        'l39_49',
        'l39_50',
        'l39_51',
        'l39_52',
        'l39_53',
        'l39_54',
        'l39_55',
        'l39_72',
        'l39_73',
        'l39_74',
        'l39_75',
        'l39_76',
        'l40_147',
        'l40_148',
        'l40_149',
        'l40_150',
        'l40_151',
        'l40_152',
        'l40_153',
        'l40_154',
        'l40_45',
        'l40_46',
        'l40_47',
        'l40_48',
        'l40_49',
        'l40_50',
        'l40_51',
        'l40_52',
        'l40_53',
        'l40_54',
        'l40_55',
        'l40_72',
        'l40_73',
        'l40_74',
        'l40_75',
        'l40_76',
        'l41_146',
        'l41_149',
        'l41_151',
        'l41_152',
        'l41_153',
        'l41_154',
        'l41_45',
        'l41_46',
        'l41_47',
        'l41_48',
        'l41_49',
        'l41_50',
        'l41_51',
        'l41_52',
        'l41_53',
        'l41_54',
        'l41_55',
        'l41_56',
        'l41_72',
        'l41_73',
        'l41_74',
        'l41_75',
        'l42_144',
        'l42_145',
        'l42_146',
        'l42_151',
        'l42_152',
        'l42_153',
        'l42_49',
        'l42_50',
        'l42_51',
        'l42_52',
        'l42_53',
        'l42_54',
        'l42_55',
        'l42_56',
        'l42_72',
        'l42_73',
        'l42_74',
        'l42_75',
        'l43_144',
        'l43_145',
        'l43_146',
        'l43_153',
        'l43_154',
        'l43_45',
        'l43_46',
        'l43_47',
        'l43_48',
        'l43_49',
        'l43_50',
        'l43_51',
        'l43_52',
        'l43_53',
        'l43_54',
        'l43_55',
        'l43_56',
        'l43_72',
        'l43_73',
        'l43_74',
        'l43_75',
        'l44_144',
        'l44_145',
        'l44_146',
        'l44_148',
        'l44_149',
        'l44_150',
        'l44_151',
        'l44_152',
        'l44_153',
        'l44_154',
        'l44_155',
        'l44_45',
        'l44_46',
        'l44_47',
        'l44_48',
        'l44_49',
        'l44_50',
        'l44_51',
        'l44_52',
        'l44_53',
        'l44_54',
        'l44_55',
        'l44_72',
        'l44_73',
        'l44_74',
        'l44_75',
        'l45_145',
        'l45_146',
        'l45_148',
        'l45_150',
        'l45_151',
        'l45_152',
        'l45_153',
        'l45_154',
        'l45_155',
        'l45_45',
        'l45_46',
        'l45_47',
        'l45_48',
        'l45_49',
        'l45_50',
        'l45_51',
        'l45_52',
        'l45_53',
        'l45_54',
        'l45_55',
        'l45_56',
        'l45_57',
        'l45_58',
        'l45_59',
        'l45_60',
        'l45_61',
        'l45_62',
        'l45_73',
        'l45_74',
        'l45_75',
        'l45_76',
        'l46_149',
        'l46_150',
        'l46_152',
        'l46_153',
        'l46_154',
        'l46_161',
        'l46_45',
        'l46_46',
        'l46_47',
        'l46_48',
        'l46_49',
        'l46_50',
        'l46_51',
        'l46_52',
        'l46_53',
        'l46_54',
        'l46_55',
        'l46_56',
        'l46_57',
        'l46_58',
        'l46_59',
        'l46_60',
        'l46_61',
        'l46_62',
        'l46_75',
        'l47_148',
        'l47_149',
        'l47_150',
        'l47_152',
        'l47_153',
        'l47_160',
        'l47_161',
        'l47_47',
        'l47_48',
        'l47_49',
        'l47_50',
        'l47_51',
        'l47_52',
        'l47_53',
        'l47_54',
        'l47_55',
        'l47_56',
        'l47_57',
        'l47_58',
        'l47_59',
        'l47_60',
        'l47_61',
        'l47_62',
        'l47_75',
        'l48_148',
        'l48_149',
        'l48_152',
        'l48_153',
        'l48_154',
        'l48_155',
        'l48_156',
        'l48_47',
        'l48_48',
        'l48_49',
        'l48_50',
        'l48_51',
        'l48_52',
        'l48_53',
        'l48_54',
        'l48_55',
        'l48_56',
        'l48_57',
        'l48_58',
        'l48_59',
        'l48_60',
        'l48_61',
        'l48_62',
        'l49_148',
        'l49_149',
        'l49_153',
        'l49_154',
        'l49_155',
        'l49_156',
        'l49_46',
        'l49_47',
        'l49_48',
        'l49_49',
        'l49_50',
        'l49_51',
        'l49_52',
        'l49_53',
        'l49_54',
        'l49_55',
        'l49_56',
        'l49_57',
        'l49_58',
        'l49_59',
        'l49_60',
        'l49_61',
        'l49_62',
        'l50_149',
        'l50_150',
        'l50_152',
        'l50_153',
        'l50_154',
        'l50_46',
        'l50_47',
        'l50_48',
        'l50_49',
        'l50_50',
        'l50_51',
        'l50_52',
        'l50_53',
        'l50_54',
        'l50_55',
        'l50_56',
        'l50_57',
        'l50_58',
        'l50_59',
        'l50_60',
        'l50_61',
        'l50_62',
        'l51_147',
        'l51_154',
        'l51_46',
        'l51_47',
        'l51_48',
        'l51_49',
        'l51_50',
        'l51_51',
        'l51_52',
        'l51_53',
        'l51_54',
        'l51_55',
        'l51_56',
        'l51_57',
        'l51_58',
        'l51_59',
        'l51_60',
        'l51_61',
        'l51_62',
        'l52_152',
        'l52_153',
        'l52_154',
        'l52_46',
        'l52_47',
        'l52_48',
        'l52_49',
        'l52_50',
        'l52_51',
        'l52_52',
        'l52_53',
        'l52_54',
        'l52_55',
        'l52_56',
        'l52_57',
        'l52_58',
        'l52_59',
        'l52_60',
        'l52_61',
        'l52_62',
        'l53_49',
        'l53_50',
        'l53_51',
        'l53_52',
        'l53_53',
        'm29_75',
        'm30_75',
        'm31_75',
        'm32_70',
        'm32_71',
        'm32_72',
        'm32_73',
        'm32_74',
        'm32_75',
        'm33_70',
        'm33_71',
        'm33_72',
        'm33_73',
        'm33_74',
        'm33_75',
        'm33_76',
        'm34_70',
        'm34_71',
        'm34_72',
        'm34_73',
        'm34_74',
        'm34_75',
        'm34_76',
        'm35_20',
        'm35_75',
        'm35_76',
        'm36_146',
        'm36_147',
        'm36_148',
        'm36_149',
        'm36_150',
        'm36_153',
        'm36_154',
        'm36_52',
        'm36_53',
        'm36_54',
        'm36_72',
        'm36_73',
        'm36_74',
        'm36_75',
        'm36_76',
        'm37_146',
        'm37_147',
        'm37_148',
        'm37_149',
        'm37_150',
        'm37_151',
        'm37_152',
        'm37_153',
        'm37_154',
        'm37_48',
        'm37_49',
        'm37_50',
        'm37_51',
        'm37_52',
        'm37_53',
        'm37_54',
        'm37_55',
        'm37_72',
        'm37_73',
        'm37_74',
        'm37_75',
        'm38_146',
        'm38_147',
        'm38_148',
        'm38_149',
        'm38_150',
        'm38_151',
        'm38_152',
        'm38_153',
        'm38_154',
        'm38_155',
        'm38_45',
        'm38_46',
        'm38_47',
        'm38_48',
        'm38_49',
        'm38_50',
        'm38_51',
        'm38_52',
        'm38_53',
        'm38_54',
        'm38_55',
        'm38_72',
        'm38_73',
        'm38_74',
        'm39_147',
        'm39_148',
        'm39_149',
        'm39_150',
        'm39_151',
        'm39_152',
        'm39_153',
        'm39_154',
        'm39_155',
        'm39_45',
        'm39_46',
        'm39_47',
        'm39_48',
        'm39_49',
        'm39_50',
        'm39_51',
        'm39_52',
        'm39_53',
        'm39_54',
        'm39_55',
        'm39_72',
        'm39_73',
        'm39_74',
        'm39_75',
        'm39_76',
        'm40_147',
        'm40_148',
        'm40_149',
        'm40_150',
        'm40_151',
        'm40_152',
        'm40_153',
        'm40_154',
        'm40_45',
        'm40_46',
        'm40_47',
        'm40_48',
        'm40_49',
        'm40_50',
        'm40_51',
        'm40_52',
        'm40_53',
        'm40_54',
        'm40_55',
        'm40_72',
        'm40_73',
        'm40_74',
        'm40_75',
        'm40_76',
        'm41_146',
        'm41_149',
        'm41_151',
        'm41_152',
        'm41_153',
        'm41_154',
        'm41_45',
        'm41_46',
        'm41_47',
        'm41_48',
        'm41_49',
        'm41_50',
        'm41_51',
        'm41_52',
        'm41_53',
        'm41_54',
        'm41_55',
        'm41_56',
        'm41_72',
        'm41_73',
        'm41_74',
        'm41_75',
        'm42_144',
        'm42_145',
        'm42_146',
        'm42_151',
        'm42_152',
        'm42_153',
        'm42_49',
        'm42_50',
        'm42_51',
        'm42_52',
        'm42_53',
        'm42_54',
        'm42_55',
        'm42_56',
        'm42_72',
        'm42_73',
        'm42_74',
        'm42_75',
        'm43_144',
        'm43_145',
        'm43_146',
        'm43_153',
        'm43_154',
        'm43_45',
        'm43_46',
        'm43_47',
        'm43_48',
        'm43_49',
        'm43_50',
        'm43_51',
        'm43_52',
        'm43_53',
        'm43_54',
        'm43_55',
        'm43_56',
        'm43_72',
        'm43_73',
        'm43_74',
        'm43_75',
        'm44_144',
        'm44_145',
        'm44_146',
        'm44_148',
        'm44_149',
        'm44_150',
        'm44_151',
        'm44_152',
        'm44_153',
        'm44_154',
        'm44_155',
        'm44_45',
        'm44_46',
        'm44_47',
        'm44_48',
        'm44_49',
        'm44_50',
        'm44_51',
        'm44_52',
        'm44_53',
        'm44_54',
        'm44_55',
        'm44_72',
        'm44_73',
        'm44_74',
        'm44_75',
        'm45_145',
        'm45_146',
        'm45_148',
        'm45_150',
        'm45_151',
        'm45_152',
        'm45_153',
        'm45_154',
        'm45_155',
        'm45_45',
        'm45_46',
        'm45_47',
        'm45_48',
        'm45_49',
        'm45_50',
        'm45_51',
        'm45_52',
        'm45_53',
        'm45_54',
        'm45_55',
        'm45_56',
        'm45_57',
        'm45_58',
        'm45_59',
        'm45_60',
        'm45_61',
        'm45_62',
        'm45_73',
        'm45_74',
        'm45_75',
        'm45_76',
        'm46_149',
        'm46_150',
        'm46_152',
        'm46_153',
        'm46_154',
        'm46_161',
        'm46_45',
        'm46_46',
        'm46_47',
        'm46_48',
        'm46_49',
        'm46_50',
        'm46_51',
        'm46_52',
        'm46_53',
        'm46_54',
        'm46_55',
        'm46_56',
        'm46_57',
        'm46_58',
        'm46_59',
        'm46_60',
        'm46_61',
        'm46_62',
        'm46_75',
        'm47_148',
        'm47_149',
        'm47_150',
        'm47_152',
        'm47_153',
        'm47_160',
        'm47_161',
        'm47_47',
        'm47_48',
        'm47_49',
        'm47_50',
        'm47_51',
        'm47_52',
        'm47_53',
        'm47_54',
        'm47_55',
        'm47_56',
        'm47_57',
        'm47_58',
        'm47_59',
        'm47_60',
        'm47_61',
        'm47_62',
        'm47_75',
        'm48_148',
        'm48_149',
        'm48_152',
        'm48_153',
        'm48_154',
        'm48_155',
        'm48_156',
        'm48_47',
        'm48_48',
        'm48_49',
        'm48_50',
        'm48_51',
        'm48_52',
        'm48_53',
        'm48_54',
        'm48_55',
        'm48_56',
        'm48_57',
        'm48_58',
        'm48_59',
        'm48_60',
        'm48_61',
        'm48_62',
        'm49_148',
        'm49_149',
        'm49_153',
        'm49_154',
        'm49_155',
        'm49_156',
        'm49_46',
        'm49_47',
        'm49_48',
        'm49_49',
        'm49_50',
        'm49_51',
        'm49_52',
        'm49_53',
        'm49_54',
        'm49_55',
        'm49_56',
        'm49_57',
        'm49_58',
        'm49_59',
        'm49_60',
        'm49_61',
        'm49_62',
        'm50_149',
        'm50_150',
        'm50_152',
        'm50_153',
        'm50_154',
        'm50_46',
        'm50_47',
        'm50_48',
        'm50_49',
        'm50_50',
        'm50_51',
        'm50_52',
        'm50_53',
        'm50_54',
        'm50_55',
        'm50_56',
        'm50_57',
        'm50_58',
        'm50_59',
        'm50_60',
        'm50_61',
        'm50_62',
        'm51_147',
        'm51_154',
        'm51_46',
        'm51_47',
        'm51_48',
        'm51_49',
        'm51_50',
        'm51_51',
        'm51_52',
        'm51_53',
        'm51_54',
        'm51_55',
        'm51_56',
        'm51_57',
        'm51_58',
        'm51_59',
        'm51_60',
        'm51_61',
        'm51_62',
        'm52_152',
        'm52_153',
        'm52_154',
        'm52_46',
        'm52_47',
        'm52_48',
        'm52_49',
        'm52_50',
        'm52_51',
        'm52_52',
        'm52_53',
        'm52_54',
        'm52_55',
        'm52_56',
        'm52_57',
        'm52_58',
        'm52_59',
        'm52_60',
        'm52_61',
        'm52_62',
        'm53_49',
        'm53_50',
        'm53_51',
        'm53_52',
        'm53_53',
        'n29_75',
        'n30_75',
        'n31_75',
        'n32_70',
        'n32_71',
        'n32_72',
        'n32_73',
        'n32_74',
        'n32_75',
        'n33_70',
        'n33_71',
        'n33_72',
        'n33_73',
        'n33_74',
        'n33_75',
        'n33_76',
        'n34_70',
        'n34_71',
        'n34_72',
        'n34_73',
        'n34_74',
        'n34_75',
        'n34_76',
        'n35_20',
        'n35_75',
        'n35_76',
        'n36_146',
        'n36_147',
        'n36_148',
        'n36_149',
        'n36_150',
        'n36_153',
        'n36_154',
        'n36_52',
        'n36_53',
        'n36_54',
        'n36_72',
        'n36_73',
        'n36_74',
        'n36_75',
        'n36_76',
        'n37_146',
        'n37_147',
        'n37_148',
        'n37_149',
        'n37_150',
        'n37_151',
        'n37_152',
        'n37_153',
        'n37_154',
        'n37_48',
        'n37_49',
        'n37_50',
        'n37_51',
        'n37_52',
        'n37_53',
        'n37_54',
        'n37_55',
        'n37_72',
        'n37_73',
        'n37_74',
        'n37_75',
        'n38_146',
        'n38_147',
        'n38_148',
        'n38_149',
        'n38_150',
        'n38_151',
        'n38_152',
        'n38_153',
        'n38_154',
        'n38_155',
        'n38_45',
        'n38_46',
        'n38_47',
        'n38_48',
        'n38_49',
        'n38_50',
        'n38_51',
        'n38_52',
        'n38_53',
        'n38_54',
        'n38_55',
        'n38_72',
        'n38_73',
        'n38_74',
        'n39_147',
        'n39_148',
        'n39_149',
        'n39_150',
        'n39_151',
        'n39_152',
        'n39_153',
        'n39_154',
        'n39_155',
        'n39_45',
        'n39_46',
        'n39_47',
        'n39_48',
        'n39_49',
        'n39_50',
        'n39_51',
        'n39_52',
        'n39_53',
        'n39_54',
        'n39_55',
        'n39_72',
        'n39_73',
        'n39_74',
        'n39_75',
        'n39_76',
        'n40_147',
        'n40_148',
        'n40_149',
        'n40_150',
        'n40_151',
        'n40_152',
        'n40_153',
        'n40_154',
        'n40_45',
        'n40_46',
        'n40_47',
        'n40_48',
        'n40_49',
        'n40_50',
        'n40_51',
        'n40_52',
        'n40_53',
        'n40_54',
        'n40_55',
        'n40_72',
        'n40_73',
        'n40_74',
        'n40_75',
        'n40_76',
        'n41_146',
        'n41_149',
        'n41_151',
        'n41_152',
        'n41_153',
        'n41_154',
        'n41_45',
        'n41_46',
        'n41_47',
        'n41_48',
        'n41_49',
        'n41_50',
        'n41_51',
        'n41_52',
        'n41_53',
        'n41_54',
        'n41_55',
        'n41_56',
        'n41_72',
        'n41_73',
        'n41_74',
        'n41_75',
        'n42_144',
        'n42_145',
        'n42_146',
        'n42_151',
        'n42_152',
        'n42_153',
        'n42_49',
        'n42_50',
        'n42_51',
        'n42_52',
        'n42_53',
        'n42_54',
        'n42_55',
        'n42_56',
        'n42_72',
        'n42_73',
        'n42_74',
        'n42_75',
        'n43_144',
        'n43_145',
        'n43_146',
        'n43_153',
        'n43_154',
        'n43_45',
        'n43_46',
        'n43_47',
        'n43_48',
        'n43_49',
        'n43_50',
        'n43_51',
        'n43_52',
        'n43_53',
        'n43_54',
        'n43_55',
        'n43_56',
        'n43_72',
        'n43_73',
        'n43_74',
        'n43_75',
        'n44_144',
        'n44_145',
        'n44_146',
        'n44_148',
        'n44_149',
        'n44_150',
        'n44_151',
        'n44_152',
        'n44_153',
        'n44_154',
        'n44_155',
        'n44_45',
        'n44_46',
        'n44_47',
        'n44_48',
        'n44_49',
        'n44_50',
        'n44_51',
        'n44_52',
        'n44_53',
        'n44_54',
        'n44_55',
        'n44_72',
        'n44_73',
        'n44_74',
        'n44_75',
        'n45_145',
        'n45_146',
        'n45_148',
        'n45_150',
        'n45_151',
        'n45_152',
        'n45_153',
        'n45_154',
        'n45_155',
        'n45_45',
        'n45_46',
        'n45_47',
        'n45_48',
        'n45_49',
        'n45_50',
        'n45_51',
        'n45_52',
        'n45_53',
        'n45_54',
        'n45_55',
        'n45_56',
        'n45_57',
        'n45_58',
        'n45_59',
        'n45_60',
        'n45_61',
        'n45_62',
        'n45_73',
        'n45_74',
        'n45_75',
        'n45_76',
        'n46_149',
        'n46_150',
        'n46_152',
        'n46_153',
        'n46_154',
        'n46_161',
        'n46_45',
        'n46_46',
        'n46_47',
        'n46_48',
        'n46_49',
        'n46_50',
        'n46_51',
        'n46_52',
        'n46_53',
        'n46_54',
        'n46_55',
        'n46_56',
        'n46_57',
        'n46_58',
        'n46_59',
        'n46_60',
        'n46_61',
        'n46_62',
        'n46_75',
        'n47_148',
        'n47_149',
        'n47_150',
        'n47_152',
        'n47_153',
        'n47_160',
        'n47_161',
        'n47_47',
        'n47_48',
        'n47_49',
        'n47_50',
        'n47_51',
        'n47_52',
        'n47_53',
        'n47_54',
        'n47_55',
        'n47_56',
        'n47_57',
        'n47_58',
        'n47_59',
        'n47_60',
        'n47_61',
        'n47_62',
        'n47_75',
        'n48_148',
        'n48_149',
        'n48_152',
        'n48_153',
        'n48_154',
        'n48_155',
        'n48_156',
        'n48_47',
        'n48_48',
        'n48_49',
        'n48_50',
        'n48_51',
        'n48_52',
        'n48_53',
        'n48_54',
        'n48_55',
        'n48_56',
        'n48_57',
        'n48_58',
        'n48_59',
        'n48_60',
        'n48_61',
        'n48_62',
        'n49_148',
        'n49_149',
        'n49_153',
        'n49_154',
        'n49_155',
        'n49_156',
        'n49_46',
        'n49_47',
        'n49_48',
        'n49_49',
        'n49_50',
        'n49_51',
        'n49_52',
        'n49_53',
        'n49_54',
        'n49_55',
        'n49_56',
        'n49_57',
        'n49_58',
        'n49_59',
        'n49_60',
        'n49_61',
        'n49_62',
        'n50_149',
        'n50_150',
        'n50_152',
        'n50_153',
        'n50_154',
        'n50_46',
        'n50_47',
        'n50_48',
        'n50_49',
        'n50_50',
        'n50_51',
        'n50_52',
        'n50_53',
        'n50_54',
        'n50_55',
        'n50_56',
        'n50_57',
        'n50_58',
        'n50_59',
        'n50_60',
        'n50_61',
        'n50_62',
        'n51_147',
        'n51_154',
        'n51_46',
        'n51_47',
        'n51_48',
        'n51_49',
        'n51_50',
        'n51_51',
        'n51_52',
        'n51_53',
        'n51_54',
        'n51_55',
        'n51_56',
        'n51_57',
        'n51_58',
        'n51_59',
        'n51_60',
        'n51_61',
        'n51_62',
        'n52_152',
        'n52_153',
        'n52_154',
        'n52_46',
        'n52_47',
        'n52_48',
        'n52_49',
        'n52_50',
        'n52_51',
        'n52_52',
        'n52_53',
        'n52_54',
        'n52_55',
        'n52_56',
        'n52_57',
        'n52_58',
        'n52_59',
        'n52_60',
        'n52_61',
        'n52_62',
        'n53_49',
        'n53_50',
        'n53_51',
        'n53_52',
        'n53_53',
        'o29_75',
        'o30_75',
        'o31_75',
        'o32_70',
        'o32_71',
        'o32_72',
        'o32_73',
        'o32_74',
        'o32_75',
        'o33_70',
        'o33_71',
        'o33_72',
        'o33_73',
        'o33_74',
        'o33_75',
        'o33_76',
        'o34_70',
        'o34_71',
        'o34_72',
        'o34_73',
        'o34_74',
        'o34_75',
        'o34_76',
        'o35_20',
        'o35_75',
        'o35_76',
        'o36_146',
        'o36_147',
        'o36_148',
        'o36_149',
        'o36_150',
        'o36_153',
        'o36_154',
        'o36_52',
        'o36_53',
        'o36_54',
        'o36_72',
        'o36_73',
        'o36_74',
        'o36_75',
        'o36_76',
        'o37_146',
        'o37_147',
        'o37_148',
        'o37_149',
        'o37_150',
        'o37_151',
        'o37_152',
        'o37_153',
        'o37_154',
        'o37_48',
        'o37_49',
        'o37_50',
        'o37_51',
        'o37_52',
        'o37_53',
        'o37_54',
        'o37_55',
        'o37_72',
        'o37_73',
        'o37_74',
        'o37_75',
        'o38_146',
        'o38_147',
        'o38_148',
        'o38_149',
        'o38_150',
        'o38_151',
        'o38_152',
        'o38_153',
        'o38_154',
        'o38_155',
        'o38_45',
        'o38_46',
        'o38_47',
        'o38_48',
        'o38_49',
        'o38_50',
        'o38_51',
        'o38_52',
        'o38_53',
        'o38_54',
        'o38_55',
        'o38_72',
        'o38_73',
        'o38_74',
        'o39_147',
        'o39_148',
        'o39_149',
        'o39_150',
        'o39_151',
        'o39_152',
        'o39_153',
        'o39_154',
        'o39_155',
        'o39_45',
        'o39_46',
        'o39_47',
        'o39_48',
        'o39_49',
        'o39_50',
        'o39_51',
        'o39_52',
        'o39_53',
        'o39_54',
        'o39_55',
        'o39_72',
        'o39_73',
        'o39_74',
        'o39_75',
        'o39_76',
        'o40_147',
        'o40_148',
        'o40_149',
        'o40_150',
        'o40_151',
        'o40_152',
        'o40_153',
        'o40_154',
        'o40_45',
        'o40_46',
        'o40_47',
        'o40_48',
        'o40_49',
        'o40_50',
        'o40_51',
        'o40_52',
        'o40_53',
        'o40_54',
        'o40_55',
        'o40_72',
        'o40_73',
        'o40_74',
        'o40_75',
        'o40_76',
        'o41_146',
        'o41_149',
        'o41_151',
        'o41_152',
        'o41_153',
        'o41_154',
        'o41_45',
        'o41_46',
        'o41_47',
        'o41_48',
        'o41_49',
        'o41_50',
        'o41_51',
        'o41_52',
        'o41_53',
        'o41_54',
        'o41_55',
        'o41_56',
        'o41_72',
        'o41_73',
        'o41_74',
        'o41_75',
        'o42_144',
        'o42_145',
        'o42_146',
        'o42_151',
        'o42_152',
        'o42_153',
        'o42_49',
        'o42_50',
        'o42_51',
        'o42_52',
        'o42_53',
        'o42_54',
        'o42_55',
        'o42_56',
        'o42_72',
        'o42_73',
        'o42_74',
        'o42_75',
        'o43_144',
        'o43_145',
        'o43_146',
        'o43_153',
        'o43_154',
        'o43_45',
        'o43_46',
        'o43_47',
        'o43_48',
        'o43_49',
        'o43_50',
        'o43_51',
        'o43_52',
        'o43_53',
        'o43_54',
        'o43_55',
        'o43_56',
        'o43_72',
        'o43_73',
        'o43_74',
        'o43_75',
        'o44_144',
        'o44_145',
        'o44_146',
        'o44_148',
        'o44_149',
        'o44_150',
        'o44_151',
        'o44_152',
        'o44_153',
        'o44_154',
        'o44_155',
        'o44_45',
        'o44_46',
        'o44_47',
        'o44_48',
        'o44_49',
        'o44_50',
        'o44_51',
        'o44_52',
        'o44_53',
        'o44_54',
        'o44_55',
        'o44_72',
        'o44_73',
        'o44_74',
        'o44_75',
        'o45_145',
        'o45_146',
        'o45_148',
        'o45_150',
        'o45_151',
        'o45_152',
        'o45_153',
        'o45_154',
        'o45_155',
        'o45_45',
        'o45_46',
        'o45_47',
        'o45_48',
        'o45_49',
        'o45_50',
        'o45_51',
        'o45_52',
        'o45_53',
        'o45_54',
        'o45_55',
        'o45_56',
        'o45_57',
        'o45_58',
        'o45_59',
        'o45_60',
        'o45_61',
        'o45_62',
        'o45_73',
        'o45_74',
        'o45_75',
        'o45_76',
        'o46_149',
        'o46_150',
        'o46_152',
        'o46_153',
        'o46_154',
        'o46_161',
        'o46_45',
        'o46_46',
        'o46_47',
        'o46_48',
        'o46_49',
        'o46_50',
        'o46_51',
        'o46_52',
        'o46_53',
        'o46_54',
        'o46_55',
        'o46_56',
        'o46_57',
        'o46_58',
        'o46_59',
        'o46_60',
        'o46_61',
        'o46_62',
        'o46_75',
        'o47_148',
        'o47_149',
        'o47_150',
        'o47_152',
        'o47_153',
        'o47_160',
        'o47_161',
        'o47_47',
        'o47_48',
        'o47_49',
        'o47_50',
        'o47_51',
        'o47_52',
        'o47_53',
        'o47_54',
        'o47_55',
        'o47_56',
        'o47_57',
        'o47_58',
        'o47_59',
        'o47_60',
        'o47_61',
        'o47_62',
        'o47_75',
        'o48_148',
        'o48_149',
        'o48_152',
        'o48_153',
        'o48_154',
        'o48_155',
        'o48_156',
        'o48_47',
        'o48_48',
        'o48_49',
        'o48_50',
        'o48_51',
        'o48_52',
        'o48_53',
        'o48_54',
        'o48_55',
        'o48_56',
        'o48_57',
        'o48_58',
        'o48_59',
        'o48_60',
        'o48_61',
        'o48_62',
        'o49_148',
        'o49_149',
        'o49_153',
        'o49_154',
        'o49_155',
        'o49_156',
        'o49_46',
        'o49_47',
        'o49_48',
        'o49_49',
        'o49_50',
        'o49_51',
        'o49_52',
        'o49_53',
        'o49_54',
        'o49_55',
        'o49_56',
        'o49_57',
        'o49_58',
        'o49_59',
        'o49_60',
        'o49_61',
        'o49_62',
        'o50_149',
        'o50_150',
        'o50_152',
        'o50_153',
        'o50_154',
        'o50_46',
        'o50_47',
        'o50_48',
        'o50_49',
        'o50_50',
        'o50_51',
        'o50_52',
        'o50_53',
        'o50_54',
        'o50_55',
        'o50_56',
        'o50_57',
        'o50_58',
        'o50_59',
        'o50_60',
        'o50_61',
        'o50_62',
        'o51_147',
        'o51_154',
        'o51_46',
        'o51_47',
        'o51_48',
        'o51_49',
        'o51_50',
        'o51_51',
        'o51_52',
        'o51_53',
        'o51_54',
        'o51_55',
        'o51_56',
        'o51_57',
        'o51_58',
        'o51_59',
        'o51_60',
        'o51_61',
        'o51_62',
        'o52_152',
        'o52_153',
        'o52_154',
        'o52_46',
        'o52_47',
        'o52_48',
        'o52_49',
        'o52_50',
        'o52_51',
        'o52_52',
        'o52_53',
        'o52_54',
        'o52_55',
        'o52_56',
        'o52_57',
        'o52_58',
        'o52_59',
        'o52_60',
        'o52_61',
        'o52_62',
        'o53_49',
        'o53_50',
        'o53_51',
        'o53_52',
        'o53_53'
    ];
    for (let i = 0; i < allMaps.length; i++) {
        const name = allMaps[i];
        const map = new Uint8Array(await (await fetch(`data/pack/client/maps/${name}`)).arrayBuffer());
        const crc = Packet.getcrc(map, 0, map.length);
        PRELOADED.set(name, map);
        PRELOADED_CRC.set(name, crc);
    }
    const allSongs = [
        'adventure.mid',
        'al_kharid.mid',
        'alone.mid',
        'ambience_2.mid',
        'ambience_3.mid',
        'ambience_4.mid',
        'ambient_jungle.mid',
        'arabian.mid',
        'arabian2.mid',
        'arabian3.mid',
        'arabique.mid',
        'army_of_darkness.mid',
        'arrival.mid',
        'attack1.mid',
        'attack2.mid',
        'attack3.mid',
        'attack4.mid',
        'attack5.mid',
        'attack6.mid',
        'attention.mid',
        'autumn_voyage.mid',
        'background2.mid',
        'ballad_of_enchantment.mid',
        'baroque.mid',
        'beyond.mid',
        'big_chords.mid',
        'book_of_spells.mid',
        'camelot.mid',
        'cave_background1.mid',
        'cavern.mid',
        'cellar_song1.mid',
        'chain_of_command.mid',
        'chompy_hunt.mid',
        'close_quarters.mid',
        'crystal_cave.mid',
        'crystal_sword.mid',
        'cursed.mid',
        'dangerous.mid',
        'dark2.mid',
        'deep_wildy.mid',
        'desert_voyage.mid',
        'doorways.mid',
        'dream1.mid',
        'duel_arena.mid',
        'dunjun.mid',
        'egypt.mid',
        'emotion.mid',
        'emperor.mid',
        'escape.mid',
        'expanse.mid',
        'expecting.mid',
        'expedition.mid',
        'fade_test.mid',
        'faerie.mid',
        'fanfare.mid',
        'fanfare2.mid',
        'fanfare3.mid',
        'fishing.mid',
        'flute_salad.mid',
        'forbidden.mid',
        'forever.mid',
        'game_intro_1.mid',
        'gaol.mid',
        'garden.mid',
        'gnome.mid',
        'gnome_king.mid',
        'gnome_theme.mid',
        'gnome_village.mid',
        'gnome_village2.mid',
        'gnomeball.mid',
        'greatness.mid',
        'grumpy.mid',
        'harmony.mid',
        'harmony2.mid',
        'heart_and_mind.mid',
        'high_seas.mid',
        'horizon.mid',
        'iban.mid',
        'ice_melody.mid',
        'in_the_manor.mid',
        'inspiration.mid',
        'intrepid.mid',
        'jolly-r.mid',
        'jungle_island.mid',
        'jungly1.mid',
        'jungly2.mid',
        'jungly3.mid',
        'knightly.mid',
        'landlubber.mid',
        'lasting.mid',
        'legion.mid',
        'lightness.mid',
        'lightwalk.mid',
        'lonesome.mid',
        'long_ago.mid',
        'long_way_home.mid',
        'lullaby.mid',
        'mage_arena.mid',
        'magic_dance.mid',
        'magical_journey.mid',
        'march2.mid',
        'medieval.mid',
        'mellow.mid',
        'miles_away.mid',
        'miracle_dance.mid',
        'monarch_waltz.mid',
        'moody.mid',
        'neverland.mid',
        'newbie_melody.mid',
        'nightfall.mid',
        'nomad.mid',
        'null.mid',
        'organ_music_1.mid',
        'organ_music_2.mid',
        'oriental.mid',
        'overture.mid',
        'parade.mid',
        'quest.mid',
        'regal2.mid',
        'reggae.mid',
        'reggae2.mid',
        'riverside.mid',
        'royale.mid',
        'rune_essence.mid',
        'sad_meadow.mid',
        'scape_cave.mid',
        'scape_main.mid',
        'scape_sad1.mid',
        'scape_soft.mid',
        'scape_wild1.mid',
        'sea_shanty.mid',
        'sea_shanty2.mid',
        'serenade.mid',
        'serene.mid',
        'shine.mid',
        'shining.mid',
        'silence.mid',
        'soundscape.mid',
        'spirit.mid',
        'splendour.mid',
        'spooky2.mid',
        'spooky_jungle.mid',
        'starlight.mid',
        'start.mid',
        'still_night.mid',
        'talking_forest.mid',
        'the_desert.mid',
        'the_shadow.mid',
        'the_tower.mid',
        'theme.mid',
        'tomorrow.mid',
        'trawler.mid',
        'trawler_minor.mid',
        'tree_spirits.mid',
        'tribal.mid',
        'tribal2.mid',
        'tribal_background.mid',
        'trinity.mid',
        'troubled.mid',
        'undercurrent.mid',
        'underground.mid',
        'understanding.mid',
        'unknown_land.mid',
        'upass1.mid',
        'upcoming.mid',
        'venture.mid',
        'venture2.mid',
        'vision.mid',
        'voodoo_cult.mid',
        'voyage.mid',
        'wander.mid',
        'waterfall.mid',
        'wilderness2.mid',
        'wilderness3.mid',
        'wilderness4.mid',
        'witching.mid',
        'wolf_mountain.mid',
        'wonder.mid',
        'wonderous.mid',
        'workshop.mid',
        'yesteryear.mid',
        'zealot.mid'
    ];
    for (let i = 0; i < allSongs.length; i++) {
        const name = allSongs[i];
        const song = new Uint8Array(await (await fetch(`data/pack/client/songs/${name}`)).arrayBuffer());
        const crc = Packet.getcrc(song, 0, song.length);
        PRELOADED.set(name, song);
        PRELOADED_CRC.set(name, crc);
    }
    const allJingles = [
        'advance agility.mid',
        'advance attack.mid',
        'advance attack2.mid',
        'advance cooking.mid',
        'advance cooking2.mid',
        'advance crafting.mid',
        'advance crafting2.mid',
        'advance defense.mid',
        'advance defense2.mid',
        'advance firemarking.mid',
        'advance firemarking2.mid',
        'advance fishing.mid',
        'advance fishing2.mid',
        'advance fletching.mid',
        'advance fletching2.mid',
        'advance herblaw.mid',
        'advance herblaw2.mid',
        'advance hitpoints.mid',
        'advance hitpoints2.mid',
        'advance magic.mid',
        'advance magic2.mid',
        'advance mining.mid',
        'advance mining2.mid',
        'advance prayer.mid',
        'advance prayer2.mid',
        'advance ranged.mid',
        'advance ranged2.mid',
        'advance runecraft.mid',
        'advance runecraft2.mid',
        'advance smithing.mid',
        'advance smithing2.mid',
        'advance strength.mid',
        'advance strength2.mid',
        'advance thieving.mid',
        'advance thieving2.mid',
        'advance woodcutting.mid',
        'advance woodcutting2.mid',
        'death.mid',
        'death2.mid',
        'dice lose.mid',
        'dice win.mid',
        'duel start.mid',
        'duel win2.mid',
        'quest complete 1.mid',
        'quest complete 2.mid',
        'quest complete 3.mid',
        'sailing journey.mid',
        'treasure hunt win.mid'
    ];
    for (let i = 0; i < allJingles.length; i++) {
        const name = allJingles[i];
        const jingle = new Uint8Array(await (await fetch(`data/pack/client/jingles/${name}`)).arrayBuffer()).subarray(4);
        const crc = Packet.getcrc(jingle, 0, jingle.length);
        PRELOADED.set(name, jingle);
        PRELOADED_CRC.set(name, crc);
    }
}
var PRELOADED = new Map();
var PRELOADED_CRC = new Map();

// src/lostcity/network/outgoing/OutgoingMessage.ts
class OutgoingMessage extends Hashable {}

// src/lostcity/network/outgoing/prot/ServerProtPriority.ts
class ServerProtPriority {
    static LOW = new ServerProtPriority();
    static HIGH = new ServerProtPriority();
}

// src/lostcity/network/outgoing/model/IfClose.ts
class IfClose extends OutgoingMessage {
    priority = ServerProtPriority.LOW;
}

// src/lostcity/network/outgoing/model/UpdateUid192.ts
class UpdateUid192 extends OutgoingMessage {
    uid;
    priority = ServerProtPriority.HIGH;
    constructor(uid) {
        super();
        this.uid = uid;
    }
}

// src/lostcity/network/outgoing/model/ResetAnims.ts
class ResetAnims extends OutgoingMessage {
    priority = ServerProtPriority.HIGH;
}

// src/lostcity/network/outgoing/model/ResetClientVarCache.ts
class ResetClientVarCache extends OutgoingMessage {
    priority = ServerProtPriority.HIGH;
}

// src/lostcity/network/outgoing/model/TutorialOpenChat.ts
class TutorialOpenChat extends OutgoingMessage {
    component;
    priority = ServerProtPriority.LOW;
    constructor(component) {
        super();
        this.component = component;
    }
}

// src/lostcity/network/outgoing/model/UpdateInvStopTransmit.ts
class UpdateInvStopTransmit extends OutgoingMessage {
    component;
    priority = ServerProtPriority.HIGH;
    constructor(component) {
        super();
        this.component = component;
    }
}

// src/lostcity/network/outgoing/model/VarpSmall.ts
class VarpSmall extends OutgoingMessage {
    varp;
    value;
    priority = ServerProtPriority.HIGH;
    constructor(varp, value) {
        super();
        this.varp = varp;
        this.value = value;
    }
}

// src/lostcity/network/outgoing/model/VarpLarge.ts
class VarpLarge extends OutgoingMessage {
    varp;
    value;
    priority = ServerProtPriority.HIGH;
    constructor(varp, value) {
        super();
        this.varp = varp;
        this.value = value;
    }
}

// src/lostcity/network/outgoing/model/MidiSong.ts
class MidiSong extends OutgoingMessage {
    name;
    crc;
    length;
    priority = ServerProtPriority.LOW;
    constructor(name, crc, length) {
        super();
        this.name = name;
        this.crc = crc;
        this.length = length;
    }
}

// src/lostcity/network/outgoing/model/MidiJingle.ts
class MidiJingle extends OutgoingMessage {
    delay;
    data;
    priority = ServerProtPriority.LOW;
    constructor(delay, data) {
        super();
        this.delay = delay;
        this.data = data;
    }
}

// src/lostcity/network/outgoing/model/IfOpenSideOverlay.ts
class IfOpenSideOverlay extends OutgoingMessage {
    component;
    tab;
    priority = ServerProtPriority.LOW;
    constructor(component, tab) {
        super();
        this.component = component;
        this.tab = tab;
    }
}

// src/lostcity/network/outgoing/model/UnsetMapFlag.ts
class UnsetMapFlag extends OutgoingMessage {
    priority = ServerProtPriority.HIGH;
}

// src/lostcity/network/outgoing/model/HintArrow.ts
class HintArrow extends OutgoingMessage {
    type;
    nid;
    pid;
    x;
    z2;
    y2;
    priority = ServerProtPriority.LOW;
    constructor(type, nid, pid, x, z2, y2) {
        super();
        this.type = type;
        this.nid = nid;
        this.pid = pid;
        this.x = x;
        this.z = z2;
        this.y = y2;
    }
}

// src/lostcity/network/outgoing/model/LastLoginInfo.ts
class LastLoginInfo extends OutgoingMessage {
    lastLoginIp;
    daysSinceLogin;
    daysSinceRecoveryChange;
    unreadMessageCount;
    priority = ServerProtPriority.LOW;
    constructor(lastLoginIp, daysSinceLogin, daysSinceRecoveryChange, unreadMessageCount) {
        super();
        this.lastLoginIp = lastLoginIp;
        this.daysSinceLogin = daysSinceLogin;
        this.daysSinceRecoveryChange = daysSinceRecoveryChange;
        this.unreadMessageCount = unreadMessageCount;
    }
}

// src/lostcity/network/outgoing/model/MessageGame.ts
class MessageGame extends OutgoingMessage {
    msg;
    priority = ServerProtPriority.HIGH;
    constructor(msg) {
        super();
        this.msg = msg;
    }
}

// src/lostcity/engine/zone/ZoneEventType.ts
var ZoneEventType;
(ZoneEventType2 => {
    ZoneEventType2[(ZoneEventType2['ENCLOSED'] = 0)] = 'ENCLOSED';
    ZoneEventType2[(ZoneEventType2['FOLLOWS'] = 1)] = 'FOLLOWS';
})((ZoneEventType ||= {}));
var ZoneEventType_default = ZoneEventType;

// src/lostcity/network/outgoing/model/UpdateZonePartialEnclosed.ts
class UpdateZonePartialEnclosed extends OutgoingMessage {
    zoneX;
    zoneZ;
    originX;
    originZ;
    data;
    priority = ServerProtPriority.HIGH;
    constructor(zoneX, zoneZ, originX, originZ, data) {
        super();
        this.zoneX = zoneX;
        this.zoneZ = zoneZ;
        this.originX = originX;
        this.originZ = originZ;
        this.data = data;
    }
}

// src/lostcity/network/outgoing/model/UpdateZoneFullFollows.ts
class UpdateZoneFullFollows extends OutgoingMessage {
    zoneX;
    zoneZ;
    originX;
    originZ;
    priority = ServerProtPriority.HIGH;
    constructor(zoneX, zoneZ, originX, originZ) {
        super();
        this.zoneX = zoneX;
        this.zoneZ = zoneZ;
        this.originX = originX;
        this.originZ = originZ;
    }
}

// src/lostcity/network/outgoing/model/UpdateZonePartialFollows.ts
class UpdateZonePartialFollows extends OutgoingMessage {
    zoneX;
    zoneZ;
    originX;
    originZ;
    priority = ServerProtPriority.HIGH;
    constructor(zoneX, zoneZ, originX, originZ) {
        super();
        this.zoneX = zoneX;
        this.zoneZ = zoneZ;
        this.originX = originX;
        this.originZ = originZ;
    }
}

// src/lostcity/network/outgoing/ZoneMessage.ts
class ZoneMessage extends OutgoingMessage {
    coord;
    priority = ServerProtPriority.HIGH;
    constructor(coord) {
        super();
        this.coord = coord;
    }
}

// src/lostcity/network/outgoing/model/ObjAdd.ts
class ObjAdd extends ZoneMessage {
    coord;
    obj;
    count;
    constructor(coord, obj, count) {
        super(coord);
        this.coord = coord;
        this.obj = obj;
        this.count = count;
    }
}

// src/lostcity/network/outgoing/model/LocAddChange.ts
class LocAddChange extends ZoneMessage {
    coord;
    loc;
    shape;
    angle;
    constructor(coord, loc, shape, angle) {
        super(coord);
        this.coord = coord;
        this.loc = loc;
        this.shape = shape;
        this.angle = angle;
    }
}

// src/lostcity/network/outgoing/model/LocDel.ts
class LocDel extends ZoneMessage {
    coord;
    shape;
    angle;
    constructor(coord, shape, angle) {
        super(coord);
        this.coord = coord;
        this.shape = shape;
        this.angle = angle;
    }
}

// src/lostcity/network/outgoing/model/MapProjAnim.ts
class MapProjAnim extends ZoneMessage {
    srcX;
    srcZ;
    dstX;
    dstZ;
    target;
    spotanim;
    srcHeight;
    dstHeight;
    startDelay;
    endDelay;
    peak;
    arc;
    constructor(srcX, srcZ, dstX, dstZ, target, spotanim, srcHeight, dstHeight, startDelay, endDelay, peak, arc) {
        super(Position.packZoneCoord(srcX, srcZ));
        this.srcX = srcX;
        this.srcZ = srcZ;
        this.dstX = dstX;
        this.dstZ = dstZ;
        this.target = target;
        this.spotanim = spotanim;
        this.srcHeight = srcHeight;
        this.dstHeight = dstHeight;
        this.startDelay = startDelay;
        this.endDelay = endDelay;
        this.peak = peak;
        this.arc = arc;
    }
}

// src/lostcity/network/outgoing/model/MapAnim.ts
class MapAnim extends ZoneMessage {
    coord;
    spotanim;
    height;
    delay;
    constructor(coord, spotanim, height, delay) {
        super(coord);
        this.coord = coord;
        this.spotanim = spotanim;
        this.height = height;
        this.delay = delay;
    }
}

// src/lostcity/network/outgoing/model/ObjDel.ts
class ObjDel extends ZoneMessage {
    coord;
    obj;
    constructor(coord, obj) {
        super(coord);
        this.coord = coord;
        this.obj = obj;
    }
}

// src/lostcity/network/outgoing/model/ObjCount.ts
class ObjCount extends ZoneMessage {
    coord;
    obj;
    oldCount;
    newCount;
    constructor(coord, obj, oldCount, newCount) {
        super(coord);
        this.coord = coord;
        this.obj = obj;
        this.oldCount = oldCount;
        this.newCount = newCount;
    }
}

// src/lostcity/network/outgoing/model/ObjReveal.ts
class ObjReveal extends ZoneMessage {
    coord;
    obj;
    count;
    receiverId;
    constructor(coord, obj, count, receiverId) {
        super(coord);
        this.coord = coord;
        this.obj = obj;
        this.count = count;
        this.receiverId = receiverId;
    }
}

// src/lostcity/network/outgoing/model/LocAnim.ts
class LocAnim extends ZoneMessage {
    coord;
    shape;
    angle;
    seq;
    constructor(coord, shape, angle, seq) {
        super(coord);
        this.coord = coord;
        this.shape = shape;
        this.angle = angle;
        this.seq = seq;
    }
}

// src/lostcity/network/outgoing/model/LocMerge.ts
class LocMerge extends ZoneMessage {
    srcX;
    srcZ;
    shape;
    angle;
    locId;
    startCycle;
    endCycle;
    pid;
    east;
    south;
    west;
    north;
    constructor(srcX, srcZ, shape, angle, locId, startCycle, endCycle, pid, east, south, west, north) {
        super(Position.packZoneCoord(srcX, srcZ));
        this.srcX = srcX;
        this.srcZ = srcZ;
        this.shape = shape;
        this.angle = angle;
        this.locId = locId;
        this.startCycle = startCycle;
        this.endCycle = endCycle;
        this.pid = pid;
        this.east = east;
        this.south = south;
        this.west = west;
        this.north = north;
    }
}

// src/lostcity/network/outgoing/codec/MessageEncoder.ts
class MessageEncoder {
    test(_2) {
        return this.prot.length;
    }
}

// src/lostcity/network/225/outgoing/codec/IfOpenChatModalEncoder.ts
class IfOpenChatModalEncoder extends MessageEncoder {
    prot = ServerProt.IF_OPENCHATMODAL;
    encode(buf, message) {
        buf.p2(message.component);
    }
}

// src/lostcity/network/outgoing/model/IfOpenChatModal.ts
class IfOpenChatModal extends OutgoingMessage {
    component;
    priority = ServerProtPriority.LOW;
    constructor(component) {
        super();
        this.component = component;
    }
}

// src/lostcity/network/outgoing/model/PlayerInfo.ts
class PlayerInfo extends OutgoingMessage {
    buildArea;
    level;
    x;
    z2;
    originX;
    originZ;
    uid;
    mask;
    tele;
    jump2;
    walkDir;
    runDir;
    priority = ServerProtPriority.HIGH;
    accumulator = 0;
    constructor(buildArea, level, x, z2, originX, originZ, uid, mask, tele, jump2, walkDir, runDir) {
        super();
        this.buildArea = buildArea;
        this.level = level;
        this.x = x;
        this.z = z2;
        this.originX = originX;
        this.originZ = originZ;
        this.uid = uid;
        this.mask = mask;
        this.tele = tele;
        this.jump = jump2;
        this.walkDir = walkDir;
        this.runDir = runDir;
    }
}

// src/lostcity/network/225/outgoing/codec/PlayerInfoEncoder.ts
class PlayerInfoEncoder extends MessageEncoder {
    static BITS_NEW = 11 + 5 + 5 + 1 + 1 + 11;
    static BITS_RUN = 2 + 3 + 3 + 1 + 1;
    static BITS_WALK = 2 + 3 + 1 + 1;
    static BITS_EXTENDED = 2 + 1;
    static BYTES_LIMIT = 4997;
    prot = ServerProt.PLAYER_INFO;
    encode(buf, message) {
        const buildArea = message.buildArea;
        buildArea.resize();
        this.writeLocalPlayer(buf, message);
        this.writePlayers(buf, message);
        this.writeNewPlayers(buf, message);
        const extended = buildArea.extendedInfo;
        if (extended.size > 0) {
            for (const info of extended) {
                const other = World_default.getPlayerByUid(info.id);
                if (!other) {
                    continue;
                }
                this.writeUpdate(other, message, buf, info.id === message.uid, info.added);
            }
        }
        buildArea.reset();
    }
    test(_2) {
        return PlayerInfoEncoder.BYTES_LIMIT;
    }
    writeLocalPlayer(bitBlock, message) {
        const {buildArea, uid, level, x, z: z2, mask, tele, jump: jump2, walkDir, runDir} = message;
        const player = World_default.getPlayerByUid(uid);
        if (!player) {
            return;
        }
        bitBlock.bits();
        bitBlock.pBit(1, tele || walkDir !== -1 || runDir !== -1 || mask > 0 ? 1 : 0);
        if (tele) {
            bitBlock.pBit(2, 3);
            bitBlock.pBit(2, level);
            bitBlock.pBit(7, Position.local(x));
            bitBlock.pBit(7, Position.local(z2));
            bitBlock.pBit(1, jump2 ? 1 : 0);
            bitBlock.pBit(1, mask > 0 ? 1 : 0);
        } else if (runDir !== -1) {
            bitBlock.pBit(2, 2);
            bitBlock.pBit(3, walkDir);
            bitBlock.pBit(3, runDir);
            bitBlock.pBit(1, mask > 0 ? 1 : 0);
        } else if (walkDir !== -1) {
            bitBlock.pBit(2, 1);
            bitBlock.pBit(3, walkDir);
            bitBlock.pBit(1, mask > 0 ? 1 : 0);
        } else if (mask > 0) {
            bitBlock.pBit(2, 0);
        }
        if (mask > 0) {
            buildArea.extendedInfo.add({id: uid, added: false});
            message.accumulator += this.calculateUpdateSize(player, message, true, true);
        }
    }
    writePlayers(bitBlock, message) {
        const buildArea = message.buildArea;
        bitBlock.pBit(8, buildArea.players.size);
        for (const uid of buildArea.players) {
            const other = World_default.getPlayerByUid(uid);
            if (!other || other.tele || other.level !== message.level || !Position.isWithinDistanceSW(message, other, buildArea.viewDistance) || !other.checkLifeCycle(World_default.currentTick)) {
                bitBlock.pBit(1, 1);
                bitBlock.pBit(2, 3);
                buildArea.players.delete(uid);
                continue;
            }
            let extendedInfo = other.mask > 0;
            const {walkDir, runDir} = other;
            let bits = 0;
            if (runDir !== -1) {
                bits = PlayerInfoEncoder.BITS_RUN;
            } else if (walkDir !== -1) {
                bits = PlayerInfoEncoder.BITS_WALK;
            } else if (extendedInfo) {
                bits = PlayerInfoEncoder.BITS_EXTENDED;
            }
            const updateSize = extendedInfo ? this.calculateUpdateSize(other, message, false, false) : 0;
            if (((bitBlock.bitPos + bits + 7 + 24) >>> 3) + bitBlock.pos + (message.accumulator += updateSize) > this.test(message)) {
                extendedInfo = false;
            }
            bitBlock.pBit(1, walkDir !== -1 || runDir !== -1 || extendedInfo ? 1 : 0);
            if (runDir !== -1) {
                bitBlock.pBit(2, 2);
                bitBlock.pBit(3, walkDir);
                bitBlock.pBit(3, runDir);
                bitBlock.pBit(1, extendedInfo ? 1 : 0);
            } else if (walkDir !== -1) {
                bitBlock.pBit(2, 1);
                bitBlock.pBit(3, walkDir);
                bitBlock.pBit(1, extendedInfo ? 1 : 0);
            } else if (extendedInfo) {
                bitBlock.pBit(2, 0);
            }
            if (extendedInfo) {
                buildArea.extendedInfo.add({id: uid, added: false});
            }
        }
    }
    writeNewPlayers(bitBlock, message) {
        const buildArea = message.buildArea;
        for (const other of buildArea.getNearbyPlayers(message.uid, message.x, message.z, message.originX, message.originZ)) {
            const extendedInfo = !buildArea.hasAppearance(other.pid, other.appearanceHashCode);
            const updateSize = extendedInfo ? this.calculateUpdateSize(other, message, false, true) : 0;
            if (((bitBlock.bitPos + PlayerInfoEncoder.BITS_NEW + 7 + 24) >>> 3) + bitBlock.pos + (message.accumulator += updateSize) > this.test(message)) {
                break;
            }
            bitBlock.pBit(11, other.pid);
            bitBlock.pBit(5, other.x - message.x);
            bitBlock.pBit(5, other.z - message.z);
            bitBlock.pBit(1, other.jump ? 1 : 0);
            bitBlock.pBit(1, extendedInfo ? 1 : 0);
            if (extendedInfo) {
                buildArea.extendedInfo.add({id: other.uid, added: true});
            }
            buildArea.players.add(other.uid);
        }
        if (buildArea.extendedInfo.size > 0) {
            bitBlock.pBit(11, 2047);
        }
        bitBlock.bytes();
    }
    writeUpdate(player, message, out, self2 = false, newlyObserved = false) {
        let mask = player.mask;
        if (newlyObserved) {
            mask |= Player2.APPEARANCE;
        }
        if (newlyObserved && (player.orientation !== -1 || player.faceX !== -1 || player.faceZ !== -1)) {
            mask |= Player2.FACE_COORD;
        }
        if (newlyObserved && player.faceEntity !== -1) {
            mask |= Player2.FACE_ENTITY;
        }
        if (mask > 255) {
            mask |= Player2.BIG_UPDATE;
        }
        if (self2 && mask & Player2.CHAT) {
            mask &= ~Player2.CHAT;
        }
        if (message.buildArea.hasAppearance(player.pid, player.appearanceHashCode)) {
            mask &= ~Player2.APPEARANCE;
        }
        out.p1(mask & 255);
        if (mask & Player2.BIG_UPDATE) {
            out.p1(mask >> 8);
        }
        if (mask & Player2.APPEARANCE) {
            out.p1(player.appearance.length);
            out.pdata(player.appearance, 0, player.appearance.length);
            message.buildArea.saveAppearance(player.pid, player.appearanceHashCode);
        }
        if (mask & Player2.ANIM) {
            out.p2(player.animId);
            out.p1(player.animDelay);
        }
        if (mask & Player2.FACE_ENTITY) {
            if (player.faceEntity !== -1) {
                player.alreadyFacedEntity = true;
            }
            out.p2(player.faceEntity);
        }
        if (mask & Player2.SAY) {
            out.pjstr(player.chat ?? '');
        }
        if (mask & Player2.DAMAGE) {
            out.p1(player.damageTaken);
            out.p1(player.damageType);
            out.p1(player.levels[PlayerStat_default.HITPOINTS]);
            out.p1(player.baseLevels[PlayerStat_default.HITPOINTS]);
        }
        if (mask & Player2.FACE_COORD) {
            if (player.faceX !== -1) {
                player.alreadyFacedCoord = true;
            }
            if (newlyObserved && player.faceX !== -1) {
                out.p2(player.faceX);
                out.p2(player.faceZ);
            } else if (newlyObserved && player.orientation !== -1) {
                const faceX = Position.moveX(player.x, player.orientation);
                const faceZ = Position.moveZ(player.z, player.orientation);
                out.p2(faceX * 2 + 1);
                out.p2(faceZ * 2 + 1);
            } else {
                out.p2(player.faceX);
                out.p2(player.faceZ);
            }
        }
        if (mask & Player2.CHAT) {
            out.p1(player.messageColor);
            out.p1(player.messageEffect);
            out.p1(player.messageType);
            out.p1(player.message.length);
            out.pdata(player.message, 0, player.message.length);
        }
        if (mask & Player2.SPOTANIM) {
            out.p2(player.graphicId);
            out.p2(player.graphicHeight);
            out.p2(player.graphicDelay);
        }
        if (mask & Player2.EXACT_MOVE) {
            out.p1(player.exactStartX - Position.zoneOrigin(message.originX));
            out.p1(player.exactStartZ - Position.zoneOrigin(message.originZ));
            out.p1(player.exactEndX - Position.zoneOrigin(message.originX));
            out.p1(player.exactEndZ - Position.zoneOrigin(message.originZ));
            out.p2(player.exactMoveStart);
            out.p2(player.exactMoveEnd);
            out.p1(player.exactMoveDirection);
        }
    }
    calculateUpdateSize(player, message, self2 = false, newlyObserved = false) {
        let length = 0;
        let mask = player.mask;
        if (newlyObserved) {
            mask |= Player2.APPEARANCE;
        }
        if (newlyObserved && (player.orientation !== -1 || player.faceX !== -1 || player.faceZ !== -1)) {
            mask |= Player2.FACE_COORD;
        }
        if (newlyObserved && player.faceEntity !== -1) {
            mask |= Player2.FACE_ENTITY;
        }
        if (mask > 255) {
            mask |= Player2.BIG_UPDATE;
        }
        if (self2 && mask & Player2.CHAT) {
            mask &= ~Player2.CHAT;
        }
        if (message.buildArea.hasAppearance(player.pid, player.appearanceHashCode)) {
            mask &= ~Player2.APPEARANCE;
        }
        length += 1;
        if (mask & Player2.BIG_UPDATE) {
            length += 1;
        }
        if (mask & Player2.APPEARANCE) {
            length += 1;
            length += player.appearance?.length ?? 0;
        }
        if (mask & Player2.ANIM) {
            length += 3;
        }
        if (mask & Player2.FACE_ENTITY) {
            length += 2;
        }
        if (mask & Player2.SAY) {
            length += (player.chat?.length ?? 0) + 1;
        }
        if (mask & Player2.DAMAGE) {
            length += 4;
        }
        if (mask & Player2.FACE_COORD) {
            length += 4;
        }
        if (mask & Player2.CHAT) {
            length += 4;
            length += player.message?.length ?? 0;
        }
        if (mask & Player2.SPOTANIM) {
            length += 6;
        }
        if (mask & Player2.EXACT_MOVE) {
            length += 9;
        }
        return length;
    }
}

// src/lostcity/network/outgoing/model/RebuildNormal.ts
class RebuildNormal extends OutgoingMessage {
    zoneX;
    zoneZ;
    priority = ServerProtPriority.HIGH;
    constructor(zoneX, zoneZ) {
        super();
        this.zoneX = zoneX;
        this.zoneZ = zoneZ;
    }
    get mapsquares() {
        const minX = this.zoneX - 6;
        const maxX = this.zoneX + 6;
        const minZ = this.zoneZ - 6;
        const maxZ = this.zoneZ + 6;
        const result = new Set();
        for (let x = minX; x <= maxX; x++) {
            const mx = Position.mapsquare(x << 3);
            for (let z2 = minZ; z2 <= maxZ; z2++) {
                const mz = Position.mapsquare(z2 << 3);
                result.add((mx << 8) | mz);
            }
        }
        return result;
    }
}

// src/lostcity/network/225/outgoing/codec/RebuildNormalEncoder.ts
class RebuildNormalEncoder extends MessageEncoder {
    prot = ServerProt.REBUILD_NORMAL;
    encode(buf, message) {
        buf.p2(message.zoneX);
        buf.p2(message.zoneZ);
        for (const packed of message.mapsquares) {
            const x = packed >> 8;
            const z2 = packed & 255;
            buf.p1(x);
            buf.p1(z2);
            buf.p4(PRELOADED_CRC.get(`m${x}_${z2}`) ?? 0);
            buf.p4(PRELOADED_CRC.get(`l${x}_${z2}`) ?? 0);
        }
    }
    test(message) {
        return 2 + 2 + message.mapsquares.size * (1 + 1 + 4 + 4);
    }
}

// src/lostcity/network/outgoing/model/DataLand.ts
class DataLand extends OutgoingMessage {
    x;
    z2;
    offset;
    length;
    data;
    priority = ServerProtPriority.HIGH;
    constructor(x, z2, offset, length, data) {
        super();
        this.x = x;
        this.z = z2;
        this.offset = offset;
        this.length = length;
        this.data = data;
    }
}

// src/lostcity/network/225/outgoing/codec/DataLandEncoder.ts
class DataLandEncoder extends MessageEncoder {
    prot = ServerProt.DATA_LAND;
    encode(buf, message) {
        buf.p1(message.x);
        buf.p1(message.z);
        buf.p2(message.offset);
        buf.p2(message.length);
        buf.pdata(message.data, 0, message.data.length);
    }
    test(message) {
        return 1 + 1 + 2 + 2 + message.data.length;
    }
}

// src/lostcity/network/outgoing/model/DataLandDone.ts
class DataLandDone extends OutgoingMessage {
    x;
    z2;
    priority = ServerProtPriority.HIGH;
    constructor(x, z2) {
        super();
        this.x = x;
        this.z = z2;
    }
}

// src/lostcity/network/225/outgoing/codec/DataLandDoneEncoder.ts
class DataLandDoneEncoder extends MessageEncoder {
    prot = ServerProt.DATA_LAND_DONE;
    encode(buf, message) {
        buf.p1(message.x);
        buf.p1(message.z);
    }
}

// src/lostcity/network/outgoing/model/DataLoc.ts
class DataLoc extends OutgoingMessage {
    x;
    z2;
    offset;
    length;
    data;
    priority = ServerProtPriority.HIGH;
    constructor(x, z2, offset, length, data) {
        super();
        this.x = x;
        this.z = z2;
        this.offset = offset;
        this.length = length;
        this.data = data;
    }
}

// src/lostcity/network/225/outgoing/codec/DataLocEncoder.ts
class DataLocEncoder extends MessageEncoder {
    prot = ServerProt.DATA_LOC;
    encode(buf, message) {
        buf.p1(message.x);
        buf.p1(message.z);
        buf.p2(message.offset);
        buf.p2(message.length);
        buf.pdata(message.data, 0, message.data.length);
    }
    test(message) {
        return 1 + 1 + 2 + 2 + message.data.length;
    }
}

// src/lostcity/network/outgoing/model/DataLocDone.ts
class DataLocDone extends OutgoingMessage {
    x;
    z2;
    priority = ServerProtPriority.HIGH;
    constructor(x, z2) {
        super();
        this.x = x;
        this.z = z2;
    }
}

// src/lostcity/network/225/outgoing/codec/DataLocDoneEncoder.ts
class DataLocDoneEncoder extends MessageEncoder {
    prot = ServerProt.DATA_LOC_DONE;
    encode(buf, message) {
        buf.p1(message.x);
        buf.p1(message.z);
    }
}

// src/lostcity/network/outgoing/model/CamLookAt.ts
class CamLookAt extends OutgoingMessage {
    x;
    z2;
    height;
    speed;
    multiplier;
    priority = ServerProtPriority.LOW;
    constructor(x, z2, height, speed, multiplier) {
        super();
        this.x = x;
        this.z = z2;
        this.height = height;
        this.speed = speed;
        this.multiplier = multiplier;
    }
}

// src/lostcity/network/225/outgoing/codec/CamLookAtEncoder.ts
class CamLookAtEncoder extends MessageEncoder {
    prot = ServerProt.CAM_LOOKAT;
    encode(buf, message) {
        buf.p1(message.x);
        buf.p1(message.z);
        buf.p2(message.height);
        buf.p1(message.speed);
        buf.p1(message.multiplier);
    }
}

// src/lostcity/network/outgoing/model/CamMoveTo.ts
class CamMoveTo extends OutgoingMessage {
    x;
    z2;
    height;
    speed;
    multiplier;
    priority = ServerProtPriority.LOW;
    constructor(x, z2, height, speed, multiplier) {
        super();
        this.x = x;
        this.z = z2;
        this.height = height;
        this.speed = speed;
        this.multiplier = multiplier;
    }
}

// src/lostcity/network/225/outgoing/codec/CamMoveToEncoder.ts
class CamMoveToEncoder extends MessageEncoder {
    prot = ServerProt.CAM_MOVETO;
    encode(buf, message) {
        buf.p1(message.x);
        buf.p1(message.z);
        buf.p2(message.height);
        buf.p1(message.speed);
        buf.p1(message.multiplier);
    }
}

// src/lostcity/network/outgoing/model/CamReset.ts
class CamReset extends OutgoingMessage {
    priority = ServerProtPriority.LOW;
}

// src/lostcity/network/225/outgoing/codec/CamResetEncoder.ts
class CamResetEncoder extends MessageEncoder {
    prot = ServerProt.CAM_RESET;
    encode(_2, __) {}
}

// src/lostcity/network/outgoing/model/CamShake.ts
class CamShake extends OutgoingMessage {
    type;
    jitter;
    amplitude;
    frequency;
    priority = ServerProtPriority.LOW;
    constructor(type, jitter, amplitude, frequency) {
        super();
        this.type = type;
        this.jitter = jitter;
        this.amplitude = amplitude;
        this.frequency = frequency;
    }
}

// src/lostcity/network/225/outgoing/codec/CamShakeEncoder.ts
class CamShakeEncoder extends MessageEncoder {
    prot = ServerProt.CAM_SHAKE;
    encode(buf, message) {
        buf.p1(message.type);
        buf.p1(message.jitter);
        buf.p1(message.amplitude);
        buf.p1(message.frequency);
    }
}

// src/lostcity/network/outgoing/model/ChatFilterSettings.ts
class ChatFilterSettings extends OutgoingMessage {
    publicChat;
    privateChat;
    tradeDuel;
    priority = ServerProtPriority.HIGH;
    constructor(publicChat, privateChat, tradeDuel) {
        super();
        this.publicChat = publicChat;
        this.privateChat = privateChat;
        this.tradeDuel = tradeDuel;
    }
}

// src/lostcity/network/225/outgoing/codec/ChatFilterSettingsEncoder.ts
class ChatFilterSettingsEncoder extends MessageEncoder {
    prot = ServerProt.CHAT_FILTER_SETTINGS;
    encode(buf, message) {
        buf.p1(message.publicChat);
        buf.p1(message.privateChat);
        buf.p1(message.tradeDuel);
    }
}

// src/lostcity/network/outgoing/model/EnableTracking.ts
class EnableTracking extends OutgoingMessage {
    priority = ServerProtPriority.LOW;
}

// src/lostcity/network/225/outgoing/codec/EnableTrackingEncoder.ts
class EnableTrackingEncoder extends MessageEncoder {
    prot = ServerProt.ENABLE_TRACKING;
    encode(_2, __) {}
}

// src/lostcity/network/outgoing/model/FinishTracking.ts
class FinishTracking extends OutgoingMessage {
    priority = ServerProtPriority.LOW;
}

// src/lostcity/network/225/outgoing/codec/FinishTrackingEncoder.ts
class FinishTrackingEncoder extends MessageEncoder {
    prot = ServerProt.FINISH_TRACKING;
    encode(_2, __) {}
}

// src/lostcity/network/225/outgoing/codec/HintArrowEncoder.ts
class HintArrowEncoder extends MessageEncoder {
    prot = ServerProt.HINT_ARROW;
    encode(buf, message) {
        const {type, nid, pid, x, z: z2, y: y2} = message;
        if (type === 1) {
            buf.p1(type);
            buf.p2(nid);
            buf.p2(0);
            buf.p1(0);
        } else if (type >= 2 && type <= 6) {
            buf.p1(type);
            buf.p2(x);
            buf.p2(z2);
            buf.p1(y2);
        } else if (type === 10) {
            buf.p1(type);
            buf.p2(pid);
            buf.p2(0);
            buf.p1(0);
        } else if (type === -1) {
            buf.p1(-1);
            buf.p2(0);
            buf.p2(0);
            buf.p1(0);
        }
    }
}

// src/lostcity/network/225/outgoing/codec/IfCloseEncoder.ts
class IfCloseEncoder extends MessageEncoder {
    prot = ServerProt.IF_CLOSE;
    encode(_2, __) {}
}

// src/lostcity/network/outgoing/model/IfOpenMainModal.ts
class IfOpenMainModal extends OutgoingMessage {
    component;
    priority = ServerProtPriority.LOW;
    constructor(component) {
        super();
        this.component = component;
    }
}

// src/lostcity/network/225/outgoing/codec/IfOpenMainModalEncoder.ts
class IfOpenMainModalEncoder extends MessageEncoder {
    prot = ServerProt.IF_OPENMAINMODAL;
    encode(buf, message) {
        buf.p2(message.component);
    }
}

// src/lostcity/network/outgoing/model/IfOpenMainSideModal.ts
class IfOpenMainSideModal extends OutgoingMessage {
    main;
    side;
    priority = ServerProtPriority.LOW;
    constructor(main, side) {
        super();
        this.main = main;
        this.side = side;
    }
}

// src/lostcity/network/225/outgoing/codec/IfOpenMainSideModalEncoder.ts
class IfOpenMainSideModalEncoder extends MessageEncoder {
    prot = ServerProt.IF_OPENMAINSIDEMODAL;
    encode(buf, message) {
        buf.p2(message.main);
        buf.p2(message.side);
    }
}

// src/lostcity/network/outgoing/model/IfOpenSideModal.ts
class IfOpenSideModal extends OutgoingMessage {
    component;
    priority = ServerProtPriority.LOW;
    constructor(component) {
        super();
        this.component = component;
    }
}

// src/lostcity/network/225/outgoing/codec/IfOpenSideModalEncoder.ts
class IfOpenSideModalEncoder extends MessageEncoder {
    prot = ServerProt.IF_OPENSIDEMODAL;
    encode(buf, message) {
        buf.p2(message.component);
    }
}

// src/lostcity/network/225/outgoing/codec/IfOpenSideOverlayEncoder.ts
class IfOpenSideOverlayEncoder extends MessageEncoder {
    prot = ServerProt.IF_OPENSIDEOVERLAY;
    encode(buf, message) {
        buf.p2(message.component);
        buf.p1(message.tab);
    }
}

// src/lostcity/network/outgoing/model/IfSetAnim.ts
class IfSetAnim extends OutgoingMessage {
    component;
    seq;
    priority = ServerProtPriority.LOW;
    constructor(component, seq) {
        super();
        this.component = component;
        this.seq = seq;
    }
}

// src/lostcity/network/225/outgoing/codec/IfSetAnimEncoder.ts
class IfSetAnimEncoder extends MessageEncoder {
    prot = ServerProt.IF_SETANIM;
    encode(buf, message) {
        buf.p2(message.component);
        buf.p2(message.seq);
    }
}

// src/lostcity/network/outgoing/model/IfSetColour.ts
class IfSetColour extends OutgoingMessage {
    component;
    colour;
    priority = ServerProtPriority.LOW;
    constructor(component, colour) {
        super();
        this.component = component;
        this.colour = colour;
    }
}

// src/lostcity/network/225/outgoing/codec/IfSetColourEncoder.ts
class IfSetColourEncoder extends MessageEncoder {
    prot = ServerProt.IF_SETCOLOUR;
    encode(buf, message) {
        buf.p2(message.component);
        buf.p2(message.colour);
    }
}

// src/lostcity/network/outgoing/model/IfSetHide.ts
class IfSetHide extends OutgoingMessage {
    component;
    hidden;
    priority = ServerProtPriority.LOW;
    constructor(component, hidden) {
        super();
        this.component = component;
        this.hidden = hidden;
    }
}

// src/lostcity/network/225/outgoing/codec/IfSetHideEncoder.ts
class IfSetHideEncoder extends MessageEncoder {
    prot = ServerProt.IF_SETHIDE;
    encode(buf, message) {
        buf.p2(message.component);
        buf.pbool(message.hidden);
    }
}

// src/lostcity/network/outgoing/model/IfSetModel.ts
class IfSetModel extends OutgoingMessage {
    component;
    model;
    priority = ServerProtPriority.LOW;
    constructor(component, model) {
        super();
        this.component = component;
        this.model = model;
    }
}

// src/lostcity/network/225/outgoing/codec/IfSetModelEncoder.ts
class IfSetModelEncoder extends MessageEncoder {
    prot = ServerProt.IF_SETMODEL;
    encode(buf, message) {
        buf.p2(message.component);
        buf.p2(message.model);
    }
}

// src/lostcity/network/outgoing/model/IfSetNpcHead.ts
class IfSetNpcHead extends OutgoingMessage {
    component;
    npc;
    priority = ServerProtPriority.LOW;
    constructor(component, npc) {
        super();
        this.component = component;
        this.npc = npc;
    }
}

// src/lostcity/network/225/outgoing/codec/IfSetNpcHeadEncoder.ts
class IfSetNpcHeadEncoder extends MessageEncoder {
    prot = ServerProt.IF_SETNPCHEAD;
    encode(buf, message) {
        buf.p2(message.component);
        buf.p2(message.npc);
    }
}

// src/lostcity/network/outgoing/model/IfSetObject.ts
class IfSetObject extends OutgoingMessage {
    component;
    obj;
    scale;
    priority = ServerProtPriority.LOW;
    constructor(component, obj, scale) {
        super();
        this.component = component;
        this.obj = obj;
        this.scale = scale;
    }
}

// src/lostcity/network/225/outgoing/codec/IfSetObjectEncoder.ts
class IfSetObjectEncoder extends MessageEncoder {
    prot = ServerProt.IF_SETOBJECT;
    encode(buf, message) {
        buf.p2(message.component);
        buf.p2(message.obj);
        buf.p2(message.scale);
    }
}

// src/lostcity/network/outgoing/model/IfSetPlayerHead.ts
class IfSetPlayerHead extends OutgoingMessage {
    component;
    priority = ServerProtPriority.LOW;
    constructor(component) {
        super();
        this.component = component;
    }
}

// src/lostcity/network/225/outgoing/codec/IfSetPlayerHeadEncoder.ts
class IfSetPlayerHeadEncoder extends MessageEncoder {
    prot = ServerProt.IF_SETPLAYERHEAD;
    encode(buf, message) {
        buf.p2(message.component);
    }
}

// src/lostcity/network/outgoing/model/IfSetPosition.ts
class IfSetPosition extends OutgoingMessage {
    component;
    x;
    y2;
    priority = ServerProtPriority.LOW;
    constructor(component, x, y2) {
        super();
        this.component = component;
        this.x = x;
        this.y = y2;
    }
}

// src/lostcity/network/225/outgoing/codec/IfSetPositionEncoder.ts
class IfSetPositionEncoder extends MessageEncoder {
    prot = ServerProt.IF_SETPOSITION;
    encode(buf, message) {
        buf.p2(message.component);
        buf.p2(message.x);
        buf.p2(message.y);
    }
}

// src/lostcity/network/outgoing/model/IfSetRecol.ts
class IfSetRecol extends OutgoingMessage {
    component;
    src;
    dst;
    priority = ServerProtPriority.LOW;
    constructor(component, src, dst) {
        super();
        this.component = component;
        this.src = src;
        this.dst = dst;
    }
}

// src/lostcity/network/225/outgoing/codec/IfSetRecolEncoder.ts
class IfSetRecolEncoder extends MessageEncoder {
    prot = ServerProt.IF_SETRECOL;
    encode(buf, message) {
        buf.p2(message.component);
        buf.p2(message.src);
        buf.p2(message.dst);
    }
}

// src/lostcity/network/outgoing/model/IfSetText.ts
class IfSetText extends OutgoingMessage {
    component;
    text;
    priority = ServerProtPriority.LOW;
    constructor(component, text) {
        super();
        this.component = component;
        this.text = text;
    }
}

// src/lostcity/network/225/outgoing/codec/IfSetTextEncoder.ts
class IfSetTextEncoder extends MessageEncoder {
    prot = ServerProt.IF_SETTEXT;
    encode(buf, message) {
        buf.p2(message.component);
        buf.pjstr(message.text);
    }
    test(message) {
        return 2 + 1 + message.text.length;
    }
}

// src/lostcity/network/outgoing/model/IfShowSide.ts
class IfShowSide extends OutgoingMessage {
    tab;
    priority = ServerProtPriority.LOW;
    constructor(tab) {
        super();
        this.tab = tab;
    }
}

// src/lostcity/network/225/outgoing/codec/IfShowSideEncoder.ts
class IfShowSideEncoder extends MessageEncoder {
    prot = ServerProt.IF_SHOWSIDE;
    encode(buf, message) {
        buf.p1(message.tab);
    }
}

// src/lostcity/network/225/outgoing/codec/LastLoginInfoEncoder.ts
class LastLoginInfoEncoder extends MessageEncoder {
    prot = ServerProt.LAST_LOGIN_INFO;
    encode(buf, message) {
        buf.p4(message.lastLoginIp);
        buf.p2(message.daysSinceLogin);
        buf.p1(message.daysSinceRecoveryChange);
        buf.p2(message.unreadMessageCount);
    }
}

// src/lostcity/network/225/outgoing/prot/ZoneProt.ts
class ZoneProt extends ServerProt {
    static LOC_MERGE = new ZoneProt(23, 14);
    static LOC_ANIM = new ZoneProt(42, 4);
    static OBJ_DEL = new ZoneProt(49, 3);
    static OBJ_REVEAL = new ZoneProt(50, 7);
    static LOC_ADD_CHANGE = new ZoneProt(59, 4);
    static MAP_PROJANIM = new ZoneProt(69, 15);
    static LOC_DEL = new ZoneProt(76, 2);
    static OBJ_COUNT = new ZoneProt(151, 7);
    static MAP_ANIM = new ZoneProt(191, 6);
    static OBJ_ADD = new ZoneProt(223, 5);
}

// src/lostcity/network/outgoing/codec/ZoneMessageEncoder.ts
class ZoneMessageEncoder extends MessageEncoder {
    enclose(message) {
        const buf = new Packet(new Uint8Array(1 + this.prot.length));
        buf.p1(this.prot.id);
        this.encode(buf, message);
        return buf.data;
    }
}

// src/lostcity/network/225/outgoing/codec/LocAddChangeEncoder.ts
class LocAddChangeEncoder extends ZoneMessageEncoder {
    prot = ZoneProt.LOC_ADD_CHANGE;
    encode(buf, message) {
        buf.p1(message.coord);
        buf.p1((message.shape << 2) | (message.angle & 3));
        buf.p2(message.loc);
    }
}

// src/lostcity/network/225/outgoing/codec/LocAnimEncoder.ts
class LocAnimEncoder extends ZoneMessageEncoder {
    prot = ZoneProt.LOC_ANIM;
    encode(buf, message) {
        buf.p1(message.coord);
        buf.p1((message.shape << 2) | (message.angle & 3));
        buf.p2(message.seq);
    }
}

// src/lostcity/network/225/outgoing/codec/LocDelEncoder.ts
class LocDelEncoder extends ZoneMessageEncoder {
    prot = ZoneProt.LOC_DEL;
    encode(buf, message) {
        buf.p1(message.coord);
        buf.p1((message.shape << 2) | (message.angle & 3));
    }
}

// src/lostcity/network/225/outgoing/codec/LocMergeEncoder.ts
class LocMergeEncoder extends ZoneMessageEncoder {
    prot = ZoneProt.LOC_MERGE;
    encode(buf, message) {
        buf.p1(message.coord);
        buf.p1((message.shape << 2) | (message.angle & 3));
        buf.p2(message.locId);
        buf.p2(message.startCycle);
        buf.p2(message.endCycle);
        buf.p2(message.pid);
        buf.p1(message.east - message.srcX);
        buf.p1(message.south - message.srcZ);
        buf.p1(message.west - message.srcX);
        buf.p1(message.north - message.srcZ);
    }
}

// src/lostcity/network/outgoing/model/Logout.ts
class Logout extends OutgoingMessage {
    priority = ServerProtPriority.HIGH;
}

// src/lostcity/network/225/outgoing/codec/LogoutEncoder.ts
class LogoutEncoder extends MessageEncoder {
    prot = ServerProt.LOGOUT;
    encode(_2, __) {}
}

// src/lostcity/network/225/outgoing/codec/MapAnimEncoder.ts
class MapAnimEncoder extends ZoneMessageEncoder {
    prot = ZoneProt.MAP_ANIM;
    encode(buf, message) {
        buf.p1(message.coord);
        buf.p2(message.spotanim);
        buf.p1(message.height);
        buf.p2(message.delay);
    }
}

// src/lostcity/network/225/outgoing/codec/MapProjAnimEncoder.ts
class MapProjAnimEncoder extends ZoneMessageEncoder {
    prot = ZoneProt.MAP_PROJANIM;
    encode(buf, message) {
        buf.p1(message.coord);
        buf.p1(message.dstX - message.srcX);
        buf.p1(message.dstZ - message.srcZ);
        buf.p2(message.target);
        buf.p2(message.spotanim);
        buf.p1(message.srcHeight);
        buf.p1(message.dstHeight);
        buf.p2(message.startDelay);
        buf.p2(message.endDelay);
        buf.p1(message.peak);
        buf.p1(message.arc);
    }
}

// src/lostcity/network/225/outgoing/codec/MessageGameEncoder.ts
class MessageGameEncoder extends MessageEncoder {
    prot = ServerProt.MESSAGE_GAME;
    encode(buf, message) {
        buf.pjstr(message.msg);
    }
    test(message) {
        return 1 + message.msg.length;
    }
}

// src/jagex2/wordenc/WordPack.ts
class WordPack {
    static CHAR_LOOKUP = [
        ' ',
        'e',
        't',
        'a',
        'o',
        'i',
        'h',
        'n',
        's',
        'r',
        'd',
        'l',
        'u',
        'm',
        'w',
        'c',
        'y',
        'f',
        'g',
        'p',
        'b',
        'v',
        'k',
        'x',
        'j',
        'q',
        'z',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        ' ',
        '!',
        '?',
        '.',
        ',',
        ':',
        ';',
        '(',
        ')',
        '-',
        '&',
        '*',
        '\\',
        "'",
        '@',
        '#',
        '+',
        '=',
        '\xA3',
        '$',
        '%',
        '"',
        '[',
        ']'
    ];
    static unpack(packet, length) {
        const charBuffer = [];
        let pos = 0;
        let carry = -1;
        let nibble;
        for (let i = 0; i < length && pos < 80; i++) {
            const data = packet.g1();
            nibble = (data >> 4) & 15;
            if (carry !== -1) {
                charBuffer[pos++] = this.CHAR_LOOKUP[(carry << 4) + nibble - 195];
                carry = -1;
            } else if (nibble < 13) {
                charBuffer[pos++] = this.CHAR_LOOKUP[nibble];
            } else {
                carry = nibble;
            }
            nibble = data & 15;
            if (carry != -1) {
                charBuffer[pos++] = this.CHAR_LOOKUP[(carry << 4) + nibble - 195];
                carry = -1;
            } else if (nibble < 13) {
                charBuffer[pos++] = this.CHAR_LOOKUP[nibble];
            } else {
                carry = nibble;
            }
        }
        return this.toSentenceCase(charBuffer.slice(0, pos).join(''));
    }
    static pack(packet, input) {
        if (input.length > 80) {
            input = input.substring(0, 80);
        }
        input = input.toLowerCase();
        let carry = -1;
        for (let i = 0; i < input.length; i++) {
            const char = input.charAt(i);
            let index = 0;
            for (let j = 0; j < this.CHAR_LOOKUP.length; j++) {
                if (char === this.CHAR_LOOKUP[j]) {
                    index = j;
                    break;
                }
            }
            if (index > 12) {
                index += 195;
            }
            if (carry == -1) {
                if (index < 13) {
                    carry = index;
                } else {
                    packet.p1(index);
                }
            } else if (index < 13) {
                packet.p1((carry << 4) + index);
                carry = -1;
            } else {
                packet.p1((carry << 4) + (index >> 4));
                carry = index & 15;
            }
        }
        if (carry != -1) {
            packet.p1(carry << 4);
        }
    }
    static toSentenceCase(input) {
        const chars = [...input.toLowerCase()];
        let punctuation = true;
        for (let index = 0; index < chars.length; index++) {
            const char = chars[index];
            if (punctuation && char >= 'a' && char <= 'z') {
                chars[index] = char.toUpperCase();
                punctuation = false;
            }
            if (char === '.' || char === '!') {
                punctuation = true;
            }
        }
        return chars.join('');
    }
}

// src/lostcity/network/225/outgoing/codec/MessagePrivateEncoder.ts
class MessagePrivateEncoder extends MessageEncoder {
    prot = ServerProt.MESSAGE_PRIVATE;
    encode(buf, message) {
        buf.p8(message.from);
        buf.p4(message.messageId);
        buf.p1(message.staffModLevel);
        WordPack.pack(buf, WordEnc2.filter(message.msg));
    }
    test(message) {
        return 8 + 4 + 1 + 1 + message.msg.length;
    }
}

// src/lostcity/network/outgoing/model/MessagePrivate.ts
class MessagePrivate extends OutgoingMessage {
    from;
    messageId;
    staffModLevel;
    msg;
    priority = ServerProtPriority.HIGH;
    constructor(from, messageId, staffModLevel, msg) {
        super();
        this.from = from;
        this.messageId = messageId;
        this.staffModLevel = staffModLevel;
        this.msg = msg;
    }
}

// src/lostcity/network/225/outgoing/codec/MidiJingleEncoder.ts
class MidiJingleEncoder extends MessageEncoder {
    prot = ServerProt.MIDI_JINGLE;
    encode(buf, message) {
        buf.p2(message.delay);
        buf.p4(message.data.length);
        buf.pdata(message.data, 0, message.data.length);
    }
    test(message) {
        return 2 + 4 + message.data.length;
    }
}

// src/lostcity/network/225/outgoing/codec/MidiSongEncoder.ts
class MidiSongEncoder extends MessageEncoder {
    prot = ServerProt.MIDI_SONG;
    encode(buf, message) {
        buf.pjstr(message.name);
        buf.p4(message.crc);
        buf.p4(message.length);
    }
    test(message) {
        return 1 + message.name.length + 4 + 4;
    }
}

// src/lostcity/network/225/outgoing/codec/ObjAddEncoder.ts
class ObjAddEncoder extends ZoneMessageEncoder {
    prot = ZoneProt.OBJ_ADD;
    encode(buf, message) {
        buf.p1(message.coord);
        buf.p2(message.obj);
        buf.p2(Math.min(message.count, 65535));
    }
}

// src/lostcity/network/225/outgoing/codec/ObjCountEncoder.ts
class ObjCountEncoder extends ZoneMessageEncoder {
    prot = ZoneProt.OBJ_COUNT;
    encode(buf, message) {
        buf.p1(message.coord);
        buf.p2(message.obj);
        buf.p2(Math.min(message.oldCount, 65535));
        buf.p2(Math.min(message.newCount, 65535));
    }
}

// src/lostcity/network/225/outgoing/codec/ObjDelEncoder.ts
class ObjDelEncoder extends ZoneMessageEncoder {
    prot = ZoneProt.OBJ_DEL;
    encode(buf, message) {
        buf.p1(message.coord);
        buf.p2(message.obj);
    }
}

// src/lostcity/network/225/outgoing/codec/ObjRevealEncoder.ts
class ObjRevealEncoder extends ZoneMessageEncoder {
    prot = ZoneProt.OBJ_REVEAL;
    encode(buf, message) {
        buf.p1(message.coord);
        buf.p2(message.obj);
        buf.p2(Math.min(message.count, 65535));
        buf.p2(message.receiverId);
    }
}

// src/lostcity/network/outgoing/model/PCountDialog.ts
class PCountDialog extends OutgoingMessage {
    priority = ServerProtPriority.LOW;
}

// src/lostcity/network/225/outgoing/codec/PCountDialogEncoder.ts
class PCountDialogEncoder extends MessageEncoder {
    prot = ServerProt.P_COUNTDIALOG;
    encode(_2, __) {}
}

// src/lostcity/network/225/outgoing/codec/ResetAnimsEncoder.ts
class ResetAnimsEncoder extends MessageEncoder {
    prot = ServerProt.RESET_ANIMS;
    encode(_2, __) {}
}

// src/lostcity/network/225/outgoing/codec/ResetClientVarCacheEncoder.ts
class ResetClientVarCacheEncoder extends MessageEncoder {
    prot = ServerProt.RESET_CLIENT_VARCACHE;
    encode(_2, __) {}
}

// src/lostcity/network/outgoing/model/SetMultiway.ts
class SetMultiway extends OutgoingMessage {
    hidden;
    priority = ServerProtPriority.LOW;
    constructor(hidden) {
        super();
        this.hidden = hidden;
    }
}

// src/lostcity/network/225/outgoing/codec/SetMultiwayEncoder.ts
class SetMultiwayEncoder extends MessageEncoder {
    prot = ServerProt.SET_MULTIWAY;
    encode(buf, message) {
        buf.pbool(message.hidden);
    }
}

// src/lostcity/network/outgoing/model/SynthSound.ts
class SynthSound extends OutgoingMessage {
    synth;
    loops;
    delay;
    priority = ServerProtPriority.LOW;
    constructor(synth, loops, delay) {
        super();
        this.synth = synth;
        this.loops = loops;
        this.delay = delay;
    }
}

// src/lostcity/network/225/outgoing/codec/SynthSoundEncoder.ts
class SynthSoundEncoder extends MessageEncoder {
    prot = ServerProt.SYNTH_SOUND;
    encode(buf, message) {
        buf.p2(message.synth);
        buf.p1(message.loops);
        buf.p2(message.delay);
    }
}

// src/lostcity/network/outgoing/model/TutorialFlashSide.ts
class TutorialFlashSide extends OutgoingMessage {
    tab;
    priority = ServerProtPriority.LOW;
    constructor(tab) {
        super();
        this.tab = tab;
    }
}

// src/lostcity/network/225/outgoing/codec/TutorialFlashSideEncoder.ts
class TutorialFlashSideEncoder extends MessageEncoder {
    prot = ServerProt.TUTORIAL_FLASHSIDE;
    encode(buf, message) {
        buf.p1(message.tab);
    }
}

// src/lostcity/network/225/outgoing/codec/TutorialOpenChatEncoder.ts
class TutorialOpenChatEncoder extends MessageEncoder {
    prot = ServerProt.TUTORIAL_OPENCHAT;
    encode(buf, message) {
        buf.p2(message.component);
    }
}

// src/lostcity/network/225/outgoing/codec/UnsetMapFlagEncoder.ts
class UnsetMapFlagEncoder extends MessageEncoder {
    prot = ServerProt.UNSET_MAP_FLAG;
    encode(_2, __) {}
}

// src/lostcity/network/outgoing/model/UpdateFriendList.ts
class UpdateFriendList extends OutgoingMessage {
    name;
    nodeId;
    priority = ServerProtPriority.LOW;
    constructor(name, nodeId) {
        super();
        this.name = name;
        this.nodeId = nodeId;
    }
}

// src/lostcity/network/225/outgoing/codec/UpdateFriendListEncoder.ts
class UpdateFriendListEncoder extends MessageEncoder {
    prot = ServerProt.UPDATE_FRIENDLIST;
    encode(buf, message) {
        buf.p8(message.name);
        buf.p1(message.nodeId);
    }
}

// src/lostcity/network/outgoing/model/UpdateIgnoreList.ts
class UpdateIgnoreList extends OutgoingMessage {
    names;
    priority = ServerProtPriority.LOW;
    constructor(names) {
        super();
        this.names = names;
    }
}

// src/lostcity/network/225/outgoing/codec/UpdateIgnoreListEncoder.ts
class UpdateIgnoreListEncoder extends MessageEncoder {
    prot = ServerProt.UPDATE_IGNORELIST;
    encode(buf, message) {
        for (const name of message.names) {
            buf.p8(name);
        }
    }
    test(message) {
        return 8 * message.names.length;
    }
}

// src/lostcity/network/outgoing/model/UpdateInvFull.ts
class UpdateInvFull extends OutgoingMessage {
    component;
    inv;
    priority = ServerProtPriority.HIGH;
    constructor(component, inv) {
        super();
        this.component = component;
        this.inv = inv;
    }
}

// src/lostcity/network/225/outgoing/codec/UpdateInvFullEncoder.ts
class UpdateInvFullEncoder extends MessageEncoder {
    prot = ServerProt.UPDATE_INV_FULL;
    encode(buf, message) {
        const {component, inv} = message;
        const comType = Component.get(component);
        const size = Math.min(inv.capacity, comType.width * comType.height);
        buf.p2(component);
        buf.p1(size);
        for (let slot = 0; slot < size; slot++) {
            const obj = inv.get(slot);
            if (obj) {
                buf.p2(obj.id + 1);
                if (obj.count >= 255) {
                    buf.p1(255);
                    buf.p4(obj.count);
                } else {
                    buf.p1(obj.count);
                }
            } else {
                buf.p2(0);
                buf.p1(0);
            }
        }
    }
    test(message) {
        const {component, inv} = message;
        const comType = Component.get(component);
        const size = Math.min(inv.capacity, comType.width * comType.height);
        let length = 0;
        length += 3;
        for (let slot = 0; slot < size; slot++) {
            const obj = inv.get(slot);
            if (obj) {
                length += 2;
                if (obj.count >= 255) {
                    length += 5;
                } else {
                    length += 1;
                }
            } else {
                length += 3;
            }
        }
        return length;
    }
}

// src/lostcity/network/outgoing/model/UpdateInvPartial.ts
class UpdateInvPartial extends OutgoingMessage {
    component;
    inv;
    priority = ServerProtPriority.HIGH;
    slots;
    constructor(component, inv, ...slots) {
        super();
        this.component = component;
        this.inv = inv;
        this.slots = slots;
    }
}

// src/lostcity/network/225/outgoing/codec/UpdateInvPartialEncoder.ts
class UpdateInvPartialEncoder extends MessageEncoder {
    prot = ServerProt.UPDATE_INV_PARTIAL;
    encode(buf, message) {
        const {component, inv} = message;
        buf.p2(component);
        for (const slot of message.slots) {
            const obj = inv.get(slot);
            buf.p1(slot);
            if (obj) {
                buf.p2(obj.id + 1);
                if (obj.count >= 255) {
                    buf.p1(255);
                    buf.p4(obj.count);
                } else {
                    buf.p1(obj.count);
                }
            } else {
                buf.p2(0);
                buf.p1(0);
            }
        }
    }
    test(message) {
        const {inv} = message;
        let length = 0;
        length += 2;
        for (const slot of message.slots) {
            const obj = inv.get(slot);
            length += 1;
            if (obj) {
                length += 2;
                if (obj.count >= 255) {
                    length += 5;
                } else {
                    length += 1;
                }
            } else {
                length += 3;
            }
        }
        return length;
    }
}

// src/lostcity/network/225/outgoing/codec/UpdateInvStopTransmitEncoder.ts
class UpdateInvStopTransmitEncoder extends MessageEncoder {
    prot = ServerProt.UPDATE_INV_STOP_TRANSMIT;
    encode(buf, message) {
        buf.p2(message.component);
    }
}

// src/lostcity/network/outgoing/model/UpdateRunEnergy.ts
class UpdateRunEnergy extends OutgoingMessage {
    energy;
    priority = ServerProtPriority.LOW;
    constructor(energy) {
        super();
        this.energy = energy;
    }
}

// src/lostcity/network/225/outgoing/codec/UpdateRunEnergyEncoder.ts
class UpdateRunEnergyEncoder extends MessageEncoder {
    prot = ServerProt.UPDATE_RUNENERGY;
    encode(buf, message) {
        buf.p1((message.energy / 100) | 0);
    }
}

// src/lostcity/network/outgoing/model/UpdateRunWeight.ts
class UpdateRunWeight extends OutgoingMessage {
    kg;
    priority = ServerProtPriority.LOW;
    constructor(kg) {
        super();
        this.kg = kg;
    }
}

// src/lostcity/network/225/outgoing/codec/UpdateRunWeightEncoder.ts
class UpdateRunWeightEncoder extends MessageEncoder {
    prot = ServerProt.UPDATE_RUNWEIGHT;
    encode(buf, message) {
        buf.p2(message.kg);
    }
}

// src/lostcity/network/outgoing/model/UpdateStat.ts
class UpdateStat extends OutgoingMessage {
    stat;
    exp;
    level;
    priority = ServerProtPriority.LOW;
    constructor(stat, exp, level) {
        super();
        this.stat = stat;
        this.exp = exp;
        this.level = level;
    }
}

// src/lostcity/network/225/outgoing/codec/UpdateStatEncoder.ts
class UpdateStatEncoder extends MessageEncoder {
    prot = ServerProt.UPDATE_STAT;
    encode(buf, message) {
        buf.p1(message.stat);
        buf.p4((message.exp / 10) | 0);
        buf.p1(message.level);
    }
}

// src/lostcity/network/225/outgoing/codec/UpdateUid192Encoder.ts
class UpdateUid192Encoder extends MessageEncoder {
    prot = ServerProt.UPDATE_UID192;
    encode(buf, message) {
        buf.p2(message.uid);
    }
}

// src/lostcity/network/225/outgoing/codec/UpdateZoneFullFollowsEncoder.ts
class UpdateZoneFullFollowsEncoder extends MessageEncoder {
    prot = ServerProt.UPDATE_ZONE_FULL_FOLLOWS;
    encode(buf, message) {
        buf.p1((message.zoneX << 3) - Position.zoneOrigin(message.originX));
        buf.p1((message.zoneZ << 3) - Position.zoneOrigin(message.originZ));
    }
}

// src/lostcity/network/225/outgoing/codec/UpdateZonePartialFollowsEncoder.ts
class UpdateZonePartialFollowsEncoder extends MessageEncoder {
    prot = ServerProt.UPDATE_ZONE_PARTIAL_FOLLOWS;
    encode(buf, message) {
        buf.p1((message.zoneX << 3) - Position.zoneOrigin(message.originX));
        buf.p1((message.zoneZ << 3) - Position.zoneOrigin(message.originZ));
    }
}

// src/lostcity/network/225/outgoing/codec/UpdateZonePartialEnclosedEncoder.ts
class UpdateZonePartialEnclosedEncoder extends MessageEncoder {
    prot = ServerProt.UPDATE_ZONE_PARTIAL_ENCLOSED;
    encode(buf, message) {
        buf.p1((message.zoneX << 3) - Position.zoneOrigin(message.originX));
        buf.p1((message.zoneZ << 3) - Position.zoneOrigin(message.originZ));
        buf.pdata(message.data, 0, message.data.length);
    }
    test(message) {
        return 1 + 1 + message.data.length;
    }
}

// src/lostcity/network/225/outgoing/codec/VarpLargeEncoder.ts
class VarpLargeEncoder extends MessageEncoder {
    prot = ServerProt.VARP_LARGE;
    encode(buf, message) {
        buf.p2(message.varp);
        buf.p4(message.value);
    }
}

// src/lostcity/network/225/outgoing/codec/VarpSmallEncoder.ts
class VarpSmallEncoder extends MessageEncoder {
    prot = ServerProt.VARP_SMALL;
    encode(buf, message) {
        buf.p2(message.varp);
        buf.p1(message.value);
    }
}

// src/lostcity/network/outgoing/model/NpcInfo.ts
class NpcInfo extends OutgoingMessage {
    buildArea;
    level;
    x;
    z2;
    originX;
    originZ;
    priority = ServerProtPriority.HIGH;
    accumulator = 0;
    constructor(buildArea, level, x, z2, originX, originZ) {
        super();
        this.buildArea = buildArea;
        this.level = level;
        this.x = x;
        this.z = z2;
        this.originX = originX;
        this.originZ = originZ;
    }
}

// src/lostcity/network/225/outgoing/codec/NpcInfoEncoder.ts
class NpcInfoEncoder extends MessageEncoder {
    static BITS_NEW = 13 + 11 + 5 + 5 + 1;
    static BITS_RUN = 2 + 3 + 3 + 1 + 1;
    static BITS_WALK = 2 + 3 + 1 + 1;
    static BITS_EXTENDED = 2 + 1;
    static BYTES_LIMIT = 4997;
    prot = ServerProt.NPC_INFO;
    encode(buf, message) {
        const buildArea = message.buildArea;
        this.writeNpcs(buf, message);
        this.writeNewNpcs(buf, message);
        const extended = buildArea.extendedInfo;
        if (extended.size > 0) {
            for (const info of extended) {
                const npc = World_default.getNpc(info.id);
                if (!npc) {
                    continue;
                }
                this.writeUpdate(npc, buf, info.added);
            }
        }
        buildArea.reset();
    }
    test(_2) {
        return NpcInfoEncoder.BYTES_LIMIT;
    }
    writeNpcs(bitBlock, message) {
        const buildArea = message.buildArea;
        bitBlock.bits();
        bitBlock.pBit(8, buildArea.npcs.size);
        for (const nid of buildArea.npcs) {
            const npc = World_default.getNpc(nid);
            if (!npc || npc.tele || npc.level !== message.level || !Position.isWithinDistanceSW(message, npc, 16) || !npc.checkLifeCycle(World_default.currentTick)) {
                bitBlock.pBit(1, 1);
                bitBlock.pBit(2, 3);
                buildArea.npcs.delete(nid);
                continue;
            }
            let extendedInfo = npc.mask > 0;
            const {walkDir, runDir} = npc;
            let bits = 0;
            if (runDir !== -1) {
                bits = NpcInfoEncoder.BITS_RUN;
            } else if (walkDir !== -1) {
                bits = NpcInfoEncoder.BITS_WALK;
            } else if (extendedInfo) {
                bits = NpcInfoEncoder.BITS_EXTENDED;
            }
            const updateSize = extendedInfo ? this.calculateUpdateSize(npc, false) : 0;
            if (((bitBlock.bitPos + bits + 7 + 24) >>> 3) + bitBlock.pos + (message.accumulator += updateSize) > this.test(message)) {
                extendedInfo = false;
            }
            bitBlock.pBit(1, runDir !== -1 || walkDir !== -1 || extendedInfo ? 1 : 0);
            if (runDir !== -1) {
                bitBlock.pBit(2, 2);
                bitBlock.pBit(3, walkDir);
                bitBlock.pBit(3, runDir);
                bitBlock.pBit(1, extendedInfo ? 1 : 0);
            } else if (walkDir !== -1) {
                bitBlock.pBit(2, 1);
                bitBlock.pBit(3, walkDir);
                bitBlock.pBit(1, extendedInfo ? 1 : 0);
            } else if (extendedInfo) {
                bitBlock.pBit(2, 0);
            }
            if (extendedInfo) {
                buildArea.extendedInfo.add({id: nid, added: false});
            }
        }
    }
    writeNewNpcs(bitBlock, message) {
        const buildArea = message.buildArea;
        for (const npc of buildArea.getNearbyNpcs(message.x, message.z, message.originX, message.originZ)) {
            const extendedInfo = npc.mask > 0 || npc.orientation !== -1 || npc.faceX !== -1 || npc.faceZ !== -1 || npc.faceEntity !== -1;
            const updateSize = extendedInfo ? this.calculateUpdateSize(npc, true) : 0;
            if (((bitBlock.bitPos + NpcInfoEncoder.BITS_NEW + 7 + 24) >>> 3) + bitBlock.pos + (message.accumulator += updateSize) > this.test(message)) {
                break;
            }
            bitBlock.pBit(13, npc.nid);
            bitBlock.pBit(11, npc.type);
            bitBlock.pBit(5, npc.x - message.x);
            bitBlock.pBit(5, npc.z - message.z);
            bitBlock.pBit(1, extendedInfo ? 1 : 0);
            buildArea.npcs.add(npc.nid);
            if (extendedInfo) {
                buildArea.extendedInfo.add({id: npc.nid, added: true});
            }
        }
        if (buildArea.extendedInfo.size > 0) {
            bitBlock.pBit(13, 8191);
        }
        bitBlock.bytes();
    }
    writeUpdate(npc, out, newlyObserved) {
        let mask = npc.mask;
        if (newlyObserved && (npc.orientation !== -1 || npc.faceX !== -1 || npc.faceZ != -1)) {
            mask |= Npc2.FACE_COORD;
        }
        if (newlyObserved && npc.faceEntity !== -1) {
            mask |= Npc2.FACE_ENTITY;
        }
        out.p1(mask);
        if (mask & Npc2.ANIM) {
            out.p2(npc.animId);
            out.p1(npc.animDelay);
        }
        if (mask & Npc2.FACE_ENTITY) {
            if (npc.faceEntity !== -1) {
                npc.alreadyFacedEntity = true;
            }
            out.p2(npc.faceEntity);
        }
        if (mask & Npc2.SAY) {
            out.pjstr(npc.chat ?? '');
        }
        if (mask & Npc2.DAMAGE) {
            out.p1(npc.damageTaken);
            out.p1(npc.damageType);
            out.p1(npc.levels[NpcStat_default.HITPOINTS]);
            out.p1(npc.baseLevels[NpcStat_default.HITPOINTS]);
        }
        if (mask & Npc2.CHANGE_TYPE) {
            out.p2(npc.type);
        }
        if (mask & Npc2.SPOTANIM) {
            out.p2(npc.graphicId);
            out.p2(npc.graphicHeight);
            out.p2(npc.graphicDelay);
        }
        if (mask & Npc2.FACE_COORD) {
            if (npc.faceX !== -1) {
                npc.alreadyFacedCoord = true;
            }
            if (newlyObserved && npc.faceX != -1) {
                out.p2(npc.faceX);
                out.p2(npc.faceZ);
            } else if (newlyObserved && npc.orientation != -1) {
                const faceX = Position.moveX(npc.x, npc.orientation);
                const faceZ = Position.moveZ(npc.z, npc.orientation);
                out.p2(faceX * 2 + 1);
                out.p2(faceZ * 2 + 1);
            } else {
                out.p2(npc.faceX);
                out.p2(npc.faceZ);
            }
        }
    }
    calculateUpdateSize(npc, newlyObserved) {
        let length = 0;
        let mask = npc.mask;
        if (newlyObserved && (npc.orientation !== -1 || npc.faceX !== -1 || npc.faceZ != -1)) {
            mask |= Npc2.FACE_COORD;
        }
        if (newlyObserved && npc.faceEntity !== -1) {
            mask |= Npc2.FACE_ENTITY;
        }
        length += 1;
        if (mask & Npc2.ANIM) {
            length += 3;
        }
        if (mask & Npc2.FACE_ENTITY) {
            length += 2;
        }
        if (mask & Npc2.SAY) {
            length += (npc.chat?.length ?? 0) + 1;
        }
        if (mask & Npc2.DAMAGE) {
            length += 4;
        }
        if (mask & Npc2.CHANGE_TYPE) {
            length += 2;
        }
        if (mask & Npc2.SPOTANIM) {
            length += 6;
        }
        if (mask & Npc2.FACE_COORD) {
            length += 4;
        }
        return length;
    }
}

// src/lostcity/network/225/outgoing/prot/ServerProtRepository.ts
class ServerProtRepository {
    encoders = new Map();
    bind(message, encoder) {
        if (this.encoders.has(message)) {
            throw new Error(`[ServerProtRepository] Already defines a ${message.name}.`);
        }
        this.encoders.set(message, encoder);
    }
    constructor() {
        this.bind(CamLookAt, new CamLookAtEncoder());
        this.bind(CamMoveTo, new CamMoveToEncoder());
        this.bind(CamReset, new CamResetEncoder());
        this.bind(CamShake, new CamShakeEncoder());
        this.bind(ChatFilterSettings, new ChatFilterSettingsEncoder());
        this.bind(DataLand, new DataLandEncoder());
        this.bind(DataLandDone, new DataLandDoneEncoder());
        this.bind(DataLoc, new DataLocEncoder());
        this.bind(DataLocDone, new DataLocDoneEncoder());
        this.bind(EnableTracking, new EnableTrackingEncoder());
        this.bind(FinishTracking, new FinishTrackingEncoder());
        this.bind(HintArrow, new HintArrowEncoder());
        this.bind(IfClose, new IfCloseEncoder());
        this.bind(IfOpenChatModal, new IfOpenChatModalEncoder());
        this.bind(IfOpenMainModal, new IfOpenMainModalEncoder());
        this.bind(IfOpenMainSideModal, new IfOpenMainSideModalEncoder());
        this.bind(IfOpenSideModal, new IfOpenSideModalEncoder());
        this.bind(IfOpenSideOverlay, new IfOpenSideOverlayEncoder());
        this.bind(IfSetAnim, new IfSetAnimEncoder());
        this.bind(IfSetColour, new IfSetColourEncoder());
        this.bind(IfSetHide, new IfSetHideEncoder());
        this.bind(IfSetModel, new IfSetModelEncoder());
        this.bind(IfSetNpcHead, new IfSetNpcHeadEncoder());
        this.bind(IfSetObject, new IfSetObjectEncoder());
        this.bind(IfSetPlayerHead, new IfSetPlayerHeadEncoder());
        this.bind(IfSetPosition, new IfSetPositionEncoder());
        this.bind(IfSetRecol, new IfSetRecolEncoder());
        this.bind(IfSetText, new IfSetTextEncoder());
        this.bind(IfShowSide, new IfShowSideEncoder());
        this.bind(LastLoginInfo, new LastLoginInfoEncoder());
        this.bind(LocAddChange, new LocAddChangeEncoder());
        this.bind(LocAnim, new LocAnimEncoder());
        this.bind(LocDel, new LocDelEncoder());
        this.bind(LocMerge, new LocMergeEncoder());
        this.bind(Logout, new LogoutEncoder());
        this.bind(MapAnim, new MapAnimEncoder());
        this.bind(MapProjAnim, new MapProjAnimEncoder());
        this.bind(MessageGame, new MessageGameEncoder());
        this.bind(MessagePrivate, new MessagePrivateEncoder());
        this.bind(MidiJingle, new MidiJingleEncoder());
        this.bind(MidiSong, new MidiSongEncoder());
        this.bind(NpcInfo, new NpcInfoEncoder());
        this.bind(ObjAdd, new ObjAddEncoder());
        this.bind(ObjCount, new ObjCountEncoder());
        this.bind(ObjDel, new ObjDelEncoder());
        this.bind(ObjReveal, new ObjRevealEncoder());
        this.bind(PCountDialog, new PCountDialogEncoder());
        this.bind(PlayerInfo, new PlayerInfoEncoder());
        this.bind(RebuildNormal, new RebuildNormalEncoder());
        this.bind(ResetAnims, new ResetAnimsEncoder());
        this.bind(ResetClientVarCache, new ResetClientVarCacheEncoder());
        this.bind(SetMultiway, new SetMultiwayEncoder());
        this.bind(SynthSound, new SynthSoundEncoder());
        this.bind(TutorialFlashSide, new TutorialFlashSideEncoder());
        this.bind(TutorialOpenChat, new TutorialOpenChatEncoder());
        this.bind(UnsetMapFlag, new UnsetMapFlagEncoder());
        this.bind(UpdateFriendList, new UpdateFriendListEncoder());
        this.bind(UpdateIgnoreList, new UpdateIgnoreListEncoder());
        this.bind(UpdateInvFull, new UpdateInvFullEncoder());
        this.bind(UpdateInvPartial, new UpdateInvPartialEncoder());
        this.bind(UpdateInvStopTransmit, new UpdateInvStopTransmitEncoder());
        this.bind(UpdateRunEnergy, new UpdateRunEnergyEncoder());
        this.bind(UpdateRunWeight, new UpdateRunWeightEncoder());
        this.bind(UpdateStat, new UpdateStatEncoder());
        this.bind(UpdateUid192, new UpdateUid192Encoder());
        this.bind(UpdateZoneFullFollows, new UpdateZoneFullFollowsEncoder());
        this.bind(UpdateZonePartialEnclosed, new UpdateZonePartialEnclosedEncoder());
        this.bind(UpdateZonePartialFollows, new UpdateZonePartialFollowsEncoder());
        this.bind(VarpLarge, new VarpLargeEncoder());
        this.bind(VarpSmall, new VarpSmallEncoder());
    }
    getEncoder(message) {
        return this.encoders.get(message.constructor);
    }
    getZoneEncoder(message) {
        return this.encoders.get(message.constructor);
    }
}
var ServerProtRepository_default = new ServerProtRepository();

// src/lostcity/engine/zone/Zone.ts
class Zone {
    index;
    x;
    z;
    level;
    players = new Set();
    npcs = new Set();
    locs = [];
    objs = [];
    events = new Set();
    shared = null;
    totalLocs = 0;
    totalObjs = 0;
    constructor(index) {
        this.index = index;
        const coord = ZoneMap2.unpackIndex(index);
        this.x = coord.x >> 3;
        this.z = coord.z >> 3;
        this.level = coord.level;
    }
    enter(entity) {
        if (entity instanceof Player2) {
            this.players.add(entity.uid);
            World_default.getZoneGrid(this.level).flag(this.x, this.z);
        } else if (entity instanceof Npc2) {
            this.npcs.add(entity.nid);
        }
    }
    leave(entity) {
        if (entity instanceof Player2) {
            this.players.delete(entity.uid);
            if (this.players.size === 0) {
                World_default.getZoneGrid(this.level).unflag(this.x, this.z);
            }
        } else if (entity instanceof Npc2) {
            this.npcs.delete(entity.nid);
        }
    }
    tick(tick) {
        let updated;
        do {
            updated = false;
            for (const obj of this.getAllObjsUnsafe()) {
                if (!obj.updateLifeCycle(tick) || obj.lastLifecycleTick === tick) {
                    continue;
                }
                if (obj.lifecycle === EntityLifeCycle_default.DESPAWN) {
                    if (obj.receiverId !== -1) {
                        World_default.revealObj(obj);
                    } else {
                        World_default.removeObj(obj, 0);
                        updated = true;
                    }
                } else if (obj.lifecycle === EntityLifeCycle_default.RESPAWN) {
                    World_default.addObj(obj, -1, 0);
                    updated = true;
                }
            }
            for (const loc of this.getAllLocsUnsafe()) {
                if (!loc.updateLifeCycle(tick) || loc.lastLifecycleTick === tick) {
                    continue;
                }
                if (loc.lifecycle === EntityLifeCycle_default.DESPAWN) {
                    World_default.removeLoc(loc, 0);
                    updated = true;
                } else if (loc.lifecycle === EntityLifeCycle_default.RESPAWN) {
                    World_default.addLoc(loc, 0);
                    updated = true;
                }
            }
        } while (updated);
    }
    computeShared() {
        this.shared = null;
        let length = 0;
        const enclosed = [];
        for (const event of this.events.values()) {
            if (event.type !== ZoneEventType_default.ENCLOSED) {
                continue;
            }
            const encoder = ServerProtRepository_default.getZoneEncoder(event.message);
            if (typeof encoder === 'undefined') {
                continue;
            }
            const bytes = encoder.enclose(event.message);
            enclosed.push(bytes);
            length += bytes.length;
        }
        if (enclosed.length === 0 || length === 0) {
            return;
        }
        const shared = new Uint8Array(length);
        let ptr = 0;
        for (const bytes of enclosed) {
            shared.set(bytes, ptr);
            ptr += bytes.length;
        }
        this.shared = shared;
    }
    writeFullFollows(player) {
        player.write(new UpdateZoneFullFollows(this.x, this.z, player.originX, player.originZ));
        for (const obj of this.getAllObjsUnsafe(true)) {
            if (obj.receiverId !== -1 && obj.receiverId !== player.pid) {
                continue;
            }
            player.write(new UpdateZonePartialFollows(this.x, this.z, player.originX, player.originZ));
            if (obj.lifecycle === EntityLifeCycle_default.DESPAWN && obj.checkLifeCycle(World_default.currentTick)) {
                player.write(new ObjAdd(Position.packZoneCoord(obj.x, obj.z), obj.type, obj.count));
            } else if (obj.lifecycle === EntityLifeCycle_default.RESPAWN && obj.checkLifeCycle(World_default.currentTick)) {
                player.write(new ObjAdd(Position.packZoneCoord(obj.x, obj.z), obj.type, obj.count));
            }
        }
        for (const loc of this.getAllLocsUnsafe(true)) {
            if (loc.lifecycle === EntityLifeCycle_default.DESPAWN && loc.checkLifeCycle(World_default.currentTick)) {
                player.write(new LocAddChange(Position.packZoneCoord(loc.x, loc.z), loc.type, loc.shape, loc.angle));
            } else if (loc.lifecycle === EntityLifeCycle_default.RESPAWN && !loc.checkLifeCycle(World_default.currentTick)) {
                player.write(new LocDel(Position.packZoneCoord(loc.x, loc.z), loc.shape, loc.angle));
            }
        }
    }
    writePartialEncloses(player) {
        if (!this.shared) {
            return;
        }
        player.write(new UpdateZonePartialEnclosed(this.x, this.z, player.originX, player.originZ, this.shared));
    }
    writePartialFollows(player) {
        if (this.events.size === 0) {
            return;
        }
        player.write(new UpdateZonePartialFollows(this.x, this.z, player.originX, player.originZ));
        for (const event of this.events) {
            if (event.type !== ZoneEventType_default.FOLLOWS) {
                continue;
            }
            if (event.receiverId !== -1 && event.receiverId !== player.pid) {
                continue;
            }
            player.write(event.message);
        }
    }
    reset() {
        this.events.clear();
    }
    addStaticLoc(loc) {
        const coord = Position.packZoneCoord(loc.x, loc.z);
        const locs = this.locs[coord];
        if (!locs) {
            this.locs[coord] = [];
        }
        this.locs[coord]?.push(loc);
        this.totalLocs++;
        this.sortLocs(coord);
    }
    addStaticObj(obj) {
        const coord = Position.packZoneCoord(obj.x, obj.z);
        const objs = this.objs[coord];
        if (!objs) {
            this.objs[coord] = [];
        }
        this.objs[coord]?.push(obj);
        this.totalObjs++;
        this.sortObjs(coord);
    }
    addLoc(loc) {
        const coord = Position.packZoneCoord(loc.x, loc.z);
        if (loc.lifecycle === EntityLifeCycle_default.DESPAWN) {
            const locs = this.locs[coord];
            if (!locs) {
                this.locs[coord] = [];
            }
            this.locs[coord]?.push(loc);
            this.totalLocs++;
        }
        this.sortLocs(coord);
        this.events.add({
            type: ZoneEventType_default.ENCLOSED,
            receiverId: -1,
            message: new LocAddChange(coord, loc.type, loc.shape, loc.angle)
        });
    }
    removeLoc(loc) {
        const coord = Position.packZoneCoord(loc.x, loc.z);
        if (loc.lifecycle === EntityLifeCycle_default.DESPAWN) {
            const locs = this.locs[coord];
            if (locs) {
                for (let index = 0; index < locs.length; index++) {
                    if (loc === locs[index]) {
                        locs.splice(index, 1);
                        this.totalLocs--;
                        break;
                    }
                }
            }
        }
        this.sortLocs(coord);
        this.events.add({
            type: ZoneEventType_default.ENCLOSED,
            receiverId: -1,
            message: new LocDel(coord, loc.shape, loc.angle)
        });
    }
    getLoc(x, z2, type) {
        for (const loc of this.getLocsSafe(Position.packZoneCoord(x, z2))) {
            if (loc.type === type) {
                return loc;
            }
        }
        return null;
    }
    mergeLoc(loc, player, startCycle, endCycle, south, east, north, west) {
        this.events.add({
            type: ZoneEventType_default.ENCLOSED,
            receiverId: -1,
            message: new LocMerge(loc.x, loc.z, loc.shape, loc.angle, loc.type, startCycle, endCycle, player.pid, east, south, west, north)
        });
    }
    animLoc(loc, seq) {
        this.events.add({
            type: ZoneEventType_default.ENCLOSED,
            receiverId: -1,
            message: new LocAnim(Position.packZoneCoord(loc.x, loc.z), loc.shape, loc.angle, seq)
        });
    }
    addObj(obj, receiverId) {
        const coord = Position.packZoneCoord(obj.x, obj.z);
        if (obj.lifecycle === EntityLifeCycle_default.DESPAWN) {
            const objs = this.objs[coord];
            if (!objs) {
                this.objs[coord] = [];
            }
            this.objs[coord]?.push(obj);
            this.totalObjs++;
        }
        this.sortObjs(coord);
        if (obj.lifecycle === EntityLifeCycle_default.DESPAWN) {
            this.events.add({
                type: ZoneEventType_default.FOLLOWS,
                receiverId,
                message: new ObjAdd(coord, obj.type, obj.count)
            });
        } else if (obj.lifecycle === EntityLifeCycle_default.RESPAWN) {
            this.events.add({
                type: ZoneEventType_default.ENCLOSED,
                receiverId,
                message: new ObjAdd(coord, obj.type, obj.count)
            });
        }
    }
    revealObj(obj, receiverId) {
        const coord = Position.packZoneCoord(obj.x, obj.z);
        obj.receiverId = -1;
        obj.reveal = -1;
        this.sortObjs(coord);
        this.events.add({
            type: ZoneEventType_default.ENCLOSED,
            receiverId: -1,
            message: new ObjReveal(coord, obj.type, obj.count, receiverId)
        });
    }
    changeObj(obj, receiverId, oldCount, newCount) {
        const coord = Position.packZoneCoord(obj.x, obj.z);
        obj.count = newCount;
        this.sortObjs(coord);
        this.events.add({
            type: ZoneEventType_default.FOLLOWS,
            receiverId,
            message: new ObjCount(coord, obj.type, oldCount, newCount)
        });
    }
    removeObj(obj) {
        const coord = Position.packZoneCoord(obj.x, obj.z);
        if (obj.lifecycle === EntityLifeCycle_default.DESPAWN) {
            const objs = this.objs[coord];
            if (objs) {
                for (let index = 0; index < objs.length; index++) {
                    if (obj === objs[index]) {
                        objs.splice(index, 1);
                        this.totalObjs--;
                        break;
                    }
                }
            }
        }
        this.sortObjs(coord);
        if (obj.lifecycle === EntityLifeCycle_default.DESPAWN) {
            this.events.add({
                type: ZoneEventType_default.FOLLOWS,
                receiverId: -1,
                message: new ObjDel(coord, obj.type)
            });
        } else if (obj.lifecycle === EntityLifeCycle_default.RESPAWN) {
            this.events.add({
                type: ZoneEventType_default.ENCLOSED,
                receiverId: -1,
                message: new ObjDel(coord, obj.type)
            });
        }
    }
    animMap(x, z2, spotanim, height, delay) {
        this.events.add({
            type: ZoneEventType_default.ENCLOSED,
            receiverId: -1,
            message: new MapAnim(Position.packZoneCoord(x, z2), spotanim, height, delay)
        });
    }
    mapProjAnim(x, z2, dstX, dstZ, target, spotanim, srcHeight, dstHeight, startDelay, endDelay, peak, arc) {
        this.events.add({
            type: ZoneEventType_default.ENCLOSED,
            receiverId: -1,
            message: new MapProjAnim(x, z2, dstX, dstZ, target, spotanim, srcHeight, dstHeight, startDelay, endDelay, peak, arc)
        });
    }
    getObj(x, z2, type, receiverId) {
        for (const obj of this.getObjsSafe(Position.packZoneCoord(x, z2))) {
            if ((obj.receiverId !== -1 && obj.receiverId !== receiverId) || obj.type !== type) {
                continue;
            }
            return obj;
        }
        return null;
    }
    *getAllPlayersSafe() {
        for (const uid of this.players) {
            const player = World_default.getPlayerByUid(uid);
            if (player && player.checkLifeCycle(World_default.currentTick)) {
                yield player;
            }
        }
    }
    *getAllNpcsSafe() {
        for (const nid of this.npcs) {
            const npc = World_default.getNpc(nid);
            if (npc && npc.checkLifeCycle(World_default.currentTick)) {
                yield npc;
            }
        }
    }
    *getAllObjsSafe() {
        for (let index = 0; index < this.objs.length; index++) {
            const objs = this.objs[index];
            if (objs) {
                for (let i = 0; i < objs.length; i++) {
                    const obj = objs[i];
                    if (obj.checkLifeCycle(World_default.currentTick)) {
                        yield obj;
                    }
                }
            }
        }
    }
    *getObjsSafe(coord) {
        const objs = this.objs[coord];
        if (objs) {
            for (let i = 0; i < objs.length; i++) {
                const obj = objs[i];
                if (obj.checkLifeCycle(World_default.currentTick)) {
                    yield obj;
                }
            }
        }
    }
    *getObjsUnsafe(coord) {
        const objs = this.objs[coord];
        if (objs) {
            for (let i = 0; i < objs.length; i++) {
                yield objs[i];
            }
        }
    }
    *getAllObjsUnsafe(reverse = false) {
        for (let index = 0; index < this.objs.length; index++) {
            const objs = this.objs[index];
            if (objs) {
                if (reverse) {
                    for (let i = objs.length - 1; i >= 0; i--) {
                        yield objs[i];
                    }
                } else {
                    for (let i = 0; i < objs.length; i++) {
                        yield objs[i];
                    }
                }
            }
        }
    }
    *getAllLocsSafe() {
        for (let index = 0; index < this.locs.length; index++) {
            const locs = this.locs[index];
            if (locs) {
                for (let i = 0; i < locs.length; i++) {
                    const loc = locs[i];
                    if (loc.checkLifeCycle(World_default.currentTick)) {
                        yield loc;
                    }
                }
            }
        }
    }
    *getLocsSafe(coord) {
        const locs = this.locs[coord];
        if (locs) {
            for (let i = 0; i < locs.length; i++) {
                const loc = locs[i];
                if (loc.checkLifeCycle(World_default.currentTick)) {
                    yield loc;
                }
            }
        }
    }
    *getLocsUnsafe(coord) {
        const locs = this.locs[coord];
        if (locs) {
            for (let i = 0; i < locs.length; i++) {
                yield locs[i];
            }
        }
    }
    *getAllLocsUnsafe(reverse = false) {
        for (let index = 0; index < this.locs.length; index++) {
            const locs = this.locs[index];
            if (locs) {
                if (reverse) {
                    for (let i = locs.length - 1; i >= 0; i--) {
                        yield locs[i];
                    }
                } else {
                    for (let i = 0; i < locs.length; i++) {
                        yield locs[i];
                    }
                }
            }
        }
    }
    sortObjs(coord) {
        const objs = this.objs[coord];
        if (!objs) {
            return;
        }
        let topCost = -99999999;
        let topObj = null;
        for (const obj of objs) {
            const type = ObjType.get(obj.type);
            let cost = type.cost;
            if (type.stackable) {
                cost *= obj.count + 1;
            }
            cost += obj.lifecycle;
            if (cost > topCost) {
                topCost = cost;
                topObj = obj;
            }
        }
        if (!topObj) {
            return;
        }
        if (objs[0] !== topObj) {
            objs.splice(objs.indexOf(topObj), 1);
            objs.unshift(topObj);
        }
    }
    sortLocs(coord) {
        const locs = this.locs[coord];
        if (!locs) {
            return;
        }
        let topCost = -99999999;
        let topLoc = null;
        for (const loc of locs) {
            const cost = loc.lifecycle;
            if (cost > topCost) {
                topCost = cost;
                topLoc = loc;
            }
        }
        if (!topLoc) {
            return;
        }
        if (locs[0] !== topLoc) {
            locs.splice(locs.indexOf(topLoc), 1);
            locs.unshift(topLoc);
        }
    }
}

// src/lostcity/engine/zone/ZoneGrid.ts
class ZoneGrid {
    static GRID_SIZE = 2048;
    static INT_BITS = 5;
    static INT_BITS_FLAG = (1 << this.INT_BITS) - 1;
    static DEFAULT_GRID_SIZE = this.GRID_SIZE * (this.GRID_SIZE >> this.INT_BITS);
    grid;
    constructor(size = ZoneGrid.DEFAULT_GRID_SIZE) {
        this.grid = new Int32Array(size);
    }
    index(zoneX, zoneY) {
        return (zoneX << ZoneGrid.INT_BITS) | (zoneY >>> ZoneGrid.INT_BITS);
    }
    flag(zoneX, zoneY) {
        this.grid[this.index(zoneX, zoneY)] |= 1 << (zoneY & ZoneGrid.INT_BITS_FLAG);
    }
    unflag(zoneX, zoneY) {
        this.grid[this.index(zoneX, zoneY)] &= ~(1 << (zoneY & ZoneGrid.INT_BITS_FLAG));
    }
    isFlagged(zoneX, zoneY, radius) {
        const minX = Math.max(0, zoneX - radius);
        const maxX = Math.min(ZoneGrid.GRID_SIZE - 1, zoneX + radius);
        const minY = Math.max(0, zoneY - radius);
        const maxY = Math.min(ZoneGrid.GRID_SIZE - 1, zoneY + radius);
        const bits = ZoneGrid.INT_BITS_FLAG;
        const startY = minY & ~bits;
        const endY = (maxY >>> ZoneGrid.INT_BITS) << ZoneGrid.INT_BITS;
        for (let x = minX; x <= maxX; x++) {
            for (let y2 = startY; y2 <= endY; y2 += 32) {
                const index = this.index(x, y2);
                const line = this.grid[index];
                let trailingTrimmed = line;
                if (y2 + bits > maxY) {
                    trailingTrimmed = line & ((1 << (maxY - y2 + 1)) - 1);
                }
                let leadingTrimmed = trailingTrimmed;
                if (y2 < minY) {
                    leadingTrimmed = trailingTrimmed >>> (minY - y2);
                }
                if (leadingTrimmed !== 0) {
                    return true;
                }
            }
        }
        return false;
    }
}

// src/lostcity/engine/zone/ZoneMap.ts
class ZoneMap2 {
    static zoneIndex(x, z2, level) {
        return ((x >> 3) & 2047) | (((z2 >> 3) & 2047) << 11) | ((level & 3) << 22);
    }
    static unpackIndex(index) {
        const x = (index & 2047) << 3;
        const z2 = ((index >> 11) & 2047) << 3;
        const level = index >> 22;
        return {x, z: z2, level};
    }
    zones;
    grids;
    constructor() {
        this.zones = new Map();
        this.grids = new Map();
    }
    zone(x, z2, level) {
        const zoneIndex = ZoneMap2.zoneIndex(x, z2, level);
        let zone = this.zones.get(zoneIndex);
        if (typeof zone == 'undefined') {
            zone = new Zone(zoneIndex);
            this.zones.set(zoneIndex, zone);
        }
        return zone;
    }
    zoneByIndex(index) {
        let zone = this.zones.get(index);
        if (typeof zone == 'undefined') {
            zone = new Zone(index);
            this.zones.set(index, zone);
        }
        return zone;
    }
    grid(level) {
        let grid = this.grids.get(level);
        if (typeof grid == 'undefined') {
            grid = new ZoneGrid();
            this.grids.set(level, grid);
        }
        return grid;
    }
    zoneCount() {
        return this.zones.size;
    }
    locCount() {
        let total = 0;
        for (const zone of this.zones.values()) {
            total += zone.totalLocs;
        }
        return total;
    }
    objCount() {
        let total = 0;
        for (const zone of this.zones.values()) {
            total += zone.totalObjs;
        }
        return total;
    }
}

// src/lostcity/entity/BuildArea.ts
class BuildArea {
    static INTERVAL = 10;
    static PREFERRED_PLAYERS = 250;
    static PREFERRED_NPCS = 255;
    static PREFERRED_VIEW_DISTANCE = 16;
    npcs;
    players;
    loadedZones;
    activeZones;
    extendedInfo;
    appearances;
    forceViewDistance = false;
    viewDistance = BuildArea.PREFERRED_VIEW_DISTANCE;
    lastResize = 0;
    constructor() {
        this.npcs = new Set();
        this.players = new Set();
        this.loadedZones = new Set();
        this.activeZones = new Set();
        this.extendedInfo = new Set();
        this.appearances = new Map();
    }
    resize() {
        if (this.forceViewDistance) {
            return;
        }
        if (this.players.size >= BuildArea.PREFERRED_PLAYERS) {
            if (this.viewDistance > 1) {
                this.viewDistance--;
            }
            this.lastResize = 0;
            return;
        }
        if (++this.lastResize >= BuildArea.INTERVAL) {
            if (this.viewDistance < BuildArea.PREFERRED_VIEW_DISTANCE) {
                this.viewDistance++;
            } else {
                this.lastResize = 0;
            }
        }
    }
    reset() {
        this.extendedInfo.clear();
    }
    *getNearbyPlayers(uid, x, z2, originX, originZ) {
        players: for (const zoneIndex of this.proximitySort(x, z2, this.activeZones)) {
            for (const other of this.getNearby(World_default.getZoneIndex(zoneIndex).getAllPlayersSafe(), x, z2, originX, originZ, this.viewDistance)) {
                if (this.players.size >= BuildArea.PREFERRED_PLAYERS) {
                    break players;
                }
                if (this.players.has(other.uid)) {
                    continue;
                }
                if (other.uid === uid) {
                    continue;
                }
                yield other;
            }
        }
    }
    *getNearbyNpcs(x, z2, originX, originZ) {
        npcs: for (const zoneIndex of this.proximitySort(x, z2, this.activeZones)) {
            for (const npc of this.getNearby(World_default.getZoneIndex(zoneIndex).getAllNpcsSafe(), x, z2, originX, originZ, 16)) {
                if (this.npcs.size >= BuildArea.PREFERRED_NPCS) {
                    break npcs;
                }
                if (this.npcs.has(npc.nid)) {
                    continue;
                }
                yield npc;
            }
        }
    }
    hasAppearance(pid, hashCode) {
        const appearance = this.appearances.get(pid);
        if (typeof appearance === 'undefined') {
            return false;
        }
        return appearance === hashCode;
    }
    saveAppearance(pid, hashCode) {
        this.appearances.set(pid, hashCode);
    }
    *getNearby(entities, x, z2, originX, originZ, distance) {
        const absLeftX = originX - 48;
        const absRightX = originX + 48;
        const absTopZ = originZ + 48;
        const absBottomZ = originZ - 48;
        for (const entity of entities) {
            if (entity.x <= absLeftX || entity.x >= absRightX || entity.z >= absTopZ || entity.z <= absBottomZ) {
                continue;
            }
            if (!Position.isWithinDistanceSW({x, z: z2}, entity, distance)) {
                continue;
            }
            yield entity;
        }
    }
    proximitySort(zoneX, zoneZ, zones) {
        return Array.from(zones.values())
            .map(zoneIndex => this.zoneToDistance(zoneIndex, zoneX, zoneZ))
            .sort((a, b2) => a.distance - b2.distance)
            .map(({zoneIndex}) => zoneIndex);
    }
    zoneToDistance(zoneIndex, zoneX, zoneZ) {
        const pos = ZoneMap2.unpackIndex(zoneIndex);
        const distance = Math.abs(pos.x - zoneX) + Math.abs(pos.z - zoneZ);
        return {zoneIndex, distance};
    }
}

// src/lostcity/entity/Player.ts
function getLevelByExp(exp) {
    for (let i = 98; i >= 0; i--) {
        if (exp >= levelExperience[i]) {
            return Math.min(i + 2, 99);
        }
    }
    return 1;
}
function getExpByLevel(level) {
    return levelExperience[level - 2];
}
var levelExperience = new Int32Array(99);
var acc = 0;
for (let i = 0; i < 99; i++) {
    const level = i + 1;
    const delta = Math.floor(level + Math.pow(2, level / 7) * 300);
    acc += delta;
    levelExperience[i] = Math.floor(acc / 4) * 10;
}

class Player2 extends PathingEntity {
    static APPEARANCE = 1;
    static ANIM = 2;
    static FACE_ENTITY = 4;
    static SAY = 8;
    static DAMAGE = 16;
    static FACE_COORD = 32;
    static CHAT = 64;
    static BIG_UPDATE = 128;
    static SPOTANIM = 256;
    static EXACT_MOVE = 512;
    static SKILLS = [
        'attack',
        'defence',
        'strength',
        'hitpoints',
        'ranged',
        'prayer',
        'magic',
        'cooking',
        'woodcutting',
        'fletching',
        'fishing',
        'firemaking',
        'crafting',
        'smithing',
        'mining',
        'herblore',
        'agility',
        'thieving',
        'stat18',
        'stat19',
        'runecraft'
    ];
    static DESIGN_BODY_COLORS = [
        [6798, 107, 10283, 16, 4797, 7744, 5799, 4634, 33697, 22433, 2983, 54193],
        [8741, 12, 64030, 43162, 7735, 8404, 1701, 38430, 24094, 10153, 56621, 4783, 1341, 16578, 35003, 25239],
        [25238, 8742, 12, 64030, 43162, 7735, 8404, 1701, 38430, 24094, 10153, 56621, 4783, 1341, 16578, 35003],
        [4626, 11146, 6439, 12, 4758, 10270],
        [4550, 4537, 5681, 5673, 5790, 6806, 8076, 4574]
    ];
    save() {}
    username;
    username37;
    displayName;
    body;
    colors;
    gender;
    runenergy = 1e4;
    lastRunEnergy = -1;
    runweight;
    playtime;
    stats = new Int32Array(21);
    levels = new Uint8Array(21);
    vars;
    varsString;
    invs = new Map();
    pid = -1;
    uid = -1;
    lowMemory = false;
    combatLevel = 3;
    headicons = 0;
    appearance = null;
    appearanceHashCode = 0n;
    baseLevels = new Uint8Array(21);
    lastStats = new Int32Array(21);
    lastLevels = new Uint8Array(21);
    originX = -1;
    originZ = -1;
    buildArea = new BuildArea();
    lastMovement = 0;
    basReadyAnim = -1;
    basTurnOnSpot = -1;
    basWalkForward = -1;
    basWalkBackward = -1;
    basWalkLeft = -1;
    basWalkRight = -1;
    basRunning = -1;
    animProtect = 0;
    logoutRequested = false;
    invListeners = [];
    allowDesign = false;
    afkEventReady = false;
    interactWalkTrigger = false;
    highPriorityOut = new Stack();
    lowPriorityOut = new Stack();
    lastResponse = -1;
    messageColor = null;
    messageEffect = null;
    messageType = null;
    message = null;
    delay = 0;
    queue = new LinkList();
    weakQueue = new LinkList();
    engineQueue = new LinkList();
    cameraPackets = new LinkList();
    timers = new Map();
    modalState = 0;
    modalTop = -1;
    lastModalTop = -1;
    modalBottom = -1;
    lastModalBottom = -1;
    modalSidebar = -1;
    lastModalSidebar = -1;
    refreshModalClose = false;
    refreshModal = false;
    modalSticky = -1;
    overlaySide = new Array(14).fill(-1);
    receivedFirstClose = false;
    protect = false;
    activeScript = null;
    resumeButtons = [];
    lastItem = -1;
    lastSlot = -1;
    lastUseItem = -1;
    lastUseSlot = -1;
    lastTargetSlot = -1;
    lastCom = -1;
    staffModLevel = 0;
    heroPoints = new Array(16);
    afkZones = new Int32Array(2);
    lastAfkZone = 0;
    constructor(username, username37) {
        super(0, 3094, 3106, 1, 1, EntityLifeCycle_default.FOREVER, MoveRestrict_default.NORMAL, BlockWalk_default.NPC, MoveStrategy_default.SMART, Player2.FACE_COORD, Player2.FACE_ENTITY);
        this.username = username;
        this.username37 = username37;
        this.displayName = toDisplayName(username);
        this.vars = new Int32Array(VarPlayerType.count);
        this.varsString = new Array(VarPlayerType.count);
        this.body = [0, 10, 18, 26, 33, 36, 42];
        this.colors = [0, 0, 0, 0, 0];
        this.gender = 0;
        this.runenergy = 1e4;
        this.runweight = 0;
        this.playtime = 0;
        this.lastStats.fill(-1);
        this.lastLevels.fill(-1);
    }
    resetHeroPoints() {
        this.heroPoints = new Array(16);
        this.heroPoints.fill({uid: -1, points: 0});
    }
    addHero(uid, points) {
        const index = this.heroPoints.findIndex(hero => hero && hero.uid === uid);
        if (index !== -1) {
            this.heroPoints[index].points += points;
            return;
        }
        const emptyIndex = this.heroPoints.findIndex(hero => hero && hero.uid === -1);
        if (emptyIndex !== -1) {
            this.heroPoints[emptyIndex] = {uid, points};
            return;
        }
    }
    findHero() {
        this.heroPoints.sort((a, b2) => {
            return b2.points - a.points;
        });
        return this.heroPoints[0]?.uid ?? -1;
    }
    resetEntity(respawn) {
        if (respawn) {
        }
        super.resetPathingEntity();
        this.repathed = false;
        this.protect = false;
        this.messageColor = null;
        this.messageEffect = null;
        this.messageType = null;
        this.message = null;
    }
    onLogin() {
        this.playerLog('Logging in');
        this.write(new IfClose());
        this.write(new UpdateUid192(this.pid));
        this.unsetMapFlag();
        this.write(new ResetAnims());
        this.resetHeroPoints();
        this.write(new ResetClientVarCache());
        for (let varp = 0; varp < this.vars.length; varp++) {
            const type = VarPlayerType.get(varp);
            const value = this.vars[varp];
            if (type.transmit) {
                this.writeVarp(varp, value);
            }
        }
        const loginTrigger = ScriptProvider.getByTriggerSpecific(ServerTriggerType_default.LOGIN, -1, -1);
        if (loginTrigger) {
            this.executeScript(ScriptRunner2.init(loginTrigger, this), true);
        }
        const moveTrigger = ScriptProvider.getByTriggerSpecific(ServerTriggerType_default.MOVE, -1, -1);
        if (moveTrigger) {
            const script = ScriptRunner2.init(moveTrigger, this);
            this.runScript(script, true);
        }
        this.lastStepX = this.x - 1;
        this.lastStepZ = this.z;
    }
    calculateRunWeight() {
        this.runweight = 0;
        const invs = this.invs.values();
        for (let i = 0; i < this.invs.size; i++) {
            const inv = invs.next().value;
            if (!inv) {
                continue;
            }
            const invType = InvType.get(inv.type);
            if (!invType || !invType.runweight) {
                continue;
            }
            for (let slot = 0; slot < inv.capacity; slot++) {
                const item = inv.get(slot);
                if (!item) {
                    continue;
                }
                const type = ObjType.get(item.id);
                if (!type || type.stackable) {
                    continue;
                }
                this.runweight += type.weight * item.count;
            }
        }
    }
    playerLog(message, ...args) {}
    processEngineQueue() {
        for (let request = this.engineQueue.head(); request !== null; request = this.engineQueue.next()) {
            const delay = request.delay--;
            if (this.canAccess() && delay <= 0) {
                const script = ScriptRunner2.init(request.script, this, null, request.args);
                this.executeScript(script, true);
                request.unlink();
            }
        }
    }
    updateMovement(repathAllowed = true) {
        if (this.containsModalInterface()) {
            this.recoverEnergy(false);
            return false;
        }
        if (repathAllowed && this.target instanceof PathingEntity && !this.interacted && this.walktrigger === -1) {
            this.pathToPathingTarget();
        }
        if (this.hasWaypoints() && this.walktrigger !== -1 && !this.protect && !this.delayed()) {
            const trigger = ScriptProvider.get(this.walktrigger);
            this.walktrigger = -1;
            if (trigger) {
                const script = ScriptRunner2.init(trigger, this);
                this.runScript(script, true);
            }
        }
        if (this.runenergy < 100) {
            this.setVar(VarPlayerType.PLAYER_RUN, 0);
            this.setVar(VarPlayerType.TEMP_RUN, 0);
        }
        if (this.moveSpeed !== MoveSpeed_default.INSTANT) {
            this.moveSpeed = this.defaultMoveSpeed();
            if (this.basRunning === -1) {
                this.moveSpeed = MoveSpeed_default.WALK;
            } else if (this.getVar(VarPlayerType.TEMP_RUN)) {
                this.moveSpeed = MoveSpeed_default.RUN;
            }
        }
        if (!super.processMovement()) {
            this.setVar(VarPlayerType.TEMP_RUN, 0);
        }
        const moved = this.lastX !== this.x || this.lastZ !== this.z;
        if (moved) {
            const trigger = ScriptProvider.getByTriggerSpecific(ServerTriggerType_default.MOVE, -1, -1);
            if (trigger) {
                this.runScript(ScriptRunner2.init(trigger, this), true);
            }
        }
        this.drainEnergy(moved);
        this.recoverEnergy(moved);
        if (this.runenergy === 0) {
            this.setVar(VarPlayerType.PLAYER_RUN, 0);
            this.setVar(VarPlayerType.TEMP_RUN, 0);
        }
        return moved;
    }
    drainEnergy(moved) {
        if (!moved || this.stepsTaken === 0) {
            return;
        }
        if (!this.delayed() && this.moveSpeed === MoveSpeed_default.RUN && this.stepsTaken > 1) {
            const weightKg = Math.floor(this.runweight / 1000);
            const clampWeight = Math.min(Math.max(weightKg, 0), 64);
            const loss = (67 + (67 * clampWeight) / 64) | 0;
            this.runenergy = Math.max(this.runenergy - loss, 0);
        }
    }
    recoverEnergy(moved) {
        if (!this.delayed() && (!moved || this.moveSpeed !== MoveSpeed_default.RUN) && this.runenergy < 1e4) {
            const recovered = ((this.baseLevels[PlayerStat_default.AGILITY] / 9) | 0) + 8;
            this.runenergy = Math.min(this.runenergy + recovered, 1e4);
        }
    }
    blockWalkFlag() {
        return CollisionFlag.PLAYER;
    }
    defaultMoveSpeed() {
        return this.getVar(VarPlayerType.PLAYER_RUN) ? MoveSpeed_default.RUN : MoveSpeed_default.WALK;
    }
    closeSticky() {
        if (this.modalSticky !== -1) {
            const closeTrigger = ScriptProvider.getByTrigger(ServerTriggerType_default.IF_CLOSE, this.modalSticky);
            if (closeTrigger) {
                this.enqueueScript(closeTrigger, 1 /* ENGINE */);
            }
            this.modalSticky = -1;
            this.write(new TutorialOpenChat(-1));
        }
    }
    closeModal() {
        if (!this.receivedFirstClose) {
            this.receivedFirstClose = true;
            return;
        }
        this.weakQueue.clear();
        if (!this.delayed()) {
            this.protect = false;
        }
        if (this.modalState === 0) {
            return;
        }
        if (this.modalTop !== -1) {
            const closeTrigger = ScriptProvider.getByTrigger(ServerTriggerType_default.IF_CLOSE, this.modalTop);
            if (closeTrigger) {
                this.enqueueScript(closeTrigger, 1 /* ENGINE */);
            }
            this.modalTop = -1;
        }
        if (this.modalBottom !== -1) {
            const closeTrigger = ScriptProvider.getByTrigger(ServerTriggerType_default.IF_CLOSE, this.modalBottom);
            if (closeTrigger) {
                this.enqueueScript(closeTrigger, 1 /* ENGINE */);
            }
            this.modalBottom = -1;
        }
        if (this.modalSidebar !== -1) {
            const closeTrigger = ScriptProvider.getByTrigger(ServerTriggerType_default.IF_CLOSE, this.modalSidebar);
            if (closeTrigger) {
                this.enqueueScript(closeTrigger, 1 /* ENGINE */);
            }
            this.modalSidebar = -1;
        }
        this.modalState = 0;
        this.refreshModalClose = true;
    }
    delayed() {
        return this.delay > 0;
    }
    containsModalInterface() {
        return (this.modalState & 1) === 1 || (this.modalState & 2) === 2 || (this.modalState & 16) === 16;
    }
    busy() {
        return this.delayed() || this.containsModalInterface();
    }
    canAccess() {
        return !this.protect && !this.busy();
    }
    enqueueScript(script, type = 0 /* NORMAL */, delay = 0, args = []) {
        const request = new EntityQueueRequest(type, script, args, delay);
        if (type === 1 /* ENGINE */) {
            request.delay = 0;
            this.engineQueue.addTail(request);
        } else if (type === 2 /* WEAK */) {
            this.weakQueue.addTail(request);
        } else {
            this.queue.addTail(request);
        }
    }
    processQueues() {
        let hasStrong = false;
        for (let request = this.queue.head(); request !== null; request = this.queue.next()) {
            if (request.type === 3 /* STRONG */) {
                hasStrong = true;
                break;
            }
        }
        if (hasStrong) {
            this.closeModal();
        }
        this.processQueue();
        this.processWeakQueue();
    }
    processQueue() {
        for (let request = this.queue.head(); request !== null; request = this.queue.next()) {
            if (request.type === 3 /* STRONG */) {
                this.closeModal();
            }
            const delay = request.delay--;
            if (this.canAccess() && delay <= 0) {
                const script = ScriptRunner2.init(request.script, this, null, request.args);
                this.executeScript(script, true);
                request.unlink();
            }
        }
    }
    processWeakQueue() {
        for (let request = this.weakQueue.head(); request !== null; request = this.weakQueue.next()) {
            const delay = request.delay--;
            if (this.canAccess() && delay <= 0) {
                const script = ScriptRunner2.init(request.script, this, null, request.args);
                this.executeScript(script, true);
                request.unlink();
            }
        }
    }
    setTimer(type, script, args = [], interval) {
        const timerId = script.id;
        const timer = {
            type,
            script,
            args,
            interval,
            clock: interval
        };
        this.timers.set(timerId, timer);
    }
    clearTimer(timerId) {
        this.timers.delete(timerId);
    }
    processTimers(type) {
        for (const timer of this.timers.values()) {
            if (type !== timer.type) {
                continue;
            }
            if (--timer.clock <= 0 && (timer.type === 1 /* SOFT */ || this.canAccess())) {
                timer.clock = timer.interval;
                const script = ScriptRunner2.init(timer.script, this, null, timer.args);
                this.runScript(script, timer.type === 0 /* NORMAL */);
            }
        }
    }
    stopAction() {
        this.clearPendingAction();
        this.unsetMapFlag();
    }
    clearPendingAction() {
        this.clearInteraction();
        this.closeModal();
    }
    hasInteraction() {
        return this.target !== null;
    }
    getOpTrigger() {
        if (!this.target) {
            return null;
        }
        let typeId = -1;
        let categoryId = -1;
        if (this.target instanceof Npc2 || this.target instanceof Loc || this.target instanceof Obj) {
            const type = this.target instanceof Npc2 ? NpcType.get(this.target.type) : this.target instanceof Loc ? LocType.get(this.target.type) : ObjType.get(this.target.type);
            typeId = type.id;
            categoryId = type.category;
        }
        if (this.targetSubject.type !== -1) {
            typeId = this.targetSubject.type;
        }
        if (this.targetSubject.com !== -1) {
            typeId = this.targetSubject.com;
        }
        return ScriptProvider.getByTrigger(this.targetOp + 7, typeId, categoryId) ?? null;
    }
    getApTrigger() {
        if (!this.target) {
            return null;
        }
        let typeId = -1;
        let categoryId = -1;
        if (this.target instanceof Npc2 || this.target instanceof Loc || this.target instanceof Obj) {
            const type = this.target instanceof Npc2 ? NpcType.get(this.target.type) : this.target instanceof Loc ? LocType.get(this.target.type) : ObjType.get(this.target.type);
            typeId = type.id;
            categoryId = type.category;
        }
        if (this.targetSubject.type !== -1) {
            typeId = this.targetSubject.type;
        }
        if (this.targetSubject.com !== -1) {
            typeId = this.targetSubject.com;
        }
        return ScriptProvider.getByTrigger(this.targetOp, typeId, categoryId) ?? null;
    }
    processInteraction() {
        if (this.target === null || !this.canAccess()) {
            this.updateMovement();
            return;
        }
        if (this.target.level !== this.level) {
            this.clearInteraction();
            this.unsetMapFlag();
            return;
        }
        if (this.target instanceof Npc2 && (World_default.getNpc(this.target.nid) === null || this.target.delayed())) {
            this.clearInteraction();
            this.unsetMapFlag();
            return;
        }
        if (this.target instanceof Npc2 && this.targetSubject.type !== -1 && World_default.getNpcByUid((this.targetSubject.type << 16) | this.target.nid) === null) {
            this.clearInteraction();
            this.unsetMapFlag();
            return;
        }
        if (this.target instanceof Obj && World_default.getObj(this.target.x, this.target.z, this.level, this.target.type, this.pid) === null) {
            this.clearInteraction();
            this.unsetMapFlag();
            return;
        }
        if (this.target instanceof Loc && World_default.getLoc(this.target.x, this.target.z, this.level, this.target.type) === null) {
            this.clearInteraction();
            this.unsetMapFlag();
            return;
        }
        if (this.target instanceof Player2 && World_default.getPlayerByUid(this.target.uid) === null) {
            this.clearInteraction();
            this.unsetMapFlag();
            return;
        }
        if (this.targetOp === ServerTriggerType_default.APPLAYER3 || this.targetOp === ServerTriggerType_default.OPPLAYER3) {
            const moved2 = this.updateMovement(false);
            if (moved2) {
                this.alreadyFacedEntity = false;
                this.alreadyFacedCoord = false;
                this.lastMovement = World_default.currentTick + 1;
            }
            return;
        }
        const opTrigger = this.getOpTrigger();
        const apTrigger = this.getApTrigger();
        if (opTrigger && this.target instanceof PathingEntity && this.inOperableDistance(this.target)) {
            const target = this.target;
            this.target = null;
            this.executeScript(ScriptRunner2.init(opTrigger, this, target), true);
            if (this.target === null) {
                this.unsetMapFlag();
            }
            this.interacted = true;
            this.clearWaypoints();
        } else if (apTrigger && this.inApproachDistance(this.apRange, this.target)) {
            const target = this.target;
            this.target = null;
            this.executeScript(ScriptRunner2.init(apTrigger, this, target), true);
            if (this.apRangeCalled) {
                this.target = target;
            } else {
                this.clearWaypoints();
                this.interacted = true;
            }
            if (this.target === null) {
                this.unsetMapFlag();
            }
        } else if (this.target instanceof PathingEntity && this.inOperableDistance(this.target)) {
            if (Environment_default.LOCAL_DEV && !opTrigger && !apTrigger) {
                let debugname = '_';
                if (this.target instanceof Npc2) {
                    if ((this.targetSubject.com !== -1 && this.targetOp === ServerTriggerType_default.APNPCT) || this.targetOp === ServerTriggerType_default.OPNPCT) {
                        debugname = Component.get(this.targetSubject.com)?.comName ?? this.targetSubject.toString();
                    } else {
                        debugname = NpcType.get(this.target.type)?.debugname ?? this.target.type.toString();
                    }
                } else if (this.target instanceof Loc) {
                    debugname = LocType.get(this.target.type)?.debugname ?? this.target.type.toString();
                } else if (this.target instanceof Obj) {
                    debugname = ObjType.get(this.target.type)?.debugname ?? this.target.type.toString();
                } else if (
                    (this.targetSubject.com !== -1 && this.targetOp === ServerTriggerType_default.APNPCT) ||
                    this.targetOp === ServerTriggerType_default.APPLAYERT ||
                    this.targetOp === ServerTriggerType_default.APLOCT ||
                    this.targetOp === ServerTriggerType_default.APOBJT
                ) {
                    debugname = Component.get(this.targetSubject.com)?.comName ?? this.targetSubject.toString();
                } else if (this.targetSubject.type !== -1) {
                    debugname = ObjType.get(this.targetSubject.type)?.debugname ?? this.targetSubject.toString();
                }
                this.messageGame(`No trigger for [${ServerTriggerType_default[this.targetOp + 7].toLowerCase()},${debugname}]`);
            }
            this.target = null;
            this.messageGame('Nothing interesting happens.');
            this.interacted = true;
            this.clearWaypoints();
        }
        const moved = this.updateMovement();
        if (moved) {
            this.alreadyFacedEntity = false;
            this.alreadyFacedCoord = false;
            this.lastMovement = World_default.currentTick + 1;
        }
        if (this.target && (!this.interacted || this.apRangeCalled)) {
            this.interacted = false;
            if (opTrigger && (this.target instanceof PathingEntity || !moved) && this.inOperableDistance(this.target)) {
                const target = this.target;
                this.target = null;
                this.executeScript(ScriptRunner2.init(opTrigger, this, target), true);
                if (this.target === null) {
                    this.unsetMapFlag();
                }
                this.interacted = true;
                this.clearWaypoints();
            } else if (apTrigger && this.inApproachDistance(this.apRange, this.target)) {
                this.apRangeCalled = false;
                const target = this.target;
                this.target = null;
                this.executeScript(ScriptRunner2.init(apTrigger, this, target), true);
                if (this.apRangeCalled) {
                    this.target = target;
                } else {
                    this.clearWaypoints();
                    this.interacted = true;
                }
                if (this.target === null) {
                    this.unsetMapFlag();
                }
            } else if ((this.target instanceof PathingEntity || !moved) && this.inOperableDistance(this.target)) {
                if (Environment_default.LOCAL_DEV && !opTrigger && !apTrigger) {
                    let debugname = '_';
                    if (this.target instanceof Npc2) {
                        debugname = NpcType.get(this.target.type)?.debugname ?? this.target.type.toString();
                    } else if (this.target instanceof Loc) {
                        debugname = LocType.get(this.target.type)?.debugname ?? this.target.type.toString();
                    } else if (this.target instanceof Obj) {
                        debugname = ObjType.get(this.target.type)?.debugname ?? this.target.type.toString();
                    } else if (
                        (this.targetSubject.com !== -1 && this.targetOp === ServerTriggerType_default.APNPCT) ||
                        this.targetOp === ServerTriggerType_default.APPLAYERT ||
                        this.targetOp === ServerTriggerType_default.APLOCT ||
                        this.targetOp === ServerTriggerType_default.APOBJT
                    ) {
                        debugname = Component.get(this.targetSubject.com)?.comName ?? this.targetSubject.toString();
                    } else if (this.targetSubject.type !== -1) {
                        debugname = ObjType.get(this.targetSubject.type)?.debugname ?? this.targetSubject.toString();
                    }
                    this.messageGame(`No trigger for [${ServerTriggerType_default[this.targetOp + 7].toLowerCase()},${debugname}]`);
                }
                this.target = null;
                this.messageGame('Nothing interesting happens.');
                this.interacted = true;
                this.clearWaypoints();
            }
        }
        if (!this.interactWalkTrigger && this.walktrigger !== -1 && !this.protect && !this.delayed()) {
            const trigger = ScriptProvider.get(this.walktrigger);
            this.walktrigger = -1;
            if (trigger) {
                const script = ScriptRunner2.init(trigger, this);
                this.interactWalkTrigger = true;
                this.unsetMapFlag();
                this.runScript(script, true);
            }
        }
        if (!this.interacted && !this.hasWaypoints() && !moved) {
            this.messageGame("I can't reach that!");
            this.clearInteraction();
        }
        if (this.interacted && !this.apRangeCalled && this.target === null) {
            this.clearInteraction();
        }
    }
    getAppearanceInSlot(slot) {
        let part = -1;
        if (slot === 8) {
            part = this.body[0];
        } else if (slot === 11) {
            part = this.body[1];
        } else if (slot === 4) {
            part = this.body[2];
        } else if (slot === 6) {
            part = this.body[3];
        } else if (slot === 9) {
            part = this.body[4];
        } else if (slot === 7) {
            part = this.body[5];
        } else if (slot === 10) {
            part = this.body[6];
        }
        if (part === -1) {
            return 0;
        } else {
            return 256 + part;
        }
    }
    getCombatLevel() {
        const base = 0.25 * (this.baseLevels[PlayerStat_default.DEFENCE] + this.baseLevels[PlayerStat_default.HITPOINTS] + Math.floor(this.baseLevels[PlayerStat_default.PRAYER] / 2));
        const melee = 0.325 * (this.baseLevels[PlayerStat_default.ATTACK] + this.baseLevels[PlayerStat_default.STRENGTH]);
        const range = 0.325 * (Math.floor(this.baseLevels[PlayerStat_default.RANGED] / 2) + this.baseLevels[PlayerStat_default.RANGED]);
        const magic = 0.325 * (Math.floor(this.baseLevels[PlayerStat_default.MAGIC] / 2) + this.baseLevels[PlayerStat_default.MAGIC]);
        return Math.floor(base + Math.max(melee, range, magic));
    }
    generateAppearance(inv) {
        const stream = Packet.alloc(0);
        stream.p1(this.gender);
        stream.p1(this.headicons);
        const skippedSlots = [];
        let worn = this.getInventory(inv);
        if (!worn) {
            worn = new Inventory(0);
        }
        for (let i = 0; i < worn.capacity; i++) {
            const equip = worn.get(i);
            if (!equip) {
                continue;
            }
            const config = ObjType.get(equip.id);
            if (config.wearpos2 !== -1) {
                if (skippedSlots.indexOf(config.wearpos2) === -1) {
                    skippedSlots.push(config.wearpos2);
                }
            }
            if (config.wearpos3 !== -1) {
                if (skippedSlots.indexOf(config.wearpos3) === -1) {
                    skippedSlots.push(config.wearpos3);
                }
            }
        }
        const parts = [];
        for (let slot = 0; slot < 12; slot++) {
            if (skippedSlots.indexOf(slot) !== -1) {
                stream.p1(0);
                parts[slot] = 0n;
                continue;
            }
            const equip = worn.get(slot);
            if (!equip) {
                const appearanceValue = this.getAppearanceInSlot(slot);
                if (appearanceValue < 1) {
                    stream.p1(0);
                    parts[slot] = 0n;
                } else {
                    stream.p2(appearanceValue);
                    parts[slot] = BigInt(appearanceValue);
                }
            } else {
                stream.p2(512 + equip.id);
                parts[slot] = BigInt(512 + equip.id);
            }
        }
        for (let i = 0; i < this.colors.length; i++) {
            stream.p1(this.colors[i]);
        }
        stream.p2(this.basReadyAnim);
        stream.p2(this.basTurnOnSpot);
        stream.p2(this.basWalkForward);
        stream.p2(this.basWalkBackward);
        stream.p2(this.basWalkLeft);
        stream.p2(this.basWalkRight);
        stream.p2(this.basRunning);
        stream.p8(this.username37);
        stream.p1(this.combatLevel);
        this.mask |= Player2.APPEARANCE;
        this.appearance = new Uint8Array(stream.pos);
        stream.pos = 0;
        stream.gdata(this.appearance, 0, this.appearance.length);
        stream.release();
        this.appearanceHashCode = 0n;
        for (let part = 0; part < 12; part++) {
            this.appearanceHashCode <<= 0x4n;
            if (parts[part] >= 256) {
                this.appearanceHashCode += parts[part] - 256n;
            }
        }
        if (parts[0] >= 256) {
            this.appearanceHashCode += (parts[0] - 256n) >> 4n;
        }
        if (parts[1] >= 256) {
            this.appearanceHashCode += (parts[1] - 256n) >> 8n;
        }
        for (let part = 0; part < 5; part++) {
            this.appearanceHashCode <<= 0x3n;
            this.appearanceHashCode += BigInt(this.colors[part]);
        }
        this.appearanceHashCode <<= 0x1n;
        this.appearanceHashCode += BigInt(this.gender);
    }
    getInventoryFromListener(listener) {
        if (listener.source === -1) {
            return World_default.getInventory(listener.type);
        } else {
            const player = World_default.getPlayerByUid(listener.source);
            if (!player) {
                return null;
            }
            return player.getInventory(listener.type);
        }
    }
    getInventory(inv) {
        if (inv === -1) {
            return null;
        }
        const invType = InvType.get(inv);
        let container = null;
        if (!invType) {
            return null;
        }
        if (invType.scope === InvType.SCOPE_SHARED) {
            container = World_default.getInventory(inv);
        } else {
            container = this.invs.get(inv);
            if (!container) {
                container = Inventory.fromType(inv);
                this.invs.set(inv, container);
            }
        }
        return container;
    }
    invListenOnCom(inv, com, source) {
        if (inv === -1) {
            return;
        }
        const index = this.invListeners.findIndex(l => l.type === inv && l.com === com);
        if (index !== -1) {
            return;
        }
        const invType = InvType.get(inv);
        if (invType.scope === InvType.SCOPE_SHARED) {
            source = -1;
        }
        this.invListeners.push({type: inv, com, source, firstSeen: true});
    }
    invStopListenOnCom(com) {
        const index = this.invListeners.findIndex(l => l.com === com);
        if (index === -1) {
            return;
        }
        this.invListeners.splice(index, 1);
        this.write(new UpdateInvStopTransmit(com));
    }
    invGetSlot(inv, slot) {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invGetSlot: Invalid inventory type: ' + inv);
        }
        if (!container.validSlot(slot)) {
            throw new Error('invGetSlot: Invalid slot: ' + slot);
        }
        return container.get(slot);
    }
    invClear(inv) {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invClear: Invalid inventory type: ' + inv);
        }
        container.removeAll();
    }
    invAdd(inv, obj, count, assureFullInsertion = true) {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invAdd: Invalid inventory type: ' + inv);
        }
        const transaction = container.add(obj, count, -1, assureFullInsertion);
        return transaction.completed;
    }
    invSet(inv, obj, count, slot) {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invSet: Invalid inventory type: ' + inv);
        }
        if (!container.validSlot(slot)) {
            throw new Error('invSet: Invalid slot: ' + slot);
        }
        container.set(slot, {id: obj, count});
    }
    invDel(inv, obj, count, beginSlot = -1) {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invDel: Invalid inventory type: ' + inv);
        }
        if (beginSlot < -1 || beginSlot >= this.invSize(inv)) {
            throw new Error('invDel: Invalid beginSlot: ' + beginSlot);
        }
        const transaction = container.remove(obj, count, beginSlot);
        return transaction.completed;
    }
    invDelSlot(inv, slot) {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invDelSlot: Invalid inventory type: ' + inv);
        }
        if (!container.validSlot(slot)) {
            throw new Error('invDelSlot: Invalid slot: ' + slot);
        }
        container.delete(slot);
    }
    invSize(inv) {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invSize: Invalid inventory type: ' + inv);
        }
        return container.capacity;
    }
    invTotal(inv, obj) {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invTotal: Invalid inventory type: ' + inv);
        }
        return container.getItemCount(obj);
    }
    invFreeSpace(inv) {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invFreeSpace: Invalid inventory type: ' + inv);
        }
        return container.freeSlotCount;
    }
    invItemSpace(inv, obj, count, size) {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invItemSpace: Invalid inventory type: ' + inv);
        }
        const objType = ObjType.get(obj);
        let uncert = obj;
        if (objType.certtemplate >= 0 && objType.certlink >= 0) {
            uncert = objType.certlink;
        }
        if (objType.stackable || uncert != obj || container.stackType == Inventory.ALWAYS_STACK) {
            const stockObj = InvType.get(inv).stockobj?.includes(obj) === true;
            if (this.invTotal(inv, obj) == 0 && this.invFreeSpace(inv) == 0 && !stockObj) {
                return count;
            }
            return Math.max(0, count - (Inventory.STACK_LIMIT - this.invTotal(inv, obj)));
        }
        return Math.max(0, count - (this.invFreeSpace(inv) - (this.invSize(inv) - size)));
    }
    invMoveToSlot(fromInv, toInv, fromSlot, toSlot) {
        const from = this.getInventory(fromInv);
        if (!from) {
            throw new Error('invMoveToSlot: Invalid inventory type: ' + fromInv);
        }
        if (!from.validSlot(fromSlot)) {
            throw new Error('invMoveToSlot: Invalid from slot: ' + fromSlot);
        }
        const to = this.getInventory(toInv);
        if (!to) {
            throw new Error('invMoveToSlot: Invalid inventory type: ' + toInv);
        }
        if (!to.validSlot(toSlot)) {
            throw new Error('invMoveToSlot: Invalid to slot: ' + toSlot);
        }
        const fromObj = this.invGetSlot(fromInv, fromSlot);
        if (!fromObj) {
            throw new Error(`invMoveToSlot: Invalid from obj was null. This means the obj does not exist at this slot: ${fromSlot}`);
        }
        const toObj = this.invGetSlot(toInv, toSlot);
        this.invSet(toInv, fromObj.id, fromObj.count, toSlot);
        if (toObj) {
            this.invSet(fromInv, toObj.id, toObj.count, fromSlot);
        } else {
            this.invDelSlot(fromInv, fromSlot);
        }
    }
    invMoveFromSlot(fromInv, toInv, fromSlot) {
        const from = this.getInventory(fromInv);
        if (!from) {
            throw new Error('invMoveFromSlot: Invalid inventory type: ' + fromInv);
        }
        const to = this.getInventory(toInv);
        if (!to) {
            throw new Error('invMoveFromSlot: Invalid inventory type: ' + toInv);
        }
        if (!from.validSlot(fromSlot)) {
            throw new Error('invMoveFromSlot: Invalid from slot: ' + fromSlot);
        }
        const fromObj = this.invGetSlot(fromInv, fromSlot);
        if (!fromObj) {
            throw new Error(`invMoveFromSlot: Invalid from obj was null. This means the obj does not exist at this slot: ${fromSlot}`);
        }
        return {
            overflow: fromObj.count - this.invAdd(toInv, fromObj.id, fromObj.count),
            fromObj: fromObj.id
        };
    }
    invTotalCat(inv, category) {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invTotalCat: Invalid inventory type: ' + inv);
        }
        return container.itemsFiltered.filter(obj => ObjType.get(obj.id).category == category).reduce((count, obj) => count + obj.count, 0);
    }
    _invTotalParam(inv, param, stack) {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invTotalParam: Invalid inventory type: ' + inv);
        }
        const paramType = ParamType.get(param);
        let total = 0;
        for (let slot = 0; slot < container.capacity; slot++) {
            const item = container.items[slot];
            if (!item || item.id < 0 || item.id >= ObjType.count) {
                continue;
            }
            const obj = ObjType.get(item.id);
            const value = ParamHelper.getIntParam(paramType.id, obj, paramType.defaultInt);
            if (stack) {
                total += item.count * value;
            } else {
                total += value;
            }
        }
        return total;
    }
    invTotalParam(inv, param) {
        return this._invTotalParam(inv, param, false);
    }
    invTotalParamStack(inv, param) {
        return this._invTotalParam(inv, param, true);
    }
    getVar(id) {
        const varp = VarPlayerType.get(id);
        return varp.type === ScriptVarType.STRING ? this.varsString[varp.id] : this.vars[varp.id];
    }
    setVar(id, value) {
        const varp = VarPlayerType.get(id);
        if (varp.type === ScriptVarType.STRING && typeof value === 'string') {
            this.varsString[varp.id] = value;
        } else if (typeof value === 'number') {
            this.vars[varp.id] = value;
            if (varp.transmit) {
                this.writeVarp(id, value);
            }
        }
    }
    writeVarp(id, value) {
        if (value >= -128 && value <= 127) {
            this.write(new VarpSmall(id, value));
        } else {
            this.write(new VarpLarge(id, value));
        }
    }
    addXp(stat, xp) {
        if (xp < 0) {
            throw new Error(`Invalid xp parameter for addXp call: Stat was: ${stat}, Exp was: ${xp}`);
        }
        if (xp == 0) {
            return;
        }
        const multi = Number(Environment_default.XP_MULTIPLIER) || 1;
        this.stats[stat] += xp * multi;
        if (this.stats[stat] > 2000000000) {
            this.stats[stat] = 2000000000;
        }
        const before = this.baseLevels[stat];
        if (this.levels[stat] === this.baseLevels[stat]) {
            this.levels[stat] = getLevelByExp(this.stats[stat]);
        }
        this.baseLevels[stat] = getLevelByExp(this.stats[stat]);
        if (this.baseLevels[stat] > before) {
            if (this.levels[stat] < before) {
                this.levels[stat] += 1;
            }
            const script = ScriptProvider.getByTriggerSpecific(ServerTriggerType_default.LEVELUP, stat, -1);
            if (script) {
                this.enqueueScript(script, 1 /* ENGINE */);
            }
        }
        if (this.combatLevel != this.getCombatLevel()) {
            this.combatLevel = this.getCombatLevel();
            this.generateAppearance(InvType.WORN);
        }
    }
    setLevel(stat, level) {
        level = Math.min(99, Math.max(1, level));
        this.baseLevels[stat] = level;
        this.levels[stat] = level;
        this.stats[stat] = getExpByLevel(level);
        if (this.getCombatLevel() != this.combatLevel) {
            this.combatLevel = this.getCombatLevel();
            this.generateAppearance(InvType.WORN);
        }
    }
    playAnimation(anim, delay) {
        if (anim >= SeqType.count || this.animProtect) {
            return;
        }
        if (anim == -1 || this.animId == -1 || SeqType.get(anim).priority > SeqType.get(this.animId).priority || SeqType.get(this.animId).priority === 0) {
            this.animId = anim;
            this.animDelay = delay;
            this.mask |= Player2.ANIM;
        }
    }
    spotanim(spotanim, height, delay) {
        this.graphicId = spotanim;
        this.graphicHeight = height;
        this.graphicDelay = delay;
        this.mask |= Player2.SPOTANIM;
    }
    applyDamage(damage, type) {
        this.damageTaken = damage;
        this.damageType = type;
        const current = this.levels[PlayerStat_default.HITPOINTS];
        if (current - damage <= 0) {
            this.levels[PlayerStat_default.HITPOINTS] = 0;
            this.damageTaken = current;
        } else {
            this.levels[PlayerStat_default.HITPOINTS] = current - damage;
        }
        this.mask |= Player2.DAMAGE;
    }
    say(message) {
        this.chat = message;
        this.mask |= Player2.SAY;
    }
    faceSquare(x, z2) {
        this.faceX = x * 2 + 1;
        this.faceZ = z2 * 2 + 1;
        this.orientation = Position.face(this.x, this.z, x, z2);
        this.mask |= Player2.FACE_COORD;
    }
    playSong(name) {
        name = name.toLowerCase().replaceAll(' ', '_');
        if (!name) {
            return;
        }
        const song = PRELOADED.get(name + '.mid');
        const crc = PRELOADED_CRC.get(name + '.mid');
        if (song && crc) {
            const length = song.length;
            this.write(new MidiSong(name, crc, length));
        }
    }
    playJingle(delay, name) {
        name = name.toLowerCase().replaceAll('_', ' ');
        if (!name) {
            return;
        }
        const jingle = PRELOADED.get(name + '.mid');
        if (jingle) {
            this.write(new MidiJingle(delay, jingle));
        }
    }
    openMainModal(com) {
        if (this.modalState & 4) {
            this.write(new IfClose());
            this.modalState &= ~4;
            this.modalSidebar = -1;
        }
        this.modalState |= 1;
        this.modalTop = com;
        this.refreshModal = true;
    }
    openChat(com) {
        this.modalState |= 2;
        this.modalBottom = com;
        this.refreshModal = true;
    }
    openSideOverlay(com) {
        this.modalState |= 4;
        this.modalSidebar = com;
        this.refreshModal = true;
    }
    openChatSticky(com) {
        this.write(new TutorialOpenChat(com));
        this.modalState |= 8;
        this.modalSticky = com;
    }
    openMainModalSideOverlay(top, side) {
        this.modalState |= 1;
        this.modalTop = top;
        this.modalState |= 4;
        this.modalSidebar = side;
        this.refreshModal = true;
    }
    exactMove(startX, startZ, endX, endZ, startCycle, endCycle, direction) {
        this.exactStartX = startX;
        this.exactStartZ = startZ;
        this.exactEndX = endX;
        this.exactEndZ = endZ;
        this.exactMoveStart = startCycle;
        this.exactMoveEnd = endCycle;
        this.exactMoveDirection = direction;
        this.mask |= Player2.EXACT_MOVE;
        this.x = endX;
        this.z = endZ;
        this.lastStepX = this.x - 1;
        this.lastStepZ = this.z;
    }
    setTab(com, tab) {
        this.overlaySide[tab] = com;
        this.write(new IfOpenSideOverlay(com, tab));
    }
    isComponentVisible(com) {
        return this.modalTop === com.rootLayer || this.modalBottom === com.rootLayer || this.modalSidebar === com.rootLayer || this.overlaySide.findIndex(l => l === com.rootLayer) !== -1 || this.modalSticky === com.rootLayer;
    }
    updateAfkZones() {
        this.lastAfkZone = Math.min(1000, this.lastAfkZone + 1);
        if (this.withinAfkZone()) {
            return;
        }
        const coord = Position.packCoord(0, this.x - 10, this.z - 10);
        if (this.moveSpeed === MoveSpeed_default.INSTANT && this.jump) {
            this.afkZones[1] = coord;
        } else {
            this.afkZones[1] = this.afkZones[0];
        }
        this.afkZones[0] = coord;
        this.lastAfkZone = 0;
    }
    zonesAfk() {
        return this.lastAfkZone === 1000;
    }
    withinAfkZone() {
        const size = 21;
        for (let index = 0; index < this.afkZones.length; index++) {
            const coord = Position.unpackCoord(this.afkZones[index]);
            if (Position.intersects(this.x, this.z, this.width, this.length, coord.x, coord.z, size, size)) {
                return true;
            }
        }
        return false;
    }
    isInWilderness() {
        if (this.x >= 2944 && this.x < 3392 && this.z >= 3520 && this.z < 6400) {
            return true;
        } else if (this.x >= 2944 && this.x < 3392 && this.z >= 9920 && this.z < 12800) {
            return true;
        } else {
            return false;
        }
    }
    runScript(script, protect = false, force = false) {
        if (!force && protect && (this.protect || this.delayed())) {
            return -1;
        }
        if (protect) {
            script.pointerAdd(ScriptPointer_default.ProtectedActivePlayer);
            this.protect = true;
        }
        const state = ScriptRunner2.execute(script);
        if (protect) {
            this.protect = false;
        }
        if (script.pointerGet(ScriptPointer_default.ProtectedActivePlayer) && script._activePlayer) {
            script.pointerRemove(ScriptPointer_default.ProtectedActivePlayer);
            script._activePlayer.protect = false;
        }
        if (script.pointerGet(ScriptPointer_default.ProtectedActivePlayer2) && script._activePlayer2) {
            script.pointerRemove(ScriptPointer_default.ProtectedActivePlayer2);
            script._activePlayer2.protect = false;
        }
        return state;
    }
    executeScript(script, protect = false, force = false) {
        const state = this.runScript(script, protect, force);
        if (state === -1) {
            return;
        }
        if (state !== ScriptState.FINISHED && state !== ScriptState.ABORTED) {
            if (state === ScriptState.WORLD_SUSPENDED) {
                World_default.enqueueScript(script, script.popInt());
            } else if (state === ScriptState.NPC_SUSPENDED) {
                script.activeNpc.activeScript = script;
            } else {
                script.activePlayer.activeScript = script;
                script.activePlayer.protect = protect;
            }
        } else if (script === this.activeScript) {
            this.activeScript = null;
            if ((this.modalState & 1) == 0) {
                this.closeModal();
            }
        }
    }
    wrappedMessageGame(mes) {
        const font = FontType.get(1);
        const lines = font.split(mes, 456);
        for (const line of lines) {
            this.messageGame(line);
        }
    }
    write(message) {
        if (message.priority === ServerProtPriority.HIGH) {
            this.highPriorityOut.push(message);
        } else {
            this.lowPriorityOut.push(message);
        }
    }
    unsetMapFlag() {
        this.clearWaypoints();
        this.write(new UnsetMapFlag());
    }
    hintNpc(nid) {
        this.write(new HintArrow(1, nid, 0, 0, 0, 0));
    }
    hintTile(offset, x, z2, height) {
        this.write(new HintArrow(offset, 0, 0, x, z2, height));
    }
    hintPlayer(pid) {
        this.write(new HintArrow(10, 0, pid, 0, 0, 0));
    }
    stopHint() {
        this.write(new HintArrow(-1, 0, 0, 0, 0, 0));
    }
    lastLoginInfo(lastLoginIp, daysSinceLogin, daysSinceRecoveryChange, unreadMessageCount) {
        this.write(new LastLoginInfo(lastLoginIp, daysSinceLogin, daysSinceRecoveryChange, unreadMessageCount));
        this.modalState |= 16;
    }
    logout() {}
    terminate() {}
    messageGame(msg) {
        this.write(new MessageGame(msg));
    }
}

// src/lostcity/network/225/incoming/prot/ClientProt.ts
class ClientProt {
    index;
    id;
    length;
    static all = [];
    static byId = [];
    static REBUILD_GETMAPS = new ClientProt(4, 150, -1);
    static NO_TIMEOUT = new ClientProt(6, 108, 0);
    static IDLE_TIMER = new ClientProt(30, 70, 0);
    static EVENT_TRACKING = new ClientProt(34, 81, -2);
    static EVENT_CAMERA_POSITION = new ClientProt(35, 189, 6);
    static ANTICHEAT_OPLOGIC1 = new ClientProt(60, 7, 4);
    static ANTICHEAT_OPLOGIC2 = new ClientProt(61, 88, 4);
    static ANTICHEAT_OPLOGIC3 = new ClientProt(62, 30, 3);
    static ANTICHEAT_OPLOGIC4 = new ClientProt(63, 176, 2);
    static ANTICHEAT_OPLOGIC5 = new ClientProt(64, 220, 0);
    static ANTICHEAT_OPLOGIC6 = new ClientProt(65, 66, 4);
    static ANTICHEAT_OPLOGIC7 = new ClientProt(66, 17, 4);
    static ANTICHEAT_OPLOGIC8 = new ClientProt(67, 2, 2);
    static ANTICHEAT_OPLOGIC9 = new ClientProt(68, 238, 1);
    static ANTICHEAT_CYCLELOGIC1 = new ClientProt(70, 233, 1);
    static ANTICHEAT_CYCLELOGIC2 = new ClientProt(71, 146, -1);
    static ANTICHEAT_CYCLELOGIC3 = new ClientProt(74, 215, 3);
    static ANTICHEAT_CYCLELOGIC4 = new ClientProt(72, 236, 4);
    static ANTICHEAT_CYCLELOGIC5 = new ClientProt(75, 85, 0);
    static ANTICHEAT_CYCLELOGIC6 = new ClientProt(73, 219, -1);
    static OPOBJ1 = new ClientProt(80, 140, 6);
    static OPOBJ2 = new ClientProt(81, 40, 6);
    static OPOBJ3 = new ClientProt(82, 200, 6);
    static OPOBJ4 = new ClientProt(83, 178, 6);
    static OPOBJ5 = new ClientProt(84, 247, 6);
    static OPOBJT = new ClientProt(88, 138, 8);
    static OPOBJU = new ClientProt(89, 239, 12);
    static OPNPC1 = new ClientProt(100, 194, 2);
    static OPNPC2 = new ClientProt(101, 8, 2);
    static OPNPC3 = new ClientProt(102, 27, 2);
    static OPNPC4 = new ClientProt(103, 113, 2);
    static OPNPC5 = new ClientProt(104, 100, 2);
    static OPNPCT = new ClientProt(108, 134, 4);
    static OPNPCU = new ClientProt(109, 202, 8);
    static OPLOC1 = new ClientProt(120, 245, 6);
    static OPLOC2 = new ClientProt(121, 172, 6);
    static OPLOC3 = new ClientProt(122, 96, 6);
    static OPLOC4 = new ClientProt(123, 97, 6);
    static OPLOC5 = new ClientProt(124, 116, 6);
    static OPLOCT = new ClientProt(128, 9, 8);
    static OPLOCU = new ClientProt(129, 75, 12);
    static OPPLAYER1 = new ClientProt(140, 164, 2);
    static OPPLAYER2 = new ClientProt(141, 53, 2);
    static OPPLAYER3 = new ClientProt(142, 185, 2);
    static OPPLAYER4 = new ClientProt(143, 206, 2);
    static OPPLAYERT = new ClientProt(148, 177, 4);
    static OPPLAYERU = new ClientProt(149, 248, 8);
    static OPHELD1 = new ClientProt(160, 195, 6);
    static OPHELD2 = new ClientProt(161, 71, 6);
    static OPHELD3 = new ClientProt(162, 133, 6);
    static OPHELD4 = new ClientProt(163, 157, 6);
    static OPHELD5 = new ClientProt(164, 211, 6);
    static OPHELDT = new ClientProt(168, 48, 8);
    static OPHELDU = new ClientProt(169, 130, 12);
    static INV_BUTTON1 = new ClientProt(190, 31, 6);
    static INV_BUTTON2 = new ClientProt(191, 59, 6);
    static INV_BUTTON3 = new ClientProt(192, 212, 6);
    static INV_BUTTON4 = new ClientProt(193, 38, 6);
    static INV_BUTTON5 = new ClientProt(194, 6, 6);
    static IF_BUTTON = new ClientProt(200, 155, 2);
    static RESUME_PAUSEBUTTON = new ClientProt(201, 235, 2);
    static CLOSE_MODAL = new ClientProt(202, 231, 0);
    static RESUME_P_COUNTDIALOG = new ClientProt(203, 237, 4);
    static TUTORIAL_CLICKSIDE = new ClientProt(204, 175, 1);
    static MOVE_OPCLICK = new ClientProt(242, 93, -1);
    static BUG_REPORT = new ClientProt(243, 190, 10);
    static MOVE_MINIMAPCLICK = new ClientProt(244, 165, -1);
    static INV_BUTTOND = new ClientProt(245, 159, 6);
    static IGNORELIST_DEL = new ClientProt(246, 171, 8);
    static IGNORELIST_ADD = new ClientProt(247, 79, 8);
    static IF_PLAYERDESIGN = new ClientProt(248, 52, 13);
    static CHAT_SETMODE = new ClientProt(249, 244, 3);
    static MESSAGE_PRIVATE = new ClientProt(250, 148, -1);
    static FRIENDLIST_DEL = new ClientProt(251, 11, 8);
    static FRIENDLIST_ADD = new ClientProt(252, 118, 8);
    static CLIENT_CHEAT = new ClientProt(253, 4, -1);
    static MESSAGE_PUBLIC = new ClientProt(254, 158, -1);
    static MOVE_GAMECLICK = new ClientProt(255, 181, -1);
    constructor(index, id, length) {
        this.index = index;
        this.id = id;
        this.length = length;
        ClientProt.all[index] = this;
        ClientProt.byId[id] = this;
    }
}

// src/lostcity/network/incoming/codec/MessageDecoder.ts
class MessageDecoder {}

// src/lostcity/network/incoming/IncomingMessage.ts
class IncomingMessage {}

// src/lostcity/network/incoming/prot/ClientProtCategory.ts
class ClientProtCategory {
    id;
    limit;
    static CLIENT_EVENT = new ClientProtCategory(0, 20);
    static USER_EVENT = new ClientProtCategory(1, 5);
    constructor(id, limit) {
        this.id = id;
        this.limit = limit;
    }
}

// src/lostcity/network/incoming/model/ClientCheat.ts
class ClientCheat extends IncomingMessage {
    input;
    category = ClientProtCategory.USER_EVENT;
    constructor(input) {
        super();
        this.input = input;
    }
}

// src/lostcity/network/225/incoming/codec/ClientCheatDecoder.ts
class ClientCheatDecoder extends MessageDecoder {
    prot = ClientProt.CLIENT_CHEAT;
    decode(buf) {
        const input = buf.gjstr();
        return new ClientCheat(input);
    }
}

// src/lostcity/network/incoming/model/CloseModal.ts
class CloseModal extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;
}

// src/lostcity/network/225/incoming/codec/CloseModalDecoder.ts
class CloseModalDecoder extends MessageDecoder {
    prot = ClientProt.CLOSE_MODAL;
    decode() {
        return new CloseModal();
    }
}

// src/lostcity/network/incoming/model/IdleTimer.ts
class IdleTimer extends IncomingMessage {
    category = ClientProtCategory.CLIENT_EVENT;
}

// src/lostcity/network/225/incoming/codec/IdleTimerDecoder.ts
class IdleTimerDecoder extends MessageDecoder {
    prot = ClientProt.IDLE_TIMER;
    decode() {
        return new IdleTimer();
    }
}

// src/lostcity/network/incoming/model/IfButton.ts
class IfButton extends IncomingMessage {
    component;
    category = ClientProtCategory.USER_EVENT;
    constructor(component) {
        super();
        this.component = component;
    }
}

// src/lostcity/network/225/incoming/codec/IfButtonDecoder.ts
class IfButtonDecoder extends MessageDecoder {
    prot = ClientProt.IF_BUTTON;
    decode(buf) {
        const component = buf.g2();
        return new IfButton(component);
    }
}

// src/lostcity/network/incoming/model/IfPlayerDesign.ts
class IfPlayerDesign extends IncomingMessage {
    gender;
    idkit;
    color;
    category = ClientProtCategory.USER_EVENT;
    constructor(gender, idkit, color) {
        super();
        this.gender = gender;
        this.idkit = idkit;
        this.color = color;
    }
}

// src/lostcity/network/225/incoming/codec/IfPlayerDesignDecoder.ts
class IfPlayerDesignDecoder extends MessageDecoder {
    prot = ClientProt.IF_PLAYERDESIGN;
    decode(buf) {
        const gender = buf.g1();
        const idkit = [];
        for (let i = 0; i < 7; i++) {
            idkit[i] = buf.g1();
            if (idkit[i] === 255) {
                idkit[i] = -1;
            }
        }
        const color = [];
        for (let i = 0; i < 5; i++) {
            color[i] = buf.g1();
        }
        return new IfPlayerDesign(gender, idkit, color);
    }
}

// src/lostcity/network/incoming/model/InvButton.ts
class InvButton extends IncomingMessage {
    op;
    obj;
    slot;
    component;
    category = ClientProtCategory.USER_EVENT;
    constructor(op, obj, slot, component) {
        super();
        this.op = op;
        this.obj = obj;
        this.slot = slot;
        this.component = component;
    }
}

// src/lostcity/network/225/incoming/codec/InvButtonDecoder.ts
class InvButtonDecoder extends MessageDecoder {
    prot;
    op;
    constructor(prot, op) {
        super();
        this.prot = prot;
        this.op = op;
    }
    decode(buf) {
        const obj = buf.g2();
        const slot = buf.g2();
        const component = buf.g2();
        return new InvButton(this.op, obj, slot, component);
    }
}

// src/lostcity/network/incoming/model/InvButtonD.ts
class InvButtonD extends IncomingMessage {
    component;
    slot;
    targetSlot;
    category = ClientProtCategory.USER_EVENT;
    constructor(component, slot, targetSlot) {
        super();
        this.component = component;
        this.slot = slot;
        this.targetSlot = targetSlot;
    }
}

// src/lostcity/network/225/incoming/codec/InvButtonDDecoder.ts
class InvButtonDDecoder extends MessageDecoder {
    prot = ClientProt.INV_BUTTOND;
    decode(buf) {
        const component = buf.g2();
        const slot = buf.g2();
        const targetSlot = buf.g2();
        return new InvButtonD(component, slot, targetSlot);
    }
}

// src/lostcity/network/incoming/model/MessagePrivate.ts
class MessagePrivate3 extends IncomingMessage {
    username;
    input;
    category = ClientProtCategory.USER_EVENT;
    constructor(username, input) {
        super();
        this.username = username;
        this.input = input;
    }
}

// src/lostcity/network/225/incoming/codec/MessagePrivateDecoder.ts
class MessagePrivateDecoder extends MessageDecoder {
    prot = ClientProt.MESSAGE_PRIVATE;
    decode(buf) {
        const username = buf.g8();
        const input = WordPack.unpack(buf, buf.length - 8);
        return new MessagePrivate3(username, input);
    }
}

// src/lostcity/network/incoming/model/MessagePublic.ts
class MessagePublic extends IncomingMessage {
    input;
    color;
    effect;
    category = ClientProtCategory.USER_EVENT;
    constructor(input, color, effect) {
        super();
        this.input = input;
        this.color = color;
        this.effect = effect;
    }
}

// src/lostcity/network/225/incoming/codec/MessagePublicDecoder.ts
class MessagePublicDecoder extends MessageDecoder {
    prot = ClientProt.MESSAGE_PUBLIC;
    decode(buf) {
        const color = buf.g1();
        const effect = buf.g1();
        const input = WordPack.unpack(buf, buf.length - 2);
        return new MessagePublic(input, color, effect);
    }
}

// src/lostcity/network/incoming/model/OpHeld.ts
class OpHeld extends IncomingMessage {
    op;
    obj;
    slot;
    component;
    category = ClientProtCategory.USER_EVENT;
    constructor(op, obj, slot, component) {
        super();
        this.op = op;
        this.obj = obj;
        this.slot = slot;
        this.component = component;
    }
}

// src/lostcity/network/225/incoming/codec/OpHeldDecoder.ts
class OpHeldDecoder extends MessageDecoder {
    prot;
    op;
    constructor(prot, op) {
        super();
        this.prot = prot;
        this.op = op;
    }
    decode(buf) {
        const obj = buf.g2();
        const slot = buf.g2();
        const component = buf.g2();
        return new OpHeld(this.op, obj, slot, component);
    }
}

// src/lostcity/network/incoming/model/OpHeldT.ts
class OpHeldT extends IncomingMessage {
    obj;
    slot;
    component;
    spellComponent;
    category = ClientProtCategory.USER_EVENT;
    constructor(obj, slot, component, spellComponent) {
        super();
        this.obj = obj;
        this.slot = slot;
        this.component = component;
        this.spellComponent = spellComponent;
    }
}

// src/lostcity/network/225/incoming/codec/OpHeldTDecoder.ts
class OpHeldTDecoder extends MessageDecoder {
    prot = ClientProt.OPHELDT;
    decode(buf) {
        const obj = buf.g2();
        const slot = buf.g2();
        const component = buf.g2();
        const spellComponent = buf.g2();
        return new OpHeldT(obj, slot, component, spellComponent);
    }
}

// src/lostcity/network/incoming/model/OpHeldU.ts
class OpHeldU extends IncomingMessage {
    obj;
    slot;
    component;
    useObj;
    useSlot;
    useComponent;
    category = ClientProtCategory.USER_EVENT;
    constructor(obj, slot, component, useObj, useSlot, useComponent) {
        super();
        this.obj = obj;
        this.slot = slot;
        this.component = component;
        this.useObj = useObj;
        this.useSlot = useSlot;
        this.useComponent = useComponent;
    }
}

// src/lostcity/network/225/incoming/codec/OpHeldUDecoder.ts
class OpHeldUDecoder extends MessageDecoder {
    prot = ClientProt.OPHELDU;
    decode(buf) {
        const obj = buf.g2();
        const slot = buf.g2();
        const component = buf.g2();
        const useObj = buf.g2();
        const useSlot = buf.g2();
        const useComponent = buf.g2();
        return new OpHeldU(obj, slot, component, useObj, useSlot, useComponent);
    }
}

// src/lostcity/network/incoming/model/OpLoc.ts
class OpLoc extends IncomingMessage {
    op;
    x;
    z2;
    loc;
    category = ClientProtCategory.USER_EVENT;
    constructor(op, x, z2, loc) {
        super();
        this.op = op;
        this.x = x;
        this.z = z2;
        this.loc = loc;
    }
}

// src/lostcity/network/225/incoming/codec/OpLocDecoder.ts
class OpLocDecoder extends MessageDecoder {
    prot;
    op;
    constructor(prot, op) {
        super();
        this.prot = prot;
        this.op = op;
    }
    decode(buf) {
        const x = buf.g2();
        const z2 = buf.g2();
        const loc = buf.g2();
        return new OpLoc(this.op, x, z2, loc);
    }
}

// src/lostcity/network/incoming/model/OpLocT.ts
class OpLocT extends IncomingMessage {
    x;
    z2;
    loc;
    spellComponent;
    category = ClientProtCategory.USER_EVENT;
    constructor(x, z2, loc, spellComponent) {
        super();
        this.x = x;
        this.z = z2;
        this.loc = loc;
        this.spellComponent = spellComponent;
    }
}

// src/lostcity/network/225/incoming/codec/OpLocTDecoder.ts
class OpLocTDecoder extends MessageDecoder {
    prot = ClientProt.OPLOCT;
    decode(buf) {
        const x = buf.g2();
        const z2 = buf.g2();
        const loc = buf.g2();
        const spellComponent = buf.g2();
        return new OpLocT(x, z2, loc, spellComponent);
    }
}

// src/lostcity/network/incoming/model/OpLocU.ts
class OpLocU extends IncomingMessage {
    x;
    z2;
    loc;
    useObj;
    useSlot;
    useComponent;
    category = ClientProtCategory.USER_EVENT;
    constructor(x, z2, loc, useObj, useSlot, useComponent) {
        super();
        this.x = x;
        this.z = z2;
        this.loc = loc;
        this.useObj = useObj;
        this.useSlot = useSlot;
        this.useComponent = useComponent;
    }
}

// src/lostcity/network/225/incoming/codec/OpLocUDecoder.ts
class OpLocUDecoder extends MessageDecoder {
    prot = ClientProt.OPLOCU;
    decode(buf) {
        const x = buf.g2();
        const z2 = buf.g2();
        const loc = buf.g2();
        const useObj = buf.g2();
        const useSlot = buf.g2();
        const useComponent = buf.g2();
        return new OpLocU(x, z2, loc, useObj, useSlot, useComponent);
    }
}

// src/lostcity/network/incoming/model/OpNpc.ts
class OpNpc extends IncomingMessage {
    op;
    nid;
    category = ClientProtCategory.USER_EVENT;
    constructor(op, nid) {
        super();
        this.op = op;
        this.nid = nid;
    }
}

// src/lostcity/network/225/incoming/codec/OpNpcDecoder.ts
class OpNpcDecoder extends MessageDecoder {
    prot;
    op;
    constructor(prot, op) {
        super();
        this.prot = prot;
        this.op = op;
    }
    decode(buf) {
        const nid = buf.g2();
        return new OpNpc(this.op, nid);
    }
}

// src/lostcity/network/incoming/model/OpNpcT.ts
class OpNpcT extends IncomingMessage {
    nid;
    spellComponent;
    category = ClientProtCategory.USER_EVENT;
    constructor(nid, spellComponent) {
        super();
        this.nid = nid;
        this.spellComponent = spellComponent;
    }
}

// src/lostcity/network/225/incoming/codec/OpNpcTDecoder.ts
class OpNpcTDecoder extends MessageDecoder {
    prot = ClientProt.OPNPCT;
    decode(buf) {
        const nid = buf.g2();
        const spellComponent = buf.g2();
        return new OpNpcT(nid, spellComponent);
    }
}

// src/lostcity/network/incoming/model/OpNpcU.ts
class OpNpcU extends IncomingMessage {
    nid;
    useObj;
    useSlot;
    useComponent;
    category = ClientProtCategory.USER_EVENT;
    constructor(nid, useObj, useSlot, useComponent) {
        super();
        this.nid = nid;
        this.useObj = useObj;
        this.useSlot = useSlot;
        this.useComponent = useComponent;
    }
}

// src/lostcity/network/225/incoming/codec/OpNpcUDecoder.ts
class OpNpcUDecoder extends MessageDecoder {
    prot = ClientProt.OPNPCU;
    decode(buf) {
        const nid = buf.g2();
        const useObj = buf.g2();
        const useSlot = buf.g2();
        const useComponent = buf.g2();
        return new OpNpcU(nid, useObj, useSlot, useComponent);
    }
}

// src/lostcity/network/incoming/model/OpObj.ts
class OpObj extends IncomingMessage {
    op;
    x;
    z2;
    obj;
    category = ClientProtCategory.USER_EVENT;
    constructor(op, x, z2, obj) {
        super();
        this.op = op;
        this.x = x;
        this.z = z2;
        this.obj = obj;
    }
}

// src/lostcity/network/225/incoming/codec/OpObjDecoder.ts
class OpObjDecoder extends MessageDecoder {
    prot;
    op;
    constructor(prot, op) {
        super();
        this.prot = prot;
        this.op = op;
    }
    decode(buf) {
        const x = buf.g2();
        const z2 = buf.g2();
        const obj = buf.g2();
        return new OpObj(this.op, x, z2, obj);
    }
}

// src/lostcity/network/incoming/model/OpObjT.ts
class OpObjT extends IncomingMessage {
    x;
    z2;
    obj;
    spellComponent;
    category = ClientProtCategory.USER_EVENT;
    constructor(x, z2, obj, spellComponent) {
        super();
        this.x = x;
        this.z = z2;
        this.obj = obj;
        this.spellComponent = spellComponent;
    }
}

// src/lostcity/network/225/incoming/codec/OpObjTDecoder.ts
class OpObjTDecoder extends MessageDecoder {
    prot = ClientProt.OPOBJT;
    decode(buf) {
        const x = buf.g2();
        const z2 = buf.g2();
        const obj = buf.g2();
        const spellComponent = buf.g2();
        return new OpObjT(x, z2, obj, spellComponent);
    }
}

// src/lostcity/network/incoming/model/OpObjU.ts
class OpObjU extends IncomingMessage {
    x;
    z2;
    obj;
    useObj;
    useSlot;
    useComponent;
    category = ClientProtCategory.USER_EVENT;
    constructor(x, z2, obj, useObj, useSlot, useComponent) {
        super();
        this.x = x;
        this.z = z2;
        this.obj = obj;
        this.useObj = useObj;
        this.useSlot = useSlot;
        this.useComponent = useComponent;
    }
}

// src/lostcity/network/225/incoming/codec/OpObjUDecoder.ts
class OpObjUDecoder extends MessageDecoder {
    prot = ClientProt.OPOBJU;
    decode(buf) {
        const x = buf.g2();
        const z2 = buf.g2();
        const obj = buf.g2();
        const useObj = buf.g2();
        const useSlot = buf.g2();
        const useComponent = buf.g2();
        return new OpObjU(x, z2, obj, useObj, useSlot, useComponent);
    }
}

// src/lostcity/network/incoming/model/OpPlayer.ts
class OpPlayer extends IncomingMessage {
    op;
    pid;
    category = ClientProtCategory.USER_EVENT;
    constructor(op, pid) {
        super();
        this.op = op;
        this.pid = pid;
    }
}

// src/lostcity/network/225/incoming/codec/OpPlayerDecoder.ts
class OpPlayerDecoder extends MessageDecoder {
    prot;
    op;
    constructor(prot, op) {
        super();
        this.prot = prot;
        this.op = op;
    }
    decode(buf) {
        const pid = buf.g2();
        return new OpPlayer(this.op, pid);
    }
}

// src/lostcity/network/incoming/model/OpPlayerT.ts
class OpPlayerT extends IncomingMessage {
    pid;
    spellComponent;
    category = ClientProtCategory.USER_EVENT;
    constructor(pid, spellComponent) {
        super();
        this.pid = pid;
        this.spellComponent = spellComponent;
    }
}

// src/lostcity/network/225/incoming/codec/OpPlayerTDecoder.ts
class OpPlayerTDecoder extends MessageDecoder {
    prot = ClientProt.OPPLAYERT;
    decode(buf) {
        const pid = buf.g2();
        const spellComponent = buf.g2();
        return new OpPlayerT(pid, spellComponent);
    }
}

// src/lostcity/network/incoming/model/OpPlayerU.ts
class OpPlayerU extends IncomingMessage {
    pid;
    useObj;
    useSlot;
    useComponent;
    category = ClientProtCategory.USER_EVENT;
    constructor(pid, useObj, useSlot, useComponent) {
        super();
        this.pid = pid;
        this.useObj = useObj;
        this.useSlot = useSlot;
        this.useComponent = useComponent;
    }
}

// src/lostcity/network/225/incoming/codec/OpPlayerUDecoder.ts
class OpPlayerUDecoder extends MessageDecoder {
    prot = ClientProt.OPPLAYERU;
    decode(buf) {
        const pid = buf.g2();
        const useObj = buf.g2();
        const useSlot = buf.g2();
        const useComponent = buf.g2();
        return new OpPlayerU(pid, useObj, useSlot, useComponent);
    }
}

// src/lostcity/network/incoming/model/RebuildGetMaps.ts
class RebuildGetMaps extends IncomingMessage {
    maps;
    category = ClientProtCategory.USER_EVENT;
    constructor(maps) {
        super();
        this.maps = maps;
    }
}

// src/lostcity/network/225/incoming/codec/RebuildGetMapsDecoder.ts
class RebuildGetMapsDecoder extends MessageDecoder {
    prot = ClientProt.REBUILD_GETMAPS;
    decode(buf) {
        const maps = [];
        const count = buf.length / 3;
        for (let i = 0; i < count; i++) {
            const type = buf.g1();
            const x = buf.g1();
            const z2 = buf.g1();
            maps.push({type, x, z: z2});
        }
        return new RebuildGetMaps(maps);
    }
}

// src/lostcity/network/incoming/model/ResumePauseButton.ts
class ResumePauseButton extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;
}

// src/lostcity/network/225/incoming/codec/ResumePauseButtonDecoder.ts
class ResumePauseButtonDecoder extends MessageDecoder {
    prot = ClientProt.RESUME_PAUSEBUTTON;
    decode() {
        return new ResumePauseButton();
    }
}

// src/lostcity/network/incoming/model/ResumePCountDialog.ts
class ResumePCountDialog extends IncomingMessage {
    input;
    category = ClientProtCategory.USER_EVENT;
    constructor(input) {
        super();
        this.input = input;
    }
}

// src/lostcity/network/225/incoming/codec/ResumePCountDialogDecoder.ts
class ResumePCountDialogDecoder extends MessageDecoder {
    prot = ClientProt.RESUME_P_COUNTDIALOG;
    decode(buf) {
        const input = buf.g4();
        return new ResumePCountDialog(input);
    }
}

// src/lostcity/network/incoming/model/TutorialClickSide.ts
class TutorialClickSide extends IncomingMessage {
    tab;
    category = ClientProtCategory.USER_EVENT;
    constructor(tab) {
        super();
        this.tab = tab;
    }
}

// src/lostcity/network/225/incoming/codec/TutorialClickSideDecoder.ts
class TutorialClickSideDecoder extends MessageDecoder {
    prot = ClientProt.TUTORIAL_CLICKSIDE;
    decode(buf) {
        const tab = buf.g1();
        return new TutorialClickSide(tab);
    }
}

// src/lostcity/network/incoming/handler/MessageHandler.ts
class MessageHandler {}

// src/lostcity/network/225/incoming/handler/InvButtonHandler.ts
class InvButtonHandler extends MessageHandler {
    handle(message, player) {
        const {op, obj: item, slot, component: comId} = message;
        const com = Component.get(comId);
        if (typeof com === 'undefined' || !com.inventoryOptions || !com.inventoryOptions.length || !player.isComponentVisible(com)) {
            return false;
        }
        if (!com.inventoryOptions[op - 1]) {
            return false;
        }
        const listener = player.invListeners.find(l => l.com === comId);
        if (!listener) {
            return false;
        }
        const inv = player.getInventoryFromListener(listener);
        if (!inv || !inv.validSlot(slot) || !inv.hasAt(slot, item)) {
            return false;
        }
        if (player.delayed()) {
            return false;
        }
        player.lastItem = item;
        player.lastSlot = slot;
        let trigger;
        if (op === 1) {
            trigger = ServerTriggerType_default.INV_BUTTON1;
        } else if (op === 2) {
            trigger = ServerTriggerType_default.INV_BUTTON2;
        } else if (op === 3) {
            trigger = ServerTriggerType_default.INV_BUTTON3;
        } else if (op === 4) {
            trigger = ServerTriggerType_default.INV_BUTTON4;
        } else {
            trigger = ServerTriggerType_default.INV_BUTTON5;
        }
        const script = ScriptProvider.getByTrigger(trigger, comId, -1);
        if (script) {
            const root = Component.get(com.rootLayer);
            player.executeScript(ScriptRunner2.init(script, player), root.overlay == false);
        } else {
            if (Environment_default.LOCAL_DEV) {
                player.messageGame(`No trigger for [${ServerTriggerType_default.toString(trigger)},${com.comName}]`);
            }
        }
        return true;
    }
}

// src/lostcity/server/ClientSocket.ts
class ClientSocket {
    state = -1;
    remoteAddress;
    totalBytesRead = 0;
    totalBytesWritten = 0;
    uniqueId = crypto.randomUUID();
    encryptor = null;
    decryptor = null;
    in = new Uint8Array(5000);
    inOffset = 0;
    inCount = new Uint8Array(256);
    out = new Packet(new Uint8Array(5000));
    player = null;
    constructor(remoteAddress = '0', state = -1) {
        this.remoteAddress = remoteAddress;
        this.state = state;
    }
    send(data) {
        this.totalBytesWritten += data.length;
        self.postMessage(data);
    }
    close() {
        setTimeout(() => {
            self.close();
        }, 100);
    }
    terminate() {
        self.close();
    }
    reset() {
        this.inOffset = 0;
        this.inCount.fill(0);
    }
    writeImmediate(data) {
        this.send(data);
    }
    flush() {
        const out = this.out;
        if (out.pos === 0) {
            return;
        }
        this.send(out.data.subarray(0, out.pos));
        out.pos = 0;
    }
}

// src/lostcity/server/NullClientSocket.ts
class NullClientSocket extends ClientSocket {
    constructor() {
        super(null, '');
    }
    isTCP() {
        return this.type === ClientSocket.TCP;
    }
    isWebSocket() {
        return this.type === ClientSocket.WEBSOCKET;
    }
    send(data) {
        if (!this.socket) {
            return;
        }
    }
    close() {
        if (!this.socket) {
            return;
        }
    }
    terminate() {
        if (!this.socket) {
            return;
        }
    }
    reset() {
        this.inOffset = 0;
        this.inCount.fill(0);
    }
}

// src/lostcity/util/TryParse.ts
function tryParseInt(value, defaultValue) {
    if (typeof value === 'number') {
        return value;
    }
    if (typeof value !== 'string' && typeof value !== 'number') {
        return defaultValue;
    }
    const intValue = parseInt(value);
    if (!isNaN(intValue)) {
        return intValue;
    }
    return defaultValue;
}

// src/lostcity/network/225/incoming/handler/ClientCheatHandler.ts
class ClientCheatHandler extends MessageHandler {
    handle(message, player) {
        if (message.input.length > 80) {
            return false;
        }
        const {input: cheat} = message;
        const args = cheat.toLowerCase().split(' ');
        const cmd = args.shift();
        if (cmd === undefined || cmd.length <= 0) {
            return false;
        }
        player.playerLog('Cheat ran', cheat);
        if (cmd === 'advancestat') {
            if (args.length < 1) {
                return false;
            }
            const stat = Player2.SKILLS.indexOf(args[0]);
            const level = Math.min(99, Math.max(1, tryParseInt(args[1], 1)));
            if (stat === -1) {
                return false;
            }
            player.setLevel(stat, player.baseLevels[stat] + level);
        } else if (cmd === 'getcoord') {
            player.messageGame(Position.formatString(player.level, player.x, player.z, '_'));
        } else if (cmd === 'getvar') {
            if (args.length < 1) {
                return false;
            }
            const varp = VarPlayerType.getId(args[0]);
            if (varp === -1) {
                return false;
            }
            const value = player.getVar(varp);
            player.messageGame('get ' + args[0] + ': ' + value);
        } else if (cmd === 'give') {
            if (args.length < 1) {
                return false;
            }
            const obj = ObjType.getId(args[0]);
            const count = Math.max(1, Math.min(tryParseInt(args[1], 1), 2147483647));
            if (obj === -1) {
                return false;
            }
            player.invAdd(InvType.INV, obj, count, false);
        } else if (cmd === 'givecrap') {
        } else if (cmd === 'givemany') {
        } else if (cmd === 'setstat') {
            if (args.length < 2) {
                return false;
            }
            const stat = Player2.SKILLS.indexOf(args[0]);
            if (stat === -1) {
                return false;
            }
            player.setLevel(stat, parseInt(args[1]));
        } else if (cmd === 'setvar') {
            if (args.length < 2) {
                return false;
            }
            const varp = VarPlayerType.getId(args[0]);
            const value = Math.max(-2147483648, Math.min(tryParseInt(args[1], 0), 2147483647));
            if (varp === -1) {
                return false;
            }
            player.setVar(varp, value);
            player.messageGame('set ' + args[0] + ': to ' + value);
        } else if (cmd === 'tele') {
            if (args.length < 1) {
                return false;
            }
            if (args[0] === 'up') {
                player.teleJump(player.x, player.z, player.level + 1);
                player.messageGame('::tele ' + Position.formatString(player.level, player.x, player.z, ','));
            } else if (args[0] === 'down') {
                player.teleJump(player.x, player.z, player.level - 1);
                player.messageGame('::tele ' + Position.formatString(player.level, player.x, player.z, ','));
            } else if (args[0].indexOf(',') === -1) {
                player.teleJump(tryParseInt(args[0], 3200), tryParseInt(args[1], 3200), tryParseInt(args[2], player.level));
            } else {
                const coord = args[0].split(',');
                if (coord.length !== 5) {
                    return false;
                }
                const level = tryParseInt(coord[0], 0);
                const mx = tryParseInt(coord[1], 50);
                const mz = tryParseInt(coord[2], 50);
                const lx = tryParseInt(coord[3], 0);
                const lz = tryParseInt(coord[4], 0);
                if (level < 0 || level > 3 || mx < 0 || mx > 255 || mz < 0 || mz > 255 || lx < 0 || lx > 63 || lz < 0 || lz > 63) {
                    return false;
                }
                player.teleJump((mx << 6) + lx, (mz << 6) + lz, level);
            }
        } else if (cmd === 'reload' && Environment_default.LOCAL_DEV) {
            World_default.reload();
            const count = ScriptProvider.load('data/pack');
            player.messageGame(`Reloaded ${count} scripts.`);
        } else if (cmd === 'rebuild' && Environment_default.LOCAL_DEV) {
            World_default.devThread.postMessage({
                type: 'pack'
            });
        } else if (cmd === 'setxp') {
            if (args.length < 2) {
                player.messageGame('Usage: ::setxp <stat> <xp>');
                return false;
            }
            const stat = Player2.SKILLS.indexOf(args[0]);
            if (stat === -1) {
                player.messageGame(`Unknown stat ${args[0]}`);
                return false;
            }
            const exp = parseInt(args[1]) * 10;
            player.stats[stat] = exp;
        } else if (cmd === 'minlevel') {
            for (let i = 0; i < Player2.SKILLS.length; i++) {
                if (i === PlayerStat_default.HITPOINTS) {
                    player.setLevel(i, 10);
                } else {
                    player.setLevel(i, 1);
                }
            }
        } else if (cmd === 'serverdrop') {
            player.terminate();
        } else if (cmd === 'random') {
            player.afkEventReady = true;
        } else if (cmd === 'bench' && player.staffModLevel >= 3) {
            const start = Date.now();
            for (let index = 0; index < 1e5; index++) {
                findPath(player.level, player.x, player.z, player.x, player.z + 10);
            }
            const end = Date.now();
            console.log(`took = ${end - start} ms`);
        } else if (cmd === 'bots' && player.staffModLevel >= 3) {
            player.messageGame('Adding bots');
            for (let i = 0; i < 2000; i++) {
                const bot = new NetworkPlayer2(`bot${i}`, toBase37(`bot${i}`), new NullClientSocket());
                bot.onLogin();
                World_default.addPlayer(bot);
            }
        } else if (cmd === 'teleall' && player.staffModLevel >= 3) {
            player.messageGame('Teleporting all players');
            for (const player2 of World_default.players) {
                player2.closeModal();
                do {
                    const x = Math.floor(Math.random() * 64) + 3200;
                    const z2 = Math.floor(Math.random() * 64) + 3200;
                    player2.teleport(x + Math.floor(Math.random() * 64) - 32, z2 + Math.floor(Math.random() * 64) - 32, 0);
                } while (isFlagged(player2.x, player2.z, player2.level, CollisionFlag.WALK_BLOCKED));
            }
        } else if (cmd === 'moveall' && player.staffModLevel >= 3) {
            player.messageGame('Moving all players');
            console.time('moveall');
            for (const player2 of World_default.players) {
                player2.closeModal();
                player2.queueWaypoints(findPath(player2.level, player2.x, player2.z, ((player2.x >>> 6) << 6) + 32, ((player2.z >>> 6) << 6) + 32));
            }
            console.timeEnd('moveall');
        } else if (cmd === 'speed' && player.staffModLevel >= 3) {
            if (args.length < 1) {
                player.messageGame('Usage: ::speed <ms>');
                return false;
            }
            const speed = tryParseInt(args.shift(), 20);
            if (speed < 20) {
                player.messageGame('::speed input was too low.');
                return false;
            }
            player.messageGame(`World speed was changed to ${speed}ms`);
            World_default.tickRate = speed;
        } else if (cmd === 'fly' && player.staffModLevel >= 3) {
            if (player.moveStrategy === MoveStrategy_default.FLY) {
                player.moveStrategy = MoveStrategy_default.SMART;
            } else {
                player.moveStrategy = MoveStrategy_default.FLY;
            }
            player.messageGame(`Fly is on? ${player.moveStrategy === MoveStrategy_default.FLY}`);
        } else if (cmd === 'naive' && player.staffModLevel >= 3) {
            if (player.moveStrategy === MoveStrategy_default.NAIVE) {
                player.moveStrategy = MoveStrategy_default.SMART;
            } else {
                player.moveStrategy = MoveStrategy_default.NAIVE;
            }
            player.messageGame(`Naive is on? ${player.moveStrategy === MoveStrategy_default.NAIVE}`);
        }
        const script = ScriptProvider.getByName(`[debugproc,${cmd}]`);
        if (!script) {
            return false;
        }
        const params = new Array(script.info.parameterTypes.length).fill(-1);
        for (let i = 0; i < script.info.parameterTypes.length; i++) {
            const type = script.info.parameterTypes[i];
            try {
                switch (type) {
                    case ScriptVarType.STRING: {
                        const value = args.shift();
                        params[i] = value ?? '';
                        break;
                    }
                    case ScriptVarType.INT: {
                        const value = args.shift();
                        params[i] = parseInt(value ?? '0', 10) | 0;
                        break;
                    }
                    case ScriptVarType.OBJ:
                    case ScriptVarType.NAMEDOBJ: {
                        const name = args.shift();
                        params[i] = ObjType.getId(name ?? '');
                        break;
                    }
                    case ScriptVarType.NPC: {
                        const name = args.shift();
                        params[i] = NpcType.getId(name ?? '');
                        break;
                    }
                    case ScriptVarType.LOC: {
                        const name = args.shift();
                        params[i] = LocType.getId(name ?? '');
                        break;
                    }
                    case ScriptVarType.SEQ: {
                        const name = args.shift();
                        params[i] = SeqType.getId(name ?? '');
                        break;
                    }
                    case ScriptVarType.STAT: {
                        const name = args.shift();
                        params[i] = Player2.SKILLS.indexOf(name ?? '');
                        break;
                    }
                    case ScriptVarType.INV: {
                        const name = args.shift();
                        params[i] = InvType.getId(name ?? '');
                        break;
                    }
                    case ScriptVarType.COORD: {
                        const args2 = cheat.split('_');
                        const level = parseInt(args2[0].slice(6));
                        const mx = parseInt(args2[1]);
                        const mz = parseInt(args2[2]);
                        const lx = parseInt(args2[3]);
                        const lz = parseInt(args2[4]);
                        params[i] = Position.packCoord(level, (mx << 6) + lx, (mz << 6) + lz);
                        break;
                    }
                    case ScriptVarType.INTERFACE: {
                        const name = args.shift();
                        params[i] = Component.getId(name ?? '');
                        break;
                    }
                    case ScriptVarType.SPOTANIM: {
                        const name = args.shift();
                        params[i] = SpotanimType.getId(name ?? '');
                        break;
                    }
                    case ScriptVarType.IDKIT: {
                        const name = args.shift();
                        params[i] = IdkType.getId(name ?? '');
                        break;
                    }
                }
            } catch (err) {
                return false;
            }
        }
        player.executeScript(ScriptRunner2.init(script, player, null, params), false);
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/CloseModalHandler.ts
class CloseModalHandler extends MessageHandler {
    handle(_message, player) {
        player.closeModal();
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/IdleTimerHandler.ts
class IdleTimerHandler extends MessageHandler {
    handle(_message, player) {
        if (!Environment_default.LOCAL_DEV) {
            player.logout();
            player.logoutRequested = true;
        }
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/IfButtonHandler.ts
class IfButtonHandler extends MessageHandler {
    handle(message, player) {
        const {component: comId} = message;
        const com = Component.get(comId);
        if (typeof com === 'undefined' || !player.isComponentVisible(com)) {
            return false;
        }
        player.lastCom = comId;
        if (player.resumeButtons.indexOf(player.lastCom) !== -1) {
            if (player.activeScript) {
                player.executeScript(player.activeScript, true);
            }
        } else {
            const root = Component.get(com.rootLayer);
            const script = ScriptProvider.getByTriggerSpecific(ServerTriggerType_default.IF_BUTTON, comId, -1);
            if (script) {
                player.executeScript(ScriptRunner2.init(script, player), root.overlay == false);
            } else {
                if (Environment_default.LOCAL_DEV) {
                    player.messageGame(`No trigger for [if_button,${com.comName}]`);
                }
            }
        }
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/IfPlayerDesignHandler.ts
class IfPlayerDesignHandler extends MessageHandler {
    handle(message, player) {
        const {gender, idkit, color} = message;
        if (!player.allowDesign) {
            return false;
        }
        if (gender > 1) {
            return false;
        }
        let pass = true;
        for (let i = 0; i < 7; i++) {
            let type = i;
            if (gender === 1) {
                type += 7;
            }
            if (type == 8 && idkit[i] === -1) {
                continue;
            }
            const idk = IdkType.get(idkit[i]);
            if (!idk || idk.disable || idk.type != type) {
                pass = false;
                break;
            }
        }
        if (!pass) {
            return false;
        }
        for (let i = 0; i < 5; i++) {
            if (color[i] >= Player2.DESIGN_BODY_COLORS[i].length) {
                pass = false;
                break;
            }
        }
        if (!pass) {
            return false;
        }
        player.gender = gender;
        player.body = idkit;
        player.colors = color;
        player.generateAppearance(InvType.WORN);
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/InvButtonDHandler.ts
class InvButtonDHandler extends MessageHandler {
    handle(message, player) {
        const {component: comId, slot, targetSlot} = message;
        const com = Component.get(comId);
        if (typeof com === 'undefined' || !player.isComponentVisible(com)) {
            return false;
        }
        const listener = player.invListeners.find(l => l.com === comId);
        if (!listener) {
            return false;
        }
        const inv = player.getInventoryFromListener(listener);
        if (!inv || !inv.validSlot(slot) || !inv.get(slot) || !inv.validSlot(targetSlot)) {
            return false;
        }
        if (player.delayed()) {
            player.write(new UpdateInvPartial(comId, inv, slot, targetSlot));
            return false;
        }
        player.lastSlot = slot;
        player.lastTargetSlot = targetSlot;
        const dragTrigger = ScriptProvider.getByTrigger(ServerTriggerType_default.INV_BUTTOND, comId);
        if (dragTrigger) {
            const root = Component.get(com.rootLayer);
            player.executeScript(ScriptRunner2.init(dragTrigger, player), root.overlay == false);
        } else {
            if (Environment_default.LOCAL_DEV) {
                player.messageGame(`No trigger for [inv_buttond,${com.comName}]`);
            }
        }
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/MessagePrivateHandler.ts
class MessagePrivateHandler extends MessageHandler {
    handle(message, player) {
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/MessagePublicHandler.ts
class MessagePublicHandler extends MessageHandler {
    handle(message, player) {
        const {color, effect, input} = message;
        if (color < 0 || color > 11 || effect < 0 || effect > 2 || input.length > 100) {
            return false;
        }
        player.messageColor = color;
        player.messageEffect = effect;
        player.messageType = 0;
        const out = Packet.alloc(0);
        WordPack.pack(out, WordEnc2.filter(input));
        player.message = new Uint8Array(out.pos);
        out.pos = 0;
        out.gdata(player.message, 0, player.message.length);
        out.release();
        player.mask |= Player2.CHAT;
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/OpHeldHandler.ts
class OpHeldHandler extends MessageHandler {
    handle(message, player) {
        const {obj: item, slot, component: comId} = message;
        const com = Component.get(comId);
        if (typeof com === 'undefined' || !player.isComponentVisible(com)) {
            return false;
        }
        const type = ObjType.get(item);
        if (message.op !== 5 && ((type.iop && !type.iop[message.op - 1]) || !type.iop)) {
            return false;
        }
        const listener = player.invListeners.find(l => l.com === comId);
        if (!listener) {
            return false;
        }
        const inv = player.getInventoryFromListener(listener);
        if (!inv || !inv.validSlot(slot) || !inv.hasAt(slot, item)) {
            return false;
        }
        if (player.delayed()) {
            return false;
        }
        player.lastItem = item;
        player.lastSlot = slot;
        player.clearInteraction();
        player.closeModal();
        let trigger;
        if (message.op === 1) {
            trigger = ServerTriggerType_default.OPHELD1;
        } else if (message.op === 2) {
            trigger = ServerTriggerType_default.OPHELD2;
        } else if (message.op === 3) {
            trigger = ServerTriggerType_default.OPHELD3;
        } else if (message.op === 4) {
            trigger = ServerTriggerType_default.OPHELD4;
        } else {
            trigger = ServerTriggerType_default.OPHELD5;
        }
        const script = ScriptProvider.getByTrigger(trigger, type.id, type.category);
        if (script) {
            player.executeScript(ScriptRunner2.init(script, player), true);
        } else {
            if (Environment_default.LOCAL_DEV) {
                player.messageGame(`No trigger for [${ServerTriggerType_default.toString(trigger)},${type.debugname}]`);
            }
        }
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/OpHeldTHandler.ts
class OpHeldTHandler extends MessageHandler {
    handle(message, player) {
        const {obj: item, slot, component: comId, spellComponent: spellComId} = message;
        const com = Component.get(comId);
        if (typeof com === 'undefined' || !player.isComponentVisible(com)) {
            player.unsetMapFlag();
            return false;
        }
        const spellCom = Component.get(comId);
        if (typeof spellCom === 'undefined' || !player.isComponentVisible(spellCom)) {
            player.unsetMapFlag();
            return false;
        }
        const listener = player.invListeners.find(l => l.com === comId);
        if (!listener) {
            player.unsetMapFlag();
            return false;
        }
        const inv = player.getInventoryFromListener(listener);
        if (!inv || !inv.validSlot(slot) || !inv.hasAt(slot, item)) {
            player.unsetMapFlag();
            return false;
        }
        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }
        player.lastItem = item;
        player.lastSlot = slot;
        player.clearInteraction();
        player.closeModal();
        const script = ScriptProvider.getByTrigger(ServerTriggerType_default.OPHELDT, spellComId, -1);
        if (script) {
            player.executeScript(ScriptRunner2.init(script, player), true);
        } else {
            if (Environment_default.LOCAL_DEV) {
                player.messageGame(`No trigger for [opheldt,${spellCom.comName}]`);
            }
            player.messageGame('Nothing interesting happens.');
        }
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/OpHeldUHandler.ts
class OpHeldUHandler extends MessageHandler {
    handle(message, player) {
        const {obj: item, slot, component: comId, useObj: useItem, useSlot, useComponent: useComId} = message;
        const com = Component.get(comId);
        if (typeof com === 'undefined' || !player.isComponentVisible(com)) {
            player.unsetMapFlag();
            return false;
        }
        const useCom = Component.get(comId);
        if (typeof useCom === 'undefined' || !player.isComponentVisible(useCom)) {
            player.unsetMapFlag();
            return false;
        }
        {
            const listener = player.invListeners.find(l => l.com === comId);
            if (!listener) {
                player.unsetMapFlag();
                return false;
            }
            const inv = player.getInventoryFromListener(listener);
            if (!inv || !inv.validSlot(slot) || !inv.hasAt(slot, item)) {
                player.unsetMapFlag();
                return false;
            }
        }
        {
            const listener = player.invListeners.find(l => l.com === useComId);
            if (!listener) {
                player.unsetMapFlag();
                return false;
            }
            const inv = player.getInventoryFromListener(listener);
            if (!inv || !inv.validSlot(useSlot) || !inv.hasAt(useSlot, useItem)) {
                player.unsetMapFlag();
                return false;
            }
        }
        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }
        player.lastItem = item;
        player.lastSlot = slot;
        player.lastUseItem = useItem;
        player.lastUseSlot = useSlot;
        const objType = ObjType.get(player.lastItem);
        const useObjType = ObjType.get(player.lastUseItem);
        if ((objType.members || useObjType.members) && !World_default.members) {
            player.messageGame("To use this item please login to a members' server.");
            player.unsetMapFlag();
            return false;
        }
        let script = ScriptProvider.getByTriggerSpecific(ServerTriggerType_default.OPHELDU, objType.id, -1);
        if (!script) {
            script = ScriptProvider.getByTriggerSpecific(ServerTriggerType_default.OPHELDU, useObjType.id, -1);
            [player.lastItem, player.lastUseItem] = [player.lastUseItem, player.lastItem];
            [player.lastSlot, player.lastUseSlot] = [player.lastUseSlot, player.lastSlot];
        }
        const objCategory = objType.category !== -1 ? CategoryType.get(objType.category) : null;
        if (!script && objCategory) {
            script = ScriptProvider.getByTriggerSpecific(ServerTriggerType_default.OPHELDU, -1, objCategory.id);
        }
        const useObjCategory = useObjType.category !== -1 ? CategoryType.get(useObjType.category) : null;
        if (!script && useObjCategory) {
            script = ScriptProvider.getByTriggerSpecific(ServerTriggerType_default.OPHELDU, -1, useObjCategory.id);
            [player.lastItem, player.lastUseItem] = [player.lastUseItem, player.lastItem];
            [player.lastSlot, player.lastUseSlot] = [player.lastUseSlot, player.lastSlot];
        }
        player.clearInteraction();
        player.closeModal();
        if (script) {
            player.executeScript(ScriptRunner2.init(script, player), true);
        } else {
            if (Environment_default.LOCAL_DEV) {
                player.messageGame(`No trigger for [opheldu,${objType.debugname}]`);
            }
            player.messageGame('Nothing interesting happens.');
        }
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/OpLocHandler.ts
class OpLocHandler extends MessageHandler {
    handle(message, player) {
        const {x, z: z2, loc: locId} = message;
        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }
        const absLeftX = player.originX - 52;
        const absRightX = player.originX + 52;
        const absTopZ = player.originZ + 52;
        const absBottomZ = player.originZ - 52;
        if (x < absLeftX || x > absRightX || z2 < absBottomZ || z2 > absTopZ) {
            return false;
        }
        const loc = World_default.getLoc(x, z2, player.level, locId);
        if (!loc) {
            player.unsetMapFlag();
            return false;
        }
        const locType = LocType.get(loc.type);
        if (!locType.op || !locType.op[message.op - 1]) {
            player.unsetMapFlag();
            return false;
        }
        let mode;
        if (message.op === 1) {
            mode = ServerTriggerType_default.APLOC1;
        } else if (message.op === 2) {
            mode = ServerTriggerType_default.APLOC2;
        } else if (message.op === 3) {
            mode = ServerTriggerType_default.APLOC3;
        } else if (message.op === 4) {
            mode = ServerTriggerType_default.APLOC4;
        } else {
            mode = ServerTriggerType_default.APLOC5;
        }
        player.clearPendingAction();
        player.setInteraction(Interaction_default.ENGINE, loc, mode);
        player.opcalled = true;
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/OpLocTHandler.ts
class OpLocTHandler extends MessageHandler {
    handle(message, player) {
        const {x, z: z2, loc: locId, spellComponent: spellComId} = message;
        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }
        const spellCom = Component.get(spellComId);
        if (typeof spellCom === 'undefined' || !player.isComponentVisible(spellCom)) {
            player.unsetMapFlag();
            return false;
        }
        const absLeftX = player.originX - 52;
        const absRightX = player.originX + 52;
        const absTopZ = player.originZ + 52;
        const absBottomZ = player.originZ - 52;
        if (x < absLeftX || x > absRightX || z2 < absBottomZ || z2 > absTopZ) {
            player.unsetMapFlag();
            return false;
        }
        const loc = World_default.getLoc(x, z2, player.level, locId);
        if (!loc) {
            player.unsetMapFlag();
            return false;
        }
        player.clearPendingAction();
        player.setInteraction(Interaction_default.ENGINE, loc, ServerTriggerType_default.APLOCT, {type: loc.type, com: spellComId});
        player.opcalled = true;
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/OpLocUHandler.ts
class OpLocUHandler extends MessageHandler {
    handle(message, player) {
        const {x, z: z2, loc: locId, useObj: item, useSlot: slot, useComponent: comId} = message;
        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }
        const com = Component.get(comId);
        if (typeof com === 'undefined' || !player.isComponentVisible(com)) {
            player.unsetMapFlag();
            return false;
        }
        const absLeftX = player.originX - 52;
        const absRightX = player.originX + 52;
        const absTopZ = player.originZ + 52;
        const absBottomZ = player.originZ - 52;
        if (x < absLeftX || x > absRightX || z2 < absBottomZ || z2 > absTopZ) {
            player.unsetMapFlag();
            return false;
        }
        const listener = player.invListeners.find(l => l.com === comId);
        if (!listener) {
            player.unsetMapFlag();
            return false;
        }
        const inv = player.getInventoryFromListener(listener);
        if (!inv || !inv.validSlot(slot) || !inv.hasAt(slot, item)) {
            player.unsetMapFlag();
            return false;
        }
        const loc = World_default.getLoc(x, z2, player.level, locId);
        if (!loc) {
            player.unsetMapFlag();
            return false;
        }
        if (ObjType.get(item).members && !World_default.members) {
            player.messageGame("To use this item please login to a members' server.");
            player.unsetMapFlag();
            return false;
        }
        player.lastUseItem = item;
        player.lastUseSlot = slot;
        player.clearPendingAction();
        player.setInteraction(Interaction_default.ENGINE, loc, ServerTriggerType_default.APLOCU);
        player.opcalled = true;
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/OpNpcHandler.ts
class OpNpcHandler extends MessageHandler {
    handle(message, player) {
        const {nid} = message;
        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }
        const npc = World_default.getNpc(nid);
        if (!npc || npc.delayed()) {
            player.unsetMapFlag();
            return false;
        }
        if (!player.buildArea.npcs.has(npc.nid)) {
            player.unsetMapFlag();
            return false;
        }
        const npcType = NpcType.get(npc.type);
        if (!npcType.op || !npcType.op[message.op - 1]) {
            player.unsetMapFlag();
            return false;
        }
        let mode;
        if (message.op === 1) {
            mode = ServerTriggerType_default.APNPC1;
        } else if (message.op === 2) {
            mode = ServerTriggerType_default.APNPC2;
        } else if (message.op === 3) {
            mode = ServerTriggerType_default.APNPC3;
        } else if (message.op === 4) {
            mode = ServerTriggerType_default.APNPC4;
        } else {
            mode = ServerTriggerType_default.APNPC5;
        }
        player.clearPendingAction();
        player.setInteraction(Interaction_default.ENGINE, npc, mode, {type: npc.type, com: -1});
        player.opcalled = true;
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/OpNpcTHandler.ts
class OpNpcTHandler extends MessageHandler {
    handle(message, player) {
        const {nid, spellComponent: spellComId} = message;
        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }
        const spellCom = Component.get(spellComId);
        if (typeof spellCom === 'undefined' || !player.isComponentVisible(spellCom)) {
            player.unsetMapFlag();
            return false;
        }
        const npc = World_default.getNpc(nid);
        if (!npc || npc.delayed()) {
            player.unsetMapFlag();
            return false;
        }
        if (!player.buildArea.npcs.has(npc.nid)) {
            player.unsetMapFlag();
            return false;
        }
        player.clearPendingAction();
        player.setInteraction(Interaction_default.ENGINE, npc, ServerTriggerType_default.APNPCT, {type: npc.type, com: spellComId});
        player.opcalled = true;
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/OpNpcUHandler.ts
class OpNpcUHandler extends MessageHandler {
    handle(message, player) {
        const {nid, useObj: item, useSlot: slot, useComponent: comId} = message;
        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }
        const com = Component.get(comId);
        if (typeof com === 'undefined' || !player.isComponentVisible(com)) {
            player.unsetMapFlag();
            return false;
        }
        const listener = player.invListeners.find(l => l.com === comId);
        if (!listener) {
            player.unsetMapFlag();
            return false;
        }
        const inv = player.getInventoryFromListener(listener);
        if (!inv || !inv.validSlot(slot) || !inv.hasAt(slot, item)) {
            player.unsetMapFlag();
            return false;
        }
        const npc = World_default.getNpc(nid);
        if (!npc || npc.delayed()) {
            player.unsetMapFlag();
            return false;
        }
        if (!player.buildArea.npcs.has(npc.nid)) {
            player.unsetMapFlag();
            return false;
        }
        if (ObjType.get(item).members && !World_default.members) {
            player.messageGame("To use this item please login to a members' server.");
            player.unsetMapFlag();
            return false;
        }
        player.lastUseItem = item;
        player.lastUseSlot = slot;
        player.clearPendingAction();
        player.setInteraction(Interaction_default.ENGINE, npc, ServerTriggerType_default.APNPCU, {type: npc.type, com: -1});
        player.opcalled = true;
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/OpObjHandler.ts
class OpObjHandler extends MessageHandler {
    handle(message, player) {
        const {x, z: z2, obj: objId} = message;
        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }
        const absLeftX = player.originX - 52;
        const absRightX = player.originX + 52;
        const absTopZ = player.originZ + 52;
        const absBottomZ = player.originZ - 52;
        if (x < absLeftX || x > absRightX || z2 < absBottomZ || z2 > absTopZ) {
            player.unsetMapFlag();
            return false;
        }
        const obj = World_default.getObj(x, z2, player.level, objId, player.pid);
        if (!obj) {
            player.unsetMapFlag();
            return false;
        }
        const objType = ObjType.get(obj.type);
        if ((message.op === 1 && ((objType.op && !objType.op[0]) || !objType.op)) || (message.op === 4 && ((objType.op && !objType.op[3]) || !objType.op))) {
            player.unsetMapFlag();
            return false;
        }
        let mode;
        if (message.op === 1) {
            mode = ServerTriggerType_default.APOBJ1;
        } else if (message.op === 2) {
            mode = ServerTriggerType_default.APOBJ2;
        } else if (message.op === 3) {
            mode = ServerTriggerType_default.APOBJ3;
        } else if (message.op === 4) {
            mode = ServerTriggerType_default.APOBJ4;
        } else {
            mode = ServerTriggerType_default.APOBJ5;
        }
        player.clearPendingAction();
        player.setInteraction(Interaction_default.ENGINE, obj, mode);
        player.opcalled = true;
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/OpObjTHandler.ts
class OpObjTHandler extends MessageHandler {
    handle(message, player) {
        const {x, z: z2, obj: objId, spellComponent: spellComId} = message;
        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }
        const spellCom = Component.get(spellComId);
        if (typeof spellCom === 'undefined' || !player.isComponentVisible(spellCom)) {
            player.unsetMapFlag();
            return false;
        }
        const absLeftX = player.originX - 52;
        const absRightX = player.originX + 52;
        const absTopZ = player.originZ + 52;
        const absBottomZ = player.originZ - 52;
        if (x < absLeftX || x > absRightX || z2 < absBottomZ || z2 > absTopZ) {
            player.unsetMapFlag();
            return false;
        }
        const obj = World_default.getObj(x, z2, player.level, objId, player.pid);
        if (!obj) {
            player.unsetMapFlag();
            return false;
        }
        player.clearPendingAction();
        player.setInteraction(Interaction_default.ENGINE, obj, ServerTriggerType_default.APOBJT, {type: obj.type, com: spellComId});
        player.opcalled = true;
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/OpObjUHandler.ts
class OpObjUHandler extends MessageHandler {
    handle(message, player) {
        const {x, z: z2, obj: objId, useObj: item, useSlot: slot, useComponent: comId} = message;
        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }
        const com = Component.get(comId);
        if (typeof com === 'undefined' || !player.isComponentVisible(com)) {
            player.unsetMapFlag();
            return false;
        }
        const absLeftX = player.originX - 52;
        const absRightX = player.originX + 52;
        const absTopZ = player.originZ + 52;
        const absBottomZ = player.originZ - 52;
        if (x < absLeftX || x > absRightX || z2 < absBottomZ || z2 > absTopZ) {
            player.unsetMapFlag();
            return false;
        }
        const listener = player.invListeners.find(l => l.com === comId);
        if (!listener) {
            player.unsetMapFlag();
            return false;
        }
        const inv = player.getInventoryFromListener(listener);
        if (!inv || !inv.validSlot(slot) || !inv.hasAt(slot, item)) {
            player.unsetMapFlag();
            return false;
        }
        const obj = World_default.getObj(x, z2, player.level, objId, player.pid);
        if (!obj) {
            player.unsetMapFlag();
            return false;
        }
        if (ObjType.get(item).members && !World_default.members) {
            player.messageGame("To use this item please login to a members' server.");
            player.unsetMapFlag();
            return false;
        }
        player.lastUseItem = item;
        player.lastUseSlot = slot;
        player.clearPendingAction();
        player.setInteraction(Interaction_default.ENGINE, obj, ServerTriggerType_default.APOBJU);
        player.opcalled = true;
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/OpPlayerHandler.ts
class OpPlayerHandler extends MessageHandler {
    handle(message, player) {
        const {pid} = message;
        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }
        const other = World_default.getPlayer(pid);
        if (!other) {
            player.unsetMapFlag();
            return false;
        }
        if (!player.buildArea.players.has(other.uid)) {
            player.unsetMapFlag();
            return false;
        }
        let mode;
        if (message.op === 1) {
            mode = ServerTriggerType_default.APPLAYER1;
        } else if (message.op === 2) {
            mode = ServerTriggerType_default.APPLAYER2;
        } else if (message.op === 3) {
            mode = ServerTriggerType_default.APPLAYER3;
        } else {
            mode = ServerTriggerType_default.APPLAYER4;
        }
        player.clearPendingAction();
        player.setInteraction(Interaction_default.ENGINE, other, mode);
        player.opcalled = true;
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/OpPlayerTHandler.ts
class OpPlayerTHandler extends MessageHandler {
    handle(message, player) {
        const {pid, spellComponent: spellComId} = message;
        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }
        const spellCom = Component.get(spellComId);
        if (typeof spellCom === 'undefined' || !player.isComponentVisible(spellCom)) {
            player.unsetMapFlag();
            return false;
        }
        const other = World_default.getPlayer(pid);
        if (!other) {
            player.unsetMapFlag();
            return false;
        }
        if (!player.buildArea.players.has(other.uid)) {
            player.unsetMapFlag();
            return false;
        }
        player.clearPendingAction();
        player.setInteraction(Interaction_default.ENGINE, other, ServerTriggerType_default.APPLAYERT, {type: -1, com: spellComId});
        player.opcalled = true;
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/OpPlayerUHandler.ts
class OpPlayerUHandler extends MessageHandler {
    handle(message, player) {
        const {pid, useObj: item, useSlot: slot, useComponent: comId} = message;
        if (player.delayed()) {
            player.unsetMapFlag();
            return false;
        }
        const com = Component.get(comId);
        if (typeof com === 'undefined' || !player.isComponentVisible(com)) {
            player.unsetMapFlag();
            return false;
        }
        const listener = player.invListeners.find(l => l.com === comId);
        if (!listener) {
            player.unsetMapFlag();
            return false;
        }
        const inv = player.getInventoryFromListener(listener);
        if (!inv || !inv.validSlot(slot) || !inv.hasAt(slot, item)) {
            player.unsetMapFlag();
            return false;
        }
        const other = World_default.getPlayer(pid);
        if (!other) {
            player.unsetMapFlag();
            return false;
        }
        if (!player.buildArea.players.has(other.uid)) {
            player.unsetMapFlag();
            return false;
        }
        if (ObjType.get(item).members && !World_default.members) {
            player.messageGame("To use this item please login to a members' server.");
            player.unsetMapFlag();
            return false;
        }
        player.lastUseSlot = slot;
        player.clearPendingAction();
        player.setInteraction(Interaction_default.ENGINE, other, ServerTriggerType_default.APPLAYERU, {type: item, com: -1});
        player.opcalled = true;
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/RebuildGetMapsHandler.ts
class RebuildGetMapsHandler extends MessageHandler {
    handle(message, player) {
        const {maps: requested} = message;
        for (let i = 0; i < requested.length; i++) {
            const {type, x, z: z2} = requested[i];
            const CHUNK_SIZE = 1000 - 1 - 2 - 1 - 1 - 2 - 2;
            if (type == 0) {
                const land = PRELOADED.get(`m${x}_${z2}`);
                if (!land) {
                    continue;
                }
                for (let off = 0; off < land.length; off += CHUNK_SIZE) {
                    player.write(new DataLand(x, z2, off, land.length, land.subarray(off, off + CHUNK_SIZE)));
                }
                player.write(new DataLandDone(x, z2));
            } else if (type == 1) {
                const loc = PRELOADED.get(`l${x}_${z2}`);
                if (!loc) {
                    continue;
                }
                for (let off = 0; off < loc.length; off += CHUNK_SIZE) {
                    player.write(new DataLoc(x, z2, off, loc.length, loc.subarray(off, off + CHUNK_SIZE)));
                }
                player.write(new DataLocDone(x, z2));
            }
        }
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/ResumePauseButtonHandler.ts
class ResumePauseButtonHandler extends MessageHandler {
    handle(_message, player) {
        if (!player.activeScript || player.activeScript.execution !== ScriptState.PAUSEBUTTON) {
            return false;
        }
        player.executeScript(player.activeScript, true);
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/ResumePCountDialogHandler.ts
class ResumePCountDialogHandler extends MessageHandler {
    handle(message, player) {
        const {input} = message;
        if (!player.activeScript || player.activeScript.execution !== ScriptState.COUNTDIALOG) {
            return false;
        }
        player.activeScript.lastInt = input;
        player.executeScript(player.activeScript, true);
        return true;
    }
}

// src/lostcity/network/225/incoming/handler/TutorialClickSideHandler.ts
class TutorialClickSideHandler extends MessageHandler {
    handle(message, player) {
        const {tab} = message;
        if (tab < 0 || tab > 13) {
            return false;
        }
        const script = ScriptProvider.getByTriggerSpecific(ServerTriggerType_default.TUTORIAL_CLICKSIDE, -1, -1);
        if (script) {
            player.executeScript(ScriptRunner2.init(script, player), true);
        }
        return true;
    }
}

// src/lostcity/network/incoming/model/MoveClick.ts
class MoveClick extends IncomingMessage {
    path;
    ctrlHeld;
    opClick;
    category = ClientProtCategory.USER_EVENT;
    constructor(path, ctrlHeld, opClick) {
        super();
        this.path = path;
        this.ctrlHeld = ctrlHeld;
        this.opClick = opClick;
    }
}

// src/lostcity/network/225/incoming/codec/MoveClickDecoder.ts
class MoveClickDecoder extends MessageDecoder {
    prot;
    constructor(prot) {
        super();
        this.prot = prot;
    }
    decode(buf) {
        const ctrlHeld = buf.g1();
        const startX = buf.g2();
        const startZ = buf.g2();
        const offset = this.prot === ClientProt.MOVE_MINIMAPCLICK ? 14 : 0;
        const waypoints = (buf.available - offset) >> 1;
        const path = [{x: startX, z: startZ}];
        for (let index = 1; index <= waypoints && index < 25; index++) {
            path.push({
                x: startX + buf.g1b(),
                z: startZ + buf.g1b()
            });
        }
        return new MoveClick(path, ctrlHeld, this.prot === ClientProt.MOVE_OPCLICK);
    }
}

// src/lostcity/network/225/incoming/handler/MoveClickHandler.ts
class MoveClickHandler extends MessageHandler {
    handle(message, player) {
        const start = message.path[0];
        if (player.delayed() || message.ctrlHeld < 0 || message.ctrlHeld > 1 || Position.distanceToSW(player, {x: start.x, z: start.z}) > 104) {
            player.unsetMapFlag();
            player.userPath = [];
            return false;
        }
        if (Environment_default.CLIENT_PATHFINDER) {
            player.userPath = [];
            for (let i = 0; i < message.path.length; i++) {
                player.userPath[i] = Position.packCoord(player.level, message.path[i].x, message.path[i].z);
            }
        } else {
            const dest = message.path[message.path.length - 1];
            player.userPath = [Position.packCoord(player.level, dest.x, dest.z)];
        }
        player.interactWalkTrigger = false;
        if (!message.opClick) {
            player.clearInteraction();
            player.closeModal();
        }
        if (player.runenergy < 100) {
            player.setVar(VarPlayerType.TEMP_RUN, 0);
        } else {
            player.setVar(VarPlayerType.TEMP_RUN, message.ctrlHeld);
        }
        return true;
    }
}

// src/lostcity/network/225/incoming/prot/ClientProtRepository.ts
class ClientProtRepository {
    decoders = new Map();
    handlers = new Map();
    bind(decoder, handler) {
        if (this.decoders.has(decoder.prot.id)) {
            throw new Error(`[ClientProtRepository] Already defines a ${decoder.prot.id}.`);
        }
        this.decoders.set(decoder.prot.id, decoder);
        if (handler) {
            this.handlers.set(decoder.prot.id, handler);
        }
    }
    constructor() {
        this.bind(new ClientCheatDecoder(), new ClientCheatHandler());
        this.bind(new CloseModalDecoder(), new CloseModalHandler());
        this.bind(new IdleTimerDecoder(), new IdleTimerHandler());
        this.bind(new IfButtonDecoder(), new IfButtonHandler());
        this.bind(new IfPlayerDesignDecoder(), new IfPlayerDesignHandler());
        this.bind(new InvButtonDecoder(ClientProt.INV_BUTTON1, 1), new InvButtonHandler());
        this.bind(new InvButtonDecoder(ClientProt.INV_BUTTON2, 2), new InvButtonHandler());
        this.bind(new InvButtonDecoder(ClientProt.INV_BUTTON3, 3), new InvButtonHandler());
        this.bind(new InvButtonDecoder(ClientProt.INV_BUTTON4, 4), new InvButtonHandler());
        this.bind(new InvButtonDecoder(ClientProt.INV_BUTTON5, 5), new InvButtonHandler());
        this.bind(new InvButtonDDecoder(), new InvButtonDHandler());
        this.bind(new MessagePrivateDecoder(), new MessagePrivateHandler());
        this.bind(new MessagePublicDecoder(), new MessagePublicHandler());
        this.bind(new MoveClickDecoder(ClientProt.MOVE_GAMECLICK), new MoveClickHandler());
        this.bind(new MoveClickDecoder(ClientProt.MOVE_OPCLICK), new MoveClickHandler());
        this.bind(new MoveClickDecoder(ClientProt.MOVE_MINIMAPCLICK), new MoveClickHandler());
        this.bind(new OpHeldDecoder(ClientProt.OPHELD1, 1), new OpHeldHandler());
        this.bind(new OpHeldDecoder(ClientProt.OPHELD2, 2), new OpHeldHandler());
        this.bind(new OpHeldDecoder(ClientProt.OPHELD3, 3), new OpHeldHandler());
        this.bind(new OpHeldDecoder(ClientProt.OPHELD4, 4), new OpHeldHandler());
        this.bind(new OpHeldDecoder(ClientProt.OPHELD5, 5), new OpHeldHandler());
        this.bind(new OpHeldTDecoder(), new OpHeldTHandler());
        this.bind(new OpHeldUDecoder(), new OpHeldUHandler());
        this.bind(new OpLocDecoder(ClientProt.OPLOC1, 1), new OpLocHandler());
        this.bind(new OpLocDecoder(ClientProt.OPLOC2, 2), new OpLocHandler());
        this.bind(new OpLocDecoder(ClientProt.OPLOC3, 3), new OpLocHandler());
        this.bind(new OpLocDecoder(ClientProt.OPLOC4, 4), new OpLocHandler());
        this.bind(new OpLocDecoder(ClientProt.OPLOC5, 5), new OpLocHandler());
        this.bind(new OpLocTDecoder(), new OpLocTHandler());
        this.bind(new OpLocUDecoder(), new OpLocUHandler());
        this.bind(new OpNpcDecoder(ClientProt.OPNPC1, 1), new OpNpcHandler());
        this.bind(new OpNpcDecoder(ClientProt.OPNPC2, 2), new OpNpcHandler());
        this.bind(new OpNpcDecoder(ClientProt.OPNPC3, 3), new OpNpcHandler());
        this.bind(new OpNpcDecoder(ClientProt.OPNPC4, 4), new OpNpcHandler());
        this.bind(new OpNpcDecoder(ClientProt.OPNPC5, 5), new OpNpcHandler());
        this.bind(new OpNpcTDecoder(), new OpNpcTHandler());
        this.bind(new OpNpcUDecoder(), new OpNpcUHandler());
        this.bind(new OpObjDecoder(ClientProt.OPOBJ1, 1), new OpObjHandler());
        this.bind(new OpObjDecoder(ClientProt.OPOBJ2, 2), new OpObjHandler());
        this.bind(new OpObjDecoder(ClientProt.OPOBJ3, 3), new OpObjHandler());
        this.bind(new OpObjDecoder(ClientProt.OPOBJ4, 4), new OpObjHandler());
        this.bind(new OpObjDecoder(ClientProt.OPOBJ5, 5), new OpObjHandler());
        this.bind(new OpObjTDecoder(), new OpObjTHandler());
        this.bind(new OpObjUDecoder(), new OpObjUHandler());
        this.bind(new OpPlayerDecoder(ClientProt.OPPLAYER1, 1), new OpPlayerHandler());
        this.bind(new OpPlayerDecoder(ClientProt.OPPLAYER2, 2), new OpPlayerHandler());
        this.bind(new OpPlayerDecoder(ClientProt.OPPLAYER3, 3), new OpPlayerHandler());
        this.bind(new OpPlayerDecoder(ClientProt.OPPLAYER4, 4), new OpPlayerHandler());
        this.bind(new OpPlayerTDecoder(), new OpPlayerTHandler());
        this.bind(new OpPlayerUDecoder(), new OpPlayerUHandler());
        this.bind(new RebuildGetMapsDecoder(), new RebuildGetMapsHandler());
        this.bind(new ResumePauseButtonDecoder(), new ResumePauseButtonHandler());
        this.bind(new ResumePCountDialogDecoder(), new ResumePCountDialogHandler());
        this.bind(new TutorialClickSideDecoder(), new TutorialClickSideHandler());
    }
    getDecoder(prot) {
        return this.decoders.get(prot.id);
    }
    getHandler(prot) {
        return this.handlers.get(prot.id);
    }
}
var ClientProtRepository_default = new ClientProtRepository();

// src/lostcity/entity/NetworkPlayer.ts
function isNetworkPlayer(player) {
    return player.client !== null && player.client !== undefined;
}

class NetworkPlayer2 extends Player2 {
    client = null;
    userPath = [];
    opcalled = false;
    constructor(username, username37, client) {
        super(username, username37);
        this.client = client;
        this.client.player = this;
    }
    decodeIn() {
        if (this.client === null || this.client.inOffset < 1) {
            return;
        }
        let offset = 0;
        this.lastResponse = World_default.currentTick;
        this.userPath = [];
        this.opcalled = false;
        World_default.lastCycleBandwidth[0] += this.client.inOffset;
        while (this.client.inOffset > offset) {
            const packetType = ClientProt.byId[this.client.in[offset++]];
            let length = packetType.length;
            if (length == -1) {
                length = this.client.in[offset++];
            } else if (length == -2) {
                length = (this.client.in[offset++] << 8) | this.client.in[offset++];
            }
            const data = new Packet(this.client.in.slice(offset, offset + length));
            offset += length;
            const decoder = ClientProtRepository_default.getDecoder(packetType);
            if (decoder) {
                const message = decoder.decode(data);
                const handler = ClientProtRepository_default.getHandler(packetType);
                if (handler) {
                    handler.handle(message, this);
                }
            }
        }
        this.client?.reset();
    }
    encodeOut() {
        if (!this.client) {
            return;
        }
        if (this.modalTop !== this.lastModalTop || this.modalBottom !== this.lastModalBottom || this.modalSidebar !== this.lastModalSidebar || this.refreshModalClose) {
            if (this.refreshModalClose) {
                this.write(new IfClose());
            }
            this.refreshModalClose = false;
            this.lastModalTop = this.modalTop;
            this.lastModalBottom = this.modalBottom;
            this.lastModalSidebar = this.modalSidebar;
        }
        if (this.refreshModal) {
            if ((this.modalState & 1) === 1 && (this.modalState & 4) === 4) {
                this.write(new IfOpenMainSideModal(this.modalTop, this.modalSidebar));
            } else if ((this.modalState & 1) === 1) {
                this.write(new IfOpenMainModal(this.modalTop));
            } else if ((this.modalState & 2) === 2) {
                this.write(new IfOpenChatModal(this.modalBottom));
            } else if ((this.modalState & 4) === 4) {
                this.write(new IfOpenSideModal(this.modalSidebar));
            }
            this.refreshModal = false;
        }
        for (let message = this.highPriorityOut.head(); message; message = this.highPriorityOut.next()) {
            this.writeInner(message);
            message.uncache();
        }
        for (let message = this.lowPriorityOut.head(); message; message = this.lowPriorityOut.next()) {
            this.writeInner(message);
            message.uncache();
        }
        this.client.flush();
    }
    writeInner(message) {
        const client = this.client;
        if (!client) {
            return;
        }
        const encoder = ServerProtRepository_default.getEncoder(message);
        if (!encoder) {
            return;
        }
        const prot = encoder.prot;
        const buf = client.out;
        const test = (1 + prot.length === -1 ? 1 : prot.length === -2 ? 2 : 0) + encoder.test(message);
        if (buf.pos + test >= buf.length) {
            client.flush();
        }
        const pos = buf.pos;
        buf.p1(prot.id);
        if (prot.length === -1) {
            buf.pos += 1;
        } else if (prot.length === -2) {
            buf.pos += 2;
        }
        const start = buf.pos;
        encoder.encode(buf, message);
        if (prot.length === -1) {
            buf.psize1(buf.pos - start);
        } else if (prot.length === -2) {
            buf.psize2(buf.pos - start);
        }
        if (client.encryptor) {
            buf.data[pos] = (buf.data[pos] + client.encryptor.nextInt()) & 255;
        }
        World_default.lastCycleBandwidth[1] += buf.pos - pos;
    }
    logout() {
        this.writeInner(new Logout());
        this.client?.flush();
    }
    terminate() {
        this.client?.terminate();
        this.client = null;
    }
    playerLog(message, ...args) {}
    updateMap() {
        const loadedZones = this.buildArea.loadedZones;
        const activeZones = this.buildArea.activeZones;
        const reloadLeftX = (Position.zone(this.originX) - 4) << 3;
        const reloadRightX = (Position.zone(this.originX) + 5) << 3;
        const reloadTopZ = (Position.zone(this.originZ) + 5) << 3;
        const reloadBottomZ = (Position.zone(this.originZ) - 4) << 3;
        if (this.x < reloadLeftX || this.z < reloadBottomZ || this.x > reloadRightX - 1 || this.z > reloadTopZ - 1 || (this.tele && (Position.zone(this.x) !== Position.zone(this.originX) || Position.zone(this.z) !== Position.zone(this.originZ)))) {
            this.write(new RebuildNormal(Position.zone(this.x), Position.zone(this.z)));
            this.originX = this.x;
            this.originZ = this.z;
            loadedZones.clear();
        }
        for (let info = this.cameraPackets.head(); info !== null; info = this.cameraPackets.next()) {
            const localX = info.camX - Position.zoneOrigin(this.originX);
            const localZ = info.camZ - Position.zoneOrigin(this.originZ);
            if (info.type === ServerProt.CAM_MOVETO) {
                this.write(new CamMoveTo(localX, localZ, info.height, info.rotationSpeed, info.rotationMultiplier));
            } else if (info.type === ServerProt.CAM_LOOKAT) {
                this.write(new CamLookAt(localX, localZ, info.height, info.rotationSpeed, info.rotationMultiplier));
            }
            info.unlink();
        }
        if (this.moveSpeed === MoveSpeed_default.INSTANT && this.jump) {
            loadedZones.clear();
        }
        activeZones.clear();
        const centerX = Position.zone(this.x);
        const centerZ = Position.zone(this.z);
        const leftX = Position.zone(this.originX) - 6;
        const rightX = Position.zone(this.originX) + 6;
        const topZ = Position.zone(this.originZ) + 6;
        const bottomZ = Position.zone(this.originZ) - 6;
        for (let x = centerX - 3; x <= centerX + 3; x++) {
            for (let z2 = centerZ - 3; z2 <= centerZ + 3; z2++) {
                if (x < leftX || x > rightX || z2 > topZ || z2 < bottomZ) {
                    continue;
                }
                activeZones.add(ZoneMap2.zoneIndex(x << 3, z2 << 3, this.level));
            }
        }
    }
    updatePlayers() {
        this.write(new PlayerInfo(this.buildArea, this.level, this.x, this.z, this.originX, this.originZ, this.uid, this.mask, this.tele, this.jump, this.walkDir, this.runDir));
    }
    updateNpcs() {
        this.write(new NpcInfo(this.buildArea, this.level, this.x, this.z, this.originX, this.originZ));
    }
    updateZones() {
        const loadedZones = this.buildArea.loadedZones;
        const activeZones = this.buildArea.activeZones;
        for (const zoneIndex of loadedZones) {
            if (!activeZones.has(zoneIndex)) {
                loadedZones.delete(zoneIndex);
            }
        }
        for (const zoneIndex of activeZones) {
            const zone = World_default.getZoneIndex(zoneIndex);
            if (!loadedZones.has(zone.index)) {
                zone.writeFullFollows(this);
            } else {
                zone.writePartialEncloses(this);
                zone.writePartialFollows(this);
            }
            loadedZones.add(zone.index);
        }
    }
    updateStats() {
        for (let i = 0; i < this.stats.length; i++) {
            if (this.stats[i] !== this.lastStats[i] || this.levels[i] !== this.lastLevels[i]) {
                this.write(new UpdateStat(i, this.stats[i], this.levels[i]));
                this.lastStats[i] = this.stats[i];
                this.lastLevels[i] = this.levels[i];
            }
        }
        if (Math.floor(this.runenergy) / 100 !== Math.floor(this.lastRunEnergy) / 100) {
            this.write(new UpdateRunEnergy(this.runenergy));
            this.lastRunEnergy = this.runenergy;
        }
    }
    updateInvs() {
        let runWeightChanged = false;
        let firstSeen = false;
        for (let i = 0; i < this.invListeners.length; i++) {
            const listener = this.invListeners[i];
            if (!listener) {
                continue;
            }
            if (listener.source === -1) {
                const inv = World_default.getInventory(listener.type);
                if (!inv) {
                    continue;
                }
                if (inv.update || listener.firstSeen) {
                    this.write(new UpdateInvFull(listener.com, inv));
                    listener.firstSeen = false;
                }
            } else {
                const player = World_default.getPlayerByUid(listener.source);
                if (!player) {
                    continue;
                }
                const inv = player.getInventory(listener.type);
                if (!inv) {
                    continue;
                }
                if (inv.update || listener.firstSeen) {
                    this.write(new UpdateInvFull(listener.com, inv));
                    if (listener.firstSeen) {
                        firstSeen = true;
                    }
                    listener.firstSeen = false;
                    const invType = InvType.get(listener.type);
                    if (invType.runweight) {
                        runWeightChanged = true;
                    }
                }
            }
        }
        if (runWeightChanged) {
            const current = this.runweight;
            this.calculateRunWeight();
            runWeightChanged = current !== this.runweight;
        }
        if (runWeightChanged || firstSeen) {
            this.write(new UpdateRunWeight(Math.ceil(this.runweight / 1000)));
        }
    }
}

// src/lostcity/entity/CameraInfo.ts
class CameraInfo extends Linkable {
    type;
    camX;
    camZ;
    height;
    rotationSpeed;
    rotationMultiplier;
    constructor(type, camX, camZ, height, rotationSpeed, rotationMultiplier) {
        super();
        this.type = type;
        this.camX = camX;
        this.camZ = camZ;
        this.height = height;
        this.rotationSpeed = rotationSpeed;
        this.rotationMultiplier = rotationMultiplier;
    }
}

// src/lostcity/util/ColorConversion.ts
class ColorConversion {
    static hsl24to16(hue, saturation, lightness) {
        if (lightness > 243) {
            saturation >>= 4;
        } else if (lightness > 217) {
            saturation >>= 3;
        } else if (lightness > 192) {
            saturation >>= 2;
        } else if (lightness > 179) {
            saturation >>= 1;
        }
        return (((hue & 255) >> 2) << 10) + ((saturation >> 5) << 7) + (lightness >> 1);
    }
    static rgb15to24(rgb) {
        const r = (rgb >> 10) & 31;
        const g = (rgb >> 5) & 31;
        const b2 = rgb & 31;
        return ((r << 3) << 16) + ((g << 3) << 8) + (b2 << 3);
    }
    static rgb15toHsl16(rgb) {
        const r = (rgb >> 10) & 31;
        const g = (rgb >> 5) & 31;
        const b2 = rgb & 31;
        const red = r / 31;
        const green = g / 31;
        const blue = b2 / 31;
        return ColorConversion.rgbToHsl(red, green, blue);
    }
    static rgb24to15(rgb) {
        const r = (rgb >> 16) & 255;
        const g = (rgb >> 8) & 255;
        const b2 = rgb & 255;
        return ((r >> 3) << 10) + ((g >> 3) << 5) + (b2 >> 3);
    }
    static rgb24toHsl16(rgb) {
        const r = (rgb >> 16) & 255;
        const g = (rgb >> 8) & 255;
        const b2 = rgb & 255;
        const red = r / 256;
        const green = g / 256;
        const blue = b2 / 256;
        return ColorConversion.rgbToHsl(red, green, blue);
    }
    static rgbToHsl(red, green, blue) {
        let min = red;
        if (green < min) {
            min = green;
        }
        if (blue < min) {
            min = blue;
        }
        let max = red;
        if (green > max) {
            max = green;
        }
        if (blue > max) {
            max = blue;
        }
        let hNorm = 0;
        let sNorm = 0;
        const lNorm = (min + max) / 2;
        if (min !== max) {
            if (lNorm < 0.5) {
                sNorm = (max - min) / (max + min);
            } else if (lNorm >= 0.5) {
                sNorm = (max - min) / (2 - max - min);
            }
            if (red === max) {
                hNorm = (green - blue) / (max - min);
            } else if (green === max) {
                hNorm = (blue - red) / (max - min) + 2;
            } else if (blue === max) {
                hNorm = (red - green) / (max - min) + 4;
            }
        }
        hNorm /= 6;
        const hue = (hNorm * 256) | 0;
        let saturation = (sNorm * 256) | 0;
        let lightness = (lNorm * 256) | 0;
        if (saturation < 0) {
            saturation = 0;
        } else if (saturation > 255) {
            saturation = 255;
        }
        if (lightness < 0) {
            lightness = 0;
        } else if (lightness > 255) {
            lightness = 255;
        }
        return ColorConversion.hsl24to16(hue, saturation, lightness);
    }
    static RGB15_HSL16 = new Int32Array(32768);
    static {
        for (let rgb = 0; rgb < 32768; rgb++) {
            ColorConversion.RGB15_HSL16[rgb] = ColorConversion.rgb15toHsl16(rgb);
        }
    }
    static reverseHsl(hsl) {
        const possible = [];
        for (let rgb = 0; rgb < 32768; rgb++) {
            if (ColorConversion.RGB15_HSL16[rgb] === hsl) {
                possible.push(rgb);
            }
        }
        return possible;
    }
}

// src/lostcity/engine/script/handlers/PlayerOps.ts
var popScriptArgs = function (state) {
    const types = state.popString();
    const count = types.length;
    const args = [];
    for (let i = count - 1; i >= 0; i--) {
        const type = types.charAt(i);
        if (type === 's') {
            args[i] = state.popString();
        } else {
            args[i] = state.popInt();
        }
    }
    return args;
};
var PlayerOps = {
    [ScriptOpcode_default.FINDUID]: state => {
        const uid = state.popInt();
        const player = World_default.getPlayerByUid(uid);
        if (!player) {
            state.pushInt(0);
            return;
        }
        state.activePlayer = player;
        state.pointerAdd(ActivePlayer[state.intOperand]);
        state.pushInt(1);
    },
    [ScriptOpcode_default.P_FINDUID]: state => {
        const uid = state.popInt() >>> 0;
        const player = World_default.getPlayerByUid(uid);
        if (state.pointerGet(ProtectedActivePlayer[state.intOperand]) && state.activePlayer.uid === uid) {
            state.pushInt(1);
            return;
        }
        if (!player || !player.canAccess()) {
            state.pushInt(0);
            return;
        }
        state.activePlayer = player;
        state.pointerAdd(ActivePlayer[state.intOperand]);
        state.pointerAdd(ProtectedActivePlayer[state.intOperand]);
        state.pushInt(1);
    },
    [ScriptOpcode_default.STRONGQUEUE]: checkedHandler(ActivePlayer, state => {
        const args = popScriptArgs(state);
        const delay = check(state.popInt(), NumberNotNull);
        const scriptId = state.popInt();
        const script = ScriptProvider.get(scriptId);
        if (!script) {
            throw new Error(`Unable to find queue script: ${scriptId}`);
        }
        state.activePlayer.enqueueScript(script, 3 /* STRONG */, delay, args);
    }),
    [ScriptOpcode_default.WEAKQUEUE]: checkedHandler(ActivePlayer, state => {
        const args = popScriptArgs(state);
        const delay = check(state.popInt(), NumberNotNull);
        const scriptId = state.popInt();
        const script = ScriptProvider.get(scriptId);
        if (!script) {
            throw new Error(`Unable to find queue script: ${scriptId}`);
        }
        state.activePlayer.enqueueScript(script, 2 /* WEAK */, delay, args);
    }),
    [ScriptOpcode_default.QUEUE]: checkedHandler(ActivePlayer, state => {
        const args = popScriptArgs(state);
        const delay = check(state.popInt(), NumberNotNull);
        const scriptId = state.popInt();
        const script = ScriptProvider.get(scriptId);
        if (!script) {
            throw new Error(`Unable to find queue script: ${scriptId}`);
        }
        state.activePlayer.enqueueScript(script, 0 /* NORMAL */, delay, args);
    }),
    [ScriptOpcode_default.ANIM]: checkedHandler(ActivePlayer, state => {
        const delay = state.popInt();
        const seq = state.popInt();
        state.activePlayer.playAnimation(seq, delay);
    }),
    [ScriptOpcode_default.BUFFER_FULL]: checkedHandler(ActivePlayer, state => {
        throw new Error('unimplemented');
    }),
    [ScriptOpcode_default.BUILDAPPEARANCE]: checkedHandler(ActivePlayer, state => {
        state.activePlayer.generateAppearance(check(state.popInt(), InvTypeValid).id);
    }),
    [ScriptOpcode_default.CAM_LOOKAT]: checkedHandler(ActivePlayer, state => {
        const [coord, height, rotationSpeed, rotationMultiplier] = state.popInts(4);
        const pos = check(coord, CoordValid);
        state.activePlayer.cameraPackets.addTail(new CameraInfo(ServerProt.CAM_LOOKAT, pos.x, pos.z, height, rotationSpeed, rotationMultiplier));
    }),
    [ScriptOpcode_default.CAM_MOVETO]: checkedHandler(ActivePlayer, state => {
        const [coord, height, rotationSpeed, rotationMultiplier] = state.popInts(4);
        const pos = check(coord, CoordValid);
        state.activePlayer.cameraPackets.addTail(new CameraInfo(ServerProt.CAM_MOVETO, pos.x, pos.z, height, rotationSpeed, rotationMultiplier));
    }),
    [ScriptOpcode_default.CAM_SHAKE]: checkedHandler(ActivePlayer, state => {
        const [type, jitter, amplitude, frequency] = state.popInts(4);
        state.activePlayer.write(new CamShake(type, jitter, amplitude, frequency));
    }),
    [ScriptOpcode_default.CAM_RESET]: checkedHandler(ActivePlayer, state => {
        state.activePlayer.write(new CamReset());
    }),
    [ScriptOpcode_default.COORD]: checkedHandler(ActivePlayer, state => {
        const position = state.activePlayer;
        state.pushInt(Position.packCoord(position.level, position.x, position.z));
    }),
    [ScriptOpcode_default.DISPLAYNAME]: checkedHandler(ActivePlayer, state => {
        state.pushString(state.activePlayer.displayName);
    }),
    [ScriptOpcode_default.FACESQUARE]: checkedHandler(ActivePlayer, state => {
        const pos = check(state.popInt(), CoordValid);
        state.activePlayer.faceSquare(pos.x, pos.z);
    }),
    [ScriptOpcode_default.IF_CLOSE]: checkedHandler(ActivePlayer, state => {
        state.activePlayer.closeModal();
    }),
    [ScriptOpcode_default.LAST_COM]: state => {
        state.pushInt(state.activePlayer.lastCom);
    },
    [ScriptOpcode_default.LAST_INT]: state => {
        state.pushInt(state.lastInt);
    },
    [ScriptOpcode_default.LAST_ITEM]: state => {
        const allowedTriggers = [
            ServerTriggerType_default.OPHELD1,
            ServerTriggerType_default.OPHELD2,
            ServerTriggerType_default.OPHELD3,
            ServerTriggerType_default.OPHELD4,
            ServerTriggerType_default.OPHELD5,
            ServerTriggerType_default.OPHELDU,
            ServerTriggerType_default.OPHELDT,
            ServerTriggerType_default.INV_BUTTON1,
            ServerTriggerType_default.INV_BUTTON2,
            ServerTriggerType_default.INV_BUTTON3,
            ServerTriggerType_default.INV_BUTTON4,
            ServerTriggerType_default.INV_BUTTON5
        ];
        if (!allowedTriggers.includes(state.trigger)) {
            throw new Error('is not safe to use in this trigger');
        }
        state.pushInt(state.activePlayer.lastItem);
    },
    [ScriptOpcode_default.LAST_SLOT]: state => {
        const allowedTriggers = [
            ServerTriggerType_default.OPHELD1,
            ServerTriggerType_default.OPHELD2,
            ServerTriggerType_default.OPHELD3,
            ServerTriggerType_default.OPHELD4,
            ServerTriggerType_default.OPHELD5,
            ServerTriggerType_default.OPHELDU,
            ServerTriggerType_default.OPHELDT,
            ServerTriggerType_default.INV_BUTTON1,
            ServerTriggerType_default.INV_BUTTON2,
            ServerTriggerType_default.INV_BUTTON3,
            ServerTriggerType_default.INV_BUTTON4,
            ServerTriggerType_default.INV_BUTTON5,
            ServerTriggerType_default.INV_BUTTOND
        ];
        if (!allowedTriggers.includes(state.trigger)) {
            throw new Error('is not safe to use in this trigger');
        }
        state.pushInt(state.activePlayer.lastSlot);
    },
    [ScriptOpcode_default.LAST_USEITEM]: state => {
        const allowedTriggers = [
            ServerTriggerType_default.OPHELDU,
            ServerTriggerType_default.APOBJU,
            ServerTriggerType_default.APLOCU,
            ServerTriggerType_default.APNPCU,
            ServerTriggerType_default.APPLAYERU,
            ServerTriggerType_default.OPOBJU,
            ServerTriggerType_default.OPLOCU,
            ServerTriggerType_default.OPNPCU,
            ServerTriggerType_default.OPPLAYERU
        ];
        if (!allowedTriggers.includes(state.trigger)) {
            throw new Error('is not safe to use in this trigger');
        }
        state.pushInt(state.activePlayer.lastUseItem);
    },
    [ScriptOpcode_default.LAST_USESLOT]: state => {
        const allowedTriggers = [
            ServerTriggerType_default.OPHELDU,
            ServerTriggerType_default.APOBJU,
            ServerTriggerType_default.APLOCU,
            ServerTriggerType_default.APNPCU,
            ServerTriggerType_default.APPLAYERU,
            ServerTriggerType_default.OPOBJU,
            ServerTriggerType_default.OPLOCU,
            ServerTriggerType_default.OPNPCU,
            ServerTriggerType_default.OPPLAYERU
        ];
        if (!allowedTriggers.includes(state.trigger)) {
            throw new Error('is not safe to use in this trigger');
        }
        state.pushInt(state.activePlayer.lastUseSlot);
    },
    [ScriptOpcode_default.MES]: checkedHandler(ActivePlayer, state => {
        const message = state.popString();
        if (Environment_default.CLIRUNNER) {
            console.log(message);
        }
        state.activePlayer.messageGame(message);
    }),
    [ScriptOpcode_default.NAME]: checkedHandler(ActivePlayer, state => {
        state.pushString(state.activePlayer.username);
    }),
    [ScriptOpcode_default.P_APRANGE]: checkedHandler(ProtectedActivePlayer, state => {
        state.activePlayer.apRange = check(state.popInt(), NumberNotNull);
        state.activePlayer.apRangeCalled = true;
    }),
    [ScriptOpcode_default.P_ARRIVEDELAY]: checkedHandler(ProtectedActivePlayer, state => {
        if (state.activePlayer.lastMovement < World_default.currentTick) {
            return;
        }
        state.activePlayer.delay = 1;
        state.execution = ScriptState.SUSPENDED;
    }),
    [ScriptOpcode_default.P_COUNTDIALOG]: checkedHandler(ProtectedActivePlayer, state => {
        state.activePlayer.write(new PCountDialog());
        state.execution = ScriptState.COUNTDIALOG;
    }),
    [ScriptOpcode_default.P_DELAY]: checkedHandler(ProtectedActivePlayer, state => {
        state.activePlayer.delay = check(state.popInt(), NumberNotNull) + 1;
        state.execution = ScriptState.SUSPENDED;
    }),
    [ScriptOpcode_default.P_OPHELD]: checkedHandler(ProtectedActivePlayer, state => {
        throw new Error('unimplemented');
    }),
    [ScriptOpcode_default.P_OPLOC]: checkedHandler(ProtectedActivePlayer, state => {
        const type = check(state.popInt(), NumberNotNull) - 1;
        if (type < 0 || type >= 5) {
            throw new Error(`Invalid oploc: ${type + 1}`);
        }
        state.activePlayer.stopAction();
        state.activePlayer.setInteraction(Interaction_default.SCRIPT, state.activeLoc, ServerTriggerType_default.APLOC1 + type);
    }),
    [ScriptOpcode_default.P_OPNPC]: checkedHandler(ProtectedActivePlayer, state => {
        const type = check(state.popInt(), NumberNotNull) - 1;
        if (type < 0 || type >= 5) {
            throw new Error(`Invalid opnpc: ${type + 1}`);
        }
        state.activePlayer.stopAction();
        state.activePlayer.setInteraction(Interaction_default.SCRIPT, state.activeNpc, ServerTriggerType_default.APNPC1 + type, {type: state.activeNpc.type, com: -1});
    }),
    [ScriptOpcode_default.P_OPNPCT]: checkedHandler(ProtectedActivePlayer, state => {
        const spellId = check(state.popInt(), NumberNotNull);
        state.activePlayer.stopAction();
        state.activePlayer.setInteraction(Interaction_default.SCRIPT, state.activeNpc, ServerTriggerType_default.APNPCT, {type: state.activeNpc.type, com: spellId});
    }),
    [ScriptOpcode_default.P_PAUSEBUTTON]: checkedHandler(ProtectedActivePlayer, state => {
        state.execution = ScriptState.PAUSEBUTTON;
    }),
    [ScriptOpcode_default.P_STOPACTION]: checkedHandler(ProtectedActivePlayer, state => {
        state.activePlayer.stopAction();
    }),
    [ScriptOpcode_default.P_CLEARPENDINGACTION]: checkedHandler(ProtectedActivePlayer, state => {
        state.activePlayer.clearPendingAction();
    }),
    [ScriptOpcode_default.P_TELEJUMP]: checkedHandler(ProtectedActivePlayer, state => {
        const position = check(state.popInt(), CoordValid);
        state.activePlayer.teleJump(position.x, position.z, position.level);
    }),
    [ScriptOpcode_default.P_TELEPORT]: checkedHandler(ProtectedActivePlayer, state => {
        const position = check(state.popInt(), CoordValid);
        state.activePlayer.teleport(position.x, position.z, position.level);
    }),
    [ScriptOpcode_default.P_WALK]: checkedHandler(ProtectedActivePlayer, state => {
        const pos = check(state.popInt(), CoordValid);
        const player = state.activePlayer;
        player.queueWaypoints(findPath(player.level, player.x, player.z, pos.x, pos.z, player.width, player.width, player.length, player.orientation));
        player.updateMovement(false);
    }),
    [ScriptOpcode_default.SAY]: checkedHandler(ActivePlayer, state => {
        state.activePlayer.say(state.popString());
    }),
    [ScriptOpcode_default.SOUND_SYNTH]: checkedHandler(ActivePlayer, state => {
        const [synth, loops, delay] = state.popInts(3);
        state.activePlayer.write(new SynthSound(synth, loops, delay));
    }),
    [ScriptOpcode_default.STAFFMODLEVEL]: checkedHandler(ActivePlayer, state => {
        state.pushInt(state.activePlayer.staffModLevel);
    }),
    [ScriptOpcode_default.STAT]: checkedHandler(ActivePlayer, state => {
        const stat = check(state.popInt(), PlayerStatValid);
        state.pushInt(state.activePlayer.levels[stat]);
    }),
    [ScriptOpcode_default.STAT_BASE]: checkedHandler(ActivePlayer, state => {
        const stat = check(state.popInt(), PlayerStatValid);
        state.pushInt(state.activePlayer.baseLevels[stat]);
    }),
    [ScriptOpcode_default.STAT_ADD]: checkedHandler(ActivePlayer, state => {
        const [stat, constant, percent] = state.popInts(3);
        check(stat, PlayerStatValid);
        check(constant, NumberNotNull);
        check(percent, NumberNotNull);
        const player = state.activePlayer;
        const current = player.levels[stat];
        const added = current + (constant + (current * percent) / 100);
        player.levels[stat] = Math.min(added, 255);
        if (stat === 3 && player.levels[3] >= player.baseLevels[3]) {
            player.resetHeroPoints();
        }
    }),
    [ScriptOpcode_default.STAT_SUB]: checkedHandler(ActivePlayer, state => {
        const [stat, constant, percent] = state.popInts(3);
        check(stat, PlayerStatValid);
        check(constant, NumberNotNull);
        check(percent, NumberNotNull);
        const player = state.activePlayer;
        const current = player.levels[stat];
        const subbed = current - (constant + (current * percent) / 100);
        player.levels[stat] = Math.max(subbed, 0);
    }),
    [ScriptOpcode_default.SPOTANIM_PL]: checkedHandler(ActivePlayer, state => {
        const delay = check(state.popInt(), NumberNotNull);
        const height = state.popInt();
        const spotanimType = check(state.popInt(), SpotAnimTypeValid);
        state.activePlayer.spotanim(spotanimType.id, height, delay);
    }),
    [ScriptOpcode_default.STAT_HEAL]: checkedHandler(ActivePlayer, state => {
        const [stat, constant, percent] = state.popInts(3);
        check(stat, PlayerStatValid);
        check(constant, NumberNotNull);
        check(percent, NumberNotNull);
        const player = state.activePlayer;
        const base = player.baseLevels[stat];
        const current = player.levels[stat];
        const healed = current + (constant + (current * percent) / 100);
        player.levels[stat] = Math.max(Math.min(healed, base), current);
        if (stat === 3 && player.levels[3] >= player.baseLevels[3]) {
            player.resetHeroPoints();
        }
    }),
    [ScriptOpcode_default.UID]: checkedHandler(ActivePlayer, state => {
        state.pushInt(state.activePlayer.uid);
    }),
    [ScriptOpcode_default.P_LOGOUT]: checkedHandler(ProtectedActivePlayer, state => {
        state.activePlayer.logoutRequested = true;
    }),
    [ScriptOpcode_default.IF_SETCOLOUR]: checkedHandler(ActivePlayer, state => {
        const [com, colour] = state.popInts(2);
        check(com, NumberNotNull);
        check(colour, NumberNotNull);
        state.activePlayer.write(new IfSetColour(com, ColorConversion.rgb24to15(colour)));
    }),
    [ScriptOpcode_default.IF_OPENCHAT]: checkedHandler(ActivePlayer, state => {
        state.activePlayer.openChat(check(state.popInt(), NumberNotNull));
    }),
    [ScriptOpcode_default.IF_OPENMAINMODALSIDEOVERLAY]: checkedHandler(ActivePlayer, state => {
        const [main, side] = state.popInts(2);
        check(main, NumberNotNull);
        check(side, NumberNotNull);
        state.activePlayer.openMainModalSideOverlay(main, side);
    }),
    [ScriptOpcode_default.IF_SETHIDE]: checkedHandler(ActivePlayer, state => {
        const [com, hide] = state.popInts(2);
        check(com, NumberNotNull);
        check(hide, NumberNotNull);
        state.activePlayer.write(new IfSetHide(com, hide === 1));
    }),
    [ScriptOpcode_default.IF_SETOBJECT]: checkedHandler(ActivePlayer, state => {
        const [com, obj, scale] = state.popInts(3);
        check(com, NumberNotNull);
        check(obj, ObjTypeValid);
        check(scale, NumberNotNull);
        state.activePlayer.write(new IfSetObject(com, obj, scale));
    }),
    [ScriptOpcode_default.IF_SETTABACTIVE]: checkedHandler(ActivePlayer, state => {
        state.activePlayer.write(new IfShowSide(check(state.popInt(), NumberNotNull)));
    }),
    [ScriptOpcode_default.IF_SETMODEL]: checkedHandler(ActivePlayer, state => {
        const [com, model] = state.popInts(2);
        check(com, NumberNotNull);
        check(model, NumberNotNull);
        state.activePlayer.write(new IfSetModel(com, model));
    }),
    [ScriptOpcode_default.IF_SETRECOL]: checkedHandler(ActivePlayer, state => {
        const [com, src, dest] = state.popInts(3);
        check(com, NumberNotNull);
        state.activePlayer.write(new IfSetRecol(com, src, dest));
    }),
    [ScriptOpcode_default.IF_SETTABFLASH]: checkedHandler(ActivePlayer, state => {
        state.activePlayer.write(new TutorialFlashSide(check(state.popInt(), NumberNotNull)));
    }),
    [ScriptOpcode_default.IF_SETANIM]: checkedHandler(ActivePlayer, state => {
        const [com, seq] = state.popInts(2);
        check(com, NumberNotNull);
        if (seq === -1) {
            return;
        }
        state.activePlayer.write(new IfSetAnim(com, seq));
    }),
    [ScriptOpcode_default.IF_SETTAB]: checkedHandler(ActivePlayer, state => {
        const [com, tab] = state.popInts(2);
        check(tab, NumberNotNull);
        state.activePlayer.setTab(com, tab);
    }),
    [ScriptOpcode_default.IF_OPENMAINMODAL]: checkedHandler(ActivePlayer, state => {
        state.activePlayer.openMainModal(check(state.popInt(), NumberNotNull));
    }),
    [ScriptOpcode_default.IF_OPENCHATSTICKY]: checkedHandler(ActivePlayer, state => {
        state.activePlayer.openChatSticky(check(state.popInt(), NumberNotNull));
    }),
    [ScriptOpcode_default.IF_OPENSIDEOVERLAY]: checkedHandler(ActivePlayer, state => {
        state.activePlayer.openSideOverlay(check(state.popInt(), NumberNotNull));
    }),
    [ScriptOpcode_default.IF_SETPLAYERHEAD]: checkedHandler(ActivePlayer, state => {
        state.activePlayer.write(new IfSetPlayerHead(check(state.popInt(), NumberNotNull)));
    }),
    [ScriptOpcode_default.IF_SETTEXT]: checkedHandler(ActivePlayer, state => {
        const text = state.popString();
        const com = check(state.popInt(), NumberNotNull);
        state.activePlayer.write(new IfSetText(com, text));
    }),
    [ScriptOpcode_default.IF_SETNPCHEAD]: checkedHandler(ActivePlayer, state => {
        const [com, npc] = state.popInts(2);
        check(com, NumberNotNull);
        check(npc, NpcTypeValid);
        state.activePlayer.write(new IfSetNpcHead(com, npc));
    }),
    [ScriptOpcode_default.IF_SETPOSITION]: checkedHandler(ActivePlayer, state => {
        const [com, x, y2] = state.popInts(3);
        check(com, NumberNotNull);
        state.activePlayer.write(new IfSetPosition(com, x, y2));
    }),
    [ScriptOpcode_default.IF_MULTIZONE]: checkedHandler(ActivePlayer, state => {
        state.activePlayer.write(new SetMultiway(check(state.popInt(), NumberNotNull) === 1));
    }),
    [ScriptOpcode_default.GIVEXP]: checkedHandler(ProtectedActivePlayer, state => {
        const [stat, xp] = state.popInts(2);
        check(stat, NumberNotNull);
        check(xp, NumberNotNull);
        state.activePlayer.addXp(stat, xp);
    }),
    [ScriptOpcode_default.DAMAGE]: state => {
        const amount = check(state.popInt(), NumberNotNull);
        const type = check(state.popInt(), HitTypeValid);
        const uid = check(state.popInt(), NumberNotNull);
        const player = World_default.getPlayerByUid(uid);
        if (!player) {
            return;
        }
        player.applyDamage(amount, type);
    },
    [ScriptOpcode_default.IF_SETRESUMEBUTTONS]: checkedHandler(ActivePlayer, state => {
        const [button1, button2, button3, button4, button5] = state.popInts(5);
        state.activePlayer.resumeButtons = [button1, button2, button3, button4, button5];
    }),
    [ScriptOpcode_default.TEXT_GENDER]: checkedHandler(ActivePlayer, state => {
        const [male, female] = state.popStrings(2);
        if (state.activePlayer.gender == 0) {
            state.pushString(male);
        } else {
            state.pushString(female);
        }
    }),
    [ScriptOpcode_default.MIDI_SONG]: state => {
        state.activePlayer.playSong(check(state.popString(), StringNotNull));
    },
    [ScriptOpcode_default.MIDI_JINGLE]: state => {
        const delay = check(state.popInt(), NumberNotNull);
        const name = check(state.popString(), StringNotNull);
        state.activePlayer.playJingle(delay, name);
    },
    [ScriptOpcode_default.SOFTTIMER]: checkedHandler(ActivePlayer, state => {
        const args = popScriptArgs(state);
        const interval = state.popInt();
        const timerId = state.popInt();
        const script = ScriptProvider.get(timerId);
        if (!script) {
            throw new Error(`Unable to find timer script: ${timerId}`);
        }
        state.activePlayer.setTimer(1 /* SOFT */, script, args, interval);
    }),
    [ScriptOpcode_default.CLEARSOFTTIMER]: checkedHandler(ActivePlayer, state => {
        state.activePlayer.clearTimer(state.popInt());
    }),
    [ScriptOpcode_default.SETTIMER]: checkedHandler(ActivePlayer, state => {
        const args = popScriptArgs(state);
        const interval = state.popInt();
        const timerId = state.popInt();
        const script = ScriptProvider.get(timerId);
        if (!script) {
            throw new Error(`Unable to find timer script: ${timerId}`);
        }
        state.activePlayer.setTimer(0 /* NORMAL */, script, args, interval);
    }),
    [ScriptOpcode_default.CLEARTIMER]: checkedHandler(ActivePlayer, state => {
        state.activePlayer.clearTimer(state.popInt());
    }),
    [ScriptOpcode_default.HINT_COORD]: state => {
        const [offset, coord, height] = state.popInts(3);
        const position = check(coord, CoordValid);
        state.activePlayer.hintTile(offset, position.x, position.z, height);
    },
    [ScriptOpcode_default.HINT_STOP]: state => {
        state.activePlayer.stopHint();
    },
    [ScriptOpcode_default.IF_CLOSESTICKY]: state => {
        state.activePlayer.closeSticky();
    },
    [ScriptOpcode_default.P_EXACTMOVE]: checkedHandler(ProtectedActivePlayer, state => {
        const [start, end, startCycle, endCycle, direction] = state.popInts(5);
        const startPos = check(start, CoordValid);
        const endPos = check(end, CoordValid);
        state.activePlayer.unsetMapFlag();
        state.activePlayer.exactMove(startPos.x, startPos.z, endPos.x, endPos.z, startCycle, endCycle, direction);
    }),
    [ScriptOpcode_default.BUSY]: state => {
        state.pushInt(state.activePlayer.busy() ? 1 : 0);
    },
    [ScriptOpcode_default.BUSY2]: state => {
        state.pushInt(state.activePlayer.hasInteraction() || state.activePlayer.hasWaypoints() ? 1 : 0);
    },
    [ScriptOpcode_default.GETQUEUE]: state => {
        const scriptId = state.popInt();
        let count = 0;
        for (let request = state.activePlayer.queue.head(); request !== null; request = state.activePlayer.queue.next()) {
            if (request.script.id === scriptId) {
                count++;
            }
        }
        for (let request = state.activePlayer.weakQueue.head(); request !== null; request = state.activePlayer.weakQueue.next()) {
            if (request.script.id === scriptId) {
                count++;
            }
        }
        state.pushInt(count);
    },
    [ScriptOpcode_default.P_LOCMERGE]: checkedHandler(ProtectedActivePlayer, state => {
        const [startCycle, endCycle, southEast, northWest] = state.popInts(4);
        const se = check(southEast, CoordValid);
        const nw = check(northWest, CoordValid);
        World_default.mergeLoc(state.activeLoc, state.activePlayer, startCycle, endCycle, se.z, se.x, nw.z, nw.x);
    }),
    [ScriptOpcode_default.LAST_LOGIN_INFO]: state => {
        const player = state.activePlayer;
        if (!isNetworkPlayer(player) || player.client === null) {
            return;
        }
        const client = player.client;
        const remoteAddress = client.remoteAddress;
        if (remoteAddress == null) {
            return;
        }
        const lastLoginIp = new Uint32Array(new Uint8Array(remoteAddress.split('.').map(x => parseInt(x))).reverse().buffer)[0];
        player.lastLoginInfo(lastLoginIp, 0, 201, 0);
    },
    [ScriptOpcode_default.BAS_READYANIM]: state => {
        state.activePlayer.basReadyAnim = check(state.popInt(), SeqTypeValid).id;
    },
    [ScriptOpcode_default.BAS_TURNONSPOT]: state => {
        state.activePlayer.basTurnOnSpot = check(state.popInt(), SeqTypeValid).id;
    },
    [ScriptOpcode_default.BAS_WALK_F]: state => {
        state.activePlayer.basWalkForward = check(state.popInt(), SeqTypeValid).id;
    },
    [ScriptOpcode_default.BAS_WALK_B]: state => {
        state.activePlayer.basWalkBackward = check(state.popInt(), SeqTypeValid).id;
    },
    [ScriptOpcode_default.BAS_WALK_L]: state => {
        state.activePlayer.basWalkLeft = check(state.popInt(), SeqTypeValid).id;
    },
    [ScriptOpcode_default.BAS_WALK_R]: state => {
        state.activePlayer.basWalkRight = check(state.popInt(), SeqTypeValid).id;
    },
    [ScriptOpcode_default.BAS_RUNNING]: state => {
        const seq = state.popInt();
        if (seq === -1) {
            state.activePlayer.basRunning = -1;
            return;
        }
        state.activePlayer.basRunning = check(seq, SeqTypeValid).id;
    },
    [ScriptOpcode_default.GENDER]: state => {
        state.pushInt(state.activePlayer.gender);
    },
    [ScriptOpcode_default.HINT_NPC]: state => {
        state.activePlayer.hintNpc(check(state.popInt(), NumberNotNull));
    },
    [ScriptOpcode_default.HINT_PLAYER]: state => {
        state.activePlayer.hintPlayer(check(state.popInt(), NumberNotNull));
    },
    [ScriptOpcode_default.HEADICONS_GET]: state => {
        state.pushInt(state.activePlayer.headicons);
    },
    [ScriptOpcode_default.HEADICONS_SET]: state => {
        state.activePlayer.headicons = check(state.popInt(), NumberNotNull);
    },
    [ScriptOpcode_default.P_OPOBJ]: checkedHandler(ProtectedActivePlayer, state => {
        const type = check(state.popInt(), NumberNotNull) - 1;
        if (type < 0 || type >= 5) {
            throw new Error(`Invalid opobj: ${type + 1}`);
        }
        state.activePlayer.stopAction();
        state.activePlayer.setInteraction(Interaction_default.SCRIPT, state.activeObj, ServerTriggerType_default.APOBJ1 + type);
    }),
    [ScriptOpcode_default.P_OPPLAYER]: checkedHandler(ProtectedActivePlayer, state => {
        const type = check(state.popInt(), NumberNotNull) - 1;
        if (type < 0 || type >= 5) {
            throw new Error(`Invalid opplayer: ${type + 1}`);
        }
        const target = state._activePlayer2;
        if (!target) {
            return;
        }
        state.activePlayer.stopAction();
        state.activePlayer.setInteraction(Interaction_default.SCRIPT, target, ServerTriggerType_default.APPLAYER1 + type);
    }),
    [ScriptOpcode_default.ALLOWDESIGN]: state => {
        state.activePlayer.allowDesign = check(state.popInt(), NumberNotNull) === 1;
    },
    [ScriptOpcode_default.LAST_TARGETSLOT]: state => {
        const allowedTriggers = [ServerTriggerType_default.INV_BUTTOND];
        if (!allowedTriggers.includes(state.trigger)) {
            throw new Error('is not safe to use in this trigger');
        }
        state.pushInt(state.activePlayer.lastTargetSlot);
    },
    [ScriptOpcode_default.WALKTRIGGER]: state => {
        state.activePlayer.walktrigger = state.popInt();
    },
    [ScriptOpcode_default.GETWALKTRIGGER]: state => {
        state.pushInt(state.activePlayer.walktrigger);
    },
    [ScriptOpcode_default.CLEARQUEUE]: state => {
        const scriptId = state.popInt();
        for (let request = state.activePlayer.queue.head(); request !== null; request = state.activePlayer.queue.next()) {
            if (request.script.id === scriptId) {
                request.unlink();
            }
        }
        for (let request = state.activePlayer.weakQueue.head(); request !== null; request = state.activePlayer.weakQueue.next()) {
            if (request.script.id === scriptId) {
                request.unlink();
            }
        }
    },
    [ScriptOpcode_default.HEALENERGY]: state => {
        const amount = check(state.popInt(), NumberNotNull);
        const player = state.activePlayer;
        player.runenergy = Math.min(Math.max(player.runenergy + amount, 0), 1e4);
    },
    [ScriptOpcode_default.AFK_EVENT]: state => {
        state.pushInt(state.activePlayer.afkEventReady ? 1 : 0);
        state.activePlayer.afkEventReady = false;
    },
    [ScriptOpcode_default.LOWMEMORY]: state => {
        state.pushInt(state.activePlayer.lowMemory ? 1 : 0);
    },
    [ScriptOpcode_default.SETIDKIT]: state => {
        const [idkit, color] = state.popInts(2);
        const idkType = check(idkit, IDKTypeValid);
        let slot = idkType.type;
        if (state.activePlayer.gender === 1) {
            slot -= 7;
        }
        state.activePlayer.body[slot] = idkType.id;
        let type = idkType.type;
        if (state.activePlayer.gender === 1) {
            type -= 7;
        }
        let colorSlot = -1;
        if (type === 0 || type === 1) {
            colorSlot = 0;
        } else if (type === 2 || type === 3) {
            colorSlot = 1;
        } else if (type === 4) {
        } else if (type === 5) {
            colorSlot = 2;
        } else if (type === 6) {
            colorSlot = 3;
        }
        if (colorSlot !== -1) {
            state.activePlayer.colors[colorSlot] = color;
        }
    },
    [ScriptOpcode_default.SETGENDER]: state => {
        const gender = check(state.popInt(), GenderValid);
        for (let i = 0; i < 7; i++) {
            state.activePlayer.body[i] = -1;
            for (let j = 0; j < IdkType.count; j++) {
                if (!IdkType.get(j).disable && IdkType.get(j).type == i + (gender === 0 ? 0 : 7)) {
                    state.activePlayer.body[i] = j;
                    break;
                }
            }
        }
        state.activePlayer.gender = gender;
    },
    [ScriptOpcode_default.SETSKINCOLOUR]: state => {
        const skin = check(state.popInt(), SkinColourValid);
        state.activePlayer.colors[4] = skin;
    },
    [ScriptOpcode_default.P_OPPLAYERT]: checkedHandler(ProtectedActivePlayer, state => {
        const spellId = check(state.popInt(), NumberNotNull);
        const target = state._activePlayer2;
        if (!target) {
            return;
        }
        state.activePlayer.stopAction();
        state.activePlayer.setInteraction(Interaction_default.SCRIPT, target, ServerTriggerType_default.APPLAYERT, {type: -1, com: spellId});
    }),
    [ScriptOpcode_default.FINDHERO]: checkedHandler(ActivePlayer, state => {
        const uid = state.activePlayer.findHero();
        if (uid === -1) {
            state.pushInt(0);
            return;
        }
        const player = World_default.getPlayerByUid(uid);
        if (!player) {
            state.pushInt(0);
            return;
        }
        state._activePlayer2 = player;
        state.pointerAdd(ScriptPointer_default.ActivePlayer2);
        state.pushInt(1);
    }),
    [ScriptOpcode_default.BOTH_HEROPOINTS]: checkedHandler(ActivePlayer, state => {
        const damage = check(state.popInt(), NumberNotNull);
        const secondary = state.intOperand === 1;
        const fromPlayer = secondary ? state._activePlayer2 : state._activePlayer;
        const toPlayer = secondary ? state._activePlayer : state._activePlayer2;
        if (!fromPlayer || !toPlayer) {
            throw new Error('player is null');
        }
        toPlayer.addHero(fromPlayer.uid, damage);
    }),
    [ScriptOpcode_default.P_ANIMPROTECT]: checkedHandler(ProtectedActivePlayer, state => {
        state.activePlayer.animProtect = check(state.popInt(), NumberNotNull);
    })
};
var PlayerOps_default = PlayerOps;

// src/lostcity/engine/script/handlers/ServerOps.ts
var ServerOps = {
    [ScriptOpcode_default.MAP_CLOCK]: state => {
        state.pushInt(World_default.currentTick);
    },
    [ScriptOpcode_default.MAP_MEMBERS]: state => {
        state.pushInt(World_default.members ? 1 : 0);
    },
    [ScriptOpcode_default.MAP_PLAYERCOUNT]: state => {
        const [c1, c2] = state.popInts(2);
        const from = check(c1, CoordValid);
        const to = check(c2, CoordValid);
        let count = 0;
        for (let x = Math.floor(from.x / 8); x <= Math.ceil(to.x / 8); x++) {
            for (let z2 = Math.floor(from.z / 8); z2 <= Math.ceil(to.z / 8); z2++) {
                for (const player of World_default.getZone(x << 3, z2 << 3, from.level).getAllPlayersSafe()) {
                    if (player.x >= from.x && player.x <= to.x && player.z >= from.z && player.z <= to.z) {
                        count++;
                    }
                }
            }
        }
        state.pushInt(count);
    },
    [ScriptOpcode_default.HUNTALL]: state => {
        const [coord, distance, checkVis] = state.popInts(3);
        const position = check(coord, CoordValid);
        check(distance, NumberNotNull);
        const huntvis = check(checkVis, HuntVisValid);
        state.huntIterator = new HuntIterator(World_default.currentTick, position.level, position.x, position.z, distance, huntvis, -1, -1, HuntModeType_default.PLAYER);
    },
    [ScriptOpcode_default.HUNTNEXT]: state => {
        const result = state.huntIterator?.next();
        if (!result || result.done) {
            state.pushInt(0);
            return;
        }
        if (!(result.value instanceof Player2)) {
            throw new Error('[ServerOps] huntnext command must result instance of Player.');
        }
        state.activePlayer = result.value;
        state.pointerAdd(ActivePlayer[state.intOperand]);
        state.pushInt(1);
    },
    [ScriptOpcode_default.NPC_HUNTALL]: state => {
        const [coord, distance, checkVis] = state.popInts(3);
        const position = check(coord, CoordValid);
        check(distance, NumberNotNull);
        const huntvis = check(checkVis, HuntVisValid);
        state.huntIterator = new HuntIterator(World_default.currentTick, position.level, position.x, position.z, distance, huntvis, -1, -1, HuntModeType_default.NPC);
    },
    [ScriptOpcode_default.NPC_HUNTNEXT]: state => {
        const result = state.huntIterator?.next();
        if (!result || result.done) {
            state.pushInt(0);
            return;
        }
        if (!(result.value instanceof Npc2)) {
            throw new Error('[ServerOps] npc_huntnext command must result instance of Npc.');
        }
        state.activeNpc = result.value;
        state.pointerAdd(ActiveNpc[state.intOperand]);
        state.pushInt(1);
    },
    [ScriptOpcode_default.INZONE]: state => {
        const [c1, c2, c3] = state.popInts(3);
        const from = check(c1, CoordValid);
        const to = check(c2, CoordValid);
        const pos = check(c3, CoordValid);
        if (pos.x < from.x || pos.x > to.x) {
            state.pushInt(0);
        } else if (pos.level < from.level || pos.level > to.level) {
            state.pushInt(0);
        } else if (pos.z < from.z || pos.z > to.z) {
            state.pushInt(0);
        } else {
            state.pushInt(1);
        }
    },
    [ScriptOpcode_default.LINEOFWALK]: state => {
        const [c1, c2] = state.popInts(2);
        const from = check(c1, CoordValid);
        const to = check(c2, CoordValid);
        if (from.level !== to.level) {
            state.pushInt(0);
            return;
        }
        state.pushInt(hasLineOfWalk(from.level, from.x, from.z, to.x, to.z, 1, 1, 1, 1) ? 1 : 0);
    },
    [ScriptOpcode_default.STAT_RANDOM]: state => {
        const [level, low, high] = state.popInts(3);
        const value = Math.floor((low * (99 - level)) / 98) + Math.floor((high * (level - 1)) / 98) + 1;
        const chance = Math.floor(Math.random() * 256);
        state.pushInt(value > chance ? 1 : 0);
    },
    [ScriptOpcode_default.SPOTANIM_MAP]: state => {
        const [spotanim, coord, height, delay] = state.popInts(4);
        const position = check(coord, CoordValid);
        const spotanimType = check(spotanim, SpotAnimTypeValid);
        World_default.animMap(position.level, position.x, position.z, spotanimType.id, height, delay);
    },
    [ScriptOpcode_default.DISTANCE]: state => {
        const [c1, c2] = state.popInts(2);
        const from = check(c1, CoordValid);
        const to = check(c2, CoordValid);
        state.pushInt(Position.distanceToSW(from, to));
    },
    [ScriptOpcode_default.MOVECOORD]: state => {
        const [coord, x, y2, z2] = state.popInts(4);
        const position = check(coord, CoordValid);
        state.pushInt(Position.packCoord(position.level + y2, position.x + x, position.z + z2));
    },
    [ScriptOpcode_default.SEQLENGTH]: state => {
        state.pushInt(check(state.popInt(), SeqTypeValid).duration);
    },
    [ScriptOpcode_default.SPLIT_INIT]: state => {
        const [maxWidth, linesPerPage, fontId] = state.popInts(3);
        let text = state.popString();
        const font = check(fontId, FontTypeValid);
        if (text.startsWith('<p,') && text.indexOf('>') !== -1) {
            const mesanim = text.substring(3, text.indexOf('>'));
            state.splitMesanim = MesanimType.getId(mesanim);
            text = text.substring(text.indexOf('>') + 1);
        } else {
            state.splitMesanim = -1;
        }
        state.splitPages = [];
        const lines = font.split(text, maxWidth);
        while (lines.length > 0) {
            state.splitPages.push(lines.splice(0, linesPerPage));
        }
    },
    [ScriptOpcode_default.SPLIT_GET]: state => {
        const [page, line] = state.popInts(2);
        state.pushString(state.splitPages[page][line]);
    },
    [ScriptOpcode_default.SPLIT_PAGECOUNT]: state => {
        state.pushInt(state.splitPages.length);
    },
    [ScriptOpcode_default.SPLIT_LINECOUNT]: state => {
        const page = state.popInt();
        state.pushInt(state.splitPages[page].length);
    },
    [ScriptOpcode_default.SPLIT_GETANIM]: state => {
        const page = state.popInt();
        if (state.splitMesanim === -1) {
            state.pushInt(-1);
            return;
        }
        state.pushInt(check(state.splitMesanim, MesanimValid).len[state.splitPages[page].length - 1]);
    },
    [ScriptOpcode_default.STRUCT_PARAM]: state => {
        const [structId, paramId] = state.popInts(2);
        const paramType = check(paramId, ParamTypeValid);
        const structType = check(structId, StructTypeValid);
        if (paramType.isString()) {
            state.pushString(ParamHelper.getStringParam(paramType.id, structType, paramType.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramType.id, structType, paramType.defaultInt));
        }
    },
    [ScriptOpcode_default.COORDX]: state => {
        state.pushInt(check(state.popInt(), CoordValid).x);
    },
    [ScriptOpcode_default.COORDY]: state => {
        state.pushInt(check(state.popInt(), CoordValid).level);
    },
    [ScriptOpcode_default.COORDZ]: state => {
        state.pushInt(check(state.popInt(), CoordValid).z);
    },
    [ScriptOpcode_default.PLAYERCOUNT]: state => {
        state.pushInt(World_default.getTotalPlayers());
    },
    [ScriptOpcode_default.MAP_BLOCKED]: state => {
        const position = check(state.popInt(), CoordValid);
        state.pushInt(isFlagged(position.x, position.z, position.level, CollisionFlag.WALK_BLOCKED) ? 1 : 0);
    },
    [ScriptOpcode_default.MAP_INDOORS]: state => {
        const position = check(state.popInt(), CoordValid);
        state.pushInt(isFlagged(position.x, position.z, position.level, CollisionFlag.ROOF) ? 1 : 0);
    },
    [ScriptOpcode_default.LINEOFSIGHT]: state => {
        const [c1, c2] = state.popInts(2);
        const from = check(c1, CoordValid);
        const to = check(c2, CoordValid);
        if (from.level !== to.level) {
            state.pushInt(0);
            return;
        }
        state.pushInt(hasLineOfSight(from.level, from.x, from.z, to.x, to.z, 1, 1, 1, 1) ? 1 : 0);
    },
    [ScriptOpcode_default.WORLD_DELAY]: state => {
        state.execution = ScriptState.WORLD_SUSPENDED;
    },
    [ScriptOpcode_default.PROJANIM_PL]: state => {
        const [srcCoord, uid, spotanim, srcHeight, dstHeight, delay, duration, peak, arc] = state.popInts(9);
        const srcPos = check(srcCoord, CoordValid);
        const spotanimType = check(spotanim, SpotAnimTypeValid);
        const player = World_default.getPlayerByUid(uid);
        if (!player) {
            throw new Error(`attempted to use invalid player uid: ${uid}`);
        }
        World_default.mapProjAnim(srcPos.level, srcPos.x, srcPos.z, player.x, player.z, -player.pid - 1, spotanimType.id, srcHeight + 100, dstHeight + 100, delay, duration, peak, arc);
    },
    [ScriptOpcode_default.PROJANIM_NPC]: state => {
        const [srcCoord, npcUid, spotanim, srcHeight, dstHeight, delay, duration, peak, arc] = state.popInts(9);
        const srcPos = check(srcCoord, CoordValid);
        const spotanimType = check(spotanim, SpotAnimTypeValid);
        const slot = npcUid & 65535;
        const expectedType = (npcUid >> 16) & 65535;
        const npc = World_default.getNpc(slot);
        if (!npc) {
            throw new Error(`attempted to use invalid npc uid: ${npcUid}`);
        }
        World_default.mapProjAnim(srcPos.level, srcPos.x, srcPos.z, npc.x, npc.z, npc.nid + 1, spotanimType.id, srcHeight + 100, dstHeight + 100, delay, duration, peak, arc);
    },
    [ScriptOpcode_default.PROJANIM_MAP]: state => {
        const [srcCoord, dstCoord, spotanim, srcHeight, dstHeight, delay, duration, peak, arc] = state.popInts(9);
        const spotanimType = check(spotanim, SpotAnimTypeValid);
        const srcPos = check(srcCoord, CoordValid);
        const dstPos = check(dstCoord, CoordValid);
        World_default.mapProjAnim(srcPos.level, srcPos.x, srcPos.z, dstPos.x, dstPos.z, 0, spotanimType.id, srcHeight + 100, dstHeight, delay, duration, peak, arc);
    },
    [ScriptOpcode_default.MAP_LOCADDUNSAFE]: state => {
        const pos = check(state.popInt(), CoordValid);
        for (const loc of World_default.getZone(pos.x, pos.z, pos.level).getAllLocsUnsafe()) {
            const type = check(loc.type, LocTypeValid);
            if (type.active !== 1) {
                continue;
            }
            const layer = locShapeLayer(loc.shape);
            if (!loc.checkLifeCycle(World_default.currentTick) && layer === LocLayer.WALL) {
                continue;
            }
            if (layer === LocLayer.WALL) {
                if (loc.x === pos.x && loc.z === pos.z) {
                    state.pushInt(1);
                    return;
                }
            } else if (layer === LocLayer.GROUND) {
                const width = loc.angle === LocAngle.NORTH || loc.angle === LocAngle.SOUTH ? loc.length : loc.width;
                const length = loc.angle === LocAngle.NORTH || loc.angle === LocAngle.SOUTH ? loc.width : loc.length;
                for (let index = 0; index < width * length; index++) {
                    const deltaX = loc.x + (index % width);
                    const deltaZ = loc.z + ((index / width) | 0);
                    if (deltaX === pos.x && deltaZ === pos.z) {
                        state.pushInt(1);
                        return;
                    }
                }
            } else if (layer === LocLayer.GROUND_DECOR) {
                if (loc.x === pos.x && loc.z === pos.z) {
                    state.pushInt(1);
                    return;
                }
            }
        }
        state.pushInt(0);
    },
    [ScriptOpcode_default.NPCCOUNT]: state => {
        state.pushInt(World_default.getTotalNpcs());
    },
    [ScriptOpcode_default.MAP_LASTCLOCK]: state => {
        state.pushInt(World_default.lastCycleStats[0]);
    },
    [ScriptOpcode_default.MAP_LASTWORLD]: state => {
        state.pushInt(World_default.lastCycleStats[1]);
    },
    [ScriptOpcode_default.MAP_LASTCLIENTIN]: state => {
        state.pushInt(World_default.lastCycleStats[2]);
    },
    [ScriptOpcode_default.MAP_LASTNPC]: state => {
        state.pushInt(World_default.lastCycleStats[3]);
    },
    [ScriptOpcode_default.MAP_LASTPLAYER]: state => {
        state.pushInt(World_default.lastCycleStats[4]);
    },
    [ScriptOpcode_default.MAP_LASTLOGOUT]: state => {
        state.pushInt(World_default.lastCycleStats[5]);
    },
    [ScriptOpcode_default.MAP_LASTLOGIN]: state => {
        state.pushInt(World_default.lastCycleStats[6]);
    },
    [ScriptOpcode_default.MAP_LASTZONE]: state => {
        state.pushInt(World_default.lastCycleStats[7]);
    },
    [ScriptOpcode_default.MAP_LASTCLIENTOUT]: state => {
        state.pushInt(World_default.lastCycleStats[8]);
    },
    [ScriptOpcode_default.MAP_LASTCLEANUP]: state => {
        state.pushInt(World_default.lastCycleStats[9]);
    },
    [ScriptOpcode_default.MAP_LASTBANDWIDTHIN]: state => {
        state.pushInt(World_default.lastCycleBandwidth[0]);
    },
    [ScriptOpcode_default.MAP_LASTBANDWIDTHOUT]: state => {
        state.pushInt(World_default.lastCycleBandwidth[1]);
    },
    [ScriptOpcode_default.ZONECOUNT]: state => {
        state.pushInt(World_default.zoneMap.zoneCount());
    },
    [ScriptOpcode_default.LOCCOUNT]: state => {
        state.pushInt(World_default.zoneMap.locCount());
    },
    [ScriptOpcode_default.OBJCOUNT]: state => {
        state.pushInt(World_default.zoneMap.objCount());
    }
};
var ServerOps_default = ServerOps;

// src/lostcity/engine/script/handlers/StringOps.ts
var javaStringCompare = function (a, b2) {
    const len1 = a.length;
    const len2 = b2.length;
    const lim = Math.min(len1, len2);
    let k = 0;
    while (k < lim) {
        const c1 = a.charCodeAt(k);
        const c2 = b2.charCodeAt(k);
        if (c1 != c2) {
            return c1 - c2;
        }
        k++;
    }
    return len1 - len2;
};
var StringOps = {
    [ScriptOpcode_default.APPEND_NUM]: state => {
        const text = state.popString();
        const num = state.popInt();
        state.pushString(text + num);
    },
    [ScriptOpcode_default.APPEND]: state => {
        const [t1, t2] = state.popStrings(2);
        state.pushString(t1 + t2);
    },
    [ScriptOpcode_default.APPEND_SIGNNUM]: state => {
        const text = state.popString();
        const num = state.popInt();
        if (num >= 0) {
            state.pushString(`${text}+${num}`);
        } else {
            state.pushString(text + num);
        }
    },
    [ScriptOpcode_default.LOWERCASE]: state => {
        state.pushString(state.popString().toLowerCase());
    },
    [ScriptOpcode_default.TOSTRING]: state => {
        state.pushString(state.popInt().toString());
    },
    [ScriptOpcode_default.COMPARE]: state => {
        const [s1, s2] = state.popStrings(2);
        state.pushInt(javaStringCompare(s1, s2));
    },
    [ScriptOpcode_default.TEXT_SWITCH]: state => {
        const value = state.popInt();
        const [s1, s2] = state.popStrings(2);
        state.pushString(value === 1 ? s1 : s2);
    },
    [ScriptOpcode_default.APPEND_CHAR]: state => {
        const text = state.popString();
        const char = state.popInt();
        state.pushString(text + String.fromCharCode(char));
    },
    [ScriptOpcode_default.STRING_LENGTH]: state => {
        state.pushInt(state.popString().length);
    },
    [ScriptOpcode_default.SUBSTRING]: state => {
        const text = state.popString();
        const [start, end] = state.popInts(2);
        state.pushString(text.substring(start, end));
    },
    [ScriptOpcode_default.STRING_INDEXOF_CHAR]: state => {
        const text = state.popString();
        const find = String.fromCharCode(state.popInt());
        state.pushInt(text.indexOf(find));
    },
    [ScriptOpcode_default.STRING_INDEXOF_STRING]: state => {
        const text = state.popString();
        const find = state.popString();
        state.pushInt(text.indexOf(find));
    }
};
var StringOps_default = StringOps;

// src/lostcity/engine/script/ScriptRunner.ts
class ScriptRunner2 {
    static HANDLERS = {
        ...CoreOps_default,
        ...ServerOps_default,
        ...PlayerOps_default,
        ...NpcOps_default,
        ...LocOps_default,
        ...ObjOps_default,
        ...NpcConfigOps_default,
        ...LocConfigOps_default,
        ...ObjConfigOps_default,
        ...InvOps_default,
        ...EnumOps_default,
        ...StringOps_default,
        ...NumberOps_default,
        ...DbOps_default,
        ...DebugOps_default
    };
    static init(script, self2 = null, target = null, args = []) {
        const state = new ScriptState(script, args);
        state.self = self2;
        if (self2 instanceof Player2) {
            state._activePlayer = self2;
            state.pointerAdd(ScriptPointer_default.ActivePlayer);
        } else if (self2 instanceof Npc2) {
            state._activeNpc = self2;
            state.pointerAdd(ScriptPointer_default.ActiveNpc);
        } else if (self2 instanceof Loc) {
            state._activeLoc = self2;
            state.pointerAdd(ScriptPointer_default.ActiveLoc);
        } else if (self2 instanceof Obj) {
            state._activeObj = self2;
            state.pointerAdd(ScriptPointer_default.ActiveObj);
        }
        if (target instanceof Player2) {
            if (self2 instanceof Player2) {
                state._activePlayer2 = target;
                state.pointerAdd(ScriptPointer_default.ActivePlayer2);
            } else {
                state._activePlayer = target;
                state.pointerAdd(ScriptPointer_default.ActivePlayer);
            }
        } else if (target instanceof Npc2) {
            if (self2 instanceof Npc2) {
                state._activeNpc2 = target;
                state.pointerAdd(ScriptPointer_default.ActiveNpc2);
            } else {
                state._activeNpc = target;
                state.pointerAdd(ScriptPointer_default.ActiveNpc);
            }
        } else if (target instanceof Loc) {
            if (self2 instanceof Loc) {
                state._activeLoc2 = target;
                state.pointerAdd(ScriptPointer_default.ActiveLoc2);
            } else {
                state._activeLoc = target;
                state.pointerAdd(ScriptPointer_default.ActiveLoc);
            }
        } else if (target instanceof Obj) {
            if (self2 instanceof Obj) {
                state._activeObj2 = target;
                state.pointerAdd(ScriptPointer_default.ActiveObj2);
            } else {
                state._activeObj = target;
                state.pointerAdd(ScriptPointer_default.ActiveObj);
            }
        }
        return state;
    }
    static execute(state, reset = false, benchmark = false) {
        if (!state || !state.script || !state.script.info) {
            return ScriptState.ABORTED;
        }
        try {
            if (reset) {
                state.reset();
            }
            if (state.execution !== ScriptState.RUNNING) {
                state.executionHistory.push(state.execution);
            }
            state.execution = ScriptState.RUNNING;
            const start = performance.now() * 1000;
            while (state.execution === ScriptState.RUNNING) {
                if (state.pc >= state.script.opcodes.length || state.pc < -1) {
                    throw new Error('Invalid program counter: ' + state.pc + ', max expected: ' + state.script.opcodes.length);
                }
                if (!benchmark && state.opcount > 500000) {
                    throw new Error('Too many instructions');
                }
                state.opcount++;
                ScriptRunner2.executeInner(state, state.script.opcodes[++state.pc]);
            }
            const time = (performance.now() * 1000 - start) | 0;
            if (Environment_default.PROFILE_SCRIPTS && time > 1000) {
                const message = `Warning [cpu time]: Script: ${state.script.info.scriptName}, time: ${time}us`;
                if (state.self instanceof Player2) {
                    state.self.wrappedMessageGame(message);
                } else {
                    console.warn(message);
                }
            }
        } catch (err) {
            if (state.pc >= 0 && state.pc < state.script.opcodes.length) {
                const opcode = state.script.opcodes[state.pc];
                let secondary = state.intOperand;
                if (opcode === ScriptOpcode_default.POP_VARP || opcode === ScriptOpcode_default.POP_VARN || opcode === ScriptOpcode_default.PUSH_VARP || opcode === ScriptOpcode_default.PUSH_VARN) {
                    secondary = (state.intOperand >> 16) & 1;
                } else if (opcode <= ScriptOpcode_default.POP_ARRAY_INT) {
                    secondary = 0;
                }
                err.message = ScriptOpcode_default[opcode].toLowerCase() + ' ' + err.message;
                if (secondary) {
                    err.message = '.' + err.message;
                }
            }
            if (state.self instanceof Player2) {
                state.self.wrappedMessageGame(`script error: ${err.message}`);
                state.self.wrappedMessageGame(`file: ${q.basename(state.script.info.sourceFilePath)}`);
                state.self.wrappedMessageGame('');
                state.self.wrappedMessageGame('stack backtrace:');
                state.self.wrappedMessageGame(`    1: ${state.script.name} - ${state.script.fileName}:${state.script.lineNumber(state.pc)}`);
                let trace2 = 1;
                for (let i = state.fp; i > 0; i--) {
                    const frame = state.frames[i];
                    if (frame) {
                        trace2++;
                        state.self.wrappedMessageGame(`    ${trace2}: ${frame.script.name} - ${frame.script.fileName}:${frame.script.lineNumber(frame.pc)}`);
                    }
                }
                for (let i = state.debugFp; i >= 0; i--) {
                    const frame = state.debugFrames[i];
                    if (frame) {
                        trace2++;
                        state.self.wrappedMessageGame(`    ${trace2}: ${frame.script.name} - ${frame.script.fileName}:${frame.script.lineNumber(frame.pc)}`);
                    }
                }
            }
            console.error(`script error: ${err.message}`);
            console.error(`file: ${q.basename(state.script.info.sourceFilePath)}`);
            console.error('');
            console.error('stack backtrace:');
            console.error(`    1: ${state.script.name} - ${state.script.fileName}:${state.script.lineNumber(state.pc)}`);
            let trace = 1;
            for (let i = state.fp; i > 0; i--) {
                const frame = state.frames[i];
                if (frame) {
                    trace++;
                    console.error(`    ${trace}: ${frame.script.name} - ${frame.script.fileName}:${frame.script.lineNumber(frame.pc)}`);
                }
            }
            for (let i = state.debugFp; i >= 0; i--) {
                const frame = state.debugFrames[i];
                if (frame) {
                    trace++;
                    console.error(`    ${trace}: ${frame.script.name} - ${frame.script.fileName}:${frame.script.lineNumber(frame.pc)}`);
                }
            }
            state.execution = ScriptState.ABORTED;
        }
        return state.execution;
    }
    static executeInner(state, opcode) {
        const handler = ScriptRunner2.HANDLERS[opcode];
        if (!handler) {
            throw new Error(`Unknown opcode ${opcode}`);
        }
        handler(state);
    }
}

// src/lostcity/entity/Npc.ts
class Npc2 extends PathingEntity {
    static ANIM = 2;
    static FACE_ENTITY = 4;
    static SAY = 8;
    static DAMAGE = 16;
    static CHANGE_TYPE = 32;
    static SPOTANIM = 64;
    static FACE_COORD = 128;
    nid;
    type;
    uid;
    origType;
    startX;
    startZ;
    levels = new Uint8Array(6);
    baseLevels = new Uint8Array(6);
    vars;
    varsString;
    activeScript = null;
    delay = 0;
    queue = new LinkList();
    timerInterval = 0;
    timerClock = 0;
    huntMode = -1;
    nextHuntTick = -1;
    huntrange = 5;
    nextPatrolTick = -1;
    nextPatrolPoint = 0;
    delayedPatrol = false;
    heroPoints = new Array(16);
    constructor(level, x, z2, width, length, lifecycle, nid, type, moveRestrict, blockWalk) {
        super(level, x, z2, width, length, lifecycle, moveRestrict, blockWalk, MoveStrategy_default.NAIVE, Npc2.FACE_COORD, Npc2.FACE_ENTITY);
        this.nid = nid;
        this.type = type;
        this.uid = (type << 16) | nid;
        this.startX = this.x;
        this.startZ = this.z;
        this.origType = type;
        const npcType = NpcType.get(type);
        for (let index = 0; index < npcType.stats.length; index++) {
            const level2 = npcType.stats[index];
            this.levels[index] = level2;
            this.baseLevels[index] = level2;
        }
        if (npcType.timer !== -1) {
            this.setTimer(npcType.timer);
        }
        this.vars = new Int32Array(VarNpcType.count);
        this.varsString = new Array(VarNpcType.count);
        this.targetOp = npcType.defaultmode;
        this.huntMode = npcType.huntmode;
        this.huntrange = npcType.huntrange;
    }
    resetHeroPoints() {
        this.heroPoints = new Array(16);
        this.heroPoints.fill({uid: -1, points: 0});
    }
    addHero(uid, points) {
        const index = this.heroPoints.findIndex(hero => hero && hero.uid === uid);
        if (index !== -1) {
            this.heroPoints[index].points += points;
            return;
        }
        const emptyIndex = this.heroPoints.findIndex(hero => hero && hero.uid === -1);
        if (emptyIndex !== -1) {
            this.heroPoints[emptyIndex] = {uid, points};
            return;
        }
    }
    findHero() {
        this.heroPoints.sort((a, b2) => {
            return b2.points - a.points;
        });
        return this.heroPoints[0]?.uid ?? -1;
    }
    getVar(id) {
        const varn = VarNpcType.get(id);
        return varn.type === ScriptVarType.STRING ? this.varsString[varn.id] : this.vars[varn.id];
    }
    setVar(id, value) {
        const varn = VarNpcType.get(id);
        if (varn.type === ScriptVarType.STRING && typeof value === 'string') {
            this.varsString[varn.id] = value;
        } else if (typeof value === 'number') {
            this.vars[varn.id] = value;
        }
    }
    resetEntity(respawn) {
        if (respawn) {
            this.type = this.origType;
            this.uid = (this.type << 16) | this.nid;
            this.orientation = Direction.SOUTH;
            for (let index = 0; index < this.baseLevels.length; index++) {
                this.levels[index] = this.baseLevels[index];
            }
            this.resetHeroPoints();
            this.defaultMode();
            const npcType = NpcType.get(this.type);
            this.huntrange = npcType.huntrange;
        }
        super.resetPathingEntity();
    }
    updateMovement(repathAllowed = true) {
        const type = NpcType.get(this.type);
        if (type.moverestrict === MoveRestrict_default.NOMOVE) {
            return false;
        }
        if (this.target && this.targetOp !== NpcMode_default.PLAYERFOLLOW) {
            const distanceToEscape = Position.distanceTo(this, {
                x: this.startX,
                z: this.startZ,
                width: this.width,
                length: this.length
            });
            const targetDistanceFromStart = Position.distanceTo(this.target, {
                x: this.startX,
                z: this.startZ,
                width: this.target.width,
                length: this.target.length
            });
            if (targetDistanceFromStart > type.maxrange && distanceToEscape > type.maxrange) {
                return false;
            }
        }
        if (repathAllowed && this.target instanceof PathingEntity && !this.interacted && this.walktrigger === -1) {
            this.pathToPathingTarget();
        }
        if (this.walktrigger !== -1) {
            const type2 = NpcType.get(this.type);
            const script = ScriptProvider.getByTrigger(ServerTriggerType_default.AI_QUEUE1 + this.walktrigger, type2.id, type2.category);
            this.walktrigger = -1;
            if (script) {
                const state = ScriptRunner2.init(script, this, null, [this.walktriggerArg]);
                ScriptRunner2.execute(state);
            }
        }
        if (this.moveSpeed !== MoveSpeed_default.INSTANT) {
            this.moveSpeed = this.defaultMoveSpeed();
        }
        return super.processMovement();
    }
    blockWalkFlag() {
        if (this.moveRestrict === MoveRestrict_default.NORMAL) {
            return CollisionFlag.NPC;
        } else if (this.moveRestrict === MoveRestrict_default.BLOCKED) {
            return CollisionFlag.OPEN;
        } else if (this.moveRestrict === MoveRestrict_default.BLOCKED_NORMAL) {
            return CollisionFlag.NPC;
        } else if (this.moveRestrict === MoveRestrict_default.INDOORS) {
            return CollisionFlag.NPC;
        } else if (this.moveRestrict === MoveRestrict_default.OUTDOORS) {
            return CollisionFlag.NPC;
        } else if (this.moveRestrict === MoveRestrict_default.NOMOVE) {
            return CollisionFlag.NULL;
        } else if (this.moveRestrict === MoveRestrict_default.PASSTHRU) {
            return CollisionFlag.OPEN;
        }
        return CollisionFlag.NULL;
    }
    defaultMoveSpeed() {
        return MoveSpeed_default.WALK;
    }
    delayed() {
        return this.delay > 0;
    }
    setTimer(interval) {
        this.timerInterval = interval;
    }
    executeScript(script) {
        if (!script) {
            return;
        }
        const state = ScriptRunner2.execute(script);
        if (state !== ScriptState.FINISHED && state !== ScriptState.ABORTED) {
            if (state === ScriptState.WORLD_SUSPENDED) {
                World_default.enqueueScript(script, script.popInt());
            } else if (state === ScriptState.NPC_SUSPENDED) {
                script.activeNpc.activeScript = script;
            } else {
                script.activePlayer.activeScript = script;
            }
        } else if (script === this.activeScript) {
            this.activeScript = null;
        }
        if (script.pointerGet(ScriptPointer_default.ProtectedActivePlayer) && script._activePlayer) {
            script._activePlayer.protect = false;
            script.pointerRemove(ScriptPointer_default.ProtectedActivePlayer);
        }
        if (script.pointerGet(ScriptPointer_default.ProtectedActivePlayer2) && script._activePlayer2) {
            script._activePlayer2.protect = false;
            script.pointerRemove(ScriptPointer_default.ProtectedActivePlayer2);
        }
    }
    processTimers() {
        if (this.timerInterval !== 0 && ++this.timerClock >= this.timerInterval) {
            this.timerClock = 0;
            const type = NpcType.get(this.type);
            const script = ScriptProvider.getByTrigger(ServerTriggerType_default.AI_TIMER, type.id, type.category);
            if (script) {
                this.executeScript(ScriptRunner2.init(script, this));
            }
        }
    }
    processQueue() {
        for (let request = this.queue.head(); request !== null; request = this.queue.next()) {
            if (!this.delayed()) {
                request.delay--;
            }
            if (!this.delayed() && request.delay <= 0) {
                const state = ScriptRunner2.init(request.script, this, null, request.args);
                state.lastInt = request.lastInt;
                this.executeScript(state);
                request.unlink();
            }
        }
    }
    enqueueScript(script, delay = 0, arg = 0) {
        const request = new EntityQueueRequest(0 /* NORMAL */, script, [], delay);
        request.lastInt = arg;
        this.queue.addTail(request);
    }
    randomWalk(range) {
        const dx = Math.round(Math.random() * (range * 2) - range);
        const dz = Math.round(Math.random() * (range * 2) - range);
        const destX = this.startX + dx;
        const destZ = this.startZ + dz;
        if (destX !== this.x || destZ !== this.z) {
            this.queueWaypoint(destX, destZ);
        }
    }
    processNpcModes() {
        if (this.targetOp === NpcMode_default.NULL) {
            this.defaultMode();
        } else if (this.targetOp === NpcMode_default.NONE) {
            this.noMode();
        } else if (this.targetOp === NpcMode_default.WANDER) {
            this.wanderMode();
        } else if (this.targetOp === NpcMode_default.PATROL) {
            this.patrolMode();
        } else if (this.targetOp === NpcMode_default.PLAYERESCAPE) {
            this.playerEscapeMode();
        } else if (this.targetOp === NpcMode_default.PLAYERFOLLOW) {
            this.playerFollowMode();
        } else if (this.targetOp === NpcMode_default.PLAYERFACE) {
            this.playerFaceMode();
        } else if (this.targetOp === NpcMode_default.PLAYERFACECLOSE) {
            this.playerFaceCloseMode();
        } else {
            this.aiMode();
        }
    }
    noMode() {
        this.clearInteraction();
        this.updateMovement(false);
        this.targetOp = NpcMode_default.NONE;
        this.faceEntity = -1;
        this.mask |= Npc2.FACE_ENTITY;
    }
    defaultMode() {
        this.clearInteraction();
        this.updateMovement(false);
        const type = NpcType.get(this.type);
        this.targetOp = type.defaultmode;
        this.faceEntity = -1;
        this.mask |= Npc2.FACE_ENTITY;
    }
    wanderMode() {
        const type = NpcType.get(this.type);
        if (type.moverestrict !== MoveRestrict_default.NOMOVE && Math.random() < 0.125) {
            this.randomWalk(type.wanderrange);
        }
        this.updateMovement(false);
    }
    patrolMode() {
        const type = NpcType.get(this.type);
        const patrolPoints = type.patrolCoord;
        const patrolDelay = type.patrolDelay[this.nextPatrolPoint];
        let dest = Position.unpackCoord(patrolPoints[this.nextPatrolPoint]);
        this.updateMovement(false);
        if (!this.hasWaypoints() && !this.target) {
            this.queueWaypoint(dest.x, dest.z);
        }
        if (!(this.x === dest.x && this.z === dest.z) && World_default.currentTick >= this.nextPatrolTick) {
            this.teleport(dest.x, dest.z, dest.level);
        }
        if (this.x === dest.x && this.z === dest.z && !this.delayedPatrol) {
            this.nextPatrolTick = World_default.currentTick + patrolDelay;
            this.delayedPatrol = true;
        }
        if (this.nextPatrolTick > World_default.currentTick) {
            return;
        }
        this.nextPatrolPoint = (this.nextPatrolPoint + 1) % patrolPoints.length;
        this.nextPatrolTick = World_default.currentTick + 30;
        this.delayedPatrol = false;
        dest = Position.unpackCoord(patrolPoints[this.nextPatrolPoint]);
        this.queueWaypoint(dest.x, dest.z);
    }
    playerEscapeMode() {
        if (!this.target) {
            this.defaultMode();
            return;
        }
        if (!(this.target instanceof Player2)) {
            throw new Error('[Npc] Target must be a Player for playerescape mode.');
        }
        if (World_default.getPlayerByUid(this.target.uid) === null) {
            this.defaultMode();
            return;
        }
        if (Position.distanceToSW(this, this.target) > 25) {
            this.defaultMode();
            return;
        }
        let direction;
        let flags;
        if (this.target.x >= this.x && this.target.z >= this.z) {
            direction = Direction.SOUTH_WEST;
            flags = CollisionFlag.WALL_SOUTH | CollisionFlag.WALL_WEST;
        } else if (this.target.x >= this.x && this.target.z < this.z) {
            direction = Direction.NORTH_WEST;
            flags = CollisionFlag.WALL_NORTH | CollisionFlag.WALL_WEST;
        } else if (this.target.x < this.x && this.target.z >= this.z) {
            direction = Direction.SOUTH_EAST;
            flags = CollisionFlag.WALL_SOUTH | CollisionFlag.WALL_EAST;
        } else {
            direction = Direction.NORTH_EAST;
            flags = CollisionFlag.WALL_NORTH | CollisionFlag.WALL_EAST;
        }
        const mx = Position.moveX(this.x, direction);
        const mz = Position.moveZ(this.z, direction);
        if (isFlagged(mx, mz, this.level, flags)) {
            this.defaultMode();
            return;
        }
        const position = {x: mx, z: mz, level: this.level};
        if (
            Position.distanceToSW(position, {
                x: this.startX,
                z: this.startZ
            }) < NpcType.get(this.type).maxrange
        ) {
            this.queueWaypoint(position.x, position.z);
            this.updateMovement(false);
            return;
        }
        if (direction === Direction.NORTH_EAST || direction === Direction.NORTH_WEST) {
            this.queueWaypoint(this.x, position.z);
        } else {
            this.queueWaypoint(position.x, this.z);
        }
        this.updateMovement(false);
    }
    playerFollowMode() {
        if (!this.target) {
            this.defaultMode();
            return;
        }
        if (!(this.target instanceof Player2)) {
            throw new Error('[Npc] Target must be a Player for playerfollow mode.');
        }
        if (World_default.getPlayerByUid(this.target.uid) === null) {
            this.defaultMode();
            return;
        }
        if (this.level !== this.target.level) {
            this.defaultMode();
            return;
        }
        this.pathToTarget();
        this.updateMovement();
    }
    playerFaceMode() {
        if (!this.target) {
            this.defaultMode();
            return;
        }
        if (!(this.target instanceof Player2)) {
            throw new Error('[Npc] Target must be a Player for playerface mode.');
        }
        if (World_default.getPlayerByUid(this.target.uid) === null) {
            this.defaultMode();
            return;
        }
        if (this.level !== this.target.level) {
            this.defaultMode();
            return;
        }
        const type = NpcType.get(this.type);
        if (Position.distanceTo(this, this.target) > type.maxrange) {
            this.defaultMode();
            return;
        }
        this.updateMovement(false);
    }
    playerFaceCloseMode() {
        if (!this.target) {
            this.defaultMode();
            return;
        }
        if (!(this.target instanceof Player2)) {
            throw new Error('[Npc] Target must be a Player for playerfaceclose mode.');
        }
        if (World_default.getPlayerByUid(this.target.uid) == null) {
            this.defaultMode();
            return;
        }
        if (this.level !== this.target.level) {
            this.defaultMode();
            return;
        }
        if (Position.distanceTo(this, this.target) > 1) {
            this.defaultMode();
            return;
        }
        this.updateMovement(false);
    }
    aiMode() {
        if (this.delayed() || !this.target) {
            this.defaultMode();
            return;
        }
        if (this.target.level !== this.level) {
            this.defaultMode();
            return;
        }
        if (this.target instanceof Npc2 && (World_default.getNpc(this.target.nid) === null || this.target.delayed())) {
            this.defaultMode();
            return;
        }
        if (this.target instanceof Npc2 && this.targetSubject.type !== -1 && World_default.getNpcByUid((this.targetSubject.type << 16) | this.target.nid) === null) {
            this.defaultMode();
            return;
        }
        if (this.target instanceof Obj && World_default.getObj(this.target.x, this.target.z, this.level, this.target.type, -1) === null) {
            this.defaultMode();
            return;
        }
        if (this.target instanceof Loc && World_default.getLoc(this.target.x, this.target.z, this.level, this.target.type) === null) {
            this.defaultMode();
            return;
        }
        if (this.target instanceof Player2 && World_default.getPlayerByUid(this.target.uid) === null) {
            this.defaultMode();
            return;
        }
        const type = NpcType.get(this.type);
        if (Position.distanceTo(this, this.target) > type.attackrange) {
            this.defaultMode();
            return;
        }
        const apTrigger =
            (this.targetOp >= NpcMode_default.APNPC1 && this.targetOp <= NpcMode_default.APNPC5) ||
            (this.targetOp >= NpcMode_default.APPLAYER1 && this.targetOp <= NpcMode_default.APPLAYER5) ||
            (this.targetOp >= NpcMode_default.APLOC1 && this.targetOp <= NpcMode_default.APLOC5) ||
            (this.targetOp >= NpcMode_default.APOBJ1 && this.targetOp <= NpcMode_default.APOBJ5);
        const opTrigger = !apTrigger;
        const script = this.getTrigger();
        if (script && opTrigger && this.inOperableDistance(this.target) && this.target instanceof PathingEntity) {
            this.executeScript(ScriptRunner2.init(script, this, this.target));
            this.interacted = true;
            this.clearWaypoints();
        } else if (script && apTrigger && this.inApproachDistance(type.attackrange, this.target)) {
            this.executeScript(ScriptRunner2.init(script, this, this.target));
            this.interacted = true;
            this.clearWaypoints();
        } else if (this.inOperableDistance(this.target) && this.target instanceof PathingEntity) {
            this.target = null;
            this.interacted = true;
            this.clearWaypoints();
        }
        const moved = this.updateMovement();
        if (moved) {
            this.alreadyFacedEntity = false;
            this.alreadyFacedCoord = false;
        }
        if (this.target && !this.interacted) {
            this.interacted = false;
            if (script && opTrigger && this.inOperableDistance(this.target) && (this.target instanceof PathingEntity || !moved)) {
                this.executeScript(ScriptRunner2.init(script, this, this.target));
                this.interacted = true;
                this.clearWaypoints();
            } else if (script && apTrigger && this.inApproachDistance(type.attackrange, this.target)) {
                this.executeScript(ScriptRunner2.init(script, this, this.target));
                this.interacted = true;
                this.clearWaypoints();
            } else if (this.inOperableDistance(this.target) && (this.target instanceof PathingEntity || !moved)) {
                this.target = null;
                this.interacted = true;
                this.clearWaypoints();
            }
        }
    }
    getTrigger() {
        const trigger = this.getTriggerForMode(this.targetOp);
        if (trigger) {
            return ScriptProvider.getByTrigger(trigger, this.type, -1) ?? null;
        }
        return null;
    }
    getTriggerForMode(mode) {
        if (mode === NpcMode_default.OPPLAYER1) {
            return ServerTriggerType_default.AI_OPPLAYER1;
        } else if (mode === NpcMode_default.OPPLAYER2) {
            return ServerTriggerType_default.AI_OPPLAYER2;
        } else if (mode === NpcMode_default.OPPLAYER3) {
            return ServerTriggerType_default.AI_OPPLAYER3;
        } else if (mode === NpcMode_default.OPPLAYER4) {
            return ServerTriggerType_default.AI_OPPLAYER4;
        } else if (mode === NpcMode_default.OPPLAYER5) {
            return ServerTriggerType_default.AI_OPPLAYER5;
        } else if (mode === NpcMode_default.APPLAYER1) {
            return ServerTriggerType_default.AI_APPLAYER1;
        } else if (mode === NpcMode_default.APPLAYER2) {
            return ServerTriggerType_default.AI_APPLAYER2;
        } else if (mode === NpcMode_default.APPLAYER3) {
            return ServerTriggerType_default.AI_APPLAYER3;
        } else if (mode === NpcMode_default.APPLAYER4) {
            return ServerTriggerType_default.AI_APPLAYER4;
        } else if (mode === NpcMode_default.APPLAYER5) {
            return ServerTriggerType_default.AI_APPLAYER5;
        } else if (mode === NpcMode_default.OPLOC1) {
            return ServerTriggerType_default.AI_OPLOC1;
        } else if (mode === NpcMode_default.OPLOC2) {
            return ServerTriggerType_default.AI_OPLOC2;
        } else if (mode === NpcMode_default.OPLOC3) {
            return ServerTriggerType_default.AI_OPLOC3;
        } else if (mode === NpcMode_default.OPLOC4) {
            return ServerTriggerType_default.AI_OPLOC4;
        } else if (mode === NpcMode_default.OPLOC5) {
            return ServerTriggerType_default.AI_OPLOC5;
        } else if (mode === NpcMode_default.APLOC1) {
            return ServerTriggerType_default.AI_APLOC1;
        } else if (mode === NpcMode_default.APLOC2) {
            return ServerTriggerType_default.AI_APLOC2;
        } else if (mode === NpcMode_default.APLOC3) {
            return ServerTriggerType_default.AI_APLOC3;
        } else if (mode === NpcMode_default.APLOC4) {
            return ServerTriggerType_default.AI_APLOC4;
        } else if (mode === NpcMode_default.APLOC5) {
            return ServerTriggerType_default.AI_APLOC5;
        } else if (mode === NpcMode_default.OPOBJ1) {
            return ServerTriggerType_default.AI_OPOBJ1;
        } else if (mode === NpcMode_default.OPOBJ2) {
            return ServerTriggerType_default.AI_OPOBJ2;
        } else if (mode === NpcMode_default.OPOBJ3) {
            return ServerTriggerType_default.AI_OPOBJ3;
        } else if (mode === NpcMode_default.OPOBJ4) {
            return ServerTriggerType_default.AI_OPOBJ4;
        } else if (mode === NpcMode_default.OPOBJ5) {
            return ServerTriggerType_default.AI_OPOBJ5;
        } else if (mode === NpcMode_default.APOBJ1) {
            return ServerTriggerType_default.AI_APOBJ1;
        } else if (mode === NpcMode_default.APOBJ2) {
            return ServerTriggerType_default.AI_APOBJ2;
        } else if (mode === NpcMode_default.APOBJ3) {
            return ServerTriggerType_default.AI_APOBJ3;
        } else if (mode === NpcMode_default.APOBJ4) {
            return ServerTriggerType_default.AI_APOBJ4;
        } else if (mode === NpcMode_default.APOBJ5) {
            return ServerTriggerType_default.AI_APOBJ5;
        } else if (mode === NpcMode_default.OPNPC1) {
            return ServerTriggerType_default.AI_OPNPC1;
        } else if (mode === NpcMode_default.OPNPC2) {
            return ServerTriggerType_default.AI_OPNPC2;
        } else if (mode === NpcMode_default.OPNPC3) {
            return ServerTriggerType_default.AI_OPNPC3;
        } else if (mode === NpcMode_default.OPNPC4) {
            return ServerTriggerType_default.AI_OPNPC4;
        } else if (mode === NpcMode_default.OPNPC5) {
            return ServerTriggerType_default.AI_OPNPC5;
        } else if (mode === NpcMode_default.APNPC1) {
            return ServerTriggerType_default.AI_APNPC1;
        } else if (mode === NpcMode_default.APNPC2) {
            return ServerTriggerType_default.AI_APNPC2;
        } else if (mode === NpcMode_default.APNPC3) {
            return ServerTriggerType_default.AI_APNPC3;
        } else if (mode === NpcMode_default.APNPC4) {
            return ServerTriggerType_default.AI_APNPC4;
        } else if (mode === NpcMode_default.APNPC5) {
            return ServerTriggerType_default.AI_APNPC5;
        } else if (mode === NpcMode_default.QUEUE1) {
            return ServerTriggerType_default.AI_QUEUE1;
        } else if (mode === NpcMode_default.QUEUE2) {
            return ServerTriggerType_default.AI_QUEUE2;
        } else if (mode === NpcMode_default.QUEUE3) {
            return ServerTriggerType_default.AI_QUEUE3;
        } else if (mode === NpcMode_default.QUEUE4) {
            return ServerTriggerType_default.AI_QUEUE4;
        } else if (mode === NpcMode_default.QUEUE5) {
            return ServerTriggerType_default.AI_QUEUE5;
        } else if (mode === NpcMode_default.QUEUE6) {
            return ServerTriggerType_default.AI_QUEUE6;
        } else if (mode === NpcMode_default.QUEUE7) {
            return ServerTriggerType_default.AI_QUEUE7;
        } else if (mode === NpcMode_default.QUEUE8) {
            return ServerTriggerType_default.AI_QUEUE8;
        } else if (mode === NpcMode_default.QUEUE9) {
            return ServerTriggerType_default.AI_QUEUE9;
        } else if (mode === NpcMode_default.QUEUE10) {
            return ServerTriggerType_default.AI_QUEUE10;
        } else if (mode === NpcMode_default.QUEUE11) {
            return ServerTriggerType_default.AI_QUEUE11;
        } else if (mode === NpcMode_default.QUEUE12) {
            return ServerTriggerType_default.AI_QUEUE12;
        } else if (mode === NpcMode_default.QUEUE13) {
            return ServerTriggerType_default.AI_QUEUE13;
        } else if (mode === NpcMode_default.QUEUE14) {
            return ServerTriggerType_default.AI_QUEUE14;
        } else if (mode === NpcMode_default.QUEUE15) {
            return ServerTriggerType_default.AI_QUEUE15;
        } else if (mode === NpcMode_default.QUEUE16) {
            return ServerTriggerType_default.AI_QUEUE16;
        } else if (mode === NpcMode_default.QUEUE17) {
            return ServerTriggerType_default.AI_QUEUE17;
        } else if (mode === NpcMode_default.QUEUE18) {
            return ServerTriggerType_default.AI_QUEUE18;
        } else if (mode === NpcMode_default.QUEUE19) {
            return ServerTriggerType_default.AI_QUEUE19;
        } else if (mode === NpcMode_default.QUEUE20) {
            return ServerTriggerType_default.AI_QUEUE20;
        }
        return null;
    }
    huntAll() {
        if (this.nextHuntTick > World_default.currentTick) {
            return;
        }
        const hunt = HuntType.get(this.huntMode);
        if (hunt.type === HuntModeType_default.OFF) {
            return;
        }
        if (hunt.nobodyNear === HuntNobodyNear_default.PAUSEHUNT && !World_default.getZoneGrid(this.level).isFlagged(Position.zone(this.x), Position.zone(this.z), 5)) {
            return;
        }
        if (!hunt.findKeepHunting && this.target !== null) {
            return;
        }
        let hunted;
        if (hunt.type === HuntModeType_default.PLAYER) {
            hunted = this.huntPlayers(hunt);
        } else if (hunt.type === HuntModeType_default.NPC) {
            hunted = this.huntNpcs(hunt);
        } else if (hunt.type === HuntModeType_default.OBJ) {
            hunted = this.huntObjs(hunt);
        } else {
            hunted = this.huntLocs(hunt);
        }
        if (hunted.length > 0) {
            const entity = hunted[Math.floor(Math.random() * hunted.length)];
            this.setInteraction(Interaction_default.SCRIPT, entity, hunt.findNewMode);
        }
        this.nextHuntTick = World_default.currentTick + hunt.rate;
    }
    huntPlayers(hunt) {
        const type = NpcType.get(this.type);
        const players = [];
        const hunted = new HuntIterator(World_default.currentTick, this.level, this.x, this.z, this.huntrange, hunt.checkVis, -1, -1, HuntModeType_default.PLAYER);
        for (const player of hunted) {
            if (!(player instanceof Player2)) {
                throw new Error('[Npc] huntAll must be of type Player here.');
            }
            if (hunt.checkAfk && player.zonesAfk()) {
                continue;
            }
            if (hunt.checkNotTooStrong === HuntCheckNotTooStrong_default.OUTSIDE_WILDERNESS && !player.isInWilderness() && player.combatLevel > type.vislevel * 2) {
                continue;
            }
            if (hunt.checkNotCombat !== -1 && player.getVar(hunt.checkNotCombat) + 8 > World_default.currentTick) {
                continue;
            } else if (hunt.checkNotCombatSelf !== -1 && this.getVar(hunt.checkNotCombatSelf) >= World_default.currentTick) {
                continue;
            }
            if (hunt.checkInv !== -1) {
                let quantity = 0;
                if (hunt.checkObj !== -1) {
                    quantity = player.invTotal(hunt.checkInv, hunt.checkObj);
                } else if (hunt.checkObjParam !== -1) {
                    quantity = player.invTotalParam(hunt.checkInv, hunt.checkObjParam);
                }
                if (quantity < hunt.checkInvMinQuantity || quantity > hunt.checkInvMaxQuantity) {
                    continue;
                }
            }
            if (hunt.checkNotBusy && player.busy()) {
                continue;
            }
            players.push(player);
        }
        return players;
    }
    huntNpcs(hunt) {
        return Array.from(new HuntIterator(World_default.currentTick, this.level, this.x, this.z, this.huntrange, hunt.checkVis, hunt.checkNpc, hunt.checkCategory, HuntModeType_default.NPC));
    }
    huntObjs(hunt) {
        return Array.from(new HuntIterator(World_default.currentTick, this.level, this.x, this.z, this.huntrange, hunt.checkVis, hunt.checkObj, hunt.checkCategory, HuntModeType_default.OBJ));
    }
    huntLocs(hunt) {
        return Array.from(new HuntIterator(World_default.currentTick, this.level, this.x, this.z, this.huntrange, hunt.checkVis, hunt.checkLoc, hunt.checkCategory, HuntModeType_default.SCENERY));
    }
    playAnimation(seq, delay) {
        this.animId = seq;
        this.animDelay = delay;
        this.mask |= Npc2.ANIM;
    }
    spotanim(spotanim, height, delay) {
        this.graphicId = spotanim;
        this.graphicHeight = height;
        this.graphicDelay = delay;
        this.mask |= Npc2.SPOTANIM;
    }
    applyDamage(damage, type) {
        this.damageTaken = damage;
        this.damageType = type;
        const current = this.levels[NpcStat_default.HITPOINTS];
        if (current - damage <= 0) {
            this.levels[NpcStat_default.HITPOINTS] = 0;
            this.damageTaken = current;
        } else {
            this.levels[NpcStat_default.HITPOINTS] = current - damage;
        }
        this.mask |= Npc2.DAMAGE;
    }
    say(text) {
        if (!text) {
            return;
        }
        this.chat = text;
        this.mask |= Npc2.SAY;
    }
    faceSquare(x, z2) {
        this.faceX = x * 2 + 1;
        this.faceZ = z2 * 2 + 1;
        this.orientation = Position.face(this.x, this.z, x, z2);
        this.mask |= Npc2.FACE_COORD;
    }
    changeType(type) {
        this.type = type;
        this.mask |= Npc2.CHANGE_TYPE;
        this.uid = (type << 16) | this.nid;
    }
}

// src/lostcity/engine/GameMap.ts
class GameMap {
    async init(zoneMap) {
        console.time('Loading game map');
        const path = 'data/pack/server/maps/';
        const maps = [
            'm29_75',
            'm30_75',
            'm31_75',
            'm32_70',
            'm32_71',
            'm32_72',
            'm32_73',
            'm32_74',
            'm32_75',
            'm33_70',
            'm33_71',
            'm33_72',
            'm33_73',
            'm33_74',
            'm33_75',
            'm33_76',
            'm34_70',
            'm34_71',
            'm34_72',
            'm34_73',
            'm34_74',
            'm34_75',
            'm34_76',
            'm35_20',
            'm35_75',
            'm35_76',
            'm36_146',
            'm36_147',
            'm36_148',
            'm36_149',
            'm36_150',
            'm36_153',
            'm36_154',
            'm36_52',
            'm36_53',
            'm36_54',
            'm36_72',
            'm36_73',
            'm36_74',
            'm36_75',
            'm36_76',
            'm37_146',
            'm37_147',
            'm37_148',
            'm37_149',
            'm37_150',
            'm37_151',
            'm37_152',
            'm37_153',
            'm37_154',
            'm37_48',
            'm37_49',
            'm37_50',
            'm37_51',
            'm37_52',
            'm37_53',
            'm37_54',
            'm37_55',
            'm37_72',
            'm37_73',
            'm37_74',
            'm37_75',
            'm38_146',
            'm38_147',
            'm38_148',
            'm38_149',
            'm38_150',
            'm38_151',
            'm38_152',
            'm38_153',
            'm38_154',
            'm38_155',
            'm38_45',
            'm38_46',
            'm38_47',
            'm38_48',
            'm38_49',
            'm38_50',
            'm38_51',
            'm38_52',
            'm38_53',
            'm38_54',
            'm38_55',
            'm38_72',
            'm38_73',
            'm38_74',
            'm39_147',
            'm39_148',
            'm39_149',
            'm39_150',
            'm39_151',
            'm39_152',
            'm39_153',
            'm39_154',
            'm39_155',
            'm39_45',
            'm39_46',
            'm39_47',
            'm39_48',
            'm39_49',
            'm39_50',
            'm39_51',
            'm39_52',
            'm39_53',
            'm39_54',
            'm39_55',
            'm39_72',
            'm39_73',
            'm39_74',
            'm39_75',
            'm39_76',
            'm40_147',
            'm40_148',
            'm40_149',
            'm40_150',
            'm40_151',
            'm40_152',
            'm40_153',
            'm40_154',
            'm40_45',
            'm40_46',
            'm40_47',
            'm40_48',
            'm40_49',
            'm40_50',
            'm40_51',
            'm40_52',
            'm40_53',
            'm40_54',
            'm40_55',
            'm40_72',
            'm40_73',
            'm40_74',
            'm40_75',
            'm40_76',
            'm41_146',
            'm41_149',
            'm41_151',
            'm41_152',
            'm41_153',
            'm41_154',
            'm41_45',
            'm41_46',
            'm41_47',
            'm41_48',
            'm41_49',
            'm41_50',
            'm41_51',
            'm41_52',
            'm41_53',
            'm41_54',
            'm41_55',
            'm41_56',
            'm41_72',
            'm41_73',
            'm41_74',
            'm41_75',
            'm42_144',
            'm42_145',
            'm42_146',
            'm42_151',
            'm42_152',
            'm42_153',
            'm42_49',
            'm42_50',
            'm42_51',
            'm42_52',
            'm42_53',
            'm42_54',
            'm42_55',
            'm42_56',
            'm42_72',
            'm42_73',
            'm42_74',
            'm42_75',
            'm43_144',
            'm43_145',
            'm43_146',
            'm43_153',
            'm43_154',
            'm43_45',
            'm43_46',
            'm43_47',
            'm43_48',
            'm43_49',
            'm43_50',
            'm43_51',
            'm43_52',
            'm43_53',
            'm43_54',
            'm43_55',
            'm43_56',
            'm43_72',
            'm43_73',
            'm43_74',
            'm43_75',
            'm44_144',
            'm44_145',
            'm44_146',
            'm44_148',
            'm44_149',
            'm44_150',
            'm44_151',
            'm44_152',
            'm44_153',
            'm44_154',
            'm44_155',
            'm44_45',
            'm44_46',
            'm44_47',
            'm44_48',
            'm44_49',
            'm44_50',
            'm44_51',
            'm44_52',
            'm44_53',
            'm44_54',
            'm44_55',
            'm44_72',
            'm44_73',
            'm44_74',
            'm44_75',
            'm45_145',
            'm45_146',
            'm45_148',
            'm45_150',
            'm45_151',
            'm45_152',
            'm45_153',
            'm45_154',
            'm45_155',
            'm45_45',
            'm45_46',
            'm45_47',
            'm45_48',
            'm45_49',
            'm45_50',
            'm45_51',
            'm45_52',
            'm45_53',
            'm45_54',
            'm45_55',
            'm45_56',
            'm45_57',
            'm45_58',
            'm45_59',
            'm45_60',
            'm45_61',
            'm45_62',
            'm45_73',
            'm45_74',
            'm45_75',
            'm45_76',
            'm46_149',
            'm46_150',
            'm46_152',
            'm46_153',
            'm46_154',
            'm46_161',
            'm46_45',
            'm46_46',
            'm46_47',
            'm46_48',
            'm46_49',
            'm46_50',
            'm46_51',
            'm46_52',
            'm46_53',
            'm46_54',
            'm46_55',
            'm46_56',
            'm46_57',
            'm46_58',
            'm46_59',
            'm46_60',
            'm46_61',
            'm46_62',
            'm46_75',
            'm47_148',
            'm47_149',
            'm47_150',
            'm47_152',
            'm47_153',
            'm47_160',
            'm47_161',
            'm47_47',
            'm47_48',
            'm47_49',
            'm47_50',
            'm47_51',
            'm47_52',
            'm47_53',
            'm47_54',
            'm47_55',
            'm47_56',
            'm47_57',
            'm47_58',
            'm47_59',
            'm47_60',
            'm47_61',
            'm47_62',
            'm47_75',
            'm48_148',
            'm48_149',
            'm48_152',
            'm48_153',
            'm48_154',
            'm48_155',
            'm48_156',
            'm48_47',
            'm48_48',
            'm48_49',
            'm48_50',
            'm48_51',
            'm48_52',
            'm48_53',
            'm48_54',
            'm48_55',
            'm48_56',
            'm48_57',
            'm48_58',
            'm48_59',
            'm48_60',
            'm48_61',
            'm48_62',
            'm49_148',
            'm49_149',
            'm49_153',
            'm49_154',
            'm49_155',
            'm49_156',
            'm49_46',
            'm49_47',
            'm49_48',
            'm49_49',
            'm49_50',
            'm49_51',
            'm49_52',
            'm49_53',
            'm49_54',
            'm49_55',
            'm49_56',
            'm49_57',
            'm49_58',
            'm49_59',
            'm49_60',
            'm49_61',
            'm49_62',
            'm50_149',
            'm50_150',
            'm50_152',
            'm50_153',
            'm50_154',
            'm50_46',
            'm50_47',
            'm50_48',
            'm50_49',
            'm50_50',
            'm50_51',
            'm50_52',
            'm50_53',
            'm50_54',
            'm50_55',
            'm50_56',
            'm50_57',
            'm50_58',
            'm50_59',
            'm50_60',
            'm50_61',
            'm50_62',
            'm51_147',
            'm51_154',
            'm51_46',
            'm51_47',
            'm51_48',
            'm51_49',
            'm51_50',
            'm51_51',
            'm51_52',
            'm51_53',
            'm51_54',
            'm51_55',
            'm51_56',
            'm51_57',
            'm51_58',
            'm51_59',
            'm51_60',
            'm51_61',
            'm51_62',
            'm52_152',
            'm52_153',
            'm52_154',
            'm52_46',
            'm52_47',
            'm52_48',
            'm52_49',
            'm52_50',
            'm52_51',
            'm52_52',
            'm52_53',
            'm52_54',
            'm52_55',
            'm52_56',
            'm52_57',
            'm52_58',
            'm52_59',
            'm52_60',
            'm52_61',
            'm52_62',
            'm53_49',
            'm53_50',
            'm53_51',
            'm53_52',
            'm53_53'
        ];
        for (let index = 0; index < maps.length; index++) {
            const [mx, mz] = maps[index].substring(1).split('_').map(Number);
            const mapsquareX = mx << 6;
            const mapsquareZ = mz << 6;
            this.decodeNpcs(await Packet.load(`${path}n${mx}_${mz}`), mapsquareX, mapsquareZ);
            this.decodeObjs(await Packet.load(`${path}o${mx}_${mz}`), mapsquareX, mapsquareZ, zoneMap);
            const lands = new Int8Array(4 * 64 * 64);
            this.decodeLands(lands, await Packet.load(`${path}m${mx}_${mz}`), mapsquareX, mapsquareZ);
            this.decodeLocs(lands, await Packet.load(`${path}l${mx}_${mz}`), mapsquareX, mapsquareZ, zoneMap);
        }
        console.timeEnd('Loading game map');
    }
    changeLandCollision(x, z2, level, add) {
        changeFloor(x, z2, level, add);
    }
    changeLocCollision(shape, angle, blockrange, length, width, active, x, z2, level, add) {
        const locLayer = locShapeLayer(shape);
        if (locLayer === LocLayer.WALL) {
            changeWall(x, z2, level, angle, shape, blockrange, false, add);
        } else if (locLayer === LocLayer.GROUND) {
            if (angle === LocAngle.NORTH || angle === LocAngle.SOUTH) {
                changeLoc(x, z2, level, length, width, blockrange, false, add);
            } else {
                changeLoc(x, z2, level, width, length, blockrange, false, add);
            }
        } else if (locLayer === LocLayer.GROUND_DECOR) {
            if (active === 1) {
                changeFloor(x, z2, level, add);
            }
        }
    }
    changeNpcCollision(size, x, z2, level, add) {
        changeNpc(x, z2, level, size, add);
    }
    changePlayerCollision(size, x, z2, level, add) {
        changePlayer(x, z2, level, size, add);
    }
    changeRoofCollision(x, z2, level, add) {
        changeRoof(x, z2, level, add);
    }
    decodeNpcs(packet, mapsquareX, mapsquareZ) {
        while (packet.available > 0) {
            const {x, z: z2, level} = this.unpackCoord(packet.g2());
            const absoluteX = mapsquareX + x;
            const absoluteZ = mapsquareZ + z2;
            const count = packet.g1();
            for (let index = 0; index < count; index++) {
                const npcType = NpcType.get(packet.g2());
                const size = npcType.size;
                const npc = new Npc2(level, absoluteX, absoluteZ, size, size, EntityLifeCycle_default.RESPAWN, World_default.getNextNid(), npcType.id, npcType.moverestrict, npcType.blockwalk);
                if (npcType.members && World_default.members) {
                    World_default.addNpc(npc, -1);
                } else if (!npcType.members) {
                    World_default.addNpc(npc, -1);
                }
            }
        }
    }
    decodeObjs(packet, mapsquareX, mapsquareZ, zoneMap) {
        while (packet.available > 0) {
            const {x, z: z2, level} = this.unpackCoord(packet.g2());
            const absoluteX = mapsquareX + x;
            const absoluteZ = mapsquareZ + z2;
            const count = packet.g1();
            for (let j = 0; j < count; j++) {
                const objType = ObjType.get(packet.g2());
                const obj = new Obj(level, absoluteX, absoluteZ, EntityLifeCycle_default.RESPAWN, objType.id, packet.g1());
                if (objType.members && World_default.members) {
                    zoneMap.zone(obj.x, obj.z, obj.level).addStaticObj(obj);
                } else if (!objType.members) {
                    zoneMap.zone(obj.x, obj.z, obj.level).addStaticObj(obj);
                }
            }
        }
    }
    decodeLands(lands, packet, mapsquareX, mapsquareZ) {
        for (let level = 0; level < 4; level++) {
            for (let x = 0; x < 64; x++) {
                for (let z2 = 0; z2 < 64; z2++) {
                    while (true) {
                        const opcode = packet.g1();
                        if (opcode === 0) {
                            break;
                        } else if (opcode === 1) {
                            packet.g1();
                            break;
                        }
                        if (opcode <= 49) {
                            packet.g1b();
                        } else if (opcode <= 81) {
                            lands[this.packCoord(x, z2, level)] = opcode - 49;
                        }
                    }
                }
            }
        }
        this.applyLandCollision(mapsquareX, mapsquareZ, lands);
    }
    applyLandCollision(mapsquareX, mapsquareZ, lands) {
        for (let level = 0; level < 4; level++) {
            for (let x = 0; x < 64; x++) {
                const absoluteX = x + mapsquareX;
                for (let z2 = 0; z2 < 64; z2++) {
                    const absoluteZ = z2 + mapsquareZ;
                    if (x % 7 === 0 && z2 % 7 === 0) {
                        allocateIfAbsent(absoluteX, absoluteZ, level);
                    }
                    const land = lands[this.packCoord(x, z2, level)];
                    if ((land & 4) !== 0) {
                        this.changeRoofCollision(absoluteX, absoluteZ, level, true);
                    }
                    if ((land & 1) !== 1) {
                        continue;
                    }
                    const bridged = (level === 1 ? land & 2 : lands[this.packCoord(x, z2, 1)] & 2) === 2;
                    const actualLevel = bridged ? level - 1 : level;
                    if (actualLevel < 0) {
                        continue;
                    }
                    this.changeLandCollision(absoluteX, absoluteZ, actualLevel, true);
                }
            }
        }
    }
    decodeLocs(lands, packet, mapsquareX, mapsquareZ, zoneMap) {
        let locId = -1;
        let locIdOffset = packet.gsmart();
        while (locIdOffset !== 0) {
            locId += locIdOffset;
            let coord = 0;
            let coordOffset = packet.gsmart();
            while (coordOffset !== 0) {
                const {x, z: z2, level} = this.unpackCoord((coord += coordOffset - 1));
                const info = packet.g1();
                coordOffset = packet.gsmart();
                const bridged = (level === 1 ? lands[coord] & 2 : lands[this.packCoord(x, z2, 1)] & 2) === 2;
                const actualLevel = bridged ? level - 1 : level;
                if (actualLevel < 0) {
                    continue;
                }
                const type = LocType.get(locId);
                const width = type.width;
                const length = type.length;
                const shape = info >> 2;
                const angle = info & 3;
                const absoluteX = x + mapsquareX;
                const absoluteZ = z2 + mapsquareZ;
                zoneMap.zone(absoluteX, absoluteZ, actualLevel).addStaticLoc(new Loc(actualLevel, absoluteX, absoluteZ, width, length, EntityLifeCycle_default.RESPAWN, locId, shape, angle));
                if (type.blockwalk) {
                    this.changeLocCollision(shape, angle, type.blockrange, length, width, type.active, absoluteX, absoluteZ, actualLevel, true);
                }
            }
            locIdOffset = packet.gsmart();
        }
    }
    packCoord(x, z2, level) {
        return (z2 & 63) | ((x & 63) << 6) | ((level & 3) << 12);
    }
    unpackCoord(packed) {
        const z2 = packed & 63;
        const x = (packed >> 6) & 63;
        const level = (packed >> 12) & 3;
        return {x, z: z2, level};
    }
}

// src/jagex2/io/Isaac.ts
class Isaac {
    count = 0;
    rsl = new Int32Array(256);
    mem = new Int32Array(256);
    a = 0;
    b = 0;
    c = 0;
    constructor(seed = [0, 0, 0, 0]) {
        for (let i = 0; i < seed.length; i++) {
            this.rsl[i] = seed[i];
        }
        this.init();
    }
    init() {
        let a = 2654435769,
            b2 = 2654435769,
            c = 2654435769,
            d = 2654435769,
            e = 2654435769,
            f = 2654435769,
            g = 2654435769,
            h2 = 2654435769;
        for (let i = 0; i < 4; i++) {
            a ^= b2 << 11;
            d += a;
            b2 += c;
            b2 ^= c >>> 2;
            e += b2;
            c += d;
            c ^= d << 8;
            f += c;
            d += e;
            d ^= e >>> 16;
            g += d;
            e += f;
            e ^= f << 10;
            h2 += e;
            f += g;
            f ^= g >>> 4;
            a += f;
            g += h2;
            g ^= h2 << 8;
            b2 += g;
            h2 += a;
            h2 ^= a >>> 9;
            c += h2;
            a += b2;
        }
        for (let i = 0; i < 256; i += 8) {
            a += this.rsl[i];
            b2 += this.rsl[i + 1];
            c += this.rsl[i + 2];
            d += this.rsl[i + 3];
            e += this.rsl[i + 4];
            f += this.rsl[i + 5];
            g += this.rsl[i + 6];
            h2 += this.rsl[i + 7];
            a ^= b2 << 11;
            d += a;
            b2 += c;
            b2 ^= c >>> 2;
            e += b2;
            c += d;
            c ^= d << 8;
            f += c;
            d += e;
            d ^= e >>> 16;
            g += d;
            e += f;
            e ^= f << 10;
            h2 += e;
            f += g;
            f ^= g >>> 4;
            a += f;
            g += h2;
            g ^= h2 << 8;
            b2 += g;
            h2 += a;
            h2 ^= a >>> 9;
            c += h2;
            a += b2;
            this.mem[i] = a;
            this.mem[i + 1] = b2;
            this.mem[i + 2] = c;
            this.mem[i + 3] = d;
            this.mem[i + 4] = e;
            this.mem[i + 5] = f;
            this.mem[i + 6] = g;
            this.mem[i + 7] = h2;
        }
        for (let i = 0; i < 256; i += 8) {
            a += this.mem[i];
            b2 += this.mem[i + 1];
            c += this.mem[i + 2];
            d += this.mem[i + 3];
            e += this.mem[i + 4];
            f += this.mem[i + 5];
            g += this.mem[i + 6];
            h2 += this.mem[i + 7];
            a ^= b2 << 11;
            d += a;
            b2 += c;
            b2 ^= c >>> 2;
            e += b2;
            c += d;
            c ^= d << 8;
            f += c;
            d += e;
            d ^= e >>> 16;
            g += d;
            e += f;
            e ^= f << 10;
            h2 += e;
            f += g;
            f ^= g >>> 4;
            a += f;
            g += h2;
            g ^= h2 << 8;
            b2 += g;
            h2 += a;
            h2 ^= a >>> 9;
            c += h2;
            a += b2;
            this.mem[i] = a;
            this.mem[i + 1] = b2;
            this.mem[i + 2] = c;
            this.mem[i + 3] = d;
            this.mem[i + 4] = e;
            this.mem[i + 5] = f;
            this.mem[i + 6] = g;
            this.mem[i + 7] = h2;
        }
        this.isaac();
        this.count = 256;
    }
    isaac() {
        this.c++;
        this.b += this.c;
        for (let i = 0; i < 256; i++) {
            const x = this.mem[i];
            switch (i & 3) {
                case 0:
                    this.a ^= this.a << 13;
                    break;
                case 1:
                    this.a ^= this.a >>> 6;
                    break;
                case 2:
                    this.a ^= this.a << 2;
                    break;
                case 3:
                    this.a ^= this.a >>> 16;
                    break;
            }
            this.a += this.mem[(i + 128) & 255];
            let y2;
            this.mem[i] = y2 = this.mem[(x >>> 2) & 255] + this.a + this.b;
            this.rsl[i] = this.b = this.mem[((y2 >>> 8) >>> 2) & 255] + x;
        }
    }
    nextInt() {
        if (this.count-- === 0) {
            this.isaac();
            this.count = 255;
        }
        return this.rsl[this.count];
    }
}

// src/lostcity/entity/PlayerLoading.ts
class PlayerLoading {
    static loadFromFile(name) {
        const name37 = toBase37(name);
        const safeName = fromBase37(name37);
        let save;
        if (fs.existsSync(`data/players/${safeName}.sav`)) {
            save = Packet.load(`data/players/${safeName}.sav`);
        } else {
            save = new Packet(new Uint8Array());
        }
        return PlayerLoading.load(name, save, null);
    }
    static load(name, sav, client) {
        const name37 = toBase37(name);
        const safeName = fromBase37(name37);
        const player = client ? new NetworkPlayer2(safeName, name37, client) : new Player2(safeName, name37);
        if (sav.data.length < 2) {
            for (let i = 0; i < 21; i++) {
                player.stats[i] = 0;
                player.baseLevels[i] = 1;
                player.levels[i] = 1;
            }
            player.stats[PlayerStat_default.HITPOINTS] = getExpByLevel(10);
            player.baseLevels[PlayerStat_default.HITPOINTS] = 10;
            player.levels[PlayerStat_default.HITPOINTS] = 10;
            return player;
        }
        if (sav.g2() !== 8196) {
            throw new Error('Invalid player save');
        }
        const version = sav.g2();
        if (version > 3) {
            throw new Error('Unsupported player save format');
        }
        sav.pos = sav.data.length - 4;
        const crc = sav.g4();
        if (crc != Packet.getcrc(sav.data, 0, sav.data.length - 4)) {
            throw new Error('Player save corrupted');
        }
        sav.pos = 4;
        player.x = sav.g2();
        player.z = sav.g2();
        player.level = sav.g1();
        for (let i = 0; i < 7; i++) {
            player.body[i] = sav.g1();
            if (player.body[i] === 255) {
                player.body[i] = -1;
            }
        }
        for (let i = 0; i < 5; i++) {
            player.colors[i] = sav.g1();
        }
        player.gender = sav.g1();
        player.runenergy = sav.g2();
        if (version >= 2) {
            player.playtime = sav.g4();
        } else {
            player.playtime = sav.g2();
        }
        for (let i = 0; i < 21; i++) {
            player.stats[i] = sav.g4();
            player.baseLevels[i] = getLevelByExp(player.stats[i]);
            player.levels[i] = sav.g1();
        }
        const varpCount = sav.g2();
        for (let i = 0; i < varpCount; i++) {
            player.vars[i] = sav.g4();
        }
        const invCount = sav.g1();
        for (let i = 0; i < invCount; i++) {
            const type = sav.g2();
            const inv = player.getInventory(type);
            if (inv) {
                for (let j = 0; j < inv.capacity; j++) {
                    const id = sav.g2();
                    if (id === 0) {
                        continue;
                    }
                    let count = sav.g1();
                    if (count === 255) {
                        count = sav.g4();
                    }
                    inv.set(j, {
                        id: id - 1,
                        count
                    });
                }
            }
        }
        if (version >= 3) {
            const afkZones = sav.g1();
            for (let index = 0; index < afkZones; index++) {
                player.afkZones[index] = sav.g4();
            }
            player.lastAfkZone = sav.g2();
        }
        player.combatLevel = player.getCombatLevel();
        player.lastResponse = World_default.currentTick;
        if (Environment_default.LOCAL_DEV) {
            player.staffModLevel = 3;
        } else if (Environment_default.JMODS.find(name2 => name2 === safeName) !== undefined) {
            player.staffModLevel = 2;
        }
        return player;
    }
}

// src/lostcity/util/WorkerFactory.ts
function createWorker(fileEmbed) {
    const blob = new Blob([fileEmbed], {type: 'application/javascript'});
    const blobUrl = URL.createObjectURL(blob);
    return new Worker(blobUrl, {type: 'module'});
}

// src/lostcity/server/NetworkStream.ts
class NetworkStream {
    queue = [];
    available = 0;
    buffer = null;
    offset = 0;
    waiting = 0;
    received(buf) {
        this.queue.push(buf);
        this.available += buf.length;
    }
    clear() {
        this.queue = [];
        this.available = 0;
        this.buffer = null;
        this.offset = 0;
    }
    async readByte(socket) {
        if (socket === null) {
            return 0;
        }
        if (this.available < 1) {
            await new Promise(res => setTimeout(res, 10));
            return this.readByte(socket);
        }
        if (this.buffer === null) {
            this.buffer = this.queue.shift() ?? null;
            this.offset = 0;
        }
        const value = this.buffer?.[this.offset] ?? 0;
        this.offset++;
        this.available--;
        if (this.buffer && this.offset === this.buffer.length) {
            this.buffer = null;
        }
        return value;
    }
    async readBytes(socket, destination, offset, length, full = true) {
        if (socket === null) {
            return 0;
        }
        if (this.available < length) {
            if (full) {
                await new Promise(res => setTimeout(res, 10));
                return this.readBytes(socket, destination, offset, length);
            } else {
                length = this.available;
            }
        }
        destination.pos = offset;
        for (let i = 0; i < length; i++) {
            if (this.buffer === null) {
                this.buffer = this.queue.shift() ?? null;
                this.offset = 0;
            }
            destination.data[offset + i] = this.buffer?.[this.offset] ?? 0;
            this.offset++;
            this.available--;
            if (this.buffer && this.offset === this.buffer.length) {
                this.buffer = null;
            }
        }
        return length;
    }
}

// src/lostcity/server/LoginServer.ts
class LoginResponse {
    static SUCCESSFUL = Uint8Array.from([2]);
    static INVALID_USER_OR_PASS = Uint8Array.from([3]);
    static ACCOUNT_DISABLED = Uint8Array.from([4]);
    static LOGGED_IN = Uint8Array.from([5]);
    static SERVER_UPDATED = Uint8Array.from([6]);
    static WORLD_FULL = Uint8Array.from([7]);
    static LOGIN_SERVER_OFFLINE = Uint8Array.from([8]);
    static LOGIN_LIMIT_EXCEEDED = Uint8Array.from([9]);
    static UNABLE_TO_CONNECT = Uint8Array.from([10]);
    static LOGIN_REJECTED = Uint8Array.from([11]);
    static NEED_MEMBERS_ACCOUNT = Uint8Array.from([12]);
    static COULD_NOT_COMPLETE = Uint8Array.from([13]);
    static SERVER_UPDATING = Uint8Array.from([14]);
    static RECONNECTING = Uint8Array.from([15]);
    static LOGIN_ATTEMPTS_EXCEEDED = Uint8Array.from([16]);
    static STANDING_IN_MEMBERS = Uint8Array.from([17]);
    static STAFF_MOD_LEVEL = Uint8Array.from([18]);
}
class LoginClient {
    socket = null;
    stream = new NetworkStream();
    async connect() {
        if (this.socket) {
            return;
        }
        return new Promise(res => {
            this.socket = net.createConnection({
                port: Environment_default.LOGIN_PORT,
                host: Environment_default.LOGIN_HOST
            });
            this.socket.setNoDelay(true);
            this.socket.setTimeout(1000);
            this.socket.on('data', async buf => {
                this.stream.received(buf);
            });
            this.socket.once('close', () => {
                this.disconnect();
                res();
            });
            this.socket.once('error', () => {
                this.disconnect();
                res();
            });
            this.socket.once('connect', () => {
                res();
            });
        });
    }
    disconnect() {
        if (this.socket === null) {
            return;
        }
        this.socket.destroy();
        this.socket = null;
        this.stream.clear();
    }
    async write(socket, opcode, data = null, full = true) {
        if (socket === null) {
            return;
        }
        const packet = new Packet(new Uint8Array(1 + 2 + (data !== null ? data?.length : 0)));
        packet.p1(opcode);
        if (data !== null) {
            packet.p2(data.length);
            packet.pdata(data, 0, data.length);
        } else {
            packet.p2(0);
        }
        const done = socket.write(packet.data);
        if (!done && full) {
            await new Promise(res => {
                const interval = setInterval(() => {
                    if (socket === null || socket.closed) {
                        clearInterval(interval);
                        res();
                    }
                }, 100);
                socket.once('drain', () => {
                    clearInterval(interval);
                    res();
                });
            });
        }
    }
    async load(username37, password, uid) {
        await this.connect();
        if (this.socket === null) {
            return {reply: -1, data: null};
        }
        const request = new Packet(new Uint8Array(2 + 8 + password.length + 1 + 4));
        request.p2(Environment_default.WORLD_ID);
        request.p8(username37);
        request.pjstr(password);
        request.p4(uid);
        await this.write(this.socket, 1, request.data);
        const reply = await this.stream.readByte(this.socket);
        if (reply !== 1) {
            this.disconnect();
            return {reply, data: null};
        }
        const data = new Packet(new Uint8Array(2));
        await this.stream.readBytes(this.socket, data, 0, 2);
        const length = data.g2();
        const data2 = new Packet(new Uint8Array(length));
        await this.stream.readBytes(this.socket, data2, 0, length);
        this.disconnect();
        return {reply, data: data2};
    }
    async save(username37, save) {
        await this.connect();
        if (this.socket === null) {
            return -1;
        }
        const request = new Packet(new Uint8Array(2 + 8 + 2 + save.length));
        request.p2(Environment_default.WORLD_ID);
        request.p8(username37);
        request.p2(save.length);
        request.pdata(save, 0, save.length);
        await this.write(this.socket, 2, request.data);
        const reply = await this.stream.readByte(this.socket);
        this.disconnect();
        return reply;
    }
    async reset() {
        await this.connect();
        if (this.socket === null) {
            return -1;
        }
        const request = new Packet(new Uint8Array(2));
        request.p2(Environment_default.WORLD_ID);
        await this.write(this.socket, 3, request.data);
        this.disconnect();
    }
    async count(world) {
        await this.connect();
        if (this.socket === null) {
            return -1;
        }
        const request = new Packet(new Uint8Array(2));
        request.p2(world);
        await this.write(this.socket, 4, request.data);
        const reply = new Packet(new Uint8Array(2));
        await this.stream.readBytes(this.socket, reply, 0, 2);
        const count = reply.g2();
        this.disconnect();
        return count;
    }
    async heartbeat(players) {
        await this.connect();
        if (this.socket === null) {
            return -1;
        }
        const request = new Packet(new Uint8Array(2 + 2 + players.length * 8));
        request.p2(Environment_default.WORLD_ID);
        request.p2(players.length);
        for (const player of players) {
            request.p8(player);
        }
        await this.write(this.socket, 5, request.data);
        this.disconnect();
    }
}

// src/lostcity/server/CrcTable.ts
async function makeCrc(path) {
    if (!(await fetch(path)).ok) {
        return;
    }
    const packet = await Packet.load(path);
    const crc = Packet.getcrc(packet.data, 0, packet.data.length);
    CrcTable.push(crc);
    CrcBuffer.p4(crc);
}
function makeCrcs() {
    CrcTable = [];
    CrcBuffer.pos = 0;
    CrcBuffer.p4(0);
    makeCrc('data/pack/client/title');
    makeCrc('data/pack/client/config');
    makeCrc('data/pack/client/interface');
    makeCrc('data/pack/client/media');
    makeCrc('data/pack/client/models');
    makeCrc('data/pack/client/textures');
    makeCrc('data/pack/client/wordenc');
    makeCrc('data/pack/client/sounds');
    CrcBuffer32 = Packet.getcrc(CrcBuffer.data, 0, CrcBuffer.data.length);
}
var CrcBuffer = new Packet(new Uint8Array(4 * 9));
var CrcTable = [];
var CrcBuffer32 = 0;
if ((await fetch('data/pack/client/')).ok) {
    makeCrcs();
}

// src/lostcity/server/LoginThreadWorker.ts
var LoginThreadWorker = `
// src/jagex2/datastruct/Linkable.ts
class Linkable {
  key;
  next;
  prev;
  constructor() {
    this.key = 0n;
    this.next = this;
    this.prev = this;
  }
  unlink() {
    if (!this.prev || !this.next) {
      return;
    }
    this.prev.next = this.next;
    this.next.prev = this.prev;
    this.next = null;
    this.prev = null;
  }
}

// src/jagex2/datastruct/LinkList.ts
class LinkList {
  sentinel;
  cursor = null;
  constructor() {
    const head = new Linkable;
    head.next = head;
    head.prev = head;
    this.sentinel = head;
  }
  addTail(node) {
    if (node.prev) {
      node.unlink();
    }
    node.prev = this.sentinel.prev;
    node.next = this.sentinel;
    if (node.prev) {
      node.prev.next = node;
    }
    node.next.prev = node;
  }
  addHead(node) {
    if (node.prev) {
      node.unlink();
    }
    node.prev = this.sentinel;
    node.next = this.sentinel.next;
    node.prev.next = node;
    if (node.next) {
      node.next.prev = node;
    }
  }
  removeHead() {
    const node = this.sentinel.next;
    if (node === this.sentinel) {
      return null;
    }
    node?.unlink();
    return node;
  }
  head() {
    const node = this.sentinel.next;
    if (node === this.sentinel) {
      this.cursor = null;
      return null;
    }
    this.cursor = node?.next || null;
    return node;
  }
  tail() {
    const node = this.sentinel.prev;
    if (node === this.sentinel) {
      this.cursor = null;
      return null;
    }
    this.cursor = node?.prev || null;
    return node;
  }
  next() {
    const node = this.cursor;
    if (node === this.sentinel) {
      this.cursor = null;
      return null;
    }
    this.cursor = node?.next || null;
    return node;
  }
  prev() {
    const node = this.cursor;
    if (node === this.sentinel) {
      this.cursor = null;
      return null;
    }
    this.cursor = node?.prev || null;
    return node;
  }
  clear() {
    while (true) {
      const node = this.sentinel.next;
      if (node === this.sentinel) {
        return;
      }
      node?.unlink();
    }
  }
}

// src/jagex2/datastruct/Hashable.ts
class Hashable extends Linkable {
  nextHashable;
  prevHashable;
  constructor() {
    super();
    this.nextHashable = this;
    this.prevHashable = this;
  }
  uncache() {
    if (!this.prevHashable || !this.nextHashable) {
      return;
    }
    this.prevHashable.nextHashable = this.nextHashable;
    this.nextHashable.prevHashable = this.prevHashable;
    this.nextHashable = null;
    this.prevHashable = null;
  }
}

// src/jagex2/io/Packet.ts
class Packet extends Hashable {
  static crctable = new Int32Array(256);
  static bitmask = new Uint32Array(33);
  static crc32b = 3988292384;
  static {
    for (let i = 0;i < 32; i++) {
      this.bitmask[i] = (1 << i) - 1;
    }
    this.bitmask[32] = 4294967295;
    for (let b = 0;b < 256; b++) {
      let remainder = b;
      for (let bit = 0;bit < 8; bit++) {
        if ((remainder & 1) == 1) {
          remainder = remainder >>> 1 ^ this.crc32b;
        } else {
          remainder >>>= 1;
        }
      }
      this.crctable[b] = remainder;
    }
  }
  static getcrc(src, offset, length) {
    let crc = 4294967295;
    for (let i = offset;i < length; i++) {
      crc = crc >>> 8 ^ this.crctable[(crc ^ src[i]) & 255];
    }
    return ~crc;
  }
  static checkcrc(src, offset, length, expected = 0) {
    const checksum = Packet.getcrc(src, offset, length);
    return checksum == expected;
  }
  static alloc(type) {
    let packet = null;
    if (type === 0 && this.cacheMinCount > 0) {
      packet = this.cacheMin.removeHead();
      this.cacheMinCount--;
    } else if (type === 1 && this.cacheMidCount > 0) {
      packet = this.cacheMid.removeHead();
      this.cacheMidCount--;
    } else if (type === 2 && this.cacheMaxCount > 0) {
      packet = this.cacheMax.removeHead();
      this.cacheMaxCount--;
    } else if (type === 3 && this.cacheBigCount > 0) {
      packet = this.cacheBig.removeHead();
      this.cacheBigCount--;
    } else if (type === 4 && this.cacheHugeCount > 0) {
      packet = this.cacheHuge.removeHead();
      this.cacheHugeCount--;
    } else if (type === 5 && this.cacheUnimaginableCount > 0) {
      packet = this.cacheUnimaginable.removeHead();
      this.cacheUnimaginableCount--;
    }
    if (packet !== null) {
      packet.pos = 0;
      packet.bitPos = 0;
      return packet;
    }
    if (type === 0) {
      return new Packet(new Uint8Array(100));
    } else if (type === 1) {
      return new Packet(new Uint8Array(5000));
    } else if (type === 2) {
      return new Packet(new Uint8Array(30000));
    } else if (type === 3) {
      return new Packet(new Uint8Array(1e5));
    } else if (type === 4) {
      return new Packet(new Uint8Array(500000));
    } else if (type === 5) {
      return new Packet(new Uint8Array(2000000));
    } else {
      return new Packet(new Uint8Array(type));
    }
  }
  static async load(path, seekToEnd = false) {
    const packet = new Packet(new Uint8Array(await (await fetch(path)).arrayBuffer()));
    if (seekToEnd) {
      packet.pos = packet.data.length;
    }
    return packet;
  }
  static cacheMinCount = 0;
  static cacheMidCount = 0;
  static cacheMaxCount = 0;
  static cacheBigCount = 0;
  static cacheHugeCount = 0;
  static cacheUnimaginableCount = 0;
  static cacheMin = new LinkList;
  static cacheMid = new LinkList;
  static cacheMax = new LinkList;
  static cacheBig = new LinkList;
  static cacheHuge = new LinkList;
  static cacheUnimaginable = new LinkList;
  data;
  #view;
  pos;
  bitPos;
  constructor(src) {
    super();
    this.data = src;
    this.#view = new DataView(this.data.buffer);
    this.pos = 0;
    this.bitPos = 0;
  }
  get available() {
    return this.data.length - this.pos;
  }
  get length() {
    return this.data.length;
  }
  release() {
    this.pos = 0;
    this.bitPos = 0;
    if (this.data.length === 100 && Packet.cacheMinCount < 1000) {
      Packet.cacheMin.addTail(this);
      Packet.cacheMinCount++;
    } else if (this.data.length === 5000 && Packet.cacheMidCount < 250) {
      Packet.cacheMid.addTail(this);
      Packet.cacheMidCount++;
    } else if (this.data.length === 30000 && Packet.cacheMaxCount < 50) {
      Packet.cacheMax.addTail(this);
      Packet.cacheMaxCount++;
    } else if (this.data.length === 1e5 && Packet.cacheBigCount < 10) {
      Packet.cacheBig.addTail(this);
      Packet.cacheBigCount++;
    } else if (this.data.length === 500000 && Packet.cacheHugeCount < 5) {
      Packet.cacheHuge.addTail(this);
      Packet.cacheHugeCount++;
    } else if (this.data.length === 2000000 && Packet.cacheUnimaginableCount < 2) {
      Packet.cacheUnimaginable.addTail(this);
      Packet.cacheUnimaginableCount++;
    }
  }
  p1(value) {
    this.#view.setUint8(this.pos++, value);
  }
  p2(value) {
    this.#view.setUint16(this.pos, value);
    this.pos += 2;
  }
  ip2(value) {
    this.#view.setUint16(this.pos, value, true);
    this.pos += 2;
  }
  p3(value) {
    this.#view.setUint8(this.pos++, value >> 16);
    this.#view.setUint16(this.pos, value);
    this.pos += 2;
  }
  p4(value) {
    this.#view.setInt32(this.pos, value);
    this.pos += 4;
  }
  ip4(value) {
    this.#view.setInt32(this.pos, value, true);
    this.pos += 4;
  }
  p8(value) {
    this.#view.setBigInt64(this.pos, value);
    this.pos += 8;
  }
  pbool(value) {
    this.p1(value ? 1 : 0);
  }
  pjstr(str, terminator = 10) {
    const length = str.length;
    for (let i = 0;i < length; i++) {
      this.#view.setUint8(this.pos++, str.charCodeAt(i));
    }
    this.#view.setUint8(this.pos++, terminator);
  }
  pdata(src, offset, length) {
    this.data.set(src.subarray(offset, offset + length), this.pos);
    this.pos += length - offset;
  }
  psize4(size) {
    this.#view.setUint32(this.pos - size - 4, size);
  }
  psize2(size) {
    this.#view.setUint16(this.pos - size - 2, size);
  }
  psize1(size) {
    this.#view.setUint8(this.pos - size - 1, size);
  }
  psmarts(value) {
    if (value < 64 && value >= 64) {
      this.p1(value + 64);
    } else if (value < 16384 && value >= -16384) {
      this.p2(value + 49152);
    } else {
      throw new Error("Error psmarts out of range: " + value);
    }
  }
  psmart(value) {
    if (value >= 0 && value < 128) {
      this.p1(value);
    } else if (value >= 0 && value < 32768) {
      this.p2(value + 32768);
    } else {
      throw new Error("Error psmart out of range: " + value);
    }
  }
  g1() {
    return this.#view.getUint8(this.pos++);
  }
  g1b() {
    return this.#view.getInt8(this.pos++);
  }
  g2() {
    this.pos += 2;
    return this.#view.getUint16(this.pos - 2);
  }
  g2s() {
    this.pos += 2;
    return this.#view.getInt16(this.pos - 2);
  }
  ig2() {
    this.pos += 2;
    return this.#view.getUint16(this.pos - 2, true);
  }
  g3() {
    const result = this.#view.getUint8(this.pos++) << 16 | this.#view.getUint16(this.pos);
    this.pos += 2;
    return result;
  }
  g4() {
    this.pos += 4;
    return this.#view.getInt32(this.pos - 4);
  }
  ig4() {
    this.pos += 4;
    return this.#view.getInt32(this.pos - 4, true);
  }
  g8() {
    this.pos += 8;
    return this.#view.getBigInt64(this.pos - 8);
  }
  gbool() {
    return this.g1() === 1;
  }
  gjstr(terminator = 10) {
    const length = this.data.length;
    let str = "";
    let b;
    while ((b = this.#view.getUint8(this.pos++)) !== terminator && this.pos < length) {
      str += String.fromCharCode(b);
    }
    return str;
  }
  gdata(dest, offset, length) {
    dest.set(this.data.subarray(this.pos, this.pos + length), offset);
    this.pos += length;
  }
  gsmarts() {
    return this.#view.getUint8(this.pos) < 128 ? this.g1() - 64 : this.g2() - 49152;
  }
  gsmart() {
    return this.#view.getUint8(this.pos) < 128 ? this.g1() : this.g2() - 32768;
  }
  bits() {
    this.bitPos = this.pos << 3;
  }
  bytes() {
    this.pos = this.bitPos + 7 >>> 3;
  }
  gBit(n) {
    let bytePos = this.bitPos >>> 3;
    let remaining = 8 - (this.bitPos & 7);
    let value = 0;
    this.bitPos += n;
    for (;n > remaining; remaining = 8) {
      value += (this.#view.getUint8(bytePos++) & Packet.bitmask[remaining]) << n - remaining;
      n -= remaining;
    }
    if (n == remaining) {
      value += this.#view.getUint8(bytePos) & Packet.bitmask[remaining];
    } else {
      value += this.#view.getUint8(bytePos) >>> remaining - n & Packet.bitmask[n];
    }
    return value;
  }
  pBit(n, value) {
    const pos = this.bitPos;
    this.bitPos += n;
    let bytePos = pos >>> 3;
    let remaining = 8 - (pos & 7);
    const view = this.#view;
    for (;n > remaining; remaining = 8) {
      const shift2 = (1 << remaining) - 1;
      const byte2 = view.getUint8(bytePos);
      view.setUint8(bytePos++, byte2 & ~shift2 | value >>> n - remaining & shift2);
      n -= remaining;
    }
    const r = remaining - n;
    const shift = (1 << n) - 1;
    const byte = view.getUint8(bytePos);
    view.setUint8(bytePos, byte & ~shift << r | (value & shift) << r);
  }
}

// src/jagex2/jstring/JString.ts
function toBase37(string) {
  string = string.trim();
  let l = 0n;
  for (let i = 0;i < string.length && i < 12; i++) {
    const c = string.charCodeAt(i);
    l *= 37n;
    if (c >= 65 && c <= 90) {
      l += BigInt(c + 1 - 65);
    } else if (c >= 97 && c <= 122) {
      l += BigInt(c + 1 - 97);
    } else if (c >= 48 && c <= 57) {
      l += BigInt(c + 27 - 48);
    }
  }
  return l;
}
function fromBase37(value) {
  if (value < 0n || value >= 6582952005840035281n) {
    return "invalid_name";
  }
  if (value % 37n === 0n) {
    return "invalid_name";
  }
  let len = 0;
  const chars = Array(12);
  while (value !== 0n) {
    const l1 = value;
    value /= 37n;
    chars[11 - len++] = BASE37_LOOKUP[Number(l1 - value * 37n)];
  }
  return chars.slice(12 - len).join("");
}
function toSafeName(name) {
  return fromBase37(toBase37(name));
}
var BASE37_LOOKUP = [
  "_",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9"
];

// src/lostcity/server/NetworkStream.ts
class NetworkStream {
  queue = [];
  available = 0;
  buffer = null;
  offset = 0;
  waiting = 0;
  received(buf) {
    this.queue.push(buf);
    this.available += buf.length;
  }
  clear() {
    this.queue = [];
    this.available = 0;
    this.buffer = null;
    this.offset = 0;
  }
  async readByte(socket) {
    if (socket === null) {
      return 0;
    }
    if (this.available < 1) {
      await new Promise((res) => setTimeout(res, 10));
      return this.readByte(socket);
    }
    if (this.buffer === null) {
      this.buffer = this.queue.shift() ?? null;
      this.offset = 0;
    }
    const value = this.buffer?.[this.offset] ?? 0;
    this.offset++;
    this.available--;
    if (this.buffer && this.offset === this.buffer.length) {
      this.buffer = null;
    }
    return value;
  }
  async readBytes(socket, destination, offset, length, full = true) {
    if (socket === null) {
      return 0;
    }
    if (this.available < length) {
      if (full) {
        await new Promise((res) => setTimeout(res, 10));
        return this.readBytes(socket, destination, offset, length);
      } else {
        length = this.available;
      }
    }
    destination.pos = offset;
    for (let i = 0;i < length; i++) {
      if (this.buffer === null) {
        this.buffer = this.queue.shift() ?? null;
        this.offset = 0;
      }
      destination.data[offset + i] = this.buffer?.[this.offset] ?? 0;
      this.offset++;
      this.available--;
      if (this.buffer && this.offset === this.buffer.length) {
        this.buffer = null;
      }
    }
    return length;
  }
}

// src/lostcity/util/Environment.ts
var Environment_default = {
  PUBLIC_IP: "localhost",
  WEB_PORT: 80,
  GAME_PORT: 43594,
  LOGIN_HOST: "localhost",
  LOGIN_PORT: 43500,
  LOGIN_KEY: "",
  FRIEND_HOST: "localhost",
  FRIEND_PORT: 43501,
  FRIEND_KEY: "",
  WORLD_ID: 0,
  LOCAL_DEV: true,
  MEMBERS_WORLD: true,
  XP_MULTIPLIER: 1,
  SHUTDOWN_TIMER: 50,
  HTTPS_ENABLED: false,
  ADDRESS_SHOWPORT: true,
  CLIRUNNER: false,
  CI_MODE: false,
  SKIP_CORS: false,
  DB_HOST: "",
  DB_USER: "",
  DB_PASS: "",
  DB_NAME: "",
  ADMIN_IP: "localhost",
  SKIP_CRC: false,
  JAVA_PATH: "java",
  DATA_SRC_DIR: "data/src",
  VALIDATE_PACK: true,
  STRICT_FOLDERS: true,
  BUILD_ON_STARTUP: true,
  UPDATE_ON_STARTUP: true,
  JMODS: ["pazaz"],
  CLIENT_PATHFINDER: true,
  NO_SOCKET_TIMEOUT: false,
  PROFILE_SCRIPTS: false
};

// src/lostcity/server/LoginServer.ts
class LoginResponse {
  static SUCCESSFUL = Uint8Array.from([2]);
  static INVALID_USER_OR_PASS = Uint8Array.from([3]);
  static ACCOUNT_DISABLED = Uint8Array.from([4]);
  static LOGGED_IN = Uint8Array.from([5]);
  static SERVER_UPDATED = Uint8Array.from([6]);
  static WORLD_FULL = Uint8Array.from([7]);
  static LOGIN_SERVER_OFFLINE = Uint8Array.from([8]);
  static LOGIN_LIMIT_EXCEEDED = Uint8Array.from([9]);
  static UNABLE_TO_CONNECT = Uint8Array.from([10]);
  static LOGIN_REJECTED = Uint8Array.from([11]);
  static NEED_MEMBERS_ACCOUNT = Uint8Array.from([12]);
  static COULD_NOT_COMPLETE = Uint8Array.from([13]);
  static SERVER_UPDATING = Uint8Array.from([14]);
  static RECONNECTING = Uint8Array.from([15]);
  static LOGIN_ATTEMPTS_EXCEEDED = Uint8Array.from([16]);
  static STANDING_IN_MEMBERS = Uint8Array.from([17]);
  static STAFF_MOD_LEVEL = Uint8Array.from([18]);
}
class LoginClient {
  socket = null;
  stream = new NetworkStream;
  async connect() {
    if (this.socket) {
      return;
    }
    return new Promise((res) => {
      this.socket = net.createConnection({
        port: Environment_default.LOGIN_PORT,
        host: Environment_default.LOGIN_HOST
      });
      this.socket.setNoDelay(true);
      this.socket.setTimeout(1000);
      this.socket.on("data", async (buf) => {
        this.stream.received(buf);
      });
      this.socket.once("close", () => {
        this.disconnect();
        res();
      });
      this.socket.once("error", () => {
        this.disconnect();
        res();
      });
      this.socket.once("connect", () => {
        res();
      });
    });
  }
  disconnect() {
    if (this.socket === null) {
      return;
    }
    this.socket.destroy();
    this.socket = null;
    this.stream.clear();
  }
  async write(socket, opcode, data = null, full = true) {
    if (socket === null) {
      return;
    }
    const packet = new Packet(new Uint8Array(1 + 2 + (data !== null ? data?.length : 0)));
    packet.p1(opcode);
    if (data !== null) {
      packet.p2(data.length);
      packet.pdata(data, 0, data.length);
    } else {
      packet.p2(0);
    }
    const done = socket.write(packet.data);
    if (!done && full) {
      await new Promise((res) => {
        const interval = setInterval(() => {
          if (socket === null || socket.closed) {
            clearInterval(interval);
            res();
          }
        }, 100);
        socket.once("drain", () => {
          clearInterval(interval);
          res();
        });
      });
    }
  }
  async load(username37, password, uid) {
    await this.connect();
    if (this.socket === null) {
      return { reply: -1, data: null };
    }
    const request = new Packet(new Uint8Array(2 + 8 + password.length + 1 + 4));
    request.p2(Environment_default.WORLD_ID);
    request.p8(username37);
    request.pjstr(password);
    request.p4(uid);
    await this.write(this.socket, 1, request.data);
    const reply = await this.stream.readByte(this.socket);
    if (reply !== 1) {
      this.disconnect();
      return { reply, data: null };
    }
    const data = new Packet(new Uint8Array(2));
    await this.stream.readBytes(this.socket, data, 0, 2);
    const length = data.g2();
    const data2 = new Packet(new Uint8Array(length));
    await this.stream.readBytes(this.socket, data2, 0, length);
    this.disconnect();
    return { reply, data: data2 };
  }
  async save(username37, save) {
    await this.connect();
    if (this.socket === null) {
      return -1;
    }
    const request = new Packet(new Uint8Array(2 + 8 + 2 + save.length));
    request.p2(Environment_default.WORLD_ID);
    request.p8(username37);
    request.p2(save.length);
    request.pdata(save, 0, save.length);
    await this.write(this.socket, 2, request.data);
    const reply = await this.stream.readByte(this.socket);
    this.disconnect();
    return reply;
  }
  async reset() {
    await this.connect();
    if (this.socket === null) {
      return -1;
    }
    const request = new Packet(new Uint8Array(2));
    request.p2(Environment_default.WORLD_ID);
    await this.write(this.socket, 3, request.data);
    this.disconnect();
  }
  async count(world) {
    await this.connect();
    if (this.socket === null) {
      return -1;
    }
    const request = new Packet(new Uint8Array(2));
    request.p2(world);
    await this.write(this.socket, 4, request.data);
    const reply = new Packet(new Uint8Array(2));
    await this.stream.readBytes(this.socket, reply, 0, 2);
    const count = reply.g2();
    this.disconnect();
    return count;
  }
  async heartbeat(players) {
    await this.connect();
    if (this.socket === null) {
      return -1;
    }
    const request = new Packet(new Uint8Array(2 + 2 + players.length * 8));
    request.p2(Environment_default.WORLD_ID);
    request.p2(players.length);
    for (const player of players) {
      request.p8(player);
    }
    await this.write(this.socket, 5, request.data);
    this.disconnect();
  }
}

// src/lostcity/server/LoginThread.ts
self.onmessage = async (msg) => {
  try {
    switch (msg.data.type) {
      case "reset": {
        break;
      }
      case "heartbeat": {
        break;
      }
      case "loginreq": {
        const { opcode, data, socket } = msg.data;
        const stream = new Packet(data);
        const revision = stream.g1();
        if (revision !== 225) {
          self.postMessage({
            type: "loginreply",
            status: LoginResponse.SERVER_UPDATED,
            socket
          });
          return;
        }
        const info = stream.g1();
        const crcs = new Uint8Array(9 * 4);
        stream.gdata(crcs, 0, crcs.length);
        const enc = new Uint8Array(stream.g1());
        stream.gdata(enc, 0, enc.length);
        stream.pos = 0;
        stream.pdata(enc, 0, enc.length);
        stream.pos = 0;
        if (stream.g1() !== 10) {
          self.postMessage({
            type: "loginreply",
            status: LoginResponse.LOGIN_REJECTED,
            socket
          });
          return;
        }
        const seed = [];
        for (let i = 0;i < 4; i++) {
          seed[i] = stream.g4();
        }
        const uid = stream.g4();
        const username = stream.gjstr();
        const password = stream.gjstr();
        if (username.length < 1 || username.length > 12) {
          self.postMessage({
            type: "loginreply",
            status: LoginResponse.INVALID_USER_OR_PASS,
            socket
          });
          return;
        }
        const save = new Uint8Array;
        self.postMessage({
          type: "loginreply",
          status: LoginResponse.SUCCESSFUL,
          socket,
          info,
          seed,
          username: toSafeName(username),
          save
        });
        break;
      }
      case "logout": {
        const { username, save } = msg.data;
        if (Environment_default.LOGIN_KEY) {
          const login = new LoginClient;
          const reply = await login.save(toBase37(username), save);
          if (reply === 0) {
            self.postMessage({
              type: "logoutreply",
              username
            });
          }
        } else {
          self.postMessage({
            type: "logoutreply",
            username
          });
        }
        break;
      }
      default:
        console.error("Unknown message type: " + msg.data.type);
        break;
    }
  } catch (err) {
    console.error(err);
  }
};
`;

// src/lostcity/engine/Login.ts
class Login {
    loginThread = createWorker(LoginThreadWorker);
    loginRequests = new Map();
    logoutRequests = new Set();
    constructor() {
        this.loginThread.onmessage = msg => {
            try {
                this.onMessage(msg);
            } catch (err) {
                console.error('Login Thread:', err);
            }
        };
    }
    async readIn(socket, data) {
        const opcode = data.g1();
        if (opcode === 16) {
            const length = data.g1();
            if (data.available < length) {
                socket.terminate();
                return;
            }
            const post = new Uint8Array(length);
            data.gdata(post, 0, post.length);
            data.pos -= post.length;
            const revision = data.g1();
            if (revision !== 225) {
                socket.writeImmediate(LoginResponse.SERVER_UPDATED);
                return;
            }
            data.pos += 1;
            const crcs = new Uint8Array(9 * 4);
            data.gdata(crcs, 0, crcs.length);
            if (!Packet.checkcrc(crcs, 0, crcs.length, CrcBuffer32)) {
                socket.writeImmediate(LoginResponse.SERVER_UPDATED);
                return;
            }
            this.loginThread.postMessage({
                type: 'loginreq',
                opcode,
                data: post,
                socket: socket.uniqueId
            });
            this.loginRequests.set(socket.uniqueId, socket);
        } else {
            socket.terminate();
        }
    }
    logout(player) {
        if (this.logoutRequests.has(player.username37)) {
            return;
        }
        this.loginThread.postMessage({
            type: 'logout',
            username: player.username
        });
    }
    onMessage(msg) {
        switch (msg.data.type) {
            case 'loginreply': {
                const {status, socket} = msg.data;
                const client = this.loginRequests.get(socket);
                if (!client) {
                    return;
                }
                this.loginRequests.delete(socket);
                if (status[0] !== 2) {
                    client.writeImmediate(status);
                    client.close();
                    return;
                }
                const {info, seed, username, save} = msg.data;
                if (World_default.getTotalPlayers() >= 2000) {
                    client.writeImmediate(LoginResponse.WORLD_FULL);
                    client.close();
                    return;
                }
                if (World_default.shutdownTick > -1 && World_default.currentTick - World_default.shutdownTick > 0) {
                    client.writeImmediate(LoginResponse.SERVER_UPDATING);
                    client.close();
                    return;
                }
                if (Environment_default.LOCAL_DEV) {
                    for (const player2 of World_default.players) {
                        if (player2.username === username) {
                            client.writeImmediate(LoginResponse.LOGGED_IN);
                            client.close();
                            return;
                        }
                    }
                }
                client.decryptor = new Isaac(seed);
                for (let i = 0; i < 4; i++) {
                    seed[i] += 50;
                }
                client.encryptor = new Isaac(seed);
                const player = PlayerLoading.load(username, new Packet(save), client);
                player.lowMemory = (info & 1) !== 0;
                World_default.addPlayer(player);
                break;
            }
            case 'logoutreply': {
                const {username} = msg.data;
                const player = World_default.getPlayerByUsername(username);
                if (player) {
                    World_default.getZone(player.x, player.z, player.level).leave(player);
                    World_default.players.remove(player.pid);
                    player.pid = -1;
                    player.terminate();
                    this.logoutRequests.delete(player.username37);
                }
                break;
            }
            default:
                throw new Error('Unknown message type: ' + msg.data.type);
        }
    }
}
var Login_default = new Login();

// src/lostcity/entity/EntityList.ts
class EntityList {
    entities;
    free;
    indexPadding;
    ids;
    lastUsedIndex = 0;
    constructor(size, indexPadding) {
        this.entities = new Array(size).fill(null);
        this.ids = new Int32Array(size).fill(-1);
        this.free = new Set(Array.from({length: size}, (_2, index) => index));
        this.indexPadding = indexPadding;
    }
    next(_2 = false, start = this.lastUsedIndex + 1) {
        const length = this.ids.length;
        for (let index = start; index < length; index++) {
            if (this.ids[index] === -1) {
                return index;
            }
        }
        for (let index = this.indexPadding; index < start; index++) {
            if (this.ids[index] === -1) {
                return index;
            }
        }
        throw new Error('[EntityList] cannot find next id');
    }
    *[Symbol.iterator]() {
        for (const index of this.ids) {
            if (index === -1) {
                continue;
            }
            const entity = this.entities[index];
            if (!entity) {
                continue;
            }
            yield entity;
        }
    }
    get count() {
        let count = 0;
        for (const _2 of this[Symbol.iterator]()) {
            count++;
        }
        return count;
    }
    get(id) {
        const index = this.ids[id];
        return index !== -1 ? this.entities[index] : null;
    }
    set(id, entity) {
        if (!this.free.size) {
            throw new Error('[EntityList] cannot find available entities slot.');
        }
        const index = this.free.values().next().value;
        this.free.delete(index);
        this.ids[id] = index;
        this.entities[index] = entity;
        this.lastUsedIndex = id;
    }
    remove(id) {
        const index = this.ids[id];
        if (index !== -1) {
            this.entities[index] = null;
            this.ids[id] = -1;
            this.free.add(index);
        }
    }
    reset() {
        this.entities.fill(null);
        this.ids.fill(-1);
        this.free.clear();
        for (let i = 0; i < this.ids.length; i++) {
            this.free.add(i);
        }
    }
}

class NpcList extends EntityList {
    constructor(size) {
        super(size, 0);
    }
}

class PlayerList extends EntityList {
    constructor(size) {
        super(size, 1);
    }
    next(priority = false, start = this.lastUsedIndex + 1) {
        if (priority) {
            const init2 = start === 0 ? 1 : 0;
            for (let i = init2; i < 100; i++) {
                const index = start + i;
                const id = this.ids[index];
                if (id === -1) {
                    return index;
                }
            }
        }
        return super.next();
    }
}

// src/lostcity/network/outgoing/model/UpdateRebootTimer.ts
class UpdateRebootTimer extends OutgoingMessage {
    ticks;
    priority = ServerProtPriority.LOW;
    constructor(ticks) {
        super();
        this.ticks = ticks;
    }
}

// src/lostcity/engine/World.ts
class World35 {
    id = Environment_default.WORLD_ID;
    members = Environment_default.MEMBERS_WORLD;
    currentTick = 0;
    tickRate = 600;
    shutdownTick = -1;
    allLastModified = 0;
    datLastModified = new Map();
    lastCycleStats = [];
    lastCycleBandwidth = [0, 0];
    gameMap = new GameMap();
    zoneMap = new ZoneMap2();
    invs = [];
    vars = new Int32Array();
    varsString = [];
    newPlayers = [];
    players = new PlayerList(2048);
    npcs = new NpcList(8192);
    zonesTracking = new Map();
    queue = new LinkList();
    shouldReload(type, client = false) {
        return true;
    }
    async reload() {
        let transmitted = false;
        if (this.shouldReload('varp', true)) {
            VarPlayerType.load('data/pack');
            transmitted = true;
        }
        if (this.shouldReload('param')) {
            ParamType.load('data/pack');
        }
        if (this.shouldReload('obj', true)) {
            ObjType.load('data/pack', this.members);
            transmitted = true;
        }
        if (this.shouldReload('loc', true)) {
            LocType.load('data/pack');
            transmitted = true;
        }
        if (this.shouldReload('npc', true)) {
            NpcType.load('data/pack');
            transmitted = true;
        }
        if (this.shouldReload('idk', true)) {
            IdkType.load('data/pack');
            transmitted = true;
        }
        if (this.shouldReload('frame_del')) {
            SeqFrame.load('data/pack');
        }
        if (this.shouldReload('seq', true)) {
            SeqType.load('data/pack');
            transmitted = true;
        }
        if (this.shouldReload('spotanim', true)) {
            SpotanimType.load('data/pack');
            transmitted = true;
        }
        if (this.shouldReload('category')) {
            CategoryType.load('data/pack');
        }
        if (this.shouldReload('enum')) {
            EnumType.load('data/pack');
        }
        if (this.shouldReload('struct')) {
            StructType.load('data/pack');
        }
        if (this.shouldReload('inv')) {
            InvType.load('data/pack');
            for (let i = 0; i < InvType.count; i++) {
                const inv = InvType.get(i);
                if (inv && inv.scope === InvType.SCOPE_SHARED) {
                    this.invs[i] = Inventory.fromType(i);
                }
            }
        }
        if (this.shouldReload('mesanim')) {
            MesanimType.load('data/pack');
        }
        if (this.shouldReload('dbtable')) {
            DbTableType.load('data/pack');
        }
        if (this.shouldReload('dbrow')) {
            DbRowType.load('data/pack');
        }
        if (this.shouldReload('hunt')) {
            HuntType.load('data/pack');
        }
        if (this.shouldReload('varn')) {
            VarNpcType.load('data/pack');
        }
        if (this.shouldReload('vars')) {
            VarSharedType.load('data/pack');
            if (this.vars.length !== VarSharedType.count) {
                const old = this.vars;
                this.vars = new Int32Array(VarSharedType.count);
                for (let i = 0; i < VarSharedType.count && i < old.length; i++) {
                    this.vars[i] = old[i];
                }
                const oldString = this.varsString;
                this.varsString = new Array(VarSharedType.count);
                for (let i = 0; i < VarSharedType.count && i < old.length; i++) {
                    this.varsString[i] = oldString[i];
                }
            }
        }
        if (this.shouldReload('interface')) {
            Component.load('data/pack');
            transmitted = true;
        }
        if (this.shouldReload('script')) {
            const count = await ScriptProvider.load('data/pack');
            if (count === -1) {
                this.broadcastMes('There was an issue while reloading scripts.');
            } else {
                this.broadcastMes(`Reloaded ${count} scripts.`);
            }
        }
        makeCrcs();
        preloadClient();
    }
    broadcastMes(message) {
        for (const player of this.players) {
            player.messageGame(message);
        }
    }
    async start(skipMaps = false, startCycle = true) {
        console.log('Starting world...');
        await Bzip.load(await (await fetch('bz2.wasm')).arrayBuffer());
        await FontType.load('data/pack');
        await WordEnc2.load('data/pack');
        await this.reload();
        if (!skipMaps) {
            await this.gameMap.init(this.zoneMap);
        }
        Login_default.loginThread.postMessage({
            type: 'reset'
        });
        if (Environment_default.WEB_PORT === 80) {
            console.log(kleur_default.green().bold('World ready') + kleur_default.white().bold(': http://' + Environment_default.PUBLIC_IP));
        } else {
            console.log(kleur_default.green().bold('World ready') + kleur_default.white().bold(': http://' + Environment_default.PUBLIC_IP + ':' + Environment_default.WEB_PORT));
        }
        if (startCycle) {
            await this.cycle();
        }
    }
    rebootTimer(duration) {
        this.shutdownTick = this.currentTick + duration;
        for (const player of this.players) {
            player.write(new UpdateRebootTimer(this.shutdownTick - this.currentTick));
        }
    }
    async cycle(continueCycle = true) {
        const start = Date.now();
        let worldProcessing = Date.now();
        for (let request = this.queue.head(); request !== null; request = this.queue.next()) {
            const delay = request.delay--;
            if (delay > 0) {
                continue;
            }
            const script = request.script;
            try {
                const state = ScriptRunner2.execute(script);
                request.unlink();
                if (state === ScriptState.SUSPENDED) {
                    script.activePlayer.activeScript = script;
                } else if (state === ScriptState.NPC_SUSPENDED) {
                    script.activeNpc.activeScript = script;
                } else if (state === ScriptState.WORLD_SUSPENDED) {
                    this.enqueueScript(script, script.popInt());
                }
            } catch (err) {
                console.error(err);
            }
        }
        if (this.currentTick % 500 === 0) {
            for (const player of this.players) {
                player.afkEventReady = Math.random() < (player.zonesAfk() ? 0.1666 : 0.0833);
            }
        }
        for (const npc of this.npcs) {
            if (!npc.updateLifeCycle(this.currentTick)) {
                continue;
            }
            if (npc.lifecycle === EntityLifeCycle_default.RESPAWN) {
                this.addNpc(npc, -1);
            } else if (npc.lifecycle === EntityLifeCycle_default.DESPAWN) {
                this.removeNpc(npc, -1);
            }
        }
        for (const npc of this.npcs) {
            if (!npc.checkLifeCycle(this.currentTick) || npc.delayed()) {
                continue;
            }
            if (npc.huntMode !== -1) {
                npc.huntAll();
            }
        }
        worldProcessing = Date.now() - worldProcessing;
        this.lastCycleBandwidth[0] = 0;
        let clientInput = Date.now();
        for (const player of this.players) {
            if (!isNetworkPlayer(player)) {
                continue;
            }
            try {
                player.decodeIn();
            } catch (err) {
                console.error(err);
                await this.removePlayer(player);
            }
        }
        clientInput = Date.now() - clientInput;
        for (const player of this.players) {
            if (!isNetworkPlayer(player)) {
                continue;
            }
            if (player.userPath.length > 0 || player.opcalled) {
                if (player.delayed()) {
                    player.unsetMapFlag();
                    continue;
                }
                if ((!player.target || player.target instanceof Loc || player.target instanceof Obj) && player.faceEntity !== -1) {
                    player.faceEntity = -1;
                    player.mask |= Player2.FACE_ENTITY;
                }
                if (player.opcalled && (player.userPath.length === 0 || !Environment_default.CLIENT_PATHFINDER)) {
                    player.pathToTarget();
                    continue;
                }
                player.pathToMoveClick(player.userPath, !Environment_default.CLIENT_PATHFINDER);
            }
            if (player.target instanceof Player2 && (player.targetOp === ServerTriggerType_default.APPLAYER3 || player.targetOp === ServerTriggerType_default.OPPLAYER3)) {
                if (Position.distanceToSW(player, player.target) <= 25) {
                    player.pathToPathingTarget();
                } else {
                    player.clearWaypoints();
                }
            }
        }
        let npcProcessing = Date.now();
        for (const npc of this.npcs) {
            if (!npc.checkLifeCycle(this.currentTick)) {
                continue;
            }
            try {
                if (npc.delayed()) {
                    npc.delay--;
                }
                if (npc.delayed()) {
                    continue;
                }
                if (npc.activeScript) {
                    npc.executeScript(npc.activeScript);
                }
                if (!npc.checkLifeCycle(this.currentTick)) {
                    continue;
                }
                npc.processTimers();
                npc.processQueue();
                npc.processNpcModes();
                npc.validateDistanceWalked();
            } catch (err) {
                console.error(err);
                this.removeNpc(npc, -1);
            }
        }
        npcProcessing = Date.now() - npcProcessing;
        let playerProcessing = Date.now();
        for (const player of this.players) {
            try {
                player.playtime++;
                if (player.delayed()) {
                    player.delay--;
                }
                if (player.activeScript && !player.delayed() && player.activeScript.execution === ScriptState.SUSPENDED) {
                    player.executeScript(player.activeScript, true);
                }
                player.processQueues();
                player.processTimers(0 /* NORMAL */);
                player.processTimers(1 /* SOFT */);
                player.processEngineQueue();
                player.processInteraction();
                if ((player.mask & Player2.EXACT_MOVE) == 0) {
                    player.validateDistanceWalked();
                }
                if (this.shutdownTick < this.currentTick) {
                    if (!Environment_default.NO_SOCKET_TIMEOUT && this.currentTick - player.lastResponse >= 75) {
                        player.logoutRequested = true;
                    }
                }
                if (player.logoutRequested) {
                    player.closeModal();
                }
            } catch (err) {
                console.error(err);
                await this.removePlayer(player);
            }
        }
        playerProcessing = Date.now() - playerProcessing;
        let playerLogout = Date.now();
        for (const player of this.players) {
            if (!Environment_default.NO_SOCKET_TIMEOUT && this.currentTick - player.lastResponse >= 100) {
                player.queue.clear();
                player.weakQueue.clear();
                player.engineQueue.clear();
                player.clearInteraction();
                player.closeModal();
                player.unsetMapFlag();
                player.logoutRequested = true;
                player.setVar(VarPlayerType.LASTCOMBAT, 0);
            }
            if (!player.logoutRequested) {
                continue;
            }
            if (player.queue.head() === null) {
                const script = ScriptProvider.getByTriggerSpecific(ServerTriggerType_default.LOGOUT, -1, -1);
                if (!script) {
                    console.error('LOGOUT TRIGGER IS BROKEN!');
                    continue;
                }
                const state = ScriptRunner2.init(script, player);
                state.pointerAdd(ScriptPointer_default.ProtectedActivePlayer);
                ScriptRunner2.execute(state);
                const result = state.popInt();
                if (result === 0) {
                    player.logoutRequested = false;
                }
                if (player.logoutRequested) {
                    await this.removePlayer(player);
                }
            } else {
                player.messageGame('[DEBUG]: Waiting for queue to empty before logging out.');
            }
        }
        playerLogout = Date.now() - playerLogout;
        let playerLogin = Date.now();
        for (let i = 0; i < this.newPlayers.length; i++) {
            const player = this.newPlayers[i];
            this.newPlayers.splice(i--, 1);
            let pid;
            try {
                pid = this.getNextPid(isNetworkPlayer(player) ? player.client : null);
            } catch (e) {
                if (player instanceof NetworkPlayer2 && player.client) {
                    player.client.send(LoginResponse.WORLD_FULL);
                    player.client.close();
                }
                continue;
            }
            this.players.set(pid, player);
            player.pid = pid;
            player.uid = ((Number(player.username37 & 0x1fffffn) << 11) | player.pid) >>> 0;
            player.tele = true;
            this.getZone(player.x, player.z, player.level).enter(player);
            if (!Environment_default.CLIRUNNER) {
                player.onLogin();
            }
            if (this.shutdownTick > -1) {
                player.write(new UpdateRebootTimer(this.shutdownTick - this.currentTick));
            }
            if (player instanceof NetworkPlayer2 && player.client) {
                player.client.state = 1;
                if (player.staffModLevel >= 2) {
                    player.client.send(LoginResponse.STAFF_MOD_LEVEL);
                } else {
                    player.client.send(LoginResponse.SUCCESSFUL);
                }
            }
        }
        playerLogin = Date.now() - playerLogin;
        let zoneProcessing = Date.now();
        for (const zone of Array.from(this.zonesTracking.get(this.currentTick) ?? [])) {
            zone.tick(this.currentTick);
        }
        this.computeSharedEvents();
        zoneProcessing = Date.now() - zoneProcessing;
        for (const player of this.players) {
            player.convertMovementDir();
        }
        for (const npc of this.npcs) {
            npc.convertMovementDir();
        }
        this.lastCycleBandwidth[1] = 0;
        let clientOutput = Date.now();
        for (const player of this.players) {
            if (!isNetworkPlayer(player)) {
                continue;
            }
            try {
                player.updateMap();
                player.updatePlayers();
                player.updateNpcs();
                player.updateZones();
                player.updateInvs();
                player.updateStats();
                player.updateAfkZones();
                player.encodeOut();
            } catch (err) {
                console.error(err);
                await this.removePlayer(player);
            }
        }
        clientOutput = Date.now() - clientOutput;
        let cleanup = Date.now();
        for (const zone of Array.from(this.zonesTracking.get(this.currentTick) ?? [])) {
            zone.reset();
        }
        this.zonesTracking.delete(this.currentTick);
        for (const player of this.players) {
            player.resetEntity(false);
            for (const inv of player.invs.values()) {
                if (!inv) {
                    continue;
                }
                inv.update = false;
            }
        }
        for (const npc of this.npcs) {
            if (!npc.checkLifeCycle(this.currentTick)) {
                continue;
            }
            npc.resetEntity(false);
        }
        for (let i = 0; i < this.invs.length; i++) {
            const inv = this.invs[i];
            if (!inv) {
                continue;
            }
            inv.update = false;
            const invType = InvType.get(inv.type);
            if (!invType.restock || !invType.stockcount || !invType.stockrate) {
                continue;
            }
            for (let index = 0; index < inv.items.length; index++) {
                const item = inv.items[index];
                if (!item) {
                    continue;
                }
                if (item.count < invType.stockcount[index] && this.currentTick % invType.stockrate[index] === 0) {
                    inv.add(item?.id, 1, index, true, false, false);
                    inv.update = true;
                    continue;
                }
                if (item.count > invType.stockcount[index] && this.currentTick % invType.stockrate[index] === 0) {
                    inv.remove(item?.id, 1, index, true);
                    inv.update = true;
                    continue;
                }
                if (invType.allstock && !invType.stockcount[index] && this.currentTick % 100 === 0) {
                    inv.remove(item?.id, 1, index, true);
                    inv.update = true;
                }
            }
        }
        cleanup = Date.now() - cleanup;
        if (this.currentTick % 100 === 0) {
            const players = [];
            for (const player of this.players) {
                players.push(player.username37);
            }
            Login_default.loginThread.postMessage({
                type: 'heartbeat',
                players
            });
        }
        if (this.shutdownTick > -1 && this.currentTick >= this.shutdownTick) {
            const duration = this.currentTick - this.shutdownTick;
            const online = this.getTotalPlayers();
            if (online) {
                for (const player of this.players) {
                    player.logoutRequested = true;
                    if (isNetworkPlayer(player)) {
                        player.logout();
                        if (player.client && duration > 2) {
                            player.client.close();
                        }
                    }
                }
                this.npcs.reset();
                if (duration > 2) {
                    if (this.tickRate > 1) {
                        this.tickRate = 1;
                    }
                    if (duration > 24000) {
                        for (const player of this.players) {
                            await this.removePlayer(player);
                        }
                        this.tickRate = 600;
                    }
                }
            } else {
                process.exit(0);
            }
        }
        if (this.currentTick % 1500 === 0 && this.currentTick > 0) {
        }
        const end = Date.now();
        this.currentTick++;
        this.lastCycleStats = [end - start, worldProcessing, clientInput, npcProcessing, playerProcessing, playerLogout, playerLogin, zoneProcessing, clientOutput, cleanup];
        if (continueCycle) {
            const nextTick = this.tickRate - (end - start);
            setTimeout(this.cycle.bind(this), nextTick);
        }
    }
    enqueueScript(script, delay = 0) {
        this.queue.addTail(new EntityQueueState(script, delay + 1));
    }
    getInventory(inv) {
        if (inv === -1) {
            return null;
        }
        let container = this.invs.find(x => x && x.type == inv);
        if (!container) {
            container = Inventory.fromType(inv);
            this.invs.push(container);
        }
        return container;
    }
    getZone(x, z2, level) {
        return this.zoneMap.zone(x, z2, level);
    }
    getZoneIndex(zoneIndex) {
        return this.zoneMap.zoneByIndex(zoneIndex);
    }
    getZoneGrid(level) {
        return this.zoneMap.grid(level);
    }
    computeSharedEvents() {
        const zones = new Set();
        for (const player of this.players) {
            if (!isNetworkPlayer(player)) {
                continue;
            }
            for (const zone of player.buildArea.loadedZones) {
                zones.add(zone);
            }
        }
        for (const zoneIndex of zones) {
            this.getZoneIndex(zoneIndex).computeShared();
        }
    }
    addNpc(npc, duration) {
        this.npcs.set(npc.nid, npc);
        npc.x = npc.startX;
        npc.z = npc.startZ;
        const zone = this.getZone(npc.x, npc.z, npc.level);
        zone.enter(npc);
        switch (npc.blockWalk) {
            case BlockWalk_default.NPC:
                this.gameMap.changeNpcCollision(npc.width, npc.x, npc.z, npc.level, true);
                break;
            case BlockWalk_default.ALL:
                this.gameMap.changeNpcCollision(npc.width, npc.x, npc.z, npc.level, true);
                this.gameMap.changePlayerCollision(npc.width, npc.x, npc.z, npc.level, true);
                break;
        }
        npc.resetEntity(true);
        npc.playAnimation(-1, 0);
        npc.setLifeCycle(this.currentTick + duration);
    }
    removeNpc(npc, duration) {
        const zone = this.getZone(npc.x, npc.z, npc.level);
        zone.leave(npc);
        switch (npc.blockWalk) {
            case BlockWalk_default.NPC:
                this.gameMap.changeNpcCollision(npc.width, npc.x, npc.z, npc.level, false);
                break;
            case BlockWalk_default.ALL:
                this.gameMap.changeNpcCollision(npc.width, npc.x, npc.z, npc.level, false);
                this.gameMap.changePlayerCollision(npc.width, npc.x, npc.z, npc.level, false);
                break;
        }
        if (npc.lifecycle === EntityLifeCycle_default.DESPAWN) {
            this.npcs.remove(npc.nid);
        } else if (npc.lifecycle === EntityLifeCycle_default.RESPAWN) {
            npc.setLifeCycle(this.currentTick + duration);
        }
    }
    getLoc(x, z2, level, locId) {
        return this.getZone(x, z2, level).getLoc(x, z2, locId);
    }
    getObj(x, z2, level, objId, receiverId) {
        return this.getZone(x, z2, level).getObj(x, z2, objId, receiverId);
    }
    trackZone(tick, zone) {
        let zones;
        const active = this.zonesTracking.get(tick);
        if (!active) {
            zones = new Set();
        } else {
            zones = active;
        }
        zones.add(zone);
        this.zonesTracking.set(tick, zones);
    }
    addLoc(loc, duration) {
        const type = LocType.get(loc.type);
        if (type.blockwalk) {
            this.gameMap.changeLocCollision(loc.shape, loc.angle, type.blockrange, type.length, type.width, type.active, loc.x, loc.z, loc.level, true);
        }
        const zone = this.getZone(loc.x, loc.z, loc.level);
        zone.addLoc(loc);
        loc.setLifeCycle(this.currentTick + duration);
        this.trackZone(this.currentTick + duration, zone);
        this.trackZone(this.currentTick, zone);
    }
    mergeLoc(loc, player, startCycle, endCycle, south, east, north, west) {
        const zone = this.getZone(loc.x, loc.z, loc.level);
        zone.mergeLoc(loc, player, startCycle, endCycle, south, east, north, west);
        this.trackZone(this.currentTick, zone);
    }
    animLoc(loc, seq) {
        const zone = this.getZone(loc.x, loc.z, loc.level);
        zone.animLoc(loc, seq);
        this.trackZone(this.currentTick, zone);
    }
    removeLoc(loc, duration) {
        const type = LocType.get(loc.type);
        if (type.blockwalk) {
            this.gameMap.changeLocCollision(loc.shape, loc.angle, type.blockrange, type.length, type.width, type.active, loc.x, loc.z, loc.level, false);
        }
        const zone = this.getZone(loc.x, loc.z, loc.level);
        zone.removeLoc(loc);
        loc.setLifeCycle(this.currentTick + duration);
        this.trackZone(this.currentTick + duration, zone);
        this.trackZone(this.currentTick, zone);
    }
    addObj(obj, receiverId, duration) {
        const objType = ObjType.get(obj.type);
        const existing = this.getObj(obj.x, obj.z, obj.level, obj.type, receiverId);
        if (existing && existing.lifecycle === EntityLifeCycle_default.DESPAWN && obj.lifecycle === EntityLifeCycle_default.DESPAWN) {
            const nextCount = obj.count + existing.count;
            if (objType.stackable && nextCount <= Inventory.STACK_LIMIT) {
                this.changeObj(existing, receiverId, nextCount);
                return;
            }
        }
        const zone = this.getZone(obj.x, obj.z, obj.level);
        zone.addObj(obj, receiverId);
        if (receiverId !== -1 && objType.tradeable) {
            obj.setLifeCycle(this.currentTick + 100);
            this.trackZone(this.currentTick + 100, zone);
            this.trackZone(this.currentTick, zone);
            obj.receiverId = receiverId;
            obj.reveal = duration;
        } else {
            obj.setLifeCycle(this.currentTick + duration);
            this.trackZone(this.currentTick + duration, zone);
            this.trackZone(this.currentTick, zone);
        }
    }
    revealObj(obj) {
        const duration = obj.reveal;
        const zone = this.getZone(obj.x, obj.z, obj.level);
        zone.revealObj(obj, obj.receiverId);
        obj.setLifeCycle(this.currentTick + duration);
        this.trackZone(this.currentTick + duration, zone);
        this.trackZone(this.currentTick, zone);
    }
    changeObj(obj, receiverId, newCount) {
        const zone = this.getZone(obj.x, obj.z, obj.level);
        zone.changeObj(obj, receiverId, obj.count, newCount);
        this.trackZone(this.currentTick, zone);
    }
    removeObj(obj, duration) {
        const zone = this.getZone(obj.x, obj.z, obj.level);
        zone.removeObj(obj);
        obj.setLifeCycle(this.currentTick + duration);
        this.trackZone(this.currentTick + duration, zone);
        this.trackZone(this.currentTick, zone);
    }
    animMap(level, x, z2, spotanim, height, delay) {
        const zone = this.getZone(x, z2, level);
        zone.animMap(x, z2, spotanim, height, delay);
        this.trackZone(this.currentTick, zone);
    }
    mapProjAnim(level, x, z2, dstX, dstZ, target, spotanim, srcHeight, dstHeight, startDelay, endDelay, peak, arc) {
        const zone = this.getZone(x, z2, level);
        zone.mapProjAnim(x, z2, dstX, dstZ, target, spotanim, srcHeight, dstHeight, startDelay, endDelay, peak, arc);
        this.trackZone(this.currentTick, zone);
    }
    async readIn(socket, stream) {
        while (stream.available > 0) {
            const start = stream.pos;
            let opcode = stream.g1();
            if (socket.decryptor) {
                opcode = (opcode - socket.decryptor.nextInt()) & 255;
                stream.data[start] = opcode;
            }
            if (typeof ClientProt.byId[opcode] === 'undefined') {
                socket.state = -1;
                socket.close();
                return;
            }
            let length = ClientProt.byId[opcode].length;
            if (length === -1) {
                length = stream.g1();
            } else if (length === -2) {
                length = stream.g2();
            }
            if (stream.available < length) {
                break;
            }
            stream.pos += length;
            socket.inCount[opcode]++;
            if (socket.inCount[opcode] > 5) {
                continue;
            }
            const data = new Uint8Array(stream.pos - start);
            const pos = stream.pos;
            stream.pos = start;
            stream.gdata(data, 0, data.length);
            stream.pos = pos;
            socket.in.set(data, socket.inOffset);
            socket.inOffset += stream.pos - start;
        }
    }
    addPlayer(player) {
        this.newPlayers.push(player);
    }
    async removePlayer(player) {
        if (player.pid === -1) {
            return;
        }
        player.playerLog('Logging out');
        if (isNetworkPlayer(player)) {
            player.logout();
            player.client.close();
            player.client = null;
        }
        Login_default.logout(player);
    }
    getPlayer(pid) {
        return this.players.get(pid);
    }
    getPlayerByUid(uid) {
        const pid = uid & 2047;
        const name37 = (uid >> 11) & 2097151;
        const player = this.getPlayer(pid);
        if (!player) {
            return null;
        }
        if (Number(player.username37 & 0x1fffffn) !== name37) {
            return null;
        }
        return player;
    }
    getPlayerByUsername(username) {
        const username37 = toBase37(username);
        for (const player of this.players) {
            if (player.username37 === username37) {
                return player;
            }
        }
        for (const player of this.newPlayers) {
            if (player.username37 === username37) {
                return player;
            }
        }
        return;
    }
    getTotalPlayers() {
        return this.players.count;
    }
    getTotalNpcs() {
        return this.npcs.count;
    }
    getNpc(nid) {
        return this.npcs.get(nid);
    }
    getNpcByUid(uid) {
        const slot = uid & 65535;
        const type = (uid >> 16) & 65535;
        const npc = this.getNpc(slot);
        if (!npc || npc.type !== type) {
            return null;
        }
        return npc;
    }
    getNextNid() {
        return this.npcs.next();
    }
    getNextPid(client = null) {
        if (client) {
            const ip = client.remoteAddress;
            const octets = ip.split('.');
            const start = (parseInt(octets[3]) % 20) * 100;
            return this.players.next(true, start);
        }
        return this.players.next();
    }
}
var World_default = new World35();

// src/lostcity/server/WorkerServer.ts
class WorkerServer {
    socket = new ClientSocket();
    constructor() {}
    start() {
        const seed = new Packet(new Uint8Array(4 + 4));
        seed.p4(Math.floor(Math.random() * 4294967295));
        seed.p4(Math.floor(Math.random() * 4294967295));
        this.socket.send(seed.data);
        self.onmessage = async e => {
            const packet = new Packet(new Uint8Array(e.data));
            switch (e.type) {
                case 'message':
                    try {
                        if (this.socket.state === 1) {
                            await World_default.readIn(this.socket, packet);
                        } else {
                            await Login_default.readIn(this.socket, packet);
                        }
                    } catch (err) {
                        this.socket.close();
                    }
                    break;
                default:
                    console.log('default', e.type);
                    break;
            }
        };
    }
}

// src/lostcity/app.ts
await World_default.start();
var workerServer = new WorkerServer();
workerServer.start();
