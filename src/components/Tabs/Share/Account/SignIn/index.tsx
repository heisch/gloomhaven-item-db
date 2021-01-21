import React, { useState, ChangeEvent } from 'react';
import { useHistory} from 'react-router';
import { Link } from 'react-router-dom';
import { useFirebase } from '../../../../Firebase';

import * as ROUTES from '../../../../../constants/routes';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForgotten';
import { Form } from 'semantic-ui-react';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
        <SignInForm/>
        <SignUpLink/>
        <PasswordForgetLink/>
  </div>
);
 
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
 
type Props = {
}

const SignInForm = (props: Props): JSX.Element  => {
    const { firebase } = useFirebase();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<Error| null>(null);
    const history = useHistory();

    const onSubmit = (event: any) => {
        if (!firebase)
            return;

        firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                setEmail('');
                setPassword('');
                setError(null);
                history.push(ROUTES.HOME);
            })
            .catch(error => {
                setError(error);
            });
 
        event.preventDefault();
    };
 
    const isInvalid = password === '' || email === '';
    return (
        <Form onSubmit={onSubmit}>
          <Form.Group widths="equal">
           <Form.Input
             name="email"
             value={email}
             onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
             type="text"
             placeholder="Email Address"
           />
             <Form.Input
             name="passwordOne"
             value={password}
             onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
             type="password"
             placeholder="Password"
           />
          </Form.Group>
          <Form.Group>
          <Form.Button disabled={isInvalid} type="submit">Sign In</Form.Button>
 
          {error && <Form.Field>{error.message}</Form.Field>} 
          </Form.Group>  
        </Form>
    );
}

const SignInLink = () => {
  return <p>
    Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </p>
  };

  const BackToSignInLink = () => {
    return <p>
      Go back to login? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </p>
    };
  
 
export default SignInPage;
 
export { SignInForm, SignInLink, BackToSignInLink };
