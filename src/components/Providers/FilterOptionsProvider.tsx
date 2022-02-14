import React, {
	useContext,
	createContext,
	useState,
	useEffect,
	FC,
} from "react";
import { GameType } from "../../games";
import { useFirebase } from "../Firebase";
import { getShareHash } from "./FilterOptions";

export const LOCAL_STORAGE_PREFIX: string = "ItemView:spoilerFilter_";

type ContextData = {
	loadFromHash: (importHash: string | undefined) => void;
	lockSpoilerPanel: boolean;
	dataChanged: boolean;
};

export const Context = createContext<ContextData | undefined>(undefined);

export function useFilterOptions() {
	const result = useContext(Context);
	if (!result) {
		throw Error("No Context Found");
	}
	return result;
}

const parseHash = (importHash: string): any | undefined => {
	try {
		return JSON.parse(atob(importHash));
	} catch (e) {
		return undefined;
	}
};

const FilterProvider: FC = (props) => {
	const { children } = props;
	const [lockSpoilerPanel, setLockSpoilerPanel] = useState(
		localStorage.getItem("lockSpoilerPanel") === "true" || false
	);
	const [dataChanged, setDataChanged] = useState(false);
	const [dataDirty, setDataDirty] = useState(false);
	const { Provider } = Context;
	const { remoteData } = useFirebase();

	const loadFromHash = (importHash: string | undefined) => {
		if (importHash) {
			const hashConfig = parseHash(importHash);
			if (hashConfig !== undefined) {
				if (hashConfig.hasOwnProperty(GameType.Gloomhaven)) {
					Object.values(GameType).forEach((gt: GameType) => {
						const filterOptions = hashConfig[gt] || {};
						if (filterOptions) {
							localStorage.setItem(
								LOCAL_STORAGE_PREFIX + gt,
								JSON.stringify(filterOptions)
							);
						}
					});
				}
				setDataDirty(true);
				if (hashConfig.hasOwnProperty("lockSpoilerPanel")) {
					setLockSpoilerPanel(hashConfig.lockSpoilerPanel);
					localStorage.setItem(
						"lockSpoilerPanel",
						hashConfig.lockSpoilerPanel.toString()
					);
				}
			}
		}
		location.hash = "";
	};

	useEffect(() => {
		const configHash = getShareHash(lockSpoilerPanel);

		if (!configHash || !remoteData) {
			return;
		}
		setDataDirty(false);
		setDataChanged(remoteData !== configHash);
	}, [dataDirty, remoteData]);

	return (
		<Provider
			value={{
				loadFromHash,
				lockSpoilerPanel,
				dataChanged,
			}}
		>
			{children}
		</Provider>
	);
};

export default FilterProvider;

