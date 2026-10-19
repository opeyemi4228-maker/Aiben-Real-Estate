import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import Swoosh from "./Swoosh";

// Marks any figure that is not yet AIBEN-verified (concept rule 10.3).
export function Sample({ className = "" }) {
  return (
    <span
      title="Sample figure for the concept: to be replaced with AIBEN-verified data"
      className={clsx("ml-1 inline-block rounded-sm bg-current/10 px-1.5 align-middle text-[11px] font-semibold tracking-wider text-current uppercase opacity-80", className)}
    >
      sample
    </span>
  );
}

export function Chapter({ n, eyebrow, children, className = "", light = false }) {
  return (
    <div className={clsx(light && "on-light", className)}>
      <p className={clsx("eyebrow flex items-center gap-3", light ? "text-laterite" : "text-gold")}>
        <Swoosh className="w-10" />
        {n && <span className="tabular">{n}</span>}
        {eyebrow}
      </p>
      <h2 className="display mt-5 text-5xl sm:text-7xl">{children}</h2>
    </div>
  );
}

export function ButtonLink({ href, children, variant = "primary", className = "" }) {
  return (
    <Link
      href={href}
      className={clsx(
        "caps group inline-flex items-center justify-center gap-3 px-8 py-4 text-[14px] font-semibold transition",
        (variant === "primary" || variant === "gold") && "bg-laterite text-on-brand hover:bg-laterite-2",
        variant === "ghost" && "border-2 border-current hover:bg-laterite hover:text-on-brand hover:border-laterite",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-5 transition group-hover:translate-x-1" />
    </Link>
  );
}

export function NextChapter({ href, children }) {
  return (
    <a href={href} className="eyebrow inline-flex items-center gap-2 opacity-70 hover:opacity-100">
      Next chapter: {children} <ArrowRight className="size-4" />
    </a>
  );
}
