const HOBBIT_HOUSE_FRAGMENT = `
    <ellipse cx="50" cy="74" rx="40" ry="22" fill="#3d5c3f"/>
    <ellipse cx="50" cy="67" rx="43" ry="27" fill="#547c53"/>
    <path d="M30,97 L30,76 A20,20 0 0 1 70,76 L70,97 Z" fill="#6b4a30"/>
    <path d="M30,97 L30,76 A20,20 0 0 1 70,76 L70,97 Z" fill="none" stroke="#4a3220" stroke-width="2"/>
    <circle cx="62" cy="88" r="2.2" fill="#f0d9a0"/>
    <circle cx="80" cy="58" r="9.5" fill="#fbdf8f"/>
    <circle cx="80" cy="58" r="9.5" fill="none" stroke="#6b4a30" stroke-width="2.5"/>
    <line x1="80" y1="49" x2="80" y2="67" stroke="#6b4a30" stroke-width="1.6"/>
    <line x1="71" y1="58" x2="89" y2="58" stroke="#6b4a30" stroke-width="1.6"/>
    <rect x="21" y="36" width="10" height="17" rx="2" fill="#7a5a3a"/>
    <path d="M26,36 q-5,-8 0,-14 q5,6 0,14" fill="none" stroke="#e5e1d8" stroke-width="2.2" opacity="0.55" stroke-linecap="round"/>
    <ellipse cx="15" cy="91" rx="8" ry="4" fill="#3d5c3f"/>
    <ellipse cx="87" cy="92" rx="9" ry="4.5" fill="#3d5c3f"/>
    <circle cx="12" cy="86" r="2" fill="#e8a8c8"/>
    <circle cx="90" cy="87" r="2" fill="#e8a8c8"/>
`;

const WATERFALL_FRAGMENT = `
    <path d="M4,97 L4,44 Q20,33 36,44 L41,97 Z" fill="#5a5248"/>
    <path d="M96,97 L96,49 Q82,40 67,49 L62,97 Z" fill="#4a443c"/>
    <path d="M39,19 C44,40 41,60 46,97 L58,97 C55,60 58,40 57,19 Q48,14 39,19 Z" fill="#bfe3f0" opacity="0.9"/>
    <path d="M43,24 C46,45 44,66 47,97" stroke="#ffffff" stroke-width="2" opacity="0.75" fill="none"/>
    <path d="M53,24 C51,45 54,66 51,97" stroke="#ffffff" stroke-width="2" opacity="0.6" fill="none"/>
    <ellipse cx="50" cy="94" rx="27" ry="7" fill="#3f7d95"/>
    <ellipse cx="50" cy="92" rx="20" ry="4.5" fill="#6fb6cf" opacity="0.85"/>
    <ellipse cx="50" cy="89" rx="13" ry="4.5" fill="#e8f6fb" opacity="0.55"/>
    <ellipse cx="11" cy="91" rx="7" ry="3.5" fill="#3f6b45"/>
    <ellipse cx="91" cy="93" rx="7" ry="3.5" fill="#3f6b45"/>
`;

const COMMUNITY_CENTER_FRAGMENT = `
    <rect x="16" y="54" width="40" height="32" rx="2" fill="#7a5638"/>
    <path d="M12,54 L36,30 L60,54 Z" fill="#5c3f28"/>
    <rect x="29" y="68" width="13" height="18" rx="1.5" fill="#4a3220"/>
    <circle cx="39" cy="77" r="1.2" fill="#e8c98a"/>
    <rect x="19" y="60" width="11" height="9" rx="1.5" fill="#fbdf8f"/>
    <rect x="19" y="60" width="11" height="9" rx="1.5" fill="none" stroke="#4a3220" stroke-width="1.6"/>
    <line x1="66" y1="90" x2="83" y2="90" stroke="#6b4a30" stroke-width="3" stroke-linecap="round"/>
    <line x1="68" y1="92" x2="81" y2="83" stroke="#6b4a30" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="75" cy="82" rx="15" ry="8" fill="#ff9d4d" opacity="0.25"/>
    <path d="M75,68 C79,75 81,80 75,88 C69,80 71,75 75,68 Z" fill="#ffb347"/>
    <path d="M75,75 C77,79 78,81 75,85 C72,81 73,79 75,75 Z" fill="#fff0c4"/>
    <ellipse cx="9" cy="93" rx="6" ry="3" fill="#3f6b45"/>
    <ellipse cx="91" cy="94" rx="6" ry="3" fill="#3f6b45"/>
`;

const PROGRESS_PLAINS_FRAGMENT = `
    <circle cx="18" cy="20" r="11" fill="#c9c0f5" opacity="0.45"/>
    <circle cx="18" cy="20" r="6.5" fill="#e7e2ff"/>
    <path d="M28,96 Q45,80 55,66 Q65,52 71,42" stroke="#e8d9a8" stroke-width="2" fill="none" opacity="0.7" stroke-dasharray="3 3"/>
    <path d="M71,42 L71,32" stroke="#6b4a30" stroke-width="1.6"/>
    <path d="M71,32 L81,35.5 L71,39 Z" fill="#9085e9"/>
`;

