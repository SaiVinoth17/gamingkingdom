import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";
import { Trophy, Zap, Users } from "lucide-react";

const events = [
  { name: "Neon Smackdown — WWE 2K", date: "May 24", prize: "₹15,000", slots: "32 / 64" },
  { name: "Pixel Storm — Multiplayer Cup", date: "Jun 07", prize: "₹25,000", slots: "12 / 32" },
  { name: "Apex Drift — Forza Sim Race", date: "Jun 21", prize: "₹10,000", slots: "8 / 16" },
];

const leaderboard = [
  { rank: 1, name: "VOID_R3X", score: 9820, badge: "cyan" },
  { rank: 2, name: "NEON_GH0ST", score: 9412, badge: "pink" },
  { rank: 3, name: "K1RA-77", score: 9105, badge: "violet" },
  { rank: 4, name: "BLITZ_OPS", score: 8870, badge: "cyan" },
  { rank: 5, name: "MIRAGE.A", score: 8551, badge: "pink" },
];

export function Tournaments() {
  return (
    <section id="tournaments" className="relative py-28">
      <SectionHeader
        eyebrow="Esports"
        title="Live ·tournaments· & leaderboards"
        subtitle="Compete in monthly cups, climb the leaderboard and claim cash prizes inside the arena."
      />

      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 px-5 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-4">
          {events.map((e, i) => (
            <Reveal key={e.name} delay={i * 0.08}>
              <div className="glass neon-border group flex flex-col gap-4 overflow-hidden rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-pink/20">
                    <Trophy className="h-6 w-6 text-neon-cyan" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-neon-pink">
                      {e.date}
                    </div>
                    <h3 className="font-display text-lg font-bold">{e.name}</h3>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" /> {e.slots}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Zap className="h-3.5 w-3.5" /> Prize {e.prize}
                      </span>
                    </div>
                  </div>
                </div>
                <a
                  href="#booking"
                  className="rounded-lg bg-gradient-to-r from-neon-cyan to-neon-pink px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform group-hover:scale-105"
                >
                  Register
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="lg:col-span-2">
          <div className="glass neon-border h-full rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Leaderboard</h3>
              <span className="text-[10px] uppercase tracking-widest text-neon-cyan">
                Season 04
              </span>
            </div>
            <ul className="mt-5 divide-y divide-white/5">
              {leaderboard.map((p) => (
                <li key={p.rank} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-md font-display text-sm font-bold ${
                        p.rank === 1
                          ? "bg-neon-pink/20 text-neon-pink shadow-[0_0_20px_color-mix(in_oklab,var(--neon-pink)_50%,transparent)]"
                          : p.rank === 2
                            ? "bg-neon-cyan/20 text-neon-cyan"
                            : "bg-white/5 text-muted-foreground"
                      }`}
                    >
                      {p.rank}
                    </span>
                    <span className="font-display text-sm tracking-wider">{p.name}</span>
                  </div>
                  <span className="font-display text-sm font-bold neon-text">
                    {p.score.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
