import React from "react";
import { ItemManagementType } from "../../../State/Types";
import SearchOptions from "./SearchOptions";
import { Message, Icon } from "semantic-ui-react";
import PurchaseItem from "./PurchaseItem";
import { useRecoilValue } from "recoil";
import {
	allState,
	itemManagementTypeState,
	dataMismatchState,
} from "../../../State";
import { ItemsView } from "./Items/ItemsView";

const ItemList = () => {
	const all = useRecoilValue(allState);
	const itemManagementType = useRecoilValue(itemManagementTypeState);
	const dataMismatch = useRecoilValue(dataMismatchState);

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
			<SearchOptions />
			{all && (
				<Message negative>
					<Message.Header>
						<Icon name="exclamation triangle" />
						Spoiler alert
					</Message.Header>
					You are currently viewing all possible items.
				</Message>
			)}
			<ItemsView />

			{itemManagementType === ItemManagementType.Party && (
				<PurchaseItem />
			)}
		</>
	);
};

export default ItemList;
