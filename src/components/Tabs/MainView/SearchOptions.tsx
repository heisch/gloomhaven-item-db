import React from "react";
import { Form } from "semantic-ui-react";
import {
	RenderAs,
	FilterSlots,
	FilterResorces,
	FindItemSearchBar,
	FilterClass,
	FilterAvailability,
	SortItems,
	Discount,
} from "./Search";

const SearchOptions = () => {
	return (
		<Form>
			<RenderAs />
			<FilterSlots />
			<FilterResorces />
			<FindItemSearchBar />
			<FilterClass />
			<FilterAvailability />
			<SortItems />
			<Discount />
		</Form>
	);
};

export default SearchOptions;
