import { GameData, getInitialItems } from "../GameData";
import { GameType } from "../GameType";

const { items, filterSlots } = getInitialItems(GameType.Gloomhaven);

export const GHGameData: GameData = {
	gameType: GameType.Gloomhaven,
	items,
	filterSlots,
};
