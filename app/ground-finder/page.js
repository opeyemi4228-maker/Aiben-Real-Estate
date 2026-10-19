import GroundFinder from "@/components/GroundFinder";

export const metadata = { title: "Ground Finder", description: "Three questions, then a shortlist of AIBEN estates with a payment plan for each." };

export default async function GroundFinderPage({ searchParams }) {
  const { purpose } = await searchParams;
  return (
    <div className="min-h-[100svh] bg-soil px-4 pt-40 lg:pt-52 pb-24 text-sand sm:px-6">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow text-gold">Ground Finder</p>
        <p className="mt-2 max-w-xl text-sand/70">Three questions. Thirty seconds. A shortlist with a payment plan for each estate.</p>
        <div className="mt-10">
          <GroundFinder key={purpose || "none"} initialPurpose={typeof purpose === "string" ? purpose : ""} />
        </div>
      </div>
    </div>
  );
}
