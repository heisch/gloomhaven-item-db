import React from "react";
import { Button, List, Modal } from "semantic-ui-react";
import { getSpoilerFilter, removeItemOwner } from "../../../State/SpoilerFilter";
import { useGame } from "../../Game/GameProvider";
import { useDispatch } from "react-redux";
import { useSearchOptions } from "../../Providers/SearchOptionsProvider";
import { useFilterOptions } from "../../Providers/FilterOptionsProvider";

const ConfirmClassDelete = () => {
  const {gameType} = useGame();
  const { searchOptions: { removingClass }, setSearchOptions}  = useSearchOptions();
  const { filterOptions: { classesInUse }, updateFilterOptions} = useFilterOptions();
  const { itemsOwnedBy } = getSpoilerFilter();
  const dispatch = useDispatch();

  const onClose = () => {
    setSearchOptions({removingClass: undefined})
  };

  const onApply = () => {
      if (removingClass) {
        Object.keys(itemsOwnedBy).forEach( key => {
            if (itemsOwnedBy[parseInt(key)].includes(removingClass)) {
                dispatch(removeItemOwner({value:{itemId:parseInt(key), owner:removingClass}, gameType}));
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
