import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Checkbox } from "semantic-ui-react";
import {
	itemManagementTypeState,
	itemsInUseState,
	lockSpoilerPanelState,
} from "../../../../State";
import { GloomhavenItem, ItemManagementType } from "../../../../State/Types";

type Props = {
	item: GloomhavenItem;
};

const SimpleItemManagement = (props: Props) => {
	const lockSpoilerPanel = useRecoilValue(lockSpoilerPanelState);
	const { item } = props;
	const [itemsInUse, setItemsInUse] = useRecoilState(itemsInUseState);
	const itemManagementType = useRecoilValue(itemManagementTypeState);

	if (itemManagementType !== ItemManagementType.Simple) {
		return null;
	}
	const toggleItemInUse = (id: number, bit: number) => {
		const value = Object.assign({}, itemsInUse);
		value[id] = value[id] & bit ? value[id] ^ bit : value[id] | bit;

		if (value[id] === 0) {
			delete value[id];
		}
		setItemsInUse(value);
	};

	return (
		<div className="simple-managment-container">
			{[...Array(item.count).keys()].map((index) => (
				<Checkbox
					key={index}
					className={"i" + index}
					toggle
					disabled={lockSpoilerPanel}
					checked={!!(itemsInUse[item.id] & Math.pow(2, index))}
					onChange={() =>
						toggleItemInUse(item.id, Math.pow(2, index))
					}
				/>
			))}
		</div>
	);
};

export default SimpleItemManagement;
