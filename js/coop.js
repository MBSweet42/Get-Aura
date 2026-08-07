import { showToast } from './toast.js';
import { addSquadMember, removeSquadMember } from './state.js';

const AFFIRMATIONS = [
    "You've got this 💪",
    'Proud of you today 🌟',
    "One step at a time — you're doing great 🌱",
    'Sending you calm ✨',
    "I'm in this with you 🤝",
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
            from: members[0]?.name || 'Your squad',
            emoji: members[0]?.emoji || '💛',
            text: 'is cheering you on today 💛',
        });
    }
    return items;
}

export function renderCoop(state) {
    const members = state.squad
        .map(
            (m) => `
        <div class="squad-member">
            <div class="squad-avatar">${m.emoji}</div>
            <div class="squad-member-info">
                <div class="squad-name">${m.name}</div>
                <div class="squad-status">${m.status}</div>
            </div>
            <button class="btn btn-sm" data-cheer="${m.id}" data-name="${m.name}">👏 Cheer</button>
            <button class="btn btn-sm btn-ghost" data-remove="${m.id}" aria-label="Remove ${m.name}">✕</button>
        </div>
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
                <h2 style="margin:0;">Squad</h2>
                <button class="btn btn-sm" id="add-member-btn">+ Add</button>
            </div>
            <div>${members || '<p class="quest-desc">No one here yet — add your first squad member.</p>'}</div>
        </div>
        <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                <h2 style="margin:0;">Co-Regulation Ping</h2>
                <span class="badge-soon">Multiplayer coming soon</span>
            </div>
            <p class="quest-desc">Nervous systems co-regulate. When your squad is live, sending a ping asks them to breathe with you — right now this is a preview of how it'll feel.</p>
            <button class="btn btn-primary btn-block" id="coop-ping-btn">Send Co-Regulation Ping</button>
        </div>
        <div class="card">
            <h2>Cheering you on</h2>
            <div>${feed}</div>
        </div>
    `;
}

export function wireCoop(container, backdrop, onChange) {
    const pingBtn = container.querySelector('#coop-ping-btn');
    if (pingBtn) {
        pingBtn.addEventListener('click', () => {
            showToast('Ping sent — your squad will feel this once multiplayer is live 💛');
        });
    }

    container.querySelectorAll('[data-cheer]').forEach((btn) => {
        btn.addEventListener('click', () => openAffirmationPicker(btn.dataset.name, backdrop));
    });

    container.querySelectorAll('[data-remove]').forEach((btn) => {
        btn.addEventListener('click', () => {
            removeSquadMember(btn.dataset.remove);
            onChange && onChange();
        });
    });

    const addBtn = container.querySelector('#add-member-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => openAddMember(backdrop, onChange));
    }
}

function openAffirmationPicker(name, backdrop) {
    backdrop.innerHTML = `
        <div class="modal-sheet">
            <div>
                <h2 style="margin:0 0 4px;font-size:19px;color:var(--text-primary);text-transform:none;letter-spacing:normal;">Cheer for ${name}</h2>
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
        showToast(`Sent ${name}: "${trimmed}" (multiplayer coming soon)`);
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

function openAddMember(backdrop, onChange) {
    let selectedEmoji = EMOJI_CHOICES[0];

    backdrop.innerHTML = `
        <div class="modal-sheet">
            <h2 style="margin:0 0 4px;font-size:19px;color:var(--text-primary);text-transform:none;letter-spacing:normal;">Add to your squad</h2>
            <input type="text" class="quest-input" id="member-name" placeholder="Their name" />
            <div class="emoji-picker">
                ${EMOJI_CHOICES.map((e, i) => `<button class="emoji-choice ${i === 0 ? 'active' : ''}" data-emoji="${e}">${e}</button>`).join('')}
            </div>
            <button class="btn btn-primary btn-block" id="member-save">Add</button>
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
