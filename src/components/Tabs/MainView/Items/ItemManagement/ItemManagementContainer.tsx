import React from "react";
import { GloomhavenItem } from "../../../../../State/Types";
import { NoItemManagement } from "./NoItemManagement";
import { PartyItemManagement } from "./PartyItemManagement";
import { SimpleItemManagement } from "./SimpleItemManagement";

type Props = {
	item: GloomhavenItem;
};

export const ItemManagementContainer = (props: Props) => {
	const { item } = props;

	return (
		<>
			<SimpleItemManagement item={item} />
			<PartyItemManagement item={item} />
			<NoItemManagement item={item} />
		</>
	);
};
