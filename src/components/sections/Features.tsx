import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";
import { Gamepad2, Glasses, Car, Swords, Dices, Coffee } from "lucide-react";

const features = [
  {
    icon: Gamepad2,
    title: "PlayStation Zone",
    desc: "Walk through every era of PlayStation in one arena.",
    items: ["PS1", "PS2", "PS3", "PS4", "PS5"],
    accent: "cyan",
  },
  {
    icon: Glasses,
    title: "VR Gaming",
    desc: "Ooty's exclusive Meta Quest immersive experience.",
    items: ["Meta Quest", "VR Horror", "Immersive Worlds"],
    accent: "pink",
  },
  {
    icon: Car,
    title: "Racing Simulator",
    desc: "Force-feedback wheel and cockpit for full immersion.",
    items: ["Racing Wheel", "Cockpit Rig", "Forza Horizon"],
    accent: "cyan",
  },
  {
    icon: Swords,
    title: "Multiplayer Arena",
    desc: "Squad up for tournaments and team battles.",
    items: ["Battle Stations", "Team Modes", "Tournaments"],
    accent: "pink",
  },
  {
    icon: Dices,
    title: "Offline Games",
    desc: "Classic games for breaks between battles.",
    items: ["Chess", "Carrom"],
    accent: "cyan",
  },
  {
    icon: Coffee,
    title: "Food & Refreshments",
    desc: "Fuel your runs with snacks, drinks & cafe vibes.",
    items: ["Snacks", "Drinks", "Gaming Cafe"],
    accent: "pink",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-28">
      <SectionHeader
        eyebrow="Zones"
        title="Six immersive ·worlds· under one neon roof"
        subtitle="Every zone is engineered for atmosphere — RGB lighting, premium hardware and seating built for marathon sessions."
      />

      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 px-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.06}>
            <article className="glass neon-border group relative h-full overflow-hidden rounded-2xl p-7 transition-all duration-500 hover:-translate-y-2">
              <div
                className={`absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl transition-all duration-500 ${
                  f.accent === "cyan"
                    ? "bg-neon-cyan/15 group-hover:bg-neon-cyan/30"
                    : "bg-neon-pink/15 group-hover:bg-neon-pink/30"
                }`}
              />
              <div
                className={`relative grid h-12 w-12 place-items-center rounded-xl ${
                  f.accent === "cyan"
                    ? "bg-neon-cyan/10 text-neon-cyan"
                    : "bg-neon-pink/10 text-neon-pink"
                }`}
              >
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {f.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-wider text-foreground/80"
                  >
                    {it}
                  </span>
                ))}
              </div>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
