import { useMemo } from "react";
export default function Petals({ count = 22 }) {
  const petals = useMemo(() => Array.from({ length: count }, () => ({
    left: Math.random() * 100 + "vw",
    transform: `scale(${0.6 + Math.random() * 0.9})`,
    animationDuration: 9 + Math.random() * 9 + "s",
    animationDelay: -Math.random() * 12 + "s",
    "--dx": Math.random() * 160 - 80 + "px",
  })), [count]);
  return petals.map((st, i) => <div key={i} className="petal" style={st} />);
}
