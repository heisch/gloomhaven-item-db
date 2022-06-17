import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "semantic-ui-react";
import { GameType } from "../../../../games";
import {
	confirmEnvelopeXState,
	specialUnlocksState,
	includeGameState,
} from "../../../../State";

export const EnvelopeXButton = () => {
	const includeGames = useRecoilValue(includeGameState);
	const specialUnlocks = useRecoilValue(specialUnlocksState);
	const envelopeX = specialUnlocks.includes("envelopeX");
	const setConfirmEnvelopeX = useSetRecoilState(confirmEnvelopeXState);
	if (envelopeX || !includeGames.includes(GameType.Gloomhaven)) {
		return null;
	}

	return (
		<Button onClick={() => setConfirmEnvelopeX(true)}>Envelope X</Button>
	);
};
