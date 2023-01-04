import React from "react";
import { Form } from "semantic-ui-react";
import { ToggleAllButton, GameFilter } from "./Items";
import { PartySpoiler, ConfirmClassDelete } from "./Party";
import { GameFilters, ConfirmGameRemoval } from "./Games";
import { Secrets } from "./Secrets/Secrets";

const SpoilerFilters = () => {
	return (
		<Form>
			<ToggleAllButton />
			<GameFilters />
			<Secrets />
			<PartySpoiler />
			<GameFilter />
			<ConfirmGameRemoval />
			<ConfirmClassDelete />
		</Form>
	);
};

export default SpoilerFilters;
