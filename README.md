# Roamio Travel Itinerary

Roamio is a static bilingual travel itinerary app for planning trips and keeping trip details in one place. The app combines day-by-day itineraries, trip overviews, route maps, travel tips, audio guides, journals, expenses, photo memories, packing lists, and printable trip summaries in a single page.

## Published App

- Live app: https://zzqin.github.io/MyTravelDiary/
- Repository: https://github.com/ZZQin/MyTravelDiary
- Current publishing target: GitHub Pages

## What The App Includes

- Multi-trip agenda with trip switching
- Day-by-day itinerary view
- Trip overview and stay summaries
- Route maps and travel tips
- English / Chinese language toggle
- Audio guides for itinerary days
- Journal entries, expenses, and photo memories
- Packing checklist
- Print / Save PDF flow for itinerary export

## Trips In The App

- Thailand & Malaysia
- China: Beijing & Shandong Journey
- Croatia & Italy

## Data And Storage

- The app is a static single-page site served from [index.html](index.html).
- User-entered data is stored in browser `localStorage`; there is no backend service in this repo.
- Stored browser data includes expenses, journal entries, uploaded photo memories, visited activity state, packing checklist state, selected trip, auto-day progress, and saved username.

## Project Structure

| Path | Purpose |
| --- | --- |
| [index.html](index.html) | Main static app bundle and trip data |
| [audio/](audio/) | Audio guide files |
| [images/](images/) | Trip imagery used by the app |
| [README.md](README.md) | Project overview and booking reference |

## Local Use And Updates

- Open `index.html` directly in a browser for a quick local preview, or serve the folder with any simple static file server.
- Update itinerary content by editing the static files in this repo and pushing changes.
- The published version is the GitHub Pages site at `https://zzqin.github.io/MyTravelDiary/`.

## Croatia And Italy 2026 Confirmed Bookings

| Stop | Property | Dates | Details | Proof |
| --- | --- | --- | --- | --- |
| Dubrovnik, Croatia | Home in Dubrovnik (Taira Apt) | May 8-12, 2026 (check-in 15:00, check-out 10:00) | Airbnb stay hosted by Mary · 5 guests · total cost USD 575.07 · Ulica od Nuncijate 29, Dubrovnik | [Airbnb screenshot](booked/Screenshot_20260320-164842.png) |
| Makarska, Croatia | Apartment Luka | May 12-13, 2026 | Apartment with Sea View · 5 adults · EUR 90.00 charged by the property · Ulica Slikara Gojaka 37, Makarska | [Booking confirmation](booked/makarska-2026-05-12-to-2026-05-13-636167551.pdf) |
| Zadar, Croatia | Oliva Vallis Apartments | May 17-19, 2026 | Two-Bedroom Apartment · 5 adults · USD 271.86 total charge · Ploce, Zadar | [Booking confirmation](booked/zadar-2026-05-17-to-2026-05-19.pdf) |
| Rovinj, Croatia | Apartments Sunrise & Sunset by Irundo | May 19-22, 2026 | Apartment with Terrace · 5 adults · EUR 479.00 charged in CHF on May 12, 2026 · 26 Zagrebacka ulica, Rovinj Old Town | [Booking confirmation](booked/rovinj-2026-05-19-to-2026-05-22-639955551.pdf) |
| Venice, Italy | Venice Lido Apartment Near Beach and Vaporetto | May 22-24, 2026 | Two-Bedroom Apartment · 5 adults · EUR 549.27 charged in CHF on May 19, 2026, plus CHF 91.3 taxes and fees at the property · Via Marcantonio Bragadin 16, Lido | [Booking confirmation](booked/venice-2026-05-22-to-2026-05-24.pdf) |
| Rome, Italy | San Lorenzo Home | May 31-June 2, 2026 | Two-Bedroom Apartment · 5 adults · EUR 358.78 charged by the property, plus CHF 54.8 taxes and fees at the property · Via dei Lucani 24, Rome | [Booking confirmation](booked/rome-2026-05-31-to-2026-06-02.pdf) |

## Croatia And Italy 2026 Open Stays

The hotel plan now reflects the confirmed bookings above and the shortened Europe leg with the Rome return flight on June 2, 2026.

| Gap | Dates | Nights | Notes |
| --- | --- | --- | --- |
| Between Makarska and Zadar | May 13-17, 2026 | 4 nights | No hotel booked yet. |
| Between Venice and Rome | May 24-31, 2026 | 7 nights | No hotel booked yet. |

Open-stay count: 2 gaps, 11 nights, all planned for 5 adults.

Apartments Milena is no longer the Rovinj stay in the final plan, and the app now keeps only Apartments Sunrise & Sunset by Irundo for May 19-22, 2026.
