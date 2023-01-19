import { compareItems } from "../hooks/useItems";
import {
	ClassesInUse,
	CSAClasses,
	CSClasses,
	FCClasses,
	FHClasses,
	GHClasses,
	JOTLClasses,
	TOAClasses,
} from "../State";
import { AllGames, Expansions, GameType } from "./GameType";

export interface GameInfo {
	soloGameTitle?: string;
	addItemsToGames?: GameType[];
	gamesToFilterOn?: GameType[];
	title: string;
	folderName: string;
	prefix: string;
	leadingZeros: number;
	vendor?: string;
	itemsSortOrder: number;
	gameClasses: () => ClassesInUse[];
	filterSortOrder: number;
	soloGameType?: GameType;
}

export const gameInfo: Record<AllGames, GameInfo> = {
	[GameType.Gloomhaven]: {
		folderName: "gloomhaven",
		prefix: "gh",
		leadingZeros: 3,
		gamesToFilterOn: [GameType.Gloomhaven],
		title: "Gloomhaven",
		addItemsToGames: [GameType.Frosthaven],
		itemsSortOrder: 3,
		gameClasses: () => Object.values(GHClasses),
		filterSortOrder: 3,
	},
	[GameType.JawsOfTheLion]: {
		folderName: "jaws-of-the-lion",
		prefix: "jl",
		leadingZeros: 2,
		gamesToFilterOn: [GameType.JawsOfTheLion],
		title: "Jaws of the Lion",
		itemsSortOrder: 9,
		gameClasses: () => Object.values(JOTLClasses),
		filterSortOrder: 8,
	},
	[GameType.Frosthaven]: {
		folderName: "frosthaven",
		prefix: "fh",
		leadingZeros: 3,
		vendor: "nerdhaven",
		gamesToFilterOn: [GameType.Frosthaven],
		title: "Frosthaven",
		itemsSortOrder: 1,
		gameClasses: () => Object.values(FHClasses),
		filterSortOrder: 9,
	},
	[Expansions.ForgottenCircles]: {
		folderName: "forgotten-circles",
		prefix: "fc",
		leadingZeros: 3,
		title: "Forgotten Circles",
		addItemsToGames: [GameType.Gloomhaven, GameType.Frosthaven],
		itemsSortOrder: 5,
		gameClasses: () => Object.values(FCClasses),
		filterSortOrder: 4,
	},
	[Expansions.CrimsonScales]: {
		folderName: "crimson-scales",
		prefix: "cs",
		leadingZeros: 2,
		title: "Crimson Scales",
		addItemsToGames: [GameType.Gloomhaven],
		itemsSortOrder: 6,
		gameClasses: () => Object.values(CSClasses),
		filterSortOrder: 5,
	},
	[Expansions.CrimsonScalesAddon]: {
		folderName: "crimson-scales",
		prefix: "cs",
		leadingZeros: 2,
		title: "Crimson Scales Addon",
		addItemsToGames: [GameType.Gloomhaven],
		itemsSortOrder: 7,
		gameClasses: () => Object.values(CSAClasses),
		filterSortOrder: 6,
	},
	[Expansions.TrailOfAshes]: {
		folderName: "trail-of-ashes",
		prefix: "toa",
		leadingZeros: 2,
		title: "Trail of Ashes",
		addItemsToGames: [GameType.Gloomhaven],
		itemsSortOrder: 8,
		gameClasses: () => Object.values(TOAClasses),
		filterSortOrder: 7,
	},
	[Expansions.GHSoloScenarios]: {
		folderName: "gloomhaven",
		prefix: "gh",
		leadingZeros: 0,
		gamesToFilterOn: [GameType.JawsOfTheLion, GameType.Frosthaven],
		title: "Solo Scenarios",
		soloGameTitle: "Gloomhaven",
		itemsSortOrder: 4,
		gameClasses: () => [],
		filterSortOrder: 2,
		soloGameType: GameType.Gloomhaven,
	},
	[Expansions.FHSoloScenarios]: {
		folderName: "frosthaven",
		prefix: "fh",
		leadingZeros: 0,
		gamesToFilterOn: [GameType.Gloomhaven, GameType.JawsOfTheLion],
		title: "Solo Scenarios",
		soloGameTitle: "Frosthaven",
		itemsSortOrder: 2,
		gameClasses: () => [],
		filterSortOrder: 1,
		soloGameType: GameType.Frosthaven,
	},
};

export const sortOrder = (a: [string, GameInfo], b: [string, GameInfo]) => {
	const [, aInfo] = a;
	const [, bInfo] = b;
	const { filterSortOrder: sortOrderA } = aInfo;
	const { filterSortOrder: sortOrderB } = bInfo;
	return compareItems(sortOrderA, sortOrderB);
};
