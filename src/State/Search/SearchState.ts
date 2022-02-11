import { atom, selector } from "recoil";
import { GameType } from "../../games";
import { gameTypeState } from "../GameTypeState";

export const ghSearchState = atom<string>({
	key: "ghSearchState",
	default: "",
});

export const jotlSearchState = atom<string>({
	key: "jotlSearchState",
	default: "",
});

export const searchState = selector<string>({
	key: "SearchState",
	get: ({ get }) => {
		const gameType: GameType = get(gameTypeState);
		switch (gameType) {
			case GameType.Gloomhaven:
				return get(ghSearchState);
			case GameType.JawsOfTheLion:
				return get(jotlSearchState);
		}
	},
	set: ({ set, get }, newValue) => {
		const gameType: GameType = get(gameTypeState);
		switch (gameType) {
			case GameType.Gloomhaven:
				return set(ghSearchState, newValue);
			case GameType.JawsOfTheLion:
				return set(jotlSearchState, newValue);
		}
	},
});