function tree(x, y, scale = 1) {
    return `
        <g transform="translate(${x},${y}) scale(${scale})">
            <ellipse cx="0" cy="21" rx="8" ry="3" fill="#0c0a1c" opacity="0.25"/>
            <rect x="-2" y="6" width="4" height="12" fill="#5c4530"/>
            <ellipse cx="0" cy="-2" rx="12" ry="11" fill="#3d5c3f"/>
            <ellipse cx="-4" cy="-6" rx="7.5" ry="6.5" fill="#547c53"/>
        </g>
    `;
}

function rockCluster(x, y, scale = 1) {
    return `
        <g transform="translate(${x},${y}) scale(${scale})">
            <ellipse cx="10" cy="9" rx="13" ry="5" fill="#5a5248" opacity="0.6"/>
            <path d="M0,10 C-2,2 6,-4 14,-2 C20,0 20,8 14,10 Z" fill="#6b6358"/>
            <path d="M13,10 C11,4 17,0 22,2 C25,4 24,9 20,10 Z" fill="#5a5248"/>
        </g>
    `;
}

function mountainRange() {
    return `
        <path d="M0,210 L25,120 L50,165 L85,90 L120,160 L155,110 L190,170 L225,100 L265,165 L300,130 L320,155 L320,230 L0,230 Z" fill="#352a5c" opacity="0.9"/>
        <path d="M25,120 L35,140 L15,140 Z" fill="#e8e4f5" opacity="0.5"/>
        <path d="M85,90 L97,115 L73,115 Z" fill="#e8e4f5" opacity="0.55"/>
        <path d="M155,110 L166,133 L144,133 Z" fill="#e8e4f5" opacity="0.45"/>
        <path d="M225,100 L237,124 L213,124 Z" fill="#e8e4f5" opacity="0.5"/>
    `;
}

function lake() {
    return `
        <ellipse cx="195" cy="326" rx="72" ry="30" fill="#24404f"/>
        <ellipse cx="195" cy="321" rx="60" ry="23" fill="#3f7d95"/>
        <ellipse cx="195" cy="317" rx="44" ry="15" fill="#6fb6cf" opacity="0.6"/>
        <ellipse cx="172" cy="312" rx="14" ry="4" fill="#e8f6fb" opacity="0.5"/>
        <ellipse cx="220" cy="325" rx="10" ry="3" fill="#e8f6fb" opacity="0.4"/>
    `;
}

function locationGroup({ id, x, y, scale, fragment, label, labelWidth }) {
    const size = 100 * scale;
    const labelCx = x + size / 2;
    const labelY = y + size + 16;
    return `
        <g class="map-hotspot" data-nav="${id}" tabindex="0" role="button" aria-label="${label}">
            <rect x="${x - 14}" y="${y - 14}" width="${size + 28}" height="${size + 28}" fill="transparent"/>
            <ellipse cx="${labelCx}" cy="${y + size - 4}" rx="${size * 0.38}" ry="${size * 0.09}" fill="#0c0a1c" opacity="0.3"/>
            <g transform="translate(${x},${y}) scale(${scale})">${fragment}</g>
            <line x1="${labelCx}" y1="${labelY - 11}" x2="${labelCx}" y2="${labelY - 22}" stroke="#8a6f45" stroke-width="3" stroke-linecap="round"/>
            <g transform="translate(${labelCx},${labelY})">
                <rect x="${-labelWidth / 2}" y="-11" width="${labelWidth}" height="22" rx="8" fill="rgba(20,14,45,0.65)" stroke="rgba(217,188,133,0.45)" stroke-width="1"/>
                <text x="0" y="5" text-anchor="middle" font-size="12" font-weight="700" fill="#ffffff" font-family="system-ui, sans-serif">${label}</text>
            </g>
        </g>
    `;
}

