import React from "react";
import { Form } from "semantic-ui-react";
import { ToggleAllButton, GameFilter } from "./Items";
import {
	PartySpoiler,
	ConfirmEnvelopeX,
	ConfirmEnvelopeV,
	ConfirmClassDelete,
} from "./Party";
import { GameFilters, ConfirmGameRemoval } from "./Games";
import { ConfirmEnvelopeE } from "./Items";
import { SpecialUnlocksButton } from "./Common/SpecialUnlockButton";
import { Expansions, GameType } from "../../../games";
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
			<SpecialUnlocksButton
				gameType={Expansions.TrailOfAshes}
				specialUnlockType={SpecialUnlockTypes.EnvelopeV}
				text="Envelope V"
			/>
			<GameFilter />
			<ConfirmGameRemoval />
			<ConfirmClassDelete />
			<ConfirmEnvelopeX />
			<ConfirmEnvelopeV />
			<ConfirmEnvelopeE />
		</Form>
	);
};

export default SpoilerFilters;
