import { createState } from "./CommonState";
import {
	ClassesInUse,
	GloomhavenItemSlot,
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
