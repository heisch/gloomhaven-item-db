import React from "react";
import { useRecoilState } from "recoil";
import { Form } from "semantic-ui-react";
import { scenarioCompletedState } from "../../../State";

type Props = {
	scenarios: number[];
};

export const ScenarioCompletedFilter = (props: Props) => {
	const { scenarios } = props;
	const [scenarioCompleted, setScenarioComplete] = useRecoilState(
		scenarioCompletedState
	);

	const toggleScenarioCompleted = (key: number) => {
		const value = Object.assign([], scenarioCompleted);
		if (value.includes(key)) {
			value.splice(value.indexOf(key), 1);
		} else {
			value.push(key);
		}
		setScenarioComplete(value);
	};

	return (
		<Form.Group inline className={"inline-break"}>
			<label>Scenarios Completed:</label>
			{scenarios.map((id) => {
				return (
					<Form.Checkbox
						key={id}
						label={"#" + (id + "").padStart(3, "0")}
						checked={scenarioCompleted.includes(id)}
						onChange={() => toggleScenarioCompleted(id)}
					/>
				);
			})}
		</Form.Group>
	);
};
