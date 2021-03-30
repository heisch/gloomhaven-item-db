import React, { useState} from 'react'
import { Form } from 'semantic-ui-react';
import { useFirebase } from '../../Firebase';

type Props = {
    configHash: string;
}

const UploadForm = (props:Props) => {
    const { configHash } = props;
    const [error, setError] = useState<Error| null>(null);
    const { firebase, authUser} = useFirebase();

    if (!authUser || authUser.isAnonymous) {
        return null
    }

    const exportData = () => {
        if (!firebase || !authUser) {
            setError(new Error("No firebase or auth user"));
            return;
        }
        try {
            firebase
                .spoilerFilter(authUser.uid)
                .update({configHash});
        }
        catch (e) {
            setError(e);
        }
    }

    const authUserId = authUser && !authUser.isAnonymous && authUser.uid;

    const shareUrl = location.origin + location.pathname + '?importFrom=' + authUserId;

    return (
        <>
            <p>Here you can generate a link to your account that others can export the data at any time. All you need to do is export the data below.</p>
            <Form.Input id={'export-url-input'} width={14} value={shareUrl}/>
                <Form.Button width={2} onClick={() => {
                    (document.getElementById('export-url-input') as HTMLInputElement).select();
                    document.execCommand("copy");
                }}>Copy</Form.Button>
            <Form.Group>
            { authUser && !authUser.isAnonymous && <Form.Button onClick={() => exportData()}>Export</Form.Button> }
            </Form.Group>
            {error && <Form.Field>{error.message}</Form.Field>} 
        </>
    );
}

export default UploadForm;
