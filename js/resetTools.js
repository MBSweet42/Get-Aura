import { mountPatternBreak, unmountPatternBreak, controlPatternBreak } from './tetris/patternBreak.js';
import { mountThoughtPopper, unmountThoughtPopper } from './games/thoughtPopper.js';
import { mountColorMatch, unmountColorMatch } from './games/colorMatch.js';

export const RESET_TOOLS = [
    {
        id: 'pattern-break',
        name: 'Pattern Break',
        emoji: '🧩',
        when: "a memory or thought loop won't let go",
        blurb: 'Visuospatial play competes for the same mental resources intrusive images use to lodge themselves in memory.',
        reward: { threatRelief: 10, calmGain: 8, xpGain: 10 },
    },
    {
        id: 'thought-popper',
        name: 'Thought Popper',
        emoji: '🫧',
        when: "you're spiraling on \"what ifs\"",
        blurb: "Notice each thought, tap it, let it go — practice not fighting your thoughts, just not holding onto them.",
        reward: { threatRelief: 10, calmGain: 8, xpGain: 10 },
    },
    {
        id: 'color-match',
        name: 'Color Match',
        emoji: '🎨',
        when: "you're overstimulated and need to slow down",
        blurb: 'A slow, untimed focus task — no fail state, just a gentle place to land.',
        reward: { threatRelief: 8, calmGain: 10, xpGain: 8 },
    },
];

export function toolById(id) {
    return RESET_TOOLS.find((t) => t.id === id);
}

let activeToolId = null;

export function mountTool(id, container, onComplete) {
    unmountActiveTool();
    activeToolId = id;

    let awarded = false;
    const fireOnce = () => {
        if (awarded) return;
        awarded = true;
        onComplete();
    };

    if (id === 'pattern-break') {
        mountPatternBreak(container, ({ lines }) => {
            if (lines >= 1) fireOnce();
        });
    } else if (id === 'thought-popper') {
        mountThoughtPopper(container, fireOnce);
    } else if (id === 'color-match') {
        mountColorMatch(container, fireOnce);
    }
}

export function unmountActiveTool() {
    if (activeToolId === 'pattern-break') unmountPatternBreak();
    if (activeToolId === 'thought-popper') unmountThoughtPopper();
    if (activeToolId === 'color-match') unmountColorMatch();
    activeToolId = null;
}

export function activeTool() {
    return activeToolId;
}

export { controlPatternBreak };
