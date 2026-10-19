"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

const budgets = [
  ["", "Any budget"],
  ["30000000", "Up to ₦30m"],
  ["75000000", "Up to ₦75m"],
  ["200000000", "Up to ₦200m"],
  ["1000000000", "₦200m and above"],
];

// Chaletô-style search directly under the hero.
export default function SearchBar() {
  const router = useRouter();
  const [q, setQ] = useState({ city: "", type: "", budget: "" });
  const set = (k) => (e) => setQ((s) => ({ ...s, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const p = new URLSearchParams(Object.entries(q).filter(([, v]) => v));
    router.push(`/estates${p.size ? `?${p}` : ""}`);
  };
  const field = "w-full rounded-lg bg-sand px-4 py-3.5 text-base ring-1 ring-black/15 outline-none focus:ring-2 focus:ring-ink";
  return (
    <section id="search" className="relative z-10 -mt-10 px-4 sm:px-6">
      <form onSubmit={submit} className="mx-auto grid max-w-7xl gap-4 rounded-2xl bg-white p-5 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.35)] ring-1 ring-black sm:grid-cols-2 sm:p-6 lg:grid-cols-[1fr_1fr_1fr_auto]">
        <label className="text-sm font-bold tracking-wide text-ink uppercase">
          Location
          <select value={q.city} onChange={set("city")} className={`${field} mt-2 font-normal tracking-normal normal-case text-ink`}>
            <option value="">Abuja & Lagos</option>
            <option value="abuja">Abuja</option>
            <option value="lagos">Lagos</option>
          </select>
        </label>
        <label className="text-sm font-bold tracking-wide text-ink uppercase">
          Type
          <select value={q.type} onChange={set("type")} className={`${field} mt-2 font-normal tracking-normal normal-case text-ink`}>
            <option value="">Land, homes or commercial</option>
            <option value="land">Land</option>
            <option value="homes">Homes</option>
            <option value="commercial">Commercial</option>
          </select>
        </label>
        <label className="text-sm font-bold tracking-wide text-ink uppercase">
          Budget
          <select value={q.budget} onChange={set("budget")} className={`${field} mt-2 font-normal tracking-normal normal-case text-ink`}>
            {budgets.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <button className="caps inline-flex items-center justify-center gap-2 self-end rounded-lg bg-laterite px-8 py-4 text-base font-semibold text-on-brand hover:bg-laterite-2 sm:col-span-2 lg:col-span-1">
          <Search className="size-4" /> Search
        </button>
      </form>
    </section>
  );
}
