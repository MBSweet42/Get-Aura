import { renderOverworldSVG } from './scenery.js';

const PLACE_META = [
    { id: 'quests', icon: '📜', label: 'The Notice Hollow', glow: '#fab219' },
    { id: 'reset', icon: '🔮', label: 'Stillwater Falls', glow: '#1baf7a' },
    { id: 'squad', icon: '🔥', label: 'Gathering Hearth', glow: '#e87ba4' },
    { id: 'progress', icon: '⛰️', label: 'The Grove', glow: '#9085e9' },
];

export function placeById(id) {
    return PLACE_META.find((p) => p.id === id);
}

export function renderGround() {
    return `<div class="world-ground">${renderOverworldSVG()}</div>`;
}

export function wireMapNodes(container, onNavigate) {
    container.querySelectorAll('[data-nav]').forEach((el) => {
        el.addEventListener('click', () => onNavigate(el.dataset.nav));
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate(el.dataset.nav);
            }
        });
    });
}

export function renderStars(count = 16) {
    let html = '';
    for (let i = 0; i < count; i++) {
        const left = Math.random() * 100;
        const top = Math.random() * 42;
        const delay = (Math.random() * 4).toFixed(2);
        const duration = (2.5 + Math.random() * 2.5).toFixed(2);
        html += `<span class="world-star" style="left:${left}%; top:${top}%; animation-delay:${delay}s; animation-duration:${duration}s;"></span>`;
    }
    return html;
}

const SPARKLE_GLYPHS = ['✨', '⋆', '·'];

export function renderSparkles(count = 8) {
    let html = '';
    for (let i = 0; i < count; i++) {
        const glyph = SPARKLE_GLYPHS[Math.floor(Math.random() * SPARKLE_GLYPHS.length)];
        const left = Math.random() * 100;
        const top = 5 + Math.random() * 50;
        const delay = (Math.random() * 3).toFixed(2);
        const duration = (3 + Math.random() * 2.5).toFixed(2);
        html += `<span class="world-sparkle" style="left:${left}%; top:${top}%; animation-delay:${delay}s; animation-duration:${duration}s;">${glyph}</span>`;
    }
    return html;
}
