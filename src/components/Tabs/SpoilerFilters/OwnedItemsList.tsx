import React from "react";
import { useRecoilValue } from "recoil";
import {
	Form,
	Table,
	TableHeader,
	TableHeaderCell,
	TableBody,
	TableRow,
	TableCell,
} from "semantic-ui-react";
import { gameDataState } from "../../../State";

type Props = {
	itemIds: number[];
	totalGold: string;
};

export const OwnedItemList = (props: Props) => {
	const { itemIds, totalGold } = props;
	const { items } = useRecoilValue(gameDataState);

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
					{itemIds.map((itemId) => {
						const { name, cost } = items[itemId - 1];
						const constStr = cost
							? `${Math.floor(cost / 2)}g`
							: "-";
						return (
							<TableRow key={itemId}>
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
