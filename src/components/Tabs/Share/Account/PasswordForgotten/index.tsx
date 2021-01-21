import React, { useState, ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
 
import { useFirebase } from '../../../../Firebase';
import * as ROUTES from '../../../../../constants/routes';
import { BackToSignInLink } from '../SignIn';
import { Form } from 'semantic-ui-react';
 
const PasswordForgetPage = () => (
  <div>
    <h1>Reset Password</h1>
    <PasswordForgetForm />
    <BackToSignInLink/>
  </div>
);
 
const PasswordForgetForm = () => {
    const { firebase } = useFirebase();
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<Error| null>(null);
    const history = useHistory();
    
  const onSubmit = (event: any) => {
      if (!firebase)
        return;
    firebase
      .doPasswordReset(email)
      .then(() => {
        setEmail("");
        setError(null);
        history.push(ROUTES.SIGN_IN);
      })
      .catch(error => {
        setError(error);
      });
 
    event.preventDefault();
  };
 
    const isInvalid = email === '';
 
    return (
      <Form onSubmit={onSubmit}>
        <Form.Input
            name="email"
            value={email}
            onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            type="text"
            placeholder="Email Address"
        />
        <Form.Button disabled={isInvalid} type="submit">
          Reset My Password
        </Form.Button>
 
        {error && <p>{error.message}</p>}
      </Form>
    );
}
 
const PasswordForgetLink = () => {
    return <p>
      Forgot your password? <Link to={ROUTES.PASSWORD_FORGET}>Reset Password</Link>
    </p>
};
 
export default PasswordForgetPage;
 
export { PasswordForgetForm, PasswordForgetLink };
