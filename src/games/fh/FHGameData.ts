import { Spoiler } from "../../components/Providers/FilterOptions";
import { Helpers } from "../../helpers";
import { GloomhavenItem } from "../../State/Types";
import { GameData, getInitialItems } from "../GameData";
import { GameType } from "../GameType";

const initialGHItemsUnlocked = [10, 25, 72, 105, 109, 116];
const ghItemToImport = [...initialGHItemsUnlocked];

let { items, filterSlots } = getInitialItems(GameType.Frosthaven);
export const fhItemsCount: number = items.length;

let { items: ghItems, filterSlots: ghFilterSlots } = getInitialItems(
	GameType.Gloomhaven
);
console.log("gotten items", ghItems);
ghItems = ghItems.map((item: GloomhavenItem, index: number) => ({
	...item,
	displayId: item.id,
	gameType: GameType.Gloomhaven,
	id: fhItemsCount + index + 1,
}));
console.log("fhItemsCount", fhItemsCount);
console.log("mutated items", ghItems);
console.log("Items to import", ghItemToImport);
ghItems = ghItems.filter((item) => ghItemToImport.includes(item.displayId));
console.log("filterted Items", ghItems);
items = items.concat(ghItems);
console.log("all items", items);

filterSlots = Helpers.uniqueArray(filterSlots.concat(ghFilterSlots));

export const isItemShown = (
	{ gameType, id, displayId }: GloomhavenItem,
	{ all, includeGloomhavenItems, scenarioCompleted }: Spoiler
) => {
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
