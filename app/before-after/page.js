import Link from "next/link";
import { Check, X } from "lucide-react";

export const metadata = { title: "Before & after" };

// Pitch page: AIBEN's current site against this concept, gently framed as
// opportunities, not criticism.
const rows = [
  ["First impression", "Generic page-builder template", "Cinematic opening over HUTU Prestige, day-to-night hero"],
  ["Story", "A list of links", "A homepage told in five chapters"],
  ["Prices", "Most listings say “Call for price”", "Starting prices on every card, full price lists, a payment calculator"],
  ["Payment plans", "Not shown", "Deposit, monthly and total for every unit and plan"],
  ["Trust", "Counters can read 0; unnamed partner logos", "Server-rendered numbers, verify-an-agent, QR document check"],
  ["Inventory", "25 listings with duplicates; land and homes mixed", "One record per estate, filtered by type, budget and lifestyle"],
  ["Map", "Google Maps fails to load on the listings page", "A working, brand-styled map of every estate"],
  ["Diaspora buyers", "Country list misses Nigeria, UAE, Ireland and Ghana", "Diaspora Desk: clocks, video inspections in your time zone, your currency"],
  ["Action", "Long enquiry form, same text for land and homes", "One-tap WhatsApp pre-filled per estate, inspection booking, online reservation"],
  ["Existing clients", "No self-service", "My AIBEN: balance, receipts, documents, ownership journey"],
  ["Mobile and slow networks", "Heavy page builder", "Fast build with animation pause and data-saver mode"],
];

const demo = [
  ["/", "The opening and the homepage chapters"],
  ["/hutu-prestige", "HUTU Prestige microsite and the live master plan"],
  ["/estates/victory-park", "Victory Park: price table, calculator, site plan"],
  ["/estates", "Every estate on a working map"],
  ["/ground-finder", "Ground Finder"],
  ["/verify", "Verify an agent or a document"],
  ["/diaspora", "Diaspora Desk"],
  ["/book-inspection", "Inspection booking (mock-up)"],
  ["/reserve?estate=victory-park", "Reservation and payment (mock-up)"],
  ["/my-aiben", "Client portal (mock-up)"],
];

export default function BeforeAfter() {
  return (
    <div className="bg-sand-2 px-4 pt-40 lg:pt-52 pb-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow text-laterite">For the AIBEN team</p>
        <h1 className="display on-light mt-3 text-5xl sm:text-6xl">
          What AIBEN is, <em>and what the website shows.</em>
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          AIBEN has fifteen years, four offices, 204 people and Nigeria&apos;s largest private residential development. Here is the gap, and how the
          concept closes it.
        </p>

        <div className="mt-12 overflow-x-auto rounded-2xl bg-white ring-1 ring-black/5">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-sand text-xs text-muted uppercase">
              <tr>
                <th scope="col" className="px-5 py-3"><span className="sr-only">Area</span></th>
                <th scope="col" className="px-5 py-3 font-semibold">aibenproperties.com today</th>
                <th scope="col" className="px-5 py-3 font-semibold text-laterite">This concept</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([a, b, c]) => (
                <tr key={a} className="border-t border-black/5 align-top">
                  <th scope="row" className="px-5 py-4 font-display text-lg font-normal">{a}</th>
                  <td className="px-5 py-4 text-muted">
                    <X className="mr-2 inline size-4 text-laterite" />
                    {b}
                  </td>
                  <td className="px-5 py-4">
                    <Check className="mr-2 inline size-4 text-savanna" />
                    {c}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted">Observations from aibenproperties.com, reviewed October 2026. Re-check each one on a phone before the meeting.</p>

        <section className="mt-16">
          <h2 className="font-display text-3xl">Demo route</h2>
          <ol className="mt-6 grid gap-2 sm:grid-cols-2">
            {demo.map(([href, label], i) => (
              <li key={href}>
                <Link href={href} className="flex items-center gap-4 rounded-xl bg-white p-4 ring-1 ring-black/5 hover:ring-laterite">
                  <span className="tabular text-sm text-laterite">{String(i + 1).padStart(2, "0")}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
