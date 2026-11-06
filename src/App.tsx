import { useEffect } from "react";
import { motionOn } from "./motion";
import About from "./sections/About";
import Collab from "./sections/Collab";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import IslandMap from "./sections/IslandMap";
import Nav from "./sections/Nav";
import Skills from "./sections/Skills";
import Timeline from "./sections/Timeline";
import Toolbox from "./sections/Toolbox";
export default function App() {
  useEffect(() => {
    // Variables de défilement : progression de page (--p) et parallaxe (--sy)
    let raf = 0;
    const upd = () => {
      raf = 0; const d = document.documentElement, h = d.scrollHeight - innerHeight;
      d.style.setProperty("--p", String(h > 0 ? scrollY / h : 0)); d.style.setProperty("--sy", motionOn() ? String(scrollY) : "0");
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(upd); };
    upd(); addEventListener("scroll", on, { passive: true });
    // Apparition au défilement des titres, listes en cascade, frise et visuel d'accueil
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { threshold: 0.15 });
    document.querySelectorAll(".sec-title, .stagger, .tl, .hero-art").forEach((el) => io.observe(el));
    return () => { removeEventListener("scroll", on); io.disconnect(); };
  }, []);
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <section id="a-propos" className="sec"><About /><Skills /></section>
        <section id="boite-a-outils" className="sec"><Toolbox /></section>
        <section id="projets" className="sec"><IslandMap /></section>
        <section id="parcours" className="sec"><Timeline /></section>
        <section id="contact" className="sec"><Collab /></section>
      </main>
      <Footer />
    </>
  );
}
