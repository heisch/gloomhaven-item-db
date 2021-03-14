import React, { useState } from "react";
import { Button, ListItem, List, Modal, Input, InputProps } from "semantic-ui-react";
import { useSearchOptions } from "../../Providers/SearchOptionsProvider";
import { useFilterOptions } from "../../Providers/FilterOptionsProvider";

const ConfirmEnvelopeX = () => {
  const [solutionCorrect, setSolutionCorrect] = useState(false);
  const { searchOptions: { confirmEnvelopeX }, updateSearchOptions}  = useSearchOptions(); 
  const { updateFilterOptions} = useFilterOptions();

  const onClose = () => {
    updateSearchOptions({confirmEnvelopeX: false})
  };

  const checkSolution = (_e:any, data:InputProps) => {
    const solution = data.value || "";
    setSolutionCorrect(btoa(solution.toLowerCase()) === "YmxhZGVzd2FybQ==");
  }

  const onApply = () => {
    if (solutionCorrect) {
      updateFilterOptions({envelopeX: true});
    }
    onClose();
  };

  return (
    <Modal size="tiny" open={confirmEnvelopeX} onClose={onClose}>
        <Modal.Header>Remove Class</Modal.Header>
        <Modal.Content>
          <List>
            <ListItem>
              Have you solved Envelope X?
            </ListItem>
            <ListItem>
              Enter the solution here:
            </ListItem>
            <ListItem>
              <Input onChange={checkSolution}/>
            </ListItem>
          </List>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={onClose}>
            No
          </Button>
          <Button
            disabled={!solutionCorrect}
            positive
            icon="checkmark"
            labelPosition="right"
            content="Yes"
            onClick={onApply}
          />
        </Modal.Actions>
      </Modal>
    )
};

export default ConfirmEnvelopeX;
