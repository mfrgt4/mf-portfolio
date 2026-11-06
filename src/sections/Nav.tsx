import { useState } from "react";
import { Sparkles } from "lucide-react";
import { nav } from "../data";
import { motionOn } from "../motion";
import { sfx } from "../sound";
import Glove from "../ui/Glove";
/** Menu horizontal flottant (main + rond jaune au survol), barre de progression, bouton animations. */
export default function Nav() {
  const [on, setOn] = useState(motionOn());
  const toggle = () => { const n = !on; document.documentElement.dataset.motion = n ? "on" : "off"; setOn(n); sfx.pop(); };
  return (
    <header className="nav">
      <div className="nav-progress" />
      <nav aria-label="Navigation principale">
        <ul>
          {nav.map(([id, label]) => (
            <li key={id}><a href={`#${id}`} onMouseEnter={() => sfx.blip()} onClick={() => sfx.pop()}><Glove /><span>{label}</span></a></li>
          ))}
        </ul>
        <button className="nav-motion" onClick={toggle} aria-pressed={on} aria-label="Animations" title={on ? "Animations activées" : "Animations désactivées"}><Sparkles size={18} /></button>
      </nav>
    </header>
  );
}
