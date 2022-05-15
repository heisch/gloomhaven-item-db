import { atom } from "recoil";
import { AllGames, Expansions, GameType } from "../games/GameType";
import { createSpoilerState } from "./CommonState";
import {
	ClassesInUse,
	FCClasses,
	GHClasses,
	ItemManagementType,
	ItemsInUse,
	ItemsOwnedBy,
	ItemViewDisplayType,
	JOTLClasses,
} from "./Types";

export const allState = createSpoilerState<boolean>("all", false);
export const classesInUseState = createSpoilerState<ClassesInUse[]>(
	"classesInUse",
	[]
);
export const discountState = createSpoilerState<number>("discount", 0);
export const displayItemAsState = createSpoilerState<ItemViewDisplayType>(
	"displayAs",
	ItemViewDisplayType.List
);
export const envelopeXState = createSpoilerState<boolean>("envelopeX", false);
export const itemState = createSpoilerState<number[]>("item", []);
export const itemManagementTypeState = createSpoilerState<ItemManagementType>(
	"itemManagementType",
	ItemManagementType.None
);
export const itemsInUseState = createSpoilerState<ItemsInUse>("itemsInUse", {});

const fixItemsOwnedBy = (oldItemsOwnedBy: any) => {
	if (Array.isArray(oldItemsOwnedBy)) {
		const newItemsOwnedBy: ItemsOwnedBy = {};
		oldItemsOwnedBy.forEach((value, index) => {
			if (value && value.length) {
				newItemsOwnedBy[index] = value;
			}
		});
		return newItemsOwnedBy;
	}
	return oldItemsOwnedBy;
};
export const itemsOwnedByState = createSpoilerState<ItemsOwnedBy>(
	"itemsOwnedBy",
	{},
	fixItemsOwnedBy
);
export const prosperityState = createSpoilerState<number>("prosperity", 1);
export const scenarioCompletedState = createSpoilerState<number[]>(
	"scenarioCompleted",
	[]
);
export const soloClassState = createSpoilerState<ClassesInUse[]>(
	"soloClass",
	[]
);

function shouldAddGame<E>(classesInUse: ClassesInUse[], e: E): boolean {
	const value = Object.values(e).some((classType) => {
		if (classesInUse.includes(classType)) {
			return true;
		}
	});
	return value;
}

const fixIncludedGames = (old: any, gameType: GameType, spoilerObj: any) => {
	const newGames = Object.assign([], old);
	if (!newGames || newGames.length === 0) {
		const classesInUse = spoilerObj["classesInUse"];
		if (classesInUse) {
			if (shouldAddGame(classesInUse, GHClasses)) {
				newGames.push(GameType.Gloomhaven);
			}
			if (shouldAddGame(classesInUse, FCClasses)) {
				newGames.push(Expansions.ForgottenCircles);
			}
			if (shouldAddGame(classesInUse, JOTLClasses)) {
				newGames.push(GameType.JawsOfTheLion);
			}
		}
		const items = spoilerObj["item"];
		if (
			items &&
			gameType === GameType.Gloomhaven &&
			!newGames.includes(Expansions.ForgottenCircles)
		) {
			const value = items.some((item: any) => item >= 153);
			if (value) {
				newGames.push(Expansions.ForgottenCircles);
			}
		}
	}
	if (!newGames.includes(gameType)) {
		newGames.push(gameType);
	}
	return newGames;
};

export const includeGameState = createSpoilerState<AllGames[]>(
	"includeGames",
	[],
	fixIncludedGames
);

export const dataMismatchState = atom({
	key: "data-mistmatch-state",
	default: false,
});

export const remoteDataState = atom<string | undefined>({
	key: "remote-data-state",
	default: undefined,
});

export const importHashState = atom<string | undefined>({
	key: "import-hash-state",
	default: undefined,
});

export const lockSpoilerPanelState = atom({
	key: "lock-spoiler-panel-state",
	default: localStorage.getItem("lockSpoilerPanel") === "true",
});
