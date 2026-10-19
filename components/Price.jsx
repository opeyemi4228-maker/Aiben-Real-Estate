"use client";

import clsx from "clsx";
import { currencies, money, ratesAsOf } from "@/lib/money";
import { useExperience } from "./Providers";
import { Sample } from "./ui";

export default function Price({ naira, compact = false, sample = true, className = "" }) {
  const { currency } = useExperience();
  return (
    <span className={clsx("tabular", className)}>
      {money(naira, currency, { compact })}
      {sample && <Sample />}
    </span>
  );
}

export function CurrencyToggle({ className = "" }) {
  const { currency, setCurrency } = useExperience();
  return (
    <div className={clsx("flex flex-wrap items-center gap-2", className)}>
      <div role="radiogroup" aria-label="Currency" className="inline-flex border border-current/20 p-0.5 text-xs">
        {currencies.map((c) => (
          <button
            key={c.code}
            role="radio"
            aria-checked={currency === c.code}
            onClick={() => setCurrency(c.code)}
            className={clsx("px-2.5 py-1 font-semibold transition", currency === c.code ? "bg-laterite text-on-brand" : "opacity-70 hover:opacity-100")}
          >
            {c.code}
          </button>
        ))}
      </div>
      {currency !== "NGN" && <span className="text-[13px] opacity-60">Indicative, rates as of {ratesAsOf}. You pay in naira.</span>}
    </div>
  );
}
