import React from "react";
import { Form, Button, Icon } from "semantic-ui-react";
import GHSpoilerFilter from "./GHSpoilerFilter";
import JOTLSpoilerFilter from "./JOTLSpoilerFilter";
import PartyManagementFilter from "./PartyManagementFilter";
import ConfirmClassDelete from "./ConfirmClassDelete";
import { PartySpoiler } from "./PartySpoiler";
import ConfirmEnvelopeX from "./ConfirmEnvelopeX";
import { GameType } from "../../../games";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
	allState,
	confirmEnvelopeXState,
	envelopeXState,
	gameDataState,
} from "../../../State";

const filters = {
	[GameType.Gloomhaven]: <GHSpoilerFilter />,
	[GameType.JawsOfTheLion]: <JOTLSpoilerFilter />,
};

const SpoilerFilters = () => {
	const [all, setAll] = useRecoilState(allState.stateSelector);
	const envelopeX = useRecoilValue(envelopeXState.stateSelector);
	const { gameType } = useRecoilValue(gameDataState);
	const setConfirmEnvelopeX = useSetRecoilState(
		confirmEnvelopeXState.stateSelector
	);

	return (
		<Form>
			<Form.Group inline>
				<label>Respecting Spoiler Settings:</label>
				<Button
					color={all ? "red" : "blue"}
					onClick={() => {
						setAll(!all);
					}}
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
