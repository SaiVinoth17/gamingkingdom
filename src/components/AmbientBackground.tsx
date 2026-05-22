import { useEffect, useRef } from "react";

/** Mouse-reactive cinematic background with grid + particles + glow. */
export function AmbientBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let hasMoved = false;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!hasMoved) {
        currentX = targetX;
        currentY = targetY;
        hasMoved = true;
      }
    };

    const updatePosition = () => {
      if (hasMoved) {
        // Butter-smooth linear interpolation (lerp) for trailing effect
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(calc(${currentX}px - 50%), calc(${currentY}px - 50%), 0)`;
        }
      }
      rafId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg animate-grid-pan opacity-60" />
      <div
        ref={glowRef}
        className="pointer-events-none absolute h-[800px] w-[800px] rounded-full opacity-60 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--neon-cyan) 18%, transparent) 0%, transparent 65%)",
          left: 0,
          top: 0,
          transform: "translate3d(-1000px, -1000px, 0)",
        }}
      />
      <div className="absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full bg-neon-pink/30 blur-[120px] animate-pulse-glow" />
      <div
        className="absolute -bottom-40 -right-32 h-[34rem] w-[34rem] rounded-full bg-neon-cyan/30 blur-[120px] animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />
      <Particles />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.08_0.05_275/0.4)_0%,transparent_30%,transparent_70%,oklch(0.08_0.05_275/0.6)_100%)]" />
    </div>
  );
}

function Particles() {
  const dots = Array.from({ length: 38 });
  return (
    <div className="absolute inset-0">
      {dots.map((_, i) => {
        const size = 1 + Math.random() * 3;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const dur = 6 + Math.random() * 10;
        const delay = Math.random() * 8;
        const pink = i % 3 === 0;
        return (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background: pink ? "var(--neon-pink)" : "var(--neon-cyan)",
              boxShadow: `0 0 ${size * 4}px ${pink ? "var(--neon-pink)" : "var(--neon-cyan)"}`,
              animation: `float-y ${dur}s ease-in-out ${delay}s infinite`,
              opacity: 0.6,
            }}
          />
        );
      })}
    </div>
  );
}
