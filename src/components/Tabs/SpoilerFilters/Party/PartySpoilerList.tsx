import React, { useMemo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AllGames, GameType } from "../../../../games/GameType";
import { isFlagEnabled } from "../../../../helpers";
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
	label: string;
};

export const PartySpoilerList = (props: Props) => {
	const { type, label } = props;
	const gameType = useRecoilValue(gameTypeState);
	const includeGames = useRecoilValue(includeGameState);
	const [classesInUse, setClassesInUse] = useRecoilState(classesInUseState);
	const setClassToDelete = useSetRecoilState(classToDeleteState);
	const { getClassesForGame } = useRemovePlayerUtils();

	const isGameIncluded = () => {
		const frosthavenEnabled = isFlagEnabled("frosthaven");
		if (type === GameType.Frosthaven && !frosthavenEnabled) {
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

	const classes = useMemo(() => getClassesForGame(type), [type]);

	if (!isGameIncluded()) {
		return null;
	}
	return (
		<ClassList
			classes={classes}
			label={label}
			onClick={toggleClassFilter}
			isUsed={(className: ClassesInUse) =>
				classesInUse.includes(className)
			}
		/>
	);
};
