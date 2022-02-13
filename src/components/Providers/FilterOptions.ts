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
	itemsInUse: ItemsInUse;
	soloClass: ClassesInUse[];
	displayAs: ItemViewDisplayType;
	itemManagementType: ItemManagementType;
	scenarioCompleted: number[];
	classesInUse: ClassesInUse[];
	itemsOwnedBy: ItemsOwnedBy;
	envelopeX: boolean;
}

export interface Spoiler extends FilterOptions {
	all: boolean;
	discount: number;
	prosperity: number;
	item: number[];
}

export const initialFilterOptions: FilterOptions = {
	itemsInUse: {},
	soloClass: [],
	displayAs: ItemViewDisplayType.List,
	itemManagementType: ItemManagementType.None,
	scenarioCompleted: [],
	classesInUse: [],
	itemsOwnedBy: {},
	envelopeX: false,
};

export interface OldFilterOptions extends FilterOptions {
	item: Array<number> | any;
	soloClass: Array<SoloClassShorthand> | any;
}
