import { getClassIcon } from "../components/Utils";
import { Helpers } from "../helpers";
import { GloomhavenItem, GloomhavenItemSlot } from "../State/Types";
import { AllGames, Expansions, GameType } from "./GameType";

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

type FolderData = {
	folderName: string;
	prefix: string;
	leadingZeros: number;
	vendor?: string;
};

const gameFolders: Record<AllGames, FolderData> = {
	[GameType.Gloomhaven]: {
		folderName: "gloomhaven",
		prefix: "gh",
		leadingZeros: 3,
	},
	[GameType.JawsOfTheLion]: {
		folderName: "jaws-of-the-lion",
		prefix: "jl",
		leadingZeros: 2,
	},
	[GameType.Frosthaven]: {
		folderName: "frosthaven",
		prefix: "fh",
		leadingZeros: 3,
		vendor: "nerdhaven",
	},
	[Expansions.ForgottenCircles]: {
		folderName: "forgotten-circles",
		prefix: "fc",
		leadingZeros: 3,
	},
	[Expansions.CrimsonScales]: {
		folderName: "crimson-scales",
		prefix: "cs",
		leadingZeros: 2,
	},
	[Expansions.CrimsonScalesAddon]: {
		folderName: "crimson-scales",
		prefix: "cs",
		leadingZeros: 2,
	},
	[Expansions.TrailOfAshes]: {
		folderName: "trail-of-ashes",
		prefix: "toa",
		leadingZeros: 2,
	},
	[Expansions.GHSoloScenarios]: {
		folderName: "gloomhaven",
		prefix: "gh",
		leadingZeros: 0,
	},
	[Expansions.FHSoloScenarios]: {
		folderName: "frosthaven",
		prefix: "fh",
		leadingZeros: 0,
	},
};

const getItemFilename = (item: GloomhavenItem, backside?: boolean) => {
	const { folder, name, gameType, id, displayId, imagePrefix, imageSuffix } =
		item;
	const idToUse = displayId || id.toString();
	const { leadingZeros, prefix } = gameFolders[gameType];
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
	const { folderName, vendor } = gameFolders[gameType];
	const itemName = getItemFilename(item, backside);
	return require(`../../${
		vendor || "worldhaven"
	}/images/items/${folderName}/${itemName}`);
};
