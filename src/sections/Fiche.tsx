import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ExternalLink, Play, X } from "lucide-react";
import type { Media, Project } from "../data";
import { motionOn } from "../motion";
import { sfx } from "../sound";
import Pill from "../ui/Pill";
const SECTIONS: [keyof Project, string][] = [["context", "Contexte"], ["goals", "Objectifs"], ["role", "Mon rôle"], ["solutions", "Solutions créatives"], ["result", "Résultat final"]];
const TONES = [undefined, "wood", "teal", "yellow"] as const;

function MediaItem({ m, fit, poster }: { m: Media; fit?: string; poster?: string }) {
  const [play, setPlay] = useState(false);
  if (m.type === "image") return <img loading="lazy" src={m.src} alt={m.alt} style={{ objectFit: fit === "contain" ? "contain" : "cover" }} />;
  if (m.src.includes("youtube")) {
    const bg = m.poster ?? poster;
    return play ? <iframe src={m.src} title={m.alt} allow="autoplay; encrypted-media; fullscreen" allowFullScreen />
      : <button className="fi-play" onClick={() => setPlay(true)} aria-label={`Lire : ${m.alt}`}>{bg && <img src={bg} alt="" />}<span><Play size={34} /></span></button>;
  }
  return <video src={m.src} poster={m.poster} controls playsInline preload="metadata" />;
}

/** Fiche projet plein écran : s'ouvre en iris depuis le bâtiment cliqué, se referme de la même façon. */
export default function Fiche({ p, origin, onClose }: { p: Project; origin: { x: number; y: number }; onClose: () => void }) {
  const el = useRef<HTMLDivElement>(null), closing = useRef(false);
  const R = Math.hypot(innerWidth, innerHeight), at = `at ${origin.x}px ${origin.y}px`;
  const dur = (n: number) => (motionOn() ? n : 1);
  const close = () => {
    if (closing.current) return; closing.current = true; sfx.pop();
    const a = el.current!.animate([{ clipPath: `circle(${R}px ${at})` }, { clipPath: `circle(0px ${at})` }], { duration: dur(500), easing: "cubic-bezier(.6,0,.4,1)", fill: "forwards" });
    a.onfinish = onClose;
  };
  useEffect(() => {
    sfx.open(); document.body.style.overflow = "hidden";
    el.current!.animate([{ clipPath: `circle(0px ${at})` }, { clipPath: `circle(${R}px ${at})` }], { duration: dur(700), easing: "cubic-bezier(.5,0,.2,1)", fill: "both" });
    const k = (e: KeyboardEvent) => e.key === "Escape" && close();
    addEventListener("keydown", k);
    return () => { removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, []);
  const cover = p.thumbnail ?? p.media?.find((m) => m.type === "image")?.src;
  const links = [[p.link, p.linkLabel], [p.link2, p.linkLabel2]].filter(([u]) => u) as [string, string | undefined][];
  return (
    <div ref={el} className="fi" role="dialog" aria-modal aria-label={p.title}>
      <button className="fi-back" onClick={close}><ArrowLeft size={20} /> Retour à la carte</button>
      <button className="fi-x" onClick={close} aria-label="Fermer"><X size={26} /></button>
      <div className="fi-in">
        <div className="fi-tags"><Pill tone="yellow">{p.type ?? p.kind}</Pill>{p.collaboration && <Pill tone="teal">{p.collaboration}</Pill>}<Pill>{p.category === "perso" ? "Projet personnel" : "Projet universitaire"}</Pill></div>
        <h2 className="fi-title">{p.title}</h2>
        {cover && <div className="fi-cover" style={{ "--c": p.color } as CSSProperties}><img src={cover} alt="" style={{ objectFit: p.fit === "contain" ? "contain" : "cover" }} /></div>}
        <section className="fi-card"><h3>Le projet</h3><p>{p.pitch ?? p.text}</p></section>
        {SECTIONS.map(([k, label]) => p[k] && <section key={k} className="fi-card"><h3>{label}</h3><p>{p[k] as string}</p></section>)}
        <section className="fi-card"><h3>Outils & compétences</h3><div className="fi-pills">{p.stack.map((s, i) => <Pill key={s} tone={TONES[i % 4]}>{s}</Pill>)}</div></section>
        {links.length > 0 && <div className="fi-links">{links.map(([u, l]) => <a key={u} href={u} target="_blank" rel="noopener noreferrer" className="ac-pill ac-pill--wood"><ExternalLink size={16} /> {l ?? "Voir"}</a>)}</div>}
        {p.media && p.media.length > 0 && <section><h3 className="fi-h">Galerie</h3><div className="fi-gallery">{p.media.map((m) => <figure key={m.src}><MediaItem m={m} fit={p.fit} poster={p.thumbnail} /></figure>)}</div></section>}
      </div>
    </div>
  );
}
