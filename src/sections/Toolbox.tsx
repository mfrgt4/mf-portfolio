import { useState, type CSSProperties } from "react";
import { profile, tools } from "../data";
import { icons } from "../icons";
import { sfx } from "../sound";
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const N = tools.length, P = [7, 5, 11, 13, 17].find((p) => gcd(p, N) === 1) ?? 1;
const n1 = Math.max(1, Math.round(N * 0.26)), n2 = Math.round(N * 0.34);
/** 3 anneaux autour de la boîte ; l'ordre est mélangé pour alterner icônes et mots. */
const slots = Array.from({ length: N }, (_, k) => {
  const ring = k < n1 ? 0 : k < n1 + n2 ? 1 : 2, [start, count] = ring === 0 ? [0, n1] : ring === 1 ? [n1, n2] : [n1 + n2, N - n1 - n2];
  const a = ((k - start) / count) * Math.PI * 2 + ring * 0.55;
  const r = [0.64, 0.86, 1][ring];
  return { x: Math.cos(a) * r, y: Math.sin(a) * r, ring };
});
export default function Toolbox() {
  const [open, setOpen] = useState(false);
  const toggle = () => { setOpen(!open); open ? sfx.pop() : sfx.open(); };
  return (
    <div className={`tb${open ? " is-open" : ""}`}>
      <h2 className="sec-title"><span>Ma boîte à outils</span></h2>
      <div className="tb-stage">
        <ul className="tb-items">
          {tools.map((t, i) => {
            const pos = slots[(i * P) % N], ic = icons[t];
            return (
              <li key={t} className="tb-item" style={{ "--x": pos.x, "--y": pos.y, "--d": `${i * 40}ms`, "--dc": `${(N - i) * 15}ms`, "--rot": `${((i % 5) - 2) * 7}deg`, "--s": 1.12 - pos.ring * 0.1 } as CSSProperties}>
                <span className={`tb-chip${ic ? " tb-chip--icon" : ""}`} style={{ animationDelay: `${(i % 7) * -0.7}s` }} tabIndex={open ? 0 : -1}>
                  {ic ? ("path" in ic ? <svg viewBox="0 0 24 24" aria-hidden><path d={ic.path} fill={`#${ic.hex}`} /></svg>
                    : <i style={{ background: ic.bg, color: ic.fg }}>{ic.text}</i>) : t}
                  {ic && <em>{t}</em>}
                </span>
              </li>
            );
          })}
        </ul>
        <button className="tb-box" onClick={toggle} aria-expanded={open} aria-label={open ? "Ranger la boîte à outils" : "Ouvrir la boîte à outils"}>
          <img src="/images/toolbox.png" alt={`Boîte à outils de ${profile.name}`} />
        </button>
        <span className="tb-hint">{open ? "Clique pour ranger" : "Clique pour ouvrir !"}</span>
      </div>
    </div>
  );
}
