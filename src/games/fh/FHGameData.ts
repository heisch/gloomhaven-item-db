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

const initialGHItemsUnlocked = [10, 25, 72, 105, 109, 116];
const ghItemToImport = [...initialGHItemsUnlocked];

let { items, filterSlots } = getInitialItems(GameType.Frosthaven);
export const fhItemsCount: number = items.length;

let { items: ghItems, filterSlots: ghFilterSlots } = getInitialItems(
	GameType.Gloomhaven
);
ghItems = ghItems.map((item: GloomhavenItem, index: number) => ({
	...item,
	displayId: item.id,
	gameType: GameType.Gloomhaven,
	id: fhItemsCount + index + 1,
}));
ghItems = ghItems.filter((item) => ghItemToImport.includes(item.displayId));
items = items.concat(ghItems);

filterSlots = Helpers.uniqueArray(filterSlots.concat(ghFilterSlots));

export const isItemShown = ({ gameType, id, displayId }: GloomhavenItem) => {
	const all = getRecoil(allState);
	const includeGloomhavenItems = getRecoil(includeGloomhavenItemsState);
	const scenarioCompleted = getRecoil(scenarioCompletedState);
	if (all) {
		return true;
	}

	if (
		gameType &&
		gameType === GameType.Gloomhaven &&
		!includeGloomhavenItems
	) {
		return false;
	}

	if (scenarioCompleted.includes(1)) {
		if (id >= 1 && id <= 10) {
			return true;
		}
		if (initialGHItemsUnlocked.includes(displayId)) {
			return true;
		}
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
