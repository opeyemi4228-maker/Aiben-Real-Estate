import { ShieldCheck, Landmark, Phone } from "lucide-react";
import VerifyAgent from "@/components/VerifyAgent";
import VerifyDocument from "@/components/VerifyDocument";
import { company } from "@/lib/site";

export const metadata = { title: "Verify", description: "Check that an agent or a document is genuinely from AIBEN Properties." };

export default function VerifyPage() {
  return (
    <div className="bg-sand-2 px-4 pt-40 lg:pt-52 pb-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow text-laterite">Verify</p>
        <h1 className="display on-light mt-3 text-5xl sm:text-6xl">
          Trust it. <em>Then check it.</em>
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Fake agents and forged papers are the biggest risk in Nigerian property. Check any AIBEN contact or document here in seconds, free.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 ring-1 ring-black/5 sm:p-8" aria-labelledby="agent">
            <ShieldCheck className="size-8 text-laterite" />
            <h2 id="agent" className="mt-4 font-display text-3xl">Verify an agent</h2>
            <p className="mt-2 mb-6 text-sm text-muted">Enter the phone number or full name of the person who contacted you.</p>
            <VerifyAgent />
          </section>
          <section id="document" className="scroll-mt-28 rounded-2xl bg-white p-6 ring-1 ring-black/5 sm:p-8" aria-labelledby="doc">
            <Landmark className="size-8 text-laterite" />
            <h2 id="doc" className="mt-4 font-display text-3xl">Verify a document</h2>
            <p className="mt-2 mb-6 text-sm text-muted">Scan the QR code on an allocation letter or receipt, or type the code printed under it.</p>
            <VerifyDocument />
          </section>
        </div>

        <section className="mt-12 rounded-2xl bg-soil p-8 text-sand">
          <h2 className="font-display text-3xl">Three rules that keep your money safe</h2>
          <ol className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
              ["Pay the company, never a person.", "AIBEN only receives payment into accounts in the name of AIBEN Properties Ltd."],
              ["Get a receipt with a QR code.", "Every payment produces a receipt you can check on this page."],
              ["When in doubt, call us.", `${company.phones[0]} or ${company.email}. We answer.`],
            ].map(([t, d], i) => (
              <li key={t}>
                <span className="tabular text-gold">0{i + 1}</span>
                <p className="mt-2 font-display text-xl">{t}</p>
                <p className="mt-1 text-sm text-sand/70">{d}</p>
              </li>
            ))}
          </ol>
          <a href={`tel:${company.phones[0].replace(/\s/g, "")}`} className="mt-8 inline-flex items-center gap-2 bg-gold px-5 py-3 text-sm font-semibold text-on-brand">
            <Phone className="size-4" /> Report a suspicious contact
          </a>
        </section>
      </div>
    </div>
  );
}
