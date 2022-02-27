import { Spoiler } from "../../components/Providers/FilterOptions";
import { GloomhavenItem, gloomhavenItemSlots } from "../../State/Types";
import { GameData, getInitialItems } from "../GameData";
import { GameType } from "../GameType";

export const ghItemToImport = [10, 25, 72, 105, 109, 116];

let { items, filterSlots } = getInitialItems(GameType.Frosthaven);
export const fhItemsCount: number = items.length;

let { items: ghItems, filterSlots: ghFilterSlots } = getInitialItems(
	GameType.Gloomhaven
);
ghItems = ghItems.map((item: GloomhavenItem, index: number) => ({
	...item,
	displayId: item.id,
	gameType: GameType.Gloomhaven,
	id: items.length + index + 1,
}));
ghItems = ghItems.filter((item) => ghItemToImport.includes(item.id - 1));
items = items.concat(ghItems);

filterSlots = filterSlots.concat(ghFilterSlots);

export const isItemShown = ({}: GloomhavenItem, { all }: Spoiler) => {
	if (all) {
		return true;
	}

	return false;
};

export const FHGameData: GameData = {
	gameType: GameType.Frosthaven,
	gameName: "Frosthaven",
	items,
	filterSlots: gloomhavenItemSlots.filter((slot) =>
		filterSlots.includes(slot)
	),
	isItemShown,
};
