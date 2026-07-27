# Analytics setup — Google Analytics (GA4)

This connects the website to Google Analytics so you can see traffic,
which pages get visited, and roughly how the booking form is performing.
It takes about 5 minutes and costs nothing.

## 1. Create a GA4 property

1. Go to [analytics.google.com](https://analytics.google.com) and sign in
   with the Google account you want to manage this from.
2. Click **Admin** (bottom left) → **Create Property**.
3. Name it something like "DentalNisaa Website", set your timezone
   (India Standard Time) and currency (INR), and continue.
4. When asked for a platform, choose **Web**.
5. Enter the site URL (`https://dentalnisaa.com`) and a stream name (e.g.
   "DentalNisaa Site").
6. You'll be shown a **Measurement ID** — it looks like `G-XXXXXXXXXX`.
   Copy it.

## 2. Connect it to the website

1. In Vercel, go to the project → **Settings → Environment Variables**.
2. Add:
   - Name: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Value: the Measurement ID from step 1 (e.g. `G-XXXXXXXXXX`)
3. Redeploy the site (Vercel does this automatically on the next push, or
   trigger a redeploy manually so the env var takes effect).

## 3. Confirm it's working

1. Visit the live site in a normal (non-incognito) browser tab.
2. In Google Analytics, go to **Reports → Realtime** — you should see
   yourself show up as an active user within a minute or two.

## What this does and doesn't do

- It tracks page views and standard traffic metrics (which pages, how
  many visitors, roughly what device/location) — enough to answer
  "is anyone actually visiting the site" and "which treatments are
  people looking at."
- It does **not** track who submitted the booking form, or what they
  typed into it — that data only goes to the booking backend
  (see `BOOKING_BACKEND_SETUP.md`), never through Analytics.
- Nothing on the site behaves differently whether or not this is set
  up — nothing breaks if you skip this step, it just means no traffic
  data gets collected yet.
