import React from "react";
import { useRecoilValue } from "recoil";
import { Form, Segment } from "semantic-ui-react";
import {
	ghItemOffset,
	ghImportSets,
	alwaysImported,
} from "../../../../games/fh/FHGameData";
import { gameInfo } from "../../../../games/GameInfo";
import { Expansions, AllGames } from "../../../../games/GameType";
import { importedSetState, includeGameState } from "../../../../State";
import { ImportedSetFilter } from "./ImportedSetFilter";
import { SoloClassFilterBlock } from "./SoloClassFilterBlock";
import SpoilerFilterItemList, { ItemRange } from "./SpoilerFilterItemList";

const soloClassesToInclude: AllGames[] = [Expansions.FHSoloScenarios];

export const FHSpoilerFilter = () => {
	const importedSets = useRecoilValue(importedSetState);
	const includedGames = useRecoilValue(includeGameState);

	const fhRanges: ItemRange[] = [{ range: [{ start: 1, end: 10 }] }];
	// fhRanges.push({ start: 11, end: 164 });

	return (
		<Segment>
			<Segment>
				<Form.Field>
					<SpoilerFilterItemList ranges={fhRanges} title="Items" />
				</Form.Field>
			</Segment>
			{ghImportSets.some((group) =>
				includedGames.includes(group.game)
			) && (
				<Segment>
					<Form.Field>
						<ImportedSetFilter sets={ghImportSets} />
						<SpoilerFilterItemList
							ranges={[
								{
									offset: ghItemOffset,
									range: [...alwaysImported.items],
								},
							]}
							title={gameInfo[alwaysImported.game].title}
							filterOn={alwaysImported.game}
						/>
						{ghImportSets.map(
							({ items, importSet, title, game }) => {
								if (!importedSets.includes(importSet)) {
									return null;
								}
								const gameTitle = `${gameInfo[game].title} ${
									title || ""
								}`;

								return (
									<SpoilerFilterItemList
										ranges={[
											{
												offset: ghItemOffset,
												range: [...items],
											},
										]}
										title={gameTitle}
										filterOn={game}
									/>
								);
							}
						)}
					</Form.Field>
				</Segment>
			)}
			<SoloClassFilterBlock gameTypes={soloClassesToInclude} />
		</Segment>
	);
};
