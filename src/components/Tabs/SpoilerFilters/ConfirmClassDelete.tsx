import React from "react";
import { Button, Modal, Form, Image } from "semantic-ui-react";
import { useSearchOptions } from "../../Providers/SearchOptionsProvider";
import { useFilterOptions } from "../../Providers/FilterOptionsProvider";
import { ItemsOwnedBy } from "../../Providers/FilterOptions";
import ClassIcon from "../MainView/ClassIcon";
import { useRecoilValue } from "recoil";
import { gameDataState } from "../../../State";

const ConfirmClassDelete = () => {
	const {
		searchOptions: { classToRemove, selectedClass },
		updateSearchOptions,
	} = useSearchOptions();
	const {
		filterOptions: { classesInUse, itemsOwnedBy },
		updateFilterOptions,
	} = useFilterOptions();
	const { items } = useRecoilValue(gameDataState);

	const onClose = () => {
		updateSearchOptions({ classToRemove: undefined });
	};

	const itemsOwnedByClass = () => {
		if (!classToRemove) {
			return [];
		}
		const itemIds: number[] = [];
		Object.entries(itemsOwnedBy).forEach(([itemId, owners]) => {
			if (owners && owners.includes(classToRemove)) {
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
				(c) => c === classToRemove
			);
			if (index != -1) {
				newItemsOwnedBy[itemId].splice(index, 1);
			}
		});
		updateFilterOptions({ itemsOwnedBy: newItemsOwnedBy });
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
		if (classToRemove) {
			removeItems();
			const newClassesInUse = Object.assign([], classesInUse);
			const index = newClassesInUse.findIndex((c) => c === classToRemove);
			if (index != -1) {
				newClassesInUse.splice(index, 1);
			}

			let newSelectedClass = selectedClass;
			if (newSelectedClass === classToRemove) {
				newSelectedClass = undefined;
			}
			updateFilterOptions({ classesInUse: newClassesInUse });
			updateSearchOptions({
				classToRemove: undefined,
				selectedClass: newSelectedClass,
			});
		}
		onClose();
	};

	return (
		<Modal size="tiny" open={classToRemove !== undefined} onClose={onClose}>
			<Modal.Header>
				Remove Class{" "}
				{classToRemove && (
					<ClassIcon
						name={classToRemove}
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
