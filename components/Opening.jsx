"use client";

import { useEffect, useState } from "react";
import Scene from "./Scene";
import Logo from "./Logo";
import Swoosh from "./Swoosh";

// "AIBEN presents" title sequence. Plays once per visit, about four seconds,
// skippable, and replayable from the footer ("Replay the opening").
export default function Opening() {
  const [state, setState] = useState("idle"); // idle | playing | leaving

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("aiben:opening") === "1";
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Browser-only state, read after hydration on purpose.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!seen && !reduced && document.documentElement.dataset.motion !== "paused") setState("playing");
    const replay = () => setState("playing");
    window.addEventListener("aiben:replay-opening", replay);
    return () => window.removeEventListener("aiben:replay-opening", replay);
  }, []);

  useEffect(() => {
    if (state === "playing") {
      try {
        sessionStorage.setItem("aiben:opening", "1");
      } catch {}
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => setState("leaving"), 4200);
      return () => clearTimeout(t);
    }
    if (state === "leaving") {
      document.body.style.overflow = "";
      const t = setTimeout(() => setState("idle"), 900);
      return () => clearTimeout(t);
    }
    document.body.style.overflow = "";
  }, [state]);

  if (state === "idle") return null;

  return (
    <div
      className={`fixed inset-0 z-[90] overflow-hidden bg-soil text-sand transition-opacity duration-900 ${state === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"}`}
      aria-label="Opening sequence"
    >
      <div className="absolute inset-0 opacity-50">
        <Scene kind="land" time="dusk" seed={5} className="drift h-full w-full" label={false} title="Drone view over the HUTU Prestige land at dusk" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-soil/70 via-soil/30 to-soil/80" />
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="rise" style={{ animationDelay: "200ms" }}>
          <Logo tone="reversed" className="h-14 sm:h-20" />
        </div>
        <p className="eyebrow rise mt-8 text-gold" style={{ animationDelay: "900ms" }}>
          AIBEN presents
        </p>
        <h1 className="display rise mt-4 text-5xl sm:text-7xl" style={{ animationDelay: "1700ms" }}>
          Own your <em>ground.</em>
        </h1>
        <Swoosh animate delay={2400} weight={2} className="mt-5 w-36 sm:w-48" />
      </div>
      <button
        onClick={() => setState("leaving")}
        className="absolute right-5 bottom-6 border border-sand/30 px-4 py-2 text-xs tracking-widest text-sand/80 uppercase hover:bg-sand/10"
      >
        Skip opening
      </button>
    </div>
  );
}
