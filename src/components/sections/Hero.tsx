import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Gamepad2, Sparkles } from "lucide-react";
import controller from "@/assets/controller.png";
import vrHeadset from "@/assets/vr-headset.png";
import ps5Img from "@/assets/ps5.png";
import ps4Img from "@/assets/ps4.png";

const consoleCycle = [
  { name: "PS5", img: ps5Img },
  { name: "PS4", img: ps4Img },
  { name: "VR · Quest", img: vrHeadset },
] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [consoleIdx, setConsoleIdx] = useState(0);
  const activeConsole = consoleCycle[consoleIdx];
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-screen items-center pt-32 md:pt-24"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-5 md:grid-cols-12 md:items-center">
        <motion.div style={{ opacity }} className="md:col-span-7">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-neon-cyan"
          >
            <Sparkles className="h-3.5 w-3.5" /> Ooty's exclusive Meta Quest experience
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-black leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem]"
          >
            ENTER THE
            <br />
            <span className="neon-text animate-flicker">NEXT GENERATION</span>
            <br />
            OF GAMING
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl"
          >
            Immersive PS5, VR, racing simulators and multiplayer arenas — inside a futuristic
            cyberpunk gaming arena in the heart of Ooty.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#booking"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-neon-cyan to-neon-pink px-7 py-3.5 font-semibold uppercase tracking-wider text-primary-foreground shadow-[0_0_40px_color-mix(in_oklab,var(--neon-pink)_55%,transparent)] transition-transform hover:scale-[1.03]"
            >
              Book Now{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href="#games"
              className="glass inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold uppercase tracking-wider text-foreground transition-all hover:border-neon-cyan/60 hover:text-neon-cyan"
            >
              <Gamepad2 className="h-4 w-4" /> Explore Games
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-4"
          >
            {[
              { v: "40", l: "Players / Slot" },
              { v: "10—10", l: "Open Daily" },
              { v: "100%", l: "Power Backup" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-xl p-3 text-center">
                <div className="font-display text-2xl font-bold neon-text">{s.v}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* 3D floating stage */}
        <div className="relative h-[420px] md:col-span-5 md:h-[560px]">
          <motion.div style={{ y: y2 }} className="absolute inset-0 grid place-items-center">
            <div className="relative h-72 w-72 md:h-96 md:w-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-cyan/30 to-neon-pink/30 blur-3xl animate-pulse-glow" />
              <div className="absolute inset-6 rounded-full border border-neon-cyan/30" />
              <div className="absolute inset-12 rounded-full border border-neon-pink/30" />
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.img
              key={activeConsole.name}
              src={activeConsole.img}
              alt={activeConsole.name}
              width={520}
              height={520}
              initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ y: y1 }}
              className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 animate-float drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
            />
          </AnimatePresence>
          <motion.img
            src={controller}
            alt="Controller"
            width={300}
            height={300}
            style={{ y: y2 }}
            className="absolute -right-2 bottom-2 w-44 md:w-56 animate-float drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
          />

          {/* HUD chip — click to cycle console */}
          <motion.button
            type="button"
            onClick={() => setConsoleIdx((i) => (i + 1) % consoleCycle.length)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="glass absolute right-0 top-32 cursor-pointer rounded-xl px-3 py-2 text-xs text-left transition-all hover:border-neon-pink/60 hover:scale-105"
          >
            <div className="text-[10px] uppercase tracking-widest text-neon-pink">
              Console · Tap to switch
            </div>
            <div className="font-display text-sm">{activeConsole.name}</div>
          </motion.button>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-neon-cyan/40 p-1">
          <motion.span
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-2 w-1 rounded-full bg-neon-cyan"
          />
        </div>
      </div>
    </section>
  );
}
