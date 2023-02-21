import React from "react";
import { useRecoilValue } from "recoil";
import { Form, Segment } from "semantic-ui-react";
import {
	ghItemOffset,
	ghImportSets,
	alwaysImported,
} from "../../../../games/fh/FHGameData";
import { gameInfo } from "../../../../games/GameInfo";
import {
	buildingLevelState,
	importedSetState,
	includeGameState,
} from "../../../../State";
import { BuildingLevelFilter } from "./BuildingLevelFilter";
import { ImportedSetFilter } from "./ImportedSetFilter";
import { SoloClassFilterBlock } from "./SoloClassFilterBlock";
import SpoilerFilterItemList, { ItemRange } from "./SpoilerFilterItemList";

const filterGroups: Record<string, ItemRange[]> = {
	"Random Blueprint": [{ range: [{ start: 51, end: 65 }] }],
	"Chest & Scenario Rewards": [
		{
			range: [{ start: 66, end: 82 }],
		},
	],
	Potions: [{ range: [{ start: 83, end: 119 }] }],
};
const filterGroups2 = {
	"Loot Deck Random Items": [{ range: [{ start: 168, end: 192 }] }],
	"Purchaseable Chest & Scenario Rewards": [
		{
			range: [{ start: 193, end: 247 }],
		},
	],
};

interface BuildingFilter {
	label: string;
	lockedLabel?: string;
	maxLevel: number;
	minLevel: number;
	buildingKey: string;
}

const buildingFilters: BuildingFilter[] = [
	{
		label: "Craftsman Level",
		maxLevel: 9,
		minLevel: 1,
		buildingKey: "cm",
	},
	{
		label: "Trading Post Level",
		lockedLabel: "Envelope 37",
		maxLevel: 4,
		minLevel: -1,
		buildingKey: "tp",
	},
	{
		label: "Jeweler Level",
		lockedLabel: "Envelope 39",
		maxLevel: 3,
		minLevel: -1,
		buildingKey: "jw",
	},
];

export const FHSpoilerFilter = () => {
	const importedSets = useRecoilValue(importedSetState);
	const includedGames = useRecoilValue(includeGameState);
	const { cm, tp, jw } = useRecoilValue(buildingLevelState);

	return (
		<Segment>
			{buildingFilters.map((filter) => (
				<BuildingLevelFilter key={filter.label} {...filter} />
			))}
			<Segment>
				<SpoilerFilterItemList
					ranges={[
						{
							range: [
								{
									start: (cm + 1) * 5 + 1,
									end: 50,
								},
							],
						},
					]}
					title="Craftsman Items"
				/>
				{Object.entries(filterGroups).map(([title, group]) => (
					<SpoilerFilterItemList
						key={title}
						ranges={group}
						title={title}
					/>
				))}

				{tp > -1 && (
					<SpoilerFilterItemList
						ranges={[
							{
								range: [
									{
										start: Math.max(129, tp * 9 + 120),
										end: 155,
									},
								],
							},
						]}
						title="Trading Post Items"
					/>
				)}
				{jw > -1 && (
					<SpoilerFilterItemList
						ranges={[
							{
								range: [
									{
										start: jw * 4 + 156,
										end: 167,
									},
								],
							},
						]}
						title="Jeweler Items"
					/>
				)}

				{Object.entries(filterGroups2).map(([title, group]) => (
					<SpoilerFilterItemList
						key={title}
						ranges={group}
						title={title}
					/>
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
			<SoloClassFilterBlock />
		</Segment>
	);
};
