// Sons d'interface synthétisés (aucun fichier audio, aucun droit à gérer).
let ctx: AudioContext | null = null;
let muted = false;
function tone(f: number, d: number, type: OscillatorType = "sine", v = 0.06, slide = 0) {
  if (muted) return;
  ctx ??= new AudioContext();
  const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(f * slide, t + d);
  g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  o.connect(g).connect(ctx.destination); o.start(); o.stop(t + d);
}
export const sfx = {
  blip: () => tone(520 + Math.random() * 180, 0.06, "triangle"),
  pop: () => tone(440, 0.12, "sine", 0.08, 1.8),
  open: () => { tone(392, 0.12); setTimeout(() => tone(587, 0.18), 90); },
  setMuted: (m: boolean) => { muted = m; },
  get muted() { return muted; },
};
