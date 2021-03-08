import React, {useEffect, useState } from "react";
import { Button, List, Modal } from "semantic-ui-react";
import { PullDownOptions } from "../../../State/Types";
import ClassDropdown from "./ClassDropdown";
import { useSearchOptions } from "../../Providers/SearchOptionsProvider";
import { useFilterOptions } from "../../Providers/FilterOptionsProvider";
import { ItemsOwnedBy } from "../../Providers/FilterOptions";

const PurchaseItem = () => {
  const { searchOptions: { selectedItem }, updateSearchOptions}  = useSearchOptions();
  const { filterOptions: { discount, classesInUse, itemsOwnedBy}, updateFilterOptions } = useFilterOptions();
  const owners = itemsOwnedBy && selectedItem ? itemsOwnedBy[selectedItem.id] : undefined;
  const classesAvailable = owners && owners.length > 0 ? classesInUse.filter(c => !owners.includes(c)) : classesInUse;
  const [buyer, setBuyer] = useState<PullDownOptions>(classesAvailable[0] || classesInUse[0]);

  const onClose = () => {
    updateSearchOptions({selectedItem: undefined})
  };

  useEffect(() => {
    setBuyer(classesAvailable[0]);
  }, [selectedItem])

  const onApply = () => {
      if (selectedItem) {
        const newItemsOwnedBy: ItemsOwnedBy = Object.assign([], itemsOwnedBy);
        if (!newItemsOwnedBy[selectedItem.id]) {
          newItemsOwnedBy[selectedItem.id] = [];
        }
        newItemsOwnedBy[selectedItem.id].push(buyer);
        updateFilterOptions({itemsOwnedBy: newItemsOwnedBy})
      }
    onClose();
  };

  const onChange = (newClass: PullDownOptions) => {
    setBuyer(newClass);
  }

  return (
    <Modal size="tiny" open={selectedItem !== undefined} onClose={onClose}>
        <Modal.Header>Buy Item</Modal.Header>
        <Modal.Content>
          <List>
            <List.Item>Name: {selectedItem && selectedItem.name}</List.Item>
            <List.Item>Cost: {selectedItem && selectedItem.cost + discount}</List.Item>
            <List.Item>
              <ClassDropdown className="classdropdown" optionsList={classesAvailable} onChange={onChange}/>
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