export function renderOverworldSVG() {
    const locations = [
        locationGroup({ id: 'quests', x: 40, y: 250, scale: 0.85, fragment: HOBBIT_HOUSE_FRAGMENT, label: 'Quest Drop', labelWidth: 90 }),
        locationGroup({ id: 'reset', x: 175, y: 250, scale: 0.8, fragment: WATERFALL_FRAGMENT, label: 'Brain Bleach', labelWidth: 100 }),
        locationGroup({ id: 'squad', x: 35, y: 400, scale: 0.75, fragment: COMMUNITY_CENTER_FRAGMENT, label: 'The Vibe Check', labelWidth: 116 }),
        locationGroup({ id: 'progress', x: 165, y: 410, scale: 0.85, fragment: PROGRESS_PLAINS_FRAGMENT, label: 'Stats & Flex', labelWidth: 100 }),
    ].join('');

    return `
        <svg class="world-ground-svg" viewBox="0 0 320 560" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
            ${mountainRange()}

            <path d="M0,260 C60,235 120,250 160,238 C200,226 260,246 320,224 L320,560 L0,560 Z" fill="#241f4a"/>
            <path d="M0,300 C60,278 130,292 170,276 C220,258 270,282 320,262 L320,560 L0,560 Z" fill="#22342f"/>
            <path d="M0,345 C70,320 140,336 180,316 C230,296 280,320 320,304 L320,560 L0,560 Z" fill="#243d2c"/>

            ${lake()}

            ${tree(148, 300, 0.9)}
            ${tree(288, 240, 1.1)}
            ${tree(305, 355, 1.05)}
            ${rockCluster(258, 285, 0.75)}
            ${tree(140, 515, 1)}
            ${tree(60, 535, 0.75)}
            ${tree(250, 545, 0.85)}
            ${rockCluster(122, 355, 0.7)}
            ${tree(10, 270, 0.8)}
            ${tree(6, 445, 0.9)}
            ${tree(312, 450, 0.95)}

            <path
                d="M82,325 Q160,278 215,325 Q170,400 91,460 Q165,472 225,437"
                fill="none"
                stroke="#8a6f45"
                stroke-width="6"
                stroke-linecap="round"
                opacity="0.4"
            />
            <path
                d="M82,325 Q160,278 215,325 Q170,400 91,460 Q165,472 225,437"
                fill="none"
                stroke="#d9bc85"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-dasharray="1 9"
                opacity="0.8"
            />

            ${locations}
        </svg>
    `;
}

function hollowBackdrop() {
    return `
        <svg viewBox="0 0 320 260" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="hollowSky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#4a3d80"/>
                    <stop offset="1" stop-color="#c98f52"/>
                </linearGradient>
            </defs>
            <rect width="320" height="260" fill="url(#hollowSky)"/>
            <circle cx="258" cy="52" r="26" fill="#fbe3ad" opacity="0.85"/>
            <ellipse cx="160" cy="232" rx="230" ry="55" fill="#2f4a2f"/>
            ${tree(58, 195, 1.3)}
            ${tree(258, 208, 1.5)}
            <g transform="translate(80,85) scale(2.3)">${HOBBIT_HOUSE_FRAGMENT}</g>
        </svg>
    `;
}

function fallsBackdrop() {
    return `
        <svg viewBox="0 0 320 260" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="fallsSky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#1a2f45"/>
                    <stop offset="1" stop-color="#5f95a8"/>
                </linearGradient>
            </defs>
            <rect width="320" height="260" fill="url(#fallsSky)"/>
            <ellipse cx="160" cy="238" rx="230" ry="50" fill="#274a3f"/>
            <g transform="translate(72,35) scale(2.6)">${WATERFALL_FRAGMENT}</g>
            <ellipse cx="160" cy="222" rx="95" ry="16" fill="#e8f6fb" opacity="0.3"/>
        </svg>
    `;
}

function hearthBackdrop() {
    return `
        <svg viewBox="0 0 320 260" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="hearthGlow" cx="50%" cy="82%" r="70%">
                    <stop offset="0" stop-color="#e08a3d"/>
                    <stop offset="55%" stop-color="#3a2554"/>
                    <stop offset="100%" stop-color="#1f1638"/>
                </radialGradient>
            </defs>
            <rect width="320" height="260" fill="url(#hearthGlow)"/>
            <ellipse cx="160" cy="238" rx="230" ry="50" fill="#2f3d24"/>
            ${tree(48, 185, 1.2)}
            ${tree(272, 198, 1.3)}
            <g transform="translate(88,60) scale(2.3)">${COMMUNITY_CENTER_FRAGMENT}</g>
        </svg>
    `;
}

function groveBackdrop() {
    return `
        <svg viewBox="0 0 320 260" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="groveSky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#3a2d6e"/>
                    <stop offset="1" stop-color="#8fae5f"/>
                </linearGradient>
            </defs>
            <rect width="320" height="260" fill="url(#groveSky)"/>
            <path d="M0,190 C60,160 120,180 160,165 C200,150 260,175 320,155 L320,260 L0,260 Z" fill="#6b8f52"/>
            <path d="M0,215 C60,195 130,205 170,192 C220,178 270,200 320,185 L320,260 L0,260 Z" fill="#82a862"/>
            ${tree(58, 208, 1)}
            ${tree(252, 222, 1.1)}
            <g transform="translate(108,55) scale(2.2)">${PROGRESS_PLAINS_FRAGMENT}</g>
        </svg>
    `;
}

export function renderSceneBackdrop(id) {
    if (id === 'quests') return hollowBackdrop();
    if (id === 'reset') return fallsBackdrop();
    if (id === 'squad') return hearthBackdrop();
    if (id === 'progress') return groveBackdrop();
    return '';
}
