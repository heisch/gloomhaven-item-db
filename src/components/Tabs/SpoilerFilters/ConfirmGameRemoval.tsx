import React from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	classesInUseState,
	removingGameState,
	includeGameState,
} from "../../../State";
import {
	ClassesInUse,
	FCClasses,
	FHClasses,
	GHClasses,
	JOTLClasses,
} from "../../../State/Types";
import { GameType } from "../../../games";
import { Expansions } from "../../../games/GameType";
import { allFiltersData } from "./GameFilters";
import { useRemovePlayerUtils } from "../../../hooks/useRemovePlayer";

export const ConfirmGameRemoval = () => {
	const { removeClasses } = useRemovePlayerUtils();
	const [removingGame, setRemovingGame] = useRecoilState(removingGameState);
	const classesInUse = useRecoilValue(classesInUseState);
	const [includeGames, setIncludeGames] = useRecoilState(includeGameState);

	const onClose = () => {
		setRemovingGame(undefined);
	};

	const getClassesToRemove = () => {
		let classes: ClassesInUse[] = [];
		switch (removingGame) {
			case GameType.Gloomhaven:
				classes = Object.values(GHClasses);
				break;
			case GameType.JawsOfTheLion:
				classes = Object.values(JOTLClasses);
				break;
			case GameType.Frosthaven:
				classes = Object.values(FHClasses);
				break;
			case Expansions.ForgottenCircles:
				classes = Object.values(FCClasses);
				break;
		}
		return classes.filter((c) => classesInUse.includes(c));
	};

	const onApply = () => {
		if (!removingGame) {
			return;
		}
		// Go through all classes and see if any of them are used..
		// if so then remove their ownership
		const classesToRemove = getClassesToRemove();
		removeClasses(classesToRemove);

		// Remove the game
		const value = Object.assign([], includeGames);
		value.splice(value.indexOf(removingGame), 1);
		setIncludeGames(value);
		onClose();
	};

	const { title } = allFiltersData.find(
		(data) => data.allGameType === removingGame
	) || { title: "Unknown" };

	return (
		<Modal size="tiny" open={removingGame !== undefined} onClose={onClose}>
			<Modal.Header>{`Remove ${title}`}</Modal.Header>
			<Modal.Content>
				<Form>
					<Form.Group>{`Remove ${title} from the db?`}</Form.Group>
					{getClassesToRemove().length > 0 && (
						<Form.Group>
							<p>
								This will put all items back in iventory and
								remove all characters.
							</p>
						</Form.Group>
					)}
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button negative onClick={onClose}>
					No
				</Button>
				<Button
					positive
					icon="checkmark"
					labelPosition="right"
					content="Yes"
					onClick={onApply}
				/>
			</Modal.Actions>
		</Modal>
	);
};
