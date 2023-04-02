import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Checkbox } from "semantic-ui-react";
import {
	itemManagementTypeState,
	itemsInUseCountState,
	lockSpoilerPanelState,
} from "../../../../../State";
import { GloomhavenItem, ItemManagementType } from "../../../../../State/Types";

import "./simpleItemManagement.scss";

type Props = {
	item: GloomhavenItem;
};

export const SimpleItemManagement = (props: Props) => {
	const [itemsInUseCount, setItemsInUseCount] =
		useRecoilState(itemsInUseCountState);
	const lockSpoilerPanel = useRecoilValue(lockSpoilerPanelState);
	const itemManagementType = useRecoilValue(itemManagementTypeState);
	const { item } = props;

	if (itemManagementType !== ItemManagementType.Simple) {
		return null;
	}

	const count = itemsInUseCount[item.id] || 0;

	const onClick = (checked: boolean) => {
		setItemsInUseCount((current) => {
			const value = Object.assign({}, current);
			value[item.id] = (value[item.id] || 0) + (checked ? -1 : 1);
			if (value[item.id] === 0) {
				delete value[item.id];
			}
			return value;
		});
	};

	return (
		<div className="simple-management-container">
			{[...Array(item.count).keys()].map((index) => (
				<Checkbox
					key={`${item.id}-${index}`}
					// className={classNames}
					checked={index < count}
					onClick={() => onClick(index < count)}
					disabled={lockSpoilerPanel}
				/>
			))}
		</div>
	);
};
