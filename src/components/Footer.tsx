import { Instagram, MessageCircle, Phone } from "lucide-react";
import crownLogo from "@/assets/crown-logo.png";

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-white/5 py-14">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-pink to-transparent" />
      <div className="absolute inset-0 -z-10 bg-deep/40" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img
              src={crownLogo}
              alt="The Gaming Kingdom crown"
              width={64}
              height={64}
              className="h-14 w-14 object-contain drop-shadow-[0_0_18px_color-mix(in_oklab,var(--neon-cyan)_60%,transparent)]"
            />
            <span className="font-display text-xl font-bold tracking-widest leading-tight">
              THE <span className="neon-text">GAMING KINGDOM</span>
              <span className="block text-[10px] font-medium tracking-[0.3em] text-muted-foreground">
                Level up your fun
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            A futuristic gaming arena in Ooty — PS5, VR, racing sims, retro PS1/PS2, and a neon
            cyberpunk cafe. Built for next-gen play.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { icon: Instagram, href: "https://instagram.com/thegamingkingdom43" },
              { icon: MessageCircle, href: "https://wa.me/918680873969" },
              { icon: Phone, href: "tel:+919626476731" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-muted-foreground transition-all hover:border-neon-cyan hover:text-neon-cyan"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-neon-cyan">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {["About", "Zones", "Games", "Gallery", "Menu", "Book"].map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-neon-pink">
            Hours
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Mon — Sun</li>
            <li className="font-display text-foreground">10:00 AM — 10:00 PM</li>
            <li className="mt-3 text-xs uppercase tracking-widest text-neon-cyan">
              Power backup · Always On
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/5 px-5 pt-6 text-xs text-muted-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} The Gaming Kingdom · Shop No 2, Calso Line, Sanjay Complex
          (Backside), Charring Cross, Ooty 643001.
        </p>
        <p className="font-display uppercase tracking-widest">
          Built for the next generation of gaming.
        </p>
      </div>

      <div className="mx-auto mt-6 max-w-7xl px-5">
        <div className="flex flex-col items-center justify-center gap-1 border-t border-white/5 pt-5 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/70">
            Designed by
          </p>
          <a
            href="mailto:edisonedi84431@gmail.com"
            className="font-display text-sm font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-pink transition-all duration-500 hover:tracking-[0.2em]"
          >
            edisonedi84431@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
