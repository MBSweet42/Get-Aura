import { QUESTS, SUNRISE_STRETCH } from './quests.js';

export const MENTOR_SVG = `
<svg viewBox="0 0 100 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M30,90 C25,70 30,55 50,55 C70,55 75,70 70,90 C70,106 30,106 30,90 Z" fill="#5a7a4a"/>
    <path d="M35,92 C33,80 36,68 50,68 C64,68 67,80 65,92" fill="none" stroke="#496439" stroke-width="1.5" opacity="0.6"/>
    <line x1="82" y1="58" x2="82" y2="104" stroke="#6b4a30" stroke-width="3" stroke-linecap="round"/>
    <circle cx="82" cy="55" r="4.5" fill="#f2b155"/>
    <path d="M30,40 C14,34 6,50 14,63 C22,55 29,48 33,42 Z" fill="#7a9850"/>
    <path d="M70,40 C86,34 94,50 86,63 C78,55 71,48 67,42 Z" fill="#7a9850"/>
    <ellipse cx="50" cy="45" rx="22" ry="20" fill="#8fae5f"/>
    <path d="M35,36 Q42,31 48,35" stroke="#5c7a45" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M52,35 Q58,31 65,36" stroke="#5c7a45" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <ellipse cx="42" cy="45" rx="4.5" ry="5.5" fill="#2a2418"/>
    <ellipse cx="58" cy="45" rx="4.5" ry="5.5" fill="#2a2418"/>
    <circle cx="43.3" cy="43" r="1.3" fill="#fff"/>
    <circle cx="59.3" cy="43" r="1.3" fill="#fff"/>
    <path d="M45,56 Q50,59 55,56" stroke="#3a4a2a" stroke-width="1.6" fill="none" stroke-linecap="round"/>
</svg>
`;

function todayKey() {
    return new Date().toISOString().slice(0, 10);
}

export function sunriseDoneToday(state) {
    return state.history.some((h) => h.activity === SUNRISE_STRETCH.id && h.date === todayKey());
}

export function skillProgress(state) {
    const counts = {};
    const flagged = {};
    state.history.forEach((h) => {
        if (!h.activity) return;
        counts[h.activity] = (counts[h.activity] || 0) + 1;
        if (h.effect === 'better') flagged[h.activity] = true;
    });

    return QUESTS.map((q) => {
        const count = counts[q.id] || 0;
        return {
            quest: q,
            count,
            flagged: !!flagged[q.id],
            status: count >= 3 ? 'learned' : count > 0 ? 'practicing' : 'new',
            statusLabel: count >= 3 ? 'Learned' : count > 0 ? 'Practicing' : 'Not tried',
        };
    });
}

export function renderMentorCard(state) {
    const doneToday = sunriseDoneToday(state);
    const learnedCount = skillProgress(state).filter((s) => s.status === 'learned').length;

    return `
        <div class="card mentor-card">
            <div class="mentor-row">
                <span class="mentor-avatar">${MENTOR_SVG}</span>
                <div class="mentor-info">
                    <p class="creature-name" style="margin:0 0 2px;">Sage</p>
                    <p class="quest-desc" style="margin:0;">${
                        doneToday
                            ? "\"You've already stretched today. I'm proud of you.\""
                            : '"Come, sit a moment. Shall we start the day moving?"'
                    }</p>
                </div>
            </div>
            <p class="meter-label" style="margin-top:10px;">${learnedCount} of ${skillProgress(state).length} techniques learned</p>
            <button class="btn btn-primary btn-block" id="mentor-checkin" style="margin-top:8px;">Check in with Sage</button>
        </div>
    `;
}

export function openMentorCheckIn(backdrop, { onStartSunrise, onDone }) {
    return (state) => {
        const doneToday = sunriseDoneToday(state);
        const progress = skillProgress(state);

        backdrop.innerHTML = `
            <div class="modal-sheet">
                <div class="creature-intro">
                    <span class="creature-face" style="width:56px;height:56px;display:inline-block;">${MENTOR_SVG}</span>
                    <div>
                        <p class="creature-name">Sage</p>
                        <p class="quest-desc">${doneToday ? 'Today is already off to a good start.' : "Let's begin with a little movement."}</p>
                    </div>
                </div>
                ${
                    doneToday
                        ? `<p class="quest-desc" style="text-align:center;">✨ Sunrise Stretch complete for today. See you tomorrow.</p>`
                        : `<button class="btn btn-primary btn-block" id="mentor-sunrise">🌅 Start Sunrise Stretch</button>`
                }
                <div class="skill-list">
                    ${progress
                        .map(
                            (p) => `
                        <div class="skill-row">
                            <span class="skill-name">${p.quest.creature} ${p.quest.title}</span>
                            <span class="skill-status skill-${p.status}">${p.statusLabel}${p.flagged ? ' ⭐' : ''}</span>
                        </div>
                    `
                        )
                        .join('')}
                </div>
                <button class="btn btn-ghost btn-block" id="mentor-close">Close</button>
            </div>
        `;
        backdrop.classList.add('active');

        function close() {
            backdrop.classList.remove('active');
            backdrop.innerHTML = '';
        }

        const sunriseBtn = backdrop.querySelector('#mentor-sunrise');
        if (sunriseBtn) {
            sunriseBtn.addEventListener('click', () => {
                close();
                onStartSunrise();
            });
        }
        backdrop.querySelector('#mentor-close').addEventListener('click', () => {
            close();
            onDone && onDone();
        });
    };
}
