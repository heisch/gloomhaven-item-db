import { Helpers } from "../../helpers";
import { GloomhavenItem } from "../../State/Types";
import { GameData, getInitialItems } from "../GameData";
import { GameType } from "../GameType";
import { getRecoil } from "recoil-nexus";
import {
	allState,
	includeGloomhavenItemsState,
	scenarioCompletedState,
} from "../../State";

export const initialGHItemsUnlocked = [10, 25, 72, 105, 109, 116];
const ghItemToImport = [...initialGHItemsUnlocked];

let { items, filterSlots } = getInitialItems(GameType.Frosthaven);
export const fhItemsCount: number = items.length;

let { items: ghItems, filterSlots: ghFilterSlots } = getInitialItems(
	GameType.Gloomhaven
);

const getUnlockScenario = (id: number) => {
	if (initialGHItemsUnlocked.includes(id)) {
		return 1;
	}
	return -1;
};
ghItems = ghItems.map((item: GloomhavenItem, index: number) => ({
	...item,
	displayId: item.id,
	unlockScenario: getUnlockScenario(item.id),
	gameType: GameType.Gloomhaven,
	id: fhItemsCount + index + 1,
}));
ghItems = ghItems.filter((item) => ghItemToImport.includes(item.displayId));
items = items.concat(ghItems);

filterSlots = Helpers.uniqueArray(filterSlots.concat(ghFilterSlots));

export const isItemShown = ({ gameType, unlockScenario }: GloomhavenItem) => {
	const all = getRecoil(allState);
	const includeGloomhavenItems = getRecoil(includeGloomhavenItemsState);
	const scenarioCompleted = getRecoil(scenarioCompletedState);
	if (
		gameType &&
		gameType === GameType.Gloomhaven &&
		!includeGloomhavenItems
	) {
		return false;
	}
	if (all) {
		return true;
	}

	if (scenarioCompleted.includes(unlockScenario)) {
		return true;
	}

	return false;
};

export const FHGameData: GameData = {
	gameType: GameType.Frosthaven,
	gameName: "Frosthaven",
	items,
	filterSlots,
	isItemShown,
};
