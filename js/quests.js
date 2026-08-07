function repeat(step, times) {
    return Array.from({ length: times }, () => step);
}

export const QUESTS = [
    // ---- Common (Threat 1-3) ----
    {
        id: 'vagus-vibe-check',
        tier: 'common',
        title: 'Vagus Vibe Check',
        desc: 'Hum your favorite tune like a low-frequency bee. The vibration stimulates your vagus nerve and triggers your relaxation response.',
        threatRelief: 10,
        calmGain: 8,
        xpGain: 10,
        steps: [{ text: 'Hum steadily, low in your chest', seconds: 45 }],
    },
    {
        id: 'physiological-sigh',
        tier: 'common',
        title: 'Physiological Sigh',
        desc: 'Two quick inhales through the nose, one long exhale through the mouth. The fastest known way to calm your nervous system.',
        threatRelief: 12,
        calmGain: 8,
        xpGain: 10,
        steps: repeat({ text: 'Two sharp inhales through the nose, one long slow exhale through the mouth', seconds: 8 }, 5),
    },
    {
        id: 'cold-water-reset',
        tier: 'common',
        title: 'Cold Water Reset',
        desc: 'Cold on the face triggers the mammalian dive reflex, slowing your heart rate almost immediately.',
        threatRelief: 12,
        calmGain: 8,
        xpGain: 10,
        steps: [{ text: 'Splash cold water on your face, or hold an ice cube to your cheeks', seconds: 30 }],
    },
    {
        id: 'gargle-reset',
        tier: 'common',
        title: 'Gargle Reset',
        desc: 'Vigorous gargling activates the same throat muscles that connect to your vagus nerve.',
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
        desc: 'Anxiety time-travels into future worries. This forces your brain to register: right now, in this exact room, I am safe.',
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
        title: 'Orienting Scan',
        desc: 'Slowly turning your head to take in your surroundings tells your brainstem the threat has passed.',
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
        desc: 'Anxiety stores adrenaline as muscle bracing. Tensing hard and dropping like a ragdoll discharges it fast.',
        threatRelief: 28,
        calmGain: 20,
        xpGain: 28,
        steps: repeat({ text: 'Tense every muscle into a hard ball for 5 seconds… then drop like a ragdoll', seconds: 10 }, 3),
    },
    {
        id: 'pmr-sequence',
        tier: 'boss',
        title: 'Progressive Muscle Relaxation',
        desc: 'Squeeze each muscle group tight, then let go completely. It signals to your brain that the "threat" has been fought or fled.',
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
    return QUESTS.find((q) => q.id === id);
}

export function tierLabel(tier) {
    return { common: 'Common Quest', rare: 'Rare Quest', boss: 'Boss Battle' }[tier];
}
