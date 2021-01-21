import React, { useState, ChangeEvent } from 'react';
 
import { useFirebase } from '../../../../Firebase';
import { Form } from 'semantic-ui-react';
 
const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
 
const PasswordChangeForm = () => {
    const { firebase } = useFirebase();
    const [passwordOne, setPasswordOne] = useState<string>('');
    const [passwordTwo, setPasswordTwo] = useState<string>('');
    const [error, setError] = useState<Error| null>(null);


  const onSubmit = (event: any) => {
    if (!firebase) {
        return;
    }
    firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        setPasswordOne('');
        setPasswordTwo('');
        setError(null);
      })
      .catch(error => {
        setError(error);
      });
 
    event.preventDefault();
  };
 
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
 
    return (
      <Form onSubmit={onSubmit}>
        <Form.Input
          name="passwordOne"
          value={passwordOne}
          onChange={(e:ChangeEvent<HTMLInputElement>) => setPasswordOne(e.target.value)}
          type="password"
          placeholder="New Password"
        />
        <Form.Input
          name="passwordTwo"
          value={passwordTwo}
          onChange={(e:ChangeEvent<HTMLInputElement>) => setPasswordTwo(e.target.value)}
          type="password"
          placeholder="Confirm New Password"
        />
        <Form.Button disabled={isInvalid} type="submit">
          Reset My Password
        </Form.Button>
 
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
 
export default PasswordChangeForm;
