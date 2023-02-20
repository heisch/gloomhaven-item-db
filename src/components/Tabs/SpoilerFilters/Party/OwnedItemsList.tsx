import React from "react";
import {
	Form,
	Table,
	TableHeader,
	TableHeaderCell,
	TableBody,
	TableRow,
	TableCell,
	Popup,
	Icon,
} from "semantic-ui-react";
import { getItemPath } from "../../../../games/GameData";
import { getItemIdString } from "../../../../helpers";
import { GloomhavenItem } from "../../../../State";

type Props = {
	items: GloomhavenItem[];
	totalGold: string;
};

export const itemGoldValue = (item: GloomhavenItem) => {
	let totalGold = 0;
	const { cost, resources } = item;
	if (cost) {
		totalGold += Math.floor(cost / 2);
	}
	if (resources) {
		Object.entries(resources).forEach(([type, resource]) => {
			if (type === "item") {
				totalGold += resource.length * 2;
			} else if (type === "any") {
				resource.forEach((amount: number) => (totalGold += amount * 2));
			} else {
				totalGold += resource * 2;
			}
		});
	}
	return totalGold;
};

export const OwnedItemList = (props: Props) => {
	const { items, totalGold } = props;

	return (
		<Form.Group>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHeaderCell>Id</TableHeaderCell>
						<TableHeaderCell>Item</TableHeaderCell>
						<TableHeaderCell>Cost</TableHeaderCell>
					</TableRow>
				</TableHeader>
				<TableBody>
					{items.map((item) => {
						const { name } = item;
						const totalCost = itemGoldValue(item);
						const costStr = totalCost ? `${totalCost}g` : "-";
						return (
							<TableRow key={item.id}>
								<TableCell>
									<p>{getItemIdString(item)}</p>
								</TableCell>
								<TableCell>
									<span>
										<Popup
											closeOnDocumentClick
											hideOnScroll
											trigger={
												<Icon
													name={"info"}
													className={"black"}
												/>
											}
											content={
												<img
													className="faqImage"
													src={getItemPath(item)}
												></img>
											}
										/>
										<label>{name}</label>
									</span>
								</TableCell>
								<TableCell>
									<p>{costStr}</p>
								</TableCell>
							</TableRow>
						);
					})}
					<TableRow>
						<TableCell>Total</TableCell>
						<TableCell></TableCell>
						<TableCell>{totalGold}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Form.Group>
	);
};
