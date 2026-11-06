import { useRef, useState } from "react";
import { Clapperboard, Code2, Megaphone, MousePointerClick, PenTool, Sparkles, type LucideIcon } from "lucide-react";
import { profile, skills } from "../data";
import { useReveal } from "../hooks";
import { sfx } from "../sound";
const ICONS: Record<string, LucideIcon> = { Communication: Megaphone, "Design graphique": PenTool, "UI/UX Design": MousePointerClick, "Développement web": Code2, Audiovisuel: Clapperboard };
const COLORS = ["#3ec6b4", "#f2b928", "#f2a7b0", "#6fbf73", "#6ab8d8"];
/** Bulles en cercle autour de la photo. Survol (souris) ou toucher : une seule description à la fois. */
export default function Skills() {
  const ref = useReveal<HTMLDivElement>();
  const [active, setActive] = useState<number | null>(null);
  const [last, setLast] = useState(0);
  const ptr = useRef("touch");
  const show = (i: number | null) => { if (i !== null) { setLast(i); sfx.blip(); } setActive(i); };
  const s = skills[last];
  return (
    <div ref={ref} className="reveal sk">
      <h2 className="sec-title"><span>Mes compétences</span></h2>
      <div className="sk-stage">
        <div className="sk-center"><img src={profile.photo} alt="" /></div>
        {skills.map((k, i) => {
          const a = -Math.PI / 2 + (i / skills.length) * Math.PI * 2, Icon = ICONS[k.title] ?? Sparkles;
          return (
            <button key={k.title} className={`sk-bubble${active === i ? " on" : ""}`} aria-pressed={active === i}
              style={{ left: `${50 + Math.cos(a) * 38}%`, top: `${50 + Math.sin(a) * 38}%`, "--c": COLORS[i % 5], "--f": `${i * -0.8}s`, "--n": i } as React.CSSProperties}
              onPointerDown={(e) => { ptr.current = e.pointerType; }}
              onPointerEnter={(e) => e.pointerType === "mouse" && show(i)} onPointerLeave={(e) => e.pointerType === "mouse" && show(null)}
              onFocus={() => show(i)} onBlur={() => show(null)}
              onClick={() => ptr.current !== "mouse" && show(active === i ? null : i)}>
              <span className="sk-in"><Icon size={34} strokeWidth={2.2} /><b>{k.title}</b></span>
            </button>
          );
        })}
      </div>
      <div className={`sk-desc${active !== null ? " vis" : ""}`} aria-live="polite">
        <span className="ac-pill" style={{ background: COLORS[last % 5] }}>{s.title}</span>
        <p>{s.text}</p>
      </div>
    </div>
  );
}
