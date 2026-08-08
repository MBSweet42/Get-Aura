const DURATIONS = { mist: 700, door: 750, firelight: 650, cupboard: 750 };

const TINTS = {
    mist: 'radial-gradient(circle, #e8f6fb, #a9d4e0)',
    door: 'radial-gradient(circle, #8a6642, #4a3220)',
    firelight: 'radial-gradient(circle, #ffb347, #a34a12)',
    cupboard: 'radial-gradient(circle, #9a7a52, #4a3220)',
};

const TRANSITION_KIND = {
    quests: 'door',
    reset: 'mist',
    squad: 'firelight',
    progress: 'cupboard',
};

export function transitionForPlace(id) {
    return TRANSITION_KIND[id] || 'mist';
}

/**
 * Plays a circular iris transition anchored at `point` (the tapped location,
 * or the back button). The screen irises closed to a tint at the midpoint
 * (when `onMidpoint` swaps the underlying content), then irises back open
 * from the same point to reveal what's now underneath.
 */
export function playTransition(kind, point, onMidpoint) {
    return new Promise((resolve) => {
        const x = point?.clientX ?? window.innerWidth / 2;
        const y = point?.clientY ?? window.innerHeight / 2;
        const duration = DURATIONS[kind] || 700;

        const overlay = document.createElement('div');
        overlay.className = 'scene-transition';
        overlay.style.setProperty('--ox', `${x}px`);
        overlay.style.setProperty('--oy', `${y}px`);
        overlay.style.setProperty('--duration', `${duration}ms`);
        overlay.style.background = TINTS[kind] || TINTS.mist;

        if (kind === 'door') {
            const door = document.createElement('div');
            door.className = 'door-panel';
            overlay.appendChild(door);
        }

        if (kind === 'cupboard') {
            const left = document.createElement('div');
            left.className = 'cupboard-panel cupboard-left';
            const right = document.createElement('div');
            right.className = 'cupboard-panel cupboard-right';
            overlay.appendChild(left);
            overlay.appendChild(right);
        }

        document.body.appendChild(overlay);

        setTimeout(() => onMidpoint && onMidpoint(), Math.round(duration * 0.5));
        setTimeout(() => {
            overlay.remove();
            resolve();
        }, duration);
    });
}

export function pointFromEvent(el, event) {
    if (event && typeof event.clientX === 'number') {
        return { clientX: event.clientX, clientY: event.clientY };
    }
    const rect = el.getBoundingClientRect();
    return { clientX: rect.x + rect.width / 2, clientY: rect.y + rect.height / 2 };
}
