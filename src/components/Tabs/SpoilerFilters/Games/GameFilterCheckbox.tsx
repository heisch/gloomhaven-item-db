import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Form } from "semantic-ui-react";
import { AllGames } from "../../../../games/GameType";
import { useRemovePlayerUtils } from "../../../../hooks/useRemovePlayer";
import {
	gameTypeState,
	includeGameState,
	removingGameState,
} from "../../../../State";
import { AllFilterData } from "./GameFilters";

type Props = {
	allGameType: AllGames;
} & AllFilterData;

export const GameFilterCheckbox = (props: Props) => {
	const { getClassesToRemove, getRemovingItemCount, anyGameItemsOwned } =
		useRemovePlayerUtils();
	const { allGameType, title, gamesToFilterOn } = props;
	const [includeGames, setIncludeGames] = useRecoilState(includeGameState);
	const gameType = useRecoilValue(gameTypeState);
	const setRemovingGame = useSetRecoilState(removingGameState);

	const showConfirmation = (removingGame: AllGames) => {
		return (
			getClassesToRemove(removingGame).length ||
			getRemovingItemCount(removingGame) > 0
		);
	};

	const toggleItemFilter = (key: AllGames) => {
		const value = Object.assign([], includeGames);
		if (value.includes(key)) {
			if (showConfirmation(key)) {
				setRemovingGame(key);
			} else {
				value.splice(value.indexOf(key), 1);
			}
		} else {
			value.push(key);
		}
		setIncludeGames(value);
	};

	if (gamesToFilterOn && gamesToFilterOn.includes(gameType)) {
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
