import React from "react";
import { GloomhavenItem } from "../../../../../State/Types";
import ItemCard from "./ItemCard";

type Props = {
	items: GloomhavenItem[];
};

export const ItemGrid = (props: Props) => {
	const { items } = props;
	return (
		<>
			{items.map((item) => {
				let key = `${item.id}`;
				if (item.imageSuffix) {
					key += `-${item.imageSuffix}`;
				}
				return <ItemCard key={key} item={item} />;
			})}
		</>
	);
};
