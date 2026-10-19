import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, Download, FileText, MapPin, ShieldCheck } from "lucide-react";
import Scene from "@/components/Scene";
import Reveal from "@/components/Reveal";
import Price from "@/components/Price";
import PriceTable from "@/components/PriceTable";
import Calculator from "@/components/Calculator";
import MasterPlan from "@/components/MasterPlan";
import ActionBar from "@/components/ActionBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { HorizontalGallery } from "@/components/Gallery";
import { ButtonLink, Chapter, Sample } from "@/components/ui";
import { estates, fromPrice, getEstate, pricedUnits, typeLabels, unitsLeft } from "@/lib/estates";
import { greenCityHotspots } from "@/lib/plots";

export function generateStaticParams() {
  return estates.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const e = getEstate((await params).slug);
  return e ? { title: e.name, description: `${e.name}, ${e.area}. ${e.line}` } : {};
}

const story = {
  homes: ["Mornings on a quiet street.", "Evenings on your own terrace.", "A gate that knows your name."],
  land: ["Ground that is yours, on paper and underfoot.", "Roads, drains and power before the first house.", "Build now, or hold and watch it grow."],
  commercial: ["An address that works as hard as you do.", "Footfall, frontage, and a building that's managed.", "Rent it out, or run your business from it."],
  hospitality: ["Rest, dine, and gather.", "Hospitality from the AIBEN Group."],
};

const faqs = (e) => [
  ["What title does this estate have?", `Title status for ${e.name} is shown in the documents section and confirmed in writing before you pay. Ask for the survey plan and title copy at inspection.`],
  ["Can I pay in instalments?", e.planMonths ? `Yes, over up to ${e.planMonths} months after an initial deposit. The calculator above shows the deposit and monthly amount for each plan.` : "Please talk to an adviser about payment options."],
  ["What other costs should I expect?", "Survey, legal and documentation, development and infrastructure fees are listed in our full cost breakdown, so the price you see is the price you plan for."],
  ["Can I inspect from abroad?", "Yes. Book a live video inspection in your own time zone through the Diaspora Desk, or send someone with a letter of authority."],
  ["What happens if I miss a payment?", "You get reminders by WhatsApp, SMS and email before each due date. Our payment compliance policy is explained in plain English under Buyer protection."],
];

