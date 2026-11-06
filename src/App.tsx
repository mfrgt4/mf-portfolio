import About from "./sections/About";
import Collab from "./sections/Collab";
import Footer from "./sections/Footer";
import Nav from "./sections/Nav";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Timeline from "./sections/Timeline";
import Toolbox from "./sections/Toolbox";
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <section id="a-propos" className="sec sec--first"><About /><Skills /></section>
        <section id="boite-a-outils" className="sec sec--sky"><Toolbox /></section>
        <section id="projets" className="sec sec--cream"><Projects /></section>
        <section id="parcours" className="sec sec--sage"><Timeline /></section>
        <section id="contact" className="sec sec--cream"><Collab /></section>
      </main>
      <Footer />
    </>
  );
}
