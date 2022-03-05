import { GameType } from "../../games";
import { LOCAL_STORAGE_PREFIX } from "../../State/CommonState";
import { ClassesInUse } from "../../State/Types";

export type ItemsOwnedBy = {
	[key: number]: ClassesInUse[];
};

export type ItemsInUse = {
	[key: number]: number;
};

export const getShareHash = (lockSpoilerPanel: boolean) => {
	// @ts-ignore
	const obj = {};
	Object.values(GameType).forEach((gt: GameType) => {
		const gameStorageString = localStorage.getItem(
			LOCAL_STORAGE_PREFIX + gt
		);
		if (gameStorageString) {
			//@ts-ignore
			obj[gt] = JSON.parse(gameStorageString);
		}
	});
	//@ts-ignore
	obj["lockSpoilerPanel"] = lockSpoilerPanel;
	console.log(obj);
	return btoa(JSON.stringify(obj));
};
