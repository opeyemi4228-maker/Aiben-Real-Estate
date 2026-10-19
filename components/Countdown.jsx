"use client";

import useNow from "@/lib/useNow";
import { Sample } from "./ui";

// Price-phase countdown. Only ever shown with a real end date from AIBEN;
// the date here is SAMPLE.
export default function Countdown({ ends, plotsLeft }) {
  const now = useNow(60000);
  const ms = Math.max(0, new Date(ends).getTime() - (now ?? new Date(ends).getTime()));
  const d = Math.floor(ms / 864e5);
  const h = Math.floor((ms % 864e5) / 36e5);
  return (
    <div className="inline-flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-signal/50 bg-signal/10 px-5 py-4">
      <div>
        <p className="eyebrow text-signal">Current price ends in</p>
        <p className="tabular font-display text-3xl">{now ? `${d} days ${h} hrs` : "—"}</p>
      </div>
      <div className="h-10 w-px bg-signal/30" />
      <div>
        <p className="eyebrow text-signal">At this price</p>
        <p className="tabular font-display text-3xl">{plotsLeft} plots left</p>
      </div>
      <Sample />
    </div>
  );
}
