"use client";

import Scene from "../Scene";
import { ButtonLink } from "../ui";
import WhatsAppButton from "../WhatsAppButton";
import { useExperience } from "../Providers";
import Swoosh from "../Swoosh";

const copy = {
  abuja: {
    place: "Abuja · Airport Road · Karsana · Gwarinpa · Guzape",
    short: "Abuja, Nigeria",
    head: ["Nigeria's largest private residential", "development."],
    slides: [
      ["/images/estates/victory-park-4.jpg", "HUTU Prestige, Airport Road"],
      ["/images/estates/residence-4.jpg", "Mountain Resort, HUTU Prestige"],
      ["/images/estates/victory-park-1.jpg", "AIBEN Victory Park, Karsana South"],
    ],
  },
  lagos: {
    place: "Lagos · Ibeju-Lekki · Apapa GRA",
    short: "Lagos, Nigeria",
    head: ["Ground on Lagos'", "growth corridor."],
    slides: [
      ["/images/estates/biltmore-lagos-2.jpg", "Biltmore Garden City, Ibeju-Lekki"],
      ["/images/estates/calton-2.jpg", "Calton Gate, Apapa GRA"],
      ["/images/estates/biltmore-lagos-1.jpg", "Biltmore Garden City, Ibeju-Lekki"],
    ],
  },
};

// Full-screen sunset hero with the night version layered behind it (Azimute).
export default function Hero() {
  const { city } = useExperience();
  const c = copy[city] || copy.abuja;
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-soil text-sand">
      <div key={city} className="absolute inset-0">
        {c.slides.map(([src, caption], i) => (
          <div
            key={src}
            className="hero-slide absolute inset-0"
            style={{ animationDelay: `${i * 7}s`, animationDuration: `${c.slides.length * 7}s`, opacity: i === 0 ? 1 : 0 }}
          >
            <Scene src={src} title={`${caption}, artist's impression`} className="drift h-full w-full" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-soil via-soil/55 to-soil/75" />
      {/* The top padding keeps a clear zone under the fixed header (80px on
          phones, 160px on desktop), and the section grows rather than letting
          content ride up under it. The headline scales with both width and
          height, so short laptop screens keep it to three clean lines. */}
      <div className="relative mx-auto flex w-full max-w-360 flex-1 flex-col justify-end px-5 pt-32 pb-28 sm:px-8 sm:pb-24 lg:px-10 lg:pt-52">
        <p className="eyebrow flex items-center gap-3 text-white">
          <Swoosh className="w-10" />
          <span className="sm:hidden">{c.short}</span>
          <span className="max-sm:hidden">{c.place}</span>
        </p>
        <h1 key={city} className="display rise mt-6 text-[clamp(2rem,min(9.4vw,12.5svh),8.5rem)] sm:mt-7 sm:max-w-[15ch]">
          {c.head[0]} <em>{c.head[1]}</em>
        </h1>
        <div className="mt-8 grid gap-6 border-t border-white/20 pt-6 sm:mt-10 sm:gap-8 sm:pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-xl text-base text-pretty text-white/80 sm:text-xl">
            Clear prices. Flexible payment. Verified titles.
          </p>
          <div className="grid gap-3 sm:flex sm:flex-wrap">
            <ButtonLink href="/estates" className="w-full max-sm:px-4! sm:w-auto">
              Explore estates
            </ButtonLink>
            <WhatsAppButton
              className="w-full max-sm:px-4! sm:w-auto"
              label={
                <>
                  <span className="sm:hidden">Chat on WhatsApp</span>
                  <span className="max-sm:hidden">Talk to us on WhatsApp</span>
                </>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
