import { NextRequest, NextResponse } from "next/server";

// This route is the single point of contact between the booking form and
// the clinic's no-code backend (Google Sheet + Apps Script Web App). See
// /docs/BOOKING_BACKEND_SETUP.md for how to create and deploy that script.
//
// Set BOOKING_WEBHOOK_URL in your environment (Vercel → Project → Settings
// → Environment Variables) to the deployed Apps Script Web App URL.

type BookingPayload = {
  name: string;
  phone: string;
  email?: string;
  treatment: string;
  day: string;
  slot: string;
  notes?: string;
  // Added for the /book multi-step flow — optional so the original
  // single-page /booking widget's payload still validates unchanged.
  appointmentId?: string;
  doctor?: string;
  reasonForVisit?: string;
  patientType?: "new" | "existing";
};

function isValidPayload(body: unknown): body is BookingPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 0 &&
    typeof b.treatment === "string" &&
    typeof b.day === "string" &&
    typeof b.slot === "string" &&
    (b.appointmentId === undefined || typeof b.appointmentId === "string") &&
    (b.doctor === undefined || typeof b.doctor === "string") &&
    (b.reasonForVisit === undefined || typeof b.reasonForVisit === "string") &&
    (b.patientType === undefined || b.patientType === "new" || b.patientType === "existing")
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Missing required booking fields" },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.BOOKING_WEBHOOK_URL;

  if (!webhookUrl) {
    // Backend not connected yet — fail loudly in logs, but don't crash the
    // page. The widget shows the visitor a friendly "call us instead"
    // fallback in this case.
    console.error(
      "BOOKING_WEBHOOK_URL is not set — booking request was received but not forwarded:",
      body
    );
    return NextResponse.json(
      { error: "Booking backend not configured" },
      { status: 503 }
    );
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...body,
        submittedAt: new Date().toISOString(),
        source: "dentalnisaa.com",
      }),
    });

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => "");
      console.error("Booking webhook responded with an error:", upstream.status, text);
      return NextResponse.json(
        { error: "Booking backend rejected the request" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to reach booking webhook:", err);
    return NextResponse.json(
      { error: "Could not reach booking backend" },
      { status: 502 }
    );
  }
}
