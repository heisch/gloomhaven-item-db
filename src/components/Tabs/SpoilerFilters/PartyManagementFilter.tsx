import React, { useEffect, useState } from "react";
import { Dropdown, DropdownProps, Form, Popup, Icon } from "semantic-ui-react";
import { isFlagEnabled } from "../../../helpers";
import { ItemManagementType } from "../../../State/Types";
import { useFilterOptions } from "../../Providers/FilterOptionsProvider";

const PartyManagementFilter = () => {
  const {
    filterOptions: { itemManagementType },
    updateFilterOptions,
  } = useFilterOptions();

  const [managementType, setManagmentType] = useState(itemManagementType);

  useEffect( () => {
    setManagmentType(itemManagementType);
  }, [itemManagementType])

  const options = Object.keys(ItemManagementType).map((key) => {
    return { value: key, text: key };
  });

  const onChangeItemManagement = (_d: any, data: DropdownProps) => {
    const { value } = data;
    if (value) {
      setManagmentType(value as ItemManagementType);
      updateFilterOptions({ itemManagementType: value });
    }
  };

  const partyModeEnabled = isFlagEnabled("partyMode");

  return (
    <Form.Group inline>
      {partyModeEnabled ? (
          <Form.Group inline>
            <label>Store Stock Management Type:</label>
            <Dropdown
            value={managementType}
            onChange={onChangeItemManagement}
            options={options}
            />
            <Popup closeOnDocumentClick hideOnScroll trigger={<Icon name={'question circle'} className={'blue'}/>} header={'Stock Management'} 
                    content={<Form.Group>
                              Choose From three types<br/>
                              <label>None:</label>No management<br/>
                              Simple - Indicate that an item has been purchased.<br/>
                              Party - Indicate which member of your party has the item
                            </Form.Group>}
                    />
        </Form.Group>
      ) : (
          <>
        <label>Enable Store Stock Management:</label>
        <Form.Checkbox
          toggle
          checked={managementType === ItemManagementType.Simple}
          onClick={() => {
            updateFilterOptions({
              itemManagementType:
              managementType === ItemManagementType.Simple
                  ? ItemManagementType.None
                  : ItemManagementType.Simple,
            });
          }}
        />
        </>
      )}
    </Form.Group>
  );
};

export default PartyManagementFilter;
