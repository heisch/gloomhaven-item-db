import React from "react";
import {
	SortProperty,
	SortDirection,
	ItemManagementType,
	ItemViewDisplayType,
} from "../../../State/Types";
import SearchOptions from "./SearchOptions";
import { Message, Icon } from "semantic-ui-react";
import ItemTable from "./ItemTable";
import ItemGrid from "./ItemGrid";
import PurchaseItem from "./PurchaseItem";
import useItems from "../../../hooks/useItems";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	sortPropertyState,
	sortDirectionState,
	allState,
	displayItemAsState,
	itemManagementTypeState,
	dataMismatchState,
} from "../../../State";

const ItemList = () => {
	const all = useRecoilValue(allState);
	const displayAs = useRecoilValue(displayItemAsState);
	const itemManagementType = useRecoilValue(itemManagementTypeState);
	const [sortProperty, setSortProperty] = useRecoilState(sortPropertyState);
	const [sortDirection, setSortDirection] =
		useRecoilState(sortDirectionState);
	const items = useItems();
	const dataMismatch = useRecoilValue(dataMismatchState);

	const setSorting = (newProperty: SortProperty) => {
		let newDirection: SortDirection;
		if (sortProperty === newProperty) {
			newDirection =
				sortDirection === SortDirection.ascending
					? SortDirection.descending
					: SortDirection.ascending;
		} else {
			newDirection = SortDirection.ascending;
		}

		setSortProperty(newProperty);
		setSortDirection(newDirection);
	};

	return (
		<>
			{dataMismatch && (
				<Message negative>
					<Message.Header>
						<Icon name="exclamation triangle" />
						Data out of sync
					</Message.Header>
					Spoiler configuration differs from cloud storage. Remember
					to export your data.
				</Message>
			)}
			<SearchOptions setSorting={setSorting} />
			{all && (
				<Message negative>
					<Message.Header>
						<Icon name="exclamation triangle" />
						Spoiler alert
					</Message.Header>
					You are currently viewing all possible items.
				</Message>
			)}
			{items.length === 0 && (
				<Message negative>
					No items found matching your filters and/or search criteria
				</Message>
			)}

			{displayAs === ItemViewDisplayType.List ? (
				<ItemTable items={items} setSorting={setSorting} />
			) : (
				<ItemGrid items={items} />
			)}

			{itemManagementType === ItemManagementType.Party && (
				<PurchaseItem />
			)}
		</>
	);
};

export default ItemList;
