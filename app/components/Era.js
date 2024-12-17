import { useEffect, useState } from "react";
import Choice from "./Choice";

const sinisterStyle = {
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',

    Animation: 'gradient 15s ease infinite',
};

export default function Era({ era, onChoiceSelected, scenarioId = null }) {
    const [selectedScenarioId, setSelectedScenarioId] = useState(null);

    //Select new scenario when era or scenarioId changes
    useEffect(() => {
        if (scenarioId && scenarioId > 0 && scenarioId < era?.scenarios?.length) {
            setSelectedScenarioId(scenarioId);
            return;
        }

        setSelectedScenarioId(Math.floor(Math.random() * era.scenarios.length));
    }, [era, scenarioId]);

    const scenario = era?.scenarios ? era.scenarios[selectedScenarioId] : null;

    return (
        <div className="flex flex-col flex-grow">
            <h1 className="text-4xl mb-2">{era.era ?? 'At The End Of Time'}</h1>
            <p className="text-xl">{scenario?.text ?? 'This is a bad Scenario'} <span className="text-gray-500 text-xs">[#{selectedScenarioId + 1}]</span></p>

            {/* Format in sinister color gradient, animated */}
            <h2 className="text-2xl md:text-3xl font-bold mt-8 md:mt-16 sinister-text sm:text-2xl"
                style={sinisterStyle}>
                What will you do?
            </h2>

            <div className="choices mt-4 flex flex-row justify-items-stretch items-stretch md:gap-16 gap-4 md:px-32 px-1">
                {scenario?.choices?.map((choice, index) => (
                    <Choice key={index} choice={choice} onChoiceSelected={onChoiceSelected} />
                ))}
            </div>
        </div >
    )
}