import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CinematicLoader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-deep"
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative text-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl font-black tracking-[0.3em]"
            >
              THE <span className="neon-text">GAMING KINGDOM</span>
            </motion.div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Level up your fun
            </div>
            <div className="mt-5 h-0.5 w-56 overflow-hidden rounded bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full w-full bg-gradient-to-r from-neon-cyan to-neon-pink"
              />
            </div>
            <div className="mt-3 text-[10px] uppercase tracking-[0.4em] text-muted-foreground animate-flicker">
              Booting Arena
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
