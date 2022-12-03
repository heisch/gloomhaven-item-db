import React from "react";
import { useRecoilValue } from "recoil";
import { Form, Popup, Icon, Segment } from "semantic-ui-react";
import { gameInfo, sortOrder } from "../../../../games/GameInfo";
import { AllGames } from "../../../../games/GameType";
import { itemManagementTypeState } from "../../../../State";
import { ItemManagementType } from "../../../../State/Types";
import PartyManagementFilter from "./PartyManagementFilter";
import { PartySpoilerList } from "./PartySpoilerList";

export const PartySpoiler = () => {
	const itemManagementType = useRecoilValue(itemManagementTypeState);

	return (
		<Segment>
			<PartyManagementFilter />
			{itemManagementType === ItemManagementType.Party && (
				<Form.Group inline className={"inline-break"}>
					<Form.Group inline>
						<label>Party Members:</label>
						<div style={{ margin: "5px 8px" }}>
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
						</div>
					</Form.Group>
					{Object.entries(gameInfo)
						.filter(([, data]) => {
							return data.gameClasses().length > 0;
						})
						.sort(sortOrder)
						.map(([filter]) => (
							<PartySpoilerList
								key={filter}
								type={filter as AllGames}
							/>
						))}
				</Form.Group>
			)}
		</Segment>
	);
};
