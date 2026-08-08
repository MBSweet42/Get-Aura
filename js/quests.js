function repeat(step, times) {
    return Array.from({ length: times }, () => step);
}

export const QUESTS = [
    // ---- Common (Threat 1-3) ----
    {
        id: 'vagus-vibe-check',
        tier: 'common',
        title: 'Buzzy Hum',
        desc: "Hum your favorite song like a low-frequency bee — feel it buzz all the way through your chest.",
        creature: '🐝',
        creatureName: 'Buzz',
        creatureLine: 'hums low, waiting for you to join in',
        threatRelief: 10,
        calmGain: 8,
        xpGain: 10,
        steps: [{ text: 'Hum steadily, low in your chest', seconds: 45 }],
    },
    {
        id: 'physiological-sigh',
        tier: 'common',
        title: 'Double Sigh',
        desc: "Two quick sniffs in, one long breath out. Your body's built-in exhale button — use it anytime.",
        creature: '🌬️',
        creatureName: 'Zephyr',
        creatureLine: 'breathes slow, showing you the rhythm',
        threatRelief: 12,
        calmGain: 8,
        xpGain: 10,
        steps: repeat({ text: 'Two sharp inhales through the nose, one long slow exhale through the mouth', seconds: 8 }, 5),
    },
    {
        id: 'cold-water-reset',
        tier: 'common',
        title: 'Cold Splash',
        desc: "Splash your face with cold water, or press an ice cube to your cheeks. Instant \"okay, we're good\" switch.",
        creature: '❄️',
        creatureName: 'Frost',
        creatureLine: 'sparkles, ready to snap you awake',
        threatRelief: 12,
        calmGain: 8,
        xpGain: 10,
        steps: [{ text: 'Splash cold water on your face, or hold an ice cube to your cheeks', seconds: 30 }],
    },
    {
        id: 'gargle-reset',
        tier: 'common',
        title: 'Gargle Party',
        desc: "Gargle like you're auditioning for a pirate movie. Silly on purpose — and it actually works.",
        creature: '🐸',
        creatureName: 'Ribbit',
        creatureLine: 'croaks a silly greeting',
        threatRelief: 10,
        calmGain: 8,
        xpGain: 10,
        steps: [{ text: 'Gargle water as vigorously as you can', seconds: 30 }],
    },

    // ---- Rare (Threat 4-7) ----
    {
        id: 'glitch-hunt',
        tier: 'rare',
        title: 'The Glitch Hunt',
        desc: "Your brain's playing previews for a movie that hasn't happened yet. Pull it back — name what's actually here with you right now.",
        creature: '👁️',
        creatureName: 'Pixel',
        creatureLine: 'blinks, scanning the room with you',
        threatRelief: 18,
        calmGain: 14,
        xpGain: 18,
        steps: [
            { type: 'input', text: 'Name 5 things you can see', count: 5 },
            { type: 'input', text: 'Name 4 things you can touch', count: 4 },
            { type: 'input', text: 'Name 3 things you can hear', count: 3 },
            { type: 'input', text: 'Name 2 things you can smell', count: 2 },
            { type: 'input', text: 'Name 1 thing you can taste', count: 1 },
        ],
    },
    {
        id: 'orienting-scan',
        tier: 'rare',
        title: 'Room Scan',
        desc: "Slow head turn, big look around. Let your eyes remind the rest of you exactly where you are.",
        creature: '🦉',
        creatureName: 'Hoot',
        creatureLine: 'turns a slow, watchful head',
        threatRelief: 16,
        calmGain: 12,
        xpGain: 16,
        steps: [
            { text: 'Slowly turn your head left, then right, taking in the room', seconds: 20 },
            { text: 'Let your eyes land on something you like the look of', seconds: 20 },
            { text: 'Notice the surface under you supporting your weight', seconds: 20 },
        ],
    },

    // ---- Boss (Threat 8-10) ----
    {
        id: 'shake-off',
        tier: 'boss',
        title: 'The Shake-Off',
        desc: 'Tense up like a superhero holding a pose, then flop like cooked spaghetti. Shake out whatever got stuck.',
        creature: '⚡',
        creatureName: 'Zap',
        creatureLine: 'crackles with restless energy',
        threatRelief: 28,
        calmGain: 20,
        xpGain: 28,
        steps: repeat({ text: 'Tense every muscle into a hard ball for 5 seconds… then drop like a ragdoll', seconds: 10 }, 3),
    },
    {
        id: 'pmr-sequence',
        tier: 'boss',
        title: 'Full-Body Squeeze',
        desc: 'Squeeze each muscle group as tight as you can, then let it go completely. One big full-body reset, head to toe.',
        creature: '🍃',
        creatureName: 'Willow',
        creatureLine: 'sways, patient and unhurried',
        threatRelief: 30,
        calmGain: 22,
        xpGain: 30,
        steps: [
            { text: 'Squeeze your feet and calves tight… then release', seconds: 15 },
            { text: 'Squeeze your thighs and glutes tight… then release', seconds: 15 },
            { text: 'Squeeze your stomach and chest tight… then release', seconds: 15 },
            { text: 'Squeeze your hands and arms tight… then release', seconds: 15 },
            { text: 'Scrunch your face and shoulders tight… then release', seconds: 15 },
            { text: 'Let your whole body go heavy and loose', seconds: 15 },
        ],
    },
];

export const SUNRISE_STRETCH = {
    id: 'sunrise-stretch',
    tier: 'common',
    daily: true,
    title: 'Sunrise Stretch',
    desc: 'A quick whole-body wake-up sequence — inspired by the daily radio calisthenics that got Japan moving every morning for a century. No mat, no gear, just movement.',
    creature: '🧙',
    creatureName: 'Sage',
    creatureLine: 'stretches an arm overhead, waiting for you to match',
    threatRelief: 10,
    calmGain: 18,
    xpGain: 22,
    steps: [
        { text: 'Reach both arms up to the sky — big stretch, rise onto your toes', seconds: 8 },
        { text: 'Roll your shoulders back in big, slow circles', seconds: 8 },
        { text: 'Twist gently side to side, let your arms swing loose', seconds: 10 },
        { text: 'Reach down toward your toes — as far as feels good', seconds: 8 },
        { text: 'March in place, knees up high', seconds: 10 },
        { text: 'Big arm circles — forward, then backward', seconds: 10 },
        { text: 'Side bend left… then side bend right', seconds: 8 },
        { text: 'Shake out your whole body — arms, legs, everything', seconds: 8 },
        { text: 'Finish with one big stretch overhead. Nice.', seconds: 6 },
    ],
};

export function tierForThreat(threatLevel) {
    if (threatLevel >= 80) return 'boss';
    if (threatLevel >= 40) return 'rare';
    return 'common';
}

export function questsByTier(tier) {
    return QUESTS.filter((q) => q.tier === tier);
}

export function suggestedQuest(threatLevel) {
    const tier = tierForThreat(threatLevel);
    const options = questsByTier(tier);
    return options[Math.floor(Math.random() * options.length)];
}

export function questById(id) {
    if (id === SUNRISE_STRETCH.id) return SUNRISE_STRETCH;
    return QUESTS.find((q) => q.id === id);
}

export function tierLabel(tier) {
    return { common: 'Common Quest', rare: 'Rare Quest', boss: 'Boss Battle' }[tier];
}

export function tierGlow(tier) {
    return { common: '#0ca30c', rare: '#3987e5', boss: '#e66767' }[tier];
}
