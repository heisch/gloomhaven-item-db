import { atom, selector } from "recoil";
import { gameDataTypes, GameType } from "../games";
import { GameData } from "../games/GameData";

export const gameTypeState = atom<GameType>({
	key: "gameTypeState",
	default:
		(localStorage.getItem("lastGame") as GameType) || GameType.Gloomhaven,
	effects: [
		({ onSet }) => {
			onSet((gameType) => {
				localStorage.setItem("lastGame", gameType);
			});
		},
	],
});

export const gameDataState = selector<GameData>({
	key: "gameDataState",
	get: ({ get }) => {
		const gameType: GameType = get(gameTypeState);
		return gameDataTypes[gameType];
	},
});
