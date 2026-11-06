import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";
import { ArrowRight, Clapperboard, Code2, MousePointerClick, PenTool } from "lucide-react";
import { about, facts, profile, tools } from "../data";
import { motionOn } from "../motion";
const clean = (s: string) => s.replace(/^[^\p{L}\p{N}]+/u, "");
const chips = [[PenTool, "6%", "16%", 14], [Code2, "84%", "10%", 22], [Clapperboard, "90%", "68%", 18], [MousePointerClick, "4%", "74%", 26]] as const;
/** Accueil : titre animé, rôles qui défilent, île en parallaxe, bandeau d'outils. Tout vient de data.ts. */
export default function Hero() {
  const [r, setR] = useState(0);
  useEffect(() => { const t = setInterval(() => setR((x) => (x + 1) % profile.roles.length), 2400); return () => clearInterval(t); }, []);
  const move = (e: MouseEvent<HTMLElement>) => {
    if (!motionOn()) return;
    const b = e.currentTarget.getBoundingClientRect(), s = e.currentTarget.style;
    s.setProperty("--mx", String(((e.clientX - b.left) / b.width - 0.5) * 2)); s.setProperty("--my", String(((e.clientY - b.top) / b.height - 0.5) * 2));
  };
  return (
    <>
      <section className="hero" onMouseMove={move}>
        <div className="hero-in">
          <div>
            <p className="hero-eyebrow">{clean(facts[1])} · {clean(facts[0])}</p>
            <h1 aria-label={profile.name}>{profile.name.split(" ").map((w, i) => <span key={w} className="w" aria-hidden><span style={{ "--i": i } as CSSProperties}>{w}</span></span>)}</h1>
            <div className="hero-role"><span key={r}>{profile.roles[r]}</span></div>
            <p className="lead">{about[1]}</p>
            <div className="hero-cta">
              <a className="btn btn--solid" href="#projets">Voir mes projets <ArrowRight size={18} /></a>
              <a className="btn btn--ghost" href="#contact">Me contacter</a>
            </div>
          </div>
          <div className="hero-art" aria-hidden>
            <span className="ha-blob" />
            <span className="ha-cloud ha-l" style={{ top: "8%", left: "-6%", "--k": 12 } as CSSProperties} />
            <span className="ha-cloud c2 ha-l" style={{ top: "76%", right: "-4%", "--k": -10 } as CSSProperties} />
            <img className="ha-island ha-l" src="/images/carte.png" alt="" style={{ "--k": -14 } as CSSProperties} />
            {chips.map(([I, l, t, k], i) => <span key={i} className="ha-chip ha-l" style={{ left: l, top: t, "--k": k, animationDelay: `${-i * 1.1}s` } as CSSProperties}><I size={26} /></span>)}
          </div>
        </div>
      </section>
      <div className="mq" aria-hidden><div className="mq-track">{[...tools, ...tools].map((t, i) => <span key={i}>{t}</span>)}</div></div>
    </>
  );
}
