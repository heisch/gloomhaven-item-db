import React from "react";
import {
	Form,
	Table,
	TableHeader,
	TableHeaderCell,
	TableBody,
	TableRow,
	TableCell,
} from "semantic-ui-react";
import { GloomhavenItem } from "../../../../State";

type Props = {
	items: GloomhavenItem[];
	totalGold: string;
};

export const OwnedItemList = (props: Props) => {
	const { items, totalGold } = props;

	return (
		<Form.Group>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHeaderCell>Item</TableHeaderCell>
						<TableHeaderCell>Cost</TableHeaderCell>
					</TableRow>
				</TableHeader>
				<TableBody>
					{items.map((item) => {
						const { name, cost } = item;
						const constStr = cost
							? `${Math.floor(cost / 2)}g`
							: "-";
						return (
							<TableRow key={item.id}>
								<TableCell>
									<p>{name}</p>
								</TableCell>
								<TableCell>
									<p>{constStr}</p>
								</TableCell>
							</TableRow>
						);
					})}
					<TableRow>
						<TableCell>Total</TableCell>
						<TableCell>{totalGold}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Form.Group>
	);
};
