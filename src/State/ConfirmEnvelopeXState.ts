import { atom, selector } from "recoil";
import { GameType } from "../games";
import { gameTypeState } from "./GameTypeState";

export const ghConfirmEnvelopeXState = atom<boolean>({
	key: "ghConfirmEnvelopeXState",
	default: false,
});

export const jotlConfirmEnvelopeXState = atom<boolean>({
	key: "jotlConfirmEnvelopeXState",
	default: false,
});

export const confirmEnvelopeXState = selector<boolean>({
	key: "ConfirmEnvelopeXState",
	get: ({ get }) => {
		const gameType: GameType = get(gameTypeState);
		switch (gameType) {
			case GameType.Gloomhaven:
				return get(ghConfirmEnvelopeXState);
			case GameType.JawsOfTheLion:
				return get(jotlConfirmEnvelopeXState);
		}
	},
	set: ({ set, get }, newValue) => {
		const gameType: GameType = get(gameTypeState);
		switch (gameType) {
			case GameType.Gloomhaven:
				return set(ghConfirmEnvelopeXState, newValue);
			case GameType.JawsOfTheLion:
				return set(jotlConfirmEnvelopeXState, newValue);
		}
	},
});
