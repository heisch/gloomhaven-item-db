import React from "react";
import { GloomhavenItem } from "../../../State/Types";
import SimpleItemManagement from "./ItemManagement/SimpleItemManagement";
import PartyItemManagement from "./ItemManagement/PartyItemManagement";

type Props = {
	item: GloomhavenItem;
};

const ItemManagement = (props: Props) => {
	const { item } = props;

	return (
		<>
			<SimpleItemManagement item={item} />
			<PartyItemManagement item={item} />
		</>
	);
};

export default ItemManagement;
