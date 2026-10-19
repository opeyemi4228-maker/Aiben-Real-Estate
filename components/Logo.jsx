// AIBEN's official logo. "color" is the original artwork for light backgrounds;
// "reversed" turns the grey A and blue IBEN white (red swoosh kept) so it reads
// on dark backgrounds. Swap the PNGs for vector files when AIBEN supplies them.
export default function Logo({ className = "h-8", tone = "color", title = "AIBEN Properties" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={tone === "reversed" ? "/brand/aiben-logo-reversed.png" : "/brand/aiben-logo.png"}
      alt={title}
      width={429}
      height={150}
      className={`w-auto select-none ${className}`}
      draggable={false}
    />
  );
}
