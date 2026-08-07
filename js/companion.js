import { threatColor } from './meters.js';

const MOODS = [
    { max: 25, face: '😌', label: 'Settled' },
    { max: 50, face: '🙂', label: 'A little wound up' },
    { max: 75, face: '😟', label: 'Activated' },
    { max: 100, face: '😣', label: 'Spiraling' },
];

function moodFor(threatLevel) {
    return MOODS.find((m) => threatLevel <= m.max) || MOODS[MOODS.length - 1];
}

function breatheSpeed(threatLevel) {
    return Math.max(1.1, 3 - (threatLevel / 100) * 1.8);
}

function speechFor(state, mood) {
    if (state.questsCompleted === 0 && !state.lastCheckInDate) {
        return "I'm however you're feeling. Tap me and let's check in.";
    }
    return `${mood.label} — tap me to check in`;
}

export function renderCompanion(state) {
    const mood = moodFor(state.threatLevel);
    const glow = threatColor(state.threatLevel);

    return `
        <button class="world-companion" id="companion" style="--companion-glow:${glow}; --companion-speed:${breatheSpeed(state.threatLevel)}s;">
            <span class="companion-orb-lg"><span id="companion-face">${mood.face}</span></span>
            <span class="companion-speech" id="companion-caption">${speechFor(state, mood)}</span>
        </button>
    `;
}

export function updateCompanion(state) {
    const el = document.getElementById('companion');
    if (!el) return;
    const mood = moodFor(state.threatLevel);

    el.style.setProperty('--companion-glow', threatColor(state.threatLevel));
    el.style.setProperty('--companion-speed', `${breatheSpeed(state.threatLevel)}s`);

    const face = document.getElementById('companion-face');
    if (face) face.textContent = mood.face;

    const caption = document.getElementById('companion-caption');
    if (caption) caption.textContent = speechFor(state, mood);
}
