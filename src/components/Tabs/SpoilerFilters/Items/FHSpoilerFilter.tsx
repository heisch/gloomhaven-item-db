import React from "react";
import { useRecoilValue } from "recoil";
import { Form, Segment } from "semantic-ui-react";
import {
	ghItemOffset,
	initialGHItemsUnlocked,
} from "../../../../games/fh/FHGameData";
import { GameType, Expansions, AllGames } from "../../../../games/GameType";
import { scenarioCompletedState } from "../../../../State";
import { ScenarioCompletedFilter } from "./ScenarioCompletedFilter";
import { SoloClassFilterBlock } from "./SoloClassFilterBlock";
import SpoilerFilterItemList, { ItemRange } from "./SpoilerFilterItemList";

const scenariosOfImportance = [1];

const soloClassesToInclude: AllGames[] = [Expansions.FHSoloScenarios];

export const FHSpoilerFilter = () => {
	const scenariosComplete = useRecoilValue(scenarioCompletedState);

	const fhRanges: ItemRange[] = [];
	if (!scenariosComplete.includes(1)) {
		fhRanges.push({ range: [{ start: 1, end: 10 }] });
	}
	// fhRanges.push({ start: 11, end: 164 });

	const ghRanges = [];
	if (!scenariosComplete.includes(1)) {
		ghRanges.push({
			offset: ghItemOffset,
			range: [...initialGHItemsUnlocked],
		});
	}
	return (
		<Segment>
			<ScenarioCompletedFilter scenarios={scenariosOfImportance} />
			<Segment>
				<Form.Field>
					<SpoilerFilterItemList ranges={fhRanges} title="Items" />
				</Form.Field>
				<Form.Field>
					<SpoilerFilterItemList
						ranges={ghRanges}
						title="Gloomhaven Items"
						filterOn={GameType.Gloomhaven}
					/>
				</Form.Field>
			</Segment>
			<SoloClassFilterBlock gameTypes={soloClassesToInclude} />
		</Segment>
	);
};
