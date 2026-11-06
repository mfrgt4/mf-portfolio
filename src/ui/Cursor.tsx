import { useEffect, useRef, useState } from "react";
/** Curseur-gant (souris uniquement, désactivé sur tactile). */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [down, setDown] = useState(false);
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    document.body.classList.add("has-glove");
    const move = (e: MouseEvent) => { if (ref.current) ref.current.style.transform = `translate(${e.clientX - 8}px,${e.clientY - 4}px)`; };
    const d = () => setDown(true), u = () => setDown(false);
    addEventListener("mousemove", move); addEventListener("mousedown", d); addEventListener("mouseup", u);
    return () => { document.body.classList.remove("has-glove"); removeEventListener("mousemove", move); removeEventListener("mousedown", d); removeEventListener("mouseup", u); };
  }, []);
  return (
    <div ref={ref} className={`ac-glove${down ? " is-down" : ""}`} aria-hidden>
      <svg width="38" height="38" viewBox="0 0 38 38">
        <g fill="#fff" stroke="#8b6a4a" strokeWidth="2.5" strokeLinejoin="round">
          <rect x="3" y="4" width="11" height="9" rx="4.5" transform="rotate(-20 8 8)" />
          <path d="M10 12h12c5 0 8 3 8 8v4c0 5-3 9-8 9h-5c-5 0-8-3-9-8l-2-9c-.4-2 .8-4 4-4z" />
        </g>
      </svg>
    </div>
  );
}
