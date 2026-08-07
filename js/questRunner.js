import { completeQuest } from './state.js';
import { tierLabel } from './quests.js';
import { showToast } from './toast.js';
import { openReflection } from './reflection.js';
import { openItemDiscovery } from './itemDiscovery.js';

let timerHandle = null;

export function openQuestRunner(quest, backdrop, onClose) {
    let stepIndex = 0;

    backdrop.innerHTML = `
        <div class="modal-sheet">
            <div>
                <span class="quest-tier ${quest.tier}">${tierLabel(quest.tier)}</span>
                <h2 style="margin:10px 0 4px;font-size:19px;color:var(--text-primary);text-transform:none;letter-spacing:normal;">${quest.title}</h2>
                <p class="quest-desc">${quest.desc}</p>
            </div>
            <div id="qr-stage"></div>
            <ul class="quest-steps" id="qr-steps"></ul>
            <div class="quest-reward">
                <span>−${quest.threatRelief} Threat</span>
                <span>+${quest.calmGain} Calm</span>
                <span>+${quest.xpGain} XP</span>
            </div>
            <p class="quest-desc" style="text-align:center;" id="qr-caption"></p>
            <button class="btn btn-ghost btn-block" id="qr-cancel">Stop early (no reward)</button>
        </div>
    `;

    const stepsEl = backdrop.querySelector('#qr-steps');
    const stageEl = backdrop.querySelector('#qr-stage');
    const captionEl = backdrop.querySelector('#qr-caption');

    stepsEl.innerHTML = quest.steps
        .map((s, i) => `<li class="${i === 0 ? 'active-step' : ''}">${s.text}</li>`)
        .join('');

    backdrop.querySelector('#qr-cancel').addEventListener('click', () => finish(false));
    backdrop.classList.add('active');

    function highlightStep(i) {
        [...stepsEl.children].forEach((li, idx) => li.classList.toggle('active-step', idx === i));
    }

    function renderStage() {
        clearInterval(timerHandle);
        const step = quest.steps[stepIndex];
        highlightStep(stepIndex);

        if (step.type === 'input') {
            captionEl.textContent = "Type each one — you'll move on automatically, or tap Next any time.";
            stageEl.innerHTML = `
                <div class="quest-inputs">
                    ${Array.from({ length: step.count }, (_, i) => `<input type="text" class="quest-input" placeholder="${i + 1}." />`).join('')}
                </div>
                <button class="btn btn-primary btn-block" id="qr-next">Next →</button>
            `;
            const inputs = [...stageEl.querySelectorAll('.quest-input')];
            inputs[0]?.focus();
            inputs.forEach((inp, i) => {
                inp.addEventListener('keydown', (e) => {
                    if (e.key !== 'Enter') return;
                    e.preventDefault();
                    if (i < inputs.length - 1) inputs[i + 1].focus();
                    else advance();
                });
            });
            stageEl.querySelector('#qr-next').addEventListener('click', advance);
        } else {
            captionEl.textContent = 'Follow the highlighted step — the reward above is yours once the last step ends.';
            let secondsLeft = step.seconds;
            stageEl.innerHTML = `<div class="quest-timer" id="qr-timer">${secondsLeft}</div>`;
            const timerEl = stageEl.querySelector('#qr-timer');
            timerHandle = setInterval(() => {
                secondsLeft -= 1;
                if (secondsLeft <= 0) {
                    advance();
                    return;
                }
                timerEl.textContent = secondsLeft;
            }, 1000);
        }
    }

    function advance() {
        stepIndex += 1;
        if (stepIndex >= quest.steps.length) {
            finish(true);
            return;
        }
        renderStage();
    }

    function finish(completed) {
        clearInterval(timerHandle);
        backdrop.classList.remove('active');
        backdrop.innerHTML = '';
        if (completed) {
            const reward = { threatRelief: quest.threatRelief, calmGain: quest.calmGain, xpGain: quest.xpGain };
            const { newItem } = completeQuest({ ...reward, activity: quest.id });

            if (newItem) {
                setTimeout(
                    () => openItemDiscovery(newItem, reward, backdrop, () => openReflection(backdrop, () => onClose(completed))),
                    400
                );
            } else {
                showToast(`Quest complete — Threat −${quest.threatRelief}, Calm +${quest.calmGain}, XP +${quest.xpGain}`);
                setTimeout(() => openReflection(backdrop, () => onClose(completed)), 400);
            }
        } else {
            onClose(completed);
        }
    }

    renderStage();
}
