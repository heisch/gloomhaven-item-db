import React from "react";
import { useRecoilState } from "recoil";
import { Button, Form, Icon } from "semantic-ui-react";
import { allState } from "../../../../State";

export const ToggleAllButton = () => {
	const [all, setAll] = useRecoilState(allState);

	return (
		<Form.Group inline>
			<label>Respecting Spoiler Settings:</label>
			<Button
				color={all ? "red" : "blue"}
				onClick={() => {
					setAll(!all);
				}}
			>
				{all ? (
					<>
						<Icon name={"eye"} /> disabled
					</>
				) : (
					<>
						<Icon name={"eye slash"} /> enabled
					</>
				)}
			</Button>
		</Form.Group>
	);
};
