import { current } from "@reduxjs/toolkit";
import React from "react";
import { useRecoilState } from "recoil";
import { Form } from "semantic-ui-react";
import { buildingLevelState } from "../../../../State";

interface Props {
	label: string;
	lockedLabel?: string;
	minLevel: number;
	maxLevel: number;
	buildingKey: string;
}

export const BuildingLevelFilter = (props: Props) => {
	const { label, lockedLabel, minLevel, maxLevel, buildingKey } = props;
	const [buildingLevels, setBuildingLevel] =
		useRecoilState(buildingLevelState);
	const currentLevel = buildingLevels[buildingKey];
	const buttons = [];
	let min = minLevel;
	let max = maxLevel;
	if (currentLevel < 0) {
		max = 0;
	}
	for (let i = min; i <= max; i++) {
		let radioLabel = i.toString();
		if (i === -1) {
			radioLabel = currentLevel === -1 ? "Locked" : "Lock";
		} else if (i === 0) {
			radioLabel = currentLevel === -1 ? "Unlock" : "Unbuilt";
		}
		buttons.push(
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
	}
	return (
		<Form.Group inline>
			<label>{currentLevel < 0 ? lockedLabel : label}:</label>
			{buttons}
		</Form.Group>
	);
};
