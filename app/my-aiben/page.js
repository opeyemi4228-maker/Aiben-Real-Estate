import Link from "next/link";
import { Bell, CalendarClock, Check, Download, FileText, Gift, Receipt } from "lucide-react";
import Price from "@/components/Price";
import LandGrow from "@/components/LandGrow";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getEstate } from "@/lib/estates";
import { planFor } from "@/lib/money";

export const metadata = { title: "My AIBEN" };

const journey = [
  ["Reserved", "12 Feb 2026", "done"],
  ["Deposit paid", "14 Feb 2026", "done"],
  ["Instalments", "9 of 12 paid", "current"],
  ["Allocation", "Expected Jan 2027", "todo"],
  ["Survey", "", "todo"],
  ["Documents", "", "todo"],
  ["Handover", "", "todo"],
];

export default function MyAibenPage() {
  const estate = getEstate("hutu-green-city");
  const unit = estate.units[1];
  const plan = planFor(unit.price, 12);
  const paid = plan.deposit + plan.monthly * 9;
  const pct = Math.round((paid / plan.total) * 100);

  return (
    <div className="bg-sand-2 px-4 pt-36 lg:pt-48 pb-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-xl bg-gold/20 px-4 py-2 text-center text-xs">Mock-up of the client portal with a demo client. Nothing here is real account data.</div>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-laterite">My AIBEN</p>
            <h1 className="display on-light mt-2 text-4xl sm:text-5xl">
              Good evening, <em>Demo Client.</em>
            </h1>
          </div>
          <button className="relative rounded-full bg-white p-3 ring-1 ring-black/10" aria-label="Notifications">
            <Bell className="size-5" />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-aiben-red" />
          </button>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <section className="rounded-2xl bg-soil p-6 text-sand lg:col-span-2">
            <p className="text-sm text-sand/60">
              {estate.name} · Block C, Plot 14 · {unit.size} sqm
            </p>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs text-sand/60">Paid so far</p>
                <p className="font-display text-5xl text-gold">
                  <Price naira={paid} compact />
                </p>
                <p className="mt-1 text-sm text-sand/70">
                  of <Price naira={plan.total} compact sample={false} /> · {pct}%
                </p>
              </div>
              <div className="rounded-xl bg-soil-2 p-4">
                <p className="flex items-center gap-2 text-xs text-sand/60">
                  <CalendarClock className="size-4" /> Next instalment · 1 Nov 2026
                </p>
                <p className="mt-1 font-display text-2xl">
                  <Price naira={plan.monthly} compact sample={false} />
                </p>
                <button className="caps mt-3 w-full bg-laterite px-4 py-2 text-[14px] font-semibold text-on-brand">Pay now</button>
              </div>
            </div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-sand/10">
              <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
            <p className="eyebrow text-laterite">Your adviser</p>
            <p className="mt-3 font-display text-2xl">Demo Adviser One</p>
            <p className="text-sm text-muted">Sales Adviser · replies 8am to 8pm, Abuja time</p>
            <WhatsAppButton context="my HUTU Green City account (Block C, Plot 14)" label="Message my adviser" className="mt-5 w-full" />
            <Link href="/verify" className="mt-3 block text-center text-xs text-muted underline">
              Verify your adviser
            </Link>
          </section>
        </div>

        <section id="journey" className="mt-5 scroll-mt-28 rounded-2xl bg-white p-6 ring-1 ring-black/5">
          <p className="eyebrow text-laterite">Ownership journey</p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-7">
            {journey.map(([t, d, s], i) => (
              <li key={t} className="relative">
                <span
                  className={`grid size-9 place-items-center rounded-full text-sm font-semibold ${s === "done" ? "bg-savanna text-sand" : s === "current" ? "bg-gold text-on-brand ring-4 ring-gold/30" : "bg-sand text-muted"}`}
                >
                  {s === "done" ? <Check className="size-4" /> : i + 1}
                </span>
                <p className="mt-3 font-semibold">{t}</p>
                <p className="text-xs text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <section className="rounded-2xl bg-soil p-6 text-sand">
            <p className="eyebrow text-gold">Your estate, this month</p>
            <div className="mt-4">
              <LandGrow estate={estate} kind="estate" seed={7} />
            </div>
          </section>
          <div className="space-y-5">
            <section className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
              <p className="eyebrow text-laterite">Receipts & documents</p>
              <ul className="mt-4 divide-y divide-black/5 text-sm">
                {[
                  [Receipt, "Receipt, instalment 9", "1 Oct 2026"],
                  [Receipt, "Receipt, instalment 8", "1 Sep 2026"],
                  [FileText, "Subscription form", "12 Feb 2026"],
                  [FileText, "Payment schedule", "12 Feb 2026"],
                  [FileText, "Allocation letter", "Available after final payment"],
                ].map(([Icon, t, d]) => (
                  <li key={t} className="flex items-center gap-3 py-3">
                    <Icon className="size-5 text-laterite" />
                    <span className="flex-1">
                      {t}
                      <span className="block text-xs text-muted">{d}</span>
                    </span>
                    {!d.startsWith("Available") && <Download className="size-4 text-muted" />}
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-2xl bg-soil p-6 text-sand">
              <Gift className="size-6" />
              <p className="mt-3 font-display text-2xl">Refer & earn</p>
              <p className="mt-1 text-sm text-sand/80">Share your link. When a friend buys, you earn a reward. Track it here.</p>
              <p className="mt-4 rounded-lg bg-black/20 px-3 py-2 font-mono text-xs">aibenproperties.com/r/DEMO-C14</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
