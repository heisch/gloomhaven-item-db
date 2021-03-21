import React, { ChangeEvent, useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import { useFirebase } from "../../Firebase";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const SignUpDialog = (props: Props): JSX.Element => {
  const { isOpen, onClose } = props;
  const { firebase } = useFirebase();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [passwordOne, setPasswordOne] = useState<string>("");
  const [passwordTwo, setPasswordTwo] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  const onSubmit = (event: any) => {
    if (!firebase) return;
    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser: any) => {
        firebase.user(authUser.user.uid).set({
          username,
          email,
        });
      })
      .catch((error: Error) => {
        setError(error);
      });

    event.preventDefault();
  };

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === "" ||
    email === "" ||
    username === "";
  return (
    <Modal size="tiny" open={isOpen} onClose={onClose}>
      <Modal.Header>Sign In</Modal.Header>
      <Modal.Content>
        <Form onSubmit={onSubmit}>
          <h1>Sign Up</h1>
          <Form.Group widths="equal">
            <Form.Input
              name="username"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              type="text"
              placeholder="Full Name"
            />
            <Form.Input
              name="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              type="text"
              placeholder="Email Address"
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              name="passwordOne"
              value={passwordOne}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPasswordOne(e.target.value)
              }
              type="password"
              placeholder="Password"
            />
            <Form.Input
              name="passwordTwo"
              value={passwordTwo}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPasswordTwo(e.target.value)
              }
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Group>
          <Form.Group>
            {error && <p>{error.message}</p>}
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={onClose}>
          Close
        </Button>
        <Button
          disabled={isInvalid}
          positive
          icon="checkmark"
          labelPosition="right"
          content="Sign Up"
          onClick={onSubmit}
        />
      </Modal.Actions>
    </Modal>
  );
};
