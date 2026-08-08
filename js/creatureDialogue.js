import { tierLabel } from './quests.js';
import { openQuestRunner } from './questRunner.js';

export function openCreatureDialogue(quest, backdrop, onDone) {
    backdrop.innerHTML = `
        <div class="modal-sheet">
            <div class="creature-intro">
                <span class="creature-face">${quest.creature}</span>
                <div>
                    <p class="creature-name">${quest.creatureName}</p>
                    <p class="quest-desc">${quest.creatureName} ${quest.creatureLine}.</p>
                </div>
            </div>
            <div>
                <span class="quest-tier ${quest.tier}">${tierLabel(quest.tier)}</span>
                <h2 style="margin:10px 0 4px;font-size:19px;color:var(--text-primary);text-transform:none;letter-spacing:normal;">${quest.title}</h2>
                <p class="quest-desc">${quest.desc}</p>
            </div>
            <span class="quest-meta">−${quest.threatRelief} Wound Up · +${quest.calmGain} Calm · +${quest.xpGain} XP</span>
            <button class="btn btn-primary btn-block" id="creature-start">Try it →</button>
            <button class="btn btn-ghost btn-block" id="creature-later">Maybe later</button>
        </div>
    `;
    backdrop.classList.add('active');

    function close() {
        backdrop.classList.remove('active');
        backdrop.innerHTML = '';
    }

    backdrop.querySelector('#creature-start').addEventListener('click', () => {
        openQuestRunner(quest, backdrop, onDone);
    });
    backdrop.querySelector('#creature-later').addEventListener('click', () => {
        close();
        onDone();
    });
}
