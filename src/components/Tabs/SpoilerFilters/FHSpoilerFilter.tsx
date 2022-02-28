import React from "react";
import { Form } from "semantic-ui-react";
import { fhItemsCount, ghItemToImport } from "../../../games/fh/FHGameData";
import { FHClasses } from "../../../State/Types";
import { SoloClassFilter } from "./SoloClassFilter";
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
			<SoloClassFilter classes={Object.values(FHClasses)} />
		</>
	);
};

export default FHSpoilerFilter;
