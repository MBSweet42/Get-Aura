import { showToast } from './toast.js';
import { addSquadMember, removeSquadMember, getState } from './state.js';

const AFFIRMATIONS = [
    "You've got this 💪",
    'Proud of you today 🌟',
    "One step at a time — you're doing great 🌱",
    'Sending you calm ✨',
    "I'm in this with you 🤝",
];

const TREATS = [
    { emoji: '🍵', name: 'Warm Tea' },
    { emoji: '🍪', name: 'Cookies' },
    { emoji: '🍫', name: 'Hot Cocoa' },
    { emoji: '🍲', name: 'Cozy Soup' },
    { emoji: '🧁', name: 'Cupcake' },
];

const EMOJI_CHOICES = ['🦊', '🦋', '🐢', '🌱', '🐧', '🦉', '🐝', '🦄', '🐨', '🐙'];

function mockCheerFeed(state) {
    const members = state.squad;
    const items = [];
    if (members[0] && state.streak > 0) {
        items.push({ from: members[0].name, emoji: members[0].emoji, text: `cheered your ${state.streak}-day streak! 🔥` });
    }
    if (members[1] && state.questsCompleted > 0) {
        const msg = AFFIRMATIONS[state.questsCompleted % AFFIRMATIONS.length];
        items.push({ from: members[1].name, emoji: members[1].emoji, text: `sent: "${msg}"` });
    }
    if (items.length === 0) {
        items.push({
            from: members[0]?.name || 'The town',
            emoji: members[0]?.emoji || '💛',
            text: 'is cheering you on today 💛',
        });
    }
    return items;
}

export function renderCoop(state) {
    const houses = state.squad
        .map(
            (m) => `
        <button class="house-card" data-visit="${m.id}">
            <span class="house-icon">🏠</span>
            <span class="house-avatar">${m.emoji}</span>
            <span class="house-name">${m.name}</span>
            <span class="house-status">${m.status}</span>
        </button>
    `
        )
        .join('');

    const feed = mockCheerFeed(state)
        .map(
            (c) => `
        <div class="squad-member">
            <div class="squad-avatar">${c.emoji}</div>
            <div class="squad-member-info">
                <div class="squad-name">${c.from}</div>
                <div class="squad-status">${c.text}</div>
            </div>
        </div>
    `
        )
        .join('');

    return `
        <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                <h2 style="margin:0;">The Town</h2>
                <button class="btn btn-sm" id="add-member-btn">+ Invite</button>
            </div>
            <p class="quest-desc" style="margin-bottom:12px;">Tap a house to visit — send a letter or leave a treat on the doorstep.</p>
            <div class="house-grid">${houses || '<p class="quest-desc">No one\'s moved in yet — invite your first friend.</p>'}</div>
        </div>
        <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                <h2 style="margin:0;">Ring the Bell</h2>
                <span class="badge-soon">Multiplayer coming soon</span>
            </div>
            <p class="quest-desc">Nervous systems co-regulate. When the town is live, ringing the bell asks everyone to breathe with you — right now this is a preview of how it'll feel.</p>
            <button class="btn btn-primary btn-block" id="coop-ping-btn">Ring the Town Bell</button>
        </div>
        <div class="card">
            <h2>Notice Board</h2>
            <div>${feed}</div>
        </div>
    `;
}

export function wireCoop(container, backdrop, onChange) {
    const pingBtn = container.querySelector('#coop-ping-btn');
    if (pingBtn) {
        pingBtn.addEventListener('click', () => {
            showToast('The bell rings out — the town will feel this once multiplayer is live 💛');
        });
    }

    container.querySelectorAll('[data-visit]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const member = getState().squad.find((m) => m.id === btn.dataset.visit);
            if (member) openVisit(member, backdrop, onChange);
        });
    });

    const addBtn = container.querySelector('#add-member-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => openAddMember(backdrop, onChange));
    }
}

function openVisit(member, backdrop, onChange) {
    backdrop.innerHTML = `
        <div class="modal-sheet">
            <div class="creature-intro">
                <span class="creature-face">${member.emoji}</span>
                <div>
                    <p class="creature-name">${member.name}'s place</p>
                    <p class="quest-desc">${member.status}</p>
                </div>
            </div>
            <button class="btn btn-primary btn-block" id="visit-letter">📜 Send a Letter</button>
            <button class="btn btn-block" id="visit-treat">🍪 Leave a Treat</button>
            <button class="btn btn-ghost btn-block" id="visit-remove">Move out of town</button>
            <button class="btn btn-ghost btn-block" id="visit-close">Close</button>
        </div>
    `;
    backdrop.classList.add('active');

    function close() {
        backdrop.classList.remove('active');
        backdrop.innerHTML = '';
    }

    backdrop.querySelector('#visit-letter').addEventListener('click', () => openAffirmationPicker(member.name, backdrop));
    backdrop.querySelector('#visit-treat').addEventListener('click', () => openGiftPicker(member.name, backdrop));
    backdrop.querySelector('#visit-remove').addEventListener('click', () => {
        removeSquadMember(member.id);
        close();
        onChange && onChange();
    });
    backdrop.querySelector('#visit-close').addEventListener('click', close);
}

