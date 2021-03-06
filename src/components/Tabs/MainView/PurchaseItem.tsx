import React, {useEffect, useState } from "react";
import { Button, List, Modal } from "semantic-ui-react";
import { ClassesInUse, PullDownOptions } from "../../../State/Types";
import ClassDropdown from "./ClassDropdown";
import { getSpoilerFilter, addItemOwner } from "../../../State/SpoilerFilter";
import { useGame } from "../../Game/GameProvider";
import { useDispatch } from "react-redux";
import { useSearchOptions } from "../../Providers/SearchOptionsProvider";

const PurchaseItem = () => {
  const {gameType} = useGame();
  const { searchOptions: { selectedItem }, setSearchOptions}  = useSearchOptions();
  const { itemsOwnedBy, classesInUse, discount } = getSpoilerFilter();
  const owners = itemsOwnedBy && selectedItem ? itemsOwnedBy[selectedItem.id] : undefined;
  const classesAvailable = owners && owners.length > 0 ? classesInUse.filter(c => !owners.includes(c)) : classesInUse;
  const [buyer, setBuyer] = useState<PullDownOptions>(classesAvailable[0] || classesInUse[0]);
  const dispatch = useDispatch();

  const onClose = () => {
    setSearchOptions({selectedItem: undefined})
  };

  useEffect(() => {
    setBuyer(classesAvailable[0]);
  }, [selectedItem])

  const onApply = () => {
      if (selectedItem) {
        dispatch(addItemOwner({value: { itemId: selectedItem.id, owner:buyer}, gameType}))
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
              <ClassDropdown className="classdropdown" optionsList={[undefined, ...classesAvailable]} onChange={onChange}/>
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
