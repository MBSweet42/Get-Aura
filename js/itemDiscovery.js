export function openItemDiscovery(item, reward, backdrop, onDone) {
    backdrop.innerHTML = `
        <div class="modal-sheet">
            <p class="discovery-eyebrow">✨ New item for your Cozy Den</p>
            <div class="discovery-item">
                <span class="discovery-emoji">${item.emoji}</span>
            </div>
            <div style="text-align:center;">
                <p class="creature-name" style="font-size:18px;">${item.name}</p>
                <p class="quest-desc">${item.blurb}</p>
            </div>
            <span class="quest-meta" style="text-align:center;">−${reward.threatRelief} Threat · +${reward.calmGain} Calm · +${reward.xpGain} XP</span>
            <button class="btn btn-primary btn-block" id="discovery-continue">Add it to my den →</button>
        </div>
    `;
    backdrop.classList.add('active');

    backdrop.querySelector('#discovery-continue').addEventListener('click', () => {
        backdrop.classList.remove('active');
        backdrop.innerHTML = '';
        onDone();
    });
}
