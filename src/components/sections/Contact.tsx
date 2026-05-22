import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";
import { MapPin, Phone, Instagram, MessageCircle, Send } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-28">
      <SectionHeader
        eyebrow="Visit"
        title="Find us in ·Ooty·"
        subtitle="Drop by, message us, or reserve online — we're open 10 AM to 10 PM, every day."
      />

      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 px-5 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <div className="glass neon-border space-y-5 rounded-2xl p-7">
            <Item
              icon={<MapPin className="h-5 w-5" />}
              title="Location"
              value="Shop No 2, Calso Line, Sanjay Complex (Backside), Charring Cross, Ooty 643001"
            />
            <Item
              icon={<Phone className="h-5 w-5" />}
              title="Phone"
              value="+91 96264 76731"
              href="tel:+919626476731"
            />
            <Item
              icon={<MessageCircle className="h-5 w-5" />}
              title="WhatsApp"
              value="Chat with us"
              href="https://wa.me/918680873969"
            />
            <Item
              icon={<Instagram className="h-5 w-5" />}
              title="Instagram"
              value="@thegamingkingdom43"
              href="https://instagram.com/thegamingkingdom43"
            />

            <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                placeholder="Name"
                className="w-full rounded-lg border border-white/10 bg-deep/50 px-4 py-3 text-sm focus:border-neon-cyan focus:outline-none"
              />
              <input
                placeholder="Email or phone"
                className="w-full rounded-lg border border-white/10 bg-deep/50 px-4 py-3 text-sm focus:border-neon-cyan focus:outline-none"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full resize-none rounded-lg border border-white/10 bg-deep/50 px-4 py-3 text-sm focus:border-neon-cyan focus:outline-none"
              />
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-pink px-5 py-3 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground">
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-3">
          <div className="glass neon-border relative h-full min-h-[420px] overflow-hidden rounded-2xl">
            <iframe
              title="Map"
              src="https://www.google.com/maps?q=The+Gaming+Kingdom+Ooty&output=embed"
              className="absolute inset-0 h-full w-full grayscale-[40%] contrast-110 [filter:invert(0.92)_hue-rotate(180deg)]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-deep/70 via-transparent to-transparent" />
            <a
              href="https://www.google.com/maps/search/?api=1&query=The+Gaming+Kingdom+Ooty"
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-5 left-5 right-5 glass rounded-xl p-4 transition-all hover:border-neon-cyan/60 hover:shadow-[0_0_30px_color-mix(in_oklab,var(--neon-cyan)_30%,transparent)]"
            >
              <div className="text-[10px] uppercase tracking-widest text-neon-cyan">
                Open today · Tap to open in Maps
              </div>
              <div className="font-display text-lg font-bold">10:00 AM — 10:00 PM</div>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Item({
  icon,
  title,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-neon-cyan/40 hover:bg-neon-cyan/5">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-neon-cyan/10 text-neon-cyan">
        {icon}
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{title}</div>
        <div className="font-display text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer">
      {inner}
    </a>
  ) : (
    inner
  );
}
