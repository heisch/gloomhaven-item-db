import React from "react";
import { useRecoilState } from "recoil";
import { DropdownProps, Form } from "semantic-ui-react";
import { gameDataTypes, GameType } from "../games";
import { gameInfo } from "../games/GameInfo";
import { isFrosthavenGameAndEnabled } from "../helpers";
import { gameTypeState } from "../State";

export const GameSelector = () => {
	const [gameType, setGameType] = useRecoilState(gameTypeState);

	const options: any[] = [];
	Object.values(gameDataTypes)
		.filter((gameData) => isFrosthavenGameAndEnabled(gameData.gameType))
		.forEach((gameData) => {
			const { gameType: value } = gameData;
			const text = gameInfo[value].title;
			options.push({ text, value });
		});

	return (
		<Form.Select
			value={gameType}
			options={options}
			onChange={(obj: any, e: DropdownProps) => {
				setGameType(e.value as GameType);
			}}
		/>
	);
};
