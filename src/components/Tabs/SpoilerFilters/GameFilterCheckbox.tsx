import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Form } from "semantic-ui-react";
import { AllGames } from "../../../games/GameType";
import { gameTypeState, includeGameState } from "../../../State";
import { AllFilterData } from "./GameFilters";

type Props = {} & AllFilterData;

export const GameFilterCheckbox = (props: Props) => {
	const { allGameType, title, gameToFilterOn } = props;
	const [includeGames, setIncludeGames] = useRecoilState(includeGameState);
	const gameType = useRecoilValue(gameTypeState);

	const toggleItemFilter = (key: AllGames) => {
		const value = Object.assign([], includeGames);
		if (value.includes(key)) {
			value.splice(value.indexOf(key), 1);
		} else {
			value.push(key);
		}
		setIncludeGames(value);
	};

	if (gameType === gameToFilterOn) {
		return null;
	}
	return (
		<Form.Checkbox
			key={allGameType}
			label={title}
			checked={includeGames.includes(allGameType)}
			onChange={() => toggleItemFilter(allGameType)}
		/>
	);
};
