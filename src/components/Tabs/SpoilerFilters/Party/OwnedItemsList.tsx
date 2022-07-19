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
import { getItemIdString } from "../../MainView/ItemTableRow";

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
						<TableHeaderCell>Id</TableHeaderCell>
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
									<p>{getItemIdString(item)}</p>
								</TableCell>
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
