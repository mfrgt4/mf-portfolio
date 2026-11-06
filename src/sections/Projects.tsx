import { categories, projects } from "../data";
/** Liste provisoire des vrais projets de data.ts, en attendant la carte interactive (carte.png). */
export default function Projects() {
  return (
    <>
      <h2 className="sec-title"><span>Mes projets</span></h2>
      {categories.map(([cat, label]) => (
        <div key={cat} className="pj-block">
          <h3>{label}</h3>
          <div className="pj-grid">
            {projects.filter((p) => p.category === cat).map((p) => {
              const url = p.link && !p.link.endsWith(".pdf") ? p.link : undefined;
              const Tag = url ? "a" : "div";
              return (
                <Tag key={p.title} className="pj-card" {...(url ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="ac-pill ac-pill--yellow">{p.type ?? p.kind}</span>
                  <h4>{p.title}</h4><p>{p.text}</p>
                </Tag>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
