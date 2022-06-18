import React, { useState } from "react";
import {
	Button,
	ListItem,
	List,
	Modal,
	Input,
	InputProps,
} from "semantic-ui-react";
import { useRecoilState } from "recoil";
import { confirmEnvelopeEState, specialUnlocksState } from "../../../../State";

export const ConfirmEnvelopeE = () => {
	const [solutionCorrect, setSolutionCorrect] = useState(false);
	const [confirmEnvelopeE, setConfirmEnvelopeE] = useRecoilState(
		confirmEnvelopeEState
	);
	const [specialUnlocks, setSpecialUnlocks] =
		useRecoilState(specialUnlocksState);

	const onClose = () => {
		setConfirmEnvelopeE(false);
	};

	const checkSolution = (_e: any, data: InputProps) => {
		const solution = data.value || "";
		setSolutionCorrect(btoa(solution.toLowerCase()) === "bGl2aW5nIGFybW9y");
	};

	const onApply = () => {
		if (solutionCorrect) {
			if (!specialUnlocks.includes("envelopeE")) {
				setSpecialUnlocks((current) => {
					return [...current, "envelopeE"];
				});
			}
		}
		onClose();
	};

	return (
		<Modal size="tiny" open={confirmEnvelopeE} onClose={onClose}>
			<Modal.Header>Envelope E</Modal.Header>
			<Modal.Content>
				<List>
					<ListItem>Have you solved Envelope E?</ListItem>
					<ListItem>Enter name of reward:</ListItem>
					<ListItem>
						<Input onChange={checkSolution} />
					</ListItem>
				</List>
			</Modal.Content>
			<Modal.Actions>
				<Button negative onClick={onClose}>
					No
				</Button>
				<Button
					disabled={!solutionCorrect}
					positive
					icon="checkmark"
					labelPosition="right"
					content="Yes"
					onClick={onApply}
				/>
			</Modal.Actions>
		</Modal>
	);
};
