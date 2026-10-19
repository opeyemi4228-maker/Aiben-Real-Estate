// The red arc from the AIBEN logo, used as the site's signature mark.
// `animate` draws it in on mount, after `delay` ms; `weight` is the stroke width.
export default function Swoosh({ className = "w-14", animate = false, delay = 0, weight = 4 }) {
  return (
    <svg
      viewBox="0 0 120 24"
      fill="none"
      aria-hidden="true"
      className={`swoosh ${animate ? "swoosh-animate" : ""} shrink-0 text-aiben-red ${className}`}
      style={delay ? { "--swoosh-delay": `${delay}ms` } : undefined}
    >
      <path d="M2 21 C 34 2, 74 -2, 118 15" stroke="currentColor" strokeWidth={weight} strokeLinecap="round" pathLength="1" />
    </svg>
  );
}
