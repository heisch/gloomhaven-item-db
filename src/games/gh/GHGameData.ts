import { Spoiler } from "../../components/Providers/FilterOptions";
import { GloomhavenItem } from "../../State/Types";
import { GameData, getInitialItems } from "../GameData";
import { GameType } from "../GameType";

export const isItemShown = (
	{ id, soloItem }: GloomhavenItem,
	{ all, envelopeX, prosperity, soloClass }: Spoiler
) => {
	// Special case for item 151
	if (id === 151 && !envelopeX) {
		return false;
	}

	if (all) {
		return true;
	}
	if (id <= (prosperity + 1) * 7) {
		return true;
	}
	if (soloItem && soloClass.includes(soloItem)) {
		return true;
	}
	return false;
};

const { items, filterSlots } = getInitialItems(GameType.Gloomhaven);

export const GHGameData: GameData = {
	gameType: GameType.Gloomhaven,
	gameName: "Gloomhaven",
	items,
	filterSlots,
	isItemShown,
};
