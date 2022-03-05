import { getRecoil } from "recoil-nexus";
import { allState, scenarioCompletedState } from "../../State";
import { GloomhavenItem } from "../../State/Types";
import { GameData, getInitialItems } from "../GameData";
import { GameType } from "../GameType";

export const isItemShown = ({ id }: GloomhavenItem) => {
	const all = getRecoil(allState);
	const scenarioCompleted = getRecoil(scenarioCompletedState);
	if (all) {
		return true;
	}
	if (id <= 13 && scenarioCompleted.includes(2)) {
		return true;
	}
	if (id >= 15 && id <= 20 && scenarioCompleted.includes(9)) {
		return true;
	}
	if (id >= 21 && id <= 26 && scenarioCompleted.includes(15)) {
		return true;
	}
	return false;
};

const { items, filterSlots } = getInitialItems(GameType.JawsOfTheLion);

export const JOTLGameData: GameData = {
	gameType: GameType.JawsOfTheLion,
	gameName: "Gloomhaven: Jaws of the Lion",
	items,
	filterSlots,
	isItemShown,
};
