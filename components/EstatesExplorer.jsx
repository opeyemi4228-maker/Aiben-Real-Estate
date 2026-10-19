"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import { Map as MapIcon, LayoutGrid } from "lucide-react";
import { estates, fromPrice, typeLabels } from "@/lib/estates";
import { experiences } from "@/lib/site";
import EstateCard from "./EstateCard";
import { CurrencyToggle } from "./Price";

const EstateMap = dynamic(() => import("./EstateMap"), { ssr: false, loading: () => <div className="h-full w-full animate-pulse bg-soil-2" /> });

export default function EstatesExplorer({ initial }) {
  const [f, setF] = useState({ city: "", type: "", budget: "", exp: "", ...initial });
  const [view, setView] = useState("split");
  const [active, setActive] = useState(null);
  const set = (k, v) => setF((s) => ({ ...s, [k]: s[k] === v ? "" : v }));

  const list = useMemo(
    () =>
      estates.filter((e) => {
        if (f.city && e.city !== f.city) return false;
        if (f.type && e.type !== f.type) return false;
        if (f.exp && !e.experiences.includes(f.exp)) return false;
        if (f.budget) {
          const p = fromPrice(e);
          if (!p || p > Number(f.budget)) return false;
        }
        return true;
      }),
    [f],
  );

  const chip = (on) => clsx("border px-3.5 py-1.5 text-sm transition", on ? "border-laterite bg-laterite text-on-brand" : "border-black/15 hover:border-black/40");

  return (
    <div>
      <div className="sticky top-20 lg:top-28 z-30 -mx-4 border-b border-black/5 bg-sand-2/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          {["abuja", "lagos"].map((c) => (
            <button key={c} onClick={() => set("city", c)} aria-pressed={f.city === c} className={clsx(chip(f.city === c), "capitalize")}>
              {c}
            </button>
          ))}
          <span className="mx-1 h-5 w-px bg-black/15" />
          {Object.entries(typeLabels).map(([k, l]) => (
            <button key={k} onClick={() => set("type", k)} aria-pressed={f.type === k} className={chip(f.type === k)}>
              {l}
            </button>
          ))}
          <span className="mx-1 h-5 w-px bg-black/15" />
          <select value={f.budget} onChange={(e) => setF((s) => ({ ...s, budget: e.target.value }))} className="border border-black/15 bg-transparent px-3 py-1.5 text-sm" aria-label="Budget">
            <option value="">Any budget</option>
            <option value="30000000">Up to ₦30m</option>
            <option value="75000000">Up to ₦75m</option>
            <option value="200000000">Up to ₦200m</option>
            <option value="1000000000">Up to ₦1bn</option>
          </select>
          <select value={f.exp} onChange={(e) => setF((s) => ({ ...s, exp: e.target.value }))} className="border border-black/15 bg-transparent px-3 py-1.5 text-sm" aria-label="Experience">
            <option value="">Any lifestyle</option>
            {experiences.map((x) => (
              <option key={x.key} value={x.key}>
                {x.label}
              </option>
            ))}
          </select>
          <div className="ml-auto flex items-center gap-3">
            <CurrencyToggle className="max-sm:hidden" />
            <div className="inline-flex border border-black/15 p-0.5">
              <button onClick={() => setView("split")} aria-pressed={view === "split"} className={clsx("rounded-full p-1.5", view === "split" && "bg-soil text-sand")} aria-label="Map and list">
                <MapIcon className="size-4" />
              </button>
              <button onClick={() => setView("grid")} aria-pressed={view === "grid"} className={clsx("rounded-full p-1.5", view === "grid" && "bg-soil text-sand")} aria-label="List only">
                <LayoutGrid className="size-4" />
              </button>
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted" aria-live="polite">
          {list.length} {list.length === 1 ? "estate" : "estates"}
          {(f.city || f.type || f.budget || f.exp) && (
            <button onClick={() => setF({ city: "", type: "", budget: "", exp: "" })} className="ml-3 text-laterite underline">
              Clear filters
            </button>
          )}
        </p>
      </div>

      <div className={clsx("mt-6 gap-6", view === "split" ? "grid lg:grid-cols-[1.25fr_1fr]" : "")}>
        <div className={clsx("grid gap-5 sm:grid-cols-2", view === "grid" && "lg:grid-cols-3")}>
          {list.map((e) => (
            <div key={e.slug} id={`card-${e.slug}`} onMouseEnter={() => setActive(e.slug)} className={clsx("rounded-2xl transition", active === e.slug && "ring-2 ring-gold ring-offset-2 ring-offset-sand-2")}>
              <EstateCard estate={e} />
            </div>
          ))}
          {!list.length && <p className="text-muted sm:col-span-2">No estates match. Try a wider budget, or ask Ground Finder.</p>}
        </div>
        {view === "split" && (
          <div className="order-first lg:order-none">
            <div className="overflow-hidden rounded-2xl lg:sticky lg:top-44">
              <EstateMap estates={list} active={active} onSelect={(slug) => {
                setActive(slug);
                document.getElementById(`card-${slug}`)?.scrollIntoView({ block: "center" });
              }} className="h-[320px] w-full lg:h-[calc(100vh-13rem)]" />
            </div>
            <p className="mt-2 text-xs text-muted">Pins show the area, not the exact site. Exact locations are shared at inspection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
