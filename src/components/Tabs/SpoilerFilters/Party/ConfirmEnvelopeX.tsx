import React, { useState } from "react";
import {
	Button,
	ListItem,
	List,
	Modal,
	Input,
	InputProps,
} from "semantic-ui-react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { confirmEnvelopeXState, envelopeXState } from "../../../../State";

export const ConfirmEnvelopeX = () => {
	const [solutionCorrect, setSolutionCorrect] = useState(false);
	const [confirmEnvelopeX, setConfirmEnvelopeX] = useRecoilState(
		confirmEnvelopeXState
	);
	const setEnvelopeX = useSetRecoilState(envelopeXState);

	const onClose = () => {
		setConfirmEnvelopeX(false);
	};

	const checkSolution = (_e: any, data: InputProps) => {
		const solution = data.value || "";
		setSolutionCorrect(btoa(solution.toLowerCase()) === "YmxhZGVzd2FybQ==");
	};

	const onApply = () => {
		if (solutionCorrect) {
			setEnvelopeX(true);
		}
		onClose();
	};

	return (
		<Modal size="tiny" open={confirmEnvelopeX} onClose={onClose}>
			<Modal.Header>Envelope X</Modal.Header>
			<Modal.Content>
				<List>
					<ListItem>Have you solved Envelope X?</ListItem>
					<ListItem>Enter the solution here:</ListItem>
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
