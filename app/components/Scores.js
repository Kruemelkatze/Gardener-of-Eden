import { BGColorClasses } from "../constants";
import { InfluenceBar } from "./InfluenceBar";

const min = 0;
const max = 100;

export function Scores({ chaos = 50, people = 50, gov = 50, highlight = null }) {
    return (
        <div className="flex flex-col flex-grow height-full gap-4">
            <InfluenceBar title="Chaos" value={chaos} min={-10} max={150} bgColor={BGColorClasses.chaos} bgOnlyClass="chaos-background" />
            <InfluenceBar title="People" value={people} min={min} max={max} bgColor={BGColorClasses.people} highlight={highlight === "people"} />
            <InfluenceBar title="Establishment" value={gov} min={min} max={max} bgColor={BGColorClasses.gov} highlight={highlight === "gov"} />
        </div>)
}