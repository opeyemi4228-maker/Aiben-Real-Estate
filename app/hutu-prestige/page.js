import Scene from "@/components/Scene";
import Reveal from "@/components/Reveal";
import Price from "@/components/Price";
import MasterPlan from "@/components/MasterPlan";
import EstateCard from "@/components/EstateCard";
import Faq from "@/components/Faq";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ButtonLink, Chapter } from "@/components/ui";
import { estates, getEstate } from "@/lib/estates";
import { greenCityHotspots } from "@/lib/plots";
import { hutu } from "@/lib/site";

export const metadata = {
  title: "HUTU Prestige",
  description: "Africa's first polo & golf resort estate: 500 hectares on Airport Road, Abuja, by AIBEN Properties.",
};

const faqs = [
  [
    "How soon can I start building?",
    "HUTU is an off-plan development, so you secure your plot at today's price before construction is complete. You can begin building once the estate's building approvals are issued.",
  ],
  [
    "Are there hidden charges?",
    "No. The plot price is what you pay for the land, plus a small application-form fee. Because this is estate land, development levies and infrastructure fees apply when you are ready to build, and they can be paid in instalments. Every fee is written down before you pay.",
  ],
  [
    "What title does HUTU have?",
    "The title for each phase is shown at inspection and confirmed in writing before you pay. Ask for the survey plan and title copy, and verify any agent or document at aibenproperties.com/verify.",
  ],
  [
    "Can I sell my plot later?",
    "Yes. You can resell or transfer your plot; AIBEN's re-allocation policy sets out how, and an adviser can help you find a buyer.",
  ],
];

export default function HutuPage() {
  const green = getEstate("hutu-green-city");
  const exclusive = getEstate("hutu-exclusive");
  const phases = estates.filter((e) => e.family === "HUTU Prestige" && e.slug !== "hutu-exclusive");

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-soil text-sand">
        <Scene src="/images/estates/victory-park-4.jpg" className="drift absolute inset-0 h-full w-full" title="HUTU Prestige, artist's impression" />
        <div className="absolute inset-0 bg-gradient-to-t from-soil via-soil/50 to-soil/70" />
        <div className="relative mx-auto w-full max-w-360 px-5 pt-32 pb-20 sm:px-8 lg:px-10 lg:pt-52">
          <p className="eyebrow flex items-center gap-3 text-white">
            <span className="h-0.5 w-10 bg-white" /> {hutu.claim}
          </p>
          <h1 className="display rise mt-7 text-[clamp(3.25rem,min(11vw,15svh),10rem)]">
            HUTU <em>Prestige</em>
          </h1>
          <div className="mt-10 grid gap-8 border-t border-white/20 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="max-w-xl text-lg text-white/80 sm:text-xl">500 hectares of leisure, luxury and legacy in {hutu.location}.</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="#prices">See plots & prices</ButtonLink>
              <WhatsAppButton context="HUTU Prestige" />
            </div>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="bg-soil px-4 text-sand sm:px-6" aria-label="HUTU in numbers">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 border-t border-white/15 sm:grid-cols-3 lg:grid-cols-5">
          {hutu.facts.map(([n, l], i) => (
            <div key={l} className={`py-10 pr-4 ${i ? "lg:border-l lg:border-white/15 lg:pl-8" : ""}`}>
              <dt className="sr-only">{l}</dt>
              <dd className="display tabular text-5xl sm:text-6xl">{n}</dd>
              <p className="caps mt-3 text-[12px] font-semibold text-sand/60">{l}</p>
            </div>
          ))}
        </dl>
      </section>

      {/* Story */}
      <section className="bg-white px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <Chapter eyebrow="A taste of leisure & luxury" light>
              A place <em>to rest.</em>
            </Chapter>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink/80">
              {hutu.meaning} Serviced plots, luxury homes, commercial space and world-class amenities, minutes from the Presidential
              Expressway and the international airport, with a dual carriageway into the city.
            </p>
          </Reveal>
          <Reveal className="self-end">
            <p className="eyebrow">Presented by</p>
            <ul className="mt-6 border-t border-black">
              {hutu.developers.map(([n, d]) => (
                <li key={n} className="border-b border-black/15 py-6">
                  <p className="font-display text-3xl">{n}</p>
                  <p className="mt-2 text-base text-muted">{d}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="bg-sand px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Chapter eyebrow="Features" light>
            Everything <em>in one estate.</em>
          </Chapter>
          <ol className="mt-14 grid border-t border-black sm:grid-cols-2 lg:grid-cols-5">
            {hutu.features.map(([t, d], i) => (
              <li key={t} className="border-b border-black/15 py-8 lg:border-b-0 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0">
                <span className="tabular text-sm font-semibold text-muted">0{i + 1}</span>
                <p className="mt-4 font-display text-2xl leading-snug">{t}</p>
                <p className="mt-3 text-base text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Plots & prices: real HUTU Exclusive figures */}
      <section id="prices" className="scroll-mt-28 bg-white px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Chapter eyebrow={`${exclusive.name} · ${exclusive.partner}`} light>
              Plots & <em>prices.</em>
            </Chapter>
            <p className="max-w-sm text-base text-muted">Estate plots, priced up front. Prices are reviewed periodically; confirm before you pay.</p>
          </div>
          <ul className="mt-14 grid gap-px border border-black bg-black sm:grid-cols-2 lg:grid-cols-4">
            {exclusive.units.map((u) => (
              <li key={u.size} className="flex flex-col bg-white p-7">
                <p className="display tabular text-6xl">
                  {u.size.toLocaleString()}
                  <span className="font-display text-2xl italic text-muted"> sqm</span>
                </p>
                <p className="mt-4 flex-1 text-lg">{u.name.replace("Plot for ", "")}</p>
                <p className="mt-6 border-t border-black/15 pt-5 font-display text-3xl">
                  <Price naira={u.price} sample={false} />
                </p>
                <WhatsAppButton context={`HUTU Exclusive, ${u.size} sqm plot (${u.name.replace("Plot for ", "")})`} label="Buy this plot" variant="brand" className="mt-5 w-full" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Phases */}
      <section className="bg-soil px-4 py-24 text-sand sm:px-6 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Chapter eyebrow="The phases">
            Choose your <em>side of HUTU.</em>
          </Chapter>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {phases.map((e) => (
              <EstateCard key={e.slug} estate={e} />
            ))}
          </div>
        </div>
      </section>

      {/* Master plan */}
      <section id="master-plan" className="scroll-mt-28 border-t border-white/10 bg-soil px-4 py-24 text-sand sm:px-6 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Chapter eyebrow="Live master plan · HUTU Green City">
            Every plot, <em>in the open.</em>
          </Chapter>
          <div className="mt-10">
            <MasterPlan estate={green} hotspots={greenCityHotspots} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Chapter eyebrow="Before you buy" light>
              Straight <em>answers.</em>
            </Chapter>
            <WhatsAppButton context="HUTU Prestige" label="Ask an adviser" className="mt-10" />
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      {/* Final call */}
      <section className="relative overflow-hidden bg-soil px-4 py-32 text-center text-sand sm:px-6">
        <Scene src="/images/estates/residence-4.jpg" title="Mountain Resort, HUTU Prestige" className="decor absolute inset-0 h-full w-full opacity-30" />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="display text-5xl sm:text-7xl">
            See HUTU <em>for yourself.</em>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/book-inspection">Book a site inspection</ButtonLink>
            <WhatsAppButton context="HUTU Prestige" />
          </div>
        </div>
      </section>
    </>
  );
}
