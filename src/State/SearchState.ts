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
	SortProperty.Id
);
