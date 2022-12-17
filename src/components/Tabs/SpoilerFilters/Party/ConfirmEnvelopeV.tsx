import React from "react";
import { ListItem } from "semantic-ui-react";
import { SpecialUnlockTypes } from "../../../../State";
import { ConfirmSpecialUnlockPanel } from "../Common/ConfirmSpecialUnlockPanel";

const solutions = ["dnZ2", "YXNoZXM="];

export const ConfirmEnvelopeV = () => {
	return (
		<ConfirmSpecialUnlockPanel
			solutions={solutions}
			specialUnlockType={SpecialUnlockTypes.EnvelopeV}
			title="Envelope V"
		>
			<ListItem>Have you been told to open Envelope V?</ListItem>
			<ListItem>Enter the password you entered here:</ListItem>
		</ConfirmSpecialUnlockPanel>
	);
};
