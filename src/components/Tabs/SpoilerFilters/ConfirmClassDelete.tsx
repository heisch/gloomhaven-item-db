import React from "react";
import { Button, List, Modal } from "semantic-ui-react";
import { useSearchOptions } from "../../Providers/SearchOptionsProvider";
import { useFilterOptions } from "../../Providers/FilterOptionsProvider";
import { ItemsOwnedBy } from "../../Providers/FilterOptions";

const ConfirmClassDelete = () => {
  const { searchOptions: { removingClass }, updateSearchOptions}  = useSearchOptions();
  const { filterOptions: { classesInUse, itemsOwnedBy }, updateFilterOptions} = useFilterOptions();

  const onClose = () => {
    updateSearchOptions({removingClass: undefined})
  };

  const onApply = () => {
      if (removingClass) {
        Object.keys(itemsOwnedBy).forEach( key => {
            if (itemsOwnedBy[parseInt(key)].includes(removingClass)) {
                const newItemsOwnedBy: ItemsOwnedBy = Object.assign([], itemsOwnedBy);
                const index = newItemsOwnedBy[parseInt(key)].findIndex( c => c === removingClass);
                if (index != -1) {
                    newItemsOwnedBy[parseInt(key)].splice(index, 1);
                }
                updateFilterOptions({itemsOwnedBy: newItemsOwnedBy})
            }
        })

        const newClassesInUse = Object.assign([], classesInUse);
        const index = newClassesInUse.findIndex( c => c === removingClass);
        if (index != -1) {
            newClassesInUse.splice(index, 1);
        }

        updateFilterOptions({classesInUse: newClassesInUse})
    }          
    onClose();
  };

  return (
    <Modal size="tiny" open={removingClass !== undefined} onClose={onClose}>
        <Modal.Header>Buy Item</Modal.Header>
        <Modal.Content>
          <List>
            <List.Item>{`Remove this class from party?`}</List.Item>
          </List>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={onClose}>
            No
          </Button>
          <Button
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

export default ConfirmClassDelete;
