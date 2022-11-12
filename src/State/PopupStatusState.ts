import { createState } from "./CommonState";
import { ClassesInUse, GloomhavenItem } from "./Types";

export const classToDeleteState = createState<ClassesInUse | undefined>(
	"classToDelete",
	undefined
);
export const confirmSpecialUnlockOpenState = createState<string | undefined>(
	"ConfirmSpecialUnlockOpen",
	undefined
);
export const selectedItemState = createState<GloomhavenItem | undefined>(
	"SelectedItem",
	undefined
);
