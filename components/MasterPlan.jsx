"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { MapPin, X } from "lucide-react";
import { plotsFor, statusMeta } from "@/lib/plots";
import Price from "./Price";
import WhatsAppButton from "./WhatsAppButton";
import { Sample } from "./ui";

// Live master plan / interactive site plan: every plot with its status, size
// and price; click to reserve.
export default function MasterPlan({ estate, hotspots = [], dark = true }) {
  const plots = useMemo(() => plotsFor(estate), [estate]);
  const [show, setShow] = useState({ available: true, reserved: true, sold: true });
  const [sel, setSel] = useState(null);
  const [spot, setSpot] = useState(null);
  const plot = plots.find((p) => p.id === sel);
  const unit = plot && estate.units[plot.unitIndex];
  const counts = plots.reduce((m, p) => ((m[p.status] = (m[p.status] || 0) + 1), m), {});

  return (
    <div className={clsx("rounded-2xl p-4 sm:p-6", dark ? "bg-soil-2 text-sand" : "bg-white ring-1 ring-black/5")}>
      <div className="flex flex-wrap items-center gap-2">
        {Object.entries(statusMeta).map(([k, m]) => (
          <button
            key={k}
            onClick={() => setShow((s) => ({ ...s, [k]: !s[k] }))}
            aria-pressed={show[k]}
            className={clsx("inline-flex items-center gap-2 border px-3 py-1.5 text-xs transition", show[k] ? "border-current/30" : "border-transparent opacity-40")}
          >
            <span className="size-3 rounded-sm" style={{ background: m.fill, outline: k === "sold" ? "1px solid rgb(239 231 218 / .3)" : "none" }} />
            {m.label}
            <span className="tabular opacity-70">{counts[k] || 0}</span>
          </button>
        ))}
        <span className="ml-auto text-xs opacity-60">
          Sample inventory <Sample />
        </span>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_300px]">
        <div className="overflow-x-auto rounded-xl bg-soil">
          <svg viewBox="0 0 1000 560" className="h-auto w-full min-w-[640px]" role="group" aria-label={`${estate.name} site plan`}>
            <rect width="1000" height="560" fill="#111111" />
            {/* Roads */}
            <path d="M0 240 H1000 M345 0 V560 M665 0 V560" stroke="#f4f4f2" strokeOpacity="0.09" strokeWidth="26" />
            <path d="M0 240 H1000 M345 0 V560 M665 0 V560" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="8 10" />
            {plots.map((p) => {
              const visible = show[p.status];
              const selected = sel === p.id;
              return (
                <rect
                  key={p.id}
                  x={p.x}
                  y={p.y}
                  width={p.w}
                  height={p.h}
                  rx="3"
                  fill={statusMeta[p.status].fill}
                  opacity={visible ? 1 : 0.12}
                  stroke={selected ? "#ed3237" : p.status === "sold" ? "#f4f4f222" : "none"}
                  strokeWidth={selected ? 5 : 1}
                  className={clsx("transition-opacity", visible && "cursor-pointer hover:opacity-80")}
                  tabIndex={visible ? 0 : -1}
                  role="button"
                  aria-label={`Plot ${p.id}, ${statusMeta[p.status].label}`}
                  onClick={() => visible && setSel(p.id)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && visible && (e.preventDefault(), setSel(p.id))}
                />
              );
            })}
            {["A", "B", "C", "D", "E", "F"].map((b, i) => (
              <text key={b} x={40 + (i % 3) * 320} y={32 + Math.floor(i / 3) * 250} fill="#f4f4f2" opacity="0.5" fontSize="12" letterSpacing="2">
                BLOCK {b}
              </text>
            ))}
            {hotspots.map((h, i) => (
              <g key={h.label} transform={`translate(${h.x} ${h.y})`} className="cursor-pointer" onClick={() => setSpot(spot === i ? null : i)} role="button" tabIndex={0} aria-label={h.label}>
                <circle r="13" fill="#ed3237" stroke="#ffffff" strokeWidth="2" />
                <text textAnchor="middle" dy="4" fontSize="12" fill="#f4f4f2" fontWeight="700">
                  {i + 1}
                </text>
                {spot === i && (
                  <g>
                    <rect x="18" y="-14" width={h.label.length * 7.4 + 16} height="28" rx="6" fill="#f4f4f2" />
                    <text x="26" y="5" fontSize="13" fill="#0a0a0a">
                      {h.label}
                    </text>
                  </g>
                )}
              </g>
            ))}
          </svg>
        </div>

        <aside aria-live="polite" className={clsx("rounded-xl p-5", dark ? "bg-soil" : "bg-sand-2")}>
          {plot && unit ? (
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="eyebrow text-gold">Block {plot.block}</p>
                  <p className="font-display text-3xl">Plot {plot.id}</p>
                </div>
                <button onClick={() => setSel(null)} aria-label="Clear selection" className="rounded-full p-1 opacity-60 hover:opacity-100">
                  <X className="size-4" />
                </button>
              </div>
              <span className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 text-xs font-semibold" style={{ background: statusMeta[plot.status].fill, color: plot.status === "sold" ? "#ffffff" : "#0a0a0a" }}>
                {statusMeta[plot.status].label}
              </span>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="opacity-60">Type</dt>
                  <dd className="text-right">{unit.name}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="opacity-60">Size</dt>
                  <dd className="tabular">{unit.size.toLocaleString()} sqm</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="opacity-60">Price</dt>
                  <dd>
                    {unit.price ? <Price naira={unit.price} sample={!!estate.priceSample} className="font-semibold text-gold" /> : "Call for price"}
                  </dd>
                </div>
              </dl>
              {plot.status === "available" ? (
                <div className="mt-6 space-y-2">
                  <Link href={`/reserve?estate=${estate.slug}&plot=${plot.id}&unit=${plot.unitIndex}`} className="caps block bg-laterite py-3 text-center text-[14px] font-semibold text-on-brand hover:bg-laterite-2">
                    Reserve this plot
                  </Link>
                  <WhatsAppButton context={`${estate.name}, plot ${plot.id}`} label="Ask about this plot" className="w-full" />
                </div>
              ) : (
                <div className="mt-6">
                  <p className="text-sm opacity-70">This plot is {plot.status}. Join the waitlist and we&apos;ll tell you if it comes back.</p>
                  <WhatsAppButton context={`${estate.name}: plots similar to ${plot.id}`} label="Find me a similar plot" className="mt-3 w-full" />
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full flex-col justify-center text-sm opacity-80">
              <MapPin className="size-6 text-gold" />
              <p className="mt-3 font-display text-2xl">Pick a plot.</p>
              <p className="mt-2">
                <span className="tabular font-semibold text-gold">{counts.available || 0}</span> of {plots.length} plots are available right now.
              </p>
              {hotspots.length > 0 && <p className="mt-2 opacity-70">Tap the numbered markers to see amenities.</p>}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
