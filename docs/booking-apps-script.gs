/**
 * DentalNisaa — Booking notification backend (Google Apps Script)
 * -----------------------------------------------------------------
 * Paste this whole file into a Google Apps Script project bound to a
 * Google Sheet. See BOOKING_BACKEND_SETUP.md for step-by-step setup.
 *
 * On every booking request (doPost):
 *   1. Appends a row to the "Bookings" sheet
 *   2. Emails the clinic (via the Gmail account this script is deployed under)
 *   3. Optionally pings a WhatsApp number via CallMeBot (free, opt-in — see docs)
 *
 * On every availability check (doGet):
 *   Returns every already-requested {day, slot} pair from the "Bookings"
 *   sheet, so the website can grey out slots that are genuinely taken
 *   instead of a fake demo pattern.
 *
 * IMPORTANT: field names below (fullName / timeSlot / appointmentType) must
 * match what app/api/book/route.ts sends — that route deliberately renames
 * its own internal fields before forwarding here.
 */

const CLINIC_EMAIL = "hello@dentalnisaa.com"; // where booking alerts land
const CLINIC_NAME = "DentalNisaa Oral Care";

// Optional — leave both blank to skip WhatsApp alerts.
// See BOOKING_BACKEND_SETUP.md for how to get a CallMeBot API key (free).
const CALLMEBOT_PHONE = ""; // e.g. "919731214949" (country code, no +, no spaces)
const CALLMEBOT_APIKEY = "";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    appendToSheet(data);
    sendEmailAlert(data);
    if (CALLMEBOT_PHONE && CALLMEBOT_APIKEY) {
      sendWhatsAppAlert(data);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Read-only availability check — called by the website's /api/availability
 * route on every visit to the booking page. Returns every requested
 * {day, slot} pair so far, regardless of whether the clinic has confirmed
 * it yet (a submitted request already reserves the slot).
 */
function doGet(e) {
  try {
    const sheet = getOrCreateSheet();
    const lastRow = sheet.getLastRow();
    const booked = [];

    if (lastRow > 1) {
      // Columns: Submitted at, Name, Phone, Email, Treatment, Requested day,
      // Requested slot, Notes — "day" is column 6, "slot" is column 7.
      const rows = sheet.getRange(2, 6, lastRow - 1, 2).getValues();
      rows.forEach(function (row) {
        const day = String(row[0] || "").trim();
        const slot = String(row[1] || "").trim();
        if (day && slot) booked.push({ day: day, slot: slot });
      });
    }

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true, booked: booked })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err), booked: [] })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function appendToSheet(data) {
  const sheet = getOrCreateSheet();
  sheet.appendRow([
    new Date(),
    data.fullName || "",
    data.phone || "",
    data.email || "",
    data.appointmentType || "",
    data.day || "",
    data.timeSlot || "",
    data.notes || "",
  ]);
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Bookings");
  if (!sheet) {
    sheet = ss.insertSheet("Bookings");
    sheet.appendRow([
      "Submitted at",
      "Name",
      "Phone",
      "Email",
      "Treatment",
      "Requested day",
      "Requested slot",
      "Notes",
    ]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function sendEmailAlert(data) {
  const subject = `New booking request — ${data.fullName} (${data.day}, ${data.timeSlot})`;
  const body = [
    `New booking request via the website:`,
    ``,
    `Name: ${data.fullName}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email || "—"}`,
    `Treatment: ${data.appointmentType}`,
    `Requested: ${data.day} at ${data.timeSlot}`,
    `Notes: ${data.notes || "—"}`,
    ``,
    `Call or WhatsApp the patient to confirm the slot.`,
  ].join("\n");

  MailApp.sendEmail(CLINIC_EMAIL, subject, body);
}

function sendWhatsAppAlert(data) {
  const message = encodeURIComponent(
    `New booking: ${data.fullName} (${data.phone}) wants ${data.appointmentType} on ${data.day} at ${data.timeSlot}.`
  );
  const url = `https://api.callmebot.com/whatsapp.php?phone=${CALLMEBOT_PHONE}&text=${message}&apikey=${CALLMEBOT_APIKEY}`;
  try {
    UrlFetchApp.fetch(url);
  } catch (err) {
    // Don't fail the whole request if WhatsApp alert fails — email + sheet
    // row are the source of truth.
    console.error("WhatsApp alert failed: " + err);
  }
}
