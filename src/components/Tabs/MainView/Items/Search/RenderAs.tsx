import React from "react";
import { useRecoilState } from "recoil";
import { Button, Form } from "semantic-ui-react";
import { displayItemAsState } from "../../../../../State";
import { ItemViewDisplayType } from "../../../../../State/Types";

type Props = {
	type: ItemViewDisplayType;
	text: string;
};
const RenderAsButton = (props: Props) => {
	const { type, text } = props;
	const [displayAs, setDisplayAs] = useRecoilState(displayItemAsState);
	return (
		<Button
			color={displayAs === type ? "blue" : undefined}
			onClick={() => {
				setDisplayAs(type);
			}}
		>
			{text}
		</Button>
	);
};

export const RenderAs = () => {
	return (
		<Form.Group inline>
			<label>Render as:</label>
			<Button.Group>
				<RenderAsButton type={ItemViewDisplayType.List} text="List" />
				<Button.Or />
				<RenderAsButton
					type={ItemViewDisplayType.Images}
					text="Images"
				/>
			</Button.Group>
		</Form.Group>
	);
};
