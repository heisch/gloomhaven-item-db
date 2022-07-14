import React from "react";
import { useRecoilValue } from "recoil";
import { Icon, Popup, Table } from "semantic-ui-react";
import { Expansions, GameType } from "../../../games";
import { createWorldhavenString } from "../../../helpers";
import { discountState, gameTypeState } from "../../../State";
import { GloomhavenItem } from "../../../State/Types";
import { GHIcon } from "./GHIcon";
import ItemManagement from "./ItemManagement";
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
			id,
			name,
			slot,
			cost,
			resources,
			spent,
			consumed,
			lost,
			descHTML,
			minusOneCardsAdded,
			faq,
			faqImage,
			source,
			summon,
		},
	} = props;
	const discount = useRecoilValue(discountState);
	const gameType = useRecoilValue(gameTypeState);

	const costClass = discount < 0 ? "blue" : discount > 0 ? "red" : "";

	const displayCost = cost ? (
		<strong className={"ui text " + costClass}>{cost + discount}g</strong>
	) : (
		<strong className={"ui text " + costClass}>-</strong>
	);
	return (
		<Table.Row key={id}>
			<Table.Cell className={"id-col"} textAlign={"right"}>
				{getItemIdString(item)}
			</Table.Cell>
			<Table.Cell className={"name-col"}>{name}</Table.Cell>
			<Table.Cell className={"slot-col"} textAlign={"center"}>
				<GHIcon name={`${slot}.png`} folder={"equipment_slot"} />
			</Table.Cell>
			<Table.Cell className={"cost-col"} textAlign={"right"}>
				{displayCost}
			</Table.Cell>
			{gameType === GameType.Frosthaven && (
				<Table.Cell className={"resources-col"} textAlign={"center"}>
					{resources &&
						Object.entries(resources).map(([resource, value]) => {
							if (resource === "item") {
								return (
									<div key={resource}>
										<GHIcon
											name={`${resource}.png`}
											folder="resources"
										/>
										{` : ${value}`}
									</div>
								);
							}
							return (
								<div key={resource}>
									<GHIcon
										name={`${resource}.png`}
										folder="resources"
									/>
									{` x ${value}`}
								</div>
							);
						})}
				</Table.Cell>
			)}
			<Table.Cell className={"use-col"} textAlign={"center"}>
				{spent && <GHIcon name={"spent.png"} />}
				{consumed && <GHIcon name={"consumed.png"} />}
				{lost && <GHIcon name={"lost.png"} />}
			</Table.Cell>
			<Table.Cell className={"text-col"}>
				<span
					dangerouslySetInnerHTML={{
						__html: descHTML,
					}}
				/>
				{minusOneCardsAdded && (
					<>
						<br />
						<span>
							{`Add ${
								minusOneCardsAdded < numberAmountToText.length
									? numberAmountToText[minusOneCardsAdded]
									: minusOneCardsAdded
							} `}
							<GHIcon name={"modifier_minus_one.png"} />
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
				</div>
			</Table.Cell>
		</Table.Row>
	);
};
