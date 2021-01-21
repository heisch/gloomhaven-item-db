import React from "react"
import PasswordChangeForm from "../PasswordChange";
import { useFirebase } from "../../../../Firebase";

const AccountPage = () => {
    const { authUser} = useFirebase();
    return (
    <>
      <h1>Logged in as</h1>
      {authUser && authUser.email}
      <h1>Change Password</h1>

        <PasswordChangeForm/>
    </>)
}
export default AccountPage;
