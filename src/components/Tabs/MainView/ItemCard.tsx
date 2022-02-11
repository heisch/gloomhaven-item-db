import React, { useState } from "react";
import { GloomhavenItem } from "../../../State/Types";
import { Label } from "semantic-ui-react";
import ItemManagement from "./ItemManagement";
import { getItemPath } from "../../../games/GameData";
import { useRecoilValue } from "recoil";
import { gameDataState } from "../../../State";

type Props = {
	item: GloomhavenItem;
};

const ItemId = ({ id }: { id: number }) => {
	return <Label className="itemId"> #{id} </Label>;
};

const ItemCard = (props: Props) => {
	const { item } = props;
	const { gameType } = useRecoilValue(gameDataState);

	const [draw, setDraw] = useState(false);

	return (
		<div className={"item-card-wrapper"}>
			<img
				src={getItemPath(item, gameType)}
				alt={item.name}
				onLoad={() => setDraw(true)}
				className={"item-card"}
			/>
			{draw && <ItemId id={item.id} />}
			{draw && <ItemManagement item={item} />}
		</div>
	);
};

export default ItemCard;
