const PAIRS = [
    { id: 'a', color: '#3987e5', icon: '●' },
    { id: 'b', color: '#0ca30c', icon: '▲' },
    { id: 'c', color: '#9085e9', icon: '■' },
    { id: 'd', color: '#d95926', icon: '◆' },
    { id: 'e', color: '#e66767', icon: '★' },
    { id: 'f', color: '#fab219', icon: '✦' },
];

function shuffledTiles() {
    const tiles = [...PAIRS, ...PAIRS];
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    return tiles;
}

let flipTimeout = null;

export function mountColorMatch(container, onComplete) {
    unmountColorMatch();
    const tiles = shuffledTiles();
    let flipped = [];
    const matched = new Set();

    container.innerHTML = `
        <div class="match-grid">
            ${tiles.map((_, i) => `<button class="match-tile" data-index="${i}"><span class="match-tile-face"></span></button>`).join('')}
        </div>
    `;

    const tileEls = [...container.querySelectorAll('.match-tile')];

    function reveal(el, tile) {
        el.classList.add('flipped');
        el.style.setProperty('--tile-color', tile.color);
        el.querySelector('.match-tile-face').textContent = tile.icon;
    }

    function hide(el) {
        el.classList.remove('flipped');
        el.querySelector('.match-tile-face').textContent = '';
    }

    tileEls.forEach((el, i) => {
        el.addEventListener('click', () => {
            if (flipTimeout || flipped.includes(i) || matched.has(i) || flipped.length === 2) return;
            const tile = tiles[i];
            reveal(el, tile);
            flipped.push(i);

            if (flipped.length === 2) {
                const [a, b] = flipped;
                if (tiles[a].id === tiles[b].id) {
                    matched.add(a);
                    matched.add(b);
                    flipped = [];
                    if (matched.size === tiles.length) {
                        setTimeout(() => onComplete && onComplete(), 300);
                    }
                } else {
                    flipTimeout = setTimeout(() => {
                        hide(tileEls[a]);
                        hide(tileEls[b]);
                        flipped = [];
                        flipTimeout = null;
                    }, 700);
                }
            }
        });
    });
}

export function unmountColorMatch() {
    clearTimeout(flipTimeout);
    flipTimeout = null;
}
