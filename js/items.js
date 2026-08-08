export const ITEMS = {
    'vagus-vibe-check': { emoji: '🎧', name: 'Cozy Headphones', blurb: 'For humming your favorite tune.' },
    'physiological-sigh': { emoji: '🕯️', name: 'Calming Candle', blurb: 'Lit after every good exhale.' },
    'cold-water-reset': { emoji: '🧊', name: 'Ice Roller', blurb: 'Cool, sharp, awake.' },
    'gargle-reset': { emoji: '🍵', name: 'Herbal Tea', blurb: 'Warm mug, steady hands.' },
    'glitch-hunt': { emoji: '🧸', name: 'Comfort Plushie', blurb: 'Something soft to hold onto.' },
    'orienting-scan': { emoji: '🪴', name: 'Potted Plant', blurb: 'Grounded, growing, patient.' },
    'shake-off': { emoji: '🥎', name: 'Stress Ball', blurb: 'Squeeze it all out.' },
    'pmr-sequence': { emoji: '🛌', name: 'Weighted Blanket', blurb: 'Heavy in the best way.' },
    'pattern-break': { emoji: '🧩', name: 'Puzzle Piece', blurb: 'One piece, then the next.' },
    'thought-popper': { emoji: '🫧', name: 'Bubble Jar', blurb: 'Pop, drift, gone.' },
    'color-match': { emoji: '🎨', name: 'Sketchbook', blurb: 'No rules, just color.' },
    'sunrise-stretch': { emoji: '🌅', name: 'Morning Sun Charm', blurb: 'Earned before the day even starts.' },
};

export function itemFor(activity) {
    return activity ? ITEMS[activity] : null;
}

export function totalItemCount() {
    return Object.keys(ITEMS).length;
}

export const CARE_FOCUS_OPTIONS = [
    { id: 'sleep', emoji: '😴', label: 'Better sleep' },
    { id: 'daily-calm', emoji: '🌊', label: 'Staying calm day-to-day' },
    { id: 'self-compassion', emoji: '💛', label: 'Self-compassion' },
    { id: 'presence', emoji: '🧠', label: 'Staying present' },
    { id: 'connection', emoji: '🤝', label: 'Connecting with others' },
];

export function careFocusById(id) {
    return CARE_FOCUS_OPTIONS.find((f) => f.id === id);
}
