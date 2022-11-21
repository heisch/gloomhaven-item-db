import React, { useState } from "react";
import { GloomhavenItem } from "../../../../../State/Types";
import { Label } from "semantic-ui-react";
import { getItemPath } from "../../../../../games/GameData";
import { GHIcon } from "../../../../Utils";
import { getItemIdString } from "../../../../../helpers";
import { ItemManagementContainer } from "../ItemManagement/ItemManagementContainer";
import { NoItemManagement } from "../ItemManagement/NoItemManagement";

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
			{draw && !showBackside && <ItemManagementContainer item={item} />}
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
