import React, {useEffect, useState } from "react";
import { Button, Form, List, Modal } from "semantic-ui-react";
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

  if (!selectedItem) {
    return null;
  }

  const {name, cost, count} = selectedItem;

  return (
    <Modal size="tiny" open={true} onClose={onClose}>
        <Modal.Header>Buy Item</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group inline>
              <label>Name:</label> {name}
            </Form.Group>
            <Form.Group inline>
              <label>Cost:</label> {cost + discount}
            </Form.Group>
            <Form.Group inline>
              <label>Items Available:</label> {`${count - owners.length} of ${count}`}
            </Form.Group>
            <ClassList 
              classes={classesInUse} 
              label="Party Members:" 
              onClick={toggleOwnership} 
              isEnabled={(className:ClassesInUse) => isItemEnabled(className)}
              isUsed={
                (className:ClassesInUse) => owners ? owners.includes(className) : false
              }/>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={onClose}>
            Close
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
