"use client";

import { usePathname } from "next/navigation";
import { useExperience } from "./Providers";
import { WhatsAppIcon } from "./WhatsAppButton";

// Always-there chat button. Estate pages have their own sticky action bar.
export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const { openChat } = useExperience();
  if (pathname.startsWith("/estates/")) return null;
  return (
    <button
      type="button"
      onClick={() => openChat()}
      aria-label="Chat with AIBEN on WhatsApp"
      className="hide-when-menu group fixed right-5 bottom-5 z-[70] flex items-center gap-0 hover:gap-3 rounded-full bg-[#25d366] p-4 text-white shadow-[0_12px_30px_-8px_rgb(0_0_0/0.45)] transition hover:scale-105 sm:right-8 sm:bottom-8"
    >
      <WhatsAppIcon className="size-7" />
      <span className="caps hidden max-w-0 overflow-hidden text-[12px] font-semibold whitespace-nowrap transition-all duration-500 group-hover:max-w-40 sm:inline">
        Chat with us
      </span>
    </button>
  );
}
