import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Scene from "@/components/Scene";
import Reveal from "@/components/Reveal";
import EstateCard from "@/components/EstateCard";
import { Chapter } from "@/components/ui";
import { brands, company, leadership } from "@/lib/site";
import { deliveredHomes, estates } from "@/lib/estates";

export const metadata = { title: "About" };

const milestones = [
  [String(company.founded), "AIBEN Group founded by Chief Andy Elerewe, offering support services to the built sector."],
  ["Early years", "Ambassador Villa, AIBEN's premier project: 62 maisonettes on Airport Road, sold out instantly."],
  ["Growth", "Biltmore Garden City, Emerald Garden, Trafford Villa, Royal Garden and Pleasant View delivered and sold out."],
  ["2021", "Within ten years, AIBEN Properties Ltd becomes a leading real estate firm with multiple residential and commercial projects."],
  ["2025", "AIBEN Twin Tower breaks ground in Guzape; CitiMall Phase 2 starts on Gwarinpa's 2nd Avenue."],
  ["Today", `${company.staff} people, ${company.offices} offices across Lagos and Abuja, and HUTU Prestige underway on Airport Road.`],
];

export default function AboutPage() {
  const delivered = estates.filter((e) => e.delivered);
  return (
    <>
      <section className="relative overflow-hidden bg-soil px-4 pt-44 pb-24 text-sand sm:px-6 lg:pt-56">
        <Scene src="/images/estates/twin-tower-2.jpg" title="AIBEN Twin Tower, Guzape" className="decor absolute inset-0 h-full w-full opacity-30" />
        <div className="relative mx-auto max-w-7xl">
          <p className="eyebrow text-gold">About AIBEN</p>
          <h1 className="display mt-4 max-w-4xl text-5xl sm:text-7xl">
            Building since {company.founded}. <em>Built to last.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-sand/80">{company.story}</p>
          <dl className="mt-14 grid max-w-4xl grid-cols-2 border-y border-white/20 sm:grid-cols-4">
            {[
              [new Date().getFullYear() - company.founded, "years building"],
              [deliveredHomes, "homes delivered"],
              [delivered.length, "estates sold out"],
              [company.staff, "staff"],
            ].map(([n, l]) => (
              <div key={l} className="py-6 pr-4">
                <dt className="sr-only">{l}</dt>
                <dd className="display tabular text-5xl">{n}</dd>
                <p className="caps mt-2 text-[12px] font-semibold text-sand/60">{l}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Mission and vision */}
      <section className="bg-sand-2 px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-px border border-black bg-black lg:grid-cols-2">
          {[
            ["Mission", company.mission],
            ["Vision", company.vision],
          ].map(([t, d]) => (
            <div key={t} className="bg-white p-8 sm:p-12">
              <p className="eyebrow">{t}</p>
              <p className="mt-6 font-display text-3xl leading-snug sm:text-4xl">{d}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-16 max-w-7xl">
          <p className="eyebrow">What we stand for</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {company.values.map((v) => (
              <li key={v} className="caps border border-black px-5 py-3 text-[13px] font-semibold">
                {v}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Story */}
      <section className="bg-sand px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <Chapter eyebrow="Company story" light>
            {company.founded} <em>to today.</em>
          </Chapter>
          <ol className="mt-12 border-t border-black">
            {milestones.map(([y, t]) => (
              <li key={y} className="grid gap-2 border-b border-black/15 py-6 sm:grid-cols-[180px_1fr]">
                <p className="caps text-[13px] font-semibold">{y}</p>
                <p className="font-display text-2xl leading-snug">{t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="scroll-mt-28 bg-sand-2 px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Chapter eyebrow="Our professional team" light>
            The people <em>behind the ground.</em>
          </Chapter>
          <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {leadership.map((l, i) => (
              <Reveal as="li" key={l.name} delay={(i % 4) * 80}>
                <div className="overflow-hidden bg-sand">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.photo} alt={l.name} loading="lazy" className="aspect-[4/5] w-full object-cover object-top grayscale transition duration-700 hover:grayscale-0" />
                </div>
                <div className="mt-4 border-t border-black pt-4">
                  <p className="font-display text-2xl leading-tight">{l.name}</p>
                  <p className="caps mt-1 text-[12px] font-semibold text-muted">{l.role}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Track record */}
      <section className="bg-soil px-4 py-24 text-sand sm:px-6 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Chapter eyebrow="Track record">
              Delivered. <em>Sold out.</em>
            </Chapter>
            <Link href="/estates" className="caps inline-flex items-center gap-2 text-[13px] font-semibold hover:underline">
              Estates selling now <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {delivered.map((e) => (
              <EstateCard key={e.slug} estate={e} />
            ))}
          </div>
        </div>
      </section>

      {/* Group */}
      <section className="bg-sand-2 px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Chapter eyebrow={company.group} light>
            One group. <em>{brands.length} companies.</em>
          </Chapter>
          <p className="mt-6 max-w-2xl text-muted">
            A conglomerate with substantial interests in real estate, hospitality, media, agro-allied and consultancy services.
          </p>
          <ul className="mt-10 grid gap-px border border-black bg-black sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((b) => (
              <li key={b.name} className="bg-white p-8">
                <p className="font-display text-2xl">{b.name}</p>
                <p className="caps mt-2 text-[12px] font-semibold text-muted">{b.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
