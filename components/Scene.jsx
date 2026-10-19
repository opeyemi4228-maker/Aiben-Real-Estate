// Procedural placeholder imagery in one golden-hour grade, so the concept has a
// consistent image direction before AIBEN's own renders and drone footage
// arrive. Pure function (no hooks): safe in server and client components.
//
// kind:     estate | tower | land | park | lake | mountain | mall | interior
// time:     day | dusk | night
// progress: 0..1, how much of the estate is built (for "Watch your land grow")

const skies = {
  day: ["#8fb3c9", "#c9d8d8", "#efe2c6"],
  dusk: ["#2a2130", "#7d3a26", "#d2a866", "#f1d7a1"],
  night: ["#07080f", "#141522", "#2a2230"],
};

const grounds = {
  day: ["#6f7f55", "#55684a", "#3f4f39"],
  dusk: ["#4a3a2a", "#352a20", "#211b16"],
  night: ["#17161a", "#121116", "#0c0b0f"],
};

function rng(seed) {
  let a = (seed * 9301 + 49297) >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hill(r, base, amp, w = 1600) {
  let d = `M0 ${base}`;
  const steps = 8;
  for (let i = 1; i <= steps; i++) {
    const x = (w / steps) * i;
    const y = base - r() * amp;
    const cx = x - w / steps / 2;
    d += ` Q${cx} ${y - amp * 0.4} ${x} ${y}`;
  }
  return `${d} L${w} 900 L0 900 Z`;
}

function windowFill(time, r) {
  if (time === "night") return r() > 0.25 ? "#f3c97a" : "#2a2530";
  if (time === "dusk") return r() > 0.6 ? "#f6d38c" : "#3a2b25";
  return "#9fb5bf";
}

function House({ x, y, w, h, time, r, scale = 1 }) {
  const roof = time === "day" ? "#5a3a2b" : time === "dusk" ? "#2b201b" : "#0f0e12";
  const wall = time === "day" ? "#e9dfcf" : time === "dusk" ? "#8a6a4e" : "#24212a";
  const wy = y - h * scale;
  return (
    <g>
      <rect x={x} y={wy} width={w} height={h * scale} fill={wall} />
      <path d={`M${x - 8} ${wy} L${x + w / 2} ${wy - w * 0.35 * scale} L${x + w + 8} ${wy} Z`} fill={roof} />
      {scale > 0.6 &&
        [0.2, 0.6].map((fx) => (
          <rect key={fx} x={x + w * fx} y={wy + h * 0.25} width={w * 0.2} height={h * 0.25} fill={windowFill(time, r)} />
        ))}
    </g>
  );
}

function Tower({ x, w, h, time, r, ground = 760 }) {
  const body = time === "day" ? "#c9c3b8" : time === "dusk" ? "#5a4536" : "#1b1a21";
  const cols = Math.max(3, Math.floor(w / 18));
  const rows = Math.floor(h / 26);
  const cells = [];
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      cells.push(
        <rect key={`${i}-${j}`} x={x + 6 + j * ((w - 12) / cols)} y={ground - h + 10 + i * 26} width={(w - 12) / cols - 5} height={14} fill={windowFill(time, r)} opacity={0.9} />,
      );
  return (
    <g>
      <rect x={x} y={ground - h} width={w} height={h} fill={body} />
      {cells}
    </g>
  );
}

function Tree({ x, y, s, time }) {
  const leaf = time === "day" ? "#4a6248" : time === "dusk" ? "#2c3326" : "#111511";
  return (
    <g>
      <rect x={x - 2 * s} y={y - 18 * s} width={4 * s} height={18 * s} fill="#2a1f18" />
      <ellipse cx={x} cy={y - 30 * s} rx={16 * s} ry={20 * s} fill={leaf} />
    </g>
  );
}

function Crane({ x, ground, time }) {
  const c = time === "night" ? "#3a3440" : "#d2a866";
  return (
    <g stroke={c} strokeWidth="4" fill="none">
      <path d={`M${x} ${ground} V${ground - 340} M${x - 60} ${ground - 330} H${x + 200} M${x + 160} ${ground - 330} V${ground - 250}`} />
      <path d={`M${x} ${ground - 340} L${x - 60} ${ground - 330} M${x} ${ground - 340} L${x + 200} ${ground - 330}`} strokeWidth="2" />
    </g>
  );
}

export default function Scene({ src, kind = "estate", time = "dusk", seed = 1, progress = 1, className = "", title, label = true, position = "center" }) {
  // A real AIBEN photograph or render, when we have one.
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={title || ""} title={title} loading="lazy" decoding="async" className={`object-cover ${className}`} style={{ objectPosition: position }} />
    );
  }
  const r = rng(seed);
  const id = `s-${kind}-${time}-${seed}`;
  const sky = skies[time];
  const ground = grounds[time];
  const horizon = 640;
  const stars = time === "night" ? Array.from({ length: 70 }, () => [r() * 1600, r() * 420, r() * 1.6 + 0.4]) : [];
  const built = Math.max(0, Math.min(1, progress));

  let subject = null;
  if (kind === "interior") {
    subject = <Interior time={time} id={id} />;
  } else {
    const items = [];
    if (kind === "mountain" || kind === "lake") {
      const rock = time === "day" ? "#7c6a5a" : time === "dusk" ? "#3d2c25" : "#141218";
      items.push(
        <path key="rock" d="M820 640 C860 420 960 300 1080 290 C1210 285 1290 400 1330 640 Z" fill={rock} />,
        <path key="rock2" d="M1240 640 C1270 520 1330 470 1400 480 C1470 490 1520 560 1560 640 Z" fill={rock} opacity="0.85" />,
      );
    }
    if (kind === "lake") {
      items.push(
        <rect key="lake" x="0" y={horizon + 20} width="1600" height="140" fill={`url(#${id}-water)`} />,
      );
    }
    if (kind === "tower") {
      const n = 5;
      for (let i = 0; i < n; i++) {
        const h = (200 + r() * 360) * (i === 2 ? 1.35 : 1);
        const show = (i + 1) / n <= built + 0.001;
        if (show) items.push(<Tower key={`t${i}`} x={260 + i * 230} w={130 + r() * 50} h={h} time={time} r={r} />);
      }
      if (built < 1) items.push(<Crane key="crane" x={1300} ground={760} time={time} />);
    }
    if (kind === "mall") {
      items.push(
        <g key="mall">
          <rect x="300" y="560" width="1000" height="200" fill={time === "day" ? "#d8cdbb" : time === "dusk" ? "#6b5240" : "#1d1b22"} />
          <rect x="300" y="540" width="1000" height="22" fill={time === "night" ? "#9a4524" : "#9a4524"} />
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x={330 + i * 80} y="610" width="56" height="120" fill={time === "day" ? "#9fb5bf" : "#f3c97a"} opacity={time === "day" ? 0.8 : 0.85} />
          ))}
        </g>,
      );
    }
    if (kind === "estate" || kind === "park" || kind === "lake" || kind === "mountain") {
      const count = kind === "estate" ? 9 : 6;
      for (let i = 0; i < count; i++) {
        const x = 120 + i * (1400 / count) + r() * 30;
        const w = 90 + r() * 50;
        const h = 70 + r() * 50;
        const stage = Math.max(0, Math.min(1, built * count - i));
        if (stage > 0) items.push(<House key={`h${i}`} x={x} y={kind === "lake" ? horizon + 10 : 770} w={w} h={h} time={time} r={r} scale={0.3 + stage * 0.7} />);
      }
      if (built < 1) items.push(<Crane key="crane" x={1180} ground={770} time={time} />);
    }
    if (kind === "land") {
      const line = time === "night" ? "#3a3440" : "#d2a866";
      const rows = [];
      for (let i = 0; i < 6; i++) rows.push(<path key={`r${i}`} d={`M${800 - i * 260} 900 L${800 - i * 30} ${horizon + 20}`} stroke={line} strokeOpacity="0.45" strokeWidth="2" />);
      for (let i = 0; i < 6; i++) rows.push(<path key={`l${i}`} d={`M${800 + i * 260} 900 L${800 + i * 30} ${horizon + 20}`} stroke={line} strokeOpacity="0.45" strokeWidth="2" />);
      for (let i = 0; i < 5; i++) rows.push(<path key={`c${i}`} d={`M0 ${horizon + 40 + i * i * 14} H1600`} stroke={line} strokeOpacity="0.3" strokeWidth="1.5" />);
      items.push(<g key="grid">{rows}</g>);
      for (let i = 0; i < 8; i++) items.push(<rect key={`p${i}`} x={180 + i * 170} y={horizon + 60 + (i % 3) * 30} width="4" height="22" fill="#9a4524" />);
    }
    const trees = [];
    const treeCount = kind === "park" ? 22 : 10;
    for (let i = 0; i < treeCount; i++) trees.push(<Tree key={`tr${i}`} x={r() * 1600} y={790 + r() * 90} s={0.8 + r() * 1.2} time={time} />);
    subject = (
      <>
        {items}
        {trees}
      </>
    );
  }

  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={title || `Placeholder artist's impression: ${kind} at ${time}`}
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          {sky.map((c, i) => (
            <stop key={c} offset={i / (sky.length - 1)} stopColor={c} />
          ))}
        </linearGradient>
        <radialGradient id={`${id}-sun`}>
          <stop offset="0" stopColor={time === "night" ? "#f4ecd8" : "#fff2cf"} />
          <stop offset="0.35" stopColor={time === "night" ? "#d9d2c0" : "#f1c37a"} stopOpacity="0.9" />
          <stop offset="1" stopColor="#d2a866" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={time === "night" ? "#1c1b26" : time === "dusk" ? "#b7774a" : "#7fa3b5"} />
          <stop offset="1" stopColor={time === "night" ? "#0a0a10" : time === "dusk" ? "#3a2a24" : "#4d6f7c"} />
        </linearGradient>
        <linearGradient id={`${id}-haze`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.5" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#1f1b17" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#${id}-sky)`} />
      {stars.map(([x, y, s], i) => (
        <circle key={i} cx={x} cy={y} r={s} fill="#f4ecd8" opacity={0.4 + (i % 5) * 0.12} />
      ))}
      {time === "dusk" && <circle cx="560" cy="560" r="260" fill={`url(#${id}-sun)`} />}
      {time === "day" && <circle cx="1250" cy="170" r="160" fill={`url(#${id}-sun)`} opacity="0.7" />}
      {time === "night" && <circle cx="1280" cy="150" r="70" fill={`url(#${id}-sun)`} />}
      {kind !== "interior" && (
        <>
          <path d={hill(r, 610, 90)} fill={ground[0]} opacity="0.75" />
          <path d={hill(r, 680, 60)} fill={ground[1]} />
          {subject}
          <path d={hill(r, 860, 30)} fill={ground[2]} />
        </>
      )}
      {kind === "interior" && subject}
      <rect width="1600" height="900" fill={`url(#${id}-haze)`} />
      {label && (
        <text x="1570" y="870" textAnchor="end" fontSize="20" fill="#efe7da" opacity="0.75" fontFamily="system-ui, sans-serif" letterSpacing="2">
          PLACEHOLDER · ARTIST&apos;S IMPRESSION
        </text>
      )}
    </svg>
  );
}

