import React, { useState } from "react";
import { Form, Icon, Message } from "semantic-ui-react";

export const LockSpoilerToggle = () => {
    const [ lockSpoilerPanel, setLockSpoilerPanel] = useState(false);
    return ( <>
                <Form.Group inline>
                    <label htmlFor={'share-spoiler-toggle'}>Deactivate spoiler configuration panel for people
                        following your shared link.</label>
                    <Form.Checkbox id={'share-spoiler-toggle'} toggle className={'share-spoiler-toggle'}
                        checked={lockSpoilerPanel}
                        onChange={() => setLockSpoilerPanel(!lockSpoilerPanel)}/>
                </Form.Group>
                {lockSpoilerPanel && <Message negative>
                    <Icon name="exclamation triangle"/>Do not open the link yourself or you will not be able to
                        change any settings anymore
                    </Message>}
            </>)
}