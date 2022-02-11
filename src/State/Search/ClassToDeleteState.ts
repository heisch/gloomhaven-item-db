import { atom, selector } from "recoil";
import { GameType } from "../../games";
import { gameTypeState } from "../GameTypeState";
import { ClassesInUse } from "../Types";

export const ghClassToDeleteState = atom<ClassesInUse | undefined>({
	key: "ghClassToDeleteState",
	default: undefined,
});

export const jotlClassToDeleteState = atom<ClassesInUse | undefined>({
	key: "jotlClassToDeleteState",
	default: undefined,
});

export const classToDeleteState = selector<ClassesInUse | undefined>({
	key: "ClassToDeleteState",
	get: ({ get }) => {
		const gameType: GameType = get(gameTypeState);
		switch (gameType) {
			case GameType.Gloomhaven:
				return get(ghClassToDeleteState);
			case GameType.JawsOfTheLion:
				return get(jotlClassToDeleteState);
		}
	},
	set: ({ set, get }, newValue) => {
		const gameType: GameType = get(gameTypeState);
		switch (gameType) {
			case GameType.Gloomhaven:
				return set(ghClassToDeleteState, newValue);
			case GameType.JawsOfTheLion:
				return set(jotlClassToDeleteState, newValue);
		}
	},
});
