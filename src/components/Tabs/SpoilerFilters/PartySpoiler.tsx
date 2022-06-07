import React from "react";
import { useRecoilValue } from "recoil";
import { Form, Popup, Icon, Segment } from "semantic-ui-react";
import { Expansions, GameType } from "../../../games/GameType";
import { itemManagementTypeState } from "../../../State";
import { ItemManagementType } from "../../../State/Types";
import PartyManagementFilter from "./PartyManagementFilter";
import { PartySpoilerList } from "./PartySpoilerList";

const PartFilterList = [
	{
		type: GameType.Gloomhaven,
		label: "Gloomhaven:",
	},
	{
		type: Expansions.ForgottenCircles,
		label: "Forgotten Circles:",
	},
	{
		type: Expansions.CrimsonScales,
		label: "Crimson Scales:",
	},
	{
		type: Expansions.CrimsonScalesAddon,
		label: "Crimson Scales Addon:",
	},
	{
		type: GameType.JawsOfTheLion,
		label: "Jaws of the Lion:",
	},
	{
		type: GameType.Frosthaven,
		label: "Frosthaven:",
	},
];

export const PartySpoiler = () => {
	const itemManagementType = useRecoilValue(itemManagementTypeState);

	return (
		<Segment>
			<PartyManagementFilter />
			{itemManagementType === ItemManagementType.Party && (
				<Form.Group inline className={"inline-break"}>
					<Form.Group inline>
						<label>Party Members:</label>
						{
							<Popup
								closeOnDocumentClick
								hideOnScroll
								trigger={
									<Icon
										name={"question circle"}
										className={"blue"}
									/>
								}
								header={"Party Members"}
								content={
									"Click on a class icon to add that class to you party.  You can then assign items to any members in a party. Clicking on member a second time will remove all items."
								}
							/>
						}
					</Form.Group>
					{PartFilterList.map((filter) => (
						<PartySpoilerList key={filter.type} {...filter} />
					))}
				</Form.Group>
			)}
		</Segment>
	);
};
