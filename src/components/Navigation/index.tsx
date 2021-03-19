import React from 'react';
import { Link } from 'react-router-dom';
 
import * as ROUTES from '../../constants/routes';
import { isFlagEnabled } from '../../helpers';
import { useFirebase } from '../Firebase';
import SignOutButton from '../Tabs/Share/Account/SignOut';
 
const Navigation = () => {
  const {authUser} = useFirebase();

  const shareEnabled = isFlagEnabled("sharing");

  if (!shareEnabled) {
    return null;
  }

  const NavigationAuth = () => (
    <ul>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  );
   
  const NavigationNonAuth = () => (
    <ul>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
  )
  return (<div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>)
};
 
export default Navigation;
