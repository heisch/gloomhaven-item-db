import React from "react";
import {
	GloomhavenItem,
	ItemManagementType,
	SortProperty,
} from "../../../../State/Types";
import { Table } from "semantic-ui-react";
import { useRecoilValue } from "recoil";
import {
	sortPropertyState,
	sortDirectionState,
	discountState,
	itemManagementTypeState,
} from "../../../../State";
import { ItemTableRow } from "./ItemTableRow";
import { useSetSorting } from "../../../../hooks/useSetSorting";

type Props = {
	items: GloomhavenItem[];
};

export const ItemTable = (props: Props) => {
	const sortProperty = useRecoilValue(sortPropertyState);
	const sortDirection = useRecoilValue(sortDirectionState);
	const itemManagementType = useRecoilValue(itemManagementTypeState);
	const { items } = props;
	const discount = useRecoilValue(discountState);
	const setSorting = useSetSorting();

	const costClass = discount < 0 ? "blue" : discount > 0 ? "red" : "";

	const getCostTitle = () => {
		let cost = "Cost";
		if (discount !== 0) {
			cost += ` (${discount}g)`;
		}

		return <strong className={"ui text " + costClass}>{cost}</strong>;
	};

	return (
		<Table basic sortable celled className={"items-table"} unstackable>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell
						className={"id-col"}
						textAlign={"right"}
						onClick={() => setSorting(SortProperty.Id)}
						sorted={
							sortProperty === SortProperty.Id
								? sortDirection
								: undefined
						}
					>
						#
					</Table.HeaderCell>
					<Table.HeaderCell
						className={"name-col"}
						selectable={false}
						onClick={() => setSorting(SortProperty.Name)}
						sorted={
							sortProperty === SortProperty.Name
								? sortDirection
								: undefined
						}
					>
						Name
					</Table.HeaderCell>
					<Table.HeaderCell
						className={"slot-col"}
						textAlign={"center"}
						onClick={() => setSorting(SortProperty.Slot)}
						sorted={
							sortProperty === SortProperty.Slot
								? sortDirection
								: undefined
						}
					>
						Slot
					</Table.HeaderCell>
					<Table.HeaderCell
						className={"cost-col"}
						textAlign={"center"}
						width={1}
						onClick={() => setSorting(SortProperty.Cost)}
						sorted={
							sortProperty === SortProperty.Cost
								? sortDirection
								: undefined
						}
					>
						{getCostTitle()}
					</Table.HeaderCell>
					<Table.HeaderCell
						className={"use-col"}
						onClick={() => setSorting(SortProperty.Use)}
						sorted={
							sortProperty === SortProperty.Use
								? sortDirection
								: undefined
						}
					>
						Use
					</Table.HeaderCell>
					<Table.HeaderCell className={"text-col"}>
						Effect
					</Table.HeaderCell>
					<Table.HeaderCell className={"source-col"}>
						Source
					</Table.HeaderCell>
					<Table.HeaderCell className={"store-inventory-col"}>
						{itemManagementType !== ItemManagementType.None
							? "In Use"
							: "Stock"}
					</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{items.map((item) => {
					return <ItemTableRow key={item.id} item={item} />;
				})}
			</Table.Body>
		</Table>
	);
};
