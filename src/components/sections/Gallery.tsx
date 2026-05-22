import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";
import interiorBlue from "@/assets/interior-blue.jpg";
import interiorNeon from "@/assets/interior-neon.jpg";
import interiorPink from "@/assets/interior-pink.jpg";
import interiorFifa from "@/assets/interior-fifa.jpg";

const shots = [
  { src: interiorPink, label: "Neon Tunnel", tag: "Multiplayer Lounge" },
  { src: interiorBlue, label: "Cyber Wall", tag: "PS5 Zone" },
  { src: interiorNeon, label: "Glow Frame", tag: "VR Bay" },
  { src: interiorFifa, label: "Match Night", tag: "FC 26 Live" },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative py-28">
      <SectionHeader
        eyebrow="Inside the Kingdom"
        title="Step inside the ·neon arena·"
        subtitle="A look at the real interior — neon-framed walls, premium consoles, racing rigs and immersive lounges."
      />

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 px-5 sm:grid-cols-2 lg:grid-cols-4">
        {shots.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="group relative overflow-hidden rounded-2xl neon-border">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={s.src}
                  alt={`The Gaming Kingdom Ooty — ${s.label}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-neon-cyan">
                    {s.tag}
                  </div>
                  <div className="mt-1 font-display text-base font-bold">{s.label}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
