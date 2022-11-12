import React from "react";
import { Form } from "semantic-ui-react";
import { ToggleAllButton, GameFilter } from "./Items";
import { PartySpoiler, ConfirmEnvelopeX, ConfirmClassDelete } from "./Party";
import { GameFilters, ConfirmGameRemoval } from "./Games";
import { ConfirmEnvelopeE } from "./Items";
import { SpecialUnlocksButton } from "./Common/SpecialUnlockButton";
import { GameType } from "../../../games";
import { SpecialUnlockTypes } from "../../../State";

const SpoilerFilters = () => {
	return (
		<Form>
			<ToggleAllButton />
			<GameFilters />
			<PartySpoiler />
			<SpecialUnlocksButton
				gameType={GameType.Gloomhaven}
				specialUnlockType={SpecialUnlockTypes.EnvelopeX}
				text="Envelope X"
			/>
			<GameFilter />
			<ConfirmGameRemoval />
			<ConfirmClassDelete />
			<ConfirmEnvelopeX />
			<ConfirmEnvelopeE />
		</Form>
	);
};

export default SpoilerFilters;
