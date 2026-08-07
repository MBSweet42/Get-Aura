const DURATIONS = { mist: 750, door: 750, firelight: 650, leaves: 800 };

const TRANSITION_KIND = {
    quests: 'door',
    reset: 'mist',
    squad: 'firelight',
    progress: 'leaves',
};

export function transitionForPlace(id) {
    return TRANSITION_KIND[id] || 'mist';
}

export function playTransition(kind, onMidpoint) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = `scene-transition scene-transition-${kind}`;

        if (kind === 'door') {
            const door = document.createElement('div');
            door.className = 'door-panel';
            overlay.appendChild(door);
        }

        if (kind === 'leaves') {
            for (let i = 0; i < 6; i++) {
                const leaf = document.createElement('span');
                leaf.className = 'leaf-piece';
                leaf.style.setProperty('--i', i);
                overlay.appendChild(leaf);
            }
        }

        document.body.appendChild(overlay);
        const duration = DURATIONS[kind] || 700;

        setTimeout(() => onMidpoint && onMidpoint(), Math.round(duration * 0.48));
        setTimeout(() => {
            overlay.remove();
            resolve();
        }, duration);
    });
}
