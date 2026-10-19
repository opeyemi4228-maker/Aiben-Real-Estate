import Link from "next/link";
import { ArrowRight, ShieldCheck, Video } from "lucide-react";
import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import Portfolio from "@/components/home/Portfolio";
import BuyBuildManage from "@/components/home/BuyBuildManage";
import Scene from "@/components/Scene";
import Reveal from "@/components/Reveal";
import WhatsAppButton from "@/components/WhatsAppButton";
import Faq from "@/components/Faq";
import { ButtonLink, Chapter } from "@/components/ui";
import { company, leadership, partners } from "@/lib/site";
import { deliveredHomes } from "@/lib/estates";

const steps = [
  ["Choose", "Find your estate and plot, or let Ground Finder shortlist for you."],
  ["Inspect", "Visit on an Inspection Saturday, or by live video from abroad."],
  ["Reserve", "Hold your plot with a deposit, paid only into AIBEN's company account."],
  ["Pay", "Outright or over up to 24 months, with reminders and receipts."],
  ["Receive", "Allocation, survey and title documents, tracked in My AIBEN."],
];

const years = new Date().getFullYear() - company.founded;

const faqs = [
  [
    "How do I know the title is genuine?",
    "Every estate's title, from FCDA C of O to Right of Occupancy, is shown at inspection and confirmed in writing before you pay. You can verify any agent, receipt or letter on our Verify page.",
  ],
  [
    "Are there hidden charges?",
    "No. The price you see is the price of the land or home. On estate land, development and infrastructure levies apply when you start building, payable in instalments. The full cost breakdown lists every fee.",
  ],
  [
    "Can I pay in instalments?",
    "Yes. Most estates let you spread payment over 6, 12 or up to 24 months after an initial deposit, with reminders before every due date.",
  ],
  [
    "Can I buy from abroad?",
    "Yes. Book a live video inspection in your time zone, pay from abroad into AIBEN's company account, and track documents in My AIBEN.",
  ],
];

