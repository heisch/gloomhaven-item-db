import React from "react";
import { useRecoilValue } from "recoil";
import { Message } from "semantic-ui-react";
import useItems from "../../../../hooks/useItems";
import { displayItemAsState } from "../../../../State";
import { ItemViewDisplayType } from "../../../../State/Types";
import ItemGrid from "../ItemGrid";
import { ItemTable } from "../Table";

export const ItemsView = () => {
	const items = useItems();
	const displayAs = useRecoilValue(displayItemAsState);
	return (
		<>
			{items.length === 0 && (
				<Message negative>
					No items found matching your filters and/or search criteria
				</Message>
			)}

			{displayAs === ItemViewDisplayType.List ? (
				<ItemTable items={items} />
			) : (
				<ItemGrid items={items} />
			)}
		</>
	);
};
