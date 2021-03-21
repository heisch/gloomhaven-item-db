import React from "react"
import { Form } from "semantic-ui-react";
import { useFirebase } from "../../Firebase";
import { useFilterOptions } from '../../Providers/FilterOptionsProvider';
import { SignedInAccount } from "./SignedInAccount";
import { SignedOutAccount } from "./SignedOutAccount";

export const Account = () => {
    // Create a provider for all this and lock spoiler
    const { authUser} = useFirebase();
    const { getShareHash } = useFilterOptions();
    const configHash = getShareHash(false);
    return (
    <>
        <Form.Group inline>
            <SignedInAccount/>
            <SignedOutAccount/>
        </Form.Group>
    </>)
}

