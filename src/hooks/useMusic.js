import { useRef, useState, useCallback, useEffect } from "react";

/* ===== CHANGE YOUR SONG HERE ===== */
const SONG = "/videos/music.mp3";   // put your mp3 inside the /public folder and write its name here
const START_AT = 0;         // seconds - start from the best part of the song (e.g. 25)
const VOLUME = 0.7;         // 0 to 1
/* ================================== */

export default function useMusic() {
  const audio = useRef(null);
  const fade = useRef(null);
  const [playing, setPlaying] = useState(false);

  const get = () => {
    if (!audio.current) {
      const a = new Audio(SONG);
      a.loop = true; a.preload = "auto"; a.currentTime = START_AT;
      audio.current = a;
    }
    return audio.current;
  };

  const fadeIn = (a) => {
    clearInterval(fade.current);
    a.volume = 0;
    fade.current = setInterval(() => {
      a.volume = Math.min(VOLUME, a.volume + 0.05);
      if (a.volume >= VOLUME) clearInterval(fade.current);
    }, 120);
  };

  const play = useCallback(() => {
    const a = get();
    a.play().then(() => { fadeIn(a); setPlaying(true); }).catch(() => setPlaying(false));
  }, []);

  const start = play;                    // called when the envelope is tapped

  const toggle = useCallback(() => {     // called by the music button
    const a = get();
    if (a.paused) play();
    else { clearInterval(fade.current); a.pause(); setPlaying(false); }
  }, [play]);

  useEffect(() => () => { clearInterval(fade.current); audio.current?.pause(); }, []);

  return { playing, start, toggle };
}