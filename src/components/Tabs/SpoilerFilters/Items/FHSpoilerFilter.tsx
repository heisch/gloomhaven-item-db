import React from "react";
import { useRecoilValue } from "recoil";
import { Form, Segment } from "semantic-ui-react";
import {
	ghItemOffset,
	ghImportSets,
	alwaysImported,
} from "../../../../games/fh/FHGameData";
import { gameInfo } from "../../../../games/GameInfo";
import { Expansions, AllGames } from "../../../../games/GameType";
import {
	craftsmanBuildingLevelState,
	importedSetState,
	includeGameState,
} from "../../../../State";
import { CraftsmanLevelFilter } from "./CrafsmanBuildingLevel";
import { ImportedSetFilter } from "./ImportedSetFilter";
import { SoloClassFilterBlock } from "./SoloClassFilterBlock";
import SpoilerFilterItemList, { ItemRange } from "./SpoilerFilterItemList";

const soloClassesToInclude: AllGames[] = [Expansions.FHSoloScenarios];

const filterGroups: Record<string, ItemRange[]> = {
	"Random Blueprint": [{ range: [{ start: 51, end: 65 }] }],
	"Unknown Source": [{ range: [{ start: 66, end: 82 }] }],
	Potions: [{ range: [{ start: 83, end: 119 }] }],
	"Other Items": [
		{
			range: [
				{ start: 129, end: 167 },
				{ start: 193, end: 247 },
			],
		},
	],
	"Loot Deck Random Items": [{ range: [{ start: 168, end: 192 }] }],
};

export const FHSpoilerFilter = () => {
	const importedSets = useRecoilValue(importedSetState);
	const includedGames = useRecoilValue(includeGameState);
	const craftsmanLevel = useRecoilValue(craftsmanBuildingLevelState);

	// fhRanges.push({ start: 11, end: 164 });

	return (
		<Segment>
			<CraftsmanLevelFilter />
			<Segment>
				<Form.Field>
					<SpoilerFilterItemList
						ranges={[
							{
								range: [
									{
										start: (craftsmanLevel + 1) * 5 + 1,
										end: 50,
									},
								],
							},
						]}
						title="Craftsman Building Items"
					/>
				</Form.Field>
				{Object.entries(filterGroups).map(([title, group]) => (
					<Form.Field>
						<SpoilerFilterItemList ranges={group} title={title} />
					</Form.Field>
				))}
			</Segment>
			{ghImportSets.some((group) =>
				includedGames.includes(group.game)
			) && (
				<Segment>
					<Form.Field>
						<ImportedSetFilter sets={ghImportSets} />
						<SpoilerFilterItemList
							ranges={[
								{
									offset: ghItemOffset,
									range: [...alwaysImported.items],
								},
							]}
							title={gameInfo[alwaysImported.game].title}
							filterOn={alwaysImported.game}
						/>
						{ghImportSets.map(
							({ items, importSet, title, game }) => {
								if (!importedSets.includes(importSet)) {
									return null;
								}
								const gameTitle = `${gameInfo[game].title} ${
									title || ""
								}`;

								return (
									<SpoilerFilterItemList
										ranges={[
											{
												offset: ghItemOffset,
												range: [...items],
											},
										]}
										title={gameTitle}
										filterOn={game}
									/>
								);
							}
						)}
					</Form.Field>
				</Segment>
			)}
			<SoloClassFilterBlock gameTypes={soloClassesToInclude} />
		</Segment>
	);
};
