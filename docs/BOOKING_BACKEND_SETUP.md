# Booking backend setup — Google Sheets + Email + WhatsApp (no-code)

This connects the website's booking form to a real notification pipeline,
no server or paid API required. It takes about 10 minutes.

## 1. Create the Google Sheet

1. Go to [sheets.new](https://sheets.new) and create a blank spreadsheet.
2. Rename it something like "DentalNisaa — Bookings".

## 2. Add the Apps Script

1. In the Sheet, go to **Extensions → Apps Script**.
2. Delete the placeholder code and paste in the full contents of
   `docs/booking-apps-script.gs` from this repo.
3. At the top of the script, set:
   - `CLINIC_EMAIL` — the inbox that should receive booking alerts.
4. Save (Ctrl/Cmd+S).

## 3. Deploy it as a Web App

1. Click **Deploy → New deployment**.
2. Type: **Web app**.
3. Execute as: **Me**.
4. Who has access: **Anyone** (this is what allows the website to POST to it —
   it only accepts booking data, it doesn't expose the Sheet itself).
5. Click **Deploy**, authorize the permissions Google asks for (this is your
   own script running under your own Google account).
6. Copy the **Web app URL** — it looks like
   `https://script.google.com/macros/s/XXXXXXXX/exec`.

## 4. Connect it to the website

1. In Vercel, go to the project → **Settings → Environment Variables**.
2. Add:
   - Name: `BOOKING_WEBHOOK_URL`
   - Value: the Web app URL from step 3.
3. Redeploy the site (Vercel does this automatically on the next push, or
   trigger a redeploy manually so the env var takes effect).

That's it — every booking submitted on the site will now:
- Add a row to the "Bookings" tab of the Sheet
- Send an email to `CLINIC_EMAIL`

## 5. (Optional) Add a WhatsApp alert too

This uses [CallMeBot](https://www.callmebot.com/blog/free-api-whatsapp-messages/),
a free WhatsApp API for personal use. One-time setup:

1. Save this number in your phone contacts: **+34 644 59 71 65**.
2. Send it this WhatsApp message: `I allow callmebot to send me messages`.
3. You'll get an API key back in a reply message.
4. In the Apps Script, set:
   - `CALLMEBOT_PHONE` — your WhatsApp number, country code + number, no `+`, no spaces (e.g. `919731214949`)
   - `CALLMEBOT_APIKEY` — the key CallMeBot sent you
5. Re-deploy the Apps Script (**Deploy → Manage deployments → Edit → New version → Deploy**).

Note: CallMeBot is a free community service intended for personal alerts, not
production-critical messaging — if the clinic wants WhatsApp booking alerts
guaranteed to arrive, that's exactly what AgastyaOne's paid WhatsApp
Automation service (via a proper WhatsApp Business API account) is for. This
free version is a good stopgap for launch.

## Testing

Submit a test booking on `/booking` on the live site and confirm:
- A new row appears in the Sheet
- An email arrives at `CLINIC_EMAIL`
- (If configured) a WhatsApp message arrives

If something's not arriving, check **Apps Script → Executions** for error logs.
