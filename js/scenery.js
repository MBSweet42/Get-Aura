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

function locationGroup({ id, x, y, scale, fragment, label, labelWidth }) {
    const size = 100 * scale;
    return `
        <g class="map-hotspot" data-nav="${id}" tabindex="0" role="button" aria-label="${label}">
            <rect x="${x - 14}" y="${y - 14}" width="${size + 28}" height="${size + 28}" fill="transparent"/>
            <ellipse cx="${x + size / 2}" cy="${y + size - 4}" rx="${size * 0.38}" ry="${size * 0.09}" fill="#0c0a1c" opacity="0.3"/>
            <g transform="translate(${x},${y}) scale(${scale})">${fragment}</g>
            <g transform="translate(${x + size / 2},${y + size + 16})">
                <rect x="${-labelWidth / 2}" y="-11" width="${labelWidth}" height="22" rx="8" fill="rgba(20,14,45,0.6)"/>
                <text x="0" y="5" text-anchor="middle" font-size="12" font-weight="700" fill="#ffffff" font-family="system-ui, sans-serif">${label}</text>
            </g>
        </g>
    `;
}

export function renderOverworldSVG() {
    const locations = [
        locationGroup({ id: 'quests', x: 20, y: 250, scale: 0.85, fragment: HOBBIT_HOUSE_FRAGMENT, label: 'Quest Board', labelWidth: 92 }),
        locationGroup({ id: 'reset', x: 185, y: 250, scale: 0.8, fragment: WATERFALL_FRAGMENT, label: 'Decompress', labelWidth: 88 }),
        locationGroup({ id: 'squad', x: 15, y: 400, scale: 0.75, fragment: COMMUNITY_CENTER_FRAGMENT, label: 'Squad', labelWidth: 60 }),
        locationGroup({ id: 'progress', x: 175, y: 410, scale: 0.85, fragment: PROGRESS_PLAINS_FRAGMENT, label: 'Progress', labelWidth: 76 }),
    ].join('');

    return `
        <svg class="world-ground-svg" viewBox="0 0 320 560" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,260 C60,235 120,250 160,238 C200,226 260,246 320,224 L320,560 L0,560 Z" fill="#241f4a"/>
            <path d="M0,300 C60,278 130,292 170,276 C220,258 270,282 320,262 L320,560 L0,560 Z" fill="#22342f"/>
            <path d="M0,345 C70,320 140,336 180,316 C230,296 280,320 320,304 L320,560 L0,560 Z" fill="#243d2c"/>

            ${tree(148, 300, 0.9)}
            ${tree(288, 355, 1.05)}
            ${rockCluster(275, 275, 0.75)}
            ${tree(140, 515, 1)}
            ${rockCluster(122, 355, 0.7)}

            <path
                d="M62,315 Q145,278 225,325 Q160,400 71,462 Q160,472 235,437"
                fill="none"
                stroke="#8a6f45"
                stroke-width="6"
                stroke-linecap="round"
                opacity="0.4"
            />
            <path
                d="M62,315 Q145,278 225,325 Q160,400 71,462 Q160,472 235,437"
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
