import React from "react";
import { useRecoilState } from "recoil";
import { Form } from "semantic-ui-react";
import { soloClassState } from "../../../State";
import { ClassesInUse } from "../../../State/Types";
import { ClassList } from "./ClassList";

type Props = {
	classes: ClassesInUse[];
	name: string;
};

export const SoloClassFilter = (props: Props) => {
	const { classes, name } = props;
	const [soloClass, setSoloClass] = useRecoilState(soloClassState);

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
					label={`${name}:`}
					classes={classes}
					onClick={toggleClassFilter}
				/>
			</Form.Group>
		</Form.Field>
	);
};
