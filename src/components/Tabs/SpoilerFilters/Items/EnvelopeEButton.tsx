import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "semantic-ui-react";
import { Expansions } from "../../../../games";
import {
	specialUnlocksState,
	includeGameState,
	confirmEnvelopeEState,
} from "../../../../State";

export const EnvelopeEButton = () => {
	const includeGames = useRecoilValue(includeGameState);
	const specialUnlocks = useRecoilValue(specialUnlocksState);
	const envelopeE = specialUnlocks.includes("envelopeE");
	const setConfirmEnvelopeE = useSetRecoilState(confirmEnvelopeEState);
	if (envelopeE || !includeGames.includes(Expansions.ForgottenCircles)) {
		return null;
	}

	return (
		<Button onClick={() => setConfirmEnvelopeE(true)}>Envelope E</Button>
	);
};
