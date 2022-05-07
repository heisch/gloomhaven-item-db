import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Form } from "semantic-ui-react";
import { AllGames } from "../../../games/GameType";
import {
	gameTypeState,
	includeGameState,
	removingGameState,
} from "../../../State";
import { AllFilterData } from "./GameFilters";

type Props = {} & AllFilterData;

export const GameFilterCheckbox = (props: Props) => {
	const { allGameType, title, gameToFilterOn } = props;
	const [includeGames, setIncludeGames] = useRecoilState(includeGameState);
	const gameType = useRecoilValue(gameTypeState);
	const setRemovingGame = useSetRecoilState(removingGameState);

	const toggleItemFilter = (key: AllGames) => {
		const value = Object.assign([], includeGames);
		if (value.includes(key)) {
			setRemovingGame(key);
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
