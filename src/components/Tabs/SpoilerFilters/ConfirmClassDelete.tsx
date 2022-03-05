import React from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import ClassIcon from "../MainView/ClassIcon";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	classesInUseState,
	classToDeleteState,
	gameDataState,
	itemsOwnedByState,
	selectedClassState,
} from "../../../State";
import { ItemsOwnedBy } from "../../../State/Types";

const ConfirmClassDelete = () => {
	const [selectedClass, setSelectedClass] =
		useRecoilState(selectedClassState);
	const [classToDelete, setClassToDelete] =
		useRecoilState(classToDeleteState);
	const [classesInUse, setClassesInUseBy] = useRecoilState(classesInUseState);
	const [itemsOwnedBy, setItemsOwnedBy] = useRecoilState(itemsOwnedByState);

	const { items } = useRecoilValue(gameDataState);

	const onClose = () => {
		setClassToDelete(undefined);
	};

	const itemsOwnedByClass = () => {
		if (!classToDelete) {
			return [];
		}
		const itemIds: number[] = [];
		Object.entries(itemsOwnedBy).forEach(([itemId, owners]) => {
			if (owners && owners.includes(classToDelete)) {
				itemIds.push(parseInt(itemId));
			}
		});
		return itemIds;
	};

	const itemsOwned = itemsOwnedByClass();

	const removeItems = () => {
		const newItemsOwnedBy: ItemsOwnedBy = Object.assign([], itemsOwnedBy);
		itemsOwned.forEach((itemId) => {
			const index = newItemsOwnedBy[itemId].findIndex(
				(c) => c === classToDelete
			);
			if (index != -1) {
				newItemsOwnedBy[itemId].splice(index, 1);
			}
		});
		setItemsOwnedBy(newItemsOwnedBy);
	};
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
			removeItems();
			const newClassesInUse = Object.assign([], classesInUse);
			const index = newClassesInUse.findIndex((c) => c === classToDelete);
			if (index != -1) {
				newClassesInUse.splice(index, 1);
			}

			let newSelectedClass = selectedClass;
			if (newSelectedClass === classToDelete) {
				newSelectedClass = undefined;
			}
			setClassesInUseBy(newClassesInUse);
			setSelectedClass(newSelectedClass);
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
