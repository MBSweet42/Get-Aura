import { getState, subscribe, completeQuest, setCareFocus, xpProgress, unlockedSoundscapes, allSoundscapes } from './state.js';
import { renderMeters, renderHud, updateHud } from './meters.js';
import { renderCompanion, updateCompanion } from './companion.js';
import { renderStreak, renderHistory } from './streak.js';
import { QUESTS, suggestedQuest, questById, tierGlow } from './quests.js';
import { ITEMS, totalItemCount, CARE_FOCUS_OPTIONS, careFocusById } from './items.js';
import { openCheckIn } from './checkin.js';
import { openReflection } from './reflection.js';
import { openCreatureDialogue } from './creatureDialogue.js';
import { openItemDiscovery } from './itemDiscovery.js';
import { openDisclaimer } from './disclaimer.js';
import { celebrate } from './celebrate.js';
import { renderCoop, wireCoop } from './coop.js';
import { playSoundscape, stopSoundscape, isPlaying } from './soundscapes.js';
import { RESET_TOOLS, toolById, mountTool, unmountActiveTool, controlPatternBreak } from './resetTools.js';
import { renderGround, renderStars, renderSparkles, wireMapNodes, placeById } from './map.js';
import { renderSceneBackdrop } from './scenery.js';
import { playTransition, transitionForPlace } from './transitions.js';
import { showToast } from './toast.js';

const backdrop = document.getElementById('modal-backdrop');
const screenMap = document.getElementById('screen-map');
const screenPlace = document.getElementById('screen-place');
const sceneBackdrop = document.getElementById('scene-backdrop');
const scenePanel = document.getElementById('scene-panel');
const sceneBack = document.getElementById('scene-back');
const sheet = scenePanel;
let openPlaceId = null;

function placeHeader(id) {
    const place = placeById(id);
    return `
        <div class="place-drawer-header" style="--place-glow:${place.glow};">
            <span class="place-drawer-icon">${place.icon}</span>
            <h2 class="place-drawer-title">${place.label}</h2>
        </div>
    `;
}

const GROVE_POSITIONS = [
    { x: 18, y: 12 }, { x: 55, y: 9 }, { x: 84, y: 22 }, { x: 14, y: 44 },
    { x: 48, y: 40 }, { x: 80, y: 50 }, { x: 28, y: 72 }, { x: 66, y: 78 },
];

function creatureNodeHTML(quest, index) {
    const pos = GROVE_POSITIONS[index % GROVE_POSITIONS.length];
    return `
        <button class="place-node" data-quest="${quest.id}" style="left:${pos.x}%; top:${pos.y}%; animation-delay:${(index * 0.3).toFixed(1)}s; --place-glow:${tierGlow(quest.tier)};">
            <span class="place-orb">${quest.creature}</span>
            <span class="place-label">${quest.creatureName}</span>
        </button>
    `;
}

function renderWorld() {
    const state = getState();
    const screen = document.getElementById('screen-map');

    screen.innerHTML = `
        <div class="world">
            <div class="world-sky">${renderStars()}${renderSparkles()}</div>
            ${renderGround()}
            <div class="world-brand">✨ Get Aura<span class="world-brand-sub">anxiety slay game</span></div>
            <div class="world-hud" id="hud-mount">${renderHud(state)}</div>
            ${renderCompanion(state)}
        </div>
    `;

    document.getElementById('companion').addEventListener('click', () => {
        openCheckIn(backdrop, (submitted) => {
            render();
            if (submitted) {
                const quest = suggestedQuest(getState().threatLevel);
                setTimeout(() => openCreatureDialogue(quest, backdrop, () => render()), 250);
            }
        });
    });

    wireMapNodes(screen, (id) => openPlaceScene(id));
}

function refreshWorldDynamic() {
    const state = getState();
    updateHud(state);
    updateCompanion(state);
}

function renderQuestsContent() {
    sheet.innerHTML = `
        ${placeHeader('quests')}
        <p class="quest-desc" style="text-align:center;">Each creature here knows one trick. Tap one to learn it.</p>
        <div class="grove">
            <div class="world-sky">${renderSparkles(10)}</div>
            ${QUESTS.map(creatureNodeHTML).join('')}
        </div>
    `;

    sheet.querySelectorAll('[data-quest]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const quest = questById(btn.dataset.quest);
            if (!quest) return;
            openCreatureDialogue(quest, backdrop, () => render());
        });
    });
}

