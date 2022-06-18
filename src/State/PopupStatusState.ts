import { createState } from "./CommonState";
import { ClassesInUse, GloomhavenItem } from "./Types";

export const classToDeleteState = createState<ClassesInUse | undefined>(
	"classToDelete",
	undefined
);
export const confirmEnvelopeXState = createState<boolean>(
	"ConfirmEnvelopeX",
	false
);
export const confirmEnvelopeEState = createState<boolean>(
	"ConfirmEnvelopeE",
	false
);
export const selectedItemState = createState<GloomhavenItem | undefined>(
	"SelectedItem",
	undefined
);
