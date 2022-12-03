import { isNumber } from "lodash";
import React from "react";
import { useRecoilValue } from "recoil";
import { Form } from "semantic-ui-react";
import { AllGames } from "../../../../games/GameType";
import { includeGameState } from "../../../../State";
import FilterCheckbox from "./FilterCheckbox";

type Range = {
	start: number;
	end?: number;
};

export type ItemRange = {
	range: (Range | number)[];
	offset?: number;
	prefix?: string;
};

type Props = {
	ranges: ItemRange[];
	title: string;
	filterOn?: AllGames;
};

const SpoilerFilterItemList = (props: Props) => {
	const { ranges, title, filterOn } = props;
	const includeGames = useRecoilValue(includeGameState);

	if (filterOn && !includeGames.includes(filterOn)) {
		return null;
	}

	const checkBoxes: Array<JSX.Element> = [];
	ranges.forEach(({ range, offset, prefix }: ItemRange) => {
		range.forEach((r) => {
			let first;
			let last;
			if (isNumber(r)) {
				first = r;
				last = r;
			} else {
				const { start, end } = r as Range;
				first = start;
				last = end || start;
			}
			for (let i = first; i <= last; i++) {
				checkBoxes.push(
					<FilterCheckbox
						key={`filter${i}`}
						id={i}
						offset={offset}
						prefix={prefix}
					/>
				);
			}
		});
	});
	if (checkBoxes.length === 0) {
		return null;
	}

	return (
		<Form.Group inline className={"inline-break"}>
			{title && <label>{title}:</label>}
			{checkBoxes}
		</Form.Group>
	);
};

export default SpoilerFilterItemList;
