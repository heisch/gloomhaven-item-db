import { GameType, Expansions } from "./GameType";
import { GHGameData } from "./gh/GHGameData";
import { JOTLGameData } from "./jotl/JOTlGameData";
import { FHGameData } from "./fh/FHGameData";

const gameDataTypes = {
	[GameType.Gloomhaven]: GHGameData,
	[GameType.JawsOfTheLion]: JOTLGameData,
	[GameType.Frosthaven]: FHGameData,
};

export { gameDataTypes, GameType, Expansions };
