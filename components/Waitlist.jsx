"use client";

import { useState } from "react";
import { CircleCheck } from "lucide-react";

// Concept rule: forms do not collect real data. Submitting shows the
// confirmation the buyer would get; nothing leaves the browser.
export default function Waitlist({ phase }) {
  const [done, setDone] = useState(false);
  if (done)
    return (
      <p className="flex items-center gap-2 text-sm text-gold" role="status">
        <CircleCheck className="size-5" /> You&apos;re on the {phase} waitlist. We&apos;ll message you before launch pricing opens.
      </p>
    );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="flex flex-col gap-2 sm:flex-row"
    >
      <label className="sr-only" htmlFor={`wl-${phase}`}>
        WhatsApp number or email
      </label>
      <input id={`wl-${phase}`} required placeholder="WhatsApp number or email" className="min-w-0 flex-1 bg-soil px-4 py-3 text-sm text-sand ring-1 ring-sand/20 placeholder:text-sand/40" />
      <button className="bg-gold px-5 py-3 text-sm font-semibold text-on-brand hover:bg-gold-2">Join the waitlist</button>
    </form>
  );
}
