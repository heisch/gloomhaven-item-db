import React from "react";
import { useRecoilValue } from "recoil";
import { GameType } from "../../../../../games";
import {
	discountState,
	gameTypeState,
	GloomhavenItem,
} from "../../../../../State";
import { GHIcon } from "../../../../Utils";

interface Props {
	item: GloomhavenItem;
}

export const ItemCost = (props: Props) => {
	const {
		item: { cost, resources },
	} = props;
	const discount = useRecoilValue(discountState);
	const gameType = useRecoilValue(gameTypeState);

	const costClass = discount < 0 ? "blue" : discount > 0 ? "red" : "";

	if (!cost && (!resources || Object.entries(resources).length === 0)) {
		return <strong className={"ui text " + costClass}>-</strong>;
	}

	return (
		<>
			{cost > 0 && (
				<strong className={"ui text " + costClass}>
					{cost + discount}g
				</strong>
			)}
			{gameType === GameType.Frosthaven &&
				resources &&
				Object.entries(resources).map(([resource, value], index) => {
					if (resource === "item") {
						return value.map((itemId: number) => (
							<div key={`${itemId}-${resource}-${index}`}>
								<GHIcon
									name={`${resource}.png`}
									folder="resources"
								/>
								{` : ${itemId}`}
							</div>
						));
					}
					return (
						<div key={`${resource}-${index}`}>
							<GHIcon
								name={`${resource}.png`}
								folder="resources"
							/>
							{value > 1 && ` x ${value}`}
						</div>
					);
				})}
		</>
	);
};
