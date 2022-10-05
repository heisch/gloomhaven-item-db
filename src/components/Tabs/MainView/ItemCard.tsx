import React, { useState } from "react";
import { GloomhavenItem } from "../../../State/Types";
import { Button, Label } from "semantic-ui-react";
import ItemManagement from "./ItemManagement";
import { getItemPath } from "../../../games/GameData";
import { getItemIdString } from "./ItemTableRow";
import NoItemManagement from "./ItemManagement/NoItemManagement";
import { GHIcon } from "./GHIcon";

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
		<div className="item-card-wrapper">
			{draw && (
				<div className="item-card-wrapper-header">
					<ItemId item={item} />
					{item.backDesc && (
						<GHIcon
							className="flip"
							name={
								showBackside
									? "flip_white.png"
									: "flip_back_white.png"
							}
							onClick={() =>
								setShowBackside((current) => !current)
							}
						/>
						// <Button
						// 	icon={showBackside ? "redo" : "undo"}
						// 	className="flipItem"
						// />
					)}
				</div>
			)}
			{draw && !showBackside && <ItemManagement item={item} />}
			<div className="item-card-wrapper-container">
				<img
					src={getItemPath(item, showBackside)}
					alt={item.name}
					onLoad={() => setDraw(true)}
					className={"item-card"}
				/>
			</div>
			{draw && (
				<div className="item-card-wrapper-footer">
					<NoItemManagement item={item} />
				</div>
			)}
		</div>
	);
};

export default ItemCard;