export default async function EstatePage({ params }) {
  const e = getEstate((await params).slug);
  if (!e) notFound();
  const from = fromPrice(e);
  const left = unitsLeft(e);
  const soon = e.status === "coming-soon";
  const sold = e.status === "sold-out";
  const priced = pricedUnits(e).length > 0;
  const photos = e.images.map((src, i) => ({ caption: `${e.name}, ${i ? `view ${i + 1}` : "artist's impression"}`, scene: { src } }));

  const scenes = [
    { caption: "Living room at sunset", scene: { kind: "interior", time: "dusk", seed: e.seed + 1 } },
    { caption: "Street view", scene: { kind: e.kind === "interior" ? "estate" : e.kind, time: "dusk", seed: e.seed + 2 } },
    { caption: "Evening, lights on", scene: { kind: e.kind, time: "night", seed: e.seed + 3 } },
    { caption: "Lounge after dark", scene: { kind: "interior", time: "night", seed: e.seed + 4 } },
    { caption: "Green spaces", scene: { kind: "park", time: "day", seed: e.seed + 5 } },
  ];
  // Real AIBEN images replace the illustrated placeholders wherever they exist.
  const homes = photos.length ? photos : scenes;

  const specs = [
    e.hectares && [e.hectares, "hectares"],
    e.delivered && [e.delivered, "homes delivered"],
    e.units.length && [
      Math.min(...e.units.map((u) => u.size)) === Math.max(...e.units.map((u) => u.size))
        ? Math.min(...e.units.map((u) => u.size))
        : `${Math.min(...e.units.map((u) => u.size))}–${Math.max(...e.units.map((u) => u.size))}`,
      "sqm",
    ],
    e.timeline && [e.timeline.handover.split(" ").slice(-2).join(" "), "handover"],
    e.planMonths && [e.planMonths, "month plan"],
    e.units.some((u) => u.beds) && [`${Math.min(...e.units.filter((u) => u.beds).map((u) => u.beds))}–${Math.max(...e.units.filter((u) => u.beds).map((u) => u.beds))}`, "bedrooms"],
  ].filter(Boolean);

  return (
    <>
      {/* 1. Cinematic hero */}
      <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-soil text-sand">
        <Scene src={e.images[0]} kind={e.kind} time="dusk" seed={e.seed} className="drift absolute inset-0 h-full w-full" title={`${e.name}, artist's impression`} />
        {!e.images.length && (
          <div className="decor nightfall absolute inset-0 opacity-0">
            <Scene kind={e.kind} time="night" seed={e.seed} className="h-full w-full" title={`${e.name} at night`} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-soil via-soil/40 to-soil/60" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pt-32 pb-14 sm:px-6 lg:pt-52">
          <nav aria-label="Breadcrumb" className="text-xs text-sand/60">
            <Link href="/estates" className="hover:text-sand">Estates</Link> / {typeLabels[e.type]}
          </nav>
          <p className="eyebrow mt-6 flex items-center gap-2 text-gold">
            <MapPin className="size-3.5" /> {e.area}
            {e.family && <> · {e.family}</>}
          </p>
          <h1 className="display rise mt-3 max-w-[18ch] text-[clamp(2.5rem,min(7vw,11svh),6rem)]">{e.name}</h1>
          <p className="mt-4 max-w-2xl font-display text-xl text-sand/85 italic sm:text-2xl">{e.line}</p>
          {sold && <p className="caps mt-6 inline-block bg-white px-4 py-2 text-[13px] font-semibold text-ink">Delivered · sold out</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton context={e.name} />
            <ButtonLink href={`/book-inspection?estate=${e.slug}`} variant="ghost">
              Book an inspection
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 2. Specs as typography */}
      <section className="bg-soil px-4 pb-20 text-sand sm:px-6">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-10 border-t border-sand/10 pt-10 sm:grid-cols-3 xl:grid-cols-6">
          <div>
            <p className="display text-4xl text-gold sm:text-5xl">
              {sold ? "Sold out" : from ? <Price naira={from} compact sample={!!e.priceSample} /> : soon ? "Soon" : "Call"}
            </p>
            <p className="mt-1 text-sm text-sand/60">{sold ? "every unit delivered" : from ? "starting price" : soon ? "waitlist open" : "for today's price"}</p>
          </div>
          {specs.map(([n, l]) => (
            <div key={l}>
              <p className="display tabular text-4xl sm:text-5xl">{n}</p>
              <p className="mt-1 text-sm text-sand/60">{l}</p>
            </div>
          ))}
          <div>
            <p className="display text-2xl sm:text-3xl">{e.title}</p>
            <p className="mt-1 text-sm text-sand/60">
              title status {e.title === "Title on request" && <Sample />}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Story + 4. galleries */}
      <section className="bg-sand-2 px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Chapter n="01" eyebrow="Life here" light>
              {story[e.type][0].split(" ").slice(0, -1).join(" ")} <em>{story[e.type][0].split(" ").at(-1)}</em>
            </Chapter>
            {e.about && <p className="mt-8 max-w-3xl text-xl leading-relaxed text-ink/80">{e.about}</p>}
            {e.timeline && (
              <dl className="mt-8 grid max-w-md grid-cols-2 border-y border-black">
                <div className="py-4">
                  <dt className="caps text-[12px] font-semibold text-muted">Construction start</dt>
                  <dd className="mt-1 font-display text-2xl">{e.timeline.start}</dd>
                </div>
                <div className="border-l border-black/15 py-4 pl-5">
                  <dt className="caps text-[12px] font-semibold text-muted">Handover</dt>
                  <dd className="mt-1 font-display text-2xl">{e.timeline.handover}</dd>
                </div>
              </dl>
            )}
          </Reveal>
          <div className="mt-14">
            <HorizontalGallery items={homes} title={`${e.name} gallery`} />
          </div>
        </div>
      </section>

      {/* 5–6. Price list + calculator */}
      {e.units.length > 0 && !sold && (
        <section id="prices" className="bg-sand px-4 py-24 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <Chapter n="02" eyebrow="Prices & plans" light>
                The price, <em>up front.</em>
              </Chapter>
              <p className="mt-4 text-muted">
                {priced ? (
                  <>
                    {left} units left at today&apos;s prices. <Sample />
                  </>
                ) : (
                  "AIBEN publishes this estate's prices on request. Tap \u201cGet price\u201d and an adviser sends today's list on WhatsApp."
                )}
              </p>
            </Reveal>
            <div className="mt-10">
              <PriceTable estate={e} />
            </div>
            {priced && (
              <div className="mt-10 max-w-3xl">
                <Calculator estate={e} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* 7. Interactive site plan */}
      {priced && !soon && !sold && (
        <section id="site-plan" className="bg-soil px-4 py-24 text-sand sm:px-6">
          <div className="mx-auto max-w-7xl">
            <Chapter n="03" eyebrow="Site plan">
              Choose your <em>plot.</em>
            </Chapter>
            <div className="mt-10">
              <MasterPlan estate={e} hotspots={e.slug === "hutu-green-city" ? greenCityHotspots : []} />
            </div>
          </div>
        </section>
      )}

      {/* 8–9. Amenities + location */}
      <section className="bg-sand-2 px-4 py-24 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-laterite">Amenities</p>
            <ul className="mt-6 grid gap-x-6 sm:grid-cols-2">
              {e.amenities.map((a) => (
                <li key={a} className="flex items-start gap-3 border-b border-black/10 py-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-savanna" /> {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-laterite">Location</p>
            <p className="mt-6 font-display text-3xl leading-snug">{e.address || `${e.area}${e.city === "abuja" ? ", Abuja" : ", Lagos"}`}</p>
            <Link href={`/estates?city=${e.city}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-laterite hover:underline">
              <MapPin className="size-4" /> See it on the estates map
            </Link>
          </div>
        </div>
      </section>

      {/* 11. Documents */}
      <section id="documents" className="bg-sand px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-laterite">Documents</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Brochure", "PDF · 8 pages"],
              ["Title status", "Copy shown at inspection"],
              ["Subscription form", "Fill online or download"],
              ["Full cost breakdown", "Every fee, in naira"],
            ].map(([t, s]) => (
              <button key={t} type="button" className="flex items-center gap-4 rounded-xl bg-white p-5 text-left ring-1 ring-black/5 transition hover:shadow-md" title="Concept: documents are supplied by AIBEN after sign-off">
                <FileText className="size-8 shrink-0 text-laterite" />
                <span className="flex-1">
                  <span className="block font-semibold">{t}</span>
                  <span className="text-xs text-muted">{s}</span>
                </span>
                <Download className="size-4 text-muted" />
              </button>
            ))}
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted">
            <ShieldCheck className="size-4 text-savanna" /> Every AIBEN letter and receipt carries a QR code. <Link href="/verify#document" className="text-laterite underline">Verify a document</Link>
          </p>
        </div>
      </section>

      {/* 13. FAQs */}
      <section className="bg-sand px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-laterite">Questions</p>
          <div className="mt-6 divide-y divide-black/10 border-y border-black/10">
            {faqs(e).map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl">
                  {q}
                  <span className="text-laterite transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-muted">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 15. Disclaimer */}
      <section className="bg-sand px-4 pb-28 sm:px-6">
        <p className="mx-auto max-w-3xl text-xs text-muted">
          Images are artist&apos;s impressions where marked; photographs carry the month they were taken. Prices, plot availability and
          plans are indicative: confirm with AIBEN before paying. See our re-allocation and payment compliance policies under{" "}
          <Link href="/how-to-buy#protection" className="underline">Buyer protection</Link>.
        </p>
      </section>

      <ActionBar estate={e} />
    </>
  );
}
