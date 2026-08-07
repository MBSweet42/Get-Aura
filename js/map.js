import {
    HOBBIT_HOUSE_SVG,
    WATERFALL_SVG,
    COMMUNITY_CENTER_SVG,
    PROGRESS_PLAINS_SVG,
    GROUND_SVG,
} from './scenery.js';

export const PLACE_NODES = [
    { id: 'quests', svg: HOBBIT_HOUSE_SVG, icon: '📜', label: 'Quest Board', glow: '#fab219', x: 20, y: 58 },
    { id: 'reset', svg: WATERFALL_SVG, icon: '🔮', label: 'Decompress', glow: '#1baf7a', x: 78, y: 48 },
    { id: 'squad', svg: COMMUNITY_CENTER_SVG, icon: '🔥', label: 'Squad', glow: '#e87ba4', x: 25, y: 82 },
    { id: 'progress', svg: PROGRESS_PLAINS_SVG, icon: '⛰️', label: 'Progress', glow: '#9085e9', x: 75, y: 80 },
];

export function placeById(id) {
    return PLACE_NODES.find((p) => p.id === id);
}

export function renderGround() {
    return `<div class="world-ground">${GROUND_SVG}</div>`;
}

export function renderPlaceNodes() {
    return PLACE_NODES.map(
        (n) => `
        <button class="place-node structure" data-nav="${n.id}" style="left:${n.x}%; top:${n.y}%; --place-glow:${n.glow};">
            <span class="place-scene">${n.svg}</span>
            <span class="place-label">${n.label}</span>
        </button>
    `
    ).join('');
}

export function wireMapNodes(container, onNavigate) {
    container.querySelectorAll('[data-nav]').forEach((btn) => {
        btn.addEventListener('click', () => onNavigate(btn.dataset.nav));
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
