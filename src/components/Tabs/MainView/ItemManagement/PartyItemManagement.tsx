import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "semantic-ui-react";
import {
	classesInUseState,
	itemManagementTypeState,
	itemsOwnedByState,
	lockSpoilerPanelState,
	selectedItemState,
} from "../../../../State";
import {
	GloomhavenItem,
	ItemManagementType,
	ItemsOwnedBy,
} from "../../../../State/Types";
import { removeItemsFromOwner } from "../../SpoilerFilters/ConfirmClassDelete";
import ClassIcon from "../ClassIcon";

type Props = {
	item: GloomhavenItem;
};

const PartyItemManagement = (props: Props) => {
	const setSelectedItem = useSetRecoilState(selectedItemState);
	const classesInUse = useRecoilValue(classesInUseState);
	const [itemsOwnedBy, setItemsOwnedBy] = useRecoilState(itemsOwnedByState);
	const itemManagementType = useRecoilValue(itemManagementTypeState);
	const { item } = props;
	const lockSpoilerPanel = useRecoilValue(lockSpoilerPanelState);

	if (itemManagementType !== ItemManagementType.Party) {
		return null;
	}
	const owners = (itemsOwnedBy && itemsOwnedBy[item.id]) || [];
	const ownersLength = owners ? owners.length : 0;
	const classesAvailable = ownersLength
		? classesInUse.filter((c) => !owners.includes(c))
		: classesInUse;

	const addButtonsToShow =
		classesAvailable.length > 0
			? Math.min(item.count - ownersLength, 4)
			: 0;
	return (
		<>
			{owners &&
				owners.map((owner, index) => {
					return (
						<Button
							disabled={lockSpoilerPanel}
							className={"i" + index}
							key={`${item.id}-${owner}`}
							basic
							color="black"
							icon="delete"
							onClick={() => {
								const newItemsOwnedBy = removeItemsFromOwner(
									itemsOwnedBy,
									item.id,
									owner
								);
								setItemsOwnedBy(newItemsOwnedBy);
							}}
							content={<ClassIcon name={owner} />}
						/>
					);
				})}
			{addButtonsToShow > 0 &&
				[...Array(addButtonsToShow).keys()].map((i) => {
					return (
						<Button
							key={`${item.id}-${i}`}
							disabled={lockSpoilerPanel}
							className={`i${ownersLength + i} noClass`}
							color={"black"}
							onClick={() => {
								setSelectedItem(item);
							}}
							content="+"
						/>
					);
				})}
		</>
	);
};

export default PartyItemManagement;
