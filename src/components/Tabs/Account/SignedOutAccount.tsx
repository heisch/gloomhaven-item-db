import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useFirebase } from "../../Firebase";
import { PasswordForgetDialog } from "./PasswordForgottenDialog";
import { SignInDialog } from "./SignInDialog";
import { SignUpDialog } from "./SignUpDialog";

export const SignedOutAccount = (): JSX.Element | null => {
  const { authUser, firebase } = useFirebase();
  const [passwordForgottenOpen, setPasswordForgottenOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  if (authUser || !firebase) {
    return null;
  }
  return (
    <Form>
      <h1>Sign In</h1>
      <Button onClick={() => setSignInOpen(true)}>Sign In</Button>
      <SignInDialog isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
      <p>
        Don't have an account?
        <a onClick={() => setSignUpOpen(true)}>Sign Up</a>
      </p>
      <SignUpDialog isOpen={signUpOpen} onClose={() => setSignUpOpen(false)} />
      <p>
        Forgot your password?
        <a onClick={() => setPasswordForgottenOpen(true)}>Reset Password</a>
      </p>
      <PasswordForgetDialog
        isOpen={passwordForgottenOpen}
        onClose={() => setPasswordForgottenOpen(false)}
      />
    </Form>
  );
};
