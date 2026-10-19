"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { studio, whatsappMessage } from "@/lib/site";

const Ctx = createContext(null);

function read(key, fallback) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}
function write(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export function Providers({ children }) {
  const [motion, setMotion] = useState("on");
  const [saver, setSaver] = useState("off");
  const [currency, setCurrency] = useState("NGN");
  const [city, setCity] = useState("abuja");
  const [chat, setChat] = useState(null);

  useEffect(() => {
    document.documentElement.classList.add("js");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const slow = navigator.connection?.saveData || /2g/.test(navigator.connection?.effectiveType || "");
    // Browser-only preferences, read after hydration on purpose.
    /* eslint-disable react-hooks/set-state-in-effect */
    setMotion(read("aiben:motion", reduced ? "paused" : "on"));
    setSaver(read("aiben:saver", slow ? "on" : "off"));
    setCurrency(read("aiben:currency", "NGN"));
    setCity(read("aiben:city", "abuja"));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = motion;
    document.documentElement.dataset.saver = saver;
  }, [motion, saver]);

  const api = useMemo(
    () => ({
      motion,
      saver,
      currency,
      city,
      toggleMotion: () => setMotion((m) => (write("aiben:motion", m === "on" ? "paused" : "on"), m === "on" ? "paused" : "on")),
      toggleSaver: () => setSaver((s) => (write("aiben:saver", s === "on" ? "off" : "on"), s === "on" ? "off" : "on")),
      setCurrency: (c) => (write("aiben:currency", c), setCurrency(c)),
      setCity: (c) => (write("aiben:city", c), setCity(c)),
      openChat: (context) => setChat(whatsappMessage(context)),
    }),
    [motion, saver, currency, city],
  );

  return (
    <Ctx.Provider value={api}>
      {children}
      {chat && <ChatDialog message={chat} onClose={() => setChat(null)} />}
    </Ctx.Provider>
  );
}

export function useExperience() {
  return useContext(Ctx);
}

// WhatsApp hand-off. In the concept it goes to the studio's own number, or shows
// the pre-filled message so the pitch audience can see what AIBEN would receive.
function ChatDialog({ message, onClose }) {
  const close = useCallback(() => onClose(), [onClose]);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const href = studio.whatsapp ? `https://wa.me/${studio.whatsapp}?text=${encodeURIComponent(message)}` : null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 p-4 sm:items-center" onClick={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-title"
        className="w-full max-w-md overflow-hidden rounded-2xl bg-[#ece5dd] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
          <span className="grid size-9 place-items-center rounded-full bg-white/15 font-display text-lg">A</span>
          <div className="flex-1">
            <p id="chat-title" className="text-sm font-semibold">AIBEN Sales</p>
            <p className="text-xs text-white/70">Typically replies in minutes</p>
          </div>
          <button onClick={close} aria-label="Close" className="rounded-full p-1 hover:bg-white/10">
            <X className="size-5" />
          </button>
        </div>
        <div className="space-y-3 p-4">
          <p className="mx-auto w-fit rounded-md bg-[#fff5c4] px-3 py-1 text-center text-[13px] text-[#54656f]">
            Your message is pre-written. Just press send.
          </p>
          <div className="ml-auto max-w-[85%] rounded-lg rounded-tr-none bg-[#d9fdd3] px-3 py-2 text-sm text-[#111b21] shadow-sm">
            {message}
          </div>
        </div>
        <div className="border-t border-black/5 bg-white p-4">
          {href ? (
            <a href={href} target="_blank" rel="noreferrer" className="block rounded-full bg-[#25d366] py-3 text-center font-semibold text-white">
              Open WhatsApp
            </a>
          ) : (
            <p className="text-center text-xs text-[#54656f]">
              Concept demo: on the live site this opens WhatsApp with the message above, tagged with the estate and campaign, and routes it to
              the right adviser.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
