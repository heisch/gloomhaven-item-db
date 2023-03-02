import React, {
	useState,
	useContext,
	createContext,
	FC,
	useMemo,
	useCallback,
	useEffect,
} from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config";
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	User,
	signOut as firebaseSignOut,
	sendPasswordResetEmail,
	updatePassword,
	onAuthStateChanged,
	signInAnonymously,
} from "firebase/auth";
import {
	getDatabase,
	ref,
	update,
	get,
	child,
	onValue,
} from "firebase/database";
import { useSetRecoilState } from "recoil";
import { importHashState, remoteDataState } from "../../State";
import QueryString from "qs";

type Data = {
	createUser: (email: string, password: string) => void;
	signIn: (email: string, password: string) => void;
	signOut: () => void;
	passwordReset: (email: string) => void;
	passwordUpdate: (newPassword: string) => void;
	exportData: (configHash: string) => void;
	user: User | undefined;
	error: any;
};

const FirebaseContext = createContext<Data | undefined>(undefined);

export function useFirebase() {
	const result = useContext(FirebaseContext);
	if (!result) {
		throw Error("whoops");
	}
	return result;
}

const { Provider } = FirebaseContext;
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export const FirebaseProvider: FC = ({ children }) => {
	const [user, setUser] = useState<User | undefined>();
	const [error, setError] = useState<Error>();

	const createUser = useCallback((email: string, password: string) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				setUser(user);
			})
			.catch(setError);
	}, []);

	const signIn = useCallback((email: string, password: string) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				setUser(user);
				// ...
			})
			.catch(setError);
	}, []);

	const signOut = useCallback(() => {
		firebaseSignOut(auth);
	}, []);

	const passwordReset = useCallback((email: string) => {
		sendPasswordResetEmail(auth, email).catch(setError);
	}, []);

	const passwordUpdate = useCallback(
		(newPassword: string) => {
			if (!user) {
				return;
			}
			updatePassword(user, newPassword).catch(setError);
		},
		[user]
	);

	const exportData = useCallback(
		(configHash: string) => {
			if (!user) {
				setError(new Error("No firebase or auth user"));
				return;
			}
			try {
				const updates = {
					[`spoilerFilter/${user.uid}`]: { configHash },
				};
				update(ref(db), updates);
			} catch (e) {
				//@ts-ignore
				setError(e);
			}
		},
		[user]
	);

	const setRemoteData = useSetRecoilState(remoteDataState);
	const setImportHash = useSetRecoilState(importHashState);

	const updateRemoteData = useCallback(
		(snapshot: any) => {
			if (snapshot.val()) {
				setRemoteData(snapshot.val()["configHash"]);
			}
		},
		[setRemoteData]
	);

	useEffect(() => {
		if (!auth) return;
		onAuthStateChanged(auth, (authUser) => {
			setUser(authUser || undefined);
			if (authUser) {
				console.log("In here 2");
				get(child(ref(db), `spoilerFilter/${authUser.uid}`)).then(
					updateRemoteData
				);
			} else {
				console.log("In here");
				signInAnonymously(auth)
					.then((userCredential) => {
						// Signed in
						const user = userCredential.user;
						setUser(user);
						// ...
					})
					.catch(setError);
			}
		});
	}, [setRemoteData, updateRemoteData]);

	useEffect(() => {
		if (!user) {
			return;
		}

		const urlParams = QueryString.parse(window.location.search.substr(1));
		const importUserId = urlParams["importFrom"] as string;
		if (!importUserId) {
			return;
		}

		onValue(ref(db, `spoilerFilter/${importUserId}`), (snapshot) => {
			if (snapshot.val()) {
				setImportHash(snapshot.val()["configHash"]);
			}
			return;
		});
	}, [setImportHash, user]);

	useEffect(() => {
		if (!user) {
			return;
		}
		onValue(ref(db, `spoilerFilter/${user.uid}`), updateRemoteData);
	}, [user, updateRemoteData]);

	const value = useMemo(
		() => ({
			createUser,
			signIn,
			signOut,
			passwordReset,
			passwordUpdate,
			exportData,
			error,
			user,
		}),
		[
			createUser,
			signIn,
			signOut,
			passwordReset,
			passwordUpdate,
			exportData,
			error,
			user,
		]
	);

	return <Provider value={value}>{children}</Provider>;
};
