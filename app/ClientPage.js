"use client";

import CountUp from "react-countup";
import { formatYear } from "./utils/utils";

import EraData from "./data.json";
import { useEffect, useState } from "react";
import OverlaidCharacters from "./components/OverlaidCharacters";
import Era from "./components/Era";
import { Scores } from "./components/Scores";
import { ChoiceMultipliers, ScoreMinMaxValues } from "./constants";
import { GameOverModal } from "./components/GameOverModal";
import { IntroModal } from "./components/IntroModal";

import { Howl, Howler } from 'howler';

const ambienceTracks = [
  "675119__craigsmith__s28-24-prehistoric-bird-background.ogg",
  "609748__szegvari__egypt-detective-flute-orcherstra-piano-atmo-dark-thriller-strings-cinematic-music-surround.ogg",
  "Kai Engel - The Flames of Rome.ogg",
  "MASERPAN - Medieval Modernity.ogg",
  "731418__jdpietrzak__port-de-nice-church.ogg",
  "410357__felixblume__small-wood-at-night-close-to-rio-de-janeiro-on-the-way-to-pedra-bonita.ogg",
  "345723__paulbogush__world-war-1-trench-warfare-battlefield-sounds.ogg",
  "454649__g_m_d_three__modem_3.ogg",
  "550332__wax_vibe__cyberpunk-bass.ogg",
  "124115__timbre__space-1999b.ogg",
];

const ambienceHowls = ambienceTracks.map(track => new Howl({
  src: [`/audio/${track}`],
  loop: true,
  volume: 0.5
}));

let currentAmbienceIndex = -1;

const playAmbience = (index) => {
  if (index === currentAmbienceIndex) {
    return;
  }
  currentAmbienceIndex = index;

  // Fade out previous track
  if (index > 0) {
    ambienceHowls[index - 1].fade(0.5, 0, 1000);
    // Stop previous track after fade out
    setTimeout(() => {
      ambienceHowls[index - 1].stop();
    }, 720);
  }

  ambienceHowls[index].play();
  ambienceHowls[index].fade(0, 0.5, 1000);
}

const stopAllAmbiences = () => {
  ambienceHowls.forEach(howl => {
    howl.stop();
  });
}

const defaultTimeline = Math.floor(Math.random() * 100000) + 10000;

export default function ClientPage({ remount }) {
  const [started, setStarted] = useState(false);
  const [eraIndex, setEraIndex] = useState(0);
  const [timeline, setTimeline] = useState('??????');
  const previousEra = EraData[eraIndex - 1];
  const currentEra = EraData[eraIndex];
  const isLastEra = eraIndex === EraData.length - 1;

  const [scores, setScores] = useState({ chaos: 0, people: 50, gov: 50 });
  const [finished, setFinished] = useState(false);
  const [won, setWon] = useState(false);
  const [looseReason, setLooseReason] = useState(null);

  const remountAndReset = () => {
    try {
      stopAllAmbiences();
    } catch (e) {
      console.error(e);
    }

    remount();
  }

  useEffect(() => {

    const storedTimeline = +localStorage.getItem("timeline");
    if (storedTimeline) {
      setTimeline(storedTimeline + 1);
    } else {
      setTimeline(defaultTimeline);
    }
  }, []);

  const currentEndYear = currentEra?.year ?? 0;
  const currentStartYear = previousEra?.year ?? currentEndYear - 3000;

  useEffect(() => {
    localStorage.setItem("timeline", timeline);
  }, [timeline]);

  const nextEra = () => {
    const newEraIndex = Math.min(eraIndex + 1, EraData.length - 1);
    setEraIndex(newEraIndex);

    playAmbience(newEraIndex);
  };

  const startGame = () => {
    setStarted(true);
    playAmbience(0);
  }

  const onChoiceSelected = (choice) => {
    if (finished) {
      return;
    }

    const newScores = { ...scores };
    newScores.chaos = Math.max(0, Math.min(100, scores.chaos + choice.chaos * ChoiceMultipliers.chaos));
    newScores.people = Math.max(0, Math.min(100, scores.people + choice.people * ChoiceMultipliers.people));
    newScores.gov = Math.max(0, Math.min(100, scores.gov + choice.gov * ChoiceMultipliers.gov));

    setScores(newScores);

    var loseReason = setLoseCondition(newScores);
    if (loseReason) {
      setFinished(true);
      setLooseReason(loseReason);
      setWon(false);
    } else if (isLastEra) {
      setFinished(true);
      setWon(true);
    } else {
      nextEra();
    }
  }

  const setLoseCondition = (newScores) => {
    if (newScores.gov <= ScoreMinMaxValues.min || newScores.gov >= ScoreMinMaxValues.max) {
      console.log("You lose due to government");
      return "gov";
    } else if (newScores.people <= ScoreMinMaxValues.min || newScores.people >= ScoreMinMaxValues.max) {
      console.log("You lose due to people");
      return "people";
    }

    return null;
  }

  return (
    <div className="flex flex-col justify-items-stretch items-stretch min-h-screen gap-16 sm:p-10 md:p-20 font-[family-name:var(--font-roboto-serif)]">
      <div className="text-5xl font-semibold text-center">
        <CountUp start={currentStartYear} end={currentEndYear} duration={started ? 1.5 : 12000} formattingFn={formatYear} />

      </div>
      <main className="flex flex-col gap-8 row-start-2 items-stretch flex-grow text-center">
        <Era era={currentEra} onChoiceSelected={onChoiceSelected} />

        <div className="top-5 left-5 text-2xl flex flex-row justify-center">
          <div className="md:w-1/2">
            <Scores {...scores} />
          </div>
        </div>
      </main>

      <footer className="flex flex-col items-center text-center text-gray-500">
        <p>Era {eraIndex + 1} of {EraData.length}</p>
        <p>Timeline {timeline} of&nbsp;<OverlaidCharacters text="waiting_for_decision_from_The_Board" /></p>
        {/* {EraData.map(x => x.era).join(", ")} */}
        {/* Button to increase era */}
        <span
          disabled={isLastEra}
          className="text-xs disabled:cursor-not-allowed mt-2 text-gray-800 cursor-pointer"
          title="Interfere with the timeline, only in dire circumstances!"
          onClick={nextEra}
        >
          Skip Era
        </span>
      </footer>
      <IntroModal visible={!started} onStart={startGame} />
      <GameOverModal scores={scores} won={won} visible={finished} looseReason={looseReason} remount={remountAndReset} />
    </div>
  );
}
