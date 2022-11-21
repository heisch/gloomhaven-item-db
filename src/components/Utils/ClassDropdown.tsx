import React from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import { ClassesInUse } from "../../State/Types";
import { ClassIcon } from "./ClassIcon";

type Props = {
	className?: string;
	optionsList: ClassesInUse[];
	onChange: (option: ClassesInUse) => void;
	disabled?: boolean;
};

const ClassDropdown = (props: Props) => {
	const { optionsList, onChange } = props;
	return (
		<Dropdown
			onChange={(
				_e: React.SyntheticEvent<HTMLElement, Event>,
				data: DropdownProps
			) => onChange(data.value as ClassesInUse)}
			placeholder="Choose Class"
			clearable
			selection
			options={optionsList.map((option) => {
				return {
					key: option,
					value: option,
					image: <ClassIcon name={option} />,
				};
			})}
		/>
	);
};

export default ClassDropdown;
