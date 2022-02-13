import { create } from "domain";
import {
	ItemsInUse,
	ItemsOwnedBy,
} from "../components/Providers/FilterOptions";
import { createState } from "./CommonState";
import {
	ClassesInUse,
	GloomhavenItemSlot,
	ItemManagementType,
	ItemViewDisplayType,
	SortDirection,
	SortProperty,
} from "./Types";

export const slotsState = createState<GloomhavenItemSlot[]>("slotState", []);
export const availableOnlyState = createState<boolean>("availableOnly", false);
export const searchState = createState<string>("search", "");
export const selectedClassState = createState<ClassesInUse | undefined>(
	"selectedClass",
	undefined
);
export const sortDirectionState = createState<SortDirection>(
	"sortDirection",
	SortDirection.ascending
);
export const sortPropertyState = createState<SortProperty>(
	"sortProperty",
	"id"
);

export const allState = createState<boolean>("all", false);
export const discountState = createState<number>("discount", 0);
export const prosperityState = createState<number>("prosperity", 1);
export const itemState = createState<number[]>("item", []);
export const displayItemAsState = createState<ItemViewDisplayType>(
	"displayItemAs",
	ItemViewDisplayType.List
);
export const itemsInUseState = createState<ItemsInUse>("itemsInUse", {});
export const itemManagementTypeState = createState<ItemManagementType>(
	"itemManagementType",
	ItemManagementType.None
);
export const envelopeXState = createState<boolean>("envelopeX", false);

export const soloClassState = createState<ClassesInUse[]>("soloClass", []);
export const scenarioCompletedState = createState<number[]>(
	"scenarioCompleted",
	[]
);
export const classesInUseState = createState<ClassesInUse[]>(
	"classesInUse",
	[]
);
export const itemsOwnedByState = createState<ItemsOwnedBy>("itemsOwnedBy", {});