export default function Home() {
  return (
    <>
      <Hero />
      <SearchBar />

      {/* Who we are, in one line and four numbers */}
      <section className="bg-white px-4 pt-28 pb-24 sm:px-6 sm:pt-36" aria-labelledby="intro">
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <h2 id="intro" className="display text-5xl sm:text-7xl">
              Communities you can <em>own with confidence.</em>
            </h2>
            <p className="max-w-md text-lg text-muted">
              Since {company.founded}, AIBEN has built homes, estates and landmarks across Abuja and Lagos, with clear prices and verified
              titles.
            </p>
          </Reveal>
          <dl className="mt-16 grid grid-cols-2 border-t border-black lg:grid-cols-4">
            {[
              [years, "Years building"],
              [deliveredHomes, "Homes delivered"],
              [500, "Hectares at HUTU"],
              [company.staff, "People on the team"],
            ].map(([n, l], i) => (
              <div key={l} className={`py-8 pr-4 ${i ? "lg:border-l lg:border-black/15 lg:pl-8" : ""}`}>
                <dt className="sr-only">{l}</dt>
                <dd className="display tabular text-6xl sm:text-7xl">{n}</dd>
                <p className="caps mt-3 text-[12px] font-semibold text-muted">{l}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Portfolio */}
      <section id="communities" className="bg-soil px-4 py-24 text-sand sm:px-6 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Chapter eyebrow="Our portfolio">
              Find your <em>place.</em>
            </Chapter>
          </Reveal>
          <div className="mt-12">
            <Portfolio />
          </div>
        </div>
      </section>

      {/* Flagship */}
      <section className="relative flex min-h-[88svh] items-center overflow-hidden bg-soil px-4 py-28 text-center text-sand sm:px-6">
        <Scene src="/images/estates/victory-park-6.jpg" title="HUTU Prestige Green City, artist's impression" className="drift absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-soil/65" />
        <Reveal className="relative mx-auto max-w-4xl">
          <p className="eyebrow text-gold">Africa&apos;s first polo & golf resort estate</p>
          <h2 className="display mt-6 text-6xl sm:text-8xl lg:text-9xl">
            HUTU <em>Prestige</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-sand/80 sm:text-xl">
            500 hectares on Airport Road, Abuja. Polo, golf, a lake and a horse ranch, with plots from ₦22.4 million.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/hutu-prestige">Discover HUTU Prestige</ButtonLink>
            <ButtonLink href="/hutu-prestige#master-plan" variant="ghost">
              See the master plan
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      {/* Buy · Build · Manage */}
      <section id="lifecycle" className="bg-white px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Chapter eyebrow="One group" light>
              From plot <em>to keys.</em>
            </Chapter>
          </Reveal>
          <div className="mt-12">
            <BuyBuildManage />
          </div>
        </div>
      </section>

      {/* Ownership in five steps */}
      <section id="ownership" className="bg-sand px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <Chapter eyebrow="How to own" light>
              Five steps. <em>No guesswork.</em>
            </Chapter>
            <ButtonLink href="/how-to-buy" variant="ghost">
              The full guide
            </ButtonLink>
          </Reveal>
          <ol className="mt-14 grid border-t border-black sm:grid-cols-5">
            {steps.map(([t, d], i) => (
              <li key={t} className="border-b border-black/15 py-8 sm:border-b-0 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0">
                <span className="tabular text-sm font-semibold text-muted">0{i + 1}</span>
                <p className="mt-4 font-display text-3xl">{t}</p>
                <p className="mt-3 text-base text-muted">{d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14 grid gap-px border border-black bg-black sm:grid-cols-2">
            <Link href="/verify" className="group flex items-center gap-5 bg-white p-7 transition hover:bg-soil hover:text-white">
              <ShieldCheck className="size-8 shrink-0" />
              <span className="flex-1">
                <span className="block font-display text-2xl">Verify an agent before you pay</span>
                <span className="text-base text-muted transition group-hover:text-white/70">AIBEN only accepts payment into company accounts.</span>
              </span>
              <ArrowRight className="size-5 transition group-hover:translate-x-1" />
            </Link>
            <Link href="/diaspora" className="group flex items-center gap-5 bg-white p-7 transition hover:bg-soil hover:text-white">
              <Video className="size-8 shrink-0" />
              <span className="flex-1">
                <span className="block font-display text-2xl">Buying from abroad?</span>
                <span className="text-base text-muted transition group-hover:text-white/70">Live video inspections in your time zone.</span>
              </span>
              <ArrowRight className="size-5 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="bg-white px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <Chapter eyebrow="Leadership" light>
              The people <em>who answer.</em>
            </Chapter>
            <Link href="/about#team" className="caps inline-flex items-center gap-2 text-[13px] font-semibold hover:underline">
              Meet the full team <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {leadership
              .filter((l) => l.board)
              .map((l, i) => (
                <Reveal key={l.name} delay={i * 80}>
                  <figure>
                    <div className="overflow-hidden bg-sand">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={l.photo} alt={l.name} loading="lazy" className="aspect-[4/5] w-full object-cover object-top grayscale transition duration-700 hover:grayscale-0" />
                    </div>
                    <figcaption className="mt-4 border-t border-black pt-4">
                      <p className="font-display text-2xl leading-tight">{l.name}</p>
                      <p className="caps mt-1 text-[12px] font-semibold text-muted">{l.role}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      {/* Trusted partners */}
      <section aria-labelledby="partners" className="border-y border-black bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p id="partners" className="eyebrow text-center">Trusted partners</p>
          <ul className="mt-10 grid grid-cols-3 items-center gap-x-10 gap-y-10 sm:grid-cols-5 lg:grid-cols-9">
            {partners.map((p) => (
              <li key={p.name} className="flex h-14 items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.logo} alt={p.name} title={p.name} loading="lazy" className="max-h-14 w-auto max-w-full object-contain grayscale transition duration-300 hover:grayscale-0" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <Chapter eyebrow="Before you buy" light>
              Straight <em>answers.</em>
            </Chapter>
            <p className="mt-6 max-w-sm text-lg text-muted">Anything else, ask an adviser on WhatsApp. We answer.</p>
          </Reveal>
          <Faq items={faqs} />
        </div>
      </section>

      {/* Final call */}
      <section className="relative overflow-hidden bg-soil px-4 py-32 text-center text-sand sm:px-6 sm:py-40">
        <Scene src="/images/estates/bourdillon-1.jpg" title="Bourdillon Hotel & Apartments at dusk" className="decor absolute inset-0 h-full w-full opacity-30" />
        <div className="relative mx-auto max-w-3xl">
          <p className="eyebrow text-gold">Your ground</p>
          <h2 className="display mt-5 text-5xl sm:text-7xl">
            Ready when <em>you are.</em>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/book-inspection">Book an inspection</ButtonLink>
            <WhatsAppButton />
          </div>
          <p className="mt-10 text-sm text-sand/60">
            {company.address} · {company.hours}
          </p>
        </div>
      </section>
    </>
  );
}
