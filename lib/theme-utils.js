export const NI_THEME_DEFAULT = {
    primary: '#A0445E',
    primaryHover: '#8B3A50',
    primaryFocus: '#B8336A',
    primarySoft: '#F5E6EC',
    primarySoft2: '#FBF2F6',
    primarySoftText: '#8B3A50',
    primaryBorder: '#DDB5C0',
    primaryBorderStrong: '#E0C0CA',
    primaryOn: '#F5E6EC',
    success: '#1D9E75',
    successSoft: '#E1F5EE',
    successSoft2: '#EEF9F5',
    successText: '#0F6E56',
    successBorder: '#B9E3D4',
    successHover: '#C5EAD9',
    pivot: '#D68AC2',
    pivotSoft: '#FCF7FB',
    pivotSoft2: '#FDFAFD',
    pivotText: '#7C5071',
    pivotBorder: '#EAC2DF',
    pivotHover: '#F2DAEB',
    pivotOn: '#FFFFFF',
    warning: '#C05A62',
    warningSoft: '#FDE8EA',
    warningSoft2: '#FFF5F6',
    warningText: '#C05A62',
    warningBorder: '#EDB6BB',
    background: '#FFFDFA',
    text: '#000000',
};

export const NI_THEME_BUILTIN_PRESETS = [
    {
        id: 'default',
        name: '默认',
        colors: { ...NI_THEME_DEFAULT },
    },
    {
        id: 'paper-note',
        name: '星糖梦簿',
        colors: {
            primary: '#B84D78',
            success: '#6DAFE8',
            pivot: '#D68AC2',
            warning: '#C86A85',
            background: '#FFF7FC',
            text: '#6A3C50',
        },
    },
];

