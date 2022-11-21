import React from "react";
import { useRecoilValue } from "recoil";
import { Label } from "semantic-ui-react";
import { itemManagementTypeState } from "../../../../../State";
import { GloomhavenItem, ItemManagementType } from "../../../../../State/Types";

type Props = {
	item: GloomhavenItem;
};

export const NoItemManagement = (props: Props) => {
	const { item } = props;
	const itemManagementType = useRecoilValue(itemManagementTypeState);
	if (itemManagementType !== ItemManagementType.None) {
		return null;
	}

	return (
		<Label className="no-item-management-count">{`Item count: ${item.count}`}</Label>
	);
};
