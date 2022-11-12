import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "semantic-ui-react";
import { AllGames } from "../../../../games/GameType";
import {
	specialUnlocksState,
	includeGameState,
	confirmSpecialUnlockOpenState,
	SpecialUnlockTypes,
} from "../../../../State";

type Props = {
	specialUnlockType: SpecialUnlockTypes;
	gameType: AllGames;
	text: string;
};

export const SpecialUnlocksButton = (props: Props) => {
	const { specialUnlockType, gameType, text } = props;
	const includeGames = useRecoilValue(includeGameState);
	const specialUnlocks = useRecoilValue(specialUnlocksState);
	const specialUnlocked = specialUnlocks.includes(specialUnlockType);
	const setConfirmSpecialUnlockOpen = useSetRecoilState(
		confirmSpecialUnlockOpenState
	);
	if (specialUnlocked || !includeGames.includes(gameType)) {
		return null;
	}

	return (
		<Button onClick={() => setConfirmSpecialUnlockOpen(specialUnlockType)}>
			{text}
		</Button>
	);
};
