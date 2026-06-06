export function vecToBuffer(arr) {
    const f32 = new Float32Array(arr);
    return f32.buffer.slice(f32.byteOffset, f32.byteOffset + f32.byteLength);
}

export function bufferToVec(buf) {
    if (!buf) return [];
    if (Array.isArray(buf)) return buf;
    try { return Array.from(new Float32Array(buf)); } catch (_) { return []; }
}

export function splitText(text, charLimit) {
    if (!text || !text.trim()) return [];
    const result = [];
    const paras = text.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
    let buf = '';
    for (const para of paras) {
        if (!buf) {
            buf = para;
        } else if (buf.length + 1 + para.length <= charLimit) {
            buf += '\n\n' + para;
        } else {
            if (buf.length > charLimit) {
                const lines = buf.split(/\n/).map(l => l.trim()).filter(Boolean);
                let lineBuf = '';
                for (const line of lines) {
                    if (!lineBuf) {
                        lineBuf = line;
                    } else if (lineBuf.length + 1 + line.length <= charLimit) {
                        lineBuf += '\n' + line;
                    } else {
                        if (lineBuf.length > charLimit) {
                            for (let i = 0; i < lineBuf.length; i += charLimit) result.push(lineBuf.slice(i, i + charLimit));
                        } else {
                            result.push(lineBuf);
                        }
                        lineBuf = line;
                    }
                }
                if (lineBuf) {
                    if (lineBuf.length > charLimit) {
                        for (let i = 0; i < lineBuf.length; i += charLimit) result.push(lineBuf.slice(i, i + charLimit));
                    } else {
                        result.push(lineBuf);
                    }
                }
            } else {
                result.push(buf);
            }
            buf = para;
        }
    }
    if (buf) {
        if (buf.length > charLimit) {
            for (let i = 0; i < buf.length; i += charLimit) result.push(buf.slice(i, i + charLimit));
        } else {
            result.push(buf);
        }
    }
    return result.length ? result : [text.slice(0, charLimit)];
}

export function cosineSim(a, b) {
    if (!a || !b || a.length !== b.length) return 0;
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        na += a[i] * a[i];
        nb += b[i] * b[i];
    }
    const denom = Math.sqrt(na) * Math.sqrt(nb);
    return denom === 0 ? 0 : dot / denom;
}

export function vecToBytes(vectors, dims) {
    if (!vectors.length) return new Uint8Array(0);
    const buf = new ArrayBuffer(vectors.length * dims * 4);
    const view = new Float32Array(buf);
    let off = 0;
    for (const v of vectors) {
        for (let i = 0; i < dims; i++) view[off++] = v[i] || 0;
    }
    return new Uint8Array(buf);
}

export function bytesToVecs(bytes, dims) {
    if (!bytes || bytes.length === 0) return [];
    const view = new Float32Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 4);
    const result = [];
    for (let i = 0; i < view.length; i += dims) result.push(Array.from(view.slice(i, i + dims)));
    return result;
}
