import { Plus } from "lucide-react";

// Plain-English answers to the questions buyers ask before they pay.
export default function Faq({ items, className = "" }) {
  return (
    <div className={`border-t border-current ${className}`}>
      {items.map(([q, a]) => (
        <details key={q} className="group border-b border-current/15">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-2xl leading-snug sm:text-[1.75rem] [&::-webkit-details-marker]:hidden">
            {q}
            <Plus className="size-6 shrink-0 transition duration-300 group-open:rotate-45" />
          </summary>
          <div className="max-w-3xl pb-7 text-lg leading-relaxed opacity-75">{a}</div>
        </details>
      ))}
    </div>
  );
}
