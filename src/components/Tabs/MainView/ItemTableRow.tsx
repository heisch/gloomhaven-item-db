import React from "react";
import { Icon, Popup, Table } from "semantic-ui-react";
import { GameType } from "../../../games";
import { GloomhavenItem } from "../../../State/Types";
import { GHIcon } from "./GHIcon";
import { ItemCost } from "./ItemCost";
import ItemManagement from "./ItemManagement";
import NoItemManagement from "./ItemManagement/NoItemManagement";
import { ItemSummon } from "./ItemSummon";

type Props = {
	item: GloomhavenItem;
};

const formatId = (id: number | string) => {
	return `#${id.toString().padStart(3, "0")}`;
};

export const getItemIdString = (item: GloomhavenItem) => {
	const { displayId, id, gameType } = item;
	return `${gameType ? gameType.toUpperCase() : ""} ${formatId(
		displayId || id
	)}`;
};

const numberAmountToText = ["zero", "one", "two", "three", "four", "five"];

export const ItemTableRow = (props: Props) => {
	const {
		item,
		item: {
			gameType: itemGameType,
			id,
			name,
			slot,
			spent,
			consumed,
			lost,
			descHTML,
			backDescHTML,
			minusOneCardsAdded,
			faq,
			faqImage,
			source,
			summon,
		},
	} = props;

	return (
		<Table.Row key={id}>
			<Table.Cell className={"id-col"} textAlign={"right"}>
				{getItemIdString(item)}
			</Table.Cell>
			<Table.Cell className={"name-col"}>{name}</Table.Cell>
			<Table.Cell className={"slot-col"} textAlign={"center"}>
				<GHIcon name={`${slot}.png`} folder={"equipment_slot"} />
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
				{backDescHTML ? (
					<>
						<span
							dangerouslySetInnerHTML={{
								__html: `<b>Front</b>: ${descHTML}<br/>`,
							}}
						/>
						<span
							dangerouslySetInnerHTML={{
								__html: `<b>Back</b>: ${backDescHTML}<br/>`,
							}}
						/>
					</>
				) : (
					<span
						dangerouslySetInnerHTML={{
							__html: descHTML,
						}}
					/>
				)}
				{minusOneCardsAdded && (
					<>
						<br />
						<span>
							{`Add ${
								minusOneCardsAdded < numberAmountToText.length
									? numberAmountToText[minusOneCardsAdded]
									: minusOneCardsAdded
							} `}
							{itemGameType === GameType.Frosthaven ? (
								<GHIcon
									name={"modifier_minus_one_circle.png"}
								/>
							) : (
								<GHIcon name={"modifier_minus_one.png"} />
							)}

							{` to your attack modifier deck.`}
						</span>
					</>
				)}
				{faq && (
					<Popup
						closeOnDocumentClick
						hideOnScroll
						trigger={
							<Icon name={"question circle"} className={"pink"} />
						}
						header={"FAQ"}
						content={faq}
					/>
				)}
				{faqImage && (
					<Popup
						closeOnDocumentClick
						hideOnScroll
						trigger={
							<Icon name={"question circle"} className={"pink"} />
						}
						header={"FAQ"}
						content={
							<img
								className="faqImage"
								src={require(`../../../../worldhaven/images/${faqImage}`)}
							></img>
						}
					/>
				)}
				{summon && <ItemSummon summon={summon} />}
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
					<ItemManagement item={item} />
					<NoItemManagement item={item} />
				</div>
			</Table.Cell>
		</Table.Row>
	);
};
