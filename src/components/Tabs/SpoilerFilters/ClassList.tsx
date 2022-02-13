import React from "react";
import { Form } from "semantic-ui-react";
import { ClassesInUse } from "../../../State/Types";
import ClassIcon from "../MainView/ClassIcon";

type Props = {
	label: string;
	classes: ClassesInUse[];
	onClick: (className: ClassesInUse) => void;
	isEnabled?: (className: ClassesInUse) => boolean;
	isUsed: (className: ClassesInUse) => boolean;
};

export const ClassList = (props: Props) => {
	console.log(props);
	const { label, classes, onClick, isEnabled, isUsed } = props;

	return (
		<Form.Group inline className={"inline-break"}>
			<label>{label}</label>
			{classes.map((name) => {
				return (
					<ClassIcon
						name={name}
						className={`icon ${!isUsed(name) ? "unused" : ""} ${
							isEnabled && !isEnabled(name) ? "disabled" : ""
						}`}
						onClick={onClick}
					/>
				);
			})}
		</Form.Group>
	);
};
