import React from "react";
import { Form } from "semantic-ui-react";
import { fhItemsCount, ghItemToImport } from "../../../games/fh/FHGameData";
import SpoilerFilterItemList from "./SpoilerFilterItemList";

const FHSpoilerFilter = () => {
	return (
		<>
			<Form.Field>
				<SpoilerFilterItemList ranges={[1]} title="Items" />
				<SpoilerFilterItemList
					offset={fhItemsCount}
					ranges={ghItemToImport}
					title="Imported Gloomhaven Items"
				/>
			</Form.Field>
		</>
	);
};

export default FHSpoilerFilter;
