import React from "react";
import { useRecoilState } from "recoil";
import { Form } from "semantic-ui-react";
import { craftsmanBuildingLevelState } from "../../../../State";

export const CraftsmanLevelFilter = () => {
	const [craftsmanLevel, setCraftsmanLevel] = useRecoilState(
		craftsmanBuildingLevelState
	);
	return (
		<Form.Group inline>
			<label>Craftsman Level:</label>
			{[...Array(9).keys()].map((index) => {
				const nextProsperity = index + 1;
				return (
					<Form.Radio
						key={index}
						label={nextProsperity}
						checked={craftsmanLevel === nextProsperity}
						onChange={() => setCraftsmanLevel(nextProsperity)}
					/>
				);
			})}
		</Form.Group>
	);
};
