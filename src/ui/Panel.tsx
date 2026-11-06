import type { ReactNode } from "react";
export default function Panel({ title, children }: { title: string; children: ReactNode }) {
  return <section className="ac-panel"><h2 className="ac-panel__title">{title}</h2>{children}</section>;
}
