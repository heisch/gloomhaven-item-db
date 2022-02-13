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
export interface FilterOptions {
	soloClass: ClassesInUse[];
	scenarioCompleted: number[];
	classesInUse: ClassesInUse[];
	itemsOwnedBy: ItemsOwnedBy;
	envelopeX: boolean;
}

export interface Spoiler extends FilterOptions {
	all: boolean;
	displayAs: ItemViewDisplayType;
	discount: number;
	item: number[];
	itemManagementType: ItemManagementType;
	itemsInUse: ItemsInUse;
	prosperity: number;
}

export const initialFilterOptions: FilterOptions = {
	soloClass: [],
	scenarioCompleted: [],
	classesInUse: [],
	itemsOwnedBy: {},
	envelopeX: false,
};

export interface OldFilterOptions extends FilterOptions {
	item: Array<number> | any;
	soloClass: Array<SoloClassShorthand> | any;
}
