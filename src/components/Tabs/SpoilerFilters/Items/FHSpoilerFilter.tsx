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
import { importedSetState, includeGameState } from "../../../../State";
import { ImportedSetFilter } from "./ImportedSetFilter";
import { SoloClassFilterBlock } from "./SoloClassFilterBlock";
import SpoilerFilterItemList, { ItemRange } from "./SpoilerFilterItemList";

const soloClassesToInclude: AllGames[] = [Expansions.FHSoloScenarios];

export const FHSpoilerFilter = () => {
	const importedSets = useRecoilValue(importedSetState);
	const includedGames = useRecoilValue(includeGameState);

	const craftsmanBuilding1: ItemRange[] = [
		{ range: [{ start: 1, end: 10 }] },
	];
	const craftsmanBuilding2: ItemRange[] = [
		{ range: [{ start: 11, end: 15 }] },
	];
	const craftsmanBuilding3: ItemRange[] = [
		{ range: [{ start: 16, end: 20 }] },
	];
	const craftsmanBuilding4: ItemRange[] = [
		{ range: [{ start: 21, end: 25 }] },
	];
	const craftsmanBuilding5: ItemRange[] = [
		{ range: [{ start: 26, end: 30 }] },
	];
	const craftsmanBuilding6: ItemRange[] = [
		{ range: [{ start: 31, end: 35 }] },
	];
	const craftsmanBuilding7: ItemRange[] = [
		{ range: [{ start: 36, end: 40 }] },
	];
	const craftsmanBuilding8: ItemRange[] = [
		{ range: [{ start: 41, end: 45 }] },
	];
	const craftsmanBuilding9: ItemRange[] = [
		{ range: [{ start: 46, end: 50 }] },
	];
	const randomBlueprint: ItemRange[] = [{ range: [{ start: 51, end: 65 }] }];
	const unknown: ItemRange[] = [{ range: [{ start: 66, end: 82 }] }];
	const potions: ItemRange[] = [{ range: [{ start: 83, end: 119 }] }];
	const purchasableImmediate: ItemRange[] = [
		{ range: [{ start: 120, end: 128 }] },
	];
	const purchasableUnknown: ItemRange[] = [
		{
			range: [
				{ start: 129, end: 167 },
				{ start: 193, end: 247 },
			],
		},
	];
	const randomLoot: ItemRange[] = [{ range: [{ start: 168, end: 192 }] }];

	// fhRanges.push({ start: 11, end: 164 });

	return (
		<Segment>
			<Segment>
				<Form.Field>
					<SpoilerFilterItemList
						ranges={craftsmanBuilding1}
						title="Craftsman Building 1"
					/>
				</Form.Field>
				<Form.Field>
					<SpoilerFilterItemList
						ranges={craftsmanBuilding2}
						title="Craftsman Building 2"
					/>
				</Form.Field>
				<Form.Field>
					<SpoilerFilterItemList
						ranges={craftsmanBuilding3}
						title="Craftsman Building 3"
					/>
				</Form.Field>
				<Form.Field>
					<SpoilerFilterItemList
						ranges={craftsmanBuilding4}
						title="Craftsman Building 4"
					/>
				</Form.Field>
				<Form.Field>
					<SpoilerFilterItemList
						ranges={craftsmanBuilding5}
						title="Craftsman Building 5"
					/>
				</Form.Field>
				<Form.Field>
					<SpoilerFilterItemList
						ranges={craftsmanBuilding6}
						title="Craftsman Building 6"
					/>
				</Form.Field>
				<Form.Field>
					<SpoilerFilterItemList
						ranges={craftsmanBuilding7}
						title="Craftsman Building 7"
					/>
				</Form.Field>
				<Form.Field>
					<SpoilerFilterItemList
						ranges={craftsmanBuilding8}
						title="Craftsman Building 8"
					/>
				</Form.Field>
				<Form.Field>
					<SpoilerFilterItemList
						ranges={craftsmanBuilding9}
						title="Craftsman Building 9"
					/>
				</Form.Field>
				<Form.Field>
					<SpoilerFilterItemList
						ranges={randomBlueprint}
						title="Random Blueprint"
					/>
				</Form.Field>
				<Form.Field>
					<SpoilerFilterItemList ranges={unknown} title="Unknown" />
				</Form.Field>
				<Form.Field>
					<SpoilerFilterItemList ranges={potions} title="Potions" />
				</Form.Field>
				<Form.Field>
					<SpoilerFilterItemList
						ranges={purchasableImmediate}
						title="Purchable (Immediate)"
					/>
				</Form.Field>
				<Form.Field>
					<SpoilerFilterItemList
						ranges={purchasableUnknown}
						title="Purchable (Unknown)"
					/>
				</Form.Field>
				<Form.Field>
					<SpoilerFilterItemList
						ranges={randomLoot}
						title="Loot Card Random"
					/>
				</Form.Field>
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
