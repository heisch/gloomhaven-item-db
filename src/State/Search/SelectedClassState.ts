import { atom, selector } from "recoil";
import { GameType } from "../../games";
import { gameTypeState } from "../GameTypeState";
import { ClassesInUse } from "../Types";

export const ghSelectedClassState = atom<ClassesInUse | undefined>({
	key: "ghSelectedClassState",
	default: undefined,
});

export const jotlSelectedClassState = atom<ClassesInUse | undefined>({
	key: "jotlSelectedClassState",
	default: undefined,
});

export const selectedClassState = selector<ClassesInUse | undefined>({
	key: "SelectedClassState",
	get: ({ get }) => {
		const gameType: GameType = get(gameTypeState);
		switch (gameType) {
			case GameType.Gloomhaven:
				return get(ghSelectedClassState);
			case GameType.JawsOfTheLion:
				return get(jotlSelectedClassState);
		}
	},
	set: ({ set, get }, newValue) => {
		const gameType: GameType = get(gameTypeState);
		switch (gameType) {
			case GameType.Gloomhaven:
				return set(ghSelectedClassState, newValue);
			case GameType.JawsOfTheLion:
				return set(jotlSelectedClassState, newValue);
		}
	},
});
