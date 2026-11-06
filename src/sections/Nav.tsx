import { nav } from "../data";
import { sfx } from "../sound";
import Glove from "../ui/Glove";
/** Menu horizontal flottant. Main + rond jaune uniquement au survol/focus. */
export default function Nav() {
  return (
    <header className="nav">
      <nav aria-label="Navigation principale">
        <ul>
          {nav.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} onMouseEnter={() => sfx.blip()} onClick={() => sfx.pop()}><Glove /><span>{label}</span></a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
