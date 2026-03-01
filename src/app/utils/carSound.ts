type AudioGraph = {
  ctx: AudioContext;
  master: GainNode;
};

let graph: AudioGraph | null = null;
let noiseBuffer: AudioBuffer | null = null;

const getAudioContextCtor = () => {
  if (typeof window === 'undefined') return null;

  const withWebkit = window as Window & {
    webkitAudioContext?: typeof AudioContext;
  };

  return window.AudioContext ?? withWebkit.webkitAudioContext ?? null;
};

const ensureGraph = (): AudioGraph | null => {
  if (graph) return graph;

  const AudioContextCtor = getAudioContextCtor();
  if (!AudioContextCtor) return null;

  const ctx = new AudioContextCtor();
  const master = ctx.createGain();
  master.gain.value = 0.065;
  master.connect(ctx.destination);

  graph = { ctx, master };
  return graph;
};

const getNoiseBuffer = (ctx: AudioContext) => {
  if (noiseBuffer && noiseBuffer.sampleRate === ctx.sampleRate) return noiseBuffer;

  const duration = 0.6;
  const length = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const channel = buffer.getChannelData(0);

  for (let i = 0; i < length; i += 1) {
    channel[i] = Math.random() * 2 - 1;
  }

  noiseBuffer = buffer;
  return buffer;
};

const isReady = () => {
  const g = ensureGraph();
  if (!g) return null;
  if (g.ctx.state !== 'running') return null;
  return g;
};

const stopAndDisconnect = (node: AudioScheduledSourceNode, at: number, targets: AudioNode[]) => {
  node.stop(at);
  node.onended = () => {
    targets.forEach((target) => target.disconnect());
  };
};

export async function unlockCarAudio() {
  const g = ensureGraph();
  if (!g) return false;

  if (g.ctx.state === 'running') return true;

  try {
    await g.ctx.resume();
    return g.ctx.state === 'running';
  } catch {
    return false;
  }
}

export function playEngineStartSound() {
  const g = isReady();
  if (!g) return;

  const { ctx, master } = g;
  const now = ctx.currentTime;

  const oscA = ctx.createOscillator();
  oscA.type = 'sawtooth';
  oscA.frequency.setValueAtTime(76, now);
  oscA.frequency.exponentialRampToValueAtTime(196, now + 0.55);

  const oscB = ctx.createOscillator();
  oscB.type = 'triangle';
  oscB.frequency.setValueAtTime(62, now);
  oscB.frequency.exponentialRampToValueAtTime(138, now + 0.55);

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(360, now);
  filter.frequency.exponentialRampToValueAtTime(2200, now + 0.45);
  filter.Q.value = 0.7;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.07, now + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.03, now + 0.34);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.63);

  oscA.connect(filter);
  oscB.connect(filter);
  filter.connect(gain);
  gain.connect(master);

  oscA.start(now);
  oscB.start(now);
  stopAndDisconnect(oscA, now + 0.66, [oscA, filter, gain]);
  stopAndDisconnect(oscB, now + 0.66, [oscB]);
}

export function playHornSound(repeats = 2) {
  const g = isReady();
  if (!g) return;

  const { ctx, master } = g;
  const now = ctx.currentTime;

  for (let i = 0; i < repeats; i += 1) {
    const start = now + i * 0.24;

    const oscA = ctx.createOscillator();
    oscA.type = 'square';
    oscA.frequency.setValueAtTime(392, start);
    oscA.frequency.linearRampToValueAtTime(370, start + 0.19);

    const oscB = ctx.createOscillator();
    oscB.type = 'square';
    oscB.frequency.setValueAtTime(466, start);
    oscB.frequency.linearRampToValueAtTime(442, start + 0.19);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.09, start + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.19);

    oscA.connect(gain);
    oscB.connect(gain);
    gain.connect(master);

    oscA.start(start);
    oscB.start(start);
    stopAndDisconnect(oscA, start + 0.21, [oscA, gain]);
    stopAndDisconnect(oscB, start + 0.21, [oscB]);
  }
}

export function playBrakeSound() {
  const g = isReady();
  if (!g) return;

  const { ctx, master } = g;
  const now = ctx.currentTime;

  const source = ctx.createBufferSource();
  source.buffer = getNoiseBuffer(ctx);

  const band = ctx.createBiquadFilter();
  band.type = 'bandpass';
  band.frequency.setValueAtTime(1800, now);
  band.frequency.exponentialRampToValueAtTime(700, now + 0.26);
  band.Q.value = 4.8;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.0001, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.07, now + 0.015);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

  source.connect(band);
  band.connect(noiseGain);
  noiseGain.connect(master);

  source.start(now);
  stopAndDisconnect(source, now + 0.26, [source, band, noiseGain]);
}

export function playCrashSound() {
  const g = isReady();
  if (!g) return;

  const { ctx, master } = g;
  const now = ctx.currentTime;

  const thud = ctx.createOscillator();
  thud.type = 'triangle';
  thud.frequency.setValueAtTime(148, now);
  thud.frequency.exponentialRampToValueAtTime(46, now + 0.22);

  const thudGain = ctx.createGain();
  thudGain.gain.setValueAtTime(0.0001, now);
  thudGain.gain.exponentialRampToValueAtTime(0.11, now + 0.02);
  thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

  thud.connect(thudGain);
  thudGain.connect(master);
  thud.start(now);
  stopAndDisconnect(thud, now + 0.23, [thud, thudGain]);

  const source = ctx.createBufferSource();
  source.buffer = getNoiseBuffer(ctx);

  const high = ctx.createBiquadFilter();
  high.type = 'highpass';
  high.frequency.setValueAtTime(300, now);

  const crashGain = ctx.createGain();
  crashGain.gain.setValueAtTime(0.0001, now);
  crashGain.gain.exponentialRampToValueAtTime(0.09, now + 0.01);
  crashGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

  source.connect(high);
  high.connect(crashGain);
  crashGain.connect(master);

  source.start(now);
  stopAndDisconnect(source, now + 0.2, [source, high, crashGain]);
}

export function playPopSound() {
  const g = isReady();
  if (!g) return;

  const { ctx, master } = g;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(580, now);
  osc.frequency.exponentialRampToValueAtTime(240, now + 0.09);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.06, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

  osc.connect(gain);
  gain.connect(master);

  osc.start(now);
  stopAndDisconnect(osc, now + 0.11, [osc, gain]);
}
