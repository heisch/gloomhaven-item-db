import { atom, RecoilState, selector } from "recoil";
import { gameTypeState } from ".";
import { gameDataTypes, GameType } from "../games";
import { gameInfo } from "../games/GameInfo";

export const LOCAL_STORAGE_PREFIX = "ItemView:spoilerFilter_";

export type AtomObject<T> = {
	[key: string]: RecoilState<T>;
};

export const dataDirtyState = atom({
	key: "data-dirty-state",
	default: false,
});

type FixUpFunction<T> = (old: any, gameType: GameType, spoilerObj?: any) => T;

function getDefaultValue<T>(
	gameType: GameType,
	name: string,
	defaultValue: T,
	fixUp?: FixUpFunction<T>
) {
	const key = LOCAL_STORAGE_PREFIX + gameType;
	const spoilerStorage = localStorage.getItem(key);
	const spoilerObj = spoilerStorage ? JSON.parse(spoilerStorage) : {};
	const value = spoilerObj[name] || defaultValue;
	if (fixUp) {
		const newValue = fixUp(value, gameType, spoilerObj);
		spoilerObj[name] = newValue;
		localStorage.setItem(key, JSON.stringify(spoilerObj));
		return newValue;
	}
	return value;
}

function storeValue<T>(gameType: GameType, name: string, value: T) {
	const key = LOCAL_STORAGE_PREFIX + gameType;
	const spoilerStorage = localStorage.getItem(key);
	const spoilerObj = spoilerStorage ? JSON.parse(spoilerStorage) : {};
	spoilerObj[name] = value;
	localStorage.setItem(key, JSON.stringify(spoilerObj));
}

export function createState<T>(name: string, defaultValue: T) {
	const atoms: AtomObject<T> = {};
	Object.values(gameDataTypes).forEach(({ gameType }) => {
		const gameName = gameInfo[gameType].title;
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

export function createSpoilerState<T>(
	name: string,
	defaultValue: T,
	fixUp?: FixUpFunction<T>
) {
	const atoms: AtomObject<T> = {};
	Object.values(gameDataTypes).forEach(({ gameType }) => {
		const gameName = gameInfo[gameType].title;
		atoms[gameType] = atom<T>({
			key: `${gameName}-${name}-state`,
			default: getDefaultValue(gameType, name, defaultValue, fixUp),
			effects: [
				({ onSet }) => {
					onSet((value) => {
						storeValue(gameType, name, value);
					});
				},
			],
		});
	});

	const stateSelector = selector<T>({
		key: `${name}-state`,
		get: ({ get }) => {
			const gameType: GameType = get(gameTypeState);
			return atoms[gameType];
		},
		set: ({ set, get }, newValue) => {
			set(dataDirtyState, true);
			const gameType: GameType = get(gameTypeState);
			return set(atoms[gameType], newValue);
		},
	});

	return stateSelector;
}
