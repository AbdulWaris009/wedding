
import { useState } from "react";
import "./Intro.css";

function Floral({ className = "" }) {
  return (
    <svg
      className={`floral-art ${className}`}
      viewBox="0 0 240 260"
      fill="none"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        <path d="M8 250C70 190 105 115 135 12" />
        <path d="M36 222C84 216 125 188 154 148" />
        <path d="M70 183C38 165 27 138 34 111C61 132 75 157 70 183Z" fill="currentColor" fillOpacity=".12"/>
        <path d="M104 139C136 128 155 104 160 73C131 85 112 110 104 139Z" fill="currentColor" fillOpacity=".12"/>
        <path d="M39 220C15 201 8 177 15 156C38 173 47 197 39 220Z" fill="currentColor" fillOpacity=".12"/>
        <path d="M130 55C106 46 94 27 95 8C116 19 130 36 130 55Z" fill="currentColor" fillOpacity=".12"/>
        <path d="M135 180C166 175 190 154 203 127C175 133 151 152 135 180Z" fill="currentColor" fillOpacity=".12"/>
      </g>

      <g transform="translate(166 61)" stroke="currentColor" strokeWidth="1.2">
        <ellipse rx="14" ry="33" cy="-23" />
        <ellipse rx="14" ry="33" cy="23" />
        <ellipse rx="33" ry="14" cx="-23" />
        <ellipse rx="33" ry="14" cx="23" />
        <ellipse rx="13" ry="29" transform="rotate(45)" />
        <ellipse rx="13" ry="29" transform="rotate(135)" />
        <circle r="12" fill="currentColor" fillOpacity=".55" />
        <circle r="3.5" fill="currentColor" />
      </g>

      <g transform="translate(84 222) scale(.65)" stroke="currentColor" strokeWidth="1.3">
        <ellipse rx="12" ry="26" cy="-19" />
        <ellipse rx="12" ry="26" cy="19" />
        <ellipse rx="26" ry="12" cx="-19" />
        <ellipse rx="26" ry="12" cx="19" />
        <ellipse rx="11" ry="24" transform="rotate(45)" />
        <ellipse rx="11" ry="24" transform="rotate(-45)" />
        <circle r="9" fill="currentColor" fillOpacity=".6" />
      </g>

      <g fill="currentColor">
        <circle cx="208" cy="110" r="2" />
        <circle cx="222" cy="125" r="1.5" />
        <circle cx="145" cy="112" r="1.5" />
        <circle cx="55" cy="251" r="2" />
        <circle cx="116" cy="40" r="1.5" />
      </g>
    </svg>
  );
}

function Sparkles() {
  return (
    <div className="sparkle-field" aria-hidden="true">
      {Array.from({ length: 28 }, (_, i) => (
        <span
          key={i}
          style={{
            "--x": `${(i * 47 + 9) % 100}%`,
            "--y": `${(i * 31 + 7) % 100}%`,
            "--delay": `${(i % 7) * -0.7}s`,
            "--duration": `${3.4 + (i % 5) * 0.7}s`,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}

export default function Intro({
  first = "Mohd Ayaz",
  second = "Aqsha Fatima",
  onOpen = () => {},
  onDone = () => {},
}) {
  const [go, setGo] = useState(false);
  const [gone, setGone] = useState(false);

  const open = () => {
    if (go) return;

    setGo(true);
    onOpen();

    window.setTimeout(() => {
      setGone(true);
      onDone();
    }, 2600);
  };

  return (
    <div
      id="intro"
      className={`lux-intro ${go ? "is-opening" : ""} ${
        gone ? "is-gone" : ""
      }`}
    >
      <div className="intro-backdrop" />
      <div className="intro-vignette" />

      <Sparkles />

      <Floral className="flower flower-tl" />
      <Floral className="flower flower-tr" />
      <Floral className="flower flower-bl" />
      <Floral className="flower flower-br" />

      <main className="intro-content">
        <div className="intro-topline">
          <span>✦</span>
          <span className="script intro-tag">
            You are invited
          </span>
          <span>✦</span>
        </div>

        <section className="intro-frame">
          <i className="frame-corner corner-tl" />
          <i className="frame-corner corner-tr" />
          <i className="frame-corner corner-bl" />
          <i className="frame-corner corner-br" />

          <p className="intro-kicker">
            A CELEBRATION OF LOVE
          </p>

          <div className="mini-divider">
            <i />✿<i />
          </div>

          <button
            type="button"
            className={`envelope ${go ? "go" : ""}`}
            onClick={open}
            aria-label={`Open invitation for ${first} and ${second}`}
            disabled={go}
          >
            <div className="envelope-shadow" />
            <div className="envelope-back" />

            <div className="letter">
              <div className="letter-inner">
                <span className="letter-kicker">
                  THE WEDDING OF
                </span>

                <span className="letter-name script">
                  {first}
                </span>

                <span className="letter-amp">&amp;</span>

                <span className="letter-name script">
                  {second}
                </span>

                <span className="letter-rule">
                  — ✦ —
                </span>
              </div>
            </div>

            <div className="envelope-left" />
            <div className="envelope-right" />
            <div className="envelope-front" />
            <div className="envelope-flap" />

            <div className="envelope-seal">
              <span className="seal-ring" />
              <span className="seal-monogram script">
                {(first || "A")[0]}
                {(second || "A")[0]}
              </span>
              <span className="seal-flower">✿</span>
            </div>
          </button>

          <h1 className="intro-title">
            <span className="script">{first}</span>
            <span className="title-weds">W E D S</span>
            <span className="script">{second}</span>
          </h1>

          <p className="intro-subtitle">
            Two hearts. One beautiful beginning.
          </p>

          <button
            type="button"
            className="open-cta"
            onClick={open}
            disabled={go}
          >
            <span>✧</span>
            <span>
              {go
                ? "Opening your invitation"
                : "Open the invitation"}
            </span>
            <span>↗</span>
          </button>

          <p className="tap-hint">
            {go
              ? "A little moment of magic..."
              : "TAP THE ENVELOPE OR SEAL TO BEGIN"}
          </p>
        </section>

        <p className="intro-footer">
          MADE WITH LOVE <span>✦</span> FOR A DAY TO REMEMBER
        </p>
      </main>
    </div>
  );
}
