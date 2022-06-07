import React from "react";
import { useRecoilValue } from "recoil";
import { GameType } from "../../../../games";
import { gameDataState } from "../../../../State";
import { FHSpoilerFilter } from "./FHSpoilerFilter";
import { GHSpoilerFilter } from "./GHSpoilerFilter";
import { JOTLSpoilerFilter } from "./JOTLSpoilerFilter";

const filters = {
	[GameType.Gloomhaven]: <GHSpoilerFilter />,
	[GameType.JawsOfTheLion]: <JOTLSpoilerFilter />,
	[GameType.Frosthaven]: <FHSpoilerFilter />,
};

export const GameFilter = () => {
	const { gameType } = useRecoilValue(gameDataState);

	return <>{filters[gameType]}</>;
};
