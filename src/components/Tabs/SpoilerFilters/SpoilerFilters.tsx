import React from "react";
import { Form, Button, Icon } from "semantic-ui-react";
import { useFilterOptions } from "../../Providers/FilterOptionsProvider";
import GHSpoilerFilter from "./GHSpoilerFilter";
import JOTLSpoilerFilter from "./JOTLSpoilerFilter";
import PartyManagementFilter from "./PartyManagementFilter";
import ConfirmClassDelete from "./ConfirmClassDelete";
import { PartySpoiler } from "./PartySpoiler";
import ConfirmEnvelopeX from "./ConfirmEnvelopeX";
import { GameType } from "../../../games";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { confirmEnvelopeXState, gameDataState } from "../../../State";

const filters = {
	[GameType.Gloomhaven]: <GHSpoilerFilter />,
	[GameType.JawsOfTheLion]: <JOTLSpoilerFilter />,
};

const SpoilerFilters = () => {
	const {
		filterOptions: { all, envelopeX },
		updateFilterOptions,
	} = useFilterOptions();
	const { gameType } = useRecoilValue(gameDataState);
	const setConfirmEnvelopeX = useSetRecoilState(confirmEnvelopeXState);

	return (
		<Form>
			<Form.Group inline>
				<label>Respecting Spoiler Settings:</label>
				<Button
					color={all ? "red" : "blue"}
					onClick={() => updateFilterOptions({ all: !all })}
				>
					{all ? (
						<React.Fragment>
							<Icon name={"eye"} /> disabled
						</React.Fragment>
					) : (
						<React.Fragment>
							<Icon name={"eye slash"} /> enabled
						</React.Fragment>
					)}
				</Button>
			</Form.Group>

			<PartyManagementFilter />
			{!envelopeX && (
				<Button onClick={() => setConfirmEnvelopeX(true)}>
					Envelope X
				</Button>
			)}
			{filters[gameType]}
			<PartySpoiler />
			<ConfirmClassDelete />
			<ConfirmEnvelopeX />
		</Form>
	);
};

export default SpoilerFilters;
