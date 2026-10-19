"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight, X, RectangleHorizontal, RectangleVertical } from "lucide-react";
import Scene from "./Scene";

// Horizontal, snap-scrolling chapter gallery with a 01 / 08 counter (Azimute).
export function HorizontalGallery({ items, title }) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(null);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const w = el.firstElementChild?.getBoundingClientRect().width || 1;
    setIndex(Math.min(items.length - 1, Math.round(el.scrollLeft / (w + 16))));
  };
  const go = (d) => {
    const el = ref.current;
    const w = el.firstElementChild?.getBoundingClientRect().width || 0;
    el.scrollBy({ left: d * (w + 16), behavior: document.documentElement.dataset.motion === "paused" ? "auto" : "smooth" });
  };

  return (
    <div>
      <div ref={ref} onScroll={onScroll} className="snap-x-gallery -mx-4 flex gap-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6" aria-label={title}>
        {items.map((it, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            className="group relative w-[85%] shrink-0 overflow-hidden rounded-xl text-left sm:w-[62%] lg:w-[46%]"
            aria-label={`Open ${it.caption}`}
          >
            <Scene {...it.scene} className="aspect-[16/10] h-auto w-full transition duration-1000 group-hover:scale-[1.03]" title={it.caption} />
            <span className="absolute bottom-3 left-3 bg-soil/70 px-3 py-1 text-xs text-sand backdrop-blur">{it.caption}</span>
          </button>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-4">
        <span className="tabular text-sm opacity-70">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <div className="h-px flex-1 bg-current opacity-20" />
        <button onClick={() => go(-1)} className="rounded-full border border-current/25 p-2 hover:bg-current/10" aria-label="Previous image">
          <ChevronLeft className="size-4" />
        </button>
        <button onClick={() => go(1)} className="rounded-full border border-current/25 p-2 hover:bg-current/10" aria-label="Next image">
          <ChevronRight className="size-4" />
        </button>
      </div>
      {open !== null && <Lightbox items={items} start={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

// "Explore every detail": one filtered gallery per estate.
export function FilteredGallery({ items, filters }) {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(null);
  const shown = filter === "All" ? items : items.filter((i) => i.group === filter);
  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2">
        {["All", ...filters].map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={clsx("border px-4 py-1.5 text-sm transition", filter === f ? "border-laterite bg-laterite text-on-brand" : "border-current/20 hover:border-current/50")}
          >
            {f}
            <span className="tabular ml-1.5 opacity-60">{f === "All" ? items.length : items.filter((i) => i.group === f).length}</span>
          </button>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {shown.map((it, i) => (
          <button key={`${filter}-${i}`} onClick={() => setOpen(i)} className="group relative overflow-hidden rounded-lg" aria-label={`Open ${it.caption}`}>
            <Scene {...it.scene} label={false} className="aspect-square h-auto w-full transition duration-700 group-hover:scale-105" title={it.caption} />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-soil/80 p-2 text-left text-[13px] text-sand">{it.caption}</span>
          </button>
        ))}
      </div>
      {open !== null && <Lightbox items={shown} start={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

export function Lightbox({ items, start, onClose }) {
  const [i, setI] = useState(start);
  const [vertical, setVertical] = useState(false);
  const step = useCallback((d) => setI((x) => (x + d + items.length) % items.length), [items.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, step]);

  const it = items[i];
  return (
    <div role="dialog" aria-modal="true" aria-label="Image viewer" className="fixed inset-0 z-[85] flex flex-col bg-soil/97 text-sand">
      <div className="flex items-center gap-3 p-4">
        <span className="tabular text-sm opacity-70">
          {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <p className="flex-1 truncate text-sm">{it.caption}</p>
        <div className="inline-flex border border-sand/20 p-0.5 text-xs">
          <button onClick={() => setVertical(false)} aria-pressed={!vertical} className={clsx("inline-flex items-center gap-1 px-2.5 py-1", !vertical && "bg-sand/15")}>
            <RectangleHorizontal className="size-3.5" /> Horizontal
          </button>
          <button onClick={() => setVertical(true)} aria-pressed={vertical} className={clsx("inline-flex items-center gap-1 px-2.5 py-1", vertical && "bg-sand/15")}>
            <RectangleVertical className="size-3.5" /> Vertical
          </button>
        </div>
        <button onClick={onClose} className="rounded-full p-2 hover:bg-sand/10" aria-label="Close">
          <X />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6">
        <div className={clsx("overflow-hidden rounded-xl", vertical ? "aspect-[9/16] h-full max-h-full" : "aspect-[16/9] w-full max-w-6xl")}>
          <Scene {...it.scene} className="h-full w-full" title={it.caption} />
        </div>
        <button onClick={() => step(-1)} className="absolute left-4 rounded-full bg-soil/70 p-3 hover:bg-soil" aria-label="Previous">
          <ChevronLeft />
        </button>
        <button onClick={() => step(1)} className="absolute right-4 rounded-full bg-soil/70 p-3 hover:bg-soil" aria-label="Next">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
