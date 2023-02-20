import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { gameDataTypes } from ".";
import { gameTypeState } from "../State";
import { gameInfo } from "./GameInfo";

export const useGameSort = () => {
	const currentGameType = useRecoilValue(gameTypeState);

	return useMemo(() => {
		const currentGameInfo = gameInfo[currentGameType];
		let games = [
			currentGameType,
			...(currentGameInfo.linkedGameTypes || []),
		];
		Object.values(gameDataTypes).forEach((gameData) => {
			const { gameType } = gameData;
			if (!games.includes(gameType)) {
				const gameSpecificInfo = gameInfo[gameType];
				games.push(
					gameType,
					...(gameSpecificInfo.linkedGameTypes || [])
				);
			}
		});
		return {
			allGames: games,
			withoutCurrent: games.filter((game) => game !== currentGameType),
		};
	}, [currentGameType]);
};
