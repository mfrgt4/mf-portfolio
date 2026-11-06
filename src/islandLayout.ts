import { Armchair, Clapperboard, Coffee, Dumbbell, Ghost, Globe, Image as ImageIcon, Landmark, Martini, PenLine, Sparkles, Utensils, type LucideIcon } from "lucide-react";
import type { Project } from "./data";
export type Spot = { x: number; y: number; kind: "house" | "flat" | "tower"; c1: string; c2: string; Icon: LucideIcon };
/** ✏️ Emplacement des bâtiments (x, y en % de la carte). Clé = mot présent dans le titre du projet. */
const SPOTS: [string, Spot][] = [
  ["Petit Café", { x: 20, y: 30, kind: "house", c1: "#fde3e0", c2: "#8b6a4a", Icon: Coffee }],
  ["Montages", { x: 36, y: 24, kind: "flat", c1: "#cfe6f7", c2: "#5b8fb9", Icon: Clapperboard }],
  ["Affiches", { x: 22, y: 52, kind: "flat", c1: "#fff6dc", c2: "#f2a7b0", Icon: ImageIcon }],
  ["Blog", { x: 38, y: 48, kind: "house", c1: "#e8d9f6", c2: "#b48fd6", Icon: PenLine }],
  ["Mon portfolio", { x: 30, y: 72, kind: "tower", c1: "#ffffff", c2: "#3ec6b4", Icon: Globe }],
  ["mojito", { x: 78, y: 76, kind: "flat", c1: "#ffe8a8", c2: "#3ec6b4", Icon: Martini }],
  ["surnaturel", { x: 80, y: 28, kind: "tower", c1: "#8e83a8", c2: "#3d3555", Icon: Ghost }],
  ["Decathlon", { x: 66, y: 40, kind: "flat", c1: "#bfe0f5", c2: "#1f6fb5", Icon: Dumbbell }],
  ["IKEA", { x: 84, y: 52, kind: "flat", c1: "#fff2a8", c2: "#2a6fc9", Icon: Armchair }],
  ["D'Jam", { x: 64, y: 22, kind: "house", c1: "#f6e7cf", c2: "#d13670", Icon: Landmark }],
  ["The Pit", { x: 66, y: 66, kind: "flat", c1: "#3b3340", c2: "#e761aa", Icon: Utensils }],
];
const norm = (s: string) => s.replace(/[’]/g, "'");
/** Placement automatique pour tout nouveau projet : rive gauche = perso, rive droite = universitaire. */
export function placeProjects(list: Project[]) {
  const used: { x: number; y: number }[] = [];
  const placed = list.map((p) => {
    const hit = SPOTS.find(([k]) => norm(p.title).includes(k))?.[1];
    return { p, spot: hit && { ...hit, ...p.island } };
  });
  placed.forEach((o) => o.spot && used.push(o.spot));
  return placed.map(({ p, spot }) => {
    if (spot) return { p, spot };
    const xs = p.category === "perso" ? [16, 28, 40] : [64, 76, 88];
    const cand = xs.flatMap((x) => [20, 34, 48, 62, 76].map((y) => ({ x, y })));
    const free = cand.find((c) => used.every((u) => Math.abs(u.x - c.x) > 11 || Math.abs(u.y - c.y) > 13)) ?? cand[0];
    const pos = { ...free, ...p.island };
    used.push(pos);
    return { p, spot: { ...pos, kind: "house" as const, c1: "#fff6dc", c2: p.category === "perso" ? "#6fbf73" : "#f2a7b0", Icon: Sparkles } };
  });
}
