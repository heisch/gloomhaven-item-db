import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useFirebase } from "../../Firebase";

export const SignedInAccount = (): JSX.Element | null => {
  const { user, signOut } = useFirebase();
  if (!user) {
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
      </Form>
    </>
  );
};
