// Indicative exchange rates for the currency toggle. SAMPLE values: replace
// with a dated feed before launch.
export const ratesAsOf = "14 Oct 2026";
export const currencies = [
  { code: "NGN", symbol: "₦", perNaira: 1 },
  { code: "USD", symbol: "$", perNaira: 1 / 1550 },
  { code: "GBP", symbol: "£", perNaira: 1 / 2050 },
  { code: "EUR", symbol: "€", perNaira: 1 / 1780 },
  { code: "CAD", symbol: "C$", perNaira: 1 / 1120 },
];

export function convert(naira, code = "NGN") {
  const c = currencies.find((x) => x.code === code) || currencies[0];
  return naira * c.perNaira;
}

export function money(naira, code = "NGN", { compact = false } = {}) {
  const c = currencies.find((x) => x.code === code) || currencies[0];
  const value = naira * c.perNaira;
  if (compact) {
    const units = [
      [1e9, "bn"],
      [1e6, "m"],
      [1e3, "k"],
    ];
    for (const [size, suffix] of units) {
      if (value >= size) return `${c.symbol}${trim(value / size)}${suffix}`;
    }
  }
  return `${c.symbol}${Math.round(value).toLocaleString("en-NG")}`;
}

function trim(n) {
  return n >= 100 ? Math.round(n).toString() : n.toFixed(1).replace(/\.0$/, "");
}

// Payment plans: SAMPLE terms. Longer plans carry a premium over the outright price.
export const plans = [
  { months: 0, label: "Outright", premium: 0 },
  { months: 6, label: "6 months", premium: 0.05 },
  { months: 12, label: "12 months", premium: 0.1 },
  { months: 24, label: "24 months", premium: 0.2 },
];

export function planFor(price, months, depositRate = 0.3) {
  const plan = plans.find((p) => p.months === months) || plans[0];
  const total = Math.round(price * (1 + plan.premium));
  if (!plan.months) return { total, deposit: total, monthly: 0, months: 0 };
  const deposit = Math.round(total * depositRate);
  const monthly = Math.round((total - deposit) / plan.months);
  return { total, deposit, monthly, months: plan.months };
}
