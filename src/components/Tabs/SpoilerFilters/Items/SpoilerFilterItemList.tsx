import { isNumber } from "lodash";
import React, { useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Form } from "semantic-ui-react";
import { AllGames } from "../../../../games/GameType";
import { isLocalHost } from "../../../../helpers";
import { includeGameState, itemState } from "../../../../State";
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

const peformAll = (
	ranges: ItemRange[],
	callback: (
		i: number,
		offset: number | undefined,
		prefix: string | undefined
	) => void
) => {
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
				callback(i, offset, prefix);
			}
		});
	});
};

const SpoilerFilterItemList = (props: Props) => {
	const { ranges, title, filterOn } = props;
	const includeGames = useRecoilValue(includeGameState);
	const [item, setItem] = useRecoilState(itemState);

	const turnThemOn = useMemo(() => {
		let offCount = 0;
		peformAll(ranges, (i: number, offset: number | undefined) => {
			if (!item.includes(i + (offset || 0))) {
				offCount++;
			}
		});
		return offCount > 0;
	}, [ranges, item]);

	if (filterOn && !includeGames.includes(filterOn)) {
		return null;
	}

	const toggleAll = () => {
		if (!isLocalHost) {
			return;
		}
		const value = Object.assign([], item);
		const toggleItemFilter = (key: number) => {
			const isOn = value.includes(key);
			if (turnThemOn) {
				if (!isOn) {
					value.push(key);
				}
			} else {
				if (isOn) {
					value.splice(value.indexOf(key), 1);
				}
			}
		};
		peformAll(ranges, (i: number, offset: number | undefined) => {
			toggleItemFilter(i + (offset || 0));
		});

		setItem(value);
	};

	const checkBoxes: Array<JSX.Element> = [];
	peformAll(
		ranges,
		(i: number, offset: number | undefined, prefix: string | undefined) => {
			checkBoxes.push(
				<FilterCheckbox
					key={`filter${i + (offset || 0)}`}
					id={i}
					offset={offset}
					prefix={prefix}
				/>
			);
		}
	);
	if (checkBoxes.length === 0) {
		return null;
	}

	return (
		<Form.Field>
			<Form.Group inline className={"inline-break"}>
				<Form.Group inline>
					{title && <label>{title}:</label>}
					{isLocalHost && (
						<label onClick={() => toggleAll()}>Toggle All</label>
					)}
				</Form.Group>
				{checkBoxes}
			</Form.Group>
		</Form.Field>
	);
};

export default SpoilerFilterItemList;
