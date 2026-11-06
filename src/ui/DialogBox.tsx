import { useEffect, useRef, useState } from "react";
import { sfx } from "../sound";
type Props = { speaker?: string; lines: string[]; onDone?: () => void };
/** Dialogue à écriture progressive. Clic/Entrée : finir la ligne, puis passer à la suivante. */
export default function DialogBox({ speaker, lines, onDone }: Props) {
  const [i, setI] = useState(0), [n, setN] = useState(0);
  const text = lines[i];
  const reduced = useRef(matchMedia("(prefers-reduced-motion: reduce)").matches);
  const done = n >= text.length;
  useEffect(() => { setN(reduced.current ? text.length : 0); }, [text]);
  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => { setN(n + 1); if (n % 3 === 0) sfx.blip(); }, 28);
    return () => clearTimeout(t);
  }, [n, done]);
  const next = () => {
    if (!done) return setN(text.length);
    sfx.pop();
    if (i < lines.length - 1) setI(i + 1); else onDone?.();
  };
  return (
    <div className="ac-dialog" role="button" tabIndex={0} onClick={next}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") next(); }}>
      {speaker && <span className="ac-dialog__name">{speaker}</span>}
      <div className="ac-dialog__body">
        <span className="sr">{text}</span>
        <p aria-hidden>{text.slice(0, n)}</p>
        {done && <span className="ac-dialog__next" aria-hidden>▼</span>}
      </div>
    </div>
  );
}
