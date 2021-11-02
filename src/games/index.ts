import { GameType } from './GameType';
import { GHGameData } from './gh/GHGameData';
import { JOTLGameData } from './jotl/JOTlGameData';

const gameDataTypes = {
    [GameType.Gloomhaven] : GHGameData,
    [GameType.JawsOfTheLion] : JOTLGameData
}

export {gameDataTypes, GameType};
