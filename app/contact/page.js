import { Mail, MapPin, Phone } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { company } from "@/lib/site";

export const metadata = { title: "Contact" };

const routes = [
  ["Sales", "Buying land, homes or commercial space", "sales enquiry"],
  ["Diaspora Desk", "Buying from outside Nigeria", "buying from abroad"],
  ["Existing clients", "Payments, documents, allocation", "my existing AIBEN account"],
  ["Partnerships & realtors", "Commission, marketing materials", "becoming an AIBEN realtor or partner"],
  ["Media", "Press and interviews", "a media enquiry"],
];

export default function ContactPage() {
  return (
    <div className="bg-sand-2 px-4 pt-40 lg:pt-52 pb-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow text-laterite">Contact</p>
        <h1 className="display on-light mt-3 text-5xl sm:text-6xl">
          A team <em>that answers.</em>
        </h1>

        <section id="concierge" className="mt-12 scroll-mt-28 rounded-2xl bg-soil p-8 text-sand">
          <p className="eyebrow text-gold">Your AIBEN concierge</p>
          <p className="mt-3 max-w-2xl font-display text-3xl">One named adviser, from your first question to your keys.</p>
          <p className="mt-2 max-w-xl text-sand/70">Tell us what you&apos;re looking for and we&apos;ll introduce you to your concierge within the hour, 8am to 8pm Abuja time.</p>
          <WhatsAppButton context="being introduced to my AIBEN concierge" label="Meet my concierge" className="mt-6" />
        </section>

        <section className="mt-12">
          <h2 className="font-display text-3xl">Who do you need?</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {routes.map(([t, d, ctx]) => (
              <li key={t} className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-black/5">
                <p className="font-display text-2xl">{t}</p>
                <p className="mt-1 flex-1 text-sm text-muted">{d}</p>
                <WhatsAppButton context={ctx} label="WhatsApp" variant="ghost" className="mt-5 self-start py-2" />
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
            <p className="eyebrow text-laterite">Call or write</p>
            <ul className="mt-4 space-y-3">
              {company.phones.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-laterite">
                    <Phone className="size-4 text-laterite" /> {p}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${company.email}`} className="flex items-center gap-3 hover:text-laterite">
                  <Mail className="size-4 text-laterite" /> {company.email}
                </a>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-soil p-8 text-sand">
            <p className="eyebrow">Head office</p>
            <p className="mt-4 font-display text-3xl leading-snug">{company.address}</p>
            <p className="caps mt-4 text-[13px] font-semibold text-sand/70">{company.hours}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`}
              target="_blank"
              rel="noreferrer"
              className="caps mt-8 inline-flex items-center gap-2 bg-white px-6 py-3.5 text-[13px] font-semibold text-ink hover:bg-sand"
            >
              <MapPin className="size-4" /> Open in Maps
            </a>
            <p className="mt-8 border-t border-white/15 pt-5 text-sm text-sand/60">
              {company.offices} offices across Lagos and Abuja. Ask your adviser for the office nearest you.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
