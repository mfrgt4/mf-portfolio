import { useState } from "react";
import { about, nav, profile, tools } from "./data";
import { sfx } from "./sound";
import Cursor from "./ui/Cursor";
import DialogBox from "./ui/DialogBox";
import Panel from "./ui/Panel";
import Pill from "./ui/Pill";

/** Page de démonstration du design system (étape 1). Sera remplacée par l'intro puis l'île. */
export default function App() {
  const [muted, setMuted] = useState(false);
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeContent: "center", gap: "3rem", padding: "3rem 1.2rem",
      background: "radial-gradient(ellipse at 20% 10%, #cfeac3 0 30%, transparent 31%), radial-gradient(ellipse at 80% 90%, #b3dba9 0 28%, transparent 29%), var(--sage)" }}>
      <Cursor />
      <DialogBox speaker={profile.name.split(" ")[0]} lines={[about[0], about[1]]} />
      <Panel title="Menu">
        <ul className="ac-menu">
          {nav.map(([id, label]) => <li key={id}><button onClick={() => sfx.open()}>{label}</button></li>)}
        </ul>
      </Panel>
      <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", maxWidth: 640 }}>
        {tools.slice(0, 10).map((t, i) => <Pill key={t} tone={(["wood", "teal", "yellow", undefined] as const)[i % 4]}>{t}</Pill>)}
      </div>
      <button className="ac-pill ac-pill--wood" style={{ border: 0, justifySelf: "start" }}
        onClick={() => { sfx.setMuted(!muted); setMuted(!muted); sfx.pop(); }}>{muted ? "🔇 Son coupé" : "🔊 Son activé"}</button>
    </main>
  );
}
