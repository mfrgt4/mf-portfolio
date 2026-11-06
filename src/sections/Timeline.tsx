import { useState, type CSSProperties } from "react";
import { Backpack, GraduationCap, Laptop, Palette, type LucideIcon } from "lucide-react";
import { studies } from "../data";
import { useReveal } from "../hooks";
import { sfx } from "../sound";
const ICONS: LucideIcon[] = [Backpack, Laptop, Palette];
const steps = [...studies].reverse(); // data.ts est du plus récent au plus ancien
function Step({ s, i }: { s: (typeof studies)[number]; i: number }) {
  const ref = useReveal<HTMLLIElement>(), [open, setOpen] = useState(false), Icon = ICONS[i] ?? GraduationCap;
  return (
    <li ref={ref} className="tl-step reveal" style={{ "--fx": i % 2 ? "50px" : "-50px" } as CSSProperties}>
      {i > 0 && "accent" in s && s.accent && <span className="ac-pill ac-pill--teal tl-turn">↪ Réorientation</span>}
      <span className="tl-node"><Icon size={26} /></span>
      <button className={`tl-card${open ? " open" : ""}${"accent" in s && s.accent ? " now" : ""}`} onClick={() => { setOpen(!open); sfx.pop(); }} aria-expanded={open}>
        <span className="ac-pill">{s.when}</span>
        <strong>{s.title}</strong>
        <span className="tl-more"><span>{s.text}</span></span>
      </button>
    </li>
  );
}
export default function Timeline() {
  return (
    <>
      <h2 className="sec-title"><span>Mon parcours</span></h2>
      <ol className="tl">{steps.map((s, i) => <Step key={s.title} s={s} i={i} />)}</ol>
    </>
  );
}
