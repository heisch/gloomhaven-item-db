import React from "react";
import { useRecoilState } from "recoil";
import { Form } from "semantic-ui-react";
import { prosperityState } from "../../../../State";

export const ProsperityFilter = () => {
	const [prosperity, setProsperity] = useRecoilState(prosperityState);
	return (
		<Form.Group inline>
			<label>Prosperity:</label>
			{[...Array(9).keys()].map((index) => {
				const nextProsperity = index + 1;
				return (
					<Form.Radio
						key={index}
						label={nextProsperity}
						checked={prosperity === nextProsperity}
						onChange={() => setProsperity(nextProsperity)}
					/>
				);
			})}
		</Form.Group>
	);
};
