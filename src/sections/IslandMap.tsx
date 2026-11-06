import { useMemo, useState, type CSSProperties, type MouseEvent } from "react";
import { categories, projects } from "../data";
import { useReveal } from "../hooks";
import { placeProjects, type Spot } from "../islandLayout";
import { motionOn } from "../motion";
import { sfx } from "../sound";
import Fiche from "./Fiche";
import type { Project } from "../data";

function Sprite({ kind, c1, c2 }: Pick<Spot, "kind" | "c1" | "c2">) {
  const line = "rgba(107,79,54,.3)";
  return (
    <svg className="bd-svg" viewBox="0 0 100 100" aria-hidden>
      <ellipse cx="50" cy="91" rx="42" ry="7" fill="rgba(60,40,20,.2)" />
      {kind === "tower" && <rect x="30" y="22" width="40" height="64" rx="6" fill={c1} stroke={line} strokeWidth="2" />}
      <rect x="12" y="46" width="76" height="40" rx="7" fill={c1} stroke={line} strokeWidth="2" />
      {kind === "house" && <path d="M10 50 50 18 90 50Z" fill={c2} stroke={c2} strokeWidth="8" strokeLinejoin="round" />}
      {kind === "flat" && <><rect x="8" y="34" width="84" height="18" rx="9" fill={c2} /><path d="M16 52q4 7 8 0t8 0 8 0 8 0 8 0 8 0 8 0 8 0" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="3" strokeLinecap="round" /></>}
      {kind === "tower" && <path d="M26 28 50 4 74 28Z" fill={c2} stroke={c2} strokeWidth="8" strokeLinejoin="round" />}
      <rect x="43" y="62" width="14" height="24" rx="7" fill="#8b6a4a" />
      <rect x="20" y="62" width="14" height="12" rx="4" fill="#fff" fillOpacity=".85" /><rect x="66" y="62" width="14" height="12" rx="4" fill="#fff" fillOpacity=".85" />
    </svg>
  );
}
const TREES = [[75,85],[68,165],[132,72],[68,262],[62,335],[185,345],[120,352],[190,150],[142,165],[345,72],[432,80],[430,165],[352,222],[432,285],[300,345],[205,255],[285,215]];
const FLOWERS = Array.from({ length: 26 }, (_, i) => { const r = (n: number) => ((i * 9301 + n * 49297) % 233280) / 233280; return { x: 70 + r(1) * 350, y: 75 + r(2) * 275, c: ["#f2a7b0", "#fff", "#ffd84a", "#c9a7ee"][i % 4] }; }).filter((f) => f.x < 222 || f.x > 272);

/** Carte interactive : les bâtiments viennent de `projects` (data.ts), l'emplacement de islandLayout.ts. */
export default function IslandMap() {
  const ref = useReveal<HTMLDivElement>();
  const placed = useMemo(() => placeProjects(projects), []);
  const [open, setOpen] = useState<{ p: Project; x: number; y: number } | null>(null);
  const go = (p: Project, e: MouseEvent<HTMLElement>) => { const r = e.currentTarget.getBoundingClientRect(); setOpen({ p, x: r.left + r.width / 2 || innerWidth / 2, y: r.top + r.height / 2 || innerHeight / 2 }); };
  const tilt = (e: MouseEvent<HTMLElement>) => { if (!motionOn()) return; const b = e.currentTarget.getBoundingClientRect(), st = e.currentTarget.style; st.setProperty("--mx", String(((e.clientX - b.left) / b.width - 0.5) * 2)); st.setProperty("--my", String(((e.clientY - b.top) / b.height - 0.5) * 2)); };
  const untilt = (e: MouseEvent<HTMLElement>) => { e.currentTarget.style.setProperty("--mx", "0"); e.currentTarget.style.setProperty("--my", "0"); };
  return (
    <div ref={ref} className="im">
      <h2 className="sec-title"><span>Mes projets</span></h2>
      <p className="im-hint">Explore l'île : chaque bâtiment est un projet. Rive gauche, mes projets personnels ; rive droite, mes projets universitaires.</p>
      <div className="im-sea" onMouseMove={tilt} onMouseLeave={untilt}>
        <div className="im-map">
          <img className="im-img" src="/images/carte.png" alt="Carte de l'île" />
          <svg className="im-deco" viewBox="0 0 482 414" aria-hidden>
            <path className="im-river" d="M236 40C212 110 268 165 246 225S232 320 250 395" fill="none" stroke="#f3e3b8" strokeWidth="34" strokeLinecap="round" />
            <path d="M236 40C212 110 268 165 246 225S232 320 250 395" fill="none" stroke="#8fd8ee" strokeWidth="24" strokeLinecap="round" />
            <path className="im-shine" d="M236 40C212 110 268 165 246 225S232 320 250 395" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 22" />
            <g><rect x="226" y="196" width="50" height="24" rx="5" fill="#c98f5b" stroke="#8b6a4a" strokeWidth="2.5" /><path d="M234 196v24M244 196v24M254 196v24M264 196v24" stroke="#8b6a4a" strokeOpacity=".45" strokeWidth="1.5" /></g>
            {FLOWERS.map((f, i) => <circle key={i} className="im-flower" cx={f.x} cy={f.y} r="2.6" fill={f.c} style={{ animationDelay: `${-i * 0.4}s` }} />)}
            {TREES.map(([x, y], i) => (
              <g key={i} className="im-tree" transform={`translate(${x} ${y})`}><g className="im-sway" style={{ animationDelay: `${-i * 0.7}s` }}>
                <rect x="-2.5" y="-4" width="5" height="12" rx="2" fill="#a87b52" /><circle cy="-14" r="13" fill="#5fb46a" /><circle cx="-5" cy="-17" r="6" fill="#7ccb84" />
                {i % 3 === 0 && [[-7, -10], [6, -16], [2, -6]].map(([a, b]) => <circle key={a} cx={a} cy={b} r="2.4" fill="#f2a7b0" />)}
              </g></g>
            ))}
          </svg>
          <span className="cl" /><span className="cl cl2" />
          <span className="bf"><svg viewBox="0 0 20 20"><path d="M10 10C2 0 0 8 6 11 1 13 5 19 10 11ZM10 10C18 0 20 8 14 11 19 13 15 19 10 11Z" fill="#f2a7b0" /></svg></span>
          <span className="bf bf2"><svg viewBox="0 0 20 20"><path d="M10 10C2 0 0 8 6 11 1 13 5 19 10 11ZM10 10C18 0 20 8 14 11 19 13 15 19 10 11Z" fill="#ffd84a" /></svg></span>
          {placed.map(({ p, spot }, i) => (
            <button key={p.title} className="bd" aria-label={`${p.title} — ouvrir la fiche`} onClick={(e) => go(p, e)} onMouseEnter={() => sfx.blip()}
              style={{ left: `${spot.x}%`, top: `${spot.y}%`, zIndex: Math.round(spot.y), "--i": i, "--c2": spot.c2 } as CSSProperties}>
              <Sprite {...spot} />
              <span className="bd-badge"><spot.Icon /></span>
              <span className="bd-label">{p.title}<small>{p.type ?? p.kind}</small></span>
            </button>
          ))}
        </div>
      </div>
      <div className="im-quick">
        {categories.map(([cat, label]) => (
          <div key={cat}><strong>{label}</strong>
            <div>{projects.filter((p) => p.category === cat).map((p) => <button key={p.title} className="ac-pill ac-pill--wood" onClick={(e) => go(p, e)}>{p.title}</button>)}</div>
          </div>
        ))}
      </div>
      {open && <Fiche p={open.p} origin={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
