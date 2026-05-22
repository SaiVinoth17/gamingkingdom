import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";
import { Quote, Star, Pencil } from "lucide-react";

const reviews = [
  {
    quote: "Nice gaming, blasting… no one can touch… thank yuh",
    name: "Andrew Moses",
    meta: "2 reviews · 6 photos · 3 months ago",
  },
  {
    quote: "It's nice experience. Well maintained. Highly recommend.",
    name: "Kishore Ravichandran",
    meta: "3 reviews · 4 months ago",
  },
  {
    quote:
      "Place to chill, get the vibe and the best duo gaming experience. All guys should must visit!",
    name: "ARSHZZ__",
    meta: "2 reviews · 4 months ago",
  },
  {
    quote: "Wonderful time here, came with my friend and enjoyed fully.",
    name: "Veer Chordia",
    meta: "2 reviews · 4 months ago",
  },
  {
    quote: "Nice experience at an affordable price. Must visit with friends and family.",
    name: "Mani Megala",
    meta: "1 review · 4 months ago",
  },
  {
    quote:
      "A good gaming experience and excellent snacks service — full of fun for the whole hour.",
    name: "Bala Ganesh",
    meta: "1 review · 4 months ago",
  },
  {
    quote:
      "Really a fantastic place to make fun with friends. Personally I enjoyed playing MotoGP with my bro.",
    name: "Itz me Monish",
    meta: "6 reviews · 1 photo · 3 months ago",
  },
  {
    quote: "Very nice place to visit, kids really enjoyed. Nice gaming centre.",
    name: "Suresh Joel",
    meta: "4 reviews · 1 photo · 2 months ago",
  },
  {
    quote: "Best spot to spend your free time with your favourite games.",
    name: "sassh devil",
    meta: "3 reviews · 3 months ago",
  },
  {
    quote:
      "It was a good experience playing GTA 5 — so much fun. Coming back next week to play again.",
    name: "jacks savio",
    meta: "3 reviews · 3 months ago",
  },
  {
    quote: "Good game centre, nice experience with friends. FIFA has a great real game feel.",
    name: "Bharath",
    meta: "3 reviews · 3 months ago",
  },
  {
    quote:
      "Best experience — played RDR2, GTA 5, San Andreas, GoW Ragnarok, It Takes Two, WWE and MotoGP. Must try!",
    name: "FaithTogether",
    meta: "1 review · 3 months ago",
  },
  {
    quote:
      "We came here 2 days in a row whilst it was raining on our UK holiday — a great way to spend a rainy afternoon. Good range of consoles including PS5, the sofas were very comfy.",
    name: "Georgina Mallett",
    meta: "Local Guide · 60 reviews · 143 photos · 3 months ago",
  },
  {
    quote: "Nice ambience, good service and excellent gaming setup.",
    name: "Sudhit P.B",
    meta: "2 reviews · 4 months ago",
  },
  {
    quote: "Excellent gaming in Ooty — awesome.",
    name: "Siva Prakash",
    meta: "4 reviews · 7 photos · 2 months ago",
  },
  {
    quote: "Good experience and best spot for hangout with friends — a new experience in Ooty.",
    name: "Shifan Sherif",
    meta: "4 reviews · 4 months ago",
  },
  {
    quote: "Nice game in Ooty 💥 The Gaming Kingdom ✨",
    name: "Ebi Ebi",
    meta: "4 reviews · 1 photo · 4 months ago",
  },
  {
    quote: "Good and real experience for gaming.",
    name: "S Kavin",
    meta: "3 reviews · 4 months ago",
  },
  {
    quote: "Experience was nice… had good fun.",
    name: "Puddin",
    meta: "6 reviews · 3 photos · 4 months ago",
  },
  {
    quote: "Nizzz entertainment, fun overload. 💯 Visit and enjoy your free times.",
    name: "Immanuel Holidays Ooty",
    meta: "1 review · 18 photos · 4 months ago",
  },
  {
    quote: "Excellent Gaming Experience. Must Visit 💯🔥",
    name: "Sai Vinoth",
    meta: "3 reviews · 4 months ago",
  },
];

// Opens Google Maps listing for The Gaming Kingdom Ooty where users can write a review
const REVIEW_URL = "https://www.google.com/maps/search/?api=1&query=The+Gaming+Kingdom+Ooty";

function ReviewCard({ r }: { r: (typeof reviews)[number] }) {
  return (
    <figure className="glass neon-border group mx-3 flex h-full w-[320px] shrink-0 flex-col rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_color-mix(in_oklab,var(--neon-pink)_30%,transparent)]">
      <div className="flex items-center justify-between">
        <Quote className="h-6 w-6 text-neon-pink/70 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6" />
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, k) => (
            <Star
              key={k}
              className="h-3.5 w-3.5 fill-neon-cyan text-neon-cyan transition-transform duration-300 group-hover:scale-110"
            />
          ))}
        </div>
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90 transition-colors duration-300 group-hover:text-foreground">
        "{r.quote}"
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-pink font-display text-sm font-bold text-primary-foreground transition-transform duration-500 group-hover:rotate-[360deg]">
          {r.name[0]}
        </div>
        <div className="min-w-0">
          <div className="truncate font-display text-sm font-bold transition-colors group-hover:text-neon-cyan">
            {r.name}
          </div>
          <div className="truncate text-[10px] uppercase tracking-widest text-muted-foreground">
            {r.meta}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  // duplicate the list for a seamless infinite loop
  const loop = [...reviews, ...reviews];

  return (
    <section className="relative py-28">
      <SectionHeader
        eyebrow="Players"
        title="Words from the ·arena·"
        subtitle="Real Google reviews from gamers who've levelled up with us in Ooty."
      />

      {/* Row 1 — scrolls left */}
      <div className="group/marquee relative mt-14 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused]">
          {loop.map((r, i) => (
            <ReviewCard key={`a-${i}`} r={r} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right (offset list for variety) */}
      <div className="group/marquee relative mt-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max animate-marquee-reverse group-hover/marquee:[animation-play-state:paused]">
          {[...reviews.slice().reverse(), ...reviews.slice().reverse()].map((r, i) => (
            <ReviewCard key={`b-${i}`} r={r} />
          ))}
        </div>
      </div>

      <Reveal delay={0.1} className="mt-14 flex justify-center px-5">
        <a
          href={REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-pink px-7 py-4 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground shadow-[0_0_40px_color-mix(in_oklab,var(--neon-pink)_40%,transparent)] transition-all hover:scale-105 hover:shadow-[0_0_60px_color-mix(in_oklab,var(--neon-cyan)_60%,transparent)]"
        >
          <Pencil className="h-4 w-4 transition-transform group-hover:rotate-12" />
          Give us a review
        </a>
      </Reveal>
    </section>
  );
}
