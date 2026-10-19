"use client";

import { useSyncExternalStore } from "react";

// Current time, ticking every `step` ms on the client and null on the server,
// so clocks render without hydration mismatches.
export default function useNow(step = 15000) {
  return useSyncExternalStore(
    (notify) => {
      const t = setInterval(notify, Math.min(step, 5000));
      return () => clearInterval(t);
    },
    () => Math.floor(Date.now() / step) * step,
    () => null,
  );
}
