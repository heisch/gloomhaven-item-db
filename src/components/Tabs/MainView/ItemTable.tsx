import React from "react";
import {
	GloomhavenItem,
	ItemManagementType,
	SortProperty,
} from "../../../State/Types";
import { Table, Popup, Icon, Image } from "semantic-ui-react";
import ItemManagement from "./ItemManagement";
import { Helpers, getSlotImageSrc } from "../../../helpers";
import { useRecoilValue } from "recoil";
import {
	sortPropertyState,
	sortDirectionState,
	discountState,
	itemManagementTypeState,
} from "../../../State";
import { GameType } from "../../../games";

type Props = {
	items: GloomhavenItem[];
	setSorting: (newProperty: SortProperty) => void;
};

type IconProps = {
	name: string;
};

const GHIcon = (props: IconProps) => {
	const { name } = props;
	return (
		<img
			src={require(`../../../img/icons/general/${name}`)}
			className={"icon"}
			alt={name}
		/>
	);
};

const formatId = (id: number) => {
	return `#${(id + "").padStart(3, "0")}`;
};

const getItemIdString = (item: GloomhavenItem) => {
	const { displayId, id, gameType } = item;
	return `${gameType ? gameType.toUpperCase() : ""} ${formatId(
		displayId || id
	)}`;
};

const ItemTable = (props: Props) => {
	const sortProperty = useRecoilValue(sortPropertyState);
	const sortDirection = useRecoilValue(sortDirectionState);
	const itemManagementType = useRecoilValue(itemManagementTypeState);
	const { items, setSorting } = props;
	const discount = useRecoilValue(discountState);

	const renderSummon = (item: GloomhavenItem) => {
		return item.summon === undefined ? null : (
			<>
				<div className={"item-summon"}>
					<div>
						<GHIcon name={"heal.png"} />: {item.summon.hp}
					</div>
					<div>
						<GHIcon name={"move.png"} />: {item.summon.move}
					</div>
					<div>
						<GHIcon name={"attack.png"} />: {item.summon.attack}
					</div>
					<div>
						<GHIcon name={"range.png"} />:{" "}
						{item.summon.range || "-"}
					</div>
				</div>
			</>
		);
	};

	const costClass = discount < 0 ? "blue" : discount > 0 ? "red" : "";

	const getCostTitle = () => {
		let cost = "Cost";
		if (discount !== 0) {
			cost += ` (${discount}g)`;
		}

		return <strong className={"ui text " + costClass}>{cost}</strong>;
	};

	return (
		<>
			<Table basic sortable celled className={"items-table"} unstackable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell
							className={"id-col"}
							textAlign={"right"}
							onClick={() => setSorting("id")}
							sorted={
								sortProperty === "id"
									? sortDirection
									: undefined
							}
						>
							#
						</Table.HeaderCell>
						<Table.HeaderCell
							className={"name-col"}
							selectable={false}
							onClick={() => setSorting("name")}
							sorted={
								sortProperty === "name"
									? sortDirection
									: undefined
							}
						>
							Name
						</Table.HeaderCell>
						<Table.HeaderCell
							className={"slot-col"}
							textAlign={"center"}
							onClick={() => setSorting("slot")}
							sorted={
								sortProperty === "slot"
									? sortDirection
									: undefined
							}
						>
							Slot
						</Table.HeaderCell>
						<Table.HeaderCell
							className={"cost-col"}
							textAlign={"right"}
							onClick={() => setSorting("cost")}
							sorted={
								sortProperty === "cost"
									? sortDirection
									: undefined
							}
						>
							{getCostTitle()}
						</Table.HeaderCell>
						<Table.HeaderCell
							className={"use-col"}
							onClick={() => setSorting("use")}
							sorted={
								sortProperty === "use"
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
						const cost = (
							<strong className={"ui text " + costClass}>
								{item.cost + discount}g
							</strong>
						);
						return (
							<Table.Row key={item.id}>
								<Table.Cell
									className={"id-col"}
									textAlign={"right"}
								>
									{getItemIdString(item)}
								</Table.Cell>
								<Table.Cell className={"name-col"}>
									{item.name}
								</Table.Cell>
								<Table.Cell
									className={"slot-col"}
									textAlign={"center"}
								>
									<Image src={getSlotImageSrc(item.slot)} />
								</Table.Cell>
								<Table.Cell
									className={"cost-col"}
									textAlign={"right"}
								>
									{cost}
								</Table.Cell>
								<Table.Cell
									className={"use-col"}
									textAlign={"center"}
								>
									{item.spent && (
										<GHIcon name={"spent.png"} />
									)}
									{item.consumed && (
										<GHIcon name={"consumed.png"} />
									)}
								</Table.Cell>
								<Table.Cell className={"text-col"}>
									<span
										dangerouslySetInnerHTML={{
											__html: item.descHTML,
										}}
									/>
									{item.minusOneCardsAdded && (
										<React.Fragment>
											<br />
											<span>
												Add{" "}
												{Helpers.numberAmountToText(
													item.minusOneCardsAdded
												)}
												<GHIcon
													name={
														"modifier_minus_one.png"
													}
												/>
												to your attack modifier deck.
											</span>
										</React.Fragment>
									)}
									{item.faq && (
										<Popup
											closeOnDocumentClick
											hideOnScroll
											trigger={
												<Icon
													name={"question circle"}
													className={"pink"}
												/>
											}
											header={"FAQ"}
											content={item.faq}
										/>
									)}
									{renderSummon(item)}
								</Table.Cell>
								<Table.Cell className={"source-col"}>
									{item.source.split("\n").map((s) => (
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
								<Table.Cell
									className={"store-inventory-col"}
									textAlign={"right"}
								>
									<ItemManagement item={item} />
								</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table>
		</>
	);
};

export default ItemTable;
