import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Form } from "semantic-ui-react";
import { ImportedSetData } from "../../../../games/fh/FHGameData";
import { gameInfo } from "../../../../games/GameInfo";
import {
	ImportedSet,
	importedSetState,
	includeGameState,
} from "../../../../State";

type Props = {
	sets: ImportedSetData[];
};

export const ImportedSetFilter = (props: Props) => {
	const { sets } = props;
	const [importedSets, setImportedSets] = useRecoilState(importedSetState);
	const includedGames = useRecoilValue(includeGameState);

	const toggleImportedSet = (key: ImportedSet) => {
		const value = Object.assign([], importedSets);
		if (value.includes(key)) {
			value.splice(value.indexOf(key), 1);
		} else {
			value.push(key);
		}
		setImportedSets(value);
	};

	if (sets.length === 0) {
		return null;
	}

	if (!sets.some((set) => includedGames.includes(set.game))) {
		return null;
	}

	return (
		<Form.Group inline className={"inline-break"}>
			<label>Imported Sets:</label>
			{sets.map(({ importSet, title, game }) => {
				const gameName = gameInfo[game].title;
				if (!includedGames.includes(game)) {
					return null;
				}
				return (
					<Form.Checkbox
						key={importSet}
						label={`${gameName} ${title}`}
						checked={importedSets.includes(importSet!)}
						onChange={() => toggleImportedSet(importSet!)}
					/>
				);
			})}
		</Form.Group>
	);
};
