import React from "react";
import { useRecoilValue } from "recoil";
import { Form, Segment } from "semantic-ui-react";
import { Expansions, GameType } from "../../../../games";
import {
	ghItemOffset,
	ghImportSets,
	fcImportSets,
	sortById,
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

	const ghRange = ghImportSets
		.map((items: number[], index: number) => {
			if (index === 1) {
				return [...items];
			}
			if (index <= tp) {
				return [...items];
			}
			return [];
		})
		.flat()
		.sort(sortById);

	const fcRange = [];
	if (scenariosComplete.includes(82)) {
		fcRange.push(...fcImportSets[0]);
	}
	if (en >= 4) {
		fcRange.push(...fcImportSets[1]);
	}
	fcRange.sort(sortById);

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
					title={tp > -1 ? "Trading Post Items" : "Envelope 37 Items"}
				/>
				<SpoilerFilterItemList
					ranges={[
						{
							range: [
								{
									start: Math.max(156, jw * 4 + 156),
									end: 167,
								},
							],
						},
					]}
					title={jw > -1 ? "Jeweler Items" : "Envelope 39 Items"}
				/>

				{Object.entries(filterGroups2).map(([title, group]) => (
					<SpoilerFilterItemList
						key={title}
						ranges={group}
						title={title}
					/>
				))}
				<SpoilerFilterItemList
					ranges={[
						{
							offset: ghItemOffset,
							range: ghRange,
						},
					]}
					title={`Gloomhaven Imported Items`}
					filterOn={GameType.Gloomhaven}
				/>
				<SpoilerFilterItemList
					ranges={[
						{
							offset: ghItemOffset,
							range: fcRange,
						},
					]}
					title={"Forgotten Circles Imported Items"}
					filterOn={Expansions.ForgottenCircles}
				/>
			</Segment>
			<SoloClassFilterBlock />
		</Segment>
	);
};
