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
import SpoilerFilterItemList from "./SpoilerFilterItemList";

const scenariosOfImportance = [1];

export const FHSpoilerFilter = () => {
	const includeGames = useRecoilValue(includeGameState);
	const includeGloomhavenItems = includeGames.includes(GameType.Gloomhaven);
	const includeFhSS = includeGames.includes(Expansions.FHSoloScenarios);
	const scenariosComplete = useRecoilValue(scenarioCompletedState);

	const fhRanges = [];
	if (!scenariosComplete.includes(1)) {
		fhRanges.push({ start: 1, end: 10 });
	}
	// fhRanges.push({ start: 11, end: 164 });

	const ghRanges = [];
	if (includeGloomhavenItems) {
		if (!scenariosComplete.includes(1)) {
			ghRanges.push(...initialGHItemsUnlocked);
		}
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
						offset={ghItemOffset}
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
