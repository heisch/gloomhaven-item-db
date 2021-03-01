import React, {useState } from "react";
import { Button, List, Modal } from "semantic-ui-react";
import { ClassesInUse } from "../../../State/Types";
import ClassDropdown from "./ClassDropdown";
import { getSpoilerFilter, addItemOwner } from "../../../State/SpoilerFilter";
import { useGame } from "../../Game/GameProvider";
import { useDispatch } from "react-redux";
import { getItemViewState, storeSelectedItem } from "../../../State/ItemViewState";

const PurchaseItem = () => {
    const {gameType} = useGame();
  const { selectedItem } = getItemViewState();
  const { itemsOwnedBy, classesInUse, discount } = getSpoilerFilter();
  const owners = selectedItem ? itemsOwnedBy[selectedItem.id] : undefined;
  const classesAvailable = owners && owners.length > 0 ? classesInUse.filter(c => !owners.includes(c)) : classesInUse;
  const [buyer, setBuyer] = useState<ClassesInUse>(classesAvailable[0] || classesInUse[0]);
  const dispatch = useDispatch();

  const onClose = () => {
      dispatch(storeSelectedItem({value: undefined, gameType}));
  };

  const onApply = () => {
      if (selectedItem) {
        dispatch(addItemOwner({value: { itemId: selectedItem.id, owner:buyer}, gameType}))
      }
    onClose();
  };

  const onChange = (newClass: ClassesInUse) => {
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
              <ClassDropdown optionsList={classesAvailable} onChange={onChange}/>
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
