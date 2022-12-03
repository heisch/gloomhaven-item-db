import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Form } from "semantic-ui-react";
import { gameInfo } from "../../../../games/GameInfo";
import { AllGames } from "../../../../games/GameType";
import { useRemovePlayerUtils } from "../../../../hooks/useRemovePlayer";
import { includeGameState, soloClassState } from "../../../../State";
import { ClassesInUse } from "../../../../State/Types";
import { ClassList } from "../Party/ClassList";

type Props = {
	gameType: AllGames;
};

export const SoloClassFilter = (props: Props) => {
	const { gameType } = props;
	const { soloGameType, soloGameTitle, title } = gameInfo[gameType];
	const [soloClass, setSoloClass] = useRecoilState(soloClassState);
	const { getClassesForGame } = useRemovePlayerUtils();
	const includeGames = useRecoilValue(includeGameState);
	if (!includeGames.includes(gameType)) {
		return null;
	}
	const classes = getClassesForGame(soloGameType || gameType);

	const toggleClassFilter = (key: ClassesInUse) => {
		const value = Object.assign([], soloClass);
		if (value.includes(key)) {
			value.splice(value.indexOf(key), 1);
		} else {
			value.push(key);
		}
		setSoloClass(value);
	};
	return (
		<Form.Field>
			<Form.Group inline className={"inline-break"}>
				<ClassList
					isUsed={(className: ClassesInUse) =>
						soloClass.includes(className)
					}
					label={soloGameTitle || title}
					classes={classes}
					onClick={toggleClassFilter}
				/>
			</Form.Group>
		</Form.Field>
	);
};
