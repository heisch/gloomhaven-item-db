import React, { useState } from "react";
import { GloomhavenItem } from "../../../State/Types";
import { Button, Label } from "semantic-ui-react";
import ItemManagement from "./ItemManagement";
import { getItemPath } from "../../../games/GameData";
import { getItemIdString } from "./ItemTableRow";

type Props = {
	item: GloomhavenItem;
};

const ItemId = (props: Props) => {
	const { item } = props;
	const id = getItemIdString(item);
	return <Label className="itemId"> {id} </Label>;
};

const ItemCard = (props: Props) => {
	const { item } = props;

	const [draw, setDraw] = useState(false);
	const [showBackside, setShowBackside] = useState(false);

	return (
		<div className={"item-card-wrapper"}>
			<img
				src={getItemPath(item, showBackside)}
				alt={item.name}
				onLoad={() => setDraw(true)}
				className={"item-card"}
			/>
			{draw && !showBackside && (
				<>
					<ItemId item={item} />
					<ItemManagement item={item} />
				</>
			)}
			{draw && item.flippable && (
				<Button
					icon={showBackside ? "redo" : "undo"}
					className="flipItem"
					onClick={() => setShowBackside((current) => !current)}
				/>
			)}
		</div>
	);
};

export default ItemCard;
