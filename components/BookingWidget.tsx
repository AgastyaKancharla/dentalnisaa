"use client";

import { useMemo, useState } from "react";
import { clinic, treatments } from "@/lib/site-data";

type DayInfo = {
  date: Date;
  label: string;
  dayName: string;
  closed: boolean;
};

function getUpcomingDays(count: number): DayInfo[] {
  const days: DayInfo[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; days.length < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayName = d.toLocaleDateString("en-IN", { weekday: "short" });
    const closed = d.getDay() === 0; // Sunday closed
    days.push({
      date: d,
      label: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      dayName,
      closed,
    });
  }
  return days;
}

function getSlotsForDay(): string[] {
  const slots: string[] = [];
  const push = (h: number, m: number) => {
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    slots.push(`${hour12}:${m === 0 ? "00" : m} ${period}`);
  };
  // 10am–2pm
  for (let h = 10; h < 14; h++) {
    push(h, 0);
    push(h, 30);
  }
  // 4pm–8pm
  for (let h = 16; h < 20; h++) {
    push(h, 0);
    push(h, 30);
  }
  return slots;
}

// Deterministic pseudo-random "already booked" mock so the demo looks real
// without a backend. This is display logic only — replace with a live
// availability check once the Sheets/email booking backend is connected.
function isMockBooked(dateLabel: string, slot: string): boolean {
  const str = `${dateLabel}-${slot}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % 97;
  }
  return hash % 5 === 0;
}

export default function BookingWidget() {
  const days = useMemo(() => getUpcomingDays(10).filter((d) => !d.closed), []);
  const slots = useMemo(() => getSlotsForDay(), []);

  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    treatment: treatments[0].id,
    email: "",
    notes: "",
  });

  const selectedDay = days[selectedDayIdx];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || submitting) return;
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || undefined,
          treatment: treatments.find((t) => t.id === form.treatment)?.name ?? form.treatment,
          day: selectedDay.label,
          slot: selectedSlot,
          notes: form.notes || undefined,
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setErrorMsg(
        "We couldn't send that automatically. Please call or WhatsApp us directly to confirm your slot."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-sage/10 border border-sage/30 p-10 text-center">
        <p className="text-3xl mb-3">✅</p>
        <h3 className="font-display text-2xl text-ink mb-2">
          Request received
        </h3>
        <p className="text-ink/60 max-w-md mx-auto">
          {form.name}, we've noted your preference for{" "}
          <strong>{selectedDay.label}</strong> at{" "}
          <strong>{selectedSlot}</strong>. The clinic will confirm shortly by
          call or WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <p className="text-sm font-semibold text-ink/50 uppercase tracking-wide mb-3">
          1. Pick a day
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {days.map((d, i) => (
            <button
              type="button"
              key={d.label}
              onClick={() => {
                setSelectedDayIdx(i);
                setSelectedSlot(null);
              }}
              className={`focus-ring shrink-0 rounded-xl px-4 py-3 text-sm font-semibold border transition-colors ${
                i === selectedDayIdx
                  ? "bg-ink text-porcelain border-ink"
                  : "bg-white/60 text-ink/70 border-ink/10 hover:border-ink/30"
              }`}
            >
              <div className="text-xs opacity-70">{d.dayName}</div>
              <div>{d.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-ink/50 uppercase tracking-wide mb-3">
          2. Pick a time
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {slots.map((slot) => {
            const booked = isMockBooked(selectedDay.label, slot);
            const selected = selectedSlot === slot;
            return (
              <button
                type="button"
                key={slot}
                disabled={booked}
                onClick={() => setSelectedSlot(slot)}
                className={`focus-ring rounded-lg px-3 py-2.5 text-sm font-medium border transition-colors ${
                  booked
                    ? "bg-ink/5 text-ink/25 border-ink/5 cursor-not-allowed line-through"
                    : selected
                    ? "bg-crimson text-ink border-crimson"
                    : "bg-white/60 text-ink/70 border-ink/10 hover:border-crimson/50"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-ink/40">
          Greyed-out slots are already booked. Once we connect the clinic's
          live booking backend, this will reflect real-time availability.
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold text-ink/50 uppercase tracking-wide mb-3">
          3. Your details
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            required
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="focus-ring rounded-lg border border-ink/15 bg-white/70 px-4 py-3 text-sm"
          />
          <input
            required
            type="tel"
            placeholder="Phone number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="focus-ring rounded-lg border border-ink/15 bg-white/70 px-4 py-3 text-sm"
          />
          <select
            value={form.treatment}
            onChange={(e) => setForm({ ...form, treatment: e.target.value })}
            className="focus-ring rounded-lg border border-ink/15 bg-white/70 px-4 py-3 text-sm sm:col-span-2"
          >
            {treatments.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <input
            type="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="focus-ring rounded-lg border border-ink/15 bg-white/70 px-4 py-3 text-sm sm:col-span-2"
          />
          <textarea
            placeholder="Notes for the clinic (optional)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={3}
            className="focus-ring rounded-lg border border-ink/15 bg-white/70 px-4 py-3 text-sm sm:col-span-2"
          />
        </div>
      </div>

      {errorMsg && (
        <p className="text-sm text-crimson-dark bg-crimson/5 border border-crimson/20 rounded-lg px-4 py-3">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={!selectedSlot || submitting}
        className="focus-ring w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-ink text-porcelain px-8 py-3.5 font-semibold hover:bg-sage-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending…" : "Request this slot"}
      </button>
      <p className="text-xs text-ink/40 -mt-4">
        Clinic: {clinic.phone} · You can also book by calling or WhatsApp directly.
      </p>
      <p className="text-xs text-ink/30">
        Your details are shared only with the clinic to confirm this appointment.
      </p>
    </form>
  );
}
