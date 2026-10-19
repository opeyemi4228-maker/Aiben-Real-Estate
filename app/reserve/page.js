import ReserveFlow from "@/components/ReserveFlow";

export const metadata = { title: "Reserve" };

export default async function ReservePage({ searchParams }) {
  const sp = await searchParams;
  const str = (k) => (typeof sp[k] === "string" ? sp[k] : "");
  return (
    <div className="bg-sand-2 px-4 pt-40 lg:pt-52 pb-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow text-laterite">Reserve online · mock-up</p>
        <h1 className="display on-light mt-3 text-5xl">
          Hold it <em>today.</em>
        </h1>
        <div className="mt-10">
          <ReserveFlow slug={str("estate")} unit={Number(str("unit")) || 0} plot={str("plot")} months={str("months") === "" ? undefined : Number(str("months"))} />
        </div>
      </div>
    </div>
  );
}
