import { ArrowUp } from "lucide-react";
import { nav, profile } from "../data";
import { sfx } from "../sound";
const SIGNATURE = "Des pixels, du mouvement et une bonne dose de douceur."; // ✏️ à personnaliser
export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-grid">
        <div><strong className="ft-name">{profile.name}</strong><p>{SIGNATURE}</p></div>
        <nav aria-label="Raccourcis">{nav.map(([id, l]) => <a key={id} href={`#${id}`}>{l}</a>)}</nav>
        <nav aria-label="Réseaux">
          <a href={`mailto:${profile.email}`}>E-mail</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </div>
      <div className="ft-bottom">
        <small>© {new Date().getFullYear()} {profile.name} — Tous droits réservés.</small>
        <button onClick={() => { sfx.pop(); scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="Revenir en haut"><ArrowUp /></button>
      </div>
    </footer>
  );
}
