import React from "react";
import { useRecoilState } from "recoil";
import { Form } from "semantic-ui-react";
import { buildingLevelState } from "../../../../State";

export interface BuildingLevelFilterProps {
	label: string;
	lockedLabel?: string;
	startBuildingLevel?: number;
	endBuildingLevel?: number;
	buildingKey: string;
}

export const BuildingLevelFilter = (props: BuildingLevelFilterProps) => {
	const {
		label,
		lockedLabel,
		startBuildingLevel,
		endBuildingLevel,
		buildingKey,
	} = props;
	const [buildingLevels, setBuildingLevel] =
		useRecoilState(buildingLevelState);
	const currentLevel = buildingLevels[buildingKey];
	let min = startBuildingLevel || 1;
	let max = endBuildingLevel || min;
	if (currentLevel < 0) {
		max = 0;
	}

	const levels = [];
	for (let i = min; i <= max; i++) {
		levels.push(i);
	}

	if (lockedLabel) {
		levels.unshift(...[-1, 0]);
	}

	const buttons = levels.map((i) => {
		let radioLabel = i.toString();
		if (i === -1) {
			radioLabel = currentLevel === -1 ? "Locked" : "Lock";
		} else if (i === 0) {
			radioLabel = currentLevel === -1 ? "Unlock" : "Unbuilt";
		}
		return (
			<Form.Radio
				key={i}
				label={radioLabel}
				checked={currentLevel === i}
				onChange={() =>
					setBuildingLevel((current) => ({
						...current,
						[buildingKey]: i,
					}))
				}
			/>
		);
	});

	return (
		<Form.Group inline>
			<label>{currentLevel < 0 ? lockedLabel : label}:</label>
			{buttons}
		</Form.Group>
	);
};
