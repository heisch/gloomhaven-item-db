import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useFirebase } from "../../Firebase";
import { PasswordChangeDialog } from "./PasswordChangeDialog";

export const SignedInAccount = (): JSX.Element | null => {
	const { user, signOut } = useFirebase();
	const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
	if (!user || user.isAnonymous) {
		return null;
	}
	return (
		<>
			<h1>Account</h1>
			{`Signed in as: ${user.email}`}
			<Form>
				<Button
					onClick={() => {
						signOut();
					}}
				>
					Sign Out
				</Button>
				<p onClick={() => setResetPasswordOpen(true)}>
					Change Password? <a>Click here</a>
				</p>
				<PasswordChangeDialog
					isOpen={resetPasswordOpen}
					onClose={() => setResetPasswordOpen(false)}
				/>
			</Form>
		</>
	);
};
