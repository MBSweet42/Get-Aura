let hideTimer = null;

export function showToast(message, duration = 2600) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => el.classList.remove('show'), duration);
}
