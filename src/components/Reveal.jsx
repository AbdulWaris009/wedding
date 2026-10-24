import { useEffect, useRef } from "react";
// Fades a block in when it scrolls into view
export default function Reveal({ as: Tag = "section", children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && ref.current.classList.add("on"),
      { threshold: 0.15 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className="reveal" {...rest}>{children}</Tag>;
}
