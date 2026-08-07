export function renderStreak(state) {
    const days = state.streak === 1 ? 'day' : 'days';
    return `
        <div class="streak-row">
            <span class="streak-flame">🔥</span>
            <span>${state.streak} ${days} regulating before a full spiral</span>
        </div>
    `;
}

export function renderHistory(state) {
    if (state.history.length === 0) {
        return `<p class="quest-desc">Complete a quest to start building history.</p>`;
    }
    const recent = state.history.slice(-14);
    const bars = recent
        .map((h) => {
            const height = Math.max(4, Math.round((h.calmHP / 100) * 40));
            return `<div title="Calm ${Math.round(h.calmHP)} on ${h.date}" style="width:8px;height:${height}px;border-radius:3px;background:var(--accent-blue);"></div>`;
        })
        .join('');
    return `<div style="display:flex;align-items:flex-end;gap:4px;height:40px;">${bars}</div>`;
}
