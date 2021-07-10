import React, {useEffect, useState } from "react";
import { Button, List, Modal } from "semantic-ui-react";
import { ClassesInUse, PullDownOptions } from "../../../State/Types";
import { useSearchOptions } from "../../Providers/SearchOptionsProvider";
import { useFilterOptions } from "../../Providers/FilterOptionsProvider";
import { ItemsOwnedBy } from "../../Providers/FilterOptions";
import { ClassList } from '../SpoilerFilters/ClassList';

const PurchaseItem = () => {
  const { searchOptions: { selectedItem }, updateSearchOptions}  = useSearchOptions();
  const { filterOptions: { discount, classesInUse, itemsOwnedBy}, updateFilterOptions } = useFilterOptions();
  const [owners, setOwners] = useState<PullDownOptions[]>([]);

  useEffect(() => {
    if (!selectedItem || !itemsOwnedBy) {
      return;
    }
    setOwners(itemsOwnedBy[selectedItem.id] || []);
  }, [selectedItem,  itemsOwnedBy])

  const onClose = () => {
    updateSearchOptions({selectedItem: undefined})
  };

  const onApply = () => {
      if (selectedItem) {
        const newItemsOwnedBy: ItemsOwnedBy = Object.assign([], itemsOwnedBy);
        if (owners) {
          newItemsOwnedBy[selectedItem.id] = owners;
        }
        updateFilterOptions({itemsOwnedBy: newItemsOwnedBy})
      }
    onClose();
  };

  const toggleOwnership = (className: ClassesInUse) => {
    if (!owners || !selectedItem) {
      return;
    }
    const value = Object.assign([], owners);
    if (value.includes(className)) {
        value.splice(value.indexOf(className), 1);
    } else if (owners.length < selectedItem.count) {
       value.push(className)
    }
    setOwners(value);
  }

  const isItemEnabled = (key:PullDownOptions) => {
    if (!selectedItem || !owners) {
      return false;
    }
    if (owners.includes(key)) {
      return true;
    }
    return owners.length < selectedItem.count;
  }

  return (
    <Modal size="tiny" open={selectedItem !== undefined} onClose={onClose}>
        <Modal.Header>Buy Item</Modal.Header>
        <Modal.Content>
          <List>
            <List.Item>Name: {selectedItem && selectedItem.name}</List.Item>
            <List.Item>Cost: {selectedItem && selectedItem.cost + discount}</List.Item>
            <List.Item>
              <ClassList 
                classes={classesInUse} 
                label="Party Members" 
                onClick={toggleOwnership} 
                isEnabled={(className:ClassesInUse) => isItemEnabled(className)}
                isUsed={
                  (className:ClassesInUse) => owners ? owners.includes(className) : false
                }/>
            </List.Item>
          </List>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={onClose}>
            Close{" "}
          </Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Buy"
            onClick={onApply}
          />
        </Modal.Actions>
      </Modal>
    )
};

export default PurchaseItem;
