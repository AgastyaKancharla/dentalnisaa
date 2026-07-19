"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { treatments, clinic } from "@/lib/site-data";
import { NO_DOCTOR_PREFERENCE, ConfirmedBooking } from "@/lib/booking-schema";
import { formatDateLong } from "@/lib/booking-availability";
import Icon from "@/components/Icon";

function buildIcs(booking: ConfirmedBooking, treatmentName: string): string {
  // Parse "10:30 AM" against the stored ISO date into a real start time;
  // the visit is assumed to run 45 minutes, a reasonable default for a
  // dental appointment slot, adjustable once real durations are confirmed.
  const [, hh, mm, ap] = booking.slot.match(/(\d+):(\d+)\s?(AM|PM)/) ?? [];
  let hour = parseInt(hh ?? "10", 10);
  if (ap === "PM" && hour !== 12) hour += 12;
  if (ap === "AM" && hour === 12) hour = 0;
  const start = new Date(booking.date);
  start.setHours(hour, parseInt(mm ?? "0", 10), 0, 0);
  const end = new Date(start.getTime() + 45 * 60 * 1000);

  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//DentalNisaa Oral Care//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${booking.appointmentId}@dentalnisaa.com`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${treatmentName} — ${clinic.name}`,
    `DESCRIPTION:Appointment ${booking.appointmentId} at ${clinic.name}. Call ${clinic.phone} with any questions.`,
    `LOCATION:${clinic.address.line1 ? clinic.address.line1 + ", " : ""}${clinic.address.line2}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export default function ConfirmationPage() {
  const [booking, setBooking] = useState<ConfirmedBooking | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("dentalnisaa-confirmed-booking");
      if (raw) setBooking(JSON.parse(raw));
      else setNotFound(true);
    } catch {
      setNotFound(true);
    }
  }, []);

  if (notFound) {
    return (
      <section className="bg-porcelain min-h-screen flex items-center">
        <div className="max-w-md mx-auto px-5 py-24 text-center">
          <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">No booking found</p>
          <h1 className="font-display text-3xl text-ink mb-4">We couldn't find a recent booking</h1>
          <p className="text-ink/60 mb-8">This page only shows details right after you book. Start a new booking below.</p>
          <Link href="/book" className="focus-ring inline-flex items-center rounded-full bg-ink text-porcelain px-7 py-3.5 font-semibold">
            Book an appointment
          </Link>
        </div>
      </section>
    );
  }

  if (!booking) return null; // brief hydration flash only

  const treatment = treatments.find((t) => t.id === booking.treatmentId);
  const doctorDisplay = booking.doctorName === NO_DOCTOR_PREFERENCE ? "First available dentist" : booking.doctorName;

  const downloadIcs = () => {
    const ics = buildIcs(booking, treatment?.name ?? "Dental Appointment");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dentalnisaa-appointment-${booking.appointmentId}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const whatsappText = encodeURIComponent(
    `Hi, confirming my appointment ${booking.appointmentId} — ${treatment?.name} on ${formatDateLong(booking.date)} at ${booking.slot} with ${doctorDisplay}.`
  );

  return (
    <section className="bg-porcelain min-h-screen">
      <div className="max-w-lg mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-20 text-center">
        <div className="w-16 h-16 rounded-full bg-gold/15 text-gold-dark flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-2">Appointment requested</p>
        <h1 className="font-display text-3xl md:text-4xl text-ink mb-3">You're almost booked in.</h1>
        <p className="text-ink/60 mb-2">
          Appointment ID <span className="font-semibold text-ink">{booking.appointmentId}</span>
        </p>
        <p className="text-ink/55 mb-10 max-w-sm mx-auto">
          The clinic will confirm your exact slot by phone or WhatsApp shortly. Save the details below for your records.
        </p>

        <div className="rounded-2xl border border-ink/10 bg-white/60 p-6 text-left space-y-3 mb-8">
          <div className="flex justify-between gap-4">
            <span className="text-ink/50 text-sm">Treatment</span>
            <span className="font-medium text-ink text-sm text-right">{treatment?.name}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-ink/50 text-sm">Doctor</span>
            <span className="font-medium text-ink text-sm text-right">{doctorDisplay}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-ink/50 text-sm">Date</span>
            <span className="font-medium text-ink text-sm text-right">{formatDateLong(booking.date)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-ink/50 text-sm">Time</span>
            <span className="font-medium text-ink text-sm text-right">{booking.slot}</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <button
            type="button"
            onClick={downloadIcs}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 text-ink px-6 py-3.5 font-semibold hover:bg-ink/5 transition-colors min-h-[48px]"
          >
            <Icon name="calendar" className="w-4 h-4" />
            Add to calendar
          </button>
          <a
            href={`https://wa.me/${clinic.whatsapp}?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-gold text-ink px-6 py-3.5 font-semibold hover:bg-gold-light transition-colors min-h-[48px]"
          >
            <Icon name="chat" className="w-4 h-4" />
            Confirm on WhatsApp
          </a>
        </div>

        <p className="text-xs text-ink/40 mb-10">
          {booking.patient.email
            ? "A confirmation email will follow once the clinic processes your request."
            : "Add your email next time for an emailed confirmation too."}
        </p>

        <Link href="/" className="focus-ring text-sm font-semibold text-ink/60 hover:text-ink">
          ← Back to homepage
        </Link>
      </div>
    </section>
  );
}
