import React from "react";
import { useRecoilValue } from "recoil";
import { Form, Segment } from "semantic-ui-react";
import {
	ghItemOffset,
	initialGHItemsUnlocked,
} from "../../../../games/fh/FHGameData";
import { GameType, Expansions } from "../../../../games/GameType";
import { includeGameState, scenarioCompletedState } from "../../../../State";
import { FHClasses } from "../../../../State/Types";
import { ScenarioCompletedFilter } from "./ScenarioCompletedFilter";
import { SoloClassFilter } from "./SoloClassFilter";
import SpoilerFilterItemList, { ItemRange } from "./SpoilerFilterItemList";

const scenariosOfImportance = [1];

export const FHSpoilerFilter = () => {
	const includeGames = useRecoilValue(includeGameState);
	const includeFhSS = includeGames.includes(Expansions.FHSoloScenarios);
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
			{includeFhSS && (
				<Segment>
					<Form.Group inline>
						<label>Solo Class Items:</label>
					</Form.Group>

					<SoloClassFilter
						name="Frosthaven"
						classes={Object.values(FHClasses)}
					/>
				</Segment>
			)}
		</Segment>
	);
};
