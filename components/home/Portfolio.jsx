"use client";

import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { estates, tabLabels } from "@/lib/estates";
import EstateCard from "../EstateCard";
import { useExperience } from "../Providers";

const tabs = ["residential", "commercial", "hospitality", "legacy"];

// Trump Realty-style portfolio tabs, filtered by the city switcher.
export default function Portfolio() {
  const { city } = useExperience();
  const [tab, setTab] = useState("residential");
  const all = estates.filter((e) => e.tab === tab && (e.city === city || tab === "hospitality" || tab === "legacy"));
  const list = all.slice(0, 3);

  return (
    <div>
      <div role="tablist" aria-label="Portfolio" className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={clsx("caps border px-5 py-2.5 text-[13px] font-semibold transition", tab === t ? "border-gold bg-gold text-on-brand" : "border-sand/20 text-sand/80 hover:border-sand/50")}
          >
            {tabLabels[t]}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((e) => (
          <EstateCard key={e.slug} estate={e} />
        ))}
        {list.length === 0 && (
          <p className="text-sand/70">
            Nothing in this category for {city === "lagos" ? "Lagos" : "Abuja"} yet.{" "}
            <Link href="/estates" className="underline">
              See all estates
            </Link>
            .
          </p>
        )}
      </div>
      <div className="mt-12 flex justify-center">
        <Link href={tab === "legacy" ? "/about" : "/estates"} className="caps group inline-flex items-center gap-3 border-2 border-current px-8 py-4 text-[14px] font-semibold transition hover:bg-white hover:text-ink">
          {tab === "legacy" ? "Our track record" : `View all ${estates.filter((e) => e.status === "selling").length} estates`}
          <ArrowRight className="size-5 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
