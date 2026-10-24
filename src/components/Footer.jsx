import Reveal from "./Reveal.jsx";
export default function Footer({ family, rsvp }) {
  return (
    <Reveal as="footer">
      <div className="script gold" style={{ fontSize: 34 }}>{family}</div>
      <p>{rsvp}</p>
    </Reveal>
  );
}
