"use client";

import Link from "next/link";
import { Pause, Play, Wifi, WifiOff, RotateCcw } from "lucide-react";
import Logo from "./Logo";
import { company, studio } from "@/lib/site";
import { useExperience } from "./Providers";

const columns = [
  {
    title: "Own",
    links: [
      ["/estates", "All estates"],
      ["/hutu-prestige", "HUTU Prestige"],
      ["/estates?type=land", "Land"],
      ["/estates?type=homes", "Homes"],
      ["/estates?type=commercial", "Commercial"],
      ["/ground-finder", "Ground Finder"],
    ],
  },
  {
    title: "Buy with confidence",
    links: [
      ["/how-to-buy", "How to buy"],
      ["/how-to-buy#costs", "Full cost breakdown"],
      ["/how-to-buy#protection", "Buyer protection"],
      ["/verify", "Verify an agent or document"],
      ["/book-inspection", "Book an inspection"],
      ["/diaspora", "Diaspora Desk"],
    ],
  },
  {
    title: "Clients",
    links: [
      ["/my-aiben", "My AIBEN"],
      ["/contact", "Contact & offices"],
      ["/before-after", "Before & after (pitch)"],
    ],
  },
];

export default function Footer() {
  const { motion, saver, toggleMotion, toggleSaver } = useExperience();
  return (
    <footer className="bg-soil text-sand">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo tone="reversed" className="h-16" />
            <p className="display mt-8 max-w-sm text-4xl">
              Own your <em>ground.</em>
            </p>
            <div className="mt-6 space-y-1 text-sm text-sand/70">
              {company.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block hover:text-gold">
                  {p}
                </a>
              ))}
              <a href={`mailto:${company.email}`} className="block hover:text-gold">
                {company.email}
              </a>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((c) => (
              <div key={c.title}>
                <p className="eyebrow text-gold">{c.title}</p>
                <ul className="mt-4 space-y-2 text-sm text-sand/75">
                  {c.links.map(([href, label]) => (
                    <li key={href}>
                      <Link href={href} className="hover:text-sand">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-3 border-t border-sand/10 pt-8 text-xs">
          <button onClick={toggleMotion} className="inline-flex items-center gap-2 border border-sand/20 px-3 py-1.5 hover:bg-sand/10" aria-pressed={motion === "paused"}>
            {motion === "paused" ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            Animations {motion === "paused" ? "off" : "on"}
          </button>
          <button onClick={toggleSaver} className="inline-flex items-center gap-2 border border-sand/20 px-3 py-1.5 hover:bg-sand/10" aria-pressed={saver === "on"}>
            {saver === "on" ? <WifiOff className="size-3.5" /> : <Wifi className="size-3.5" />}
            Data saver {saver === "on" ? "on" : "off"}
          </button>
          <button
            onClick={() => {
              window.scrollTo({ top: 0 });
              window.dispatchEvent(new Event("aiben:replay-opening"));
            }}
            className="inline-flex items-center gap-2 border border-sand/20 px-3 py-1.5 hover:bg-sand/10"
          >
            <RotateCcw className="size-3.5" /> Replay the opening
          </button>
        </div>

        <p className="mt-10 max-w-4xl text-xs leading-relaxed text-sand/50">
          Prices and availability are indicative; confirm with AIBEN before paying. Never pay into a personal account: AIBEN only accepts
          payment into company accounts. <Link href="/verify" className="underline">Verify an agent</Link>.
        </p>
        <p className="mt-4 text-xs text-sand/40">
          © {new Date().getFullYear()} {company.legal}. Concept designed and built by{" "}
          <a href={studio.url} target="_blank" rel="noreferrer" className="font-semibold text-sand/70 underline-offset-4 hover:text-sand hover:underline">
            {studio.name}
          </a>{" "}
          for {company.name}: not the official website.
        </p>
      </div>
    </footer>
  );
}
