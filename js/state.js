import { itemFor } from './items.js';

const STORAGE_KEY = 'nsr_state_v1';

const SOUNDSCAPES = [
    { id: 'brown-noise', name: 'Brown Noise', unlockLevel: 1 },
    { id: 'soft-drone', name: 'Soft Drone', unlockLevel: 2 },
    { id: 'binaural-calm', name: 'Binaural Calm (6Hz)', unlockLevel: 4 },
    { id: 'ocean-hush', name: 'Ocean Hush', unlockLevel: 6 },
];

function xpForLevel(level) {
    return 50 + (level - 1) * 40;
}

function defaultState() {
    return {
        version: 1,
        calmHP: 60,
        threatLevel: 30,
        xp: 0,
        level: 1,
        streak: 0,
        lastCheckInDate: null,
        lastQuestCompleteDate: null,
        questsCompleted: 0,
        history: [], // { date, threatLevel, calmHP, activity, effect }
        collection: [],
        careFocus: null,
        disclaimerSeen: false,
        squad: [
            { id: 'sam', name: 'Sam', emoji: '🦊', status: 'Green — Rest & Digest' },
            { id: 'priya', name: 'Priya', emoji: '🦋', status: 'Yellow — A little wound up' },
            { id: 'jordan', name: 'Jordan', emoji: '🐢', status: 'Offline' },
        ],
    };
}

function load() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultState();
        const parsed = JSON.parse(raw);
        if (!parsed || parsed.version !== 1) return defaultState();
        return { ...defaultState(), ...parsed };
    } catch {
        return defaultState();
    }
}

function save(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const listeners = new Set();
let state = load();

export function getState() {
    return state;
}

export function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
}

function notify() {
    save(state);
    listeners.forEach((fn) => fn(state));
}

export function setThreatLevel(value) {
    state = { ...state, threatLevel: clamp(value, 0, 100) };
    notify();
}

export function checkIn(rawLevel) {
    const today = todayKey();
    state = {
        ...state,
        threatLevel: clamp(rawLevel * 10, 0, 100),
        lastCheckInDate: today,
    };
    notify();
}

export function completeQuest({ threatRelief, calmGain, xpGain, activity }) {
    const today = todayKey();
    let streak = state.streak;
    if (state.lastQuestCompleteDate !== today) {
        const wasYesterday = isYesterday(state.lastQuestCompleteDate, today);
        streak = wasYesterday ? state.streak + 1 : 1;
    }

    let xp = state.xp + xpGain;
    let level = state.level;
    while (xp >= xpForLevel(level)) {
        xp -= xpForLevel(level);
        level += 1;
    }

    const history = [
        ...state.history,
        { date: today, threatLevel: state.threatLevel, calmHP: state.calmHP, activity: activity || null, effect: null },
    ].slice(-60);

    const item = itemFor(activity);
    const alreadyHave = item && state.collection.includes(activity);
    const newItem = item && !alreadyHave ? item : null;
    const collection = newItem ? [...state.collection, activity] : state.collection;

    state = {
        ...state,
        threatLevel: clamp(state.threatLevel - threatRelief, 0, 100),
        calmHP: clamp(state.calmHP + calmGain, 0, 100),
        xp,
        level,
        streak,
        lastQuestCompleteDate: today,
        questsCompleted: state.questsCompleted + 1,
        history,
        collection,
    };
    notify();

    return { newItem };
}

export function setCareFocus(focusId) {
    state = { ...state, careFocus: focusId };
    notify();
}

export function acknowledgeDisclaimer() {
    state = { ...state, disclaimerSeen: true };
    notify();
}

export function recordEffect(effect) {
    if (state.history.length === 0) return;
    const history = [...state.history];
    history[history.length - 1] = { ...history[history.length - 1], effect };
    state = { ...state, history };
    notify();
}

export function addSquadMember({ name, emoji }) {
    const member = { id: `m${Date.now()}`, name, emoji, status: 'Just added 👋' };
    state = { ...state, squad: [...state.squad, member] };
    notify();
}

export function removeSquadMember(id) {
    state = { ...state, squad: state.squad.filter((m) => m.id !== id) };
    notify();
}

export function unlockedSoundscapes() {
    return SOUNDSCAPES.filter((s) => s.unlockLevel <= state.level);
}

export function allSoundscapes() {
    return SOUNDSCAPES;
}

export function xpProgress() {
    return { xp: state.xp, needed: xpForLevel(state.level), level: state.level };
}

function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
}

function todayKey() {
    return new Date().toISOString().slice(0, 10);
}

function isYesterday(dateKey, todayKeyValue) {
    if (!dateKey) return false;
    const d = new Date(dateKey + 'T00:00:00');
    const t = new Date(todayKeyValue + 'T00:00:00');
    const diff = (t - d) / (1000 * 60 * 60 * 24);
    return diff === 1;
}
