import { about, facts, profile } from "../data";
import { useReveal } from "../hooks";
const clean = (s: string) => s.replace(/^[^\p{L}\p{N}]+/u, "");
/** Carte d'identité (réf. carte de villageois) : tout vient de data.ts. */
export default function About() {
  const ref = useReveal<HTMLDivElement>();
  const [city, formation, goal] = facts.map(clean);
  const fields: [string, string, boolean?][] = [
    ["Statut", profile.roles[profile.roles.length - 1]], ["Formation", formation],
    ["Ville", city], ["Objectif", goal], ["Rôles", profile.roles.slice(0, 3).join(" · "), true],
  ];
  return (
    <>
      <h2 className="sec-title"><span>À propos</span></h2>
      <div ref={ref} className="reveal id-wrap">
        <article className="id-card" aria-label="Carte d'identité">
          <div>
            <div className="id-photo"><img src={profile.photo} alt={`Portrait de ${profile.name}`} /></div>
            <div className="id-name"><small>Nom</small>{profile.name}</div>
          </div>
          <dl className="id-fields stagger">
            {fields.map(([k, v, wide]) => <div key={k} className={`id-field${wide ? " wide" : ""}`}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
        </article>
        <div className="speech">
          <span className="speech-name">{profile.name.split(" ")[0]}</span>
          {about.map((p) => <p key={p}>{p}</p>)}
        </div>
      </div>
    </>
  );
}
