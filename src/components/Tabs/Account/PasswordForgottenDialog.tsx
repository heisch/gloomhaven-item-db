import React, { ChangeEvent, useState } from "react";
import { Button, Form, List, Modal } from "semantic-ui-react";
import { useFirebase } from "../../Firebase";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
export const PasswordForgetDialog = (props: Props) => {
  const { isOpen, onClose } = props;
  const { firebase } = useFirebase();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  const onSubmit = (event: any) => {
    if (!firebase) return;
    firebase
      .doPasswordReset(email)
      .then(() => {
        setEmail("");
        setError(null);
      })
      .catch((error) => {
        setError(error);
      });

    event.preventDefault();
  };

  const isInvalid = email === "";

  return (
    <Modal size="tiny" open={isOpen} onClose={onClose}>
      <Modal.Header>Reset Password</Modal.Header>
      <Modal.Content>
        <Form onSubmit={onSubmit}>
          <List>
            <List.Item>
              <Form.Input
                name="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                type="text"
                placeholder="Email Address"
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
          content="Reset Password"
          onClick={onSubmit}
        />
      </Modal.Actions>
    </Modal>
  );
};
