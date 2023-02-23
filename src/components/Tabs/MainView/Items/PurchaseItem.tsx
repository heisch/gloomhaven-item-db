import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Image, Segment } from "semantic-ui-react";
import { ClassesInUse, ItemsOwnedBy } from "../../../../State/Types";
import { ClassList } from "../../SpoilerFilters/Party/ClassList";
import { getItemPath } from "../../../../games/GameData";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	classesInUseState,
	discountState,
	itemsOwnedByState,
	selectedItemState,
} from "../../../../State";

const PurchaseItem = () => {
	const classesInUse = useRecoilValue(classesInUseState);
	const [itemsOwnedBy, setItemsOwnedBy] = useRecoilState(itemsOwnedByState);
	const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
	const [owners, setOwners] = useState<ClassesInUse[]>([]);
	const discount = useRecoilValue(discountState);

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
				{},
				itemsOwnedBy
			);
			if (owners) {
				newItemsOwnedBy[selectedItem.id] = owners;
			}
			setItemsOwnedBy(newItemsOwnedBy);
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

	let classes = classesInUse;
	if (selectedItem.lockToClasses) {
		const classesCount = selectedItem.lockToClasses.filter((c) =>
			classesInUse.includes(c)
		).length;
		if (classesCount) {
			classes = [...selectedItem.lockToClasses];
		}
	}

	return (
		<Modal
			size="tiny"
			open={true}
			onClose={onClose}
			className="purchase-dialog"
			// style={{ width: "100%" }}
		>
			<Modal.Header>Change Owners</Modal.Header>
			<Modal.Content>
				<div className="purchase-content">
					<Form style={{ width: "50%" }}>
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
						<Segment>
							<ClassList
								classes={classes}
								label="Party Members:"
								onClick={toggleOwnership}
								isEnabled={(className: ClassesInUse) =>
									isItemEnabled(className)
								}
								isUsed={(className: ClassesInUse) =>
									owners ? owners.includes(className) : false
								}
							/>
						</Segment>
					</Form>
					<Form style={{ width: "50%" }}>
						<Image
							src={getItemPath(selectedItem)}
							className={"purchase-card"}
						/>
					</Form>
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
