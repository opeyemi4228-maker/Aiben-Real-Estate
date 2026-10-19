"use client";

import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Scene from "../Scene";

const panels = [
  {
    key: "buy",
    title: "Buy",
    company: "AIBEN Properties",
    tagline: "Ground you can prove you own.",
    body: "Plots and homes with published prices, flexible plans and verified titles, across Abuja and Lagos.",
    href: "/estates",
    cta: "Explore estates",
    scene: { src: "/images/estates/victory-park-3.jpg" },
  },
  {
    key: "build",
    title: "Build",
    company: "AIBEN construction",
    tagline: "From plot to keys, one contract.",
    body: "Own a plot? Choose a house type and AIBEN builds it, with monthly photo reports you can follow from anywhere.",
    href: "/my-aiben#journey",
    cta: "See how it works",
    scene: { src: "/images/site/construction-team.jpg" },
  },
  {
    key: "manage",
    title: "Manage",
    company: "AIBEN Facility Managers",
    tagline: "Your home, managed.",
    body: "Security, maintenance and rental management, so a home in Abuja earns while you live in London.",
    href: "/diaspora",
    cta: "For owners abroad",
    scene: { src: "/images/estates/bourdillon-2.jpg" },
  },
];

// AllHaus-style tall panels that expand in place.
export default function BuyBuildManage() {
  const [open, setOpen] = useState("buy");
  return (
    <div className="flex flex-col gap-3 lg:h-[560px] lg:flex-row">
      {panels.map((p) => {
        const active = open === p.key;
        return (
          <div
            key={p.key}
            className={clsx(
              "relative overflow-hidden rounded-2xl text-sand transition-[flex] duration-700 ease-[var(--ease-ground)]",
              active ? "min-h-[420px] lg:flex-[3]" : "min-h-[120px] lg:flex-1",
            )}
          >
            <Scene {...p.scene} label={false} className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-soil via-soil/50 to-soil/10" />
            {!active && (
              <button
                onClick={() => setOpen(p.key)}
                aria-expanded={false}
                className="absolute inset-0 z-10 flex flex-col justify-end p-6 text-left"
              >
                <span className="eyebrow text-gold">{p.company}</span>
                <span className="display mt-2 text-5xl">
                  {p.title}
                  <em>.</em>
                </span>
              </button>
            )}
            {active && (
              <div className="rise relative z-20 flex h-full flex-col justify-end p-6 pt-40 lg:max-w-md">
                <span className="eyebrow text-gold">{p.company}</span>
                <p className="display mt-2 text-5xl">
                  {p.title}
                  <em>.</em>
                </p>
                <p className="mt-4 font-display text-xl italic text-gold-2">{p.tagline}</p>
                <p className="mt-2 text-sm text-sand/80">{p.body}</p>
                <Link href={p.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:text-gold">
                  {p.cta} <ArrowRight className="size-4" />
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
