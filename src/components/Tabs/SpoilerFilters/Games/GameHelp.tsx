import React from "react";
import { useRecoilValue } from "recoil";
import { Form, List } from "semantic-ui-react";
import { GameType } from "../../../../games";
import { isFlagEnabled } from "../../../../helpers";
import { gameDataState, gameTypeState } from "../../../../State";

export const GameHelp = () => {
	const gameType = useRecoilValue(gameTypeState);
	const gameData = useRecoilValue(gameDataState);
	const frosthavenEnabled = isFlagEnabled("frosthaven");

	return (
		<Form.Group>
			<List bulleted>
				<List.Header>Which Games are you playing with?</List.Header>
				{gameType !== GameType.JawsOfTheLion && (
					<List.Item>
						Solo Scenarios
						<List.List>
							<List.Item>
								{`Add solo scenario items for ${gameData.gameName}`}
							</List.Item>
						</List.List>
					</List.Item>
				)}
				{gameType !== GameType.Gloomhaven && (
					<List.Item>
						Gloomhaven
						<List.List>
							<List.Item>
								Add classes to party management
							</List.Item>
							<List.Item>Ability to solve Envelope X</List.Item>
							{frosthavenEnabled &&
								gameType === GameType.Frosthaven && (
									<List.Item>Add Items for use</List.Item>
								)}
						</List.List>
					</List.Item>
				)}
				<List.Item>
					Forgotten Circles
					<List.List>
						<List.Item>Add classes to party management</List.Item>
						{gameType === GameType.Gloomhaven && (
							<List.Item>Add Items for use</List.Item>
						)}
					</List.List>
				</List.Item>
				<List.Item>
					Crimson Scales
					<List.List>
						<List.Item>Add classes to party management</List.Item>
						{gameType === GameType.Gloomhaven && (
							<List.Item>Add Items for use</List.Item>
						)}
					</List.List>
				</List.Item>
				<List.Item>
					Crimson Scales Add On
					<List.List>
						<List.Item>Add classes to party management</List.Item>
						{gameType === GameType.Gloomhaven && (
							<List.Item>Add Items for use</List.Item>
						)}
					</List.List>
				</List.Item>
				{gameType !== GameType.JawsOfTheLion && (
					<List.Item>
						Jaws of the Lion
						<List.List>
							<List.Item>
								Add classes to party management
							</List.Item>
						</List.List>
					</List.Item>
				)}
				{frosthavenEnabled && gameType !== GameType.Frosthaven && (
					<List.Item>
						Frosthaven
						<List.List>
							<List.Item>
								Add classes to party management
							</List.Item>
						</List.List>
					</List.Item>
				)}
			</List>
		</Form.Group>
	);
};
