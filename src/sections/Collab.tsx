import { useState, type CSSProperties } from "react";
import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data";
import { useReveal } from "../hooks";
import { sfx } from "../sound";
export default function Collab() {
  const ref = useReveal<HTMLDivElement>(), [ping, setPing] = useState(-1);
  const items = [
    { label: "E-mail", href: `mailto:${profile.email}`, Icon: Mail, c: "#f2a7b0" },
    { label: "LinkedIn", href: profile.linkedin, Icon: Linkedin, c: "#6ab8d8", ext: true },
    { label: "GitHub", href: profile.github, Icon: Github, c: "#8b6a4a", ext: true },
    { label: "Mon CV", href: profile.cv, Icon: FileText, c: "#3ec6b4", ext: true },
  ];
  return (
    <div ref={ref} className="reveal co">
      <h2 className="sec-title"><span>Travaillons ensemble !</span></h2>
      <p className="co-lead">Un projet, une idée ou un stage à construire ? Venez en discuter, je réponds avec plaisir.</p>
      <div className="co-grid stagger">
        {items.map(({ label, href, Icon, c, ext }, i) => (
          <a key={label} href={href} className={`co-card${ping === i ? " ping" : ""}`} style={{ "--c": c } as CSSProperties}
            {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} onMouseEnter={() => sfx.blip()}
            onClick={() => { sfx.open(); setPing(i); setTimeout(() => setPing(-1), 700); }}>
            <span className="co-ico"><Icon size={34} /></span><span className="ac-pill ac-pill--wood">{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
