import { useEffect, useId, useMemo, useRef } from "react";
import "./FloralDivider.css";

/* ---------- theme colours (burgundy / red / blush + gold) ---------- */
const TONES = {
  wine: { petal: ["#33040f", "#7a1228", "#c53a52"], vein: "rgba(255,205,190,.38)" },
  red:  { petal: ["#5f0c1f", "#b0213a", "#ee6679"], vein: "rgba(255,215,200,.4)" },
};
const ROSES = {
  red:   { c: ["#ff6f80", "#8f1d33"], line: "rgba(45,0,12,.5)" },
  wine:  { c: ["#cf4a62", "#450915"], line: "rgba(30,0,8,.55)" },
  blush: { c: ["#fff0f1", "#e78d9b"], line: "rgba(160,60,80,.5)" },
};
const GOLD = "#e3c46f";
const LEAVES = ["#a9bd9b|#6f8868", "#97ae8a|#5b7552", "#b4c4a8|#7d9674"];

/* ---------- helpers ---------- */
// Eucalyptus sprig: leaves + gold berries along a curved stem (deterministic)
function sprig(x0, y0, xc, yc, x1, y1, n) {
  const leaves = [], berries = [];
  for (let i = 0; i < n; i++) {
    const t = 0.1 + (0.9 * i) / (n - 1);
    const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * xc + t * t * x1;
    const y = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * yc + t * t * y1;
    const dx = 2 * (1 - t) * (xc - x0) + 2 * t * (x1 - xc);
    const dy = 2 * (1 - t) * (yc - y0) + 2 * t * (y1 - yc);
    const a = (Math.atan2(dy, dx) * 180) / Math.PI;
    const s = 1.15 - t * 0.55;
    leaves.push({ x, y, rot: a - 52, s, k: i % 3 });
    leaves.push({ x, y, rot: a + 52, s: s * 0.92, k: (i + 1) % 3 });
    if (i % 2 === 1) {
      const m = Math.hypot(dx, dy) || 1, side = i % 4 === 1 ? 1 : -1;
      berries.push({ x: x + (-dy / m) * 11 * side, y: y + (dx / m) * 11 * side, r: 1.8 + (i % 3) * 0.5 });
    }
  }
  leaves.push({ x: x1, y: y1, rot: (Math.atan2(y1 - yc, x1 - xc) * 180) / Math.PI, s: 0.5, k: 1 });
  return { d: `M${x0} ${y0}Q${xc} ${yc} ${x1} ${y1}`, leaves, berries };
}

const STAMENS = [[-24, -52], [-11, -61], [2, -65], [14, -59], [26, -50]];
const PETALS = [
  { r: -76, s: 0.82, b: 1 }, { r: 76, s: 0.82, b: 1 },
  { r: -48, s: 0.95, b: 1 }, { r: 48, s: 0.95, b: 1 },
  { r: -20, s: 1, b: 0 }, { r: 20, s: 1, b: 0 }, { r: 0, s: 1.07, b: 0 },
];

/* ---------- component ---------- */
/**
 * Place BETWEEN two sections:  <SectionA/> <FloralDivider/> <SectionB/>
 * It overlaps half of its height into each neighbour, so the gold line sits exactly on the seam
 * and the flowers bloom across both pages. Give each neighbour ~70px of padding at that edge.
 */
