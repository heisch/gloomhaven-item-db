import React from "react";
import { useRecoilState } from "recoil";
import { Form } from "semantic-ui-react";
import { itemState } from "../../../../State";

type Props = {
	id: number;
	offset?: number;
	prefix?: string;
};

const FilterCheckbox = (props: Props) => {
	const { id, offset = 0, prefix = "" } = props;
	const [item, setItem] = useRecoilState(itemState);

	const toggleItemFilter = (key: number) => {
		const value = Object.assign([], item);
		if (value.includes(key)) {
			value.splice(value.indexOf(key), 1);
		} else {
			value.push(key);
		}
		setItem(value);
	};

	return (
		<Form.Checkbox
			key={id}
			label={`#${prefix}${id.toString().padStart(prefix ? 0 : 3, "0")}`}
			checked={item.includes(id + offset)}
			onChange={() => toggleItemFilter(id + offset)}
		/>
	);
};

export default FilterCheckbox;
