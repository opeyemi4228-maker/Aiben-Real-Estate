import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Scene from "./Scene";
import Price from "./Price";
import { estateHref, fromPrice, typeLabels } from "@/lib/estates";

export default function EstateCard({ estate, priority = false }) {
  const from = fromPrice(estate);
  const soon = estate.status === "coming-soon";
  const sold = estate.status === "sold-out";
  return (
    <Link href={estateHref(estate)} className="group relative block overflow-hidden rounded-2xl bg-soil text-sand">
      <div className="aspect-[4/5] overflow-hidden sm:aspect-[4/4.6]">
        <Scene src={estate.images[0]} title={estate.name} kind={estate.kind} time={soon ? "night" : "dusk"} seed={estate.seed} label={false} className="h-full w-full transition duration-[1.4s] ease-[var(--ease-ground)] group-hover:scale-105" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-soil via-soil/45 to-soil/5" />
      <div className="absolute top-4 left-4 flex flex-wrap gap-2 text-[13px] font-semibold">
        <span className="bg-soil/70 px-2.5 py-1 backdrop-blur">{typeLabels[estate.type]}</span>
        {soon && <span className="bg-gold px-2.5 py-1 text-on-brand">Coming soon</span>}
        {sold && <span className="bg-white px-2.5 py-1 text-ink">Sold out</span>}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        {estate.family && <p className="eyebrow text-gold">{estate.family}</p>}
        <h3 className="mt-1 font-display text-2xl leading-tight">{estate.name}</h3>
        <p className="mt-1 text-sm text-sand/70">{estate.area}</p>
        <div className="mt-4 flex items-end justify-between gap-3 border-t border-sand/15 pt-3 text-sm">
          <div>
            {sold ? (
              <span className="font-semibold">{estate.delivered} homes delivered</span>
            ) : soon ? (
              <span className="text-gold">Join the waitlist</span>
            ) : from ? (
              <>
                <span className="text-sand/60">From </span>
                <Price naira={from} compact sample={!!estate.priceSample} className="font-semibold text-gold" />
              </>
            ) : (
              <span className="caps text-[13px] font-semibold">Call for price</span>
            )}
            {!!estate.planMonths && !sold && <p className="text-xs text-sand/60">Up to {estate.planMonths} months to pay</p>}
          </div>
          <ArrowUpRight className="size-5 shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
