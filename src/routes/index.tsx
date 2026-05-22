import { createFileRoute } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CinematicLoader } from "@/components/CinematicLoader";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Features } from "@/components/sections/Features";
import { Games } from "@/components/sections/Games";
import { Gallery } from "@/components/sections/Gallery";
import { Menu } from "@/components/sections/Menu";
import { Booking } from "@/components/sections/Booking";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Gaming Kingdom Ooty — Futuristic Gaming Center · PS5, VR & Racing Sims" },
      {
        name: "description",
        content:
          "Ooty's premium cyberpunk gaming arena. PS5, Meta Quest VR, racing simulators, multiplayer tournaments & cafe. Open 10 AM–10 PM. Book online.",
      },
      { property: "og:title", content: "The Gaming Kingdom Ooty — Next-Gen Gaming Center" },
      {
        property: "og:description",
        content: "Cyberpunk gaming arena in Ooty: PS5, VR, racing sims, tournaments and cafe.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="dark relative min-h-screen text-foreground antialiased">
      <CinematicLoader />
      <AmbientBackground />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Features />
        <Games />
        <Gallery />
        <Menu />
        <Booking />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