function Interior({ time, id }) {
  const wall = time === "night" ? "#1d1a1f" : "#3a2c22";
  const floor = time === "night" ? "#14110f" : "#5a4030";
  const lamp = time === "night";
  return (
    <g>
      <rect width="1600" height="900" fill={wall} />
      <rect x="380" y="120" width="840" height="520" fill={`url(#${id}-sky)`} />
      <circle cx="800" cy="520" r="200" fill={`url(#${id}-sun)`} opacity={time === "night" ? 0.3 : 0.9} />
      <path d="M380 560 Q600 500 800 540 T1220 520 V640 H380 Z" fill="#2b221c" opacity="0.8" />
      <path d="M800 120 V640 M380 380 H1220" stroke="#1a1512" strokeWidth="14" />
      <rect x="380" y="120" width="840" height="520" fill="none" stroke="#1a1512" strokeWidth="22" />
      <path d="M0 700 L1600 700 L1600 900 L0 900 Z" fill={floor} />
      <path d="M380 640 L200 900 M1220 640 L1400 900" stroke="#d2a866" strokeOpacity="0.15" strokeWidth="3" />
      <rect x="540" y="640" width="520" height="90" rx="20" fill="#6b4a36" />
      <rect x="520" y="600" width="560" height="60" rx="24" fill="#7a573f" />
      <rect x="700" y="760" width="200" height="16" rx="8" fill="#9a4524" opacity="0.8" />
      {lamp && <circle cx="1350" cy="420" r="120" fill="#f3c97a" opacity="0.18" />}
      <rect x="1330" y="420" width="40" height="280" fill="#2a1f18" />
      <path d="M1290 420 L1410 420 L1380 340 L1320 340 Z" fill={lamp ? "#f3c97a" : "#cdbb9c"} />
    </g>
  );
}
