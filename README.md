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

## Croatia And Italy 2026 Stay Planning

This public README summarizes the current stay choices and shortlist options without linking directly to the confirmation PDFs. Selected rows use saved confirmation details plus public listing facts where needed for planning. Pending rows use public listing data and should be rechecked before booking because rates and cancellation terms can change.

| Stop | Status | Property / Option | Check-in | Check-out | Price / Night | Layout | Size | Parking | Cancellation | Link | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Dubrovnik, Croatia | Selected | Taira Apartment | May 8, 2026 | May 12, 2026 | Reference total USD 575.07, about USD 143.77/night | 2 bedrooms; 2 king beds + 1 sofa bed; 2 bathrooms | 91 m^2 | Free private on-site | Not shown in the saved Airbnb itinerary PDF | [Public listing](https://www.booking.com/hotel/hr/taira.html) | Saved itinerary came through Airbnb; public listing used only to summarize the room layout |
| Makarska Coast (overnight) | Shortlist | Apartment Luka | May 12, 2026 | May 13, 2026 | Public sample: HUF 106,080/night; recheck your exact May rate | 2 bedrooms; living room sofa bed; 2 bathrooms; sleeps 5 | 75 m^2 | Free private on-site | Public sample shows partially refundable / pay online | [Agoda option](https://www.agoda.com/apartment-luka_5/hotel/all/makarska-hr.html?countryId=128&finalPriceView=1&isShowMobileAppPrice=false&cid=-1&numberOfBedrooms=&familyMode=false&adults=5&children=0&rooms=1&maxRooms=0&checkIn=2026-05-12&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=3&showReviewSubmissionEntry=false&currencyCode=USD&isFreeOccSearch=false&tspTypes=4&los=1&searchrequestid=31a06db8-3932-44e3-a7a4-f7d4b055ed66&ds=AMFW5fR3L1oriMY2) | Public sources conflict on the exact bed split, so confirm before booking |
| Split, Croatia | Shortlist | Apartment Doverska Split | May 13, 2026 | May 17, 2026 | Public rate sample from EUR 163/night; exact May rate not exposed in the crawl | 3 bedrooms; 1 bathroom; sea-view apartment | 105 m^2 | Free parking | Public samples suggest flexible terms, but exact May policy needs recheck | [Agoda option](https://www.agoda.com/apartment-doverska-split/hotel/all/split-hr.html?countryId=128&finalPriceView=1&isShowMobileAppPrice=false&cid=-1&numberOfBedrooms=&familyMode=false&adults=6&children=0&rooms=1&maxRooms=0&checkIn=2026-05-13&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=3&showReviewSubmissionEntry=false&currencyCode=USD&isFreeOccSearch=false&los=4&searchrequestid=ab9d4423-b158-4a99-ab7f-861f53bf5fd0) | Exact bed count was not clearly exposed in the public crawl |
| Zadar, Croatia | Shortlist | Oliva Vallis Apartments | May 17, 2026 | May 19, 2026 | Public starting rate about USD 118.72/night; larger 2-bedroom unit may price higher | 2 bedrooms; 1 double/queen + 2 twin + 1 sofa bed | 72 m^2 | Free car park | Public sample shows free cancellation / pay later | [Agoda option](https://www.agoda.com/oliva-vallis-apartments/hotel/all/zadar-hr.html?countryId=128&finalPriceView=1&isShowMobileAppPrice=false&cid=-1&numberOfBedrooms=&familyMode=false&adults=5&children=0&rooms=1&maxRooms=0&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=3&showReviewSubmissionEntry=false&currencyCode=USD&isFreeOccSearch=false&los=2&searchrequestid=b5dc5624-750c-44d9-bd0c-de9bcbd54713&checkin=2026-05-17) | Public property data also mentions shuttle service |
| Zadar area alternate | Alternate | Apartmani Carmen (Bibinje / Sukosan area) | May 17, 2026 | May 21, 2026 | No reliable public rate recovered | 2-bedroom terrace apartment option or larger 3-bedroom units, depending on unit type | Varies by unit | Free car park | Recheck live listing | [Agoda option](https://www.agoda.com/apartmani-carmen_2/hotel/all/sukosan-hr.html?countryId=128&finalPriceView=1&isShowMobileAppPrice=false&cid=-1&numberOfBedrooms=&familyMode=false&adults=5&children=0&rooms=1&maxRooms=0&checkIn=2026-05-17&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=3&showReviewSubmissionEntry=false&currencyCode=USD&isFreeOccSearch=false&los=4&searchrequestid=b5dc5624-750c-44d9-bd0c-de9bcbd54713) | This does not match the one-night Makarska stop; it looks more like a Zadar-area alternative |
| Rovinj, Croatia | Need option | TBD | May 19, 2026 | May 22, 2026 | - | - | - | - | - | - | No public candidate added yet |
| Venice, Italy | Need option | TBD | May 22, 2026 | May 24, 2026 | - | - | - | - | - | - | No public candidate added yet |
| Verona, Italy | Need option | TBD | May 24, 2026 | May 25, 2026 | - | - | - | - | - | - | No public candidate added yet |
| Tuscany (Castelnuovo Berardenga) | Selected | Casale Le Querce | May 25, 2026 | May 31, 2026 | Reference total about EUR 620, about EUR 103/night | 2 bedrooms; 1 queen + 2 twin + 2 sofa beds | About 969 ft^2 | Free private on-site | Free until May 10, 2026 23:59 local time; from May 11 the full stay is charged | [Public listing](https://www.booking.com/hotel/it/casale-le-querce-castelnuovo-berardenga.html) | Saved confirmation also mentions a refundable EUR 400 damage deposit on arrival |
| Rome, Italy | Need option | TBD | May 31, 2026 | June 5, 2026 | - | - | - | - | - | - | No public candidate added yet |

All dates are contiguous with no gaps. Same-day check-outs and check-ins happen on May 12, May 13, May 17, May 19, May 22, May 24, May 25, and May 31.
