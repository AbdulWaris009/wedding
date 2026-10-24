import "./MusicButton.css";

/* Click = music ON / OFF.  Props: playing (bool), onToggle (fn) */
export default function MusicButton({ playing, onToggle }) {
  return (
    <button
      type="button"
      className={"music-btn" + (playing ? " is-on" : "")}
      aria-label={playing ? "Pause music" : "Play music"}
      aria-pressed={playing}
      onClick={onToggle}
    >
      <span className="mb-ring" aria-hidden="true" />

      {playing ? (
        /* music ON -> dancing equalizer bars */
        <span className="mb-eq" aria-hidden="true"><i /><i /><i /><i /></span>
      ) : (
        /* music OFF -> music note with a slash */
        <svg className="mb-off" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 18V5.5l11-2.2V16" />
          <circle cx="6.8" cy="18" r="2.4" />
          <circle cx="17.8" cy="16" r="2.4" />
          <path className="mb-slash" d="M3.5 3.5l17 17" />
        </svg>
      )}
    </button>
  );
}