import React from "react";
import { Form, Icon, Popup, Segment } from "semantic-ui-react";
import { gameInfo, sortOrder } from "../../../../games/GameInfo";
import { AllGames } from "../../../../games/GameType";
import { GameFilterCheckbox } from "./GameFilterCheckbox";
import { GameHelp } from "./GameHelp";

export const GameFilters = () => {
	return (
		<Segment>
			<Form.Group inline>
				<label>Games:</label>
				<div style={{ margin: "5px 8px" }}>
					<Popup
						closeOnDocumentClick
						hideOnScroll
						trigger={
							<Icon name={"question circle"} className={"blue"} />
						}
						header={"Game Types"}
						content={<GameHelp />}
					/>
				</div>
				{Object.entries(gameInfo)
					.sort(sortOrder)
					.map(([key, value]) => (
						<GameFilterCheckbox
							key={key}
							allGameType={key as AllGames}
							{...value}
						/>
					))}
			</Form.Group>
		</Segment>
	);
};