export default function FloralDivider({ height = 170, className = "" }) {
  const ref = useRef(null);
  const uid = useId().replace(/:/g, "");
  const id = (n) => `${n}${uid}`;

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { ref.current.classList.add("in"); io.disconnect(); } },
      { threshold: 0.35 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const upper = useMemo(() => [-1, 1].map((d) => sprig(300 + d * 52, 78, 300 + d * 150, 40, 300 + d * 285, 54, 9)), []);
  const lower = useMemo(() => [-1, 1].map((d) => sprig(300 + d * 46, 82, 300 + d * 110, 118, 300 + d * 215, 126, 6)), []);

  const Sprig = ({ data, side, delay }) => (
    <g className={`fd-sprig ${side < 0 ? "l" : "r"}`} style={{ "--d": delay }}>
      <path d={data.d} fill="none" stroke="#6f8868" strokeWidth="1.3" strokeLinecap="round" />
      {data.leaves.map((l, i) => (
        <path key={i} d="M0 0C5 -10 20 -10 25 0C20 10 5 10 0 0Z" fill={`url(#${id("lf")}${l.k})`}
          transform={`translate(${l.x} ${l.y}) rotate(${l.rot}) scale(${l.s})`} />
      ))}
      {data.berries.map((b, i) => <circle key={"b" + i} cx={b.x} cy={b.y} r={b.r} fill={GOLD} stroke="rgba(120,80,20,.5)" strokeWidth=".4" />)}
    </g>
  );

  const Lily = ({ x, y, s, rot = 0, delay, tone = "red" }) => (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <g className="fd-lily" style={{ "--d": delay }}>
        {PETALS.map((p, i) => (
          <use key={i} href={`#${id("pt-" + tone)}`} className={p.b ? "fd-back" : ""} transform={`rotate(${p.r}) scale(${p.s})`} />
        ))}
        {STAMENS.map(([sx, sy], i) => (
          <g key={i}>
            <path d={`M0 -4Q${sx * 0.3} -32 ${sx} ${sy}`} fill="none" stroke={GOLD} strokeWidth=".9" />
            <ellipse cx={sx} cy={sy} rx="2.2" ry="5.2" fill={GOLD} stroke="#a67c37" strokeWidth=".5" transform={`rotate(${sx * 1.3} ${sx} ${sy})`} />
          </g>
        ))}
        <circle r="3" cy="-3" fill={GOLD} />
      </g>
    </g>
  );

  const Rose = ({ x, y, r, tone, delay }) => {
    const l = ROSES[tone].line;
    return (
      <g transform={`translate(${x} ${y})`}>
        <g className="fd-rose" style={{ "--d": delay }}>
          <circle r={r} fill={`url(#${id("rs-" + tone)})`} stroke="rgba(255,225,200,.4)" strokeWidth=".6" />
          <circle r={r * 0.68} fill="none" stroke={l} strokeWidth="1" />
          <path d={`M${-r * 0.62} ${r * 0.12}C${-r * 0.5} ${-r * 0.75} ${r * 0.55} ${-r * 0.75} ${r * 0.62} ${r * 0.12}`} fill="none" stroke={l} strokeWidth="1" />
          <path d={`M${-r * 0.32} ${r * 0.05}C${-r * 0.26} ${-r * 0.42} ${r * 0.3} ${-r * 0.42} ${r * 0.28} ${r * 0.02}C${r * 0.2} ${r * 0.32} ${-r * 0.2} ${r * 0.32} ${-r * 0.32} ${r * 0.05}Z`} fill="none" stroke={l} strokeWidth="1" />
        </g>
      </g>
    );
  };

  const Bud = ({ x, y, rot, s = 1, delay }) => (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <g className="fd-lily" style={{ "--d": delay }}>
        <path d="M0 0V8" stroke="#6f8868" strokeWidth="1.4" />
        <path d="M0 0C-8 -9 -9 -26 0 -40C9 -26 8 -9 0 0Z" fill={`url(#${id("pg-wine")})`} stroke="rgba(227,196,111,.5)" strokeWidth=".6" />
        <path d="M0 -4C-3 -14 -3 -24 0 -34" fill="none" stroke="rgba(255,205,190,.4)" strokeWidth=".7" />
        <path d="M-5 2C-8 -2 -8 -8 -6 -12M5 2C8 -2 8 -8 6 -12" fill="none" stroke="#6f8868" strokeWidth="1.2" />
      </g>
    </g>
  );

  return (
    <div ref={ref} className={"fd " + className} style={{ "--fd-h": height + "px" }} aria-hidden="true">
      <div className="fd-lines"><i className="main" /><i className="thin" /></div>
      <svg className="fd-svg" viewBox="0 0 600 160" preserveAspectRatio="xMidYMid meet">
        <defs>
          {Object.entries(TONES).map(([k, t]) => (
            <g key={k}>
              <linearGradient id={id("pg-" + k)} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor={t.petal[0]} /><stop offset=".55" stopColor={t.petal[1]} /><stop offset="1" stopColor={t.petal[2]} />
              </linearGradient>
              <g id={id("pt-" + k)}>
                <path d="M0 0C-17 -18 -23 -50 0 -80C23 -50 17 -18 0 0Z" fill={`url(#${id("pg-" + k)})`} stroke="rgba(227,196,111,.55)" strokeWidth=".8" />
                <path d="M0 -6V-62" stroke={t.vein} strokeWidth=".8" fill="none" />
              </g>
            </g>
          ))}
          {Object.entries(ROSES).map(([k, t]) => (
            <radialGradient key={k} id={id("rs-" + k)} cx=".4" cy=".35" r=".8">
              <stop offset="0" stopColor={t.c[0]} /><stop offset="1" stopColor={t.c[1]} />
            </radialGradient>
          ))}
          {LEAVES.map((c, i) => {
            const [a, b] = c.split("|");
            return (
              <linearGradient key={i} id={`${id("lf")}${i}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} />
              </linearGradient>
            );
          })}
        </defs>

        {/* foliage */}
        <Sprig data={lower[0]} side={-1} delay=".9s" /><Sprig data={lower[1]} side={1} delay=".9s" />
        <Sprig data={upper[0]} side={-1} delay=".7s" /><Sprig data={upper[1]} side={1} delay=".7s" />

        {/* buds at the tips */}
        <Bud x={44} y={86} rot={-28} s={0.95} delay="1.6s" /><Bud x={556} y={86} rot={28} s={0.95} delay="1.6s" />
        <Bud x={84} y={80} rot={-12} s={0.75} delay="1.5s" /><Bud x={516} y={80} rot={12} s={0.75} delay="1.5s" />

        {/* small + mid lilies (red) */}
        <Lily x={124} y={86} s={0.42} rot={-10} delay="1.3s" tone="red" />
        <Lily x={476} y={86} s={0.42} rot={10} delay="1.3s" tone="red" />
        <Lily x={206} y={84} s={0.66} rot={-9} delay="1.05s" tone="red" />
        <Lily x={394} y={84} s={0.66} rot={9} delay="1.05s" tone="red" />

        {/* roses */}
        <Rose x={160} y={92} r={11} tone="wine" delay="1.5s" /><Rose x={440} y={92} r={11} tone="wine" delay="1.5s" />
        <Rose x={252} y={94} r={10} tone="red" delay="1.35s" /><Rose x={348} y={94} r={10} tone="red" delay="1.35s" />
        <Rose x={92} y={94} r={8} tone="blush" delay="1.7s" /><Rose x={508} y={94} r={8} tone="blush" delay="1.7s" />

        {/* main burgundy lily */}
        <Lily x={300} y={84} s={1.1} delay=".4s" tone="wine" />
      </svg>
    </div>
  );
}