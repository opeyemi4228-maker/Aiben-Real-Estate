"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { Bus, CircleCheck, MapPin, PlayCircle, Video } from "lucide-react";
import { estates } from "@/lib/estates";
import { zones } from "./WorldClocks";

const modes = [
  ["site", MapPin, "On site", "Inspection Saturday, free pickup in Abuja"],
  ["video", Video, "Live video", "An adviser walks the site with you"],
  ["recorded", PlayCircle, "Pre-recorded", "Watch a guided tour any time"],
];
const pickups = ["Wuse 2", "Maitama", "Gwarinpa", "Meet us at the estate gate"];

function nextSaturdays(n) {
  const out = [];
  const d = new Date();
  d.setHours(10, 0, 0, 0);
  d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7 || 7));
  for (let i = 0; i < n; i++) {
    out.push(new Date(d));
    d.setDate(d.getDate() + 7);
  }
  return out;
}

// Abuja-time slots shown in the buyer's chosen time zone.
function slotsIn(tz) {
  return ["09:00", "11:00", "14:00", "16:00", "18:00"].map((t) => {
    const [h, m] = t.split(":").map(Number);
    const utc = new Date(Date.UTC(2026, 0, 5, h - 1, m)); // Abuja is UTC+1
    return { abuja: t, local: utc.toLocaleTimeString("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit" }) };
  });
}

export default function BookingFlow({ estate: initialEstate = "", mode: initialMode = "site" }) {
  const [mode, setMode] = useState(modes.some(([m]) => m === initialMode) ? initialMode : "site");
  const [estate, setEstate] = useState(initialEstate || "hutu-green-city");
  const [tz, setTz] = useState("Europe/London");
  const [when, setWhen] = useState(null);
  const [pickup, setPickup] = useState(pickups[0]);
  const [done, setDone] = useState(false);
  const saturdays = useMemo(() => nextSaturdays(4), []);
  const slots = useMemo(() => slotsIn(tz), [tz]);
  const e = estates.find((x) => x.slug === estate);

  if (done)
    return (
      <div className="rounded-2xl bg-white p-8 ring-1 ring-black/5" role="status">
        <CircleCheck className="size-10 text-savanna" />
        <p className="mt-4 font-display text-3xl">You&apos;re booked.</p>
        <p className="mt-2 text-muted">
          {e?.name} · {mode === "site" ? `Saturday, ${when}, pickup at ${pickup}` : mode === "video" ? `${when}` : "Your tour link is on its way"}.
        </p>
        <p className="mt-4 text-sm text-muted">
          On the live site you&apos;d now get a WhatsApp and email confirmation with your adviser&apos;s name and photo, plus a reminder the day before.
          Concept demo: nothing was sent.
        </p>
      </div>
    );

  const box = "rounded-2xl bg-white p-6 ring-1 ring-black/5 [&>legend+*]:clear-both";
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        setDone(true);
      }}
      className="space-y-5"
    >
      <fieldset className={box}>
        <legend className="eyebrow float-left mb-4 w-full text-laterite">1 · How would you like to inspect?</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {modes.map(([m, Icon, t, d]) => (
            <button
              type="button"
              key={m}
              onClick={() => (setMode(m), setWhen(null))}
              aria-pressed={mode === m}
              className={clsx("rounded-xl border p-4 text-left transition", mode === m ? "border-laterite bg-laterite/5" : "border-black/10 hover:border-black/30")}
            >
              <Icon className="size-6 text-laterite" />
              <p className="mt-3 font-semibold">{t}</p>
              <p className="text-xs text-muted">{d}</p>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className={box}>
        <legend className="eyebrow float-left mb-4 w-full text-laterite">2 · Which estate?</legend>
        <select value={estate} onChange={(ev) => setEstate(ev.target.value)} className="w-full rounded-lg bg-sand-2 px-3 py-3 ring-1 ring-black/10">
          {estates
            .filter((x) => x.status === "selling")
            .map((x) => (
              <option key={x.slug} value={x.slug}>
                {x.name} · {x.area}
              </option>
            ))}
        </select>
      </fieldset>

      {mode !== "recorded" && (
        <fieldset className={box}>
          <legend className="eyebrow float-left mb-4 w-full text-laterite">3 · When?</legend>
          {mode === "site" ? (
            <>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {saturdays.map((d) => {
                  const label = d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
                  return (
                    <button type="button" key={label} onClick={() => setWhen(label)} aria-pressed={when === label} className={clsx("rounded-lg border px-3 py-3 text-sm", when === label ? "border-laterite bg-laterite text-on-brand" : "border-black/10")}>
                      Sat {label}
                      <span className="block text-xs opacity-70">10:00 departure</span>
                    </button>
                  );
                })}
              </div>
              <label className="mt-5 block text-sm font-medium">
                <Bus className="mr-1 inline size-4 text-laterite" /> Free pickup point
                <select value={pickup} onChange={(ev) => setPickup(ev.target.value)} className="mt-1.5 w-full rounded-lg bg-sand-2 px-3 py-3 font-normal ring-1 ring-black/10">
                  {pickups.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
                <span className="mt-1 block text-xs font-normal text-muted">Pickup points are illustrative.</span>
              </label>
            </>
          ) : (
            <>
              <label className="block text-sm font-medium">
                Your time zone
                <select value={tz} onChange={(ev) => (setTz(ev.target.value), setWhen(null))} className="mt-1.5 w-full rounded-lg bg-sand-2 px-3 py-3 font-normal ring-1 ring-black/10">
                  {zones.map(([c, z]) => (
                    <option key={z} value={z}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
                {slots.map((s) => {
                  const label = `${s.local} your time (${s.abuja} Abuja)`;
                  return (
                    <button type="button" key={s.abuja} onClick={() => setWhen(label)} aria-pressed={when === label} className={clsx("rounded-lg border px-3 py-3 text-sm", when === label ? "border-laterite bg-laterite text-on-brand" : "border-black/10")}>
                      <span className="tabular font-semibold">{s.local}</span>
                      <span className="block text-xs opacity-70">{s.abuja} in Abuja</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </fieldset>
      )}

      <fieldset className={box}>
        <legend className="eyebrow float-left mb-4 w-full text-laterite">{mode === "recorded" ? "3" : "4"} · Your details</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <input required placeholder="Full name" className="rounded-lg bg-sand-2 px-3 py-3 ring-1 ring-black/10" aria-label="Full name" />
          <input required placeholder="WhatsApp number" className="rounded-lg bg-sand-2 px-3 py-3 ring-1 ring-black/10" aria-label="WhatsApp number" />
          <select className="rounded-lg bg-sand-2 px-3 py-3 ring-1 ring-black/10 sm:col-span-2" aria-label="Where are you from?" defaultValue="Nigeria">
            {["Nigeria", "United Kingdom", "United States", "Canada", "United Arab Emirates", "Ireland", "Ghana", "Germany", "South Africa", "Other"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <p className="mt-3 text-xs text-muted">Concept demo: nothing you type here is stored or sent.</p>
      </fieldset>

      <button disabled={mode !== "recorded" && !when} className="caps w-full bg-laterite py-4 font-semibold text-on-brand transition hover:bg-laterite-2 disabled:opacity-40">
        Confirm booking
      </button>
    </form>
  );
}
