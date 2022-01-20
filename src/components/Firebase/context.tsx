import React, { useState, useContext, createContext, useEffect, FC, useMemo } from 'react';
import Firebase from './firebase';

type Data = {
    firebase: Firebase | null | undefined;
    authUser: firebase.default.User | null | undefined;
    remoteData: string | undefined;
}

const FirebaseContext = createContext<Data | undefined>(undefined);

export function useFirebase() {
    const result = useContext(FirebaseContext);
    if (!result) {
        throw Error("whoops");
    }
    return result;
}

const { Provider } = FirebaseContext;

const FirebaseProvider: FC = ({ children }) => {
    const [firebase, setFirebase] = useState<Firebase>();
    const [authUser, setAuthUser] = useState<firebase.default.User | null>();
    const [remoteData, setRemoteData] = useState<string|undefined>();
    useEffect( () => {
        setFirebase(new Firebase());
    }, [])

    const updateRemoteData = (snapshot: any) => {
        setRemoteData(snapshot.val()["configHash"]);
    }

    useEffect( () => {
        if (!firebase)
            return;
        firebase.auth.onAuthStateChanged(authUser => {
            setAuthUser( authUser )
            if (authUser) {
                firebase.spoilerFilter(authUser.uid).get().then(updateRemoteData);
            }
            else {
                setRemoteData(undefined);
            }
            });
    }, [firebase])

    useEffect(() => {
        if (!firebase || !authUser) {
            return;
        }
        firebase.spoilerFilter(authUser.uid).on("value", updateRemoteData);
    },[firebase, authUser]);

    const value = useMemo(() => (
        {firebase, authUser, remoteData}
    ), [firebase, authUser, remoteData]);

    return <Provider value={value}>{children}</Provider>
}
 
export default FirebaseProvider;
