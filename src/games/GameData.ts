import { getClassIcon } from "../components/Utils";
import { Helpers } from "../helpers";
import { GloomhavenItem, GloomhavenItemSlot } from "../State/Types";
import { gameInfo } from "./GameInfo";
import { GameType } from "./GameType";

export type GameData = {
	gameType: GameType;
	gameName: string;
	items: GloomhavenItem[];
	filterSlots: GloomhavenItemSlot[];
	resources?: string[];
};

const deSpoilerItemSource = (source: string): string => {
	return source.replace(/{(.{2,})}/, (m, m1) => {
		const classPath = getClassIcon(m1);
		return `<img class="soloClass" src="${classPath}" alt="" />`;
	});
};

export const getInitialItems = (gameType: GameType) => {
	const items: GloomhavenItem[] = require(`./${gameType}/items.json`);
	const filterSlots: GloomhavenItemSlot[] = [];
	const resources: string[] = [];

	items.forEach((item) => {
		item.descHTML = Helpers.parseEffectText(item.desc);
		if (item.backDesc) {
			item.backDescHTML = Helpers.parseEffectText(item.backDesc);
		}
		if (item.summon && item.summon.desc) {
			item.summon.desc = Helpers.parseEffectText(item.summon.desc);
		}
		const source = item.source
			.replace(/Reward from /gi, "")
			.replace(/ ?\((Treasure #\d+)\)/gi, "\n$1")
			.replace(/Solo Scenario #\d+ — /i, "Solo ");
		item.source = deSpoilerItemSource(source);
		if (!filterSlots.includes(item.slot)) {
			filterSlots.push(item.slot);
		}
		if (item.resources) {
			Object.keys(item.resources).forEach((resource) => {
				if (!resources.includes(resource)) {
					resources.push(resource);
				}
			});
		}
	});
	return { items, filterSlots, resources };
};

const getItemFilename = (item: GloomhavenItem, backside?: boolean) => {
	const { folder, name, gameType, id, displayId, imagePrefix, imageSuffix } =
		item;
	const idToUse = displayId || id.toString();
	const { leadingZeros, prefix } = gameInfo[gameType];
	const filename = name.toLowerCase().replace(/\s/g, "-").replace(/'/, "");
	const itemNumber = `${imagePrefix || ""}${(idToUse + "").padStart(
		leadingZeros,
		"0"
	)}${imageSuffix || ""}`;
	const itemFolder = folder ? folder + "/" : "";
	return `${itemFolder}${prefix}-${itemNumber}-${filename}${
		backside ? "-back" : ""
	}.png`;
};

export const getItemPath = (item: GloomhavenItem, backside?: boolean) => {
	const { gameType } = item;
	const { folderName, vendor } = gameInfo[gameType];
	const itemName = getItemFilename(item, backside);
	return require(`../../${
		vendor || "worldhaven"
	}/images/items/${folderName}/${itemName}`);
};
