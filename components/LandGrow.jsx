"use client";

import { useState } from "react";
import Scene from "./Scene";

// "Watch your land grow": dated progress updates on a time-lapse slider.
export default function LandGrow({ estate, kind = "estate", seed = 7 }) {
  const steps = estate.progress;
  const [i, setI] = useState(steps.length - 1);
  if (!steps.length) return null;
  const s = steps[i];
  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl">
        <Scene kind={kind} time="day" seed={seed} progress={s.value} className="aspect-[16/9] h-auto w-full" title={`${estate.name}, ${s.date}: ${s.stage}`} />
        <div className="absolute top-4 left-4 rounded-lg bg-soil/80 px-3 py-2 text-sand backdrop-blur">
          <p className="eyebrow text-gold">Photographed {s.date}</p>
          <p className="mt-0.5 text-sm">{s.stage}</p>
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={steps.length - 1}
        value={i}
        onChange={(e) => setI(Number(e.target.value))}
        className="mt-5 w-full"
        aria-label="Progress update"
        aria-valuetext={`${s.date}: ${s.stage}`}
      />
      <div className="mt-1 flex justify-between text-[13px] opacity-60">
        {steps.map((x) => (
          <span key={x.date}>{x.date}</span>
        ))}
      </div>
      <p className="mt-3 text-xs opacity-60">Placeholder sequence. Live updates come from AIBEN&apos;s monthly drone and photo shoots, dated per estate.</p>
    </div>
  );
}
