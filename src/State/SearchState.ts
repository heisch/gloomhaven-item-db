import { AllGames } from "../games/GameType";
import { createState } from "./CommonState";
import {
	ClassesInUse,
	GloomhavenItemSlot,
	ResourceTypes,
	SortDirection,
	SortProperty,
} from "./Types";

export const slotsState = createState<GloomhavenItemSlot[]>("slotState", []);
export const resourcesState = createState<ResourceTypes[]>(
	"resourcesState",
	[]
);
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
export const removingGameState = createState<AllGames | undefined>(
	"removingGame",
	undefined
);
