import React, { useEffect, useState } from "react";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
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
          <>
            <label>Store Stock Management Type:</label>
            <Dropdown
            value={managementType}
            onChange={onChangeItemManagement}
            options={options}
            />
        </>
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
