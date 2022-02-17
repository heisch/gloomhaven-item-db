import { GameType } from "../../games";
import { LOCAL_STORAGE_PREFIX } from "../../State/CommonState";
import {
	ClassesInUse,
	ItemManagementType,
	ItemViewDisplayType,
} from "../../State/Types";

export type ItemsOwnedBy = {
	[key: number]: ClassesInUse[];
};

export type ItemsInUse = {
	[key: number]: number;
};
export interface Spoiler {
	all: boolean;
	displayAs: ItemViewDisplayType;
	discount: number;
	envelopeX: boolean;
	item: number[];
	itemManagementType: ItemManagementType;
	itemsInUse: ItemsInUse;
	prosperity: number;

	soloClass: ClassesInUse[];
	scenarioCompleted: number[];
	classesInUse: ClassesInUse[];
	itemsOwnedBy: ItemsOwnedBy;
}

type GameFilterOptions = {
	[GameType.Gloomhaven]: Spoiler;
	[GameType.JawsOfTheLion]: Spoiler;
	lockSpoilerPanel: boolean;
};

export const getShareHash = (lockSpoilerPanel: boolean) => {
	// @ts-ignore
	const obj: GameFilterOptions = {};
	Object.values(GameType).forEach((gt: GameType) => {
		const gameStorageString = localStorage.getItem(
			LOCAL_STORAGE_PREFIX + gt
		);
		obj[gt] = gameStorageString ? JSON.parse(gameStorageString) : {};
	});
	obj["lockSpoilerPanel"] = lockSpoilerPanel;
	return btoa(JSON.stringify(obj));
};
