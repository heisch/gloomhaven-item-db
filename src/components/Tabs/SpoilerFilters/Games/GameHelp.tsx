import React from "react";
import { useRecoilValue } from "recoil";
import { Form, List } from "semantic-ui-react";
import { GameType } from "../../../../games";
import { isFlagEnabled } from "../../../../helpers";
import { gameDataState, gameTypeState } from "../../../../State";

type HelpOptions = {
	addClasses?: boolean;
	addItems?: boolean;
	addEnvelopeX?: boolean;
	soloGameType?: string;
};

const constructHelpEntry = (
	title: string,
	{ addClasses, addItems, addEnvelopeX, soloGameType }: HelpOptions
) => {
	return (
		<List.Item>
			{title}
			<List.List>
				{addClasses && (
					<List.Item>Add classes to party management</List.Item>
				)}
				{addEnvelopeX && (
					<List.Item>Ability to solve Envelope X</List.Item>
				)}
				{addItems && <List.Item>Add Items for use</List.Item>}
				{soloGameType && (
					<List.Item>{`Add solo scenario items for ${soloGameType}`}</List.Item>
				)}
			</List.List>
		</List.Item>
	);
};

export const GameHelp = () => {
	const gameType = useRecoilValue(gameTypeState);
	const gameData = useRecoilValue(gameDataState);
	const frosthavenEnabled = isFlagEnabled("frosthaven");

	return (
		<Form.Group>
			<List bulleted>
				<List.Header>Which Games are you playing with?</List.Header>
				{gameType !== GameType.JawsOfTheLion &&
					constructHelpEntry("Solo Scenarios", {
						soloGameType: gameData.gameName,
					})}
				{gameType !== GameType.Gloomhaven &&
					constructHelpEntry("Gloomhaven", {
						addClasses: true,
						addEnvelopeX: true,
						addItems:
							frosthavenEnabled &&
							gameType === GameType.Frosthaven,
					})}
				{constructHelpEntry("Forgotten Circles", {
					addClasses: true,
					addItems: gameType === GameType.Gloomhaven,
				})}
				{constructHelpEntry("Crimson Scales", {
					addClasses: true,
					addItems: gameType === GameType.Gloomhaven,
				})}
				{constructHelpEntry("Crimson Scales Add On", {
					addClasses: true,
					addItems: gameType === GameType.Gloomhaven,
				})}
				{gameType !== GameType.JawsOfTheLion &&
					constructHelpEntry("Jaws of the Lion", {
						addClasses: true,
					})}
				{frosthavenEnabled &&
					gameType !== GameType.Frosthaven &&
					constructHelpEntry("Frosthaven", { addClasses: true })}
			</List>
		</Form.Group>
	);
};
