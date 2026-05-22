import { useCallback, useEffect, useMemo, useState } from "react";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";
import {
  Calendar,
  Clock,
  Gamepad2,
  CheckCircle2,
  Download,
  Ban,
  MessageCircle,
} from "lucide-react";

type Unit = { id: string; name: string; price: number; group: string; conflictsWith?: string[] };

// Stations. PS5 and PS5 Simulator share the same physical PS5 — booking one blocks the other.
const units: Unit[] = [
  {
    id: "ps1",
    name: "PlayStation 1",
    price: 150,
    group: "Retro Console",
  },
  {
    id: "ps2",
    name: "PlayStation 2",
    price: 150,
    group: "Retro Console",
  },
  {
    id: "ps3",
    name: "PlayStation 3",
    price: 150,
    group: "Console",
  },
  { id: "ps4", name: "PlayStation 4", price: 150, group: "Console" },
  {
    id: "ps5",
    name: "PlayStation 5",
    price: 200,
    group: "Console · 1 PS5 with inbuilt simulator",
    conflictsWith: ["ps5_sim"],
  },
  {
    id: "ps5_sim",
    name: "PS5 Racing Simulator",
    price: 250,
    group: "Simulator · attached to the PS5",
    conflictsWith: ["ps5"],
  },
  { id: "ps4_vr", name: "PS4 VR Headset", price: 250, group: "Virtual Reality" },
];

const WHATSAPP_NUMBER = "918680873969";
const OPEN_HOUR = 10;
const CLOSE_HOUR = 22;
const slots = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
const slotHour = (s: string) => Number(s.split(":")[0]);
const maxHoursFromSlot = (s: string) => Math.max(1, Math.min(6, CLOSE_HOUR - slotHour(s)));

