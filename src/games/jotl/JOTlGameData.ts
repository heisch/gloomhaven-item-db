import { getRecoil } from "recoil-nexus";
import { allState, scenarioCompletedState } from "../../State";
import { GloomhavenItem } from "../../State/Types";
import { GameData, getInitialItems } from "../GameData";
import { GameType } from "../GameType";

export const isItemShown = ({ unlockScenario }: GloomhavenItem) => {
	const all = getRecoil(allState);
	const scenarioCompleted = getRecoil(scenarioCompletedState);
	if (all) {
		return true;
	}
	if (scenarioCompleted.includes(unlockScenario)) {
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
