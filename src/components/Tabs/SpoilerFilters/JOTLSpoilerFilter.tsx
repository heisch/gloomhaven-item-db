import React from "react";
import SpoilerFilterItemList from "./SpoilerFilterItemList";
import { ScenarioCompletedFilter } from "./ScenarioCompletedFilter";
import { useRecoilValue } from "recoil";
import { scenarioCompletedState } from "../../../State";
import { Segment } from "semantic-ui-react";

const scenariosOfImportance = [2, 9, 15];
const JOTLSpoilerFilter = () => {
	const scenariosComplete = useRecoilValue(scenarioCompletedState);
	const ranges = [];
	if (!scenariosComplete.includes(2)) {
		ranges.push({ start: 1, end: 13 });
	}
	ranges.push(14);
	if (!scenariosComplete.includes(9)) {
		ranges.push({ start: 15, end: 20 });
	}
	if (!scenariosComplete.includes(15)) {
		ranges.push({ start: 21, end: 26 });
	}
	ranges.push({ start: 27, end: 36 });

	return (
		<Segment>
			<ScenarioCompletedFilter scenarios={scenariosOfImportance} />
			<Segment>
				<SpoilerFilterItemList ranges={ranges} title="Items" />
			</Segment>
		</Segment>
	);
};

export default JOTLSpoilerFilter;
