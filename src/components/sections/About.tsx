import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";
import { Zap, MapPin, Clock, Users } from "lucide-react";

const stats = [
  { icon: MapPin, label: "Location", value: "Ooty" },
  { icon: Clock, label: "Open Daily", value: "10 AM — 10 PM" },
  { icon: Users, label: "Capacity", value: "40 Players" },
  { icon: Zap, label: "Power Backup", value: "Always On" },
];

export function About() {
  return (
    <section id="about" className="relative py-28">
      <SectionHeader
        eyebrow="The Arena"
        title="A futuristic ·gaming arena· built for next-gen play"
        subtitle="Designed for gamers who crave immersive entertainment — premium consoles, VR experiences, multiplayer battles, racing simulators, and a luxury cyberpunk ambience nestled in the hills of Ooty."
      />

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-4 px-5 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="glass neon-border group relative overflow-hidden rounded-2xl p-6 transition-transform hover:-translate-y-1">
              <s.icon className="h-6 w-6 text-neon-cyan transition-colors group-hover:text-neon-pink" />
              <div className="mt-6 font-display text-2xl font-bold">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {s.label}
              </div>
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-neon-cyan/10 blur-2xl transition-all group-hover:bg-neon-pink/20" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
