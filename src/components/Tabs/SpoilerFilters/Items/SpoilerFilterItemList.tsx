import { isNumber } from "lodash";
import React from "react";
import { Form } from "semantic-ui-react";
import FilterCheckbox, { FilterCheckboxProps } from "./FilterCheckbox";

type Range = {
	start: number;
	end?: number;
};

type Props = {
	ranges: (Range | number)[];
	title?: string;
} & FilterCheckboxProps;

const SpoilerFilterItemList = (props: Props) => {
	const { ranges, title, ...rest } = props;

	const checkBoxes: Array<any> = [];
	ranges.forEach((range) => {
		let first;
		let last;
		if (isNumber(range)) {
			first = range;
			last = range;
		} else {
			let { start, end } = range;
			first = start;
			last = end || start;
		}
		for (let i = first; i <= last; i++) {
			checkBoxes.push(
				<FilterCheckbox key={`filter${i}`} id={i} {...rest} />
			);
		}
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
