import React from "react";
import { useRecoilState } from "recoil";
import { Button, Form } from "semantic-ui-react";
import { availableOnlyState } from "../../../../State";

type Props = {
	available: boolean;
	text: string;
};

const FilterAvailabilityButton = (props: Props) => {
	const [availableOnly, setAvailableOnly] =
		useRecoilState(availableOnlyState);
	const { available, text } = props;
	return (
		<Button
			color={availableOnly === available ? "blue" : undefined}
			onClick={() => {
				setAvailableOnly(available);
			}}
		>
			{text}
		</Button>
	);
};

export const FilterAvailability = () => {
	return (
		<Form.Group inline>
			<label>Availability</label>
			<Button.Group>
				<FilterAvailabilityButton available={true} text={"Available"} />
				<Button.Or />
				<FilterAvailabilityButton available={false} text={"All"} />
			</Button.Group>
		</Form.Group>
	);
};
