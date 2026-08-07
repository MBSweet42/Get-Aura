import { acknowledgeDisclaimer } from './state.js';

const FULL_TEXT = `Get Aura offers tools for everyday stress and anxiety support, including check ins, mini games, and community features. These tools are designed for general wellness and self care. They are not medical treatment, therapy, or a replacement for professional mental health care.

The mini games included in Get Aura are inspired by research on grounding and calming techniques for anxiety in the moment. They are not a clinical treatment for trauma, PTSD, or any diagnosed condition.

If you are in crisis, experiencing thoughts of harming yourself, or dealing with a mental health emergency, please contact a licensed professional or crisis service in your area.

By using Get Aura, you understand that the app is a self care companion, not a substitute for therapy, counseling, or medical advice.`;

export function openDisclaimer(backdrop, onDone) {
    backdrop.innerHTML = `
        <div class="modal-sheet">
            <div>
                <h2 style="margin:0 0 4px;font-size:19px;color:var(--text-primary);text-transform:none;letter-spacing:normal;">Before you dive in</h2>
                <p class="quest-desc" style="font-weight:600;color:var(--text-primary);">Get Aura is a self care tool, not therapy.</p>
            </div>
            <p class="quest-desc" id="disclaimer-full" style="white-space:pre-line;">${FULL_TEXT}</p>
            <button class="btn btn-primary btn-block" id="disclaimer-ack">I understand</button>
        </div>
    `;
    backdrop.classList.add('active');

    backdrop.querySelector('#disclaimer-ack').addEventListener('click', () => {
        acknowledgeDisclaimer();
        backdrop.classList.remove('active');
        backdrop.innerHTML = '';
        onDone();
    });
}
