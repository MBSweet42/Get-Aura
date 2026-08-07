import { getState, subscribe, completeQuest, xpProgress, unlockedSoundscapes, allSoundscapes } from './state.js';
import { renderMeters, renderHud, updateHud } from './meters.js';
import { renderCompanion, updateCompanion } from './companion.js';
import { renderStreak, renderHistory } from './streak.js';
import { suggestedQuest, tierLabel, questsByTier, questById } from './quests.js';
import { openQuestRunner } from './questRunner.js';
import { openCheckIn } from './checkin.js';
import { openReflection } from './reflection.js';
import { renderCoop, wireCoop } from './coop.js';
import { playSoundscape, stopSoundscape, isPlaying } from './soundscapes.js';
import { RESET_TOOLS, toolById, mountTool, unmountActiveTool, controlPatternBreak } from './resetTools.js';
import { renderPlaceNodes, renderStars, renderSparkles, wireMapNodes, placeById } from './map.js';
import { showToast } from './toast.js';

const backdrop = document.getElementById('modal-backdrop');
const drawer = document.getElementById('place-drawer');
const sheet = document.getElementById('place-drawer-sheet');
let openPlaceId = null;

function placeHeader(id) {
    const place = placeById(id);
    return `
        <div class="place-drawer-header" style="--place-glow:${place.glow};">
            <span class="place-drawer-icon">${place.icon}</span>
            <h2 class="place-drawer-title">${place.label}</h2>
            <button class="place-drawer-close" id="drawer-close" aria-label="Close">✕</button>
        </div>
    `;
}

function questCardHTML(quest) {
    return `
        <div class="quest-card" data-quest-id="${quest.id}">
            <span class="quest-tier ${quest.tier}">${tierLabel(quest.tier)}</span>
            <p class="quest-title">${quest.title}</p>
            <p class="quest-desc">${quest.desc}</p>
            <span class="quest-meta">−${quest.threatRelief} Threat · +${quest.calmGain} Calm · +${quest.xpGain} XP</span>
            <span class="quest-cta">Tap to start →</span>
        </div>
    `;
}

function wireQuestCards(root) {
    root.querySelectorAll('.quest-card').forEach((card) => {
        card.addEventListener('click', () => {
            const quest = [...questsByTier('common'), ...questsByTier('rare'), ...questsByTier('boss')]
                .find((q) => q.id === card.dataset.questId);
            if (!quest) return;
            openQuestRunner(quest, backdrop, () => render());
        });
    });
}

function renderWorld() {
    const state = getState();
    const screen = document.getElementById('screen-map');

    screen.innerHTML = `
        <div class="world">
            <div class="world-sky">${renderStars()}${renderSparkles()}</div>
            <div class="world-brand">✨ Nervous System Reset</div>
            <div class="world-hud" id="hud-mount">${renderHud(state)}</div>
            ${renderCompanion(state)}
            <div class="world-places">${renderPlaceNodes()}</div>
        </div>
    `;

    document.getElementById('companion').addEventListener('click', () => {
        openCheckIn(backdrop, (submitted) => {
            render();
            if (submitted) {
                const quest = suggestedQuest(getState().threatLevel);
                setTimeout(() => openQuestRunner(quest, backdrop, () => render()), 250);
            }
        });
    });

    wireMapNodes(screen, (id) => openPlace(id));
}

function refreshWorldDynamic() {
    const state = getState();
    updateHud(state);
    updateCompanion(state);
}

function renderQuestsContent() {
    const tiers = [
        { id: 'common', label: 'Common Quests' },
        { id: 'rare', label: 'Rare Quests' },
        { id: 'boss', label: 'Boss Battles' },
    ];

    sheet.innerHTML =
        placeHeader('quests') +
        tiers
            .map(
                (tier) => `
        <div class="card">
            <h2>${tier.label}</h2>
            <div class="quest-list">
                ${questsByTier(tier.id).map(questCardHTML).join('')}
            </div>
        </div>
    `
            )
            .join('');

    wireQuestCards(sheet);
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
        completeQuest({ ...reward, activity: tool.id });
        showToast(`Nice reset — Threat −${reward.threatRelief}, Calm +${reward.calmGain}, XP +${reward.xpGain}`);
        setTimeout(() => openReflection(backdrop, () => render()), 400);
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
            <h2>What's actually helping</h2>
            ${
                insight
                    ? `<p class="quest-desc">${activityLabel(insight.key)} has helped ${insight.better} of ${insight.total} times you've logged it.</p>`
                    : `<p class="quest-desc">Answer "How do you feel now?" after a reset to start building this — it's how you learn what really works for you.</p>`
            }
        </div>
        <div class="card">
            <h2>Calm history (last 14 check-ins)</h2>
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

function openPlace(id) {
    openPlaceId = id;

    if (id === 'quests') renderQuestsContent();
    if (id === 'reset') renderResetContent();
    if (id === 'squad') renderSquadContent();
    if (id === 'progress') renderProgressContent();

    drawer.classList.add('active');
}

function closePlace() {
    if (openPlaceId === 'reset') {
        unmountActiveTool();
        stopSoundscape();
    }
    openPlaceId = null;
    drawer.classList.remove('active');
    sheet.innerHTML = '';
}

drawer.addEventListener('click', (e) => {
    if (e.target === drawer || e.target.closest('#drawer-close')) closePlace();
});

subscribe(() => render());

renderWorld();
