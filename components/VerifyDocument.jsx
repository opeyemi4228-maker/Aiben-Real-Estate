"use client";

import { useState } from "react";
import { BadgeCheck, QrCode, ShieldAlert } from "lucide-react";
import { lookupDocument } from "@/lib/verify";

export default function VerifyDocument() {
  const [code, setCode] = useState("");
  const [res, setRes] = useState(null);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (code.trim()) setRes(lookupDocument(code));
        }}
        className="flex gap-2"
      >
        <label htmlFor="doc-code" className="sr-only">
          Document code
        </label>
        <input
          id="doc-code"
          value={code}
          onChange={(e) => (setCode(e.target.value), setRes(null))}
          placeholder="e.g. AIB-ALC-2026-0412"
          className="min-w-0 flex-1 bg-white px-4 py-3 text-sm uppercase ring-1 ring-black/15 placeholder:normal-case"
        />
        <button className="caps inline-flex items-center gap-2 bg-laterite px-5 py-3 text-[14px] font-semibold text-on-brand hover:bg-laterite-2">
          <QrCode className="size-4" /> Check
        </button>
      </form>
      <div aria-live="polite" className="mt-4">
        {res?.doc && (
          <div className="flex gap-3 rounded-xl bg-savanna/15 p-4 text-sm ring-1 ring-savanna/40">
            <BadgeCheck className="size-6 shrink-0 text-savanna" />
            <div>
              <p className="font-semibold">Genuine {res.doc.type.toLowerCase()} issued by AIBEN Properties Ltd.</p>
              <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 opacity-80">
                <dt>Estate</dt>
                <dd>{res.doc.estate}</dd>
                <dt>Plot / unit</dt>
                <dd>{res.doc.plot}</dd>
                <dt>Issued</dt>
                <dd>{res.doc.issued}</dd>
                <dt>Holder</dt>
                <dd>{res.doc.holder}</dd>
              </dl>
              <p className="mt-2 text-xs opacity-60">Demo record. The holder&apos;s name is masked for privacy.</p>
            </div>
          </div>
        )}
        {res && !res.doc && (
          <div className="flex gap-3 rounded-xl bg-laterite/10 p-4 text-sm ring-1 ring-laterite/40">
            <ShieldAlert className="size-6 shrink-0 text-laterite" />
            <p>
              <span className="font-semibold">No AIBEN document has the code {res.code}.</span> Don&apos;t rely on it, and call 090 4444 4411.
            </p>
          </div>
        )}
        {!res && <p className="text-xs text-muted">Demo codes: AIB-ALC-2026-0412 (allocation letter), AIB-RCT-2026-1188 (receipt).</p>}
      </div>
    </div>
  );
}
