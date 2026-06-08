import { NI_THEME_DEFAULT, niGetTheme } from './theme-utils.js';

const NI_STATUSBAR_THEME_STYLE_ID = 'ni-statusbar-theme-css';

function niEnsureStatusbarThemeStyle() {
    if (document.getElementById(NI_STATUSBAR_THEME_STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = NI_STATUSBAR_THEME_STYLE_ID;
    style.textContent = `
#ni-storybar.ni-tb-theme-follow {
  background: var(--ni-tb-theme-bg) !important;
  backdrop-filter: var(--ni-tb-theme-backdrop, none) !important;
  -webkit-backdrop-filter: var(--ni-tb-theme-backdrop, none) !important;
  border-color: var(--ni-tb-theme-secondary-border) !important;
  color: var(--ni-tb-theme-text) !important;
}
#ni-storybar.ni-tb-theme-follow .ni-tb-bar,
#ni-storybar.ni-tb-theme-follow .ni-tb-selrow,
#ni-storybar.ni-tb-theme-follow .ni-tb-drop-panel,
#ni-storybar.ni-tb-theme-follow .ni-tb-carousel-wrap,
#ni-storybar.ni-tb-theme-follow .ni-tb-infer-block {
  background: var(--ni-tb-theme-bg) !important;
  color: var(--ni-tb-theme-text) !important;
}
#ni-storybar.ni-tb-theme-follow .ni-tb-curtitle,
#ni-storybar.ni-tb-theme-follow .ni-tb-sc-title,
#ni-storybar.ni-tb-theme-follow .ni-tb-infer-title,
#ni-storybar.ni-tb-theme-follow .ni-tb-np-row.active .ni-tb-np-title {
  color: var(--ni-tb-theme-text) !important;
}
#ni-storybar.ni-tb-theme-follow .ni-tb-meta,
#ni-storybar.ni-tb-theme-follow .ni-tb-chevron,
#ni-storybar.ni-tb-theme-follow .ni-tb-sp-label,
#ni-storybar.ni-tb-theme-follow .ni-tb-section-icon,
#ni-storybar.ni-tb-theme-follow .ni-tb-section-label,
#ni-storybar.ni-tb-theme-follow .ni-tb-section-count,
#ni-storybar.ni-tb-theme-follow .ni-tb-infer-toggle-label,
#ni-storybar.ni-tb-theme-follow .ni-tb-infer-toggle-icon,
#ni-storybar.ni-tb-theme-follow .ni-tb-sc-num,
#ni-storybar.ni-tb-theme-follow .ni-tb-sp-name,
#ni-storybar.ni-tb-theme-follow .ni-tb-np-title,
#ni-storybar.ni-tb-theme-follow .ni-tb-sc-desc,
#ni-storybar.ni-tb-theme-follow .ni-tb-sc-event,
#ni-storybar.ni-tb-theme-follow .ni-tb-sc-fore,
#ni-storybar.ni-tb-theme-follow .ni-tb-infer-desc {
  color: var(--ni-tb-theme-text-muted) !important;
}
#ni-storybar.ni-tb-theme-follow .ni-tb-pin,
#ni-storybar.ni-tb-theme-follow .ni-tb-sp-row.active-stage .ni-tb-sp-dot,
#ni-storybar.ni-tb-theme-follow .ni-tb-np-dot.done,
#ni-storybar.ni-tb-theme-follow .ni-tb-np-dot.active-dot {
  background: var(--ni-tb-theme-accent) !important;
}
#ni-storybar.ni-tb-theme-follow .ni-tb-np-dot.active-dot {
  box-shadow: 0 0 0 3px var(--ni-tb-theme-accent-soft) !important;
}
#ni-storybar.ni-tb-theme-follow .ni-tb-status,
#ni-storybar.ni-tb-theme-follow .ni-tb-btn-pause {
  background: var(--ni-tb-theme-accent-soft) !important;
  border-color: var(--ni-tb-theme-accent-border) !important;
  color: var(--ni-tb-theme-accent) !important;
}
#ni-storybar.ni-tb-theme-follow .ni-tb-btn-pause:hover,
#ni-storybar.ni-tb-theme-follow .ni-tb-btn-pause.paused {
  background: var(--ni-tb-theme-accent-soft-strong) !important;
  border-color: var(--ni-tb-theme-accent) !important;
}
#ni-storybar.ni-tb-theme-follow .ni-tb-sp-row.active-stage .ni-tb-sp-name,
#ni-storybar.ni-tb-theme-follow .ni-tb-section-count.done-count {
  color: var(--ni-tb-theme-accent) !important;
}
#ni-storybar.ni-tb-theme-follow .ni-tb-sel-btn,
#ni-storybar.ni-tb-theme-follow .ni-tb-btn-free,
#ni-storybar.ni-tb-theme-follow .ni-tb-infer-num,
#ni-storybar.ni-tb-theme-follow .ni-tb-section-count {
  background: var(--ni-tb-theme-secondary-soft) !important;
  border-color: var(--ni-tb-theme-secondary-border) !important;
  color: var(--ni-tb-theme-secondary-text) !important;
}
#ni-storybar.ni-tb-theme-follow .ni-tb-sel-btn:hover,
#ni-storybar.ni-tb-theme-follow .ni-tb-btn-free:hover:not(.loading),
#ni-storybar.ni-tb-theme-follow .ni-tb-infer-item:hover,
#ni-storybar.ni-tb-theme-follow .ni-tb-section-hd:hover,
#ni-storybar.ni-tb-theme-follow .ni-tb-np-row:hover,
#ni-storybar.ni-tb-theme-follow .ni-tb-sp-row:hover,
#ni-storybar.ni-tb-theme-follow .ni-tb-infer-toggle:hover {
  background: var(--ni-tb-theme-secondary-soft-2) !important;
}
#ni-storybar.ni-tb-theme-follow .ni-tb-btn-free.has-result {
  background: var(--ni-tb-theme-secondary-soft) !important;
  border-color: var(--ni-tb-theme-secondary-border) !important;
  color: var(--ni-tb-theme-secondary-text) !important;
}
#ni-storybar.ni-tb-theme-follow .ni-tb-scard {
  background: var(--ni-tb-theme-secondary-soft-2) !important;
  border-color: var(--ni-tb-theme-secondary-border) !important;
  color: var(--ni-tb-theme-text) !important;
}
#ni-storybar.ni-tb-theme-follow .ni-tb-scard.active {
  background: var(--ni-tb-theme-secondary-soft) !important;
  border-color: var(--ni-tb-theme-secondary) !important;
  box-shadow: 0 6px 24px var(--ni-tb-theme-secondary-shadow) !important;
}
#ni-storybar.ni-tb-theme-follow .ni-tb-scard.side-prev,
#ni-storybar.ni-tb-theme-follow .ni-tb-scard.side-next,
#ni-storybar.ni-tb-theme-follow .ni-tb-scard.far {
  background: var(--ni-tb-theme-secondary-soft-2) !important;
}
`;
    document.head.appendChild(style);
}

function niSetStatusbarVar(bar, name, value) {
    if (value) bar.style.setProperty(name, value);
    else bar.style.removeProperty(name);
}

function niCssVar(style, name, fallback = '') {
    const value = style.getPropertyValue(name).trim();
    return value || fallback;
}

function niHexToRgb(hex) {
    const raw = String(hex || '').replace('#', '');
    return {
        r: parseInt(raw.slice(0, 2), 16) || 0,
        g: parseInt(raw.slice(2, 4), 16) || 0,
        b: parseInt(raw.slice(4, 6), 16) || 0,
    };
}

function niRgba(hex, alpha) {
    const c = niHexToRgb(hex);
    return `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
}

function niReadCurrentSurfaceTheme() {
    const app = document.getElementById('ni-app');
    if (!app) return null;
    const style = getComputedStyle(app);
    if (!app.classList.contains('ni-surface-tavern')) return null;
    const blurStrength = niCssVar(style, '--SmartThemeBlurStrength');
    const backdrop = niCssVar(style, '--ni-tavern-backdrop-filter', blurStrength ? `blur(${blurStrength})` : '');
    return {
        background: niCssVar(style, '--SmartThemeBlurTintColor',
            niCssVar(style, '--SmartThemeChatTintColor',
                niCssVar(style, '--color-background-primary', 'transparent'))),
        backdrop,
        text: niCssVar(style, '--SmartThemeBodyColor', niCssVar(style, '--color-text-primary', '#ddd')),
        textMuted: niCssVar(style, '--SmartThemeEmColor',
            niCssVar(style, '--SmartThemeBodyColor',
                niCssVar(style, '--color-text-secondary', '#ddd'))),
    };
}

function niClearStatusbarVars(bar) {
    [
        '--color-background-primary',
        '--color-background-secondary',
        '--color-background-tertiary',
        '--color-text-primary',
        '--color-text-secondary',
        '--color-text-tertiary',
        '--color-border-secondary',
        '--color-border-tertiary',
        '--ni-primary-soft',
        '--ni-primary-soft-text',
        '--ni-success-soft',
        '--ni-success-text',
        '--ni-pivot-soft',
        '--ni-pivot-text',
        '--ni-warning',
        '--ni-warning-soft',
        '--ni-warning-soft-2',
        '--ni-warning-alpha-06',
        '--ni-warning-alpha-12',
        '--ni-warning-alpha-14',
        '--ni-warning-alpha-15',
        '--ni-warning-alpha-20',
        '--ni-warning-alpha-25',
        '--ni-warning-alpha-30',
        '--ni-warning-alpha-35',
        '--ni-warning-alpha-40',
        '--ni-warning-alpha-50',
        '--ni-tb-theme-bg',
        '--ni-tb-theme-backdrop',
        '--ni-tb-theme-text',
        '--ni-tb-theme-text-muted',
        '--ni-tb-theme-accent',
        '--ni-tb-theme-accent-soft',
        '--ni-tb-theme-accent-soft-strong',
        '--ni-tb-theme-accent-border',
        '--ni-tb-theme-secondary',
        '--ni-tb-theme-secondary-soft',
        '--ni-tb-theme-secondary-soft-2',
        '--ni-tb-theme-secondary-text',
        '--ni-tb-theme-secondary-border',
        '--ni-tb-theme-secondary-shadow',
    ].forEach(name => bar.style.removeProperty(name));
}

function niApplyDefaultStatusbarTheme(bar) {
    const theme = niGetTheme({
        themePreset: 'default',
        themeSurfaceFollowPreset: false,
        themePrimary: NI_THEME_DEFAULT.primary,
        themeSuccess: NI_THEME_DEFAULT.success,
        themePivot: NI_THEME_DEFAULT.pivot,
        themeWarning: NI_THEME_DEFAULT.warning,
        themeBackground: NI_THEME_DEFAULT.background,
        themeText: NI_THEME_DEFAULT.text,
    });
    niSetStatusbarVar(bar, '--color-background-primary', '#FFFFFF');
    niSetStatusbarVar(bar, '--color-background-secondary', '#F7F7F8');
    niSetStatusbarVar(bar, '--color-background-tertiary', '#EEEEEF');
    niSetStatusbarVar(bar, '--color-text-primary', '#1A1A1A');
    niSetStatusbarVar(bar, '--color-text-secondary', '#5A5A6A');
    niSetStatusbarVar(bar, '--color-text-tertiary', '#9A9AAA');
    niSetStatusbarVar(bar, '--color-border-secondary', '#D8D8DE');
    niSetStatusbarVar(bar, '--color-border-tertiary', '#E8E8EC');
    niSetStatusbarVar(bar, '--ni-primary-soft', theme.primarySoft);
    niSetStatusbarVar(bar, '--ni-primary-soft-text', theme.primarySoftText);
    niSetStatusbarVar(bar, '--ni-success-soft', theme.successSoft);
    niSetStatusbarVar(bar, '--ni-success-text', theme.successText);
    niSetStatusbarVar(bar, '--ni-pivot-soft', theme.pivotSoft);
    niSetStatusbarVar(bar, '--ni-pivot-text', theme.pivotText);
    niSetStatusbarVar(bar, '--ni-warning', theme.warning);
    niSetStatusbarVar(bar, '--ni-warning-soft', theme.warningSoft);
    niSetStatusbarVar(bar, '--ni-warning-soft-2', theme.warningSoft2);
    niSetStatusbarVar(bar, '--ni-warning-alpha-06', niRgba(theme.warning, 0.06));
    niSetStatusbarVar(bar, '--ni-warning-alpha-12', niRgba(theme.warning, 0.12));
    niSetStatusbarVar(bar, '--ni-warning-alpha-14', niRgba(theme.warning, 0.14));
    niSetStatusbarVar(bar, '--ni-warning-alpha-15', niRgba(theme.warning, 0.15));
    niSetStatusbarVar(bar, '--ni-warning-alpha-20', niRgba(theme.warning, 0.20));
    niSetStatusbarVar(bar, '--ni-warning-alpha-25', niRgba(theme.warning, 0.25));
    niSetStatusbarVar(bar, '--ni-warning-alpha-30', niRgba(theme.warning, 0.30));
    niSetStatusbarVar(bar, '--ni-warning-alpha-35', niRgba(theme.warning, 0.35));
    niSetStatusbarVar(bar, '--ni-warning-alpha-40', niRgba(theme.warning, 0.40));
    niSetStatusbarVar(bar, '--ni-warning-alpha-50', niRgba(theme.warning, 0.50));
}

export function niApplyStatusbarTheme(cfg = {}) {
    const bar = document.getElementById('ni-storybar');
    if (!bar) return;

    const enabled = cfg === true || cfg?.themeStatusbarFollow === true;
    bar.classList.toggle('ni-tb-theme-follow', enabled);
    niClearStatusbarVars(bar);
    if (!enabled) {
        niApplyDefaultStatusbarTheme(bar);
        return;
    }

    niEnsureStatusbarThemeStyle();
    const theme = niGetTheme(typeof cfg === 'object' ? cfg : {});
    const surface = cfg?.themeSurfaceFollowPreset !== false ? niReadCurrentSurfaceTheme() : null;
    niSetStatusbarVar(bar, '--ni-tb-theme-bg', surface?.background || theme.backgroundCss || theme.background);
    niSetStatusbarVar(bar, '--ni-tb-theme-backdrop', surface?.backdrop || 'none');
    niSetStatusbarVar(bar, '--ni-tb-theme-text', surface?.text || theme.text);
    niSetStatusbarVar(bar, '--ni-tb-theme-text-muted', surface?.textMuted || surface?.text || theme.text);
    niSetStatusbarVar(bar, '--ni-tb-theme-accent', theme.pivot);
    niSetStatusbarVar(bar, '--ni-tb-theme-accent-soft', theme.pivotSoft);
    niSetStatusbarVar(bar, '--ni-tb-theme-accent-soft-strong', theme.pivotHover);
    niSetStatusbarVar(bar, '--ni-tb-theme-accent-border', theme.pivotBorder);
    niSetStatusbarVar(bar, '--ni-tb-theme-secondary', theme.success);
    niSetStatusbarVar(bar, '--ni-tb-theme-secondary-soft', theme.successSoft);
    niSetStatusbarVar(bar, '--ni-tb-theme-secondary-soft-2', theme.successSoft2);
    niSetStatusbarVar(bar, '--ni-tb-theme-secondary-text', theme.successText);
    niSetStatusbarVar(bar, '--ni-tb-theme-secondary-border', theme.successBorder);
    niSetStatusbarVar(bar, '--ni-tb-theme-secondary-shadow', 'var(--ni-success-alpha-10, rgba(29, 158, 117, .1))');
}
