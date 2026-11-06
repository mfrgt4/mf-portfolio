import type { ReactNode } from "react";
export default function Pill({ tone, children }: { tone?: "wood" | "teal" | "yellow"; children: ReactNode }) {
  return <span className={`ac-pill${tone ? ` ac-pill--${tone}` : ""}`}>{children}</span>;
}
