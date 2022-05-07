import React from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import ClassIcon from "../MainView/ClassIcon";
import { useRecoilState, useRecoilValue } from "recoil";
import { classToDeleteState, gameDataState } from "../../../State";
import { useRemovePlayerUtils } from "../../../hooks/useRemovePlayer";

const ConfirmClassDelete = () => {
	const { removeClasses, itemsOwnedByClass } = useRemovePlayerUtils();
	const [classToDelete, setClassToDelete] =
		useRecoilState(classToDeleteState);

	const { items } = useRecoilValue(gameDataState);

	const onClose = () => {
		setClassToDelete(undefined);
	};

	const itemsOwned = itemsOwnedByClass(classToDelete);
	const goldAmount = () => {
		let totalGold = 0;
		itemsOwned.forEach((itemId) => {
			const { name, cost } = items[itemId - 1];
			totalGold += Math.floor(cost / 2);
		});
		return totalGold;
	};

	const onApply = () => {
		if (classToDelete) {
			removeClasses(classToDelete);
			setClassToDelete(undefined);
		}
		onClose();
	};

	return (
		<Modal size="tiny" open={classToDelete !== undefined} onClose={onClose}>
			<Modal.Header>
				Remove Class
				{classToDelete && (
					<ClassIcon
						name={classToDelete}
						className="confirmDeleteIcon"
					/>
				)}
			</Modal.Header>
			<Modal.Content>
				<Form>
					<Form.Group>Remove this class from the party?</Form.Group>
					{itemsOwned.length > 0 && (
						<>
							<Form.Group>
								<p>
									Warning: This will remove all the items
									assigned to this character.
								</p>
							</Form.Group>
							<Form.Group>
								<p>
									{`If you are retiring this character, they would get `}
									<span
										style={{
											color: "#0000a0",
											fontWeight: "bold",
										}}
									>{`${goldAmount()}g`}</span>
									{` for their items`}
								</p>
							</Form.Group>
						</>
					)}
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button negative onClick={onClose}>
					No
				</Button>
				<Button
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

export default ConfirmClassDelete;
