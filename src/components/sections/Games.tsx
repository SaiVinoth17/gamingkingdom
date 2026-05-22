import { useState } from "react";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";

import rdr2 from "@/assets/games/rdr2.jpg";
import ghostTsushima from "@/assets/games/ghost-tsushima.jpg";
import cyberpunk from "@/assets/games/cyberpunk.jpg";
import gow from "@/assets/games/gow.jpg";
import gta6 from "@/assets/games/gta6.jpg";
import fc26 from "@/assets/games/fc26.jpg";
import mk1 from "@/assets/games/mk1.jpg";
import cod from "@/assets/games/cod.jpg";
import tekken from "@/assets/games/tekken.jpg";
import wwe from "@/assets/games/wwe.jpg";
import reVillage from "@/assets/games/re-village.jpg";
import beatSaber from "@/assets/games/beat-saber.jpg";
import re4 from "@/assets/games/re4.jpg";
import rollerCoaster from "@/assets/games/roller-coaster.jpg";
import zombieVr from "@/assets/games/zombie-vr.jpg";
import miniGolf from "@/assets/games/mini-golf.jpg";
import gt7 from "@/assets/games/gt7.jpg";
import forza from "@/assets/games/forza.jpg";
import euroTruck from "@/assets/games/euro-truck.jpg";
import snowrunner from "@/assets/games/snowrunner.jpg";
import wrc from "@/assets/games/wrc.jpg";
import gta5 from "@/assets/games/gta5.jpg";

type Game = {
  name: string;
  tag: string;
  poster: string;
  status?: string;
};

const catalog: Record<string, Game[]> = {
  "Story Mode": [
    { name: "Grand Theft Auto V", tag: "PS5 · Los Santos", poster: gta5 },
    { name: "Red Dead Redemption 2", tag: "PS5 · Open World", poster: rdr2 },
    { name: "Ghost of Tsushima", tag: "PS5 · Samurai Epic", poster: ghostTsushima },
    { name: "Cyberpunk 2077", tag: "PS5 · Sci-Fi RPG", poster: cyberpunk },
    { name: "God of War Ragnarök", tag: "PS5 · Action", poster: gow },
    { name: "GTA VI", tag: "Upcoming · 2026", poster: gta6, status: "Soon" },
  ],
  Multiplayer: [
    { name: "EA Sports FC 26", tag: "1v1 · Co-op · Football", poster: fc26 },
    { name: "Mortal Kombat 1", tag: "Fighting · 1v1", poster: mk1 },
    { name: "Call of Duty · Black Ops 6", tag: "FPS · Squad", poster: cod },
    { name: "Tekken 8", tag: "Fighting · 1v1", poster: tekken },
    { name: "WWE 2K", tag: "Wrestling · 1v1", poster: wwe },
  ],
  "VR Games": [
    { name: "Resident Evil Village VR", tag: "Meta Quest · Horror", poster: reVillage },
    { name: "Beat Saber", tag: "Meta Quest · Rhythm", poster: beatSaber },
    { name: "Resident Evil 4 VR", tag: "Meta Quest · Horror", poster: re4 },
    { name: "Roller Coaster VR", tag: "Meta Quest · Thrill", poster: rollerCoaster },
    { name: "Zombie Shooter VR", tag: "Meta Quest · Action", poster: zombieVr },
    { name: "Walkabout Mini Golf", tag: "Meta Quest · Casual", poster: miniGolf },
  ],
  "Racing & Sim": [
    { name: "Gran Turismo 7", tag: "PS5 · Wheel + Pedals", poster: gt7 },
    { name: "Forza Horizon", tag: "Simulator · Wheel", poster: forza },
    { name: "Euro Truck Simulator", tag: "Wheel · Trucking", poster: euroTruck },
    { name: "SnowRunner", tag: "Off-road Sim", poster: snowrunner },
    { name: "WRC Rally", tag: "Rally · Wheel", poster: wrc },
  ],
};

const tabs = Object.keys(catalog);

export function Games() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="games" className="relative py-28">
      <SectionHeader
        eyebrow="Library"
        title="Our ·game catalog·"
        subtitle="Tap a category to reveal the titles we have on deck — story epics, multiplayer arenas, VR worlds and racing sims."
      />

      <div className="mx-auto mt-12 max-w-6xl px-5">
        <Reveal>
          <div className="glass mx-auto flex w-full max-w-2xl flex-wrap justify-center gap-1 rounded-2xl p-1.5">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActive(active === t ? null : t)}
                className={`relative flex-1 rounded-xl px-4 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all ${
                  active === t
                    ? "bg-gradient-to-r from-neon-cyan to-neon-pink text-primary-foreground shadow-[0_0_25px_color-mix(in_oklab,var(--neon-pink)_45%,transparent)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        {!active ? (
          <Reveal>
            <div className="mt-10 grid place-items-center rounded-2xl border border-dashed border-white/10 px-6 py-20 text-center">
              <div className="text-[10px] uppercase tracking-[0.4em] text-neon-cyan">
                Select a category
              </div>
              <p className="mt-3 max-w-md font-display text-xl font-bold">
                Pick a category above to see our <span className="neon-text">game lineup</span>
              </p>
            </div>
          </Reveal>
        ) : (
          <div key={active} className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {catalog[active].map((g, i) => (
              <Reveal key={g.name} delay={i * 0.06}>
                <div className="group relative overflow-hidden rounded-2xl neon-border">
                  <div className="relative aspect-[3/4] bg-deep">
                    <img
                      src={g.poster}
                      alt={`${g.name} poster`}
                      loading="lazy"
                      width={768}
                      height={1024}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/30 to-transparent" />

                    <div className="absolute left-4 top-4 rounded-md bg-deep/70 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-neon-cyan backdrop-blur">
                      {g.tag.split("·")[0]?.trim()}
                    </div>
                    {g.status && (
                      <span className="absolute right-3 top-3 rounded-md bg-neon-pink/20 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-neon-pink backdrop-blur">
                        {g.status}
                      </span>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-display text-lg font-bold leading-tight">{g.name}</h3>
                      <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                        {g.tag}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
