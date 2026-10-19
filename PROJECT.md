# AIBEN Properties: Concept Website

A redesigned website for **AIBEN Properties Ltd**, designed and built by **[BitLayerX Technologies](https://www.bitlayerx.com)** as a private pitch build.

It presents AIBEN's real portfolio, people and track record with a black-and-white luxury design, accented with the blue and red of AIBEN's logo. It adds tools that the current site ([aibenproperties.com](https://aibenproperties.com)) doesn't have: clear prices, payment-plan calculators, a live master plan, agent verification, online reservation and booking, and a diaspora desk.

> **Status:** concept / pitch build. Search engines are told not to index it (`noindex` header and `robots.txt`). Forms, payments and the client portal are working mock-ups; nothing is stored or sent.

---

## Contents

1. [Quick start](#1-quick-start)
2. [Tech stack](#2-tech-stack)
3. [Project structure](#3-project-structure)
4. [Design system](#4-design-system)
5. [Sitemap and pages](#5-sitemap-and-pages)
6. [Homepage, section by section](#6-homepage-section-by-section)
7. [Components](#7-components)
8. [Data model](#8-data-model)
9. [Content: what is real and what is sample](#9-content-what-is-real-and-what-is-sample)
10. [Images](#10-images)
11. [Configuration](#11-configuration)
12. [Deployment](#12-deployment)
13. [Accessibility and performance](#13-accessibility-and-performance)
14. [Before going live](#14-before-going-live)
15. [Design references](#15-design-references)

---

## 1. Quick start

Requires **Node.js 20.9 or newer**.

```bash
npm install
npm run dev          # http://localhost:3000 (add -- -p 3456 to pick another port)
npm run lint         # ESLint
npm run build        # production build
npm start            # serve the production build
```

The opening title sequence plays once per browser session. To see it again, use **Replay the opening** in the footer.

---

## 2. Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 |
| Styling | Tailwind CSS 4 (CSS-first `@theme` tokens in `app/globals.css`) |
| Fonts | Bodoni Moda (display) and Montserrat (text), via `next/font/google` |
| Icons | lucide-react |
| Maps | Leaflet (estates map) |
| Utilities | clsx |

There's no database or CMS. All content lives in `lib/` as plain JavaScript, so a CMS can be swapped in later without touching the components.

> Next.js 16 has breaking changes from earlier versions (for example, `middleware.js` is now `proxy.js`). Read `node_modules/next/dist/docs/` before changing framework-level code. `AGENTS.md` repeats this note.

---

## 3. Project structure

```
app/
  layout.js                 Root layout: fonts, header, footer, floating WhatsApp, opening sequence
  globals.css               Design tokens, type scale, light/dark colour scopes, animations
  page.js                   Homepage
  hutu-prestige/page.js     HUTU Prestige landing page
  estates/page.js           All estates: filters, map and grid
  estates/[slug]/page.js    Estate detail (one page per estate, statically generated)
  ground-finder/page.js     3-question estate finder
  diaspora/page.js          Diaspora Desk
  how-to-buy/page.js        Buying journey, documents, costs, buyer protection
  verify/page.js            Verify an agent or a document
  book-inspection/page.js   Inspection booking flow
  reserve/page.js           Reservation and payment mock-up
  my-aiben/page.js          Client portal mock-up
  about/page.js             Story, mission and vision, team, track record, group
  contact/page.js           Concierge, routes, head office
  before-after/page.js      Pitch page: current site vs this concept
  robots.js, icon.svg

components/
  Header.jsx  Footer.jsx  Logo.jsx  Providers.jsx  FloatingWhatsApp.jsx
  home/       Hero, SearchBar, Portfolio, BuyBuildManage
  EstateCard, EstatesExplorer, EstateMap, Gallery, MasterPlan, PriceTable,
  Price, Calculator, ReserveFlow, BookingFlow, GroundFinder, VerifyAgent,
  VerifyDocument, Faq, WorldClocks, Waitlist, Countdown, LandGrow,
  ActionBar, Opening, Reveal, Scene, WhatsAppButton, ui

lib/
  site.js        Company facts, leadership, partners, brands, HUTU facts, nav
  estates.js     The full portfolio (27 estates) and helpers
  plots.js       Master-plan plot layout and status colours
  money.js       Currencies, formatting, payment-plan maths
  verify.js      Agent and document verification data (demo)
  useNow.js      Client clock hook

public/images/
  estates/   48 renders and photos
  team/      12 portraits
  partners/  9 partner logos
  site/      4 construction and office photos

proxy.js        Optional password gate for private previews
```

---

## 4. Design system

### Direction

Black and white carry the design for strength and authority. The logo's colours are used as accents only, and the photography supplies the rest. The design draws on three references:
- the editorial confidence of BitLayerX: heavy borders, large type, tight grids
- the luxury cues of Trump International Realty: a Didone serif, wide-tracked capitals, a centred wordmark and square buttons
- the conversion patterns of the HUTU marketing site: up-front prices, FAQs and a floating WhatsApp button

### Colour

| Token | Value | Use |
|---|---|---|
| `soil` | `#0A0A0A` | Black sections, ink |
| `soil-2` / `soil-3` | `#151515` / `#262626` | Raised dark surfaces |
| `sand` | `#F4F4F2` | Light grey sections; text on black |
| `sand-2` | `#FFFFFF` | Page background, cards |
| `muted` | `#5E5E5E` | Secondary text |
| `savanna` | `#1F7A4D` | Status only (available, office open) |
| `aiben-blue` | `#0A1DC9` | The IBEN letters of the logo |
| `aiben-red` | `#ED3237` | The logo's swoosh |
| `aiben-grey` | `#96989A` | The A of the logo |

**Brand colour, used as accents.** The logo's colours appear in a few fixed places, never as large fills:

| Colour | Where it appears |
|---|---|
| **Blue** (`accent`) | Section labels (eyebrows), the italic phrase that closes each headline, button hover, focus outlines, text selection, available plots on the master plan |
| **Red** (`signal`, `Swoosh`) | The swoosh mark beside every chapter label and under "Own your ground." in the opening; urgency only (low stock, the price countdown, notification dots); map pins and the selected plot |
| **Grey** | Reserved plots and other quiet details |

Blue appears on **light surfaces only**. Dark sections and photo heroes stay pure black and white (white labels, a white italic phrase), because a lightened blue looks washed out over photography. Red lightens to `#FF5C61` on dark so it stays readable. Small red text on white uses `#D3141C`, because the logo red is only 4.1:1 on white.

**Inverting brand colour.** `laterite` and `gold` are not fixed colours. They resolve to **black on light surfaces and white on dark surfaces**, and on light surfaces they turn AIBEN blue on hover; `on-brand` is the matching text colour. A primary button therefore stays correct on any background. The scope is set automatically by `bg-soil*` / `text-sand` (dark) and `bg-sand*` / `bg-white` (light), or explicitly with `.scope-dark` / `.scope-light`. `accent` and `signal` follow the same scopes.

### Typography

| Role | Font | Notes |
|---|---|---|
| Display (`.display`, `font-display`) | Bodoni Moda 500 | Tight tracking; each headline closes on one *italic* phrase (`<em>`) set slightly softer |
| Text | Montserrat | Body 18px, line-height 1.65 |
| Labels (`.caps`, `.eyebrow`) | Montserrat 600–700 | Uppercase, 0.16–0.24em tracking |

The type scale was enlarged for legibility: `text-xs` 14px · `sm` 16px · `base` 18px · `lg` 20px · `xl` 24px · `2xl` 28px.

### Shape and components

- **Corners:** near-square (2–4px). Buttons and tabs are fully square.
- **Buttons:** solid (`bg-laterite text-on-brand`) or outline (`border-2 border-current`), always in tracked capitals.
- **Lines:** 1px black hairlines divide stats, steps and lists. Portraits are greyscale and turn to colour on hover.
- **Motion:** reveal-on-scroll, a slow Ken Burns drift on hero images, and a cross-fading hero slideshow. All of it respects `prefers-reduced-motion` and the footer **Animations off** toggle.

### Header

The header has two tiers:
- **Utility bar** (black, folds away on scroll): "Since 2011 | 4 offices", phone, email (wide screens), My AIBEN, the Abuja/Lagos switch, and a solid white **Book an inspection** button (blue on hover).
- **Main bar:** exactly mirrored, with three links, the centred AIBEN logo, then three links, each side the same distance from the logo. Links use tracked capitals; the active page gets an underline in the accent colour (AIBEN blue on white, white over dark heroes). The bar is 112px tall at the top of the page and slims to 80px, with a smaller logo, once you scroll.

The header is transparent over dark heroes and turns white with a black bottom rule once you scroll. On mobile, it shows a square Menu button that opens a full black menu.

---

## 5. Sitemap and pages

| Route | Purpose | Key content |
|---|---|---|
| `/` | Homepage | See section 6 |
| `/hutu-prestige` | Flagship landing page | Hero, five facts (500 ha · $3bn · 10 min to airport · 25 min to city · 20,000 jobs), story, features, **real HUTU Exclusive plot prices**, phase cards, live master plan, FAQ, inspection call to action |
| `/estates` | Browse everything | City, type, budget and lifestyle filters, map/grid toggle, currency switch |
| `/estates/[slug]` | One page per estate (27) | Hero photo, key specs, description, address, timeline, photo gallery, price table and calculator (priced estates), site plan, amenities, location, documents, FAQs, sticky action bar |
| `/ground-finder` | Guided finder | Three questions, then a shortlist with a payment plan for each |
| `/diaspora` | Buying from abroad | Video inspections, world clocks, currencies, diaspora contacts |
| `/how-to-buy` | The journey | 8 steps, documents in plain English, full cost breakdown, buyer protection |
| `/verify` | Fraud prevention | Check an agent by name or number; check a document by QR/reference |
| `/book-inspection` | Booking | On-site (Inspection Saturday + pickup), live video (in your time zone) or pre-recorded |
| `/reserve` | Reservation mock-up | Choose a plan, pay a deposit (card / transfer), QR-coded receipt |
| `/my-aiben` | Client portal mock-up | Payments, progress, journey, documents, adviser, referrals |
| `/about` | Company | Story, stats, mission and vision, values, timeline, all 11 managers, delivered estates, AIBEN Group |
| `/contact` | Contact | Concierge, who-to-contact routes, phones, email, head office with map link and hours |
| `/before-after` | Pitch page | The current site's problems next to this concept's answers |

---

## 6. Homepage, section by section

The homepage was deliberately reduced from 17 sections to 11 to avoid information overload. Each section has one job.

1. **Hero:** a cross-fading slideshow of real renders, "Nigeria's largest private residential *development.*", one supporting line, and Explore estates + WhatsApp buttons. Switching to Lagos changes the copy and the images.
2. **Search:** location, type and budget, linking into `/estates`.
3. **Intro:** "Communities you can *own with confidence*", plus four stats: years building, 342 homes delivered, 500 hectares at HUTU, 204 staff.
4. **Portfolio:** Residential / Commercial / Hospitality / Delivered tabs, three cards per tab, and a "View all estates" button.
5. **Flagship:** a full-screen HUTU Prestige band with "plots from ₦22.4 million".
6. **From plot to keys:** expanding Buy · Build · Manage panels (AIBEN Properties, AIBEN construction, AIBEN Facility Managers).
7. **How to own:** five steps, plus **Verify an agent** and **Buying from abroad** shortcuts.
8. **Leadership:** the four senior managers, with a link to the full team.
9. **Trusted partners:** nine logos in greyscale on a white band.
10. **Straight answers:** an FAQ covering title, hidden charges, instalments and buying from abroad.
11. **Ready when you are:** Book an inspection + WhatsApp, with the head-office address and hours.

A **floating WhatsApp button** sits bottom right on every page except estate pages, which have their own sticky action bar.

---

## 7. Components

| Component | What it does |
|---|---|
| `Header`, `Footer`, `Logo` | Two-tier header, footer with toggles and credits, AIBEN's official logo (full colour on light, reversed on dark) |
| `Swoosh` | The red arc from the logo, used as the signature mark beside chapter labels |
| `Providers` | App-wide state: city, currency, motion, data saver; WhatsApp hand-off dialog |
| `WhatsAppButton`, `FloatingWhatsApp` | Opens a pre-written WhatsApp message tagged with the estate or plot being viewed |
| `Scene` | Renders a real photo when given `src`; otherwise draws a procedural placeholder illustration |
| `EstateCard` | Photo card: type badge, name, area, "From ₦…" / "Call for price" / "N homes delivered" |
| `EstatesExplorer`, `EstateMap` | Filterable estate list with a Leaflet map |
| `PriceTable`, `Price`, `CurrencyToggle` | Unit price list; NGN/USD/GBP/EUR/CAD display; "Get price" for unpublished prices |
| `Calculator` | Deposit, monthly and total for each plan, using priced units only |
| `MasterPlan` | Interactive plot grid (available / reserved / sold) with amenity hotspots |
| `ReserveFlow`, `BookingFlow` | Reservation and inspection-booking mock-ups |
| `GroundFinder` | Three questions, then a shortlist that fits the budget and plan |
| `VerifyAgent`, `VerifyDocument` | Anti-fraud checks (demo data in `lib/verify.js`) |
| `Faq` | Accessible `<details>` accordion |
| `Gallery` | Horizontal snap gallery and lightbox |
| `Reveal` | Fade-up on scroll; content stays visible without JavaScript |
| `Opening` | "AIBEN presents" title sequence, once per session, skippable |
| `ui` | `Chapter` (eyebrow + headline), `ButtonLink`, `Sample` tag, `NextChapter` |

---

## 8. Data model

### `lib/estates.js`

Each estate is a plain object:

```js
{
  slug: "aiben-twin-tower",
  name: "AIBEN Twin Tower",
  family: "HUTU Prestige",          // optional grouping
  partner: "with Mshel Homes",      // optional
  city: "abuja" | "lagos",
  area: "Guzape",
  address: "…",                     // optional, shown when present
  coords: [lat, lng] | null,        // map pin (approximate)
  type: "land" | "homes" | "commercial" | "hospitality",
  tab: "residential" | "commercial" | "hospitality" | "legacy",
  status: "selling" | "coming-soon" | "sold-out",
  line: "One-line summary.",
  about: "Real description from AIBEN.",
  hectares, delivered,              // optional numbers
  title: "FCDA C of O / FHA",       // or "Title on request"
  planMonths: 24,                   // 0 = outright only
  timeline: { start, handover },    // optional
  units: [{ name, size, beds, price | null, available }],
  priceSample: true,                // marks prices as SAMPLE in the UI
  amenities: ["…"],
  images: ["/images/estates/…jpg"],
  progress: [{ date, stage, value }],
}
```

- `price: null` means **Call for price**. The UI shows "Get price" (WhatsApp) and hides Reserve and the calculator.
- `priceSample: true` adds a visible **SAMPLE** tag wherever that estate's prices appear.
- The helpers `getEstate`, `pricedUnits`, `fromPrice`, `unitsLeft`, `estateHref` and `deliveredHomes` are exported.

### Portfolio (27 estates)

| Group | Estates |
|---|---|
| **HUTU Prestige** (7) | Green City · Polo Lake Resort · Polo Lake Phase 2 (China City Industrial Park) · Mountain Resort · Mountain Resort Phase 2 (Military Base) · Green City Phase 2 (Diaspora) · HUTU Exclusive (with Mshel Homes) |
| **Residential** (7) | AIBEN Victory Park · 5th Avenue Golf Estate · AIBEN Residence 1, 2 & 3 · City of Bahrain · Maralago Lake City · Biltmore Garden City (Ibeju-Lekki) · Calton Gate (Apapa GRA) |
| **Commercial** (6) | AIBEN Twin Tower · AIBEN Tower · CitiMall Airport Road · CitiMall Phase 2 Gwarinpa · CitiMall Phase 2 & Mar-a-Lago · CitiMall Phase 3 |
| **Hospitality** (1) | Bourdillon Hotel & Apartments |
| **Delivered, sold out** (6) | Ambassador Villa (62) · Pleasant View (31) · Biltmore Garden City Abuja (65) · Emerald Garden (74) · Trafford Villa (75) · Royal Garden (35) = **342 homes** |

### `lib/site.js`

This file holds `studio` (BitLayerX credit and the WhatsApp demo number) and `company`: the name, founding year 2011, 4 offices, 204 staff, phones, email, head office, hours, mission, vision, story and values.

It also holds:
- `leadership`: 11 managers with photos
- `partners`: 9 logos
- `brands`: the 6 group companies
- `hutu`: claim, location, facts, developers and features
- `nav`, `pathways`, `experiences`, and `whatsappMessage()`

---

## 9. Content: what is real and what is sample

### Real (from AIBEN's public sources, October 2026)

From **aibenproperties.com**:
- every estate name, location, description, house type, amenity list, title and timeline
- the 6 delivered estates and their unit counts
- the 5th Avenue Golf Estate prices (₦45m / ₦55m)
- leadership names, roles and photos
- mission, vision, story and values
- partners, phones, email, head-office address and hours
- all estate photography

From **gorbenn.com** (the HUTU Abuja joint-venture marketing site):
- the HUTU facts (500 ha, Lugbe South District, $3bn, 10 min to the airport, 25 min to town, 20,000 jobs, "Hutu means *to rest*")
- the AIBEN / Mshel Homes partnership
- the feature list
- the **HUTU Exclusive** plot prices: ₦22,453,200 · ₦37,422,000 · ₦52,390,800 · ₦149,688,000

### Sample (clearly tagged, to be replaced)

- **Prices:** HUTU phases (other than Exclusive) and Victory Park carry SAMPLE prices that drive the calculator and master-plan demos. Every other estate shows **Call for price**, matching AIBEN's own site.
- **Counts and positions:** plot availability counts, master-plan plot statuses and map coordinates.
- **Construction timeline:** the "watch your land grow" sequence and its dates.
- **Testimonials:** empty slots, filled only by real owners with consent.
- **Demo flows:** the verify, reserve, booking and client-portal data.
- **Title wording:** "Title on request" where AIBEN hasn't published a title type.

---

## 10. Images

All photography was downloaded from aibenproperties.com, then resized (max 1800px, JPEG quality 82, progressive) into `public/images/` (about 10 MB in total).

| Folder | Contents |
|---|---|
| `estates/` | Renders and photos per estate (`victory-park-1.jpg`, `twin-tower-3.jpg`, …) |
| `team/` | Portraits named by person (`andy-elerewe.jpg`, …) |
| `partners/` | Logos trimmed to their content (PNG, transparent) |
| `site/` | Construction team, construction progress, CEO photos |

AIBEN's own site reuses some renders across several estates (for example HUTU and Victory Park), so a few images repeat here too. Replace them as AIBEN supplies estate-specific photography and drone footage. Images from gorbenn.com were **not** used, because they are stock photos.

---

## 11. Configuration

Set these in `.env.local` (git-ignored):

| Variable | Effect |
|---|---|
| `NEXT_PUBLIC_DEMO_WHATSAPP` | Digits only, with country code (e.g. `2349044444411`). When set, WhatsApp buttons open a real chat with the pre-written message; when empty, they show the message in a demo dialog. |
| `NEXT_PUBLIC_STUDIO_NAME` | Overrides the studio credit (default: BitLayerX Technologies). |
| `DEMO_PASSWORD` | Turns on HTTP Basic Auth for the whole site (any username), for private previews. |

`next.config.mjs` sends `X-Robots-Tag: noindex, nofollow` on every route, and `app/robots.js` disallows crawling.

---

## 12. Deployment

The site is a standard Next.js app and deploys to Vercel, Netlify or any Node host:

```bash
npm run build && npm start
```

For a private client preview, set `DEMO_PASSWORD` in the host's environment variables. Every estate page is statically generated at build time through `generateStaticParams`.

---

## 13. Accessibility and performance

- Semantic landmarks, a skip link, `aria-current` on the active nav item, `aria-pressed` on toggles, and labelled radio groups for city and currency.
- Visible focus outlines that invert with the surface.
- Content is visible without JavaScript (reveal animations only enhance it).
- `prefers-reduced-motion` and the footer **Animations off** toggle stop all motion. **Data saver** hides decorative layers and turns on automatically on 2G / Save-Data.
- Images are lazy-loaded; fonts are self-hosted through `next/font`.
- Body text is 18px, and no text on the site is smaller than 11px.

---

## 14. Before going live

1. **Logo:** the site uses AIBEN's logo from a 429 × 150 PNG (`public/brand/`). Get the vector original, and confirm the reversed version (white A and IBEN, red swoosh) that we made for dark backgrounds.
2. **Prices:** confirm every price with AIBEN. Remove `priceSample` once real figures are in, and confirm the HUTU Exclusive prices, which came from a partner realtor's site and are "reviewed periodically".
3. **Titles:** publish each estate's real title type in place of "Title on request".
4. **Inventory:** connect plot availability and the master plan to AIBEN's real inventory.
5. **Photography:** add estate-specific renders, drone footage and dated construction photos (they feed "watch your land grow").
6. **Testimonials:** collect real owner quotes with consent.
7. **WhatsApp:** set `NEXT_PUBLIC_DEMO_WHATSAPP` (or per-department numbers) and route messages to advisers.
8. **Payments:** wire Reserve to Paystack / Flutterwave, paying into AIBEN's company accounts only.
9. **Verification:** connect `/verify` to AIBEN's real staff and document register.
10. **Client portal:** connect My AIBEN to the CRM and payment records.
11. **Indexing:** remove the `noindex` header and update `robots.js` when launching on AIBEN's domain.
12. **Lagos and office details:** add the other three offices' addresses and exact map pins for City of Bahrain, Biltmore Abuja and Trafford Villa.

---

## 15. Design references

| Reference | What was taken |
|---|---|
| [bitlayerx.com](https://www.bitlayerx.com) | Black-and-white confidence, large type, hairline grids, numbered steps |
| [trump.com/hotels](https://www.trump.com/hotels), [trumpinternationalrealty.com](https://www.trumpinternationalrealty.com/property-portfolio) | Didone serif, tracked capitals, split nav around a centred wordmark, square black buttons and tabs |
| [gorbenn.com](https://gorbenn.com) | HUTU facts and prices, up-front plot listings, objection-busting FAQs, floating WhatsApp |
| [aibenproperties.com](https://aibenproperties.com) | All AIBEN content, people and photography |

---

*Concept designed and built by [BitLayerX Technologies](https://www.bitlayerx.com) for AIBEN Properties Ltd. Not the official AIBEN website.*
