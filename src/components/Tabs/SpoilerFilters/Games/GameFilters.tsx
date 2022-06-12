import React from "react";
import { Form, Icon, Popup, Segment } from "semantic-ui-react";
import { AllGames, Expansions, GameType } from "../../../../games/GameType";
import { isFlagEnabled } from "../../../../helpers";
import { GameFilterCheckbox } from "./GameFilterCheckbox";
import { GameHelp } from "./GameHelp";

export type HelpData = {
	soloGameType?: string;
	addClasses?: boolean;
	addEnvelopeX?: boolean;
	addItemsToGames?: GameType[];
};

export type AllFilterData = {
	allGameType: AllGames;
	gamesToFilterOn?: GameType[];
	title: string;
} & HelpData;

export const allFiltersData: AllFilterData[] = [
	{
		allGameType: Expansions.FHSoloScenarios,
		gamesToFilterOn: [GameType.Gloomhaven, GameType.JawsOfTheLion],
		title: "Solo Scenarios",
		soloGameType: "Frosthaven",
	},
	{
		allGameType: Expansions.GHSoloScenarios,
		gamesToFilterOn: [GameType.JawsOfTheLion, GameType.Frosthaven],
		title: "Solo Scenarios",
		soloGameType: "Gloomhaven",
	},
	{
		allGameType: GameType.Gloomhaven,
		gamesToFilterOn: [GameType.Gloomhaven],
		title: "Gloomhaven",
		addClasses: true,
		addEnvelopeX: true,
		addItemsToGames: [GameType.Frosthaven],
	},
	{
		allGameType: Expansions.ForgottenCircles,
		title: "Forgotten Circles",
		addClasses: true,
		addItemsToGames: [GameType.Gloomhaven],
	},
	{
		allGameType: Expansions.CrimsonScales,
		title: "Crimson Scales",
		addClasses: true,
		addItemsToGames: [GameType.Gloomhaven],
	},
	{
		allGameType: Expansions.CrimsonScalesAddon,
		title: "Crimson Scales Addon",
		addClasses: true,
		addItemsToGames: [GameType.Gloomhaven],
	},
	{
		allGameType: GameType.JawsOfTheLion,
		gamesToFilterOn: [GameType.JawsOfTheLion],
		title: "Jaws of the Lion",
		addClasses: true,
	},
	{
		allGameType: GameType.Frosthaven,
		gamesToFilterOn: [GameType.Frosthaven],
		title: "Frosthaven",
		addClasses: true,
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
