import { Pill } from "./Pill";
import { BGColorClasses, ChoiceMultipliers, InfluenceSymbols, ScoreSymbols, Treshholds } from "../constants";

export function ChoiceInfluence(choice) {
    const chaos = choice.chaos * ChoiceMultipliers.chaos;
    const people = choice.people * ChoiceMultipliers.people;
    const gov = choice.gov * ChoiceMultipliers.gov;

    const chaosInfluence = getInfluenceIcon(chaos);
    const peopleInfluence = getInfluenceIcon(people);
    const govInfluence = getInfluenceIcon(gov);

    const chaosIcon = `${ScoreSymbols.chaos} ${chaosInfluence}`;
    const peopleIcon = `${ScoreSymbols.people} ${peopleInfluence}`;
    const govIcon = `${ScoreSymbols.gov} ${govInfluence}`;

    return (<div className="flex flex-grow items-end justify-end mt-3">
        <Pill icon={chaosInfluence} bgColor={BGColorClasses.chaos} title={`Chaos ${chaos >= 0 ? "+" : ""}${chaos}`}></Pill>
        <Pill icon={peopleInfluence} bgColor={BGColorClasses.people} title={`People ${people >= 0 ? "+" : ""}${people}`}></Pill>
        <Pill icon={govInfluence} bgColor={BGColorClasses.gov} title={`Establishment ${gov >= 0 ? "+" : ""}${gov}`}></Pill>
    </div>)
}

function getInfluenceIcon(val) {
    if (val === 0) {
        return InfluenceSymbols.neutral;
    }

    if (val >= Treshholds.double) {
        return InfluenceSymbols.doubleUp;
    } else if (val >= Treshholds.normal) {
        return InfluenceSymbols.up;
    } else if (val <= -Treshholds.double) {
        return InfluenceSymbols.doubleDown;
    } else if (val <= -Treshholds.normal) {
        return InfluenceSymbols.down;
    }

    return InfluenceSymbols.neutral;
}