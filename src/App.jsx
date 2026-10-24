
import { useEffect, useState } from "react";
import { CFG } from "./config.js";
import useMusic from "./hooks/useMusic.js";

import Intro from "./components/Intro.jsx";
import Hero from "./components/Hero.jsx";
import Venue from "./components/Venue.jsx";
import MusicButton from "./components/MusicButton.jsx";
import WalimaReveal from "./components/WalimaReveal.jsx";

export default function App() {
  const [opened, setOpened] = useState(false);
  const music = useMusic();

  useEffect(() => {
    document.body.classList.toggle("open", opened);

    return () => {
      document.body.classList.remove("open");
    };
  }, [opened]);

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

      <main
        className={`wrap ${opened ? "wrap--visible" : ""}`}
      >
        <div className="page-section page-section--hero">
          <Hero cfg={CFG} opened={opened} />
        </div>

        <div className="page-section page-section--walima">
          <WalimaReveal />
        </div>

        <div className="page-section page-section--venue">
          <Venue />
        </div>
      </main>
    </>
  );
}
