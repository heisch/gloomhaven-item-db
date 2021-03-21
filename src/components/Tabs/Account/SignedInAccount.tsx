import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useFirebase } from "../../Firebase";
import { PasswordChangeDialog } from "./PasswordChangeDialog";

export const SignedInAccount = (): JSX.Element | null => {
  const { authUser, firebase } = useFirebase();
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  if (!authUser || !firebase) {
    return null;
  }
  return (
    <>
    <h1>Account</h1>
      {`Signed in as: ${authUser.email}`}
      <Form>
        <Button
          onClick={() => {
            firebase.doSignOut();
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
