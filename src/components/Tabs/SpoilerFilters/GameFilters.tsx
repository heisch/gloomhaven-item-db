import React from "react";
import { useRecoilValue } from "recoil";
import { Form, Icon, List, Popup, Segment } from "semantic-ui-react";
import { AllGames, Expansions, GameType } from "../../../games/GameType";
import { isFlagEnabled } from "../../../helpers";
import { gameTypeState } from "../../../State";
import { GameFilterCheckbox } from "./GameFilterCheckbox";

export type AllFilterData = {
	allGameType: AllGames;
	gameToFilterOn?: GameType;
	title: String;
};

export const allFiltersData = [
	{
		allGameType: GameType.Gloomhaven,
		gameToFilterOn: GameType.Gloomhaven,
		title: "Gloomhaven",
	},
	{
		allGameType: Expansions.ForgottenCircles,
		title: "Forgotten Circles",
	},
	{
		allGameType: Expansions.CrimsonScales,
		title: "Crimson Scales",
	},
	{
		allGameType: Expansions.CrimsonScalesAddon,
		title: "Crimson Scales Addon",
	},
	{
		allGameType: GameType.JawsOfTheLion,
		gameToFilterOn: GameType.JawsOfTheLion,
		title: "Jaws of the Lion",
	},
	{
		allGameType: GameType.Frosthaven,
		gameToFilterOn: GameType.Frosthaven,
		title: "Frosthaven",
	},
];

const GameHelp = () => {
	const gameType = useRecoilValue(gameTypeState);
	const frosthavenEnabled = isFlagEnabled("frosthaven");

	return (
		<Form.Group>
			<List bulleted>
				<List.Header>Which Games are you playing with?</List.Header>
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

export const GameFilters = () => {
	const frosthavenEnabled = isFlagEnabled("frosthaven");

	return (
		<Segment>
			<Form.Group inline>
				<label>Games:</label>
				<Popup
					closeOnDocumentClick
					hideOnScroll
					trigger={
						<Icon name={"question circle"} className={"blue"} />
					}
					header={"Game Types"}
					content={<GameHelp />}
				/>

				{allFiltersData
					.filter(
						(data) =>
							data.allGameType !== GameType.Frosthaven ||
							frosthavenEnabled
					)
					.map((data) => (
						<GameFilterCheckbox key={data.allGameType} {...data} />
					))}
			</Form.Group>
		</Segment>
	);
};
