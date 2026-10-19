"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { ArrowRight, ArrowUpRight, Mail, Menu, Phone, X, UserRound } from "lucide-react";
import Logo from "./Logo";
import { company, nav } from "@/lib/site";
import { useExperience } from "./Providers";
import { WhatsAppIcon } from "./WhatsAppButton";
import Swoosh from "./Swoosh";

export function CitySwitch({ className = "" }) {
  const { city, setCity } = useExperience();
  return (
    <div role="radiogroup" aria-label="City" className={clsx("caps inline-flex border border-current/40 p-0.5 text-[13px] font-semibold", className)}>
      {["abuja", "lagos"].map((c) => (
        <button
          key={c}
          role="radio"
          aria-checked={city === c}
          onClick={() => setCity(c)}
          className={clsx("caps px-4 py-1.5 transition", city === c ? "bg-gold text-on-brand" : "opacity-70 hover:opacity-100")}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { openChat } = useExperience();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Pages that open on a dark cinematic hero get a transparent header.
  const overHero = ["/", "/hutu-prestige"].includes(pathname) || pathname.startsWith("/estates/");

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  // While the mobile menu is open: lock page scroll, close on Escape, and flag
  // <html> so floating widgets (WhatsApp bubble) step aside.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.dataset.menu = "open";
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      delete root.dataset.menu;
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Transparent over a hero, white everywhere else; black when the mobile menu is open.
  const clear = overHero && !scrolled && !open;
  const dark = clear || open;
  // Compact (80px) header: after scrolling, and always while the menu is open,
  // because the menu panel starts exactly 80px down.
  const compact = scrolled || open;

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color] duration-500",
        dark ? "scope-dark text-white" : "scope-light text-ink",
        clear ? "border-b border-white/15 bg-transparent" : open ? "bg-soil" : "border-b border-black bg-white",
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded focus:bg-gold focus:px-3 focus:py-2 focus:text-on-brand">
        Skip to content
      </a>

      {/* Utility bar: always black, folds away once the page scrolls. */}
      <div
        className={clsx(
          "scope-dark hidden overflow-hidden bg-soil text-white transition-[max-height] duration-500 lg:block",
          compact ? "max-h-0" : "max-h-12",
        )}
      >
        <div className="mx-auto flex h-12 max-w-360 items-center gap-8 px-10 text-sm whitespace-nowrap">
          <p className="caps text-[12px] font-semibold">
            Since {company.founded} <span className="mx-3 text-white/35">|</span>
            <span className="text-white/70">
              {company.offices} offices<span className="hidden 2xl:inline"> · Lagos & Abuja</span>
            </span>
          </p>
          <div className="ml-auto flex items-center gap-7 text-white/75">
            <a href={`tel:${company.phones[0].replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-white">
              <Phone className="size-4" /> {company.phones[0]}
            </a>
            <a href={`mailto:${company.email}`} className="hidden items-center gap-2 hover:text-white 2xl:inline-flex">
              <Mail className="size-4" /> {company.email}
            </a>
            <Link href="/my-aiben" className="caps inline-flex items-center gap-2 text-[12px] font-semibold text-white hover:underline">
              <UserRound className="size-4" /> My AIBEN
            </Link>
            <CitySwitch className="text-[11px]" />
            <Link
              href="/book-inspection"
              className="caps inline-flex items-center gap-2 bg-white px-4 py-2 text-[12px] font-semibold text-ink transition hover:bg-aiben-blue hover:text-white"
            >
              Book an inspection <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar: three links either side of a centred logo, mirrored exactly.
          It slims from 112px to 80px once the page scrolls. */}
      <div
        className={clsx(
          "mx-auto grid h-20 max-w-360 grid-cols-[1fr_auto] items-center gap-6 px-5 transition-[height] duration-500 sm:px-8 lg:px-10 xl:grid-cols-[1fr_auto_1fr] xl:gap-10",
          compact ? "lg:h-20" : "lg:h-28",
        )}
      >
        <nav aria-label="Main, first half" className="hidden h-full items-stretch justify-end gap-10 xl:flex 2xl:gap-14">
          {nav.slice(0, 3).map((n) => (
            <NavLink key={n.href} item={n} active={pathname.startsWith(n.href)} />
          ))}
        </nav>

        <Link
          href="/"
          aria-label="AIBEN Properties home"
          className="justify-self-start rounded-sm focus-visible:outline-offset-8 xl:justify-self-center"
        >
          <Logo
            tone={clear || open ? "reversed" : "color"}
            className={clsx("h-11 transition-[height] duration-500", compact ? "lg:h-12" : "lg:h-16")}
          />
        </Link>

        <nav aria-label="Main, second half" className="hidden h-full items-stretch justify-start gap-10 xl:flex 2xl:gap-14">
          {nav.slice(3).map((n) => (
            <NavLink key={n.href} item={n} active={pathname.startsWith(n.href)} />
          ))}
        </nav>

        <button
          className="caps inline-flex items-center gap-2 justify-self-end border border-current/40 px-4 py-3 text-[13px] font-semibold focus-visible:outline-offset-4 xl:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
          <span className="max-sm:sr-only">{open ? "Close" : "Menu"}</span>
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-20 bottom-0 flex flex-col border-t border-white/10 bg-soil xl:hidden">
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 pt-6 pb-8 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-3xl">
            <p className="eyebrow flex items-center gap-3 text-white/50">
              <Swoosh className="w-8" /> Explore
            </p>
            <nav aria-label="Mobile" className="mt-3">
              {nav.map((n, i) => {
                const active = pathname.startsWith(n.href);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    aria-current={active ? "page" : undefined}
                    className="rise group flex items-center gap-4 border-b border-white/10 py-4"
                    style={{ animationDelay: `${60 + i * 45}ms` }}
                  >
                    <span className={clsx("tabular w-6 text-xs font-semibold", active ? "text-aiben-red" : "text-white/35")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={clsx("flex-1 font-display text-[2rem] leading-none", active ? "text-white" : "text-white/85")}>
                      {active ? <em>{n.label}</em> : n.label}
                    </span>
                    <ArrowRight className={clsx("size-5 transition", active ? "text-aiben-red" : "text-white/40 group-hover:translate-x-1 group-hover:text-white")} />
                  </Link>
                );
              })}
            </nav>

            <ul className="caps mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-[12px] font-semibold text-white/70">
              {[
                ["/my-aiben", "My AIBEN"],
                ["/estates?type=commercial", "Commercial"],
                ["/about", "About AIBEN"],
                ["/contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="inline-flex items-center gap-1.5 hover:text-white">
                    {label} <ArrowUpRight className="size-3.5 opacity-60" />
                  </Link>
                </li>
              ))}
            </ul>
            </div>
          </div>

          {/* Actions stay pinned at the bottom, within thumb reach. */}
          <div className="border-t border-white/10 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8 lg:px-10">
            <div className="mx-auto max-w-3xl">
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/book-inspection"
                className="caps inline-flex items-center justify-center bg-white px-2 py-3.5 text-[12px] font-semibold whitespace-nowrap text-ink"
              >
                Book inspection
              </Link>
              <button
                type="button"
                onClick={() => openChat()}
                className="caps inline-flex items-center justify-center gap-2 border-2 border-white px-2 py-3 text-[12px] font-semibold whitespace-nowrap"
              >
                <WhatsAppIcon className="size-4" /> WhatsApp
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <CitySwitch className="text-[11px]" />
              <a href={`tel:${company.phones[0].replace(/\s/g, "")}`} className="inline-flex items-center gap-2 text-sm text-white/75">
                <Phone className="size-4" /> {company.phones[0]}
              </a>
            </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ item, active }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={clsx(
        "caps group relative flex items-center text-[13px] font-semibold whitespace-nowrap transition-colors focus-visible:outline-offset-4 2xl:text-[14px]",
        active ? "text-current" : "text-current/70 hover:text-current",
      )}
    >
      {item.label}
      <span
        aria-hidden="true"
        className={clsx(
          "absolute inset-x-0 bottom-0 h-0.75 origin-center bg-accent transition-transform duration-300 ease-ground",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
    </Link>
  );
}
