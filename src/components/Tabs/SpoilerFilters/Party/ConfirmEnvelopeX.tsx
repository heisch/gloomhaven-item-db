import React from "react";
import { ListItem } from "semantic-ui-react";
import { SpecialUnlockTypes } from "../../../../State";
import { ConfirmSpecialUnlockPanel } from "../Common/ConfirmSpecialUnlockPanel";

const solutions = ["eHh4", "YmxhZGVzd2FybQ=="];

export const ConfirmEnvelopeX = () => {
	return (
		<ConfirmSpecialUnlockPanel
			solutions={solutions}
			specialUnlockType={SpecialUnlockTypes.EnvelopeX}
			title="Envelope X"
		>
			<ListItem>Have you solved Envelope X?</ListItem>
			<ListItem>Enter the solution here:</ListItem>
		</ConfirmSpecialUnlockPanel>
	);
};
