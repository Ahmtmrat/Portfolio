import SpaceScene from "@/components/SpaceScene";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import CodeShowcase from "@/components/CodeShowcase";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SpaceScene />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <CodeShowcase />
        <Skills />
        <Contact />
      </main>
      <Footer year={new Date().getFullYear()} />
    </>
  );
}
