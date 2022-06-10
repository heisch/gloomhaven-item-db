import React from "react";
import { Form, Icon, Popup, Segment, List } from "semantic-ui-react";
import { AllGames, Expansions, GameType } from "../../../../games/GameType";
import { isFlagEnabled } from "../../../../helpers";
import { GameFilterCheckbox } from "./GameFilterCheckbox";
import { GameHelp } from "./GameHelp";

export type AllFilterData = {
	allGameType: AllGames;
	gamesToFilterOn?: GameType[];
	title: String;
};

export const allFiltersData = [
	{
		allGameType: Expansions.FHSoloScenarios,
		gamesToFilterOn: [GameType.Gloomhaven, GameType.JawsOfTheLion],
		title: "Solo Scenarios",
	},
	{
		allGameType: Expansions.GHSoloScenarios,
		gamesToFilterOn: [GameType.JawsOfTheLion, GameType.Frosthaven],
		title: "Solo Scenarios",
	},
	{
		allGameType: GameType.Gloomhaven,
		gamesToFilterOn: [GameType.Gloomhaven],
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
		gamesToFilterOn: [GameType.JawsOfTheLion],
		title: "Jaws of the Lion",
	},
	{
		allGameType: GameType.Frosthaven,
		gamesToFilterOn: [GameType.Frosthaven],
		title: "Frosthaven",
	},
];

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
