
import { useCallback, useEffect, useState } from "react";
import { CFG } from "./config.js";
import useMusic from "./hooks/useMusic.js";

import Intro from "./components/Intro.jsx";
import Hero from "./components/Hero.jsx";
import Venue from "./components/Venue.jsx";
import Petals from "./components/Petals.jsx";
import Sparkles from "./components/Sparkles.jsx";
import MusicButton from "./components/MusicButton.jsx";
import WalimaReveal from "./components/WalimaReveal.jsx";
import FloralDivider from "./components/FloralDivider.jsx";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [burst, setBurst] = useState(null);

  const music = useMusic();

  useEffect(() => {
    document.body.classList.toggle("open", opened);

    return () => {
      document.body.classList.remove("open");
    };
  }, [opened]);

  const onReveal = useCallback((position) => {
    setBurst(position);
  }, []);

  const endBurst = useCallback(() => {
    setBurst(null);
  }, []);

  return (
    <>
      <Intro
        first={CFG.first}
        second={CFG.second}
        onOpen={music.start}
        onDone={() => setOpened(true)}
      />
      <MusicButton
        playing={music.playing}
        onToggle={music.toggle}
      />
      <div className="wrap">
        <Hero cfg={CFG} opened={opened} />
        <WalimaReveal />
        <Venue />
      </div>
    </>
  );
}
