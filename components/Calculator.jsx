"use client";

import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { plans, planFor } from "@/lib/money";
import { pricedUnits } from "@/lib/estates";
import Price, { CurrencyToggle } from "./Price";
import WhatsAppButton from "./WhatsAppButton";

// Payment-plan calculator: pick a unit and a plan, see deposit, monthly, total.
export default function Calculator({ estate, compact = false, dark = false }) {
  const units = pricedUnits(estate);
  const sample = !!estate.priceSample;
  const [u, setU] = useState(0);
  const maxMonths = estate.planMonths || 0;
  const available = plans.filter((p) => p.months <= maxMonths);
  const [months, setMonths] = useState(available.at(-1)?.months ?? 0);
  const [deposit, setDeposit] = useState(30);
  if (!units.length) return null;

  const unit = units[u];
  const r = planFor(unit.price, months, deposit / 100);

  return (
    <div className={clsx("rounded-2xl p-5 sm:p-7", dark ? "bg-soil-2 text-sand" : "bg-white text-ink shadow-sm ring-1 ring-black/5")}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow text-laterite">Payment plan calculator</p>
        {!compact && <CurrencyToggle />}
      </div>

      <label className="mt-5 block text-sm font-medium">
        {estate.type === "land" ? "Plot" : "Unit"}
        <select
          value={u}
          onChange={(e) => setU(Number(e.target.value))}
          className={clsx("mt-1.5 w-full rounded-lg border px-3 py-2.5", dark ? "border-sand/20 bg-soil" : "border-black/15 bg-sand-2")}
        >
          {units.map((x, i) => (
            <option key={i} value={i}>
              {x.name} · {x.size.toLocaleString()} sqm
            </option>
          ))}
        </select>
      </label>

      <fieldset className="mt-5">
        <legend className="text-sm font-medium">Plan</legend>
        <div className="mt-1.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {available.map((p) => (
            <button
              key={p.months}
              type="button"
              onClick={() => setMonths(p.months)}
              aria-pressed={months === p.months}
              className={clsx(
                "rounded-lg border px-3 py-2 text-sm transition",
                months === p.months ? "border-laterite bg-laterite text-on-brand" : dark ? "border-sand/20 hover:border-sand/50" : "border-black/15 hover:border-black/40",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </fieldset>

      {months > 0 && (
        <label className="mt-5 block text-sm font-medium">
          Initial deposit: <span className="tabular">{deposit}%</span>
          <input type="range" min={20} max={70} step={5} value={deposit} onChange={(e) => setDeposit(Number(e.target.value))} className="mt-2 w-full" />
        </label>
      )}

      <dl className={clsx("mt-6 grid gap-4 border-t pt-5", months ? "grid-cols-3" : "grid-cols-1", dark ? "border-sand/15" : "border-black/10")}>
        {months > 0 && (
          <>
            <div>
              <dt className="text-xs opacity-60">Deposit today</dt>
              <dd className="mt-1 font-display text-xl sm:text-2xl">
                <Price naira={r.deposit} compact sample={sample} />
              </dd>
            </div>
            <div>
              <dt className="text-xs opacity-60">Monthly × {r.months}</dt>
              <dd className="mt-1 font-display text-xl text-laterite sm:text-2xl">
                <Price naira={r.monthly} compact sample={sample} />
              </dd>
            </div>
          </>
        )}
        <div>
          <dt className="text-xs opacity-60">{months ? "Total" : "Pay once"}</dt>
          <dd className="mt-1 font-display text-xl sm:text-2xl">
            <Price naira={r.total} compact sample={sample} />
          </dd>
        </div>
      </dl>
      <p className="mt-3 text-xs opacity-60">
        Includes the plan premium. Statutory and documentation fees are listed in the{" "}
        <Link href="/how-to-buy#costs" className="underline">
          full cost breakdown
        </Link>
        .
      </p>
      {!compact && (
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={`/reserve?estate=${estate.slug}&unit=${u}&months=${months}`} className="caps bg-laterite px-5 py-3 text-[14px] font-semibold text-on-brand hover:bg-laterite-2">
            Reserve with this plan
          </Link>
          <WhatsAppButton context={`${estate.name}: ${unit.name} on the ${months ? `${months}-month plan` : "outright"} option`} label="Send me this plan" />
        </div>
      )}
    </div>
  );
}
