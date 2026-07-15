/**
 * DentalNisaa — Booking notification backend (Google Apps Script)
 * -----------------------------------------------------------------
 * Paste this whole file into a Google Apps Script project bound to a
 * Google Sheet. See BOOKING_BACKEND_SETUP.md for step-by-step setup.
 *
 * What it does on every booking request:
 *   1. Appends a row to the "Bookings" sheet
 *   2. Emails the clinic (via the Gmail account this script is deployed under)
 *   3. Optionally pings a WhatsApp number via CallMeBot (free, opt-in — see docs)
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

function appendToSheet(data) {
  const sheet = getOrCreateSheet();
  sheet.appendRow([
    new Date(),
    data.name || "",
    data.phone || "",
    data.email || "",
    data.treatment || "",
    data.day || "",
    data.slot || "",
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
  const subject = `New booking request — ${data.name} (${data.day}, ${data.slot})`;
  const body = [
    `New booking request via the website:`,
    ``,
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email || "—"}`,
    `Treatment: ${data.treatment}`,
    `Requested: ${data.day} at ${data.slot}`,
    `Notes: ${data.notes || "—"}`,
    ``,
    `Call or WhatsApp the patient to confirm the slot.`,
  ].join("\n");

  MailApp.sendEmail(CLINIC_EMAIL, subject, body);
}

function sendWhatsAppAlert(data) {
  const message = encodeURIComponent(
    `New booking: ${data.name} (${data.phone}) wants ${data.treatment} on ${data.day} at ${data.slot}.`
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
