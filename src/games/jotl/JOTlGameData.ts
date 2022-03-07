import { GameData, getInitialItems } from "../GameData";
import { GameType } from "../GameType";

const { items, filterSlots } = getInitialItems(GameType.JawsOfTheLion);

export const JOTLGameData: GameData = {
	gameType: GameType.JawsOfTheLion,
	gameName: "Gloomhaven: Jaws of the Lion",
	items,
	filterSlots,
};
