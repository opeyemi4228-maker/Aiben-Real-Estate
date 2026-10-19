"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { estates, fromPrice } from "@/lib/estates";
import { planFor } from "@/lib/money";
import Price, { CurrencyToggle } from "./Price";
import Scene from "./Scene";
import WhatsAppButton from "./WhatsAppButton";

const questions = [
  {
    key: "purpose",
    q: "What is the ground for?",
    options: [
      ["home", "A home to live in", "Houses and duplexes"],
      ["land", "Land to hold or build on", "Plots with title"],
      ["commercial", "Income from commercial space", "Shops and offices"],
    ],
  },
  {
    key: "budget",
    q: "What can you put in, in total?",
    options: [
      ["30000000", "Up to ₦30 million", "About $19k"],
      ["75000000", "Up to ₦75 million", "About $48k"],
      ["200000000", "Up to ₦200 million", "About $130k"],
      ["1000000000", "More than ₦200 million", "Premium homes and towers"],
    ],
  },
  {
    key: "when",
    q: "When do you want to own it outright?",
    options: [
      ["0", "Now: I'll pay at once", "Best price"],
      ["12", "Within a year", "12-month plan"],
      ["24", "Over two years", "Smallest monthly amount"],
    ],
  },
];

const typeFor = { home: "homes", land: "land", commercial: "commercial" };

function shortlist({ purpose, budget, when }) {
  const months = Number(when);
  const max = Number(budget);
  const out = [];
  for (const e of estates) {
    if (e.status !== "selling" || e.type !== typeFor[purpose]) continue;
    const plan = Math.min(months, e.planMonths);
    // Best unit that fits the budget once the plan premium is included.
    const fits = e.units
      .map((u, i) => ({ u, i, p: u.price && planFor(u.price, plan) }))
      .filter((x) => x.p)
      .filter((x) => x.p.total <= max)
      .sort((a, b) => b.u.price - a.u.price);
    if (fits.length) out.push({ e, ...fits[0], plan });
  }
  return out.slice(0, 3);
}

export default function GroundFinder({ initialPurpose }) {
  const valid = questions[0].options.some(([v]) => v === initialPurpose);
  const [a, setA] = useState(valid ? { purpose: initialPurpose } : {});
  const [step, setStep] = useState(valid ? 1 : 0);
  const done = step >= questions.length;
  const results = done ? shortlist(a) : [];

  const pick = (k, v) => {
    setA((s) => ({ ...s, [k]: v }));
    setStep((s) => s + 1);
  };

  if (done) {
    const cheapest = estates.filter((e) => e.type === typeFor[a.purpose] && e.status === "selling").map(fromPrice).filter(Boolean);
    return (
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="eyebrow text-gold">Your shortlist</p>
          <div className="flex items-center gap-3">
            <CurrencyToggle />
            <button onClick={() => (setA({}), setStep(0))} className="inline-flex items-center gap-1.5 text-sm text-sand/70 hover:text-sand">
              <RotateCcw className="size-4" /> Start again
            </button>
          </div>
        </div>
        {results.length ? (
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {results.map(({ e, u, i, p, plan }) => (
              <div key={e.slug} className="overflow-hidden rounded-2xl bg-soil-2">
                <Scene src={e.images[0]} kind={e.kind} time="dusk" seed={e.seed} label={false} className="aspect-[16/9] h-auto w-full" title={e.name} />
                <div className="p-5">
                  <p className="text-xs text-sand/60">{e.area}</p>
                  <p className="font-display text-2xl">{e.name}</p>
                  <p className="mt-1 text-sm text-sand/75">
                    {u.name} · {u.size} sqm
                  </p>
                  <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-sand/10 pt-4">
                    {plan ? (
                      <>
                        <div>
                          <dt className="text-xs text-sand/60">Deposit</dt>
                          <dd className="font-display text-xl">
                            <Price naira={p.deposit} compact sample={!!e.priceSample} />
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs text-sand/60">Then monthly × {p.months}</dt>
                          <dd className="font-display text-xl text-gold">
                            <Price naira={p.monthly} compact sample={!!e.priceSample} />
                          </dd>
                        </div>
                      </>
                    ) : (
                      <div className="col-span-2">
                        <dt className="text-xs text-sand/60">Pay once</dt>
                        <dd className="font-display text-xl text-gold">
                          <Price naira={p.total} compact sample={!!e.priceSample} />
                        </dd>
                      </div>
                    )}
                  </dl>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link href={`/reserve?estate=${e.slug}&unit=${i}&months=${plan}`} className="caps bg-laterite px-4 py-2.5 text-[14px] font-semibold text-on-brand hover:bg-laterite-2">
                      Reserve
                    </Link>
                    <Link href={`/estates/${e.slug}`} className="border border-sand/25 px-4 py-2.5 text-sm hover:bg-sand/10">
                      See estate
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl bg-soil-2 p-8">
            <p className="font-display text-2xl">Nothing fits that exact budget today.</p>
            <p className="mt-2 text-sand/70">
              {cheapest.length ? (
                <>
                  The closest starts at <Price naira={Math.min(...cheapest)} compact className="text-gold" />. A longer plan or a smaller plot may
                  work: an adviser can find it in minutes.
                </>
              ) : (
                "An adviser can tell you what's coming next."
              )}
            </p>
          </div>
        )}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <WhatsAppButton context={`a shortlist from Ground Finder (${a.purpose}, budget up to ₦${Number(a.budget).toLocaleString()}, ${a.when === "0" ? "outright" : `${a.when}-month plan`})`} label="Send this shortlist to an adviser" />
          <Link href="/book-inspection" className="border border-sand/25 px-5 py-3 text-sm font-semibold hover:bg-sand/10">
            Book an inspection
          </Link>
        </div>
      </div>
    );
  }

  const q = questions[step];
  return (
    <div>
      <div className="flex items-center gap-2" aria-hidden="true">
        {questions.map((_, i) => (
          <span key={i} className={clsx("h-1 flex-1 rounded-full transition", i <= step ? "bg-gold" : "bg-sand/15")} />
        ))}
      </div>
      <p className="mt-6 text-sm text-sand/60">
        Question {step + 1} of {questions.length}
      </p>
      <h2 key={q.key} className="display rise mt-2 text-4xl sm:text-5xl">
        {q.q}
      </h2>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {q.options.map(([v, label, hint]) => (
          <button
            key={v}
            onClick={() => pick(q.key, v)}
            className={clsx("group flex items-center justify-between rounded-2xl border p-5 text-left transition", a[q.key] === v ? "border-gold bg-gold/10" : "border-sand/15 hover:border-gold/60 hover:bg-sand/5")}
          >
            <span>
              <span className="block font-display text-xl">{label}</span>
              <span className="text-sm text-sand/60">{hint}</span>
            </span>
            <ArrowRight className="size-5 text-gold opacity-0 transition group-hover:opacity-100" />
          </button>
        ))}
      </div>
      {step > 0 && (
        <button onClick={() => setStep((s) => s - 1)} className="mt-6 inline-flex items-center gap-1.5 text-sm text-sand/70 hover:text-sand">
          <ArrowLeft className="size-4" /> Back
        </button>
      )}
    </div>
  );
}
