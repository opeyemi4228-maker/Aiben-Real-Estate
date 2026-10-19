"use client";

import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { CircleCheck, CreditCard, Landmark, Lock, QrCode } from "lucide-react";
import { getEstate, pricedUnits } from "@/lib/estates";
import { plans, planFor } from "@/lib/money";
import Price from "./Price";

// Mock-up of reservation and payment (Paystack / Flutterwave on the live site).
export default function ReserveFlow({ slug, unit: unitIndex = 0, plot, months: initialMonths }) {
  const found = getEstate(slug);
  const estate = found && pricedUnits(found).length ? found : getEstate("fifth-avenue-golf-estate");
  const units = pricedUnits(estate);
  const unit = units[unitIndex] || units[0];
  const allowed = plans.filter((p) => p.months <= estate.planMonths);
  const [months, setMonths] = useState(allowed.some((p) => p.months === initialMonths) ? initialMonths : allowed.at(-1).months);
  const [method, setMethod] = useState("card");
  const [step, setStep] = useState(1);
  const r = planFor(unit.price, months);
  const due = months ? r.deposit : r.total;

  if (step === 3)
    return (
      <div className="rounded-2xl bg-white p-8 text-center ring-1 ring-black/5" role="status">
        <CircleCheck className="mx-auto size-12 text-savanna" />
        <p className="mt-4 font-display text-4xl">Reserved.</p>
        <p className="mt-2 text-muted">
          {estate.name} · {unit.name}
          {plot && ` · Plot ${plot}`}
        </p>
        <div className="mx-auto mt-6 inline-flex items-center gap-4 rounded-xl bg-sand-2 p-4 text-left">
          <QrCode className="size-16" />
          <div className="text-sm">
            <p className="font-semibold">Receipt AIB-RCT-2026-1188</p>
            <p className="text-muted">Scan to verify it is genuine</p>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-md text-sm text-muted">
          Your plot is held. Your receipt, subscription form and payment schedule are in My AIBEN, and a copy is on WhatsApp. Concept demo: no
          payment was taken.
        </p>
        <Link href="/my-aiben" className="caps mt-6 inline-block bg-laterite px-6 py-3 font-semibold text-on-brand">
          Open My AIBEN
        </Link>
      </div>
    );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        {step === 1 && (
          <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
            <p className="eyebrow text-laterite">1 · Choose your plan</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {allowed.map((p) => {
                const x = planFor(unit.price, p.months);
                return (
                  <button key={p.months} type="button" onClick={() => setMonths(p.months)} aria-pressed={months === p.months} className={clsx("rounded-xl border p-4 text-left", months === p.months ? "border-laterite bg-laterite/5" : "border-black/10")}>
                    <p className="font-semibold">{p.label}</p>
                    <p className="text-sm text-muted">
                      {p.months ? (
                        <>
                          <Price naira={x.deposit} compact sample={false} /> today, then <Price naira={x.monthly} compact sample={false} />/mo
                        </>
                      ) : (
                        <>
                          <Price naira={x.total} compact sample={false} /> once
                        </>
                      )}
                    </p>
                  </button>
                );
              })}
            </div>
            <button onClick={() => setStep(2)} className="caps mt-6 w-full bg-laterite py-3.5 font-semibold text-on-brand hover:bg-laterite-2">
              Continue to payment
            </button>
          </div>
        )}
        {step === 2 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep(3);
            }}
            className="rounded-2xl bg-white p-6 ring-1 ring-black/5"
          >
            <p className="eyebrow text-laterite">2 · Pay your {months ? "deposit" : "balance"}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {[
                ["card", CreditCard, "Card", "Naira or international card"],
                ["transfer", Landmark, "Bank transfer", "To AIBEN Properties Ltd only"],
              ].map(([m, Icon, t, d]) => (
                <button key={m} type="button" onClick={() => setMethod(m)} aria-pressed={method === m} className={clsx("flex items-center gap-3 rounded-xl border p-4 text-left", method === m ? "border-laterite bg-laterite/5" : "border-black/10")}>
                  <Icon className="size-6 text-laterite" />
                  <span>
                    <span className="block font-semibold">{t}</span>
                    <span className="text-xs text-muted">{d}</span>
                  </span>
                </button>
              ))}
            </div>
            {method === "card" ? (
              <div className="mt-5 grid grid-cols-2 gap-3">
                <input aria-label="Card number" placeholder="Card number (demo, don't enter real details)" className="col-span-2 rounded-lg bg-sand-2 px-3 py-3 ring-1 ring-black/10" />
                <input aria-label="Expiry" placeholder="MM / YY" className="rounded-lg bg-sand-2 px-3 py-3 ring-1 ring-black/10" />
                <input aria-label="CVV" placeholder="CVV" className="rounded-lg bg-sand-2 px-3 py-3 ring-1 ring-black/10" />
              </div>
            ) : (
              <div className="mt-5 rounded-xl bg-sand-2 p-4 text-sm">
                <p className="font-semibold">AIBEN Properties Ltd</p>
                <p className="text-muted">Bank and account number appear here, in the company&apos;s name only. A unique reference ties the transfer to your plot.</p>
              </div>
            )}
            <p className="mt-4 flex items-center gap-2 text-xs text-muted">
              <Lock className="size-3.5" /> Secured by Paystack / Flutterwave on the live site. Concept demo: no payment is taken.
            </p>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="border border-black/15 px-5 py-3.5 text-sm">
                Back
              </button>
              <button className="caps flex-1 bg-laterite py-3.5 font-semibold text-on-brand hover:bg-laterite-2">
                Pay <Price naira={due} sample={false} />
              </button>
            </div>
          </form>
        )}
      </div>

      <aside className="h-fit rounded-2xl bg-soil p-6 text-sand">
        <p className="eyebrow text-gold">Your reservation</p>
        <p className="mt-3 font-display text-2xl">{estate.name}</p>
        <p className="text-sm text-sand/70">
          {unit.name} · {unit.size} sqm{plot && ` · Plot ${plot}`}
        </p>
        <dl className="mt-6 space-y-2 border-t border-sand/10 pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-sand/60">Price</dt>
            <dd><Price naira={unit.price} sample={false} /></dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sand/60">Plan</dt>
            <dd>{months ? `${months} months` : "Outright"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sand/60">Total</dt>
            <dd><Price naira={r.total} sample={false} /></dd>
          </div>
          <div className="flex justify-between border-t border-sand/10 pt-3 text-base">
            <dt>Due today</dt>
            <dd className="font-semibold text-gold"><Price naira={due} /></dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-sand/50">Your plot is held for 72 hours while payment clears.</p>
      </aside>
    </div>
  );
}
