"use client";

import Link from "next/link";
import { planFor } from "@/lib/money";
import Price, { CurrencyToggle } from "./Price";
import { Sample } from "./ui";
import WhatsAppButton from "./WhatsAppButton";

export default function PriceTable({ estate }) {
  const months = estate.planMonths;
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">Price list as of 14 Oct 2026 {estate.priceSample && <Sample />}</p>
        <CurrencyToggle />
      </div>
      {/* relative: keeps the visually hidden "Action" header inside the scroll box on phones. */}
      <div className="relative mt-4 overflow-x-auto rounded-2xl bg-white ring-1 ring-black/5">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-sand text-xs text-muted uppercase">
            <tr>
              <th scope="col" className="px-5 py-3 font-semibold">{estate.type === "land" ? "Plot" : "Unit"}</th>
              <th scope="col" className="px-5 py-3 font-semibold">Size</th>
              <th scope="col" className="px-5 py-3 font-semibold">Outright</th>
              {months > 0 && <th scope="col" className="px-5 py-3 font-semibold">{months}-month plan</th>}
              <th scope="col" className="px-5 py-3 font-semibold">Available</th>
              <th scope="col" className="px-5 py-3"><span className="sr-only">Action</span></th>
            </tr>
          </thead>
          <tbody className="tabular">
            {estate.units.map((u, i) => {
              const plan = months && u.price ? planFor(u.price, months) : null;
              return (
                <tr key={i} className="border-t border-black/5">
                  <th scope="row" className="px-5 py-4 font-medium">
                    {u.name}
                    {u.detached && <span className="block text-xs font-normal text-muted">{u.detached}</span>}
                  </th>
                  <td className="px-5 py-4">{u.size.toLocaleString()} sqm</td>
                  <td className="px-5 py-4 font-semibold">
                    {u.price ? <Price naira={u.price} sample={!!estate.priceSample} /> : <span className="caps text-[13px]">Call for price</span>}
                  </td>
                  {months > 0 && !plan && <td className="px-5 py-4 text-muted">Ask an adviser</td>}
                  {plan && (
                    <td className="px-5 py-4">
                      <Price naira={plan.monthly} sample={false} compact />
                      <span className="text-muted"> /mo after </span>
                      <Price naira={plan.deposit} sample={false} compact />
                    </td>
                  )}
                  <td className="px-5 py-4">
                    <span className={u.available <= 5 ? "font-semibold text-signal" : ""}>{u.available} left</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {u.price ? (
                      <Link href={`/reserve?estate=${estate.slug}&unit=${i}`} className="caps bg-laterite px-4 py-2 text-xs font-semibold whitespace-nowrap text-on-brand hover:bg-laterite-2">
                        Reserve yours
                      </Link>
                    ) : (
                      <WhatsAppButton context={`${estate.name}: ${u.name}`} label="Get price" variant="brand" className="px-4 py-2 text-xs" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
