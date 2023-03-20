import { Helpers } from "../../helpers";
import { GloomhavenItem } from "../../State/Types";
import { GameData, getInitialItems } from "../GameData";
import { gameInfo } from "../GameInfo";
import { GameType } from "../GameType";

export const ghImportSets: number[][] = [
	[],
	[10, 25, 72, 105, 109, 116],
	[21, 37, 53, 93, 94, 106, 115],
	[46, 83, 84, 85, 86, 87, 88, 102, 110, 111, 121, 122, 126, 123, 128],
	[
		17, 35, 47, 51, 62, 74, 77, 78, 79, 80, 81, 82, 117, 118, 119, 127, 129,
		131,
	],
];

export const fcImportSets: number[][] = [
	[153, 159, 161],
	[154, 155, 157, 163],
];

export const sortById = (a: number, b: number) => a - b;

export const ghItemToImport = ghImportSets
	.flatMap((groups) => [...groups])
	.sort(sortById);

export const fcItemToImport = fcImportSets
	.flatMap((groups) => [...groups])
	.sort(sortById);

let { items, filterSlots, resources } = getInitialItems(GameType.Frosthaven);
export const ghItemOffset = 1000;

const { items: ghItems, filterSlots: ghFilterSlots } = getInitialItems(
	GameType.Gloomhaven
);

const getTradingPostLevel = (id: number) => {
	const setIndex = ghImportSets.findIndex((set) => set.includes(id));
	if (setIndex !== -1) {
		return setIndex === 1 ? -1 : setIndex;
	}
	return undefined;
};

const getScenarioLevel = (id: number) => {
	if (fcImportSets[0].includes(id)) {
		return 82;
	}
	return undefined;
};

const getEnchancerLevel = (id: number) => {
	if (fcImportSets[1].includes(id)) {
		return 4;
	}
	return undefined;
};

const filteredGhItems = ghItems
	.filter(
		(item) =>
			ghItemToImport.includes(item.id) ||
			fcItemToImport.includes(item.id) ||
			item.soloItem
	)
	.map((item: GloomhavenItem) => {
		let lockToClasses = undefined;
		if (item.soloItem) {
			lockToClasses = [item.soloItem];
		}
		const unlockTradingPostLevel =
			getTradingPostLevel(item.id) || Number.MAX_VALUE;
		const unlockScenario = getScenarioLevel(item.id) || Number.MAX_VALUE;
		const unlockEnhancerLevel =
			getEnchancerLevel(item.id) || Number.MAX_VALUE;
		return {
			...item,
			displayId: item.id.toString(),
			id: ghItemOffset + item.id,
			unlockProsperity: Number.MAX_VALUE,
			unlockTradingPostLevel,
			unlockEnhancerLevel,
			unlockScenario,
			lockToClasses,
			source: item.soloItem
				? item.source
				: `${gameInfo[item.gameType].title} Import`,
			importedItem: true,
		};
	});

items = items.concat(filteredGhItems);

filterSlots = Helpers.uniqueArray(filterSlots.concat(ghFilterSlots));

export const FHGameData: GameData = {
	gameType: GameType.Frosthaven,
	items,
	filterSlots,
	resources,
};

/* Items left to source
67 / ? 
206 / Giant Sword -- Scenario 89, Treasure 42; and 183.4 Mail Call (mail call source unknown, possibly an event?)
216 / Tome of Elements -- 104.3; and 163.1 (Road Event outcomes, specific event unknown at this time)
217 / Tome of Time -- 107.2; and 191.1 (Road Event outcomes, specific event unknown at this time)
218 / Tome of Life -- 81.4; and 162.5 (Road Event outcomes, specific event unknown at this time)
219 / Tome of Conflict -- Scenario 134 Reward; and 153.3 (Road Event outcome, specific event unknown at this time)
224 / ?
240 / Demons Eye -- 108.2 Event --> 180.2 Accuse Cecil Event Reward (Specific event unknown at this time)
245 / Ancient Coin -- Scenario 136 Reward; Tavern (Building 74) Upgraded to Level 3, 128.5 on Loot Card 1419; 133.4 on Loot Card 1418
*/

/*
44.4 -> SR-48 Event chain, WR-46 event chain
142.1 -> SR-47 Event Chain, WR-45 event chain
153.3 -> Scenario 134
181.1 -> SR-49 event chain, WR-47 event chain

144.2 -> SO-53 event chain
187.3 -> SO-53 event chain
*/

/* 
81.4
162.5
	142.1
		?

104.3
163.1
	44.4
		?

107.2
191.1
	181.1
		?

153.3
	?

183.4 - SO-30


// These two are intertwinned some how
180.2
	88.2
		108.2
			113.2
			117.1
				144.2
					?
				187.3
					?
		113.2
		117.1
			144.2
				?
			187.3
				?
		135.5
			113.2
			117.1
				above
		149.2
			108.2
				above
			135.5
				above
			150.1
				below
			172.4
				below
			185.3
				below
		150.1
			113.2
			117.1
				above
		166.1
			108.2
				above
			135.5
				above
			150.1
				above
			172.4
				below
			185.3
				below	
		172.4
			113.2
			117.1
				above
		179.3
			108.2
				above
			135.5
				above
			150.1
				above
			172.4
				above
			185.3
				below
		185.3
			113.2
			117.1
				above
*/
