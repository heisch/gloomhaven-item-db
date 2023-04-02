import React from "react";
import { GloomhavenItem } from "../../../../../State/Types";
import ItemCard from "./ItemCard";

import "./itemGrid.scss";

type Props = {
	items: GloomhavenItem[];
};

export const ItemGrid = (props: Props) => {
	const { items } = props;
	return (
		<div className="item-grid">
			{items.map((item) => {
				let key = `${item.id}`;
				if (item.imageSuffix) {
					key += `-${item.imageSuffix}`;
				}
				return <ItemCard key={key} item={item} />;
			})}
		</div>
	);
};
