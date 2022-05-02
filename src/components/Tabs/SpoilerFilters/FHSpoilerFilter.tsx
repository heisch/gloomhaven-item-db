import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Form } from "semantic-ui-react";
import {
	ghItemOffset,
	initialGHItemsUnlocked,
} from "../../../games/fh/FHGameData";
import {
	includeGloomhavenItemsState,
	scenarioCompletedState,
} from "../../../State";
import { FHClasses } from "../../../State/Types";
import { ScenarioCompletedFilter } from "./ScenarioCompletedFilter";
import { SoloClassFilter } from "./SoloClassFilter";
import SpoilerFilterItemList from "./SpoilerFilterItemList";

const scenariosOfImportance = [1];

const FHSpoilerFilter = () => {
	const [includeGloomhavenItems, setIncludeGloomhavenItems] = useRecoilState(
		includeGloomhavenItemsState
	);
	const scenariosComplete = useRecoilValue(scenarioCompletedState);

	const fhRanges = [];
	if (!scenariosComplete.includes(1)) {
		fhRanges.push({ start: 1, end: 10 });
	}
	fhRanges.push({ start: 11, end: 164 });

	const ghRanges = [];
	if (includeGloomhavenItems) {
		if (!scenariosComplete.includes(1)) {
			ghRanges.push(...initialGHItemsUnlocked);
		}
	}

	return (
		<>
			<Form.Group inline>
				<label>Include Gloomhaven Items?</label>
				<Form.Checkbox
					toggle
					checked={includeGloomhavenItems}
					onChange={() =>
						setIncludeGloomhavenItems(!includeGloomhavenItems)
					}
				/>
			</Form.Group>

			<ScenarioCompletedFilter scenarios={scenariosOfImportance} />
			<Form.Field>
				<SpoilerFilterItemList ranges={fhRanges} title="Items" />
			</Form.Field>
			<Form.Field>
				<SpoilerFilterItemList
					ranges={ghRanges}
					title="Gloomhaven Items"
					offset={ghItemOffset}
				/>
			</Form.Field>
			<SoloClassFilter classes={Object.values(FHClasses)} />
		</>
	);
};

export default FHSpoilerFilter;
