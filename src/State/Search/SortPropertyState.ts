import { atom, selector } from "recoil";
import { GameType } from "../../games";
import { gameTypeState } from "../GameTypeState";
import { SortProperty } from "../Types";

export const ghSortPropertyState = atom<SortProperty>({
	key: "ghSortProperty",
	default: "id",
});

export const jotlSortPropertyState = atom<SortProperty>({
	key: "jotlSortProperty",
	default: "id",
});

export const sortPropertyState = selector<SortProperty>({
	key: "sortProperty",
	get: ({ get }) => {
		const gameType: GameType = get(gameTypeState);
		switch (gameType) {
			case GameType.Gloomhaven:
				return get(ghSortPropertyState);
			case GameType.JawsOfTheLion:
				return get(jotlSortPropertyState);
		}
	},
	set: ({ set, get }, newValue) => {
		const gameType: GameType = get(gameTypeState);
		switch (gameType) {
			case GameType.Gloomhaven:
				return set(ghSortPropertyState, newValue);
			case GameType.JawsOfTheLion:
				return set(jotlSortPropertyState, newValue);
		}
	},
});
