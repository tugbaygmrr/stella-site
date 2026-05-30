import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import PanelStage from "./components/PanelStageClient";
import PanelShowcase from "./components/PanelShowcaseClient";
import InteriorShowcase from "./components/InteriorShowcase";
import ProductShowcase from "./components/ProductShowcase";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import Team from "./components/Team";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-warm text-charcoal">
      <PanelStage />
      <Navigation />
      <Hero />
      <PanelShowcase />
      <InteriorShowcase />
      <ProductShowcase />
      <Blog />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}
