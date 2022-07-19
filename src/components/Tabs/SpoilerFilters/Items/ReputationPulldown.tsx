import React from "react";
import { useRecoilState } from "recoil";
import { Form } from "semantic-ui-react";
import { discountState } from "../../../../State";

export const ReputationPulldown = () => {
	const [discount, setDiscount] = useRecoilState(discountState);
	return (
		<Form.Group inline>
			<label>Reputation Discount:</label>
			<Form.Select
				value={discount}
				options={[
					{ value: -5, text: "-5 gold" }, // (19 - 20)
					{ value: -4, text: "-4 gold" }, // (15 - 18)
					{ value: -3, text: "-3 gold" }, // (11 - 14)
					{ value: -2, text: "-2 gold" }, // (7 - 13)
					{ value: -1, text: "-1 gold" }, // (3 - 6)
					{ value: 0, text: "none" }, // (-2 - 2)
					{ value: 1, text: "+1 gold" }, // (-3 - -6)
					{ value: 2, text: "+2 gold" }, // (-7 - -10)
					{ value: 3, text: "+3 gold" }, // (-11 - -14)
					{ value: 4, text: "+4 gold" }, // (-15 - -18)
					{ value: 5, text: "+5 gold" }, // (-19 - -20)
				]}
				onChange={(obj, e) => {
					setDiscount(parseInt(e.value as string));
				}}
			/>
		</Form.Group>
	);
};
