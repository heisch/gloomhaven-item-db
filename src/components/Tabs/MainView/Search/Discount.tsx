import React from "react";
import { useRecoilValue } from "recoil";
import { Form } from "semantic-ui-react";
import {
	discountState,
	displayItemAsState,
	ItemViewDisplayType,
} from "../../../../State";

export const Discount = () => {
	const discount = useRecoilValue(discountState);
	const displayAs = useRecoilValue(displayItemAsState);

	if (displayAs !== ItemViewDisplayType.Images) {
		return null;
	}
	return (
		<Form.Group inline>
			<label>Store Discount:</label>
			{`${discount}g`}
		</Form.Group>
	);
};
