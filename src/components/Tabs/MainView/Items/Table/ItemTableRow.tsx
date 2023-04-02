import React from "react";
import { Table } from "semantic-ui-react";
import { getItemIdString } from "../../../../../helpers";
import { GloomhavenItem } from "../../../../../State/Types";
import { GHIcon } from "../../../../Utils";
import { ItemManagementContainer } from "../ItemManagement/ItemManagementContainer";
import { NoItemManagement } from "../ItemManagement/NoItemManagement";
import { ItemCost } from "./ItemCost";
import { ItemText } from "./ItemText";

type Props = {
	item: GloomhavenItem;
};

export const ItemTableRow = (props: Props) => {
	const {
		item,
		item: { id, name, slot, spent, consumed, lost, source },
	} = props;

	return (
		<Table.Row key={id}>
			<Table.Cell className={"id-col"} textAlign={"right"}>
				{getItemIdString(item)}
			</Table.Cell>
			<Table.Cell className={"name-col"}>{name}</Table.Cell>
			<Table.Cell className={"slot-col"} textAlign={"center"}>
				{slot && (
					<GHIcon name={`${slot}.png`} folder={"equipment_slot"} />
				)}
			</Table.Cell>
			<Table.Cell className={"cost-col"} textAlign={"center"}>
				<ItemCost item={item} />
			</Table.Cell>
			<Table.Cell className={"use-col"} textAlign={"center"}>
				{spent && <GHIcon name={"spent.png"} />}
				{consumed && <GHIcon name={"consumed.png"} />}
				{lost && <GHIcon name={"lost.png"} />}
			</Table.Cell>
			<Table.Cell className={"text-col"}>
				<ItemText item={item} />
			</Table.Cell>
			<Table.Cell className={"source-col"}>
				{source.split("\n").map((s) => (
					<React.Fragment key={s}>
						<span
							dangerouslySetInnerHTML={{
								__html: s,
							}}
						/>
						<br />
					</React.Fragment>
				))}
			</Table.Cell>
			<Table.Cell className={"store-inventory-col"} textAlign={"right"}>
				<div>
					<ItemManagementContainer item={item} />
				</div>
			</Table.Cell>
		</Table.Row>
	);
};
