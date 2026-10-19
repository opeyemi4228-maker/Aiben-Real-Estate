import BookingFlow from "@/components/BookingFlow";

export const metadata = { title: "Book an inspection" };

export default async function BookPage({ searchParams }) {
  const { estate, mode } = await searchParams;
  return (
    <div className="bg-sand-2 px-4 pt-40 lg:pt-52 pb-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow text-laterite">Book an inspection</p>
        <h1 className="display on-light mt-3 text-5xl">
          See it <em>for yourself.</em>
        </h1>
        <p className="mt-3 text-muted">Free. On site every Saturday, or by live video from anywhere in the world.</p>
        <div className="mt-10">
          <BookingFlow estate={typeof estate === "string" ? estate : ""} mode={typeof mode === "string" ? mode : "site"} />
        </div>
      </div>
    </div>
  );
}
