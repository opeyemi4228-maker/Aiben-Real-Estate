// Directory behind "Verify an AIBEN agent" and "Verify a document".
// Leadership names and roles are public; every other record is a DEMO entry
// (fictional, flagged `demo`) until AIBEN supplies its staff and realtor list.
import { leadership } from "./site";

const directory = [
  ...leadership.map((l) => ({ ...l, kind: "staff", phones: [] })),
  { name: "Demo Adviser One", role: "Sales Adviser, Abuja", kind: "staff", phones: ["08000000001"], since: 2019, demo: true },
  { name: "Demo Adviser Two", role: "Diaspora Desk Adviser", kind: "staff", phones: ["08000000002"], since: 2021, demo: true },
  { name: "Demo Realtor", role: "Accredited Realtor, Lagos", kind: "realtor", phones: ["08000000003"], since: 2023, demo: true },
];

const digits = (s) => s.replace(/\D/g, "").replace(/^234/, "0");
const norm = (s) => s.toLowerCase().replace(/[^a-z ]/g, "").replace(/\s+/g, " ").trim();

export function lookupAgent(query) {
  const d = digits(query);
  const n = norm(query);
  const person = directory.find((p) => (d.length >= 7 && p.phones.some((x) => x === d)) || (n.length >= 5 && norm(p.name) === n));
  return { found: !!person, person };
}

// Documents carry a code like AIB-ALC-2026-0412 (QR-encoded on the paper).
const documents = {
  "AIB-ALC-2026-0412": { type: "Allocation letter", estate: "HUTU Green City", plot: "Block C, Plot 14", issued: "12 Aug 2026", holder: "D**** A******" },
  "AIB-RCT-2026-1188": { type: "Payment receipt", estate: "AIBEN Victory Park", plot: "4-bedroom duplex, Unit 7", issued: "02 Sep 2026", holder: "O***** B****" },
};

export function lookupDocument(code) {
  const key = code.trim().toUpperCase();
  return { code: key, doc: documents[key] || null };
}
