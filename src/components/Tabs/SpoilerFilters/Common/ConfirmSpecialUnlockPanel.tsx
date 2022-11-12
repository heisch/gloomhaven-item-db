import React, { ReactNode, useState } from "react";
import {
	Button,
	ListItem,
	List,
	Modal,
	Input,
	InputProps,
} from "semantic-ui-react";
import { useRecoilState } from "recoil";
import {
	confirmSpecialUnlockOpenState,
	specialUnlocksState,
	SpecialUnlockTypes,
} from "../../../../State";

type Props = {
	solutions: string[];
	specialUnlockType: SpecialUnlockTypes;
	children: ReactNode | ReactNode[];
	title: string;
	onConfirm?: () => {};
};

export const ConfirmSpecialUnlockPanel = (props: Props) => {
	const { solutions, specialUnlockType, children, title } = props;
	const [solutionCorrect, setSolutionCorrect] = useState(false);
	const [confirmSpecialUnlockOpen, setConfirmSpecialUnlockOpen] =
		useRecoilState(confirmSpecialUnlockOpenState);
	const [specialUnlocks, setSpecialUnlocks] =
		useRecoilState(specialUnlocksState);

	const onClose = () => {
		setConfirmSpecialUnlockOpen(undefined);
	};

	const checkSolution = (_e: any, data: InputProps) => {
		const solution = data.value || "";
		setSolutionCorrect(solutions.includes(btoa(solution.toLowerCase())));
	};

	const onApply = () => {
		if (solutionCorrect) {
			if (!specialUnlocks.includes(specialUnlockType)) {
				setSpecialUnlocks((current) => {
					return [...current, specialUnlockType];
				});
			}
		}
		onClose();
	};

	return (
		<Modal
			size="tiny"
			open={confirmSpecialUnlockOpen === specialUnlockType}
			onClose={onClose}
		>
			<Modal.Header>{title}</Modal.Header>
			<Modal.Content>
				<List>
					{children}
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
