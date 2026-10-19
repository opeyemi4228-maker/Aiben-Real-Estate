"use client";

import Link from "next/link";
import { CalendarDays, Download, KeyRound } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { WhatsAppIcon } from "./WhatsAppButton";
import { useExperience } from "./Providers";
import { pricedUnits } from "@/lib/estates";

// Sticky action bar on estate pages: appears once the hero is passed.
export default function ActionBar({ estate }) {
  const [on, setOn] = useState(false);
  const { openChat } = useExperience();
  useEffect(() => {
    const f = () => setOn(window.scrollY > window.innerHeight * 0.7);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const canReserve = estate.status === "selling" && pricedUnits(estate).length > 0;
  return (
    <div className={clsx("fixed inset-x-0 bottom-0 z-40 overflow-hidden border-t border-sand/10 bg-soil/95 text-sand backdrop-blur transition-transform duration-500", on ? "translate-y-0" : "translate-y-full")}>
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:px-6">
        <p className="mr-auto hidden font-display text-lg md:block">{estate.name}</p>
        {/* On phones the two main actions split the bar evenly and never overflow it. */}
        <button
          type="button"
          onClick={() => openChat(estate.name)}
          className="caps inline-flex min-w-0 flex-1 basis-0 items-center justify-center gap-2 border-2 border-current px-3 py-2.5 text-[12px] font-semibold whitespace-nowrap transition hover:bg-white hover:text-ink md:flex-none md:basis-auto md:px-6 md:text-[13px]"
        >
          <WhatsAppIcon className="size-4" /> WhatsApp
        </button>
        <Link
          href={`/book-inspection?estate=${estate.slug}`}
          className="caps inline-flex min-w-0 flex-1 basis-0 items-center justify-center gap-2 bg-white px-3 py-3 text-[12px] font-semibold whitespace-nowrap text-ink hover:bg-sand md:flex-none md:basis-auto md:px-6 md:text-[13px]"
        >
          <CalendarDays className="size-4 shrink-0" /> <span className="max-sm:hidden">Book</span> inspection
        </Link>
        {canReserve && (
          <Link href={`/reserve?estate=${estate.slug}`} className="caps hidden items-center gap-2 bg-laterite px-4 py-2.5 text-[14px] font-semibold text-on-brand hover:bg-laterite-2 sm:inline-flex">
            <KeyRound className="size-4" /> Reserve
          </Link>
        )}
        <a href="#documents" className="hidden items-center gap-2 px-3 py-2.5 text-sm hover:bg-sand/10 lg:inline-flex">
          <Download className="size-4" /> Brochure
        </a>
      </div>
    </div>
  );
}