function openAffirmationPicker(name, backdrop) {
    backdrop.innerHTML = `
        <div class="modal-sheet">
            <div>
                <h2 style="margin:0 0 4px;font-size:19px;color:var(--text-primary);text-transform:none;letter-spacing:normal;">A letter for ${name}</h2>
                <p class="quest-desc">Multiplayer coming soon — this previews how it'll feel.</p>
            </div>
            <div class="affirmation-list">
                ${AFFIRMATIONS.map((a) => `<button class="btn btn-block" data-msg="${a}">${a}</button>`).join('')}
            </div>
            <input type="text" class="quest-input" id="aff-custom" placeholder="Or write your own..." />
            <button class="btn btn-primary btn-block" id="aff-send-custom">Send</button>
            <button class="btn btn-ghost btn-block" id="aff-cancel">Cancel</button>
        </div>
    `;
    backdrop.classList.add('active');

    function close() {
        backdrop.classList.remove('active');
        backdrop.innerHTML = '';
    }

    function send(msg) {
        const trimmed = msg.trim();
        if (!trimmed) return;
        showToast(`Sent ${name} a letter: "${trimmed}" (multiplayer coming soon)`);
        close();
    }

    backdrop.querySelectorAll('[data-msg]').forEach((btn) => {
        btn.addEventListener('click', () => send(btn.dataset.msg));
    });
    backdrop.querySelector('#aff-send-custom').addEventListener('click', () => {
        send(backdrop.querySelector('#aff-custom').value);
    });
    backdrop.querySelector('#aff-cancel').addEventListener('click', close);
}

function openGiftPicker(name, backdrop) {
    backdrop.innerHTML = `
        <div class="modal-sheet">
            <div>
                <h2 style="margin:0 0 4px;font-size:19px;color:var(--text-primary);text-transform:none;letter-spacing:normal;">Leave ${name} a treat</h2>
                <p class="quest-desc">Multiplayer coming soon — this previews how it'll feel.</p>
            </div>
            <div class="affirmation-list">
                ${TREATS.map((t) => `<button class="btn btn-block" data-treat="${t.emoji}|${t.name}">${t.emoji} ${t.name}</button>`).join('')}
            </div>
            <button class="btn btn-ghost btn-block" id="gift-cancel">Cancel</button>
        </div>
    `;
    backdrop.classList.add('active');

    function close() {
        backdrop.classList.remove('active');
        backdrop.innerHTML = '';
    }

    backdrop.querySelectorAll('[data-treat]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const [emoji, treatName] = btn.dataset.treat.split('|');
            showToast(`Left ${name} a ${treatName} ${emoji} (multiplayer coming soon)`);
            close();
        });
    });
    backdrop.querySelector('#gift-cancel').addEventListener('click', close);
}

function openAddMember(backdrop, onChange) {
    let selectedEmoji = EMOJI_CHOICES[0];

    backdrop.innerHTML = `
        <div class="modal-sheet">
            <h2 style="margin:0 0 4px;font-size:19px;color:var(--text-primary);text-transform:none;letter-spacing:normal;">Invite someone to town</h2>
            <input type="text" class="quest-input" id="member-name" placeholder="Their name" />
            <div class="emoji-picker">
                ${EMOJI_CHOICES.map((e, i) => `<button class="emoji-choice ${i === 0 ? 'active' : ''}" data-emoji="${e}">${e}</button>`).join('')}
            </div>
            <button class="btn btn-primary btn-block" id="member-save">Invite</button>
            <button class="btn btn-ghost btn-block" id="member-cancel">Cancel</button>
        </div>
    `;
    backdrop.classList.add('active');

    function close() {
        backdrop.classList.remove('active');
        backdrop.innerHTML = '';
    }

    backdrop.querySelectorAll('[data-emoji]').forEach((btn) => {
        btn.addEventListener('click', () => {
            selectedEmoji = btn.dataset.emoji;
            backdrop.querySelectorAll('[data-emoji]').forEach((b) => b.classList.toggle('active', b === btn));
        });
    });

    backdrop.querySelector('#member-name').focus();

    backdrop.querySelector('#member-save').addEventListener('click', () => {
        const name = backdrop.querySelector('#member-name').value.trim();
        if (!name) return;
        addSquadMember({ name, emoji: selectedEmoji });
        close();
        onChange && onChange();
    });
    backdrop.querySelector('#member-cancel').addEventListener('click', close);
}
