import { atom, RecoilState, selector } from "recoil";
import { gameTypeState } from ".";
import { gameDataTypes, GameType } from "../games";

type AtomObject<T> = {
	[key: string]: RecoilState<T>;
};

export function createState<T>(name: string, defaultValue: T) {
	const atoms: AtomObject<T> = {};
	Object.values(gameDataTypes).forEach(({ gameName, gameType }) => {
		atoms[gameType] = atom<T>({
			key: `${gameName}-${name}-state`,
			default: defaultValue,
		});
	});

	const stateSelector = selector<T>({
		key: `${name}-state`,
		get: ({ get }) => {
			const gameType: GameType = get(gameTypeState);
			return atoms[gameType];
		},
		set: ({ set, get }, newValue) => {
			const gameType: GameType = get(gameTypeState);
			return set(atoms[gameType], newValue);
		},
	});

	return stateSelector;
}
