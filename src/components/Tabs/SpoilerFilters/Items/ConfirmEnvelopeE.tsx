import React from "react";
import { ListItem } from "semantic-ui-react";
import { SpecialUnlockTypes } from "../../../../State";
import { ConfirmSpecialUnlockPanel } from "../Common/ConfirmSpecialUnlockPanel";

const solutions = ["ZWVl", "bGl2aW5nIGFybW9y"];

export const ConfirmEnvelopeE = () => {
	return (
		<ConfirmSpecialUnlockPanel
			solutions={solutions}
			specialUnlockType={SpecialUnlockTypes.EnvelopeE}
			title="Envelope E"
		>
			<>
				<ListItem>Have you solved Envelope E?</ListItem>
				<ListItem>Enter name of reward:</ListItem>
			</>
		</ConfirmSpecialUnlockPanel>
	);
};
