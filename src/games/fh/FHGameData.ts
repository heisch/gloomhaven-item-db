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
