import React from "react";
import { Form } from "semantic-ui-react";
import SpoilerFilterItemList from "./SpoilerFilterItemList";
import { getGHClassList } from "../../../State/Types";
import { useRecoilState, useRecoilValue } from "recoil";
import { discountState, envelopeXState, prosperityState } from "../../../State";
import { SoloClassFilter } from "./SoloClassFilter";

const GHSpoilerFilter = () => {
	const envelopeX = useRecoilValue(envelopeXState);
	const [discount, setDiscount] = useRecoilState(discountState);
	const [prosperity, setProsperity] = useRecoilState(prosperityState);

	const soloClasses = getGHClassList(envelopeX, true);

	return (
		<>
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

			<Form.Field>
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

				<SpoilerFilterItemList
					ranges={[{ start: (prosperity + 1) * 7 + 1, end: 70 }]}
					title="Prosperity Items"
				/>
				<SpoilerFilterItemList
					ranges={[{ start: 71, end: 95 }]}
					title="Random Item Design"
				/>
				<SpoilerFilterItemList
					ranges={[{ start: 96, end: 133 }]}
					title="Other Items"
				/>
				<SpoilerFilterItemList
					ranges={[{ start: 152, end: 163 }]}
					title="Forgotten Circles Items"
				/>
			</Form.Field>
			<SoloClassFilter classes={soloClasses} />
		</>
	);
};

export default GHSpoilerFilter;
