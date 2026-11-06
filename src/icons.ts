import { siReact, siTypescript, siThreedotjs, siVite, siVercel, siHtml5, siCss, siJavascript, siPhp, siMysql, siGit, siGithub, siFigma, siWordpress, siNotion } from "simple-icons";
export type Icon = { path: string; hex: string } | { text: string; bg: string; fg: string };
/** Nom (tel qu'écrit dans `tools` de data.ts) → icône. Les outils sans icône s'affichent en pastille de texte. */
export const icons: Record<string, Icon> = {
  React: siReact, TypeScript: siTypescript, "three.js": siThreedotjs, Vite: siVite, Vercel: siVercel, HTML5: siHtml5, CSS3: siCss,
  JavaScript: siJavascript, PHP: siPhp, SQL: siMysql, Git: siGit, GitHub: siGithub, Figma: siFigma, WordPress: siWordpress, Notion: siNotion,
  // Adobe n'est plus dans les bibliothèques libres : badges typographiques (remplaçables par tes SVG officiels).
  InDesign: { text: "Id", bg: "#49021F", fg: "#FF3366" }, Photoshop: { text: "Ps", bg: "#001E36", fg: "#31A8FF" },
  Illustrator: { text: "Ai", bg: "#330000", fg: "#FF9A00" }, "After Effects": { text: "Ae", bg: "#00005B", fg: "#9999FF" },
  "Premiere Pro": { text: "Pr", bg: "#00005B", fg: "#9999FF" },
};
