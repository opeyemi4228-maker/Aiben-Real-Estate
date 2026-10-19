import { Video, Globe, FileSignature, Banknote, BellRing, Plane } from "lucide-react";
import Scene from "@/components/Scene";
import WorldClocks from "@/components/WorldClocks";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CurrencyToggle } from "@/components/Price";
import Calculator from "@/components/Calculator";
import { ButtonLink } from "@/components/ui";
import { getEstate } from "@/lib/estates";

export const metadata = { title: "Diaspora Desk", description: "Buy AIBEN property from abroad: video inspections, your currency, your time zone." };

const steps = [
  [Globe, "Shortlist from anywhere", "Browse with prices in pounds, dollars, euros or Canadian dollars, or let Ground Finder do it."],
  [Video, "Inspect by live video", "An adviser walks the plot with you on WhatsApp or Zoom, booked in your time zone. Recorded for you to share."],
  [FileSignature, "Sign without flying", "Sign digitally, or appoint someone with a power of attorney. We explain both in plain English."],
  [Banknote, "Pay safely", "International transfer or card, always into AIBEN Properties Ltd's company account. QR-coded receipt every time."],
  [BellRing, "Watch it grow", "Monthly dated drone and photo updates, and your documents, in My AIBEN."],
  [Plane, "Come home to it", "Handover when you're ready, and AIBEN Facility Managers can run it or rent it out until then."],
];

export default function DiasporaPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-soil px-4 pt-44 lg:pt-56 pb-24 text-sand sm:px-6">
        <Scene kind="estate" time="night" seed={123} label={false} className="decor absolute inset-0 h-full w-full opacity-35" />
        <div className="relative mx-auto max-w-7xl">
          <p className="eyebrow text-gold">Diaspora Desk</p>
          <h1 className="display mt-4 max-w-4xl text-5xl sm:text-7xl">
            Buy in Abuja <em>from anywhere.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-sand/80">A dedicated team for Nigerians abroad, working your hours, answering on WhatsApp.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book-inspection?mode=video" variant="gold">
              Book a video inspection
            </ButtonLink>
            <WhatsAppButton context="buying from abroad through the Diaspora Desk" label="Diaspora WhatsApp line" />
          </div>
          <div className="mt-14 text-sand">
            <WorldClocks />
          </div>
        </div>
      </section>

      <section className="bg-sand-2 px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="display on-light text-4xl sm:text-5xl">
            Six steps, <em>no flights needed.</em>
          </h2>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map(([Icon, t, d], i) => (
              <li key={t} className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
                <div className="flex items-center justify-between">
                  <Icon className="size-7 text-laterite" />
                  <span className="tabular text-xs text-muted">0{i + 1}</span>
                </div>
                <p className="mt-5 font-display text-2xl">{t}</p>
                <p className="mt-2 text-sm text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-sand px-4 py-24 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="display on-light text-4xl sm:text-5xl">
              See it in <em>your money.</em>
            </h2>
            <p className="mt-4 max-w-md text-muted">
              Switch the whole site to your currency. Rates are indicative and dated; contracts are priced in naira.
            </p>
            <CurrencyToggle className="mt-6" />
            <div className="mt-10 rounded-2xl bg-white p-6 ring-1 ring-black/5">
              <p className="eyebrow text-laterite">Diaspora contacts</p>
              <ul className="mt-4 space-y-2 text-sm">
                {["United Kingdom", "United States", "United Arab Emirates", "Canada"].map((c) => (
                  <li key={c} className="flex justify-between border-b border-black/5 pb-2">
                    <span>{c}</span>
                    <span className="text-muted">Local number, if AIBEN sets one up</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Calculator estate={getEstate("hutu-green-city")} />
        </div>
      </section>
    </>
  );
}
