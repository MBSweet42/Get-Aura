import { recordEffect } from './state.js';

export function openReflection(backdrop, onDone) {
    backdrop.innerHTML = `
        <div class="modal-sheet">
            <div>
                <h2 style="margin:0 0 4px;font-size:19px;color:var(--text-primary);text-transform:none;letter-spacing:normal;">How do you feel now?</h2>
                <p class="quest-desc">Totally optional — but noticing what helps is how you learn what actually works for you.</p>
            </div>
            <div class="reflection-options">
                <button class="btn btn-block" data-effect="better">😌 Better</button>
                <button class="btn btn-block" data-effect="same">😐 About the same</button>
                <button class="btn btn-block" data-effect="worse">😣 Still activated</button>
            </div>
            <button class="btn btn-ghost btn-block" id="refl-skip">Skip</button>
        </div>
    `;
    backdrop.classList.add('active');

    function close() {
        backdrop.classList.remove('active');
        backdrop.innerHTML = '';
        onDone();
    }

    backdrop.querySelectorAll('[data-effect]').forEach((btn) => {
        btn.addEventListener('click', () => {
            recordEffect(btn.dataset.effect);
            close();
        });
    });
    backdrop.querySelector('#refl-skip').addEventListener('click', close);
}
