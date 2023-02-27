import React from "react";
import { useRecoilValue } from "recoil";
import { Form, Segment } from "semantic-ui-react";
import { Expansions, GameType } from "../../../../games";
import {
	ghItemOffset,
	ghImportSets,
	fcImportSets,
} from "../../../../games/fh/FHGameData";
import { gameInfo } from "../../../../games/GameInfo";
import {
	buildingLevelState,
	includeGameState,
	scenarioCompletedState,
} from "../../../../State";
import {
	BuildingLevelFilter,
	BuildingLevelFilterProps,
} from "./BuildingLevelFilter";
import { ScenarioCompletedFilter } from "./ScenarioCompletedFilter";
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
const buildingFilters: BuildingLevelFilterProps[] = [
	{
		label: "Craftsman Level",
		endBuildingLevel: 9,
		buildingKey: "cm",
	},
	{
		label: "Trading Post Level",
		lockedLabel: "Envelope 37",
		endBuildingLevel: 4,
		buildingKey: "tp",
	},
	{
		label: "Jeweler Level",
		lockedLabel: "Envelope 39",
		endBuildingLevel: 3,
		buildingKey: "jw",
	},
	{
		label: "Enhancer Level",
		lockedLabel: "Envelope 44",
		startBuildingLevel: 4,
		buildingKey: "en",
	},
];

export const FHSpoilerFilter = () => {
	const includedGames = useRecoilValue(includeGameState);
	const scenariosComplete = useRecoilValue(scenarioCompletedState);
	const { cm, tp, jw, en } = useRecoilValue(buildingLevelState);

	return (
		<Segment>
			{buildingFilters.map((filter) => (
				<BuildingLevelFilter key={filter.label} {...filter} />
			))}
			{includedGames.includes(Expansions.ForgottenCircles) && (
				<ScenarioCompletedFilter scenarios={[82]} />
			)}
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
			<Segment>
				{includedGames.includes(GameType.Gloomhaven) && (
					<Form.Field>
						{ghImportSets.map((items, index) => {
							if (index === 0) {
								return (
									<SpoilerFilterItemList
										ranges={[
											{
												offset: ghItemOffset,
												range: [...items],
											},
										]}
										title={`${
											gameInfo[GameType.Gloomhaven].title
										} - Initially Available`}
										filterOn={GameType.Gloomhaven}
									/>
								);
							} else {
								if (index + 1 > tp) {
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
										title={`${
											gameInfo[GameType.Gloomhaven].title
										} - Trading Post Level ${index + 1}`}
										filterOn={GameType.Gloomhaven}
									/>
								);
							}
						})}
					</Form.Field>
				)}
				{scenariosComplete.includes(82) && (
					<SpoilerFilterItemList
						ranges={[
							{
								offset: ghItemOffset,
								range: [...fcImportSets[0]],
							},
						]}
						title={`${
							gameInfo[Expansions.ForgottenCircles].title
						} - Scenario 82 rewards`}
						filterOn={Expansions.ForgottenCircles}
					/>
				)}
				{en >= 4 && (
					<SpoilerFilterItemList
						ranges={[
							{
								offset: ghItemOffset,
								range: [...fcImportSets[1]],
							},
						]}
						title={`${
							gameInfo[Expansions.ForgottenCircles].title
						} - Enhancer Level 4`}
						filterOn={Expansions.ForgottenCircles}
					/>
				)}
			</Segment>
			<SoloClassFilterBlock />
		</Segment>
	);
};
