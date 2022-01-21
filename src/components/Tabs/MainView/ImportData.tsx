import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { useFilterOptions } from "../../Providers/FilterOptionsProvider";
import { useFirebase } from "../../Firebase";

const ImportData = () => {
    const { loadFromHash, getImportHash, getShareHash } = useFilterOptions();
    const { importData } = useFirebase();
    const qsImportHash = getImportHash();
    const [importHash, setImportHash] = useState(qsImportHash);
    const [isOpen, setIsOpen] = useState(importHash && importHash.length > 0 || false);
    const currentHash = getShareHash(localStorage.getItem("lockSpoilerPanel") === "true");

    useEffect( () => {
      if (qsImportHash || importData) {
        setImportHash(qsImportHash || importData);
      }
    }, [qsImportHash, importData])

    useEffect(() => {
      if (importHash && importHash !== currentHash) {
        setIsOpen(importHash && importHash.length > 0 || false);
      }
    }, [importHash])

  return (
    <Modal basic size="small" open={isOpen}>
      <Header icon="cloud download" content="Apply Configuration from Link" />
      <Modal.Content>
        <p>Do you want to load the configuration passed with this link?</p>
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
        <Button color="green" inverted onClick={() => {
            loadFromHash(importHash)
            setIsOpen(false);
        }}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ImportData;
