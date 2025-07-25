import React, { useState } from "react";
import {
	Button,
	Modal,
	Form,
	Accordion,
	AccordionTitle,
	AccordionContent,
	Icon,
} from "semantic-ui-react";
import { ClassIcon } from "../../../Utils";
import { useRecoilState, useRecoilValue } from "recoil";
import { classToDeleteState, gameDataState } from "../../../../State";
import { useRemovePlayerUtils } from "../../../../hooks/useRemovePlayer";
import { itemGoldValue, OwnedItemList } from "./OwnedItemsList";
import { useIsItemShown } from "../../../../hooks/useIsItemShown";

export const ConfirmClassDelete = () => {
	const { removeClasses, itemsOwnedByClass } = useRemovePlayerUtils();
	const isItemShown = useIsItemShown();
	const [classToDelete, setClassToDelete] =
		useRecoilState(classToDeleteState);
	const [itemsOpen, setItemsOpen] = useState(false);

	const { items } = useRecoilValue(gameDataState);

	const onClose = () => {
		setClassToDelete(undefined);
	};

	const itemsOwned = itemsOwnedByClass(classToDelete);
	const itemsToList = itemsOwned
		.map((id) => (
			items.find(item => item.id === id)!
		))
		.filter(isItemShown);

	const goldAmount = () => {
		let totalGold = 0;
		itemsToList.forEach((item) => {
			totalGold += itemGoldValue(item);
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
							<Accordion>
								<AccordionTitle
									active={itemsOpen}
									onClick={() =>
										setItemsOpen((current) => !current)
									}
								>
									<Icon name="dropdown" />
									{`Items Owned - ${itemsOpen
										? "Click to hide"
										: "Click to show"
										} items`}
								</AccordionTitle>
								<AccordionContent active={itemsOpen}>
									<OwnedItemList
										items={itemsToList}
										totalGold={`${goldAmount()}g`}
									/>
								</AccordionContent>
							</Accordion>
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