const format12Hour = (s: string) => {
  if (!s) return "—";
  const parts = s.split(":");
  if (parts.length < 2) return "—";
  const [hourStr, minStr] = parts;
  const hour = Number(hourStr);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minStr} ${ampm}`;
};

type BookedRow = { unit_id: string; start_slot: string; hours: number };
type StoredBooking = BookedRow & {
  booking_date: string;
  customer_name: string;
  customer_phone: string;
};

export function Booking() {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [unitId, setUnitId] = useState(units[0].id);
  const [slot, setSlot] = useState("");
  const [hours, setHours] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState<BookedRow[]>([]);
  const [loadingAvail, setLoadingAvail] = useState(false);

  const unit = units.find((u) => u.id === unitId)!;

  const loadAvailability = (d: string) => {
    setLoadingAvail(true);
    try {
      const stored = localStorage.getItem("gaming_kingdom_bookings");
      if (stored) {
        const allBookings = JSON.parse(stored) as BookedRow[];
        // Filter by date
        const dayBookings = allBookings
          .filter((b) => b.booking_date === d)
          .map((b) => ({
            unit_id: b.unit_id,
            start_slot: b.start_slot,
            hours: b.hours,
          }));
        setBooked(dayBookings);
      } else {
        setBooked([]);
      }
    } catch (e) {
      console.error(e);
      setBooked([]);
    }
    setLoadingAvail(false);
  };

  useEffect(() => {
    loadAvailability(date);
  }, [date]);

  // Realtime updates handled locally on the same client session

  const now = new Date();
  const isToday = date === today;
  const isSlotPast = (s: string) => {
    if (!s || !isToday) return false;
    const [h, m] = s.split(":").map(Number);
    const t = new Date();
    t.setHours(h, m, 0, 0);
    return t.getTime() <= now.getTime();
  };

  // A unit slot is taken if THIS unit OR any conflicting unit (e.g. PS5↔PS5 sim) is booked then.
  const isBooked = useCallback(
    (uId: string, s: string) => {
      if (!s) return false;
      const u = units.find((x) => x.id === uId)!;
      const watch = new Set<string>([uId, ...(u.conflictsWith ?? [])]);
      const startH = slotHour(s);
      return booked.some((b) => {
        if (!watch.has(b.unit_id)) return false;
        const bStart = slotHour(b.start_slot);
        return startH >= bStart && startH < bStart + b.hours;
      });
    },
    [booked],
  );

  const maxHours = maxHoursFromSlot(slot);
  const effectiveMax = useMemo(() => {
    let cap = maxHours;
    for (let h = 1; h <= maxHours; h++) {
      const checkSlot = `${String(slotHour(slot) + h).padStart(2, "0")}:00`;
      if (isBooked(unitId, checkSlot)) {
        cap = h;
        break;
      }
    }
    return cap;
  }, [slot, unitId, maxHours, isBooked]);

  useEffect(() => {
    if (hours > effectiveMax) {
      setHours(effectiveMax);
    }
  }, [effectiveMax, hours]);

  const slotBlocked = isBooked(unitId, slot);
  const slotPast = isSlotPast(slot);

  const price = useMemo(() => unit.price * hours, [unit, hours]);
  const endTime = slot ? `${String(slotHour(slot) + hours).padStart(2, "0")}:00` : "";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slot) return setError("Please select a time slot first.");
    setError(null);
    if (slotPast) return setError("That slot has already passed.");
    if (slotBlocked) return setError("Already booked for this time. Pick another slot.");
    setSubmitting(true);

    // Simulate standard smooth network delay for the cyberpunk cinematic feel
    await new Promise((resolve) => setTimeout(resolve, 600));

    try {
      const stored = localStorage.getItem("gaming_kingdom_bookings");
      const allBookings = stored ? JSON.parse(stored) : [];

      // Double check availability locally
      const isTaken = allBookings.some((b: StoredBooking) => {
        if (b.booking_date !== date) return false;
        const u = units.find((x) => x.id === unitId)!;
        const watch = new Set<string>([unitId, ...(u.conflictsWith ?? [])]);
        if (!watch.has(b.unit_id)) return false;

        const bStart = slotHour(b.start_slot);
        const startH = slotHour(slot);
        return startH >= bStart && startH < bStart + b.hours;
      });

      if (isTaken) {
        setError("Someone just grabbed this slot. Refreshing availability…");
        loadAvailability(date);
        setSubmitting(false);
        return;
      }

      const newBooking = {
        unit_id: unitId,
        booking_date: date,
        start_slot: slot,
        hours,
        customer_name: name,
        customer_phone: phone,
      };

      allBookings.push(newBooking);
      localStorage.setItem("gaming_kingdom_bookings", JSON.stringify(allBookings));

      setConfirmed(true);
      loadAvailability(date);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred while saving the booking.";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const waMessage = encodeURIComponent(
    `Hi! I'd like to book ${unit.name} on ${date} at ${format12Hour(slot)} for ${hours} hr. Name: ${name || "—"} · Phone: ${phone || "—"}`,
  );
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <section
      id="booking"
      className="relative py-28 [will-change:transform] [transform:translateZ(0)]"
    >
      <SectionHeader
        eyebrow="Book"
        title="Reserve your ·battle station·"
        subtitle="Pick a station. Note · we have 1 PS5 with an inbuilt racing simulator, so PS5 and PS5 Simulator share the same machine."
      />

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 px-5 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <form
            onSubmit={submit}
            className="glass neon-border space-y-6 rounded-2xl p-7 motion-smooth"
          >
            <Field icon={<Gamepad2 className="h-4 w-4" />} label="Station">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {units.map((u) => {
                  const allBooked = slots.every((s) => isBooked(u.id, s) || isSlotPast(s));
                  return (
                    <button
                      type="button"
                      key={u.id}
                      onClick={() => setUnitId(u.id)}
                      className={`group relative rounded-lg border px-3 py-3 text-left transition-all duration-300 ease-out will-change-transform hover:-translate-y-0.5 ${
                        unitId === u.id
                          ? "border-neon-cyan bg-neon-cyan/10 text-foreground shadow-[0_0_25px_color-mix(in_oklab,var(--neon-cyan)_30%,transparent)]"
                          : "border-white/10 text-muted-foreground hover:border-white/30"
                      }`}
                    >
                      <div className="font-display text-sm font-bold transition-colors group-hover:text-neon-cyan">
                        {u.name}
                      </div>
                      <div className="text-[11px] text-muted-foreground">{u.group}</div>
                      {allBooked && (
                        <span className="absolute right-2 top-2 text-[9px] font-bold uppercase tracking-widest text-neon-pink">
                          Full
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 rounded-md border border-neon-cyan/20 bg-neon-cyan/5 px-3 py-2 text-[11px] text-neon-cyan/90">
                Note · We have <b>1 PS5 with an inbuilt racing simulator</b>. Booking the PS5 also
                blocks the PS5 Simulator at the same time (and vice versa).
              </p>
            </Field>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field icon={<Calendar className="h-4 w-4" />} label="Date">
                <input
                  type="date"
                  required
                  value={date}
                  min={today}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-deep/50 px-4 py-3 text-sm text-foreground transition-colors duration-200 focus:border-neon-cyan focus:outline-none"
                />
              </Field>
              <Field icon={<Clock className="h-4 w-4" />} label={`Hours`}>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: effectiveMax }, (_, i) => i + 1).map((h) => (
                    <button
                      type="button"
                      key={h}
                      onClick={() => setHours(h)}
                      className={`min-w-[44px] rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ease-out will-change-transform ${
                        hours === h
                          ? "bg-neon-cyan text-primary-foreground shadow-[0_0_20px_color-mix(in_oklab,var(--neon-cyan)_50%,transparent)] scale-[1.04]"
                          : "border border-white/10 text-muted-foreground hover:-translate-y-0.5 hover:border-white/30 hover:text-foreground"
                      }`}
                    >
                      {h}h
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  {slot ? `Ends at ${format12Hour(endTime)} · ` : ""}arena closes at 10:00 PM
                </p>
              </Field>
            </div>

            <Field
              icon={<Clock className="h-4 w-4" />}
              label={`Slot ${loadingAvail ? "· checking…" : ""}`}
            >
              <div className="flex flex-wrap gap-2">
                {slots.map((s) => {
                  const past = isSlotPast(s);
                  const taken = isBooked(unitId, s);
                  const disabled = past || taken;
                  return (
                    <button
                      type="button"
                      key={s}
                      disabled={disabled}
                      onClick={() => setSlot(s)}
                      className={`relative rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ease-out will-change-transform ${
                        past
                          ? "cursor-not-allowed border border-white/5 text-muted-foreground/40 line-through"
                          : taken
                            ? "cursor-not-allowed border border-neon-pink/40 bg-neon-pink/10 text-neon-pink/70"
                            : slot === s
                              ? "bg-neon-cyan text-primary-foreground shadow-[0_0_20px_color-mix(in_oklab,var(--neon-cyan)_50%,transparent)] scale-[1.02]"
                              : "border border-white/10 text-muted-foreground hover:-translate-y-0.5 hover:border-white/30 hover:text-foreground"
                      }`}
                      title={taken ? "Already booked at this time" : undefined}
                    >
                      {taken && <Ban className="mr-1 inline h-3 w-3" />}
                      {format12Hour(s)}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                {isToday && "Past slots are disabled. "}Pink slots mean this station (or its linked
                unit) is already booked.
              </p>
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full Name">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-white/10 bg-deep/50 px-4 py-3 text-sm transition-colors duration-200 focus:border-neon-cyan focus:outline-none"
                />
              </Field>
              <Field label="Phone">
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9XXXXXXXXX"
                  className="w-full rounded-lg border border-white/10 bg-deep/50 px-4 py-3 text-sm transition-colors duration-200 focus:border-neon-cyan focus:outline-none"
                />
              </Field>
            </div>

            {error && (
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-neon-pink">
                {error}
              </p>
            )}

            <a
              href={slot ? waHref : "#"}
              onClick={(e) => {
                if (!slot) {
                  e.preventDefault();
                  setError("Please select a time slot first.");
                }
              }}
              target={slot ? "_blank" : undefined}
              rel="noreferrer"
              className={`flex w-full items-center justify-center gap-2 rounded-xl border px-6 py-3 font-display text-xs font-bold uppercase tracking-widest transition-all ${
                slot
                  ? "border-neon-cyan/40 bg-neon-cyan/5 text-neon-cyan hover:bg-neon-cyan/10"
                  : "border-white/10 bg-white/5 text-muted-foreground/50 cursor-not-allowed"
              }`}
            >
              <MessageCircle className="h-4 w-4" /> Or book on WhatsApp
            </a>

            <p className="text-center text-[11px] text-muted-foreground">
              Pay at the arena · cash or UPI on arrival
            </p>
            <p className="text-center text-[11px] font-semibold uppercase tracking-widest text-neon-pink/90">
              Note · Extra charges apply for extended time
            </p>
            <p className="text-center text-[11px] text-muted-foreground">
              We also provide <b className="text-foreground">consoles for sale</b>,{" "}
              <b className="text-foreground">service</b> and{" "}
              <b className="text-foreground">accessories</b> in-store.
            </p>
          </form>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-2">
          <div className="glass neon-border sticky top-28 rounded-2xl p-7 motion-smooth">
            {!confirmed ? (
              <>
                <div className="text-[10px] uppercase tracking-widest text-neon-cyan">
                  Booking Summary
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold">{unit.name}</h3>
                <ul className="mt-6 space-y-3 text-sm">
                  <Row k="Date" v={date} />
                  <Row k="Slot" v={slot ? `${format12Hour(slot)} → ${format12Hour(endTime)}` : "Select a slot"} />
                  <Row k="Duration" v={`${hours} hr`} />
                  <Row k="Pay at arena" v="On arrival" />
                </ul>
                <p className="mt-4 text-[11px] text-muted-foreground">
                  Each station is reserved individually. The PS5 and PS5 Simulator share the same
                  machine — booking one blocks the other. Extra charges apply for extended time.
                </p>
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-neon-cyan/15">
                  <CheckCircle2 className="h-8 w-8 text-neon-cyan" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">Booking confirmed</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your station is locked. Pay at the arena on arrival.
                </p>
                <div className="mt-5 rounded-xl border border-white/10 bg-deep/50 p-4 text-left text-sm">
                  <Row k="Station" v={unit.name} />
                  <Row k="Date" v={date} />
                  <Row k="Slot" v={`${format12Hour(slot)} → ${format12Hour(endTime)}`} />
                </div>
                <button
                  onClick={() => setConfirmed(false)}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg border border-neon-cyan/40 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-neon-cyan transition-colors hover:bg-neon-cyan/10"
                >
                  <Download className="h-4 w-4" /> Book another
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {icon} {label}
      </span>
      {children}
    </label>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-display font-semibold">{v}</span>
    </li>
  );
}
