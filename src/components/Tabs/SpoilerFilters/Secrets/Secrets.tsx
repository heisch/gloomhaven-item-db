import React, { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { Form, Label, ListItem, Segment } from "semantic-ui-react";
import { gameInfo } from "../../../../games/GameInfo";
import { AllGames, Expansions, GameType } from "../../../../games/GameType";
import {
	gameTypeState,
	includeGameState,
	specialUnlocksState,
	SpecialUnlockTypes,
} from "../../../../State";
import { ConfirmSpecialUnlockPanel } from "../Common/ConfirmSpecialUnlockPanel";
import { SpecialUnlocksButton } from "../Common/SpecialUnlockButton";

interface SecretData {
	solutions: string[];
	gameType: AllGames;
	title: string;
	line1: string;
	line2: string;
	isItem?: boolean;
	shownGames: GameType[];
}

const secretAnswers: Record<SpecialUnlockTypes, SecretData> = {
	[SpecialUnlockTypes.EnvelopeX]: {
		solutions: ["eHh4", "YmxhZGVzd2FybQ=="],
		title: "Envelope X",
		line1: "Have solved Envelope X?",
		line2: "Enter the solution:",
		gameType: GameType.Gloomhaven,
		shownGames: [
			GameType.Gloomhaven,
			GameType.JawsOfTheLion,
			GameType.Frosthaven,
		],
	},
	[SpecialUnlockTypes.EnvelopeE]: {
		solutions: ["ZWVl", "bGl2aW5nIGFybW9y"],
		title: "Envelope E",
		line1: "Have you solved Envelope E",
		line2: "Enter name of reward:",
		gameType: Expansions.ForgottenCircles,
		isItem: true,
		shownGames: [GameType.Gloomhaven],
	},
	[SpecialUnlockTypes.EnvelopeV]: {
		solutions: ["dnZ2", "YXNoZXM="],
		title: "Envelope V",
		line1: "Have you been told to open Envelope V",
		line2: "Enter the password:",
		gameType: Expansions.TrailOfAshes,
		shownGames: [
			GameType.Gloomhaven,
			GameType.JawsOfTheLion,
			GameType.Frosthaven,
		],
	},
};

export const Secrets = () => {
	const includeGames = useRecoilValue(includeGameState);
	const specialUnlocks = useRecoilValue(specialUnlocksState);
	const currentGameType = useRecoilValue(gameTypeState);

	const isButtonShown = (params: any) => {
		const [key, data] = params;
		const { gameType, isItem, shownGames } = data;
		if (!shownGames.includes(currentGameType)) {
			return false;
		}
		if (isItem) {
			const info = gameInfo[gameType as AllGames];
			if (
				info.addItemsToGames &&
				!info.addItemsToGames.includes(currentGameType)
			) {
				return false;
			}
		}
		const specialUnlocked = specialUnlocks.includes(key);
		return !specialUnlocked && includeGames.includes(gameType);
	};

	const dataList = Object.entries(secretAnswers).filter(isButtonShown);
	if (dataList.length == 0) {
		return null;
	}

	return (
		<Segment>
			<Form.Group inline>
				<label>Secrets:</label>
			</Form.Group>
			{dataList.map(
				([secret, { solutions, title, line1, line2, gameType }]) => (
					<Fragment key={`secret-${secret}`}>
						<SpecialUnlocksButton
							gameType={gameType}
							specialUnlockType={secret as SpecialUnlockTypes}
							text={title}
						/>
						<ConfirmSpecialUnlockPanel
							solutions={solutions}
							specialUnlockType={secret as SpecialUnlockTypes}
							title={title}
						>
							<ListItem>{line1}</ListItem>
							<ListItem>{line2}</ListItem>
						</ConfirmSpecialUnlockPanel>
					</Fragment>
				)
			)}
		</Segment>
	);
};
