const THREAT_STOPS = [
    { at: 0, color: '#0ca30c' },
    { at: 33, color: '#fab219' },
    { at: 66, color: '#ec835a' },
    { at: 100, color: '#e66767' },
];

export function threatColor(value) {
    for (let i = 0; i < THREAT_STOPS.length - 1; i++) {
        const a = THREAT_STOPS[i];
        const b = THREAT_STOPS[i + 1];
        if (value >= a.at && value <= b.at) {
            const t = (value - a.at) / (b.at - a.at);
            return mixHex(a.color, b.color, t);
        }
    }
    return THREAT_STOPS[THREAT_STOPS.length - 1].color;
}

function mixHex(hexA, hexB, t) {
    const a = hexToRgb(hexA);
    const b = hexToRgb(hexB);
    const r = Math.round(a.r + (b.r - a.r) * t);
    const g = Math.round(a.g + (b.g - a.g) * t);
    const bl = Math.round(a.b + (b.b - a.b) * t);
    return `rgb(${r}, ${g}, ${bl})`;
}

function hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function renderMeters(container, state) {
    container.innerHTML = `
        <div class="meter">
            <div class="meter-row">
                <span class="meter-label">Calm HP</span>
                <span class="meter-value" id="calm-value">${Math.round(state.calmHP)}</span>
            </div>
            <div class="meter-track">
                <div class="meter-fill calm" id="calm-fill" style="width:${state.calmHP}%"></div>
            </div>
        </div>
        <div class="meter">
            <div class="meter-row">
                <span class="meter-label">Threat Level</span>
                <span class="meter-value" id="threat-value">${Math.round(state.threatLevel)}</span>
            </div>
            <div class="meter-track">
                <div class="meter-fill" id="threat-fill" style="width:${state.threatLevel}%; background:${threatColor(state.threatLevel)}"></div>
            </div>
        </div>
    `;
}

export function renderHud(state) {
    return `
        <div class="hud-pill" title="Calm HP">
            <span>💙</span>
            <div class="hud-track"><div class="hud-fill" id="hud-calm-fill" style="width:${state.calmHP}%; background:var(--accent-blue);"></div></div>
        </div>
        <div class="hud-pill" title="Threat Level">
            <span>⚡</span>
            <div class="hud-track"><div class="hud-fill" id="hud-threat-fill" style="width:${state.threatLevel}%; background:${threatColor(state.threatLevel)};"></div></div>
        </div>
        <div class="hud-pill" title="Streak">
            <span>🔥</span>
            <span id="hud-streak">${state.streak}</span>
        </div>
    `;
}

export function updateHud(state) {
    const calmFill = document.getElementById('hud-calm-fill');
    if (calmFill) calmFill.style.width = `${state.calmHP}%`;

    const threatFill = document.getElementById('hud-threat-fill');
    if (threatFill) {
        threatFill.style.width = `${state.threatLevel}%`;
        threatFill.style.background = threatColor(state.threatLevel);
    }

    const streakEl = document.getElementById('hud-streak');
    if (streakEl) streakEl.textContent = state.streak;
}
