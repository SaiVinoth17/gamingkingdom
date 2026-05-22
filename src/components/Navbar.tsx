import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import crownLogo from "@/assets/crown-logo.png";

const links = [
  { href: "#about", label: "About" },
  { href: "#features", label: "Zones" },
  { href: "#games", label: "Games" },
  { href: "#gallery", label: "Gallery" },
  { href: "#menu", label: "Menu" },
  { href: "#booking", label: "Book" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5">
        <nav
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all ${
            scrolled ? "glass" : "bg-transparent"
          }`}
        >
          <a href="#top" className="group flex items-center gap-3">
            <img
              src={crownLogo}
              alt="The Gaming Kingdom crown logo"
              width={64}
              height={64}
              className="h-14 w-14 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg] drop-shadow-[0_0_18px_color-mix(in_oklab,var(--neon-cyan)_70%,transparent)]"
            />
            <span className="font-display text-xl font-bold tracking-widest text-foreground leading-tight">
              THE <span className="neon-text">GAMING KINGDOM</span>
              <span className="block text-[10px] font-medium tracking-[0.3em] text-muted-foreground">
                Level up your fun
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative rounded-md px-3 py-2 text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                  <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-neon-cyan to-neon-pink transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#booking"
            className="hidden rounded-lg bg-gradient-to-r from-neon-cyan to-neon-pink px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-[0_0_30px_color-mix(in_oklab,var(--neon-pink)_45%,transparent)] transition-transform hover:scale-105 lg:inline-flex"
          >
            Book Slot
          </a>

          <button
            aria-label="Menu"
            className="rounded-lg p-2 text-foreground lg:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </nav>

        {open && (
          <div className="glass mt-2 rounded-2xl p-4 lg:hidden">
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm uppercase tracking-wider text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#booking"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-lg bg-gradient-to-r from-neon-cyan to-neon-pink px-3 py-2 text-center text-sm font-semibold uppercase text-primary-foreground"
                >
                  Book Slot
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
