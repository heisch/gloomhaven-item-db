import React from "react";
import { useRecoilValue } from "recoil";
import { Divider } from "semantic-ui-react";
import { GameType } from "../../../../../games";
import { formatId } from "../../../../../helpers";
import {
	discountState,
	gameTypeState,
	GloomhavenItem,
} from "../../../../../State";
import { GHIcon } from "../../../../Utils";

interface Props {
	item: GloomhavenItem;
	showDiscount?: boolean;
	hideDivider?: boolean;
}

export const ItemCost = (props: Props) => {
	const {
		item: { cost, resources, id },
		showDiscount,
		hideDivider
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
					{showDiscount? `${cost + discount}g (${discount}g)` : `${cost + discount}g`}
				</strong>
			)}
			{gameType === GameType.Frosthaven &&
				resources &&
				Object.entries(resources).map(([resource, value], index) => {
					if (resource === "item") {
						return value.map(
							(itemId: number, itemIndex: number) => (
								<div key={`${itemId}-${resource}-${index}`}>
									<>
										{itemIndex > 0 && <Divider />}
										<GHIcon
											name={`${resource}.png`}
											folder="resources"
										/>
										{` : ${formatId(itemId)}`}
									</>
								</div>
							)
						);
					}
					if (resource === "any") {
						return value.map((count: number, anyIndex: number) => (
							<div key={`any-${count}-${resource}-${index}`}>
								{anyIndex > 0 && <Divider />}
								{`any herb ${count > 1 ? `x ${count}` : ""}`}
							</div>
						));
					}
					return (
						<div key={`${id}-${resource}-${index}`}>
							{!hideDivider && index > 0 && <Divider />}
							<>
								<GHIcon
									name={`${resource}.png`}
									folder="resources"
								/>
								{value > 1 && ` x ${value}`}
							</>
						</div>
					);
				})}
		</>
	);
};
