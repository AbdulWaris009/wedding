import { useEffect, useMemo } from "react";
// Gold burst at (x, y). Calls onEnd after the animation.
export default function Sparkles({ x, y, onEnd }) {
  const sparks = useMemo(() => Array.from({ length: 36 }, () => {
    const a = Math.random() * 6.28, r = 60 + Math.random() * 130;
    return { left: x, top: y, "--x": Math.cos(a) * r + "px", "--y": Math.sin(a) * r + "px" };
  }), [x, y]);
  useEffect(() => { const t = setTimeout(onEnd, 1300); return () => clearTimeout(t); }, [onEnd]);
  return sparks.map((st, i) => <div key={i} className="spark" style={st} />);
}
