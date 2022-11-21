import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Form } from "semantic-ui-react";
import {
	classesInUseState,
	itemManagementTypeState,
	selectedClassState,
} from "../../../../../State";
import { ClassesInUse, ItemManagementType } from "../../../../../State/Types";
import { ClassList } from "../../../SpoilerFilters/Party/ClassList";

export const FilterClass = () => {
	const itemManagementType = useRecoilValue(itemManagementTypeState);
	const classesInUse = useRecoilValue(classesInUseState);
	const [selectedClass, setSelectedClass] =
		useRecoilState(selectedClassState);

	if (itemManagementType !== ItemManagementType.Party) {
		return null;
	}
	return (
		<Form.Group inline>
			<ClassList
				label={"Filter Owner:"}
				classes={classesInUse}
				onClick={(option: ClassesInUse) => {
					if (selectedClass === option) {
						setSelectedClass(undefined);
					} else {
						setSelectedClass(option);
					}
				}}
				isUsed={(options: ClassesInUse) => selectedClass === options}
			/>
		</Form.Group>
	);
};
