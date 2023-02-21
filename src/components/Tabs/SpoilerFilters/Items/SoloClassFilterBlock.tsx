import React from "react";
import { useRecoilValue } from "recoil";
import { Form, Segment } from "semantic-ui-react";
import { gameInfo } from "../../../../games/GameInfo";
import { gameTypeState, includeGameState } from "../../../../State";
import { SoloClassFilter } from "./SoloClassFilter";

export const SoloClassFilterBlock = () => {
	const currentGameType = useRecoilValue(gameTypeState);
	const { soloClassesToInclude } = gameInfo[currentGameType];
	const includeGames = useRecoilValue(includeGameState);
	const includeList =
		soloClassesToInclude &&
		soloClassesToInclude.filter((gameType) =>
			includeGames.includes(gameType)
		);
	if (!includeList || includeList.length === 0) {
		return null;
	}

	return (
		<Segment>
			<Form.Group inline>
				<label>Solo Class Items:</label>
			</Form.Group>
			{includeList.map((gameType) => (
				<SoloClassFilter
					key={`solo-class-filter-${gameType}`}
					gameType={gameType}
				/>
			))}
		</Segment>
	);
};
