let audioCtx = null;
let activeNodes = [];
let currentId = null;

function getCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
}

function makeNoiseBuffer(context) {
    const bufferSize = 2 * context.sampleRate;
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.02 * white) / 1.02;
        data[i] = lastOut * 3.5;
    }
    return buffer;
}

export function stopSoundscape() {
    activeNodes.forEach((n) => {
        try { n.stop && n.stop(); } catch { /* already stopped */ }
        try { n.disconnect && n.disconnect(); } catch { /* already disconnected */ }
    });
    activeNodes = [];
    currentId = null;
}

export function isPlaying(id) {
    return currentId === id;
}

export function currentlyPlaying() {
    return currentId;
}

export function playSoundscape(id) {
    const c = getCtx();
    if (c.state === 'suspended') c.resume();
    stopSoundscape();

    const master = c.createGain();
    master.gain.value = 0.25;
    master.connect(c.destination);
    activeNodes.push(master);

    if (id === 'brown-noise') {
        const src = c.createBufferSource();
        src.buffer = makeNoiseBuffer(c);
        src.loop = true;
        src.connect(master);
        src.start();
        activeNodes.push(src);
    } else if (id === 'soft-drone') {
        [220, 330].forEach((freq) => {
            const osc = c.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = freq;
            const gain = c.createGain();
            gain.gain.value = 0.15;
            osc.connect(gain).connect(master);
            osc.start();
            activeNodes.push(osc, gain);
        });
    } else if (id === 'binaural-calm') {
        const merger = c.createChannelMerger(2);
        const left = c.createOscillator();
        left.frequency.value = 200;
        const right = c.createOscillator();
        right.frequency.value = 206;
        const gL = c.createGain();
        gL.gain.value = 0.2;
        const gR = c.createGain();
        gR.gain.value = 0.2;
        left.connect(gL).connect(merger, 0, 0);
        right.connect(gR).connect(merger, 0, 1);
        merger.connect(master);
        left.start();
        right.start();
        activeNodes.push(left, right, gL, gR, merger);
    } else if (id === 'ocean-hush') {
        const src = c.createBufferSource();
        src.buffer = makeNoiseBuffer(c);
        src.loop = true;
        const filter = c.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 500;
        const lfo = c.createOscillator();
        lfo.frequency.value = 0.15;
        const lfoGain = c.createGain();
        lfoGain.gain.value = 0.15;
        lfo.connect(lfoGain).connect(master.gain);
        src.connect(filter).connect(master);
        src.start();
        lfo.start();
        activeNodes.push(src, filter, lfo, lfoGain);
    }

    currentId = id;
}
