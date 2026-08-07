export const PLACE_NODES = [
    { id: 'quests', icon: '📜', label: 'Quest Board', glow: '#fab219', x: 16, y: 62, delay: '0s' },
    { id: 'reset', icon: '🔮', label: 'Decompress', glow: '#1baf7a', x: 82, y: 48, delay: '0.6s' },
    { id: 'squad', icon: '🔥', label: 'Squad', glow: '#e87ba4', x: 28, y: 84, delay: '1.1s' },
    { id: 'progress', icon: '⛰️', label: 'Progress', glow: '#9085e9', x: 74, y: 84, delay: '1.6s' },
];

export function placeById(id) {
    return PLACE_NODES.find((p) => p.id === id);
}

export function renderPlaceNodes() {
    return PLACE_NODES.map(
        (n) => `
        <button class="place-node" data-nav="${n.id}" style="left:${n.x}%; top:${n.y}%; animation-delay:${n.delay}; --place-glow:${n.glow};">
            <span class="place-orb">${n.icon}</span>
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

export function renderStars(count = 22) {
    let html = '';
    for (let i = 0; i < count; i++) {
        const left = Math.random() * 100;
        const top = Math.random() * 55;
        const delay = (Math.random() * 4).toFixed(2);
        const duration = (2.5 + Math.random() * 2.5).toFixed(2);
        html += `<span class="world-star" style="left:${left}%; top:${top}%; animation-delay:${delay}s; animation-duration:${duration}s;"></span>`;
    }
    return html;
}

const SPARKLE_GLYPHS = ['✨', '⋆', '·'];

export function renderSparkles(count = 10) {
    let html = '';
    for (let i = 0; i < count; i++) {
        const glyph = SPARKLE_GLYPHS[Math.floor(Math.random() * SPARKLE_GLYPHS.length)];
        const left = Math.random() * 100;
        const top = 5 + Math.random() * 85;
        const delay = (Math.random() * 3).toFixed(2);
        const duration = (3 + Math.random() * 2.5).toFixed(2);
        html += `<span class="world-sparkle" style="left:${left}%; top:${top}%; animation-delay:${delay}s; animation-duration:${duration}s;">${glyph}</span>`;
    }
    return html;
}
