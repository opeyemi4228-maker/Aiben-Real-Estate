import EstatesExplorer from "@/components/EstatesExplorer";

export const metadata = { title: "Estates" };

export default async function EstatesPage({ searchParams }) {
  const sp = await searchParams;
  const pick = (k) => (typeof sp[k] === "string" ? sp[k] : "");
  return (
    <div className="bg-sand-2 px-4 pt-36 lg:pt-48 pb-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow text-laterite">Estates</p>
        <h1 className="display on-light mt-3 text-5xl sm:text-6xl">
          Every estate, <em>one map.</em>
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Land, homes and commercial space across Abuja and Lagos. Every card shows a starting price and how long you can take to pay.
        </p>
        <div className="mt-8">
          <EstatesExplorer key={JSON.stringify(sp)} initial={{ city: pick("city"), type: pick("type"), budget: pick("budget"), exp: pick("exp") }} />
        </div>
      </div>
    </div>
  );
}
