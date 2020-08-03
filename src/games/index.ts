import GHGameData from './gh/GHGameData';
import JOTLGameData from './jotl/JOTlGameData';
import BaseGameData from './GameData';

export enum GameType
{
    Gloomhaven = "gh",
    JawsOfTheLion= "jotl"
}

const gameDataTypes = {
    [GameType.Gloomhaven] : new GHGameData(),
    [GameType.JawsOfTheLion] : new JOTLGameData(),
}

export {gameDataTypes, BaseGameData};
