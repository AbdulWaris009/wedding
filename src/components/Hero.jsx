
import { useEffect, useRef, useState } from "react";
import "./Hero.css";

const petals = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${(i * 47 + 5) % 100}%`,
  delay: `${-(i % 10) * 1.7}s`,
  duration: `${11 + (i % 6) * 2}s`,
}));

function FloralCorner({ className = "" }) {
  return (
    <svg
      className={`floral-corner ${className}`}
      viewBox="0 0 160 180"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="#d7b77b" strokeWidth="1.1" strokeLinecap="round">
        <path d="M8 168 C30 126 60 95 104 60 C124 44 138 25 146 8" />
        <path d="M35 137 C13 112 14 94 28 83 C48 96 50 116 35 137Z" />
        <path d="M65 108 C61 80 73 65 91 65 C98 87 86 104 65 108Z" />
        <path d="M101 67 C91 42 101 27 120 23 C132 44 119 60 101 67Z" />
        <path d="M49 123 C77 126 93 113 91 95" />
        <path d="M85 88 C109 89 126 76 126 59" />
        <path d="M21 151 C46 150 63 163 63 176" />
        <path d="M15 160 C35 145 52 145 65 157" />
      </g>
      <g stroke="#e7c98c" strokeWidth="1" fill="#7c293b">
        <ellipse cx="29" cy="72" rx="8" ry="15" transform="rotate(-35 29 72)" />
        <ellipse cx="18" cy="85" rx="8" ry="15" transform="rotate(-65 18 85)" />
        <ellipse cx="37" cy="88" rx="8" ry="15" transform="rotate(20 37 88)" />
        <ellipse cx="28" cy="97" rx="8" ry="15" transform="rotate(65 28 97)" />
        <circle cx="29" cy="86" r="5" fill="#e4bd70" />
      </g>
      <g stroke="#e7c98c" strokeWidth="1" fill="#8b3c48">
        <ellipse cx="121" cy="13" rx="7" ry="13" transform="rotate(15 121 13)" />
        <ellipse cx="136" cy="20" rx="7" ry="13" transform="rotate(55 136 20)" />
        <ellipse cx="133" cy="36" rx="7" ry="13" transform="rotate(95 133 36)" />
        <ellipse cx="115" cy="34" rx="7" ry="13" transform="rotate(-20 115 34)" />
        <circle cx="126" cy="27" r="4" fill="#e7c98c" />
      </g>
      <g fill="#d5b374">
        <circle cx="72" cy="73" r="2" />
        <circle cx="81" cy="62" r="1.5" />
        <circle cx="49" cy="139" r="2" />
        <circle cx="107" cy="45" r="2" />
        <path d="M69 48l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" />
      </g>
    </svg>
  );
}

export default function Hero({ cfg = {}, opened = false }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Muted autoplay works on most browsers; retry when the invitation opens.
    video.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (opened && video && video.paused) {
      video.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }, [opened]);

  const toggleVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  return (
    <header className="royal-hero">
      {/* Background video */}
      <div className="royal-video-wrap">
        <video
          ref={videoRef}
          className="royal-video"
          src="/videos/wedding-hands.mp4"
          poster="/images/wedding-poster.png"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <div className="royal-video-shade" />
        <div className="royal-video-glow" />
      </div>

      {/* Floral frame */}
      <div className="royal-frame" aria-hidden="true" />
      <FloralCorner className="floral-tl" />
      <FloralCorner className="floral-tr" />
      <FloralCorner className="floral-bl" />
      <FloralCorner className="floral-br" />

      {/* Floating petals */}
      <div className="royal-petals" aria-hidden="true">
        {petals.map((petal) => (
          <span
            key={petal.id}
            className="royal-petal"
            style={{
              left: petal.left,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
            }}
          />
        ))}
      </div>

      {/* Top heading */}
      <div className="royal-heading">
        <span className="royal-heading-line" />
        <span>A NEW CHAPTER BEGINS</span>
        <span className="royal-heading-line" />
      </div>

      {/* Play/pause button */}
      <button
        type="button"
        className="royal-video-control"
        onClick={toggleVideo}
        aria-label={playing ? "Pause background video" : "Play background video"}
      >
        <span>{playing ? "Ⅱ" : "▶"}</span>
        <small>{playing ? "PAUSE MOMENT" : "PLAY MOMENT"}</small>
      </button>

      {/* Invitation content */}
      <div className="royal-invitation">
        <div className="royal-top-flower">✿</div>

        <p className="royal-kicker">WITH JOYFUL HEARTS</p>
        <p className="royal-intro">We invite you to celebrate the</p>

        <div className="royal-event">
          {cfg.event || "WEDDING"}
        </div>

        <div className="royal-name first-name">
          {cfg.first || " Mohd Ayaz"}
        </div>

        <div className="royal-and">
          <span />
          <i>&amp;</i>
          <span />
        </div>

        <div className="royal-name second-name">
          {cfg.second || "Aqsha Fatima"}
        </div>

        <div className="royal-ornament">
          <span />
          ✦
          <span />
        </div>

        <div className="royal-family-block">
          <small>SON OF</small>
          <p>{cfg.firstParents || "Mr. & Mrs. (First Parents Name)"}</p>
        </div>

        <div className="royal-family-and">AND</div>

        <div className="royal-family-block">
          <small>DAUGHTER OF</small>
          <p>{cfg.secondParents || "Mr. & Mrs. (Second Parents Name)"}</p>
        </div>

        <div className="royal-bottom-flower">✿</div>
      </div>

      {/* Scroll cue */}
      <a href="#events" className="royal-scroll">
        <span>SCROLL TO DISCOVER</span>
        <span className="royal-scroll-icon">↓</span>
      </a>
    </header>
  );
}