let selectedTool = 'pattern-break';

function renderResetContent() {
    const tool = toolById(selectedTool);

    sheet.innerHTML = `
        ${placeHeader('reset')}
        <div class="card">
            <div class="tool-picker">
                ${RESET_TOOLS.map(
                    (t) => `<button class="tool-chip ${t.id === selectedTool ? 'active' : ''}" data-tool="${t.id}">${t.emoji} ${t.name}</button>`
                ).join('')}
            </div>
            <h2 style="margin-top:14px;">${tool.name}</h2>
            <p class="quest-desc">Reach for this when ${tool.when}.</p>
            <p class="quest-desc">${tool.blurb}</p>
        </div>
        <div id="tool-mount"></div>
        ${
            selectedTool === 'pattern-break'
                ? `
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">
            <button class="btn" data-action="left">⬅️</button>
            <button class="btn" data-action="rotate">🔄</button>
            <button class="btn" data-action="right">➡️</button>
            <button class="btn" data-action="drop">⬇️</button>
        </div>`
                : ''
        }
    `;

    sheet.querySelectorAll('[data-tool]').forEach((btn) => {
        btn.addEventListener('click', () => {
            selectedTool = btn.dataset.tool;
            renderResetContent();
        });
    });

    sheet.querySelectorAll('[data-action]').forEach((btn) => {
        btn.addEventListener('click', () => controlPatternBreak(btn.dataset.action));
    });

    mountTool(selectedTool, document.getElementById('tool-mount'), () => {
        const reward = tool.reward;
        const { newItem } = completeQuest({ ...reward, activity: tool.id });
        celebrate();

        if (newItem) {
            setTimeout(() => openItemDiscovery(newItem, reward, backdrop, () => openReflection(backdrop, () => render())), 400);
        } else {
            showToast(`Nice reset — Threat −${reward.threatRelief}, Calm +${reward.calmGain}, XP +${reward.xpGain}`);
            setTimeout(() => openReflection(backdrop, () => render()), 400);
        }
    });
}

function renderSquadContent() {
    sheet.innerHTML = placeHeader('squad') + renderCoop(getState());
    wireCoop(sheet, backdrop, () => renderSquadContent());
}

function activityLabel(key) {
    if (!key) return 'that reset';
    return questById(key)?.title || toolById(key)?.name || key;
}

function effectInsight(state) {
    const answered = state.history.filter((h) => h.effect);
    if (answered.length === 0) return null;

    const byActivity = {};
    answered.forEach((h) => {
        const key = h.activity || 'unlabeled';
        byActivity[key] = byActivity[key] || { better: 0, total: 0 };
        byActivity[key].total += 1;
        if (h.effect === 'better') byActivity[key].better += 1;
    });

    const [key, stats] = Object.entries(byActivity).sort(
        (a, b) => b[1].better / b[1].total - a[1].better / a[1].total
    )[0];
    return { key, ...stats };
}

