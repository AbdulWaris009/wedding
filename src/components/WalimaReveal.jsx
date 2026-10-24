
import { useCallback, useEffect, useRef, useState } from "react";
import "./WalimaReveal.css";

const WALIMA_DATE = new Date("2026-11-13T19:00:00+05:30").getTime();

const pad = (value) => String(value).padStart(2, "0");

function getTimeLeft() {
  const difference = Math.max(0, WALIMA_DATE - Date.now());

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference % 86400000) / 3600000),
    minutes: Math.floor((difference % 3600000) / 60000),
    seconds: Math.floor((difference % 60000) / 1000),
    expired: difference === 0,
  };
}

function FloralOrnament({ className = "" }) {
  return (
    <svg
      className={`walima-floral ${className}`}
      viewBox="0 0 150 150"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="#dfbd7b" strokeWidth="1.15" strokeLinecap="round">
        <path d="M5 145C36 115 48 76 145 5" />
        <path d="M29 119C9 105 8 88 22 77C42 88 43 106 29 119Z" />
        <path d="M48 94C37 72 46 56 63 53C76 73 66 87 48 94Z" />
        <path d="M81 66C72 45 83 30 99 28C110 46 99 61 81 66Z" />
        <path d="M106 42C106 24 119 15 134 20C136 37 122 45 106 42Z" />
        <path d="M19 132C44 124 59 132 62 147" />
      </g>
      <g fill="#76263b" stroke="#e5c787" strokeWidth="1">
        <ellipse cx="20" cy="69" rx="7" ry="13" transform="rotate(-35 20 69)" />
        <ellipse cx="9" cy="81" rx="7" ry="13" transform="rotate(-70 9 81)" />
        <ellipse cx="29" cy="84" rx="7" ry="13" transform="rotate(20 29 84)" />
        <ellipse cx="20" cy="93" rx="7" ry="13" transform="rotate(60 20 93)" />
        <circle cx="20" cy="82" r="4" fill="#f2d59a" />
        <ellipse cx="126" cy="12" rx="6" ry="11" transform="rotate(25 126 12)" />
        <ellipse cx="139" cy="24" rx="6" ry="11" transform="rotate(70 139 24)" />
        <ellipse cx="128" cy="34" rx="6" ry="11" transform="rotate(130 128 34)" />
        <ellipse cx="115" cy="24" rx="6" ry="11" transform="rotate(-25 115 24)" />
        <circle cx="127" cy="24" r="3.5" fill="#f2d59a" />
      </g>
      <g fill="#e8c987">
        <path d="M74 28l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z" />
        <circle cx="58" cy="113" r="2" />
        <circle cx="95" cy="77" r="2" />
        <circle cx="39" cy="128" r="1.5" />
      </g>
    </svg>
  );
}

function ScratchReveal({ onReveal }) {
  const canvasRef = useRef(null);
  const revealRef = useRef(onReveal);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    revealRef.current = onReveal;
  }, [onReveal]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let isScratching = false;
    let completed = false;
    let lastCheck = 0;
    let width = 0;
    let height = 0;

    const paint = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);

      // Reset transform before drawing at the current device scale.
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.globalCompositeOperation = "source-over";

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#a67c3c");
      gradient.addColorStop(0.22, "#f5e4b8");
      gradient.addColorStop(0.48, "#cba45f");
      gradient.addColorStop(0.72, "#f7eac8");
      gradient.addColorStop(1, "#a77d40");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Fine ornamental texture.
      ctx.globalAlpha = 0.18;
      ctx.strokeStyle = "#fff5d9";
      ctx.lineWidth = 1;

      for (let x = -height; x < width + height; x += 14) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + height, height);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.fillStyle = "#593817";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "22px 'Cormorant Garamond', serif";
      ctx.fillText("✦  Scratch to unveil  ✦", width / 2, height / 2);

      ctx.fillStyle = "#694821";
      ctx.font = "9px Manrope, sans-serif";
      ctx.fillText("A SPECIAL MOMENT AWAITS", width / 2, height / 2 + 24);
    };

    const scratch = (event) => {
      if (!isScratching || completed) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 23, 0, Math.PI * 2);
      ctx.fill();

      if (Date.now() - lastCheck < 180) return;
      lastCheck = Date.now();

      // Sample alpha pixels to estimate how much of the layer is cleared.
      const pixels = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;

      const step = 32;
      let transparent = 0;
      let total = 0;

      for (let i = 3; i < pixels.length; i += step) {
        total++;
        if (pixels[i] < 40) transparent++;
      }

      if (total > 0 && transparent / total > 0.42) {
        completed = true;
        setRevealed(true);
        revealRef.current?.();
      }
    };

    const onPointerDown = (event) => {
      if (completed) return;
      isScratching = true;
      canvas.setPointerCapture?.(event.pointerId);
      scratch(event);
    };

    const onPointerUp = () => {
      isScratching = false;
    };

    paint();

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", scratch);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    const resizeObserver = new ResizeObserver(() => {
      if (!completed) paint();
    });
    resizeObserver.observe(canvas);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", scratch);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className={`scratch-window ${revealed ? "is-revealed" : ""}`}>
      <div className="scratch-underlay">
        <span className="revealed-date-label">SAVE THE DATE</span>
        <strong>13</strong>
        <span className="revealed-month">NOVEMBER · 2026</span>
        <span className="revealed-time">FRIDAY · 7:00 PM</span>
      </div>

      {!revealed && (
        <canvas
          ref={canvasRef}
          className="scratch-canvas"
          aria-label="Scratch this gold card to reveal the Walima date"
          style={{ touchAction: "none" }}
        />
      )}
    </div>
  );
}

