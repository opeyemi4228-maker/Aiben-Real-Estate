"use client";

import useNow from "@/lib/useNow";

export const zones = [
  ["Abuja", "Africa/Lagos"],
  ["London", "Europe/London"],
  ["New York", "America/New_York"],
  ["Toronto", "America/Toronto"],
  ["Dubai", "Asia/Dubai"],
];

export default function WorldClocks({ className = "" }) {
  const ms = useNow(15000);
  const now = ms === null ? null : new Date(ms);
  return (
    <ul className={`grid grid-cols-2 gap-3 sm:grid-cols-5 ${className}`}>
      {zones.map(([city, tz]) => {
        const time = now ? now.toLocaleTimeString("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit" }) : "--:--";
        const hour = now ? Number(now.toLocaleString("en-GB", { timeZone: tz, hour: "2-digit", hour12: false })) : 12;
        const open = hour >= 8 && hour < 20;
        return (
          <li key={city} className="rounded-xl border border-current/15 p-4">
            <p className="text-xs opacity-60">{city}</p>
            <p className="tabular mt-1 font-display text-3xl">{time}</p>
            {city === "Abuja" && <p className={`mt-1 text-[13px] ${open ? "text-savanna" : "opacity-60"}`}>{open ? "AIBEN office open" : "Assistant online"}</p>}
          </li>
        );
      })}
    </ul>
  );
}
