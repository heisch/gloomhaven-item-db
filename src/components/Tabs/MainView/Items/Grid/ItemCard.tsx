import React, { useState } from "react";
import { GloomhavenItem } from "../../../../../State/Types";
import { Label } from "semantic-ui-react";
import { getItemPath } from "../../../../../games/GameData";
import { GHIcon } from "../../../../Utils";
import { getItemIdString } from "../../../../../helpers";
import { ItemManagementContainer } from "../ItemManagement/ItemManagementContainer";
import { NoItemManagement } from "../ItemManagement/NoItemManagement";

import "./itemCard.scss";

type Props = {
	item: GloomhavenItem;
};

const ItemId = (props: Props) => {
	const { item } = props;
	const id = getItemIdString(item);
	return <div className="item-card-id"> {id} </div>;
};

const ItemCard = (props: Props) => {
	const { item } = props;

	const [draw, setDraw] = useState(false);
	const [showBackside, setShowBackside] = useState(false);

	return (
		<div className="item-card-container">
			{draw && (
				<div className="item-card-container-header">
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
					)}
				</div>
			)}
			<img
				src={getItemPath(item, showBackside)}
				alt={item.name}
				onLoad={() => setDraw(true)}
				className={"item-card"}
			/>
			{draw && (
				<div className="item-card-container-footer">
					<ItemManagementContainer item={item} />
				</div>
			)}
		</div>
	);
};

export default ItemCard;