/*
http://localhost:3000/studio/five/en-ca/#eyJnaCI6eyJhbGwiOmZhbHNlLCJwcm9zcGVyaXR5Ijo5LCJpdGVtIjpbNzEsNzgsODYsOTAsOTIsOTgsMTAxLDEwNSwxMDcsMTA4LDExMSwxMTYsMTI1LDEyNiwxMzIsMTE1LDExMCwxMjMsNzYsODEsODcsMTAyLDEzMyw1Myw4NCwxMDAsNzQsODIsOTEsOTMsOTQsOTUsOTcsMTEyLDc3LDgwLDg4LDEwNCwxMDksMTE0LDgzLDc5LDExMywxMzEsMTE4LDEzMCw4NSw3NSw3MiwxMjgsMTI0LDk2LDk5LDczLDg5LDE1MiwxMTcsMTU2LDE1MywxNTQsMTYwLDE1OSwxNTgsMTYzLDE1NSwxNjFdLCJpdGVtc0luVXNlIjp7IjEiOjEsIjYiOjEsIjkiOjEsIjEyIjoxLCIxMyI6MTUsIjIwIjoxLCIyNyI6MywiMzEiOjEsIjMzIjoxLCIzNCI6MywiMzciOjEsIjQxIjozLCI0MiI6MSwiNDQiOjEsIjQ4IjoxLCI0OSI6MSwiNzEiOjEsIjgxIjoxLCI4NiI6MSwiOTgiOjEsIjEwNyI6MSwiMTM4IjoxLCIxNDAiOjEsIjE1MCI6MX0sInNvbG9DbGFzcyI6WyJCUiIsIlNDIiwiUU0iLCJTUyIsIkVMIiwiQ0giLCJTSyIsIkJUIiwiUEgiLCJEUyIsIlNCIiwiU1UiLCJNVCIsIk5TIiwiQkUiLCJYWCIsIlNXIl0sImRpc2NvdW50IjotNSwiZGlzcGxheUFzIjoiaW1hZ2VzIiwiaXRlbU1hbmFnZW1lbnRUeXBlIjoiUGFydHkiLCJzY2VuYXJpb0NvbXBsZXRlZCI6W10sImNsYXNzZXNJblVzZSI6WyJQSCIsIkJUIiwiRFIiLCJDSCIsIlRJIl0sIml0ZW1zT3duZWRCeSI6W251bGwsW10sbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxbIkRSIl0sWyJDSCIsIkRSIiwiVEkiXSxudWxsLG51bGwsWyJEUiJdLG51bGwsbnVsbCxudWxsLFsiRFIiLCJQSCJdLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLFsiVEkiXSxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsWyJQSCJdLFsiUEgiLCJUSSJdLFsiQlQiXSxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsWyJQSCJdLG51bGwsWyJUSSJdLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxbIlRJIl0sbnVsbCxudWxsLG51bGwsWyJDSCJdLG51bGwsbnVsbCxbIlBIIl0sWyJQSCIsIkNIIl0sbnVsbCxudWxsLG51bGwsbnVsbCxbXSxudWxsLG51bGwsbnVsbCxudWxsLFsiQlQiXSxbIkJUIl0sbnVsbCxbIlRJIl0sbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsWyJDSCJdLFsiRFIiXSxbIkRSIl0sbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxbIkNIIl0sbnVsbCxudWxsLFtdLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxbIlBIIl0sbnVsbCxbXSxudWxsLG51bGwsbnVsbCxudWxsLFtdLFtdLG51bGwsbnVsbCxudWxsLFtdLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxbXSxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsW10sbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLFsiQlQiXSxudWxsLFsiRFIiXSxudWxsLG51bGwsWyJDSCJdLFtdLG51bGwsbnVsbCxbIkRSIiwiUEgiXSxudWxsLFtdLG51bGwsWyJDSCJdXSwiZW52ZWxvcGVYIjp0cnVlfSwiam90bCI6eyJhbGwiOnRydWUsInByb3NwZXJpdHkiOjgsIml0ZW0iOls3MSw3OCw4Niw5MCw5Miw5OCwxMDEsMTA1LDEwNywxMDgsMTExLDExNiwxMjUsMTI2LDEzMiwxMTUsMTEwLDEyMyw3Niw4MSw4NywxMDIsMTMzLDUzLDg0LDEwMCw3NCw4Miw5MSw5Myw5NCw5NSw5NywxMTIsNzcsODAsODgsMTA0LDEwOSwxMTQsODMsNzksMTEzXSwiaXRlbXNJblVzZSI6eyIxIjoxLCI2IjoxLCI5IjoxLCIxMiI6MSwiMjAiOjEsIjI3IjozLCIzMSI6MSwiMzMiOjEsIjM0IjozLCIzNyI6MSwiNDEiOjMsIjQyIjoxLCI0NCI6MSwiNDgiOjEsIjQ5IjoxLCI3MSI6MSwiODEiOjEsIjg2IjoxLCI5OCI6MSwiMTA3IjoxLCIxMzgiOjEsIjE0MCI6MSwiMTUwIjoxfSwic29sb0NsYXNzIjpbIkJSIiwiU0MiLCJRTSIsIlNTIiwiRUwiLCJDSCIsIlNLIiwiQlQiLCJQSCIsIkRTIiwiU0IiLCJTVSJdLCJkaXNjb3VudCI6LTUsImRpc3BsYXlBcyI6ImltYWdlcyIsIml0ZW1NYW5hZ2VtZW50VHlwZSI6IlNpbXBsZSIsInNjZW5hcmlvQ29tcGxldGVkIjpbXSwiY2xhc3Nlc0luVXNlIjpbXSwiaXRlbXNPd25lZEJ5Ijp7fSwiZW52ZWxvcGVYIjpmYWxzZX0sImxvY2tTcG9pbGVyUGFuZWwiOmZhbHNlfQ==
*/
