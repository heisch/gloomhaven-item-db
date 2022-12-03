import React from "react";
import { useRecoilValue } from "recoil";
import { Form, Segment } from "semantic-ui-react";
import { AllGames } from "../../../../games/GameType";
import { includeGameState } from "../../../../State";
import { SoloClassFilter } from "./SoloClassFilter";

interface Props {
	gameTypes: AllGames[];
}

export const SoloClassFilterBlock = (props: Props) => {
	const { gameTypes } = props;
	const includeGames = useRecoilValue(includeGameState);
	const includeList = gameTypes.filter((gameType) =>
		includeGames.includes(gameType)
	);
	if (includeList.length === 0) {
		return null;
	}

	return (
		<Segment>
			<Form.Group inline>
				<label>Solo Class Items:</label>
			</Form.Group>
			{includeList.map((gameType) => (
				<SoloClassFilter gameType={gameType} />
			))}
		</Segment>
	);
};
