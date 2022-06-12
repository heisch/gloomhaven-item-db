import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRemovePlayerUtils } from "../../../../hooks/useRemovePlayer";
import {
	classesInUseState,
	itemManagementTypeState,
	itemsOwnedByState,
	lockSpoilerPanelState,
	selectedItemState,
} from "../../../../State";
import {
	ClassesInUse,
	GloomhavenItem,
	ItemManagementType,
} from "../../../../State/Types";
import ClassIcon from "../ClassIcon";

type Props = {
	item: GloomhavenItem;
};

type OwnerProps = {
	item: GloomhavenItem;
	owner?: ClassesInUse;
	index: number;
};

const OwnerButton = (props: OwnerProps) => {
	const { removeItemsFromOwner } = useRemovePlayerUtils();
	const setSelectedItem = useSetRecoilState(selectedItemState);
	const lockSpoilerPanel = useRecoilValue(lockSpoilerPanelState);

	const { item, owner, index } = props;
	let classNames = `ownerButton ownerButton${index}`;
	if (!owner) {
		classNames += " noClass";
	}

	const onClick = () => {
		if (owner) {
			removeItemsFromOwner(item.id, owner);
		} else {
			setSelectedItem(item);
		}
	};

	return (
		<button
			className={classNames}
			onClick={onClick}
			disabled={lockSpoilerPanel}
		>
			{owner ? (
				<>
					<img
						className="deleteIcon"
						src={require(`../../../../img/icons/general/circle_x.png`)}
					/>
					<ClassIcon className="ownerIcon" name={owner} />
				</>
			) : (
				<div className="addIcon">+</div>
			)}
		</button>
	);
};

const PartyItemManagement = (props: Props) => {
	const classesInUse = useRecoilValue(classesInUseState);
	const itemsOwnedBy = useRecoilValue(itemsOwnedByState);
	const itemManagementType = useRecoilValue(itemManagementTypeState);
	const { item } = props;

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
	let buttonData: OwnerProps[] = owners.map((owner, index) => ({
		owner,
		item,
		index,
	}));
	buttonData = buttonData.concat(
		[...Array(addButtonsToShow).keys()].map((index) => ({
			item,
			owner: undefined,
			index: index + ownersLength,
		}))
	);
	return (
		<div className="party-management-container">
			{buttonData.map((data, i) => (
				<OwnerButton key={`${item.id}-${i}`} {...data} />
			))}
		</div>
	);
};

export default PartyItemManagement;
