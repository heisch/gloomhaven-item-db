import React from "react";
import { useRecoilValue } from "recoil";
import { Form, Segment } from "semantic-ui-react";
import { ghItemOffset, ghGroups } from "../../../../games/fh/FHGameData";
import { Expansions, AllGames } from "../../../../games/GameType";
import { includeGameState, scenarioCompletedState } from "../../../../State";
import { ScenarioCompletedFilter } from "./ScenarioCompletedFilter";
import { SoloClassFilterBlock } from "./SoloClassFilterBlock";
import SpoilerFilterItemList, { ItemRange } from "./SpoilerFilterItemList";

const soloClassesToInclude: AllGames[] = [Expansions.FHSoloScenarios];

export const FHSpoilerFilter = () => {
	const scenariosComplete = useRecoilValue(scenarioCompletedState);
	const includedGames = useRecoilValue(includeGameState);

	const fhRanges: ItemRange[] = [{ range: [{ start: 1, end: 10 }] }];
	// fhRanges.push({ start: 11, end: 164 });

	const scenariosOfImportance = ghGroups
		.filter((group) => includedGames.includes(group.game))
		.map((group) => group.scenarioId);

	return (
		<Segment>
			<ScenarioCompletedFilter scenarios={scenariosOfImportance} />
			<Segment>
				<Form.Field>
					<SpoilerFilterItemList ranges={fhRanges} title="Items" />
				</Form.Field>
				<Form.Field>
					{ghGroups.map(({ items, scenarioId, title, game }) => {
						if (!scenariosComplete.includes(scenarioId)) {
							return null;
						}
						return (
							<SpoilerFilterItemList
								ranges={[
									{
										offset: ghItemOffset,
										range: [...items],
									},
								]}
								title={`Imported ${title}`}
								filterOn={game}
							/>
						);
					})}
				</Form.Field>
			</Segment>
			<SoloClassFilterBlock gameTypes={soloClassesToInclude} />
		</Segment>
	);
};
