import React from "react";
import { Button, Modal, Form, List } from "semantic-ui-react";
import { useRecoilState } from "recoil";
import { removingGameState, includeGameState } from "../../../../State";
import { allFiltersData } from "./GameFilters";
import { useRemovePlayerUtils } from "../../../../hooks/useRemovePlayer";

export const ConfirmGameRemoval = () => {
	const {
		removeClasses,
		getClassesToRemove,
		getRemovingItemCount,
		anyGameItemsOwned,
	} = useRemovePlayerUtils();
	const [removingGame, setRemovingGame] = useRecoilState(removingGameState);
	const [includeGames, setIncludeGames] = useRecoilState(includeGameState);

	const onClose = () => {
		setRemovingGame(undefined);
	};

	const onApply = () => {
		if (!removingGame) {
			return;
		}
		// Go through all classes and see if any of them are used..
		// if so then remove their ownership
		const classesToRemove = getClassesToRemove(removingGame);
		if (classesToRemove) {
			removeClasses(classesToRemove, removingGame);
		}

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
					{removingGame && (
						<Form.Group>
							<List bulleted>
								<List.Header>Confirming this will:</List.Header>
								{getClassesToRemove(removingGame).length >
									0 && (
									<List.Item>
										{`Remove this game's classes from the
										party`}
									</List.Item>
								)}
								{getRemovingItemCount(removingGame) > 0 && (
									<List.Item>
										{`Put any items owned by this game's
										classes back into available inventory`}
									</List.Item>
								)}
								{anyGameItemsOwned(removingGame) > 0 && (
									<List.Item>
										{`Clear the owners of any of this game's
										items.`}
									</List.Item>
								)}
							</List>
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
