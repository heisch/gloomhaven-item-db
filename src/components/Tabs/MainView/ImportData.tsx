import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { useFilterOptions } from "../../Providers/FilterOptionsProvider";
import { useFirebase } from "../../Firebase";
import { getShareHash } from "../../Providers/FilterOptions";

const getImportHash = () => {
	const importHash = location.hash && location.hash.substr(1);
	if (importHash.length > 0) {
		return importHash;
	}
	location.hash = "";
	return undefined;
};

const ImportData = () => {
	const { loadFromHash } = useFilterOptions();
	const { importData } = useFirebase();
	const qsImportHash = getImportHash();
	const [importHash, setImportHash] = useState(qsImportHash);
	const [isOpen, setIsOpen] = useState(
		(importHash && importHash.length > 0) || false
	);
	const currentHash = getShareHash(
		localStorage.getItem("lockSpoilerPanel") === "true"
	);

	useEffect(() => {
		if (qsImportHash || importData) {
			setImportHash(qsImportHash || importData);
		}
	}, [qsImportHash, importData]);

	useEffect(() => {
		console.log({
			importHash,
			currentHash,
			equal: importHash === currentHash,
		});
		if (importHash && importHash !== currentHash) {
			setIsOpen((importHash && importHash.length > 0) || false);
		}
	}, [importHash]);

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
