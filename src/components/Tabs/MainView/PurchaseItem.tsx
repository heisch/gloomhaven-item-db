import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import { ClassesInUse } from "../../../State/Types";
import { useFilterOptions } from "../../Providers/FilterOptionsProvider";
import { ItemsOwnedBy } from "../../Providers/FilterOptions";
import { ClassList } from "../SpoilerFilters/ClassList";
import { getItemPath } from "../../../games/GameData";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	discountState,
	gameDataState,
	selectedItemState,
} from "../../../State";

const PurchaseItem = () => {
	const [selectedItem, setSelectedItem] = useRecoilState(
		selectedItemState.stateSelector
	);
	const {
		filterOptions: { classesInUse, itemsOwnedBy },
		updateFilterOptions,
	} = useFilterOptions();
	const [owners, setOwners] = useState<ClassesInUse[]>([]);
	const { gameType } = useRecoilValue(gameDataState);
	const discount = useRecoilValue(discountState.stateSelector);

	useEffect(() => {
		if (!selectedItem || !itemsOwnedBy) {
			return;
		}
		setOwners(itemsOwnedBy[selectedItem.id] || []);
	}, [selectedItem, itemsOwnedBy]);

	const onClose = () => {
		setSelectedItem(undefined);
	};

	const onApply = () => {
		if (selectedItem) {
			const newItemsOwnedBy: ItemsOwnedBy = Object.assign(
				[],
				itemsOwnedBy
			);
			if (owners) {
				newItemsOwnedBy[selectedItem.id] = owners;
			}
			updateFilterOptions({ itemsOwnedBy: newItemsOwnedBy });
		}
		onClose();
	};

	const toggleOwnership = (className: ClassesInUse) => {
		if (!owners || !selectedItem) {
			return;
		}
		const value = Object.assign([], owners);
		if (value.includes(className)) {
			value.splice(value.indexOf(className), 1);
		} else if (owners.length < selectedItem.count) {
			value.push(className);
		}
		setOwners(value);
	};

	const isItemEnabled = (key: ClassesInUse) => {
		if (!selectedItem || !owners) {
			return false;
		}
		if (owners.includes(key)) {
			return true;
		}
		return owners.length < selectedItem.count;
	};

	if (!selectedItem) {
		return null;
	}

	const { name, cost, count } = selectedItem;

	return (
		<Modal size="tiny" open={true} onClose={onClose}>
			<Modal.Header>Change Owners</Modal.Header>
			<Modal.Content>
				<div className="purchase-content">
					<Form>
						<Form.Group inline>
							<label>Name:</label> {name}
						</Form.Group>
						<Form.Group inline>
							<label>Cost:</label>{" "}
							{`${cost + discount} (${discount}g)`}
						</Form.Group>
						<Form.Group inline>
							<label>Items Available:</label>{" "}
							{`${count - owners.length} of ${count}`}
						</Form.Group>
						<ClassList
							classes={classesInUse}
							label="Party Members:"
							onClick={toggleOwnership}
							isEnabled={(className: ClassesInUse) =>
								isItemEnabled(className)
							}
							isUsed={(className: ClassesInUse) =>
								owners ? owners.includes(className) : false
							}
						/>
					</Form>
					<img
						src={getItemPath(selectedItem, gameType)}
						className={"purchase-card"}
					/>
				</div>
			</Modal.Content>
			<Modal.Actions>
				<Button negative content="Close" onClick={onClose} />
				<Button
					positive
					icon="checkmark"
					labelPosition="right"
					content="Modify"
					onClick={onApply}
				/>
			</Modal.Actions>
		</Modal>
	);
};

export default PurchaseItem;