export function niNormalizeHex(value, fallback = NI_THEME_DEFAULT.primary) {
    const raw = String(value || '').trim();
    if (/^#[0-9a-fA-F]{6}$/.test(raw)) return raw.toUpperCase();
    if (/^#[0-9a-fA-F]{3}$/.test(raw)) {
        return ('#' + raw.slice(1).split('').map(ch => ch + ch).join('')).toUpperCase();
    }
    return fallback;
}

function niHexToRgb(hex) {
    const v = niNormalizeHex(hex).slice(1);
    return {
        r: parseInt(v.slice(0, 2), 16),
        g: parseInt(v.slice(2, 4), 16),
        b: parseInt(v.slice(4, 6), 16),
    };
}

function niRgbToHex({ r, g, b }) {
    const part = n => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
    return `#${part(r)}${part(g)}${part(b)}`.toUpperCase();
}

function niMixHex(a, b, amount) {
    const ca = niHexToRgb(a);
    const cb = niHexToRgb(b);
    const t = Math.max(0, Math.min(1, amount));
    return niRgbToHex({
        r: ca.r + (cb.r - ca.r) * t,
        g: ca.g + (cb.g - ca.g) * t,
        b: ca.b + (cb.b - ca.b) * t,
    });
}

function niRgba(hex, alpha) {
    const c = niHexToRgb(hex);
    return `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
}

function niContrastText(hex) {
    const c = niHexToRgb(hex);
    const luminance = (0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b) / 255;
    return luminance > 0.58 ? '#1A1A1A' : '#FFFFFF';
}

function niNormalizePresetColors(colors = {}) {
    return {
        primary: niNormalizeHex(colors.primary, NI_THEME_DEFAULT.primary),
        success: niNormalizeHex(colors.success, NI_THEME_DEFAULT.success),
        pivot: niNormalizeHex(colors.pivot, NI_THEME_DEFAULT.pivot),
        warning: niNormalizeHex(colors.warning, NI_THEME_DEFAULT.warning),
        background: niNormalizeHex(colors.background, NI_THEME_DEFAULT.background),
        text: niNormalizeHex(colors.text, NI_THEME_DEFAULT.text),
    };
}

function niGetBuiltinPreset(id) {
    return NI_THEME_BUILTIN_PRESETS.find(item => item.id === id) || NI_THEME_BUILTIN_PRESETS[0];
}

function niGetUserPreset(cfg, id) {
    const presets = Array.isArray(cfg.themeUserPresets) ? cfg.themeUserPresets : [];
    return presets.find(item => item && item.id === id);
}

function niGetPresetColors(cfg, preset) {
    if (preset === 'custom') {
        return niNormalizePresetColors({
            primary: cfg.themePrimary,
            success: cfg.themeSuccess,
            pivot: cfg.themePivot,
            warning: cfg.themeWarning,
            background: cfg.themeBackground,
            text: cfg.themeText,
        });
    }
    if (preset?.startsWith('user:')) {
        const userPreset = niGetUserPreset(cfg, preset.slice(5));
        if (userPreset) return niNormalizePresetColors(userPreset.colors);
    }
    return niNormalizePresetColors(niGetBuiltinPreset(preset).colors);
}

export function niGetTheme(cfg = {}) {
    const preset = cfg.themePreset || 'default';
    const surfaceFollowPreset = cfg.themeSurfaceFollowPreset !== false;
    const presetColors = niGetPresetColors(cfg, preset);
    const background = surfaceFollowPreset ? presetColors.background : niNormalizeHex(cfg.themeBackground, NI_THEME_DEFAULT.background);
    const text = surfaceFollowPreset ? presetColors.text : niNormalizeHex(cfg.themeText, NI_THEME_DEFAULT.text);
    const surface = { surfaceFollowPreset, surfaceEnabled: !surfaceFollowPreset, disablePresetGlass: !surfaceFollowPreset, background, text };

    const primary = presetColors.primary;
    const success = presetColors.success;
    const pivot = presetColors.pivot;
    const warning = presetColors.warning;
    return {
        ...surface,
        primary,
        primaryHover: niMixHex(primary, '#000000', 0.16),
        primaryFocus: niMixHex(primary, '#000000', 0.08),
        primarySoft: niMixHex(primary, '#FFFFFF', 0.86),
        primarySoft2: niMixHex(primary, '#FFFFFF', 0.91),
        primarySoftText: niMixHex(primary, '#000000', 0.28),
        primaryBorder: niMixHex(primary, '#FFFFFF', 0.58),
        primaryBorderStrong: niMixHex(primary, '#FFFFFF', 0.46),
        primaryOn: niContrastText(primary),
        success,
        successSoft: niMixHex(success, '#FFFFFF', 0.86),
        successSoft2: niMixHex(success, '#FFFFFF', 0.91),
        successText: niMixHex(success, '#000000', 0.30),
        successBorder: niMixHex(success, '#FFFFFF', 0.58),
        successHover: niMixHex(success, '#FFFFFF', 0.68),
        pivot,
        pivotSoft: niMixHex(pivot, '#FFFFFF', 0.93),
        pivotSoft2: niMixHex(pivot, '#FFFFFF', 0.96),
        pivotText: niMixHex(pivot, '#000000', 0.42),
        pivotBorder: niMixHex(pivot, '#FFFFFF', 0.48),
        pivotHover: niMixHex(pivot, '#FFFFFF', 0.68),
        pivotOn: niContrastText(pivot),
        warning,
        warningSoft: niMixHex(warning, '#FFFFFF', 0.84),
        warningSoft2: niMixHex(warning, '#FFFFFF', 0.91),
        warningText: niMixHex(warning, '#000000', 0.10),
        warningBorder: niMixHex(warning, '#FFFFFF', 0.50),
    };
}

const NI_SURFACE_PROPS = [
    '--ni-surface-bg',
    '--ni-surface-text',
    '--color-background-primary',
    '--color-background-secondary',
    '--color-background-tertiary',
    '--color-text-primary',
    '--color-text-secondary',
    '--color-text-tertiary',
    '--color-border-secondary',
    '--color-border-tertiary',
];

const NI_GLASS_PROPS = [
    '--ni-popup-overlay-bg',
    '--ni-popup-backdrop-filter',
];

function niIsAppSurface(el) {
    return !!el && (el.id === 'ni-app' || el.classList?.contains('ni-app'));
}

function niClearSurfaceSettings(el) {
    NI_SURFACE_PROPS.forEach(name => el.style.removeProperty(name));
}

function niClearGlassSettings(el) {
    NI_GLASS_PROPS.forEach(name => el.style.removeProperty(name));
}

function niToggleSolidSurface(el, enabled) {
    if (niIsAppSurface(el)) el.classList?.toggle('ni-surface-solid', !!enabled);
}

export function niApplyThemeSettings(cfg = {}, targets = []) {
    const theme = niGetTheme(cfg);
    const roots = targets.filter(Boolean);
    roots.forEach(el => {
        el.style.setProperty('--ni-primary', theme.primary);
        el.style.setProperty('--ni-primary-hover', theme.primaryHover);
        el.style.setProperty('--ni-primary-focus', theme.primaryFocus);
        el.style.setProperty('--ni-primary-soft', theme.primarySoft);
        el.style.setProperty('--ni-primary-soft-2', theme.primarySoft2);
        el.style.setProperty('--ni-primary-soft-text', theme.primarySoftText);
        el.style.setProperty('--ni-primary-border', theme.primaryBorder);
        el.style.setProperty('--ni-primary-border-strong', theme.primaryBorderStrong);
        el.style.setProperty('--ni-primary-on', theme.primaryOn);
        el.style.setProperty('--ni-primary-alpha-07', niRgba(theme.primary, 0.07));
        el.style.setProperty('--ni-primary-alpha-08', niRgba(theme.primary, 0.08));
        el.style.setProperty('--ni-primary-alpha-12', niRgba(theme.primary, 0.12));
        el.style.setProperty('--ni-primary-alpha-15', niRgba(theme.primary, 0.15));
        el.style.setProperty('--ni-primary-alpha-30', niRgba(theme.primary, 0.30));
        el.style.setProperty('--ni-primary-alpha-40', niRgba(theme.primary, 0.40));
        el.style.setProperty('--ni-success', theme.success);
        el.style.setProperty('--ni-success-soft', theme.successSoft);
        el.style.setProperty('--ni-success-soft-2', theme.successSoft2);
        el.style.setProperty('--ni-success-text', theme.successText);
        el.style.setProperty('--ni-success-border', theme.successBorder);
        el.style.setProperty('--ni-success-hover', theme.successHover);
        el.style.setProperty('--ni-success-alpha-10', niRgba(theme.success, 0.10));
        el.style.setProperty('--ni-success-alpha-30', niRgba(theme.success, 0.30));
        el.style.setProperty('--ni-pivot', theme.pivot);
        el.style.setProperty('--ni-pivot-soft', theme.pivotSoft);
        el.style.setProperty('--ni-pivot-soft-2', theme.pivotSoft2);
        el.style.setProperty('--ni-pivot-text', theme.pivotText);
        el.style.setProperty('--ni-pivot-border', theme.pivotBorder);
        el.style.setProperty('--ni-pivot-hover', theme.pivotHover);
        el.style.setProperty('--ni-pivot-on', theme.pivotOn);
        el.style.setProperty('--ni-pivot-alpha-10', niRgba(theme.pivot, 0.10));
        el.style.setProperty('--ni-pivot-alpha-20', niRgba(theme.pivot, 0.20));
        el.style.setProperty('--ni-warning', theme.warning);
        el.style.setProperty('--ni-warning-soft', theme.warningSoft);
        el.style.setProperty('--ni-warning-soft-2', theme.warningSoft2);
        el.style.setProperty('--ni-warning-text', theme.warningText);
        el.style.setProperty('--ni-warning-border', theme.warningBorder);
        el.style.setProperty('--ni-warning-alpha-03', niRgba(theme.warning, 0.03));
        el.style.setProperty('--ni-warning-alpha-06', niRgba(theme.warning, 0.06));
        el.style.setProperty('--ni-warning-alpha-12', niRgba(theme.warning, 0.12));
        el.style.setProperty('--ni-warning-alpha-14', niRgba(theme.warning, 0.14));
        el.style.setProperty('--ni-warning-alpha-15', niRgba(theme.warning, 0.15));
        el.style.setProperty('--ni-warning-alpha-20', niRgba(theme.warning, 0.20));
        el.style.setProperty('--ni-warning-alpha-25', niRgba(theme.warning, 0.25));
        el.style.setProperty('--ni-warning-alpha-30', niRgba(theme.warning, 0.30));
        el.style.setProperty('--ni-warning-alpha-35', niRgba(theme.warning, 0.35));
        el.style.setProperty('--ni-warning-alpha-40', niRgba(theme.warning, 0.40));
        el.style.setProperty('--ni-warning-alpha-50', niRgba(theme.warning, 0.50));
        if (theme.disablePresetGlass) {
            el.style.setProperty('--ni-popup-overlay-bg', 'transparent');
            el.style.setProperty('--ni-popup-backdrop-filter', 'none');
        } else {
            niClearGlassSettings(el);
        }
        niToggleSolidSurface(el, theme.disablePresetGlass);
        if (!niIsAppSurface(el)) return;
        if (!theme.surfaceEnabled) {
            niClearSurfaceSettings(el);
            return;
        }
        el.style.setProperty('--ni-surface-bg', theme.background);
        el.style.setProperty('--ni-surface-text', theme.text);
        el.style.setProperty('--color-background-primary', theme.background);
        el.style.setProperty('--color-background-secondary', niMixHex(theme.background, theme.text, 0.04));
        el.style.setProperty('--color-background-tertiary', niMixHex(theme.background, theme.text, 0.07));
        el.style.setProperty('--color-text-primary', theme.text);
        el.style.setProperty('--color-text-secondary', niMixHex(theme.text, theme.background, 0.35));
        el.style.setProperty('--color-text-tertiary', niMixHex(theme.text, theme.background, 0.55));
        el.style.setProperty('--color-border-secondary', niMixHex(theme.background, theme.text, 0.16));
        el.style.setProperty('--color-border-tertiary', niMixHex(theme.background, theme.text, 0.10));
    });
}