export default function WalimaReveal() {
  const [time, setTime] = useState(getTimeLeft);
  const [revealed, setRevealed] = useState(false);
  const [sparkles, setSparkles] = useState(false);

  const revealDate = useCallback(() => {
    setRevealed(true);
    setSparkles(true);
    window.setTimeout(() => setSparkles(false), 2400);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="walima-section" id="walima-date">
      <div className="walima-backglow" />

      <div className="walima-frame">
        <FloralOrnament className="walima-corner tl" />
        <FloralOrnament className="walima-corner tr" />
        <FloralOrnament className="walima-corner bl" />
        <FloralOrnament className="walima-corner br" />

        <div className="walima-heading">
          <span />
          <p>AN EVENING OF LOVE & BLESSINGS</p>
          <span />
        </div>

        <div className="walima-bismillah" lang="ur" dir="rtl">
          بسم اللہ الرحمن الرحیم
        </div>

        <h2 className="walima-urdu" lang="ur" dir="rtl">
          دعوتِ ولیمہ
        </h2>

        <p className="walima-subtitle">
          A beautiful beginning, a blessed forever
        </p>

        <div className="walima-flourish" aria-hidden="true">
          <span />
          <i>✿</i>
          <span />
        </div>

        <p className="walima-instruction">
          A little touch reveals a beautiful memory
        </p>

        <ScratchReveal onReveal={revealDate} />

        <p className="walima-hint" aria-live="polite">
          {revealed
            ? "Alhamdulillah · Save this beautiful evening"
            : "✧ Scratch the golden card with your finger ✧"}
        </p>

        <div className={`walima-reveal-note ${revealed ? "visible" : ""}`}>
          <p lang="ur" dir="rtl">
            آپ کی آمد ہمارے لیے باعثِ مسرت ہوگی
          </p>
          <span>Your presence will make our celebration special</span>
        </div>

        <div className="walima-divider">
          <span />
          <i>✿</i>
          <span />
        </div>

        <div className="walima-countdown-heading">
          <span>THE COUNTDOWN TO FOREVER</span>
          <h3>{time.expired ? "The celebration day is here" : "Until the Walima"}</h3>
        </div>

        <div className="walima-countdown">
          {[
            ["Days", time.days],
            ["Hours", time.hours],
            ["Minutes", time.minutes],
            ["Seconds", time.seconds],
          ].map(([label, value]) => (
            <div className="walima-time-unit" key={label}>
              <div className="walima-time-number">{pad(value)}</div>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="walima-date-footer">
          <span>FRIDAY</span>
          <i>✦</i>
          <span>13 NOVEMBER 2026</span>
          <i>✦</i>
          <span>7:00 PM</span>
        </div>

      </div>

      {sparkles && (
        <div className="walima-sparkles" aria-hidden="true">
          {Array.from({ length: 28 }, (_, i) => (
            <span
              key={i}
              style={{
                left: `${5 + ((i * 37) % 90)}%`,
                top: `${15 + ((i * 29) % 70)}%`,
                animationDelay: `${(i % 8) * 0.07}s`,
              }}
            >
              ✦
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
