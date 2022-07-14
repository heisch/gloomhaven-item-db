import React from "react";
import { Form, Icon, Popup, Segment } from "semantic-ui-react";
import { AllGames, Expansions, GameType } from "../../../../games/GameType";
import { isFrosthavenGameAndEnabled } from "../../../../helpers";
import { GameFilterCheckbox } from "./GameFilterCheckbox";
import { GameHelp } from "./GameHelp";

export type HelpData = {
	soloGameType?: string;
	addClasses?: boolean;
	addItemsToGames?: GameType[];
};

export type AllFilterData = {
	gamesToFilterOn?: GameType[];
	title: string;
} & HelpData;

export const allFiltersData: Record<AllGames, AllFilterData> = {
	[Expansions.FHSoloScenarios]: {
		gamesToFilterOn: [GameType.Gloomhaven, GameType.JawsOfTheLion],
		title: "Solo Scenarios",
		soloGameType: "Frosthaven",
	},
	[Expansions.GHSoloScenarios]: {
		gamesToFilterOn: [GameType.JawsOfTheLion, GameType.Frosthaven],
		title: "Solo Scenarios",
		soloGameType: "Gloomhaven",
	},
	[GameType.Gloomhaven]: {
		gamesToFilterOn: [GameType.Gloomhaven],
		title: "Gloomhaven",
		addClasses: true,
		addItemsToGames: [GameType.Frosthaven],
	},
	[Expansions.ForgottenCircles]: {
		title: "Forgotten Circles",
		addClasses: true,
		addItemsToGames: [GameType.Gloomhaven],
	},
	[Expansions.CrimsonScales]: {
		title: "Crimson Scales",
		addClasses: true,
		addItemsToGames: [GameType.Gloomhaven],
	},
	[Expansions.CrimsonScalesAddon]: {
		title: "Crimson Scales Addon",
		addClasses: true,
		addItemsToGames: [GameType.Gloomhaven],
	},
	[GameType.JawsOfTheLion]: {
		gamesToFilterOn: [GameType.JawsOfTheLion],
		title: "Jaws of the Lion",
		addClasses: true,
	},
	[GameType.Frosthaven]: {
		gamesToFilterOn: [GameType.Frosthaven],
		title: "Frosthaven",
		addClasses: true,
	},
};

export const GameFilters = () => {
	return (
		<Segment>
			<Form.Group inline>
				<label>Games:</label>
				<div style={{ margin: "5px 8px" }}>
					<Popup
						closeOnDocumentClick
						hideOnScroll
						trigger={
							<Icon name={"question circle"} className={"blue"} />
						}
						header={"Game Types"}
						content={<GameHelp />}
					/>
				</div>
				{Object.entries(allFiltersData)
					.filter(([gameType]) =>
						isFrosthavenGameAndEnabled(gameType as AllGames)
					)
					.map(([key, value]) => (
						<GameFilterCheckbox
							key={key}
							allGameType={key as AllGames}
							{...value}
						/>
					))}
			</Form.Group>
		</Segment>
	);
};
