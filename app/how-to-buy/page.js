import Link from "next/link";
import { Sample } from "@/components/ui";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = { title: "How to buy", description: "The AIBEN buying journey, documents explained, every fee, and buyer protection." };

const journey = [
  ["Choose", "Pick an estate and a plot or house type. Ground Finder can shortlist for you."],
  ["Inspect", "Visit on an Inspection Saturday with free pickup in Abuja, or inspect by live video."],
  ["Reserve", "Pay a deposit online to hold your plot. You get a QR-coded receipt immediately."],
  ["Subscribe", "Complete the subscription form and choose a plan: outright, 6, 12 or 24 months."],
  ["Pay", "Instalments with reminders before every due date. Every receipt lands in My AIBEN."],
  ["Allocation", "When your payment is complete, you receive your allocation letter."],
  ["Survey", "Your plot is surveyed and beaconed; you get the survey plan."],
  ["Documents", "Deed of assignment and title documents are processed and handed over."],
];

const docs = [
  ["Certificate of Occupancy (C of O)", "Government's grant of the right to occupy and use the land, usually for 99 years. The strongest title a private owner can hold."],
  ["Right of Occupancy (R of O)", "An earlier-stage grant that precedes the C of O. Valid, but ask what stage the full C of O is at."],
  ["Survey plan", "A registered drawing of your plot's exact boundaries and coordinates. Make sure it matches the plot you inspected."],
  ["Deed of assignment", "The contract that transfers the property from AIBEN to you. It must be signed, stamped and registered."],
  ["Allocation letter", "AIBEN's letter assigning a specific plot to you once payment is complete. Every AIBEN letter carries a QR code you can verify."],
];

const fees = [
  ["Plot or house price", "As listed"],
  ["Survey fee", "₦X,XXX,XXX"],
  ["Legal and documentation", "₦X,XXX,XXX"],
  ["Development / infrastructure levy", "₦X,XXX,XXX"],
  ["Deed of assignment registration", "₦XXX,XXX"],
  ["Facility management (annual, after handover)", "₦XXX,XXX"],
];

const protection = [
  ["What if I miss a payment?", "You'll get reminders before every due date. If a payment is late, we contact you first and agree a way forward. The payment compliance policy explains each step and its timelines."],
  ["Can my plot be re-allocated?", "Only under the conditions in the re-allocation policy, for example if a plot isn't developed within the agreed period, and always with written notice first. If it happens, you are offered an equivalent plot."],
  ["Can I get a refund?", "The refund terms and timelines are written in your subscription form, so you know them before you pay."],
  ["How do I know I'm paying AIBEN?", "Pay only into accounts in the name of AIBEN Properties Ltd, and verify any agent or receipt on our Verify page."],
];

export default function HowToBuyPage() {
  return (
    <div className="bg-sand-2 px-4 pt-40 lg:pt-52 pb-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow text-laterite">How to buy</p>
        <h1 className="display on-light mt-3 text-5xl sm:text-6xl">
          From first look <em>to your title.</em>
        </h1>

        <ol className="relative mt-14 space-y-6 border-l border-laterite/30 pl-8">
          {journey.map(([t, d], i) => (
            <li key={t} className="relative">
              <span className="tabular absolute -left-[46px] grid size-7 place-items-center rounded-full bg-laterite text-xs font-semibold text-on-brand">{i + 1}</span>
              <p className="font-display text-2xl">{t}</p>
              <p className="mt-1 text-muted">{d}</p>
            </li>
          ))}
        </ol>

        <section id="documents" className="mt-24 scroll-mt-28">
          <h2 className="display on-light text-4xl">
            Documents, <em>in plain English.</em>
          </h2>
          <dl className="mt-8 divide-y divide-black/10 border-y border-black/10">
            {docs.map(([t, d]) => (
              <div key={t} className="grid gap-2 py-5 sm:grid-cols-[1fr_2fr]">
                <dt className="font-semibold">{t}</dt>
                <dd className="text-muted">{d}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="costs" className="mt-24 scroll-mt-28">
          <h2 className="display on-light text-4xl">
            Every fee, <em>before you pay.</em>
          </h2>
          <p className="mt-3 text-muted">
            The full list per estate. Figures are placeholders until AIBEN confirms them. <Sample />
          </p>
          <table className="mt-8 w-full overflow-hidden rounded-2xl bg-white text-left text-sm ring-1 ring-black/5">
            <tbody className="tabular">
              {fees.map(([t, v]) => (
                <tr key={t} className="border-b border-black/5 last:border-0">
                  <th scope="row" className="px-5 py-4 font-medium">{t}</th>
                  <td className="px-5 py-4 text-right text-muted">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="protection" className="mt-24 scroll-mt-28">
          <h2 className="display on-light text-4xl">
            Buyer <em>protection.</em>
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            AIBEN&apos;s re-allocation and payment compliance policies, rewritten as answers. The full legal text follows each answer on the live
            site.
          </p>
          <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
            {protection.map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl">
                  {q}
                  <span className="text-laterite transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-muted">{a}</p>
                <p className="mt-2 text-xs text-muted">Wording to be confirmed against AIBEN&apos;s published policy.</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-16 flex flex-wrap gap-3">
          <WhatsAppButton context="the buying process" label="Ask an adviser" />
          <Link href="/verify" className="border border-black/20 px-5 py-3 text-sm font-semibold hover:bg-black/5">
            Verify an agent
          </Link>
        </div>
      </div>
    </div>
  );
}
