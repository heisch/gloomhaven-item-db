import React, { ChangeEvent, useState } from "react";
import { Button, Form, List, Modal } from "semantic-ui-react";
import { useFirebase } from "../../Firebase";

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export const PasswordChangeDialog = (props: Props) => {
	const { isOpen, onClose } = props;
	const { passwordUpdate, error } = useFirebase();
	const [passwordOne, setPasswordOne] = useState<string>("");
	const [passwordTwo, setPasswordTwo] = useState<string>("");

	const onSubmit = (event: any) => {
		passwordUpdate(passwordOne);
		event.preventDefault();
	};

	const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

	return (
		<Modal size="tiny" open={isOpen} onClose={onClose}>
			<Modal.Header>Change Password</Modal.Header>
			<Modal.Content>
				<Form onSubmit={onSubmit}>
					<List>
						<List.Item>
							<Form.Input
								name="passwordOne"
								value={passwordOne}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setPasswordOne(e.target.value)
								}
								type="password"
								placeholder="New Password"
							/>
						</List.Item>
						<List.Item>
							<Form.Input
								name="passwordTwo"
								value={passwordTwo}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setPasswordTwo(e.target.value)
								}
								type="password"
								placeholder="Confirm New Password"
							/>
						</List.Item>
						<List.Item>{error && <p>{error.message}</p>}</List.Item>
						<List.Item></List.Item>
					</List>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button negative onClick={onClose}>
					Close{" "}
				</Button>
				<Button
					disabled={isInvalid}
					positive
					icon="checkmark"
					labelPosition="right"
					content="Change Password"
					onClick={onSubmit}
				/>
			</Modal.Actions>
		</Modal>
	);
};
