import React, { useState, ChangeEvent } from 'react'
import { Form } from 'semantic-ui-react';
import { useFirebase } from '../../Firebase';
import { useHistory } from 'react-router';
import * as ROUTES from '../../../constants/routes';

type Props = {
    configHash: string;
}

const UploadForm = (props:Props) => {
    const { configHash } = props;
    const [error, setError] = useState<Error| null>(null);
    const [ importUserId, setImportUserId] = useState<string|undefined>();
    const { firebase, authUser} = useFirebase();
    const history = useHistory();

    const importData = () => {
        if (!firebase) {
            setError(new Error("No firebase"));
            return;
        }

        const userId = importUserId || authUser && authUser.uid;
        if (!userId){
            setError(new Error("No user id to fetch"));
            return;
        }

        firebase
            .spoilerFilter(userId).on("value", (snapshot) => {
                if (snapshot.val())
                {
                    console.log(snapshot);
                    history.push(ROUTES.HOME + "#" + snapshot.val()["configHash"]);
                    history.go(0);
                    setError(null);
                }
                else {
                    setError(new Error(`Cannot find data for user ${userId}`))
                }
            },
            (error: any)=> setError(error))
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
    
    return (
        <>
            <Form.Group>
                <Form.Button onClick={() => importData()}>Import</Form.Button>
                <Form.Input value={importUserId} onChange={(e:ChangeEvent<HTMLInputElement>) => setImportUserId(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                { authUser && !authUser.isAnonymous && <Form.Button onClick={() => exportData()}>Export</Form.Button> }
                { authUser && !authUser.isAnonymous && authUser.uid }
            </Form.Group>
            {error && <Form.Field>{error.message}</Form.Field>} 
        </>
    );
}

export default UploadForm;
