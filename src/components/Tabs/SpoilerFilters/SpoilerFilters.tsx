import React from "react";
import { Form } from "semantic-ui-react";
import { ToggleAllButton, GameFilter } from "./Items";
import {
	PartySpoiler,
	ConfirmEnvelopeX,
	ConfirmClassDelete,
	EnvelopeXButton,
} from "./Party";
import { GameFilters, ConfirmGameRemoval } from "./Games";
import { ConfirmEnvelopeE } from "./Items";

const SpoilerFilters = () => {
	return (
		<Form>
			<ToggleAllButton />
			<GameFilters />
			<PartySpoiler />
			<EnvelopeXButton />
			<GameFilter />
			<ConfirmGameRemoval />
			<ConfirmClassDelete />
			<ConfirmEnvelopeX />
			<ConfirmEnvelopeE />
		</Form>
	);
};

export default SpoilerFilters;
