import React, { useState, ChangeEvent } from 'react'
import { Form } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { useFirebase } from '../../Firebase';
import { GameType } from '../../../games';

const UploadForm = () => {
    const allSpoilerFilters = getAllSpoilerFilters();
    const [error, setError] = useState<Error| null>(null);
    const [ importUserId, setImportUserId] = useState<string|undefined>();
    const { firebase, authUser} = useFirebase();
    const dispatch = useDispatch();

    const importData = () => {
        if (!firebase || !authUser) {
            throw Error("No firebase or auth user")
            return;
        }
        firebase
            .spoilerFilter(importUserId || authUser.uid).on("value", (snapshot) => {
                if (snapshot.val())
                {
                    const spoilerFilters = JSON.parse(snapshot.val());
                    Object.values(GameType).forEach( (gt:GameType) => {
                        const spoilerFilter = spoilerFilters[gt];
                        if (spoilerFilter !== undefined) {
                            localStorage.setItem(LOCAL_STORAGE_PREFIX + gt, JSON.stringify(spoilerFilter));
                            dispatch(storeSpoilerFilter({value:spoilerFilter, gameType:gt}));
                        }
                    })
                    setError(null);
                }
                else {
                    setError(new Error(`Cannot find data for user ${importUserId || authUser.uid}`))
                }
            },
            (error: any)=> setError(error))
    }

    const exportData = () => {
        if (!firebase || !authUser) {
            throw Error("No firebase or auth user")
            return;
        }
        firebase
            .spoilerFilter(authUser.uid)
            .update(allSpoilerFilters);
    }
    
    return (
        <>
            <Form.Group>
                <Form.Button onClick={() => importData()}>Import</Form.Button>
                <Form.Input value={importUserId} onChange={(e:ChangeEvent<HTMLInputElement>) => setImportUserId(e.target.value)}/>
                {error && <Form.Field>{error.message}</Form.Field>} 
            </Form.Group>
            <Form.Group>
                { authUser && !authUser.isAnonymous && <Form.Button onClick={() => exportData()}>Export</Form.Button> }
                { authUser && !authUser.isAnonymous && authUser.uid }
            </Form.Group>
        </>
    );
}

export default UploadForm;
