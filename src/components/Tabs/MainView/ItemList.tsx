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
import { useFilterOptions } from "../../Providers/FilterOptionsProvider";
import useItems from "../../../hooks/useItems";
import { useRecoilState } from "recoil";
import { sortPropertyState } from "../../../State";
import { sortDirectionState } from "../../../State/Search/SortDirection";

const ItemList = () => {
	const [sortProperty, setSortProperty] = useRecoilState(sortPropertyState);
	const [sortDirection, setSortDirection] =
		useRecoilState(sortDirectionState);
	const items = useItems();
	const {
		filterOptions: { all, displayAs, itemManagementType },
		dataChanged,
	} = useFilterOptions();

	const setSorting = (newProperty: SortProperty) => {
		console.log("setting sorting");
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
		console.log(newDirection);
		setSortDirection(newDirection);
	};

	return (
		<>
			{dataChanged && (
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
