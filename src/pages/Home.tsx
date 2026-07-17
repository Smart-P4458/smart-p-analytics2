import Hero from "../components/hero/Hero";
import About from "../components/about/About";
import Services from "../components/services/Services";
import Projects from "../components/projects/Projects";
import Skills from "../components/skills/Skills";
import Testimonials from "./Testimonials";

export default function Home() {
  return (
    <>
      <Hero />

      <About />

      <Services />

      <Projects />

      <Skills />

      <Testimonials />

    </>
  );
}