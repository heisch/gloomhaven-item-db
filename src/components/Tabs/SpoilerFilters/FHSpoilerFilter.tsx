import React from "react";
import { useRecoilState } from "recoil";
import { Form } from "semantic-ui-react";
import { fhItemsCount } from "../../../games/fh/FHGameData";
import { includeGloomhavenItemsState } from "../../../State";
import { FHClasses } from "../../../State/Types";
import { ScenarioCompletedFilter } from "./ScenarioCompletedFilter";
import { SoloClassFilter } from "./SoloClassFilter";
import SpoilerFilterItemList from "./SpoilerFilterItemList";

const scenariosOfImportance = [1];

const FHSpoilerFilter = () => {
	const [includeGloomhavenItems, setIncludeGloomhavenItems] = useRecoilState(
		includeGloomhavenItemsState
	);
	return (
		<>
			<Form.Group inline>
				<label>Include Gloomhaven Items?</label>
				<Form.Checkbox
					toggle
					checked={includeGloomhavenItems}
					onChange={() =>
						setIncludeGloomhavenItems(!includeGloomhavenItems)
					}
				/>
			</Form.Group>

			<ScenarioCompletedFilter scenarios={scenariosOfImportance} />
			<Form.Field>
				<SpoilerFilterItemList
					ranges={[{ start: 11, end: fhItemsCount }]}
					title="Items"
				/>
			</Form.Field>
			<SoloClassFilter classes={Object.values(FHClasses)} />
		</>
	);
};

export default FHSpoilerFilter;
