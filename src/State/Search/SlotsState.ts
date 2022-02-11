import { atom, selector } from "recoil";
import { GameType } from "../../games";
import { gameTypeState } from "../GameTypeState";
import { GloomhavenItemSlot } from "../Types";

export const ghSlotsState = atom<GloomhavenItemSlot[]>({
	key: "ghSlotsState",
	default: [],
});

export const jotlSlotsState = atom<GloomhavenItemSlot[]>({
	key: "jotlSlotsState",
	default: [],
});

export const slotsState = selector<GloomhavenItemSlot[]>({
	key: "slotsState",
	get: ({ get }) => {
		const gameType: GameType = get(gameTypeState);
		switch (gameType) {
			case GameType.Gloomhaven:
				return get(ghSlotsState);
			case GameType.JawsOfTheLion:
				return get(jotlSlotsState);
		}
	},
	set: ({ set, get }, newValue) => {
		const gameType: GameType = get(gameTypeState);
		switch (gameType) {
			case GameType.Gloomhaven:
				return set(ghSlotsState, newValue);
			case GameType.JawsOfTheLion:
				return set(jotlSlotsState, newValue);
		}
	},
});
