"use client";

import { useState } from "react";
import clsx from "clsx";
import { BadgeCheck, ShieldAlert, Search } from "lucide-react";
import { lookupAgent } from "@/lib/verify";

// Fraud protection: is this person really from AIBEN?
export default function VerifyAgent({ dark = false }) {
  const [q, setQ] = useState("");
  const [result, setResult] = useState(null);
  const submit = (e) => {
    e.preventDefault();
    if (q.trim()) setResult(lookupAgent(q));
  };
  return (
    <div>
      <form onSubmit={submit} className="flex gap-2">
        <label className="sr-only" htmlFor="agent-q">
          Phone number or name
        </label>
        <input
          id="agent-q"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setResult(null);
          }}
          placeholder="Phone number or full name"
          className={clsx("min-w-0 flex-1 px-4 py-3 text-sm ring-1", dark ? "bg-soil text-sand ring-sand/20 placeholder:text-sand/40" : "bg-white ring-black/15")}
        />
        <button className="caps inline-flex items-center gap-2 bg-laterite px-5 py-3 text-[14px] font-semibold text-on-brand hover:bg-laterite-2">
          <Search className="size-4" /> Verify
        </button>
      </form>
      <div aria-live="polite" className="mt-4 min-h-6">
        {result?.found && (
          <div className="flex gap-3 rounded-xl bg-savanna/15 p-4 text-sm ring-1 ring-savanna/40">
            <BadgeCheck className="size-6 shrink-0 text-savanna" />
            <div>
              <p className="font-semibold">
                {result.person.name} is {result.person.kind === "staff" ? "an AIBEN staff member" : "an accredited AIBEN realtor"}.
              </p>
              <p className="mt-0.5 opacity-75">
                {result.person.role}
                {result.person.since && ` · since ${result.person.since}`}
                {result.person.demo && " · demo record"}
              </p>
              <p className="mt-2 opacity-75">Pay only into accounts in the name of AIBEN Properties Ltd, never into a personal account.</p>
            </div>
          </div>
        )}
        {result && !result.found && (
          <div className="flex gap-3 rounded-xl bg-laterite/10 p-4 text-sm ring-1 ring-laterite/40">
            <ShieldAlert className="size-6 shrink-0 text-laterite" />
            <div>
              <p className="font-semibold">We can&apos;t find &ldquo;{q}&rdquo; in AIBEN&apos;s directory.</p>
              <p className="mt-0.5 opacity-75">
                Do not send money. Call AIBEN on 090 4444 4411 or report it, and we&apos;ll confirm within the hour.
              </p>
            </div>
          </div>
        )}
        {!result && <p className="text-xs opacity-60">Try &ldquo;Joseph Izonofe Osoria&rdquo; or the demo number 0800 000 0001.</p>}
      </div>
    </div>
  );
}
