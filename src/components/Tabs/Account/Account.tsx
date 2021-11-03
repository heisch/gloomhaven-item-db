import React from "react"
import { Form } from "semantic-ui-react";
import { SignedInAccount } from "./SignedInAccount";
import { SignedOutAccount } from "./SignedOutAccount";

export const Account = () => {
    // Create a provider for all this and lock spoiler
    return (
    <>
        <Form.Group inline>
            <SignedInAccount/>
            <SignedOutAccount/>
        </Form.Group>
    </>)
}

