import React from "react";
import { useRecoilValue } from "recoil";
import { itemManagementTypeState } from "../../../../State";
import { GloomhavenItem, ItemManagementType } from "../../../../State/Types";

type Props = {
	item: GloomhavenItem;
};

const NoItemManagement = (props: Props) => {
	const { item } = props;
	const itemManagementType = useRecoilValue(itemManagementTypeState);
	if (itemManagementType !== ItemManagementType.None) {
		return null;
	}

	return <>{item.count}</>;
};

export default NoItemManagement;
