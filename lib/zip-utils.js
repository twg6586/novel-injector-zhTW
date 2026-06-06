export function _u8(str) { return new TextEncoder().encode(str); }
export function _str(u8) { return new TextDecoder().decode(u8); }

export function _buildZip(files) {
    const centralDir = [];
    const parts = [];
    let offset = 0;

    for (const f of files) {
        const nameBytes = _u8(f.name);
        const data = f.data instanceof Uint8Array ? f.data : new Uint8Array(f.data);
        const crc = _crc32(data);
        const header = _localHeader(nameBytes, data.length, crc);
        centralDir.push({ nameBytes, offset, size: data.length, crc });
        parts.push(header, data);
        offset += header.length + data.length;
    }

    const cdParts = centralDir.map(e => _centralHeader(e.nameBytes, e.offset, e.size, e.crc));
    const cdSize = cdParts.reduce((a, b) => a + b.length, 0);
    const eocd = _eocd(centralDir.length, cdSize, offset);

    const total = [...parts, ...cdParts, eocd].reduce((a, b) => a + b.length, 0);
    const out = new Uint8Array(total);
    let pos = 0;
    for (const p of [...parts, ...cdParts, eocd]) { out.set(p, pos); pos += p.length; }
    return out;
}

function _w16(v) { return [v & 0xff, (v >> 8) & 0xff]; }
function _w32(v) { return [v & 0xff, (v >> 8) & 0xff, (v >> 16) & 0xff, (v >> 24) & 0xff]; }

function _localHeader(name, size, crc) {
    return new Uint8Array([
        0x50,0x4b,0x03,0x04, 0x14,0x00, 0x00,0x00, 0x00,0x00,
        0x00,0x00, 0x00,0x00,
        ..._w32(crc), ..._w32(size), ..._w32(size),
        ..._w16(name.length), 0x00,0x00,
        ...name,
    ]);
}

function _centralHeader(name, offset, size, crc) {
    return new Uint8Array([
        0x50,0x4b,0x01,0x02, 0x3f,0x00, 0x14,0x00,
        0x00,0x00, 0x00,0x00, 0x00,0x00, 0x00,0x00,
        ..._w32(crc), ..._w32(size), ..._w32(size),
        ..._w16(name.length), 0x00,0x00, 0x00,0x00, 0x00,0x00,
        0x00,0x00, 0x00,0x00, 0x00,0x00,0x00,0x00,
        ..._w32(offset),
        ...name,
    ]);
}

function _eocd(count, cdSize, cdOffset) {
    return new Uint8Array([
        0x50,0x4b,0x05,0x06, 0x00,0x00, 0x00,0x00,
        ..._w16(count), ..._w16(count),
        ..._w32(cdSize), ..._w32(cdOffset),
        0x00,0x00,
    ]);
}

function _crc32(data) {
    let crc = 0xffffffff;
    for (let i = 0; i < data.length; i++) {
        crc ^= data[i];
        for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
    return (crc ^ 0xffffffff) >>> 0;
}

export function _parseZip(buffer) {
    const view = new DataView(buffer);
    const u8 = new Uint8Array(buffer);
    const files = {};
    let i = 0;
    while (i < u8.length - 4) {
        if (view.getUint32(i, true) !== 0x04034b50) { i++; continue; }
        const nameLen   = view.getUint16(i + 26, true);
        const extraLen  = view.getUint16(i + 28, true);
        const compSize  = view.getUint32(i + 18, true);
        const name      = _str(u8.slice(i + 30, i + 30 + nameLen));
        const dataStart = i + 30 + nameLen + extraLen;
        files[name]     = u8.slice(dataStart, dataStart + compSize);
        i = dataStart + compSize;
    }
    return files;
}
