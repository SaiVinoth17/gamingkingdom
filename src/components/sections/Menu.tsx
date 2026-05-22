import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";

type Item = { name: string; price: string; desc?: string };

const hot: Item[] = [
  { name: "Coffee", price: "25" },
  { name: "Tea", price: "15" },
  { name: "Lemon Tea", price: "15" },
  { name: "Boost / Horlicks", price: "30" },
  { name: "Badam Milk", price: "25" },
];

const cool: Item[] = [
  { name: "Fresh Lemon", price: "25" },
  { name: "Apple Juice", price: "60" },
  { name: "Orange Juice", price: "60" },
  { name: "Watermelon Juice", price: "60" },
  { name: "Pomegranate", price: "80" },
  { name: "Mosambi", price: "60" },
  { name: "Dry Fruits Shake", price: "120" },
  { name: "Rose Milk", price: "40" },
  { name: "Banana Shake", price: "120" },
  { name: "Mango Juice", price: "70" },
  { name: "Coke / Fanta", price: "40" },
  { name: "Pepsi / 7up", price: "40" },
];

const snacksFries: Item[] = [
  { name: "French Fries", price: "100", desc: "S 50 · M 100 · L 150" },
  { name: "Smiley Fries", price: "120", desc: "S 60 · M 100 · L 120" },
  { name: "Cheese Balls", price: "120" },
  { name: "American Sweet Corn", price: "70" },
  { name: "Sweet Corn", price: "60" },
  { name: "Veg Nuggets", price: "90" },
  { name: "McCain Veg Burger", price: "90" },
  { name: "Bread Omlet", price: "60" },
];

const snacksChicken: Item[] = [
  { name: "Chicken Popcorn", price: "120" },
  { name: "Chicken Bites", price: "130" },
  { name: "Chicken Nuggets", price: "120" },
  { name: "Chicken Fingers", price: "120" },
  { name: "Chicken Burger", price: "130" },
  { name: "Fish Fingers", price: "150" },
  { name: "Momos · Veg / Non-Veg", price: "100" },
  { name: "Cutlet", price: "80" },
];

const snacksMaggie: Item[] = [
  { name: "Maggie", price: "60" },
  { name: "Egg Maggie", price: "70" },
  { name: "Cheese Maggie", price: "80" },
  { name: "Masala Maggie", price: "80" },
  { name: "Schezwan", price: "60" },
];

const sweets: Item[] = [
  { name: "Brownie", price: "80" },
  { name: "Brownie with Ice Cream", price: "120" },
  { name: "Donut", price: "80" },
  { name: "Choco Balls", price: "30" },
];

function ItemList({ items }: { items: Item[] }) {
  return (
    <ul className="divide-y divide-white/5">
      {items.map((it) => (
        <li
          key={it.name}
          className="group grid grid-cols-[1fr_auto] items-center gap-3 py-2.5 transition-colors hover:bg-white/[0.02]"
        >
          <div className="min-w-0">
            <div className="truncate font-display text-[13px] font-semibold transition-colors group-hover:text-neon-cyan">
              {it.name}
            </div>
            {it.desc && (
              <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                {it.desc}
              </p>
            )}
          </div>
          <div className="font-display text-sm font-bold text-neon-pink tabular-nums">
            ₹{it.price}
          </div>
        </li>
      ))}
    </ul>
  );
}

function Card({
  title,
  accent,
  children,
  className = "",
}: {
  title: string;
  accent: "cyan" | "pink";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass relative h-full overflow-hidden rounded-2xl p-6 ${className}`}>
      <div
        className={`absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent ${
          accent === "cyan" ? "via-neon-cyan" : "via-neon-pink"
        } to-transparent`}
      />
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-sm font-bold uppercase tracking-[0.25em] neon-text">
          {title}
        </h3>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">₹ INR</span>
      </div>
      {children}
    </div>
  );
}

export function Menu() {
  return (
    <section id="menu" className="relative py-28">
      <SectionHeader
        eyebrow="The Gaming Cafe"
        title="Fuel for the ·grind·"
        subtitle="A real cyberpunk gaming cafe menu — quick to serve, easy to play with one hand."
      />

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 px-5 md:grid-cols-6">
        {/* Beverages column */}
        <div className="grid gap-5 md:col-span-2">
          <Reveal>
            <Card title="Hot Beverages" accent="cyan">
              <ItemList items={hot} />
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card title="Cool Beverages" accent="pink">
              <ItemList items={cool} />
            </Card>
          </Reveal>
        </div>

        {/* Snacks block — wider, internal 2-col on md+ */}
        <Reveal delay={0.16} className="md:col-span-4">
          <Card title="Snacks & Quick Bites" accent="cyan" className="h-full">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-neon-cyan">
                  Fries · Veg
                </div>
                <ItemList items={snacksFries} />
              </div>
              <div>
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-neon-pink">
                  Chicken · Non-Veg
                </div>
                <ItemList items={snacksChicken} />
              </div>
              <div>
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-neon-cyan">
                  Maggie Bar
                </div>
                <ItemList items={snacksMaggie} />
              </div>
              <div>
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-neon-pink">
                  Sweet Tooth
                </div>
                <ItemList items={sweets} />
              </div>
            </div>
          </Card>
        </Reveal>
      </div>

      <p className="mx-auto mt-6 max-w-6xl px-5 text-center text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        In-arena · Quick serve · Prices in INR
      </p>
    </section>
  );
}
