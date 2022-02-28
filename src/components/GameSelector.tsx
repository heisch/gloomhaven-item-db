import React from "react";
import { useRecoilState } from "recoil";
import { DropdownProps, Form } from "semantic-ui-react";
import { gameDataTypes, GameType } from "../games";
import { isFlagEnabled } from "../helpers";
import { gameTypeState } from "../State";

export const GameSelector = () => {
	const [gameType, setGameType] = useRecoilState(gameTypeState);

	const frosthavenEnabled = isFlagEnabled("frosthaven");

	const options: any[] = [];
	Object.values(gameDataTypes)
		.filter(
			(gameData) =>
				gameData.gameType !== GameType.Frosthaven || frosthavenEnabled
		)
		.forEach((gameData) => {
			const { gameName: text, gameType: value } = gameData;
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