function renderProgressContent() {
    const state = getState();
    const { xp, needed, level } = xpProgress();
    const unlocked = unlockedSoundscapes();
    const insight = effectInsight(state);

    sheet.innerHTML = `
        ${placeHeader('progress')}
        <div class="card">
            <h2>Right now</h2>
            <div id="meters-mount"></div>
            ${renderStreak(state)}
        </div>
        <div class="card">
            <div class="level-row">
                <div>
                    <h2 style="margin-bottom:2px;">Level</h2>
                    <div class="level-badge">${level}</div>
                </div>
                <div style="text-align:right;">
                    <div class="meter-label">${xp} / ${needed} XP</div>
                    <div class="meter-label">${state.questsCompleted} resets completed</div>
                </div>
            </div>
            <div class="meter-track" style="margin-top:12px;">
                <div class="meter-fill calm" style="width:${(xp / needed) * 100}%"></div>
            </div>
        </div>
        <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">
                <h2 style="margin:0;">Cozy Den</h2>
                <span class="meter-label">${state.collection.length} / ${totalItemCount()}</span>
            </div>
            <p class="quest-desc">Every technique leaves something behind. Collect them all.</p>
            <div class="item-grid">
                ${Object.entries(ITEMS)
                    .map(([activityId, item]) => {
                        const owned = state.collection.includes(activityId);
                        return `
                        <div class="item-slot ${owned ? 'owned' : ''}" title="${owned ? item.name : 'Not found yet'}">
                            <span class="item-emoji">${owned ? item.emoji : '❔'}</span>
                            ${owned ? `<span class="item-name">${item.name}</span>` : ''}
                        </div>
                    `;
                    })
                    .join('')}
            </div>
        </div>
        <div class="card">
            <h2>What are you working on?</h2>
            <p class="quest-desc">${
                state.careFocus
                    ? `Right now: ${careFocusById(state.careFocus)?.label}`
                    : "Pick a focus — it's just for you, and you can change it anytime."
            }</p>
            <div class="tool-picker">
                ${CARE_FOCUS_OPTIONS.map(
                    (f) => `<button class="tool-chip ${state.careFocus === f.id ? 'active' : ''}" data-focus="${f.id}">${f.emoji} ${f.label}</button>`
                ).join('')}
            </div>
        </div>
        <div class="card">
            <h2>What's actually helping</h2>
            ${
                insight
                    ? `<p class="quest-desc">${activityLabel(insight.key)} has helped ${insight.better} of ${insight.total} times you've logged it.</p>`
                    : `<p class="quest-desc">Answer "How do you feel now?" after a reset to start building this — it's how you learn what really works for you.</p>`
            }
        </div>
        <div class="card">
            <h2>Calm history (last 14 sparks)</h2>
            ${renderHistory(state)}
        </div>
        <div class="card">
            <h2>Soundscapes</h2>
            ${allSoundscapes()
                .map((s) => {
                    const locked = !unlocked.find((u) => u.id === s.id);
                    return `
                    <div class="soundscape-row">
                        <span class="soundscape-name ${locked ? 'locked' : ''}">${locked ? `🔒 ${s.name} (Level ${s.unlockLevel})` : s.name}</span>
                        ${locked ? '' : `<button class="btn" data-sound="${s.id}">${isPlaying(s.id) ? 'Stop' : 'Play'}</button>`}
                    </div>
                `;
                })
                .join('')}
        </div>
    `;

    renderMeters(document.getElementById('meters-mount'), state);

    sheet.querySelectorAll('[data-focus]').forEach((btn) => {
        btn.addEventListener('click', () => {
            setCareFocus(btn.dataset.focus);
            renderProgressContent();
        });
    });

    sheet.querySelectorAll('[data-sound]').forEach((btn) => {
        btn.addEventListener('click', () => {
            if (isPlaying(btn.dataset.sound)) {
                stopSoundscape();
            } else {
                playSoundscape(btn.dataset.sound);
            }
            renderProgressContent();
        });
    });
}

function render() {
    refreshWorldDynamic();
    if (openPlaceId === 'progress') renderProgressContent();
}

function openPlaceScene(id) {
    if (openPlaceId) return;

    playTransition(transitionForPlace(id), () => {
        openPlaceId = id;
        sceneBackdrop.innerHTML = renderSceneBackdrop(id);
        screenMap.classList.remove('active');
        screenPlace.classList.add('active');

        if (id === 'quests') renderQuestsContent();
        if (id === 'reset') renderResetContent();
        if (id === 'squad') renderSquadContent();
        if (id === 'progress') renderProgressContent();
    });
}

function closePlaceScene() {
    if (!openPlaceId) return;
    if (openPlaceId === 'reset') {
        unmountActiveTool();
        stopSoundscape();
    }

    const kind = transitionForPlace(openPlaceId);
    playTransition(kind, () => {
        openPlaceId = null;
        screenPlace.classList.remove('active');
        screenMap.classList.add('active');
        scenePanel.innerHTML = '';
        sceneBackdrop.innerHTML = '';
    });
}

sceneBack.addEventListener('click', () => closePlaceScene());

subscribe(() => render());

renderWorld();

if (!getState().disclaimerSeen) {
    openDisclaimer(backdrop, () => {});
}
