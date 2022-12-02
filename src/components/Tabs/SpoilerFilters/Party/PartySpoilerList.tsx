import React, { useMemo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { gameInfo } from "../../../../games/GameInfo";
import { AllGames } from "../../../../games/GameType";
import { isFrosthavenGameAndEnabled } from "../../../../helpers";
import { useRemovePlayerUtils } from "../../../../hooks/useRemovePlayer";
import {
	classesInUseState,
	classToDeleteState,
	gameTypeState,
	includeGameState,
} from "../../../../State";
import { ClassesInUse } from "../../../../State/Types";
import { ClassList } from "./ClassList";
type Props = {
	type: AllGames;
};

export const PartySpoilerList = (props: Props) => {
	const { type } = props;
	const gameType = useRecoilValue(gameTypeState);
	const includeGames = useRecoilValue(includeGameState);
	const [classesInUse, setClassesInUse] = useRecoilState(classesInUseState);
	const setClassToDelete = useSetRecoilState(classToDeleteState);
	const { getClassesForGame } = useRemovePlayerUtils();

	const isGameIncluded = () => {
		if (!isFrosthavenGameAndEnabled(type)) {
			return false;
		}

		return gameType === type || includeGames.includes(type);
	};

	const toggleClassFilter = (key: ClassesInUse) => {
		if (classesInUse.includes(key)) {
			setClassToDelete(key);
		} else {
			const newClassesInUse = Object.assign([], classesInUse);
			newClassesInUse.push(key);
			setClassesInUse(newClassesInUse);
		}
	};

	const classes = useMemo(
		() => getClassesForGame(type),
		[getClassesForGame, type]
	);

	if (!isGameIncluded()) {
		return null;
	}
	const { title } = gameInfo[type];

	return (
		<ClassList
			classes={classes}
			label={title}
			onClick={toggleClassFilter}
			isUsed={(className: ClassesInUse) =>
				classesInUse.includes(className)
			}
		/>
	);
};
