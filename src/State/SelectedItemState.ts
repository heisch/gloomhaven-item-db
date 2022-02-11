import { atom, selector } from "recoil";
import { GameType } from "../games";
import { gameTypeState } from "./GameTypeState";
import { GloomhavenItem } from "./Types";

export const ghSelectedItemState = atom<GloomhavenItem | undefined>({
	key: "ghSelectedItemState",
	default: undefined,
});

export const jotlSelectedItemState = atom<GloomhavenItem | undefined>({
	key: "jotlSelectedItemState",
	default: undefined,
});

export const selectedItemState = selector<GloomhavenItem | undefined>({
	key: "SelectedItemState",
	get: ({ get }) => {
		const gameType: GameType = get(gameTypeState);
		switch (gameType) {
			case GameType.Gloomhaven:
				return get(ghSelectedItemState);
			case GameType.JawsOfTheLion:
				return get(jotlSelectedItemState);
		}
	},
	set: ({ set, get }, newValue) => {
		const gameType: GameType = get(gameTypeState);
		switch (gameType) {
			case GameType.Gloomhaven:
				return set(ghSelectedItemState, newValue);
			case GameType.JawsOfTheLion:
				return set(jotlSelectedItemState, newValue);
		}
	},
});
