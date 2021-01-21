import React from 'react';
import { useFirebase } from '../../../../Firebase';
import { Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import * as ROUTES from '../../../../../constants/routes';

const SignOutButton = (): JSX.Element | null => 
{
    const {firebase} = useFirebase();   
    const history = useHistory();   
    if (!firebase)
    {
        return null;
    }  
    return (
        <Form.Button onClick={() => 
            {
                firebase.doSignOut();
                history.push(ROUTES.SIGN_IN)
            }
        } >Sign Out</Form.Button>
    )
};
 
export default SignOutButton;
