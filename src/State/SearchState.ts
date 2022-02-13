import { createState } from "./CommonState";
import {
	ClassesInUse,
	GloomhavenItemSlot,
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
