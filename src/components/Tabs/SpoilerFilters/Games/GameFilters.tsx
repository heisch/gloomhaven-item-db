import React from "react";
import { useRecoilValue } from "recoil";
import { Form, Icon, Popup, Segment } from "semantic-ui-react";
import { gameInfo } from "../../../../games/GameInfo";
import { AllGames } from "../../../../games/GameType";
import { useGameSort } from "../../../../games/useGameSort";
import { gameTypeState } from "../../../../State";
import { GameFilterCheckbox } from "./GameFilterCheckbox";
import { GameHelp } from "./GameHelp";

export const GameFilters = () => {
	const gameSortOrder = useGameSort();
	const currentGameType = useRecoilValue(gameTypeState);

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
				{gameSortOrder
					.filter((gameType) => gameType !== currentGameType)
					.map((gameType) => {
						const gi = gameInfo[gameType];
						return (
							<GameFilterCheckbox
								key={gameType}
								allGameType={gameType as AllGames}
								{...gi}
							/>
						);
					})}
			</Form.Group>
		</Segment>
	);
};
