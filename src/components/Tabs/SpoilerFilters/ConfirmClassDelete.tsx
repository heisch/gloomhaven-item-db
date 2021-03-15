import React from "react";
import { Button, Modal } from "semantic-ui-react";
import { useSearchOptions } from "../../Providers/SearchOptionsProvider";
import { useFilterOptions } from "../../Providers/FilterOptionsProvider";
import { ItemsOwnedBy } from "../../Providers/FilterOptions";

const ConfirmClassDelete = () => {
  const { searchOptions: { classToRemove }, updateSearchOptions}  = useSearchOptions();
  const { filterOptions: { classesInUse, itemsOwnedBy }, updateFilterOptions} = useFilterOptions();

  const onClose = () => {
    updateSearchOptions({removingClasses: undefined})
  };

  const onApply = () => {
      if (classToRemove) {
          Object.keys(itemsOwnedBy).forEach( key => {
              if (itemsOwnedBy[parseInt(key)] && itemsOwnedBy[parseInt(key)].includes(classToRemove)) {
                  const newItemsOwnedBy: ItemsOwnedBy = Object.assign([], itemsOwnedBy);
                  const index = newItemsOwnedBy[parseInt(key)].findIndex( c => c === classToRemove);
                  if (index != -1) {
                      newItemsOwnedBy[parseInt(key)].splice(index, 1);
                  }
                  updateFilterOptions({itemsOwnedBy: newItemsOwnedBy})
              }
          })

          const newClassesInUse = Object.assign([], classesInUse);
          const index = newClassesInUse.findIndex( c => c === classToRemove);
          if (index != -1) {
              newClassesInUse.splice(index, 1);
          }

          updateFilterOptions({classesInUse: newClassesInUse})
          updateSearchOptions({classToRemove: undefined});
    }          
    onClose();
  };

  return (
    <Modal size="tiny" open={classToRemove !== undefined} onClose={onClose}>
        <Modal.Header>Remove Class</Modal.Header>
        <Modal.Content>
          Remove this class from the party?
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
