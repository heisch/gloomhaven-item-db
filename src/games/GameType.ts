export enum GameType {
	Gloomhaven = "gh",
	JawsOfTheLion = "jotl",
	Frosthaven = "fh",
}

export enum Expansions {
	ForgottenCircles = "fc",
	CrimsonScales = "cs",
	CrimsonScalesAddon = "csa",
	GHSoloScenarios = "ghss",
	FHSoloScenarios = "fhss",
}

export type AllGames = GameType | Expansions;
