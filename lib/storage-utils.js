import { niHanziToPinyin } from './pinyin-utils.js';

export function niServerFileId(value) {
    return String(value || '').replace(/^ni_data_/, '');
}

function niAsciiTitleToken(ch) {
    if (/^[A-Za-z0-9-]$/.test(ch)) return ch.toLowerCase();
    if (ch === '_') return '_';
    const pinyin = niHanziToPinyin(ch);
    if (pinyin) return pinyin;
    return `_x${ch.codePointAt(0).toString(36)}_`;
}

export function niSnapshotNamePart(value) {
    const raw = String(value || '')
        .normalize('NFKC')
        .trim()
        .replace(/[\\/:*?"<>|]/g, '_')
        .replace(/\s+/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_+|_+$/g, '');
    let out = '';
    for (const ch of raw) {
        out += niAsciiTitleToken(ch);
    }
    return out.replace(/_+/g, '_').replace(/^_+|_+$/g, '').slice(0, 80) || 'untitled';
}

export function niSnapshotFileKey(name, novelKey = '') {
    const keyPart = niServerFileId(novelKey).replace(/^ni_/, '') || Date.now().toString(36);
    return `ni_${niSnapshotNamePart(name)}_${keyPart}`;
}

export function niServerFileName(fileKey) {
    return `${niServerFileId(fileKey)}.json`;
}

export function niLegacyServerFileNames(key) {
    const id = niServerFileId(key);
    return [
        `novel_injector_${id}.json`,
        `novel_injector_${key}.json`,
        `ni_data_${key}.json`,
    ];
}

export function niServerFileNames(novelKey, fileKey = '') {
    const primary = fileKey || novelKey;
    const names = [niServerFileName(primary), ...niLegacyServerFileNames(primary)];
    if (fileKey && fileKey !== novelKey) {
        names.push(niServerFileName(novelKey), ...niLegacyServerFileNames(novelKey));
    }
    return names.filter((name, idx, arr) => name && arr.indexOf(name) === idx);
}

export function niB64(str) {
    const bytes = new TextEncoder().encode(str);
    const CHUNK = 0x8000;
    let s = '';
    for (let i = 0; i < bytes.length; i += CHUNK) {
        s += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
    }
    return btoa(s);
}

export function niEscHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    }[ch]));
}

export function niEscAttr(value) {
    return niEscHtml(value);
}
