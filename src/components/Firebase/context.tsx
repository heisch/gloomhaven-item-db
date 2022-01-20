import React, { useState, useContext, createContext, useEffect, FC, useMemo } from 'react';
import Firebase from './firebase';

type Data = {
    firebase: Firebase | null | undefined;
    authUser: firebase.default.User | null | undefined;
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
    useEffect( () => {
        setFirebase(new Firebase());
    }, [])
    useEffect( () => {
        if (!firebase)
            return;
        firebase.auth.onAuthStateChanged(authUser => {
            setAuthUser( authUser )
            });
    }, [firebase])

    const value = useMemo(() => (
        {firebase, authUser}
    ), [firebase, authUser]);

    return <Provider value={value}>{children}</Provider>
}
 
export default FirebaseProvider;
