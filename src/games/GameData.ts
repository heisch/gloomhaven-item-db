import { Helpers } from "../helpers";
import { GloomhavenItem, GloomhavenItemSlot } from "../State/Types";
import { AllGames, Expansions, GameType } from "./GameType";

export type GameData = {
	gameType: GameType;
	gameName: string;
	items: GloomhavenItem[];
	filterSlots: GloomhavenItemSlot[];
};

const deSpoilerItemSource = (source: string): string => {
	return source.replace(
		/{(.{2})}/,
		(m, m1) =>
			'<img class="icon" src="' +
			require("../img/classes/" + m1 + ".png") +
			'" alt="" />'
	);
};

export const getInitialItems = (gameType: GameType) => {
	const items: GloomhavenItem[] = require(`./${gameType}/items.json`);
	const filterSlots: GloomhavenItemSlot[] = [];

	items.forEach((item) => {
		item.descHTML = Helpers.parseEffectText(item.desc, gameType);
		const source = item.source
			.replace(/Reward from /gi, "")
			.replace(/ ?\((Treasure #\d+)\)/gi, "\n$1")
			.replace(/Solo Scenario #\d+ — /i, "Solo ");
		item.source = deSpoilerItemSource(source);
		if (!filterSlots.includes(item.slot)) {
			filterSlots.push(item.slot);
		}
	});
	return { items, filterSlots };
};
export const getItemPath = (item: GloomhavenItem) => {
	const { folder, name, gameType: itemGametype } = item;
	let gameFolder = itemGametype;
	if (
		itemGametype === GameType.Frosthaven ||
		itemGametype === Expansions.ForgottenCircles
	) {
		gameFolder = GameType.Gloomhaven;
	}
	const filename = name.toLowerCase().replace(/\s/g, "-").replace(/'/, "");
	return require(`../../vendor/${gameFolder}/images/items/${folder}/${filename}.png`);
};
