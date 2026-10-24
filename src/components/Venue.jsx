import { useEffect, useRef } from "react";
import "./Venue.css";
import FloralDivider from "./FloralDivider";

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    "Green Land Resort, in front of Indian Petrol Pump, Mohaan, Unnao, Uttar Pradesh"
  );

/* Adds class "in" the first time the block scrolls into view -> triggers its animations */
function Block({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { ref.current.classList.add("in"); io.disconnect(); }
      },
      { threshold: 0.18 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={"blk " + className} {...rest}>{children}</Tag>;
}

/* Gold corner ornament */
const Corner = () => (
  <svg viewBox="0 0 60 60" aria-hidden="true">
    <path d="M3 56V14Q3 3 14 3H56M11 56V19Q11 11 19 11H56" />
    <circle cx="3" cy="3" r="2.6" />
    <path d="M21 21l4 4-4 4-4-4z" />
  </svg>
);

/* Animated golden border around the whole page */
const Frame = () => (
  <div className="frame" aria-hidden="true">
    {["tl", "tr", "bl", "br"].map((c) => (
      <span key={c} className={"cn " + c}><Corner /></span>
    ))}
  </div>
);

const d = (s) => ({ "--d": s });

export default function Venue() {
  return (
    <Block as="section" className="royal-invite" id="venue">
      

      {/* ---------- Heading ---------- */}
      <Block className="royal-header">
        <span className="royal-overline rv" style={d(".1s")}>THE WEDDING CELEBRATION</span>
        <div className="royal-flourish rv" style={d(".25s")} aria-hidden="true">
          ✿ <span>✦</span> ✿
        </div>

        <p className="royal-intro rv" style={d(".6s")}>
          Two hearts, two families, one beautiful beginning.
          <br className="desktop-break" /> We would be honoured by your presence.
        </p>

        <p className="couple-caption rv" style={d("1.5s")}>TOGETHER WITH THEIR FAMILIES</p>
      </Block>

      {/* ---------- Venue (arch card) ---------- */}
      <Block className="royal-venue">
        <span className="royal-section-label rv" style={d(".1s")}>THE WEDDING VENUE</span>
        <h3 className="venue-title gold-text rv" style={d(".3s")}>
          Green Land <em>Resort</em>
        </h3>
        <div className="royal-rule rv" style={d(".5s")}>
          <span /><i>✦</i><span />
        </div>

        <div className="venue-location-animation">
          <span className="pin rv" style={d(".7s")} aria-hidden="true">
            <svg viewBox="0 0 24 32"><path d="M12 1C6 1 1.5 5.6 1.5 11.4 1.5 19 12 31 12 31s10.5-12 10.5-19.6C22.5 5.6 18 1 12 1z" /><circle cx="12" cy="11.5" r="4" /></svg>
          </span>
          <p className="royal-landmark rv" style={d(".85s")}>In front of Indian Petrol Pump</p>
          <p className="royal-address rv" style={d(".95s")}>
            Mohaan <span>·</span> Unnao <span>·</span> Uttar Pradesh
          </p>
          <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="royal-map-link rv" style={d("1.15s")}>
            <span>VIEW LOCATION ON MAP</span>
            <span className="royal-map-arrow">↗</span>
          </a>
        </div>
      </Block>
<FloralDivider/>
      {/* ---------- Family invitation ---------- */}
      <Block className="royal-family">
        <span className="family-top-ornament rv" style={d(".1s")} aria-hidden="true">✿</span>
        <span className="family-eyebrow rv" style={d(".25s")}>WITH THE BLESSINGS OF OUR ELDERS</span>
        <h3 className="family-heading rv" style={d(".45s")}>
          Your Presence
          <br />
          <em>Is Our Greatest Blessing</em>
        </h3>
        <p className="royal-family-message rv" style={d(".7s")}>
          Please join us as we celebrate the beginning of Mohd Ayaz and
          Aqsha Fatima  new journey together. Your presence, love and duas
          will make this occasion truly unforgettable.
        </p>
        <div className="royal-signature rv" style={d(".95s")}>
          <span>CORDIALLY INVITED BY</span>
          <p>Ansari Family</p>
          <div className="signature-rule" />
        </div>
        <span className="family-bottom-ornament rv" style={d("1.15s")} aria-hidden="true">✦</span>
      </Block>

      <footer className="royal-footer">
        <span>MADE BEAUTIFUL BY YOUR PRESENCE</span>
      </footer>
    </Block>
  );
}