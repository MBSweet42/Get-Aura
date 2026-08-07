const GLYPHS = ['✨', '⭐', '💫', '🌟'];

export function celebrate() {
    const layer = document.createElement('div');
    layer.className = 'celebrate-layer';

    for (let i = 0; i < 10; i++) {
        const span = document.createElement('span');
        span.className = 'celebrate-particle';
        span.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

        const dx = (Math.random() - 0.5) * 220;
        const dy = -(110 + Math.random() * 130);
        const delay = Math.random() * 120;
        const size = 14 + Math.random() * 14;

        span.style.setProperty('--dx', `${dx}px`);
        span.style.setProperty('--dy', `${dy}px`);
        span.style.setProperty('--delay', `${delay}ms`);
        span.style.fontSize = `${size}px`;

        layer.appendChild(span);
    }

    document.body.appendChild(layer);
    setTimeout(() => layer.remove(), 1400);
}
