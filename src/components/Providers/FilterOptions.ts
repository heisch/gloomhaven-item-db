import {
	ClassesInUse,
	ItemManagementType,
	ItemViewDisplayType,
	SoloClassShorthand,
} from "../../State/Types";

export type ItemsOwnedBy = {
	[key: number]: ClassesInUse[];
};

export type ItemsInUse = {
	[key: number]: number;
};
export interface FilterOptions {}

export interface Spoiler extends FilterOptions {
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

export const initialFilterOptions: FilterOptions = {};

export interface OldFilterOptions extends FilterOptions {
	item: Array<number> | any;
	soloClass: Array<SoloClassShorthand> | any;
}
