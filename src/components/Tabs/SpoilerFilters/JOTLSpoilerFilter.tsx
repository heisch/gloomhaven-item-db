import React from "react";
import SpoilerFilterItemList from "./SpoilerFilterItemList";
import { ScenarioCompletedFilter } from "./ScenarioCompletedFilter";

const scenariosOfImportance = [2, 9, 15];
const JOTLSpoilerFilter = () => {
	return (
		<>
			<ScenarioCompletedFilter scenarios={scenariosOfImportance} />
			<SpoilerFilterItemList
				ranges={[14, { start: 27, end: 36 }]}
				title="Items"
			/>
		</>
	);
};

export default JOTLSpoilerFilter;
