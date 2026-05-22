import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <Reveal className={`mx-auto flex max-w-3xl flex-col gap-4 ${alignment}`}>
      <span className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/40 bg-neon-cyan/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-neon-cyan">
        <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-[0_0_10px_var(--neon-cyan)]" />
        {eyebrow}
      </span>
      <h2 className="text-balance text-4xl font-bold leading-tight md:text-5xl">
        {title.split("·").map((part, i) =>
          i % 2 ? (
            <span key={i} className="neon-text">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </h2>
      {subtitle && (
        <p className="text-pretty text-base text-muted-foreground md:text-lg">{subtitle}</p>
      )}
    </Reveal>
  );
}
