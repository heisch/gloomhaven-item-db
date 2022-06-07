import React from "react";
import { Form, Icon, Popup, Segment } from "semantic-ui-react";
import { AllGames, Expansions, GameType } from "../../../../games/GameType";
import { isFlagEnabled } from "../../../../helpers";
import { GameFilterCheckbox } from "./GameFilterCheckbox";
import { GameHelp } from "./GameHelp";

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
