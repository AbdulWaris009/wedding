import { useMemo } from "react";
// Gold arch + crown + roses drawn as SVG
export default function ArchRoses() {
  const { roses, dots } = useMemo(() => {
    const roses = [], dots = [];
    const add = (x, y, r, pink) => roses.push({ x, y, r, pink });
    for (let i = 0; i <= 46; i++) {
      const a = Math.PI + (Math.PI * i) / 46;
      add(200 + 140 * Math.cos(a) + (Math.random() * 16 - 8), 330 + 180 * Math.sin(a) + (Math.random() * 16 - 8), 13 + Math.random() * 10, Math.random() < 0.3);
    }
    for (let j = 0; j < 14; j++) {
      const y = 340 + j * 22;
      add(60 + (Math.random() * 18 - 9), y, 11 + Math.random() * 7, Math.random() < 0.35);
      add(340 + (Math.random() * 18 - 9), y, 11 + Math.random() * 7, Math.random() < 0.35);
    }
    for (let k = 0; k < 60; k++) {
      const b = Math.PI + Math.PI * Math.random();
      dots.push({ x: 200 + 150 * Math.cos(b) + (Math.random() * 20 - 10), y: 330 + 190 * Math.sin(b) + (Math.random() * 20 - 10), r: 1.5 + Math.random() * 2 });
    }
    return { roses, dots };
  }, []);

  return (
    <svg id="arch" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f6e3a8" /><stop offset=".5" stopColor="#b8924f" /><stop offset="1" stopColor="#e9cf8a" /></linearGradient>
        <radialGradient id="rr"><stop offset="0" stopColor="#ff5a5a" /><stop offset="1" stopColor="#8f0f1e" /></radialGradient>
        <radialGradient id="rp"><stop offset="0" stopColor="#fff0ee" /><stop offset="1" stopColor="#f0a3ad" /></radialGradient>
      </defs>
      <path d="M60 640 L60 330 A140 180 0 0 1 340 330 L340 640" fill="none" stroke="url(#gg)" strokeWidth="6" />
      <path d="M200 150 C185 120 170 110 150 118 C170 100 190 95 200 52 C210 95 230 100 250 118 C230 110 215 120 200 150Z" fill="url(#gg)" />
      <path d="M105 200 C130 140 175 128 200 150 C225 128 270 140 295 200" fill="none" stroke="url(#gg)" strokeWidth="3" />
      {roses.map((o, i) => {
        const line = o.pink ? "#d9808c" : "#5c0713";
        return (
          <g key={i}>
            <circle cx={o.x} cy={o.y} r={o.r} fill={`url(#${o.pink ? "rp" : "rr"})`} />
            <circle cx={o.x} cy={o.y} r={o.r * 0.6} fill="none" stroke={line} strokeWidth="1.4" />
            <circle cx={o.x} cy={o.y} r={o.r * 0.28} fill="none" stroke={line} strokeWidth="1.2" />
          </g>
        );
      })}
      {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#fff2e6" opacity=".85" />)}
    </svg>
  );
}
