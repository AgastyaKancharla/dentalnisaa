import { NextResponse } from "next/server";

// Reads back already-requested slots from the clinic's Apps Script backend
// (same BOOKING_WEBHOOK_URL as /api/book) so the booking widget can grey
// out real bookings instead of a fake demo pattern. See
// /docs/BOOKING_BACKEND_SETUP.md and /docs/booking-apps-script.gs (doGet).

export async function GET() {
  const webhookUrl = process.env.BOOKING_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({ booked: [], degraded: true });
  }

  try {
    const upstream = await fetch(webhookUrl, { method: "GET", cache: "no-store" });
    if (!upstream.ok) {
      console.error("Availability webhook responded with an error:", upstream.status);
      return NextResponse.json({ booked: [], degraded: true });
    }

    const data = await upstream.json();
    const booked = Array.isArray(data?.booked)
      ? data.booked.filter(
          (b: unknown): b is { day: string; slot: string } =>
            !!b &&
            typeof b === "object" &&
            typeof (b as Record<string, unknown>).day === "string" &&
            typeof (b as Record<string, unknown>).slot === "string"
        )
      : [];

    return NextResponse.json({ booked, degraded: false });
  } catch (err) {
    console.error("Failed to reach availability webhook:", err);
    return NextResponse.json({ booked: [], degraded: true });
  }
}
