import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { GameType } from "../../../games";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
	dataDirtyState,
	LOCAL_STORAGE_PREFIX,
} from "../../../State/CommonState";
import {
	dataMismatchState,
	importHashState,
	lockSpoilerPanelState,
	remoteDataState,
} from "../../../State";

const getImportHash = () => {
	const importHash = location.hash && location.hash.substr(1);
	location.hash = "";
	if (importHash.length > 0) {
		return importHash;
	}
	return undefined;
};

const parseHash = (importHash: string): any | undefined => {
	try {
		return JSON.parse(atob(importHash));
	} catch (e) {
		return undefined;
	}
};

export const getShareHash = (lockSpoilerPanel: boolean) => {
	// @ts-ignore
	const obj = {};
	Object.values(GameType).forEach((gt: GameType) => {
		const gameStorageString = localStorage.getItem(
			LOCAL_STORAGE_PREFIX + gt
		);
		if (gameStorageString) {
			//@ts-ignore
			obj[gt] = JSON.parse(gameStorageString);
		}
	});
	//@ts-ignore
	obj["lockSpoilerPanel"] = lockSpoilerPanel;
	return btoa(JSON.stringify(obj));
};

const ImportData = () => {
	const qsImportHash = getImportHash();
	const remoteImportHash = useRecoilValue(importHashState);
	const [importHash, setImportHash] = useState(qsImportHash);
	const [isOpen, setIsOpen] = useState(false);
	const currentHash = getShareHash(
		localStorage.getItem("lockSpoilerPanel") === "true"
	);
	const setLockSpoilerPanel = useSetRecoilState(lockSpoilerPanelState);
	const lockSpoilerPanel = useRecoilValue(lockSpoilerPanelState);
	const [dataDirty, setDataDirty] = useRecoilState(dataDirtyState);
	const setDataMismatch = useSetRecoilState(dataMismatchState);
	const remoteData = useRecoilValue(remoteDataState);

	useEffect(() => {
		if (qsImportHash || remoteImportHash) {
			setImportHash(qsImportHash || remoteImportHash);
		}
	}, [qsImportHash, remoteImportHash]);

	useEffect(() => {
		const configHash = getShareHash(lockSpoilerPanel);

		if (!configHash || !remoteData) {
			return;
		}
		setDataDirty(false);
		setDataMismatch(remoteData !== configHash);
	}, [dataDirty, remoteData]);

	useEffect(() => {
		if (importHash && importHash !== currentHash) {
			setIsOpen((importHash && importHash.length > 0) || false);
		}
	}, [importHash]);

	const loadFromHash = (importHash: string | undefined) => {
		if (importHash) {
			const hashConfig = parseHash(importHash);
			if (hashConfig !== undefined) {
				if (hashConfig.hasOwnProperty(GameType.Gloomhaven)) {
					Object.values(GameType).forEach((gt: GameType) => {
						const filterOptions = hashConfig[gt];
						if (filterOptions) {
							localStorage.setItem(
								LOCAL_STORAGE_PREFIX + gt,
								JSON.stringify(filterOptions)
							);
						} else {
							localStorage.removeItem(LOCAL_STORAGE_PREFIX + gt);
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

	return (
		<Modal basic size="small" open={isOpen}>
			<Header
				icon="cloud download"
				content="Apply Configuration from Link"
			/>
			<Modal.Content>
				<p>
					Do you want to load the configuration passed with this link?
				</p>
			</Modal.Content>
			<Modal.Actions>
				<Button
					basic
					color="red"
					inverted
					onClick={() => {
						location.hash = "";
						setIsOpen(false);
					}}
				>
					<Icon name="remove" /> No
				</Button>
				<Button
					color="green"
					inverted
					onClick={() => {
						loadFromHash(importHash);
						setIsOpen(false);
						window.location.reload();
					}}
				>
					<Icon name="checkmark" /> Yes
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default ImportData;
