import { atom, selector } from "recoil";
import { GameType } from "../../games";
import { gameTypeState } from "../GameTypeState";

export const ghAvailableOnlyState = atom<boolean>({
	key: "ghAvailableOnlyState",
	default: false,
});

export const jotlAvailableOnlyState = atom<boolean>({
	key: "jotlAvailableOnlyState",
	default: false,
});

export const availableOnlyState = selector<boolean>({
	key: "AvailableOnlyState",
	get: ({ get }) => {
		const gameType: GameType = get(gameTypeState);
		switch (gameType) {
			case GameType.Gloomhaven:
				return get(ghAvailableOnlyState);
			case GameType.JawsOfTheLion:
				return get(jotlAvailableOnlyState);
		}
	},
	set: ({ set, get }, newValue) => {
		const gameType: GameType = get(gameTypeState);
		switch (gameType) {
			case GameType.Gloomhaven:
				return set(ghAvailableOnlyState, newValue);
			case GameType.JawsOfTheLion:
				return set(jotlAvailableOnlyState, newValue);
		}
	},
});
