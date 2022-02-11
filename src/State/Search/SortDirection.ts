import { atom, selector } from "recoil";
import { GameType } from "../../games";
import { gameTypeState } from "../GameTypeState";
import { SortDirection } from "../Types";

export const ghSortDirectionState = atom<SortDirection>({
	key: "ghSortDirectionState",
	default: SortDirection.ascending,
});

export const jotlSortDirectionState = atom<SortDirection>({
	key: "jotlSortDirectionState",
	default: SortDirection.ascending,
});

export const sortDirectionState = selector<SortDirection>({
	key: "sortDirectionState",
	get: ({ get }) => {
		const gameType: GameType = get(gameTypeState);
		switch (gameType) {
			case GameType.Gloomhaven:
				return get(ghSortDirectionState);
			case GameType.JawsOfTheLion:
				return get(jotlSortDirectionState);
		}
	},
	set: ({ set, get }, newValue) => {
		const gameType: GameType = get(gameTypeState);
		switch (gameType) {
			case GameType.Gloomhaven:
				return set(ghSortDirectionState, newValue);
			case GameType.JawsOfTheLion:
				return set(jotlSortDirectionState, newValue);
		}
	},
});
