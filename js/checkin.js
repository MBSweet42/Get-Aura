import { checkIn } from './state.js';

const LABELS = {
    1: 'Settled', 2: 'Settled', 3: 'A little wound up',
    4: 'A little wound up', 5: 'Wound up', 6: 'Wound up',
    7: 'On edge', 8: 'On edge', 9: 'Spiraling', 10: 'Spiraling',
};

export function openCheckIn(backdrop, onDone) {
    let value = 5;

    backdrop.innerHTML = `
        <div class="modal-sheet">
            <div>
                <h2 style="margin:0 0 4px;font-size:19px;color:var(--text-primary);text-transform:none;letter-spacing:normal;">How wound up do you feel?</h2>
                <p class="quest-desc">Be honest — this tells me how wound up you are, so I can find the right check-in for right now.</p>
            </div>
            <div class="checkin-value" id="ci-value">${value}</div>
            <div style="text-align:center;color:var(--text-secondary);font-size:14px;" id="ci-label">${LABELS[value]}</div>
            <input type="range" min="1" max="10" step="1" value="${value}" class="checkin-slider" id="ci-slider" />
            <div class="checkin-scale"><span>Settled</span><span>Spiraling</span></div>
            <button class="btn btn-primary btn-block" id="ci-submit">Collect my daily spark ✨</button>
            <button class="btn btn-ghost btn-block" id="ci-cancel">Cancel</button>
        </div>
    `;

    const slider = backdrop.querySelector('#ci-slider');
    const valueEl = backdrop.querySelector('#ci-value');
    const labelEl = backdrop.querySelector('#ci-label');

    slider.addEventListener('input', () => {
        value = Number(slider.value);
        valueEl.textContent = value;
        labelEl.textContent = LABELS[value];
    });

    backdrop.querySelector('#ci-submit').addEventListener('click', () => {
        checkIn(value);
        close(true);
    });
    backdrop.querySelector('#ci-cancel').addEventListener('click', () => close(false));

    backdrop.classList.add('active');

    function close(submitted) {
        backdrop.classList.remove('active');
        backdrop.innerHTML = '';
        onDone(submitted);
    }
}
