import Reveal from "./Reveal.jsx";
export default function Message({ message, first, second }) {
  return (
    <Reveal>
      <h2 className="script gold">Beautiful Beginning</h2>
      <p>{message}</p>
      <div className="divider" />
      <div className="script" style={{ fontSize: 36 }}>{first} &amp; {second}</div>
    </Reveal>
  );
}
