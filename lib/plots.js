// Sample plot inventory for the live master plan and site plans. Deterministic
// per estate so the demo looks the same every time. Replace with the real
// inventory table (PostgreSQL) once AIBEN supplies its site plans.

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export const statusMeta = {
  available: { label: "Available", fill: "#8fa0ff" },
  reserved: { label: "Reserved", fill: "#96989a" },
  sold: { label: "Sold", fill: "#2a2a2a" },
};

// Layout: blocks arranged on a 3 × 2 grid with roads between them.
export function plotsFor(estate) {
  const r = rng(estate.seed * 7919);
  const blocks = ["A", "B", "C", "D", "E", "F"];
  const cols = 8;
  const rows = 4;
  const plots = [];
  blocks.forEach((b, bi) => {
    const bx = 40 + (bi % 3) * 320;
    const by = 40 + Math.floor(bi / 3) * 250;
    for (let i = 0; i < cols * rows; i++) {
      const c = i % cols;
      const row = Math.floor(i / cols);
      const unitIndex = estate.units.length ? Math.min(estate.units.length - 1, Math.floor(r() * r() * estate.units.length * 1.2)) : 0;
      const roll = r();
      const status = roll < 0.5 ? "available" : roll < 0.68 ? "reserved" : "sold";
      plots.push({
        id: `${b}-${String(i + 1).padStart(2, "0")}`,
        block: b,
        number: i + 1,
        unitIndex,
        status,
        x: bx + c * 34,
        y: by + row * 46 + (row > 1 ? 14 : 0),
        w: 30,
        h: 40,
      });
    }
  });
  return plots;
}

export const greenCityHotspots = [
  { x: 520, y: 252, label: "Central water park" },
  { x: 200, y: 252, label: "Botanical garden" },
  { x: 840, y: 252, label: "Indoor sports complex" },
  { x: 365, y: 20, label: "Running track & courts" },
  { x: 685, y: 520, label: "Children's park" },
];
