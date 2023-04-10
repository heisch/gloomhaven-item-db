import { EmailAuthProvider, GoogleAuthProvider } from "@firebase/auth";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Form } from "semantic-ui-react";
import { auth, useFirebase } from "../../Firebase";

const uiConfig = {
	signInFlow: "popup",
	signInOptions: [
		{
			provider: GoogleAuthProvider.PROVIDER_ID,
			customParameters: {
				prompt: "select_account",
				auth_type: "reauthenticate",
			},
		},
		EmailAuthProvider.PROVIDER_ID,
	],
};

export const SignedOutAccount = (): JSX.Element | null => {
	const { user } = useFirebase();

	if (user) {
		return null;
	}
	return (
		<Form>
			<h1>Sign In</h1>
			<StyledFirebaseAuth
				uiConfig={uiConfig}
				firebaseAuth={auth}
				className="login-screen"
			/>
		</Form>
	);
};
