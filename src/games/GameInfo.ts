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
	addItemsToGames?: AllGames[];
	gamesToFilterOn?: AllGames[];
	title: string;
	folderName: string;
	prefix: string;
	leadingZeros: number;
	itemsSortOrder: number;
	gameClasses: () => ClassesInUse[];
	soloGameType?: GameType;
	linkedGameTypes?: Expansions[];
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
		linkedGameTypes: [
			Expansions.GHSoloScenarios,
			Expansions.ForgottenCircles,
			Expansions.CrimsonScales,
			Expansions.CrimsonScalesAddon,
			Expansions.TrailOfAshes,
		],
	},
	[GameType.JawsOfTheLion]: {
		folderName: "jaws-of-the-lion",
		prefix: "jl",
		leadingZeros: 2,
		gamesToFilterOn: [GameType.JawsOfTheLion],
		title: "Jaws of the Lion",
		itemsSortOrder: 9,
		gameClasses: () => Object.values(JOTLClasses),
	},
	[GameType.Frosthaven]: {
		folderName: "frosthaven",
		prefix: "fh",
		leadingZeros: 3,
		gamesToFilterOn: [GameType.Frosthaven],
		title: "Frosthaven",
		itemsSortOrder: 1,
		gameClasses: () => Object.values(FHClasses),
		linkedGameTypes: [Expansions.FHSoloScenarios],
	},
	[Expansions.ForgottenCircles]: {
		folderName: "forgotten-circles",
		prefix: "fc",
		leadingZeros: 3,
		title: "Forgotten Circles",
		addItemsToGames: [GameType.Gloomhaven, GameType.Frosthaven],
		itemsSortOrder: 5,
		gameClasses: () => Object.values(FCClasses),
	},
	[Expansions.CrimsonScales]: {
		folderName: "crimson-scales",
		prefix: "cs",
		leadingZeros: 2,
		title: "Crimson Scales",
		addItemsToGames: [GameType.Gloomhaven],
		itemsSortOrder: 6,
		gameClasses: () => Object.values(CSClasses),
	},
	[Expansions.CrimsonScalesAddon]: {
		folderName: "crimson-scales",
		prefix: "cs",
		leadingZeros: 2,
		title: "Crimson Scales Addon",
		addItemsToGames: [GameType.Gloomhaven],
		itemsSortOrder: 7,
		gameClasses: () => Object.values(CSAClasses),
	},
	[Expansions.TrailOfAshes]: {
		folderName: "trail-of-ashes",
		prefix: "toa",
		leadingZeros: 2,
		title: "Trail of Ashes",
		addItemsToGames: [GameType.Gloomhaven],
		itemsSortOrder: 8,
		gameClasses: () => Object.values(TOAClasses),
	},
	[Expansions.GHSoloScenarios]: {
		folderName: "gloomhaven",
		prefix: "gh",
		leadingZeros: 0,
		gamesToFilterOn: [GameType.JawsOfTheLion],
		title: "Gloomhaven Solo Scenarios",
		soloGameTitle: "Gloomhaven",
		itemsSortOrder: 4,
		gameClasses: () => [],
		soloGameType: GameType.Gloomhaven,
	},
	[Expansions.FHSoloScenarios]: {
		folderName: "frosthaven",
		prefix: "fh",
		leadingZeros: 0,
		gamesToFilterOn: [GameType.Gloomhaven, GameType.JawsOfTheLion],
		title: "Frosthaven Solo Scenarios",
		soloGameTitle: "Frosthaven",
		itemsSortOrder: 2,
		gameClasses: () => [],
		soloGameType: GameType.Frosthaven,
	},
};
