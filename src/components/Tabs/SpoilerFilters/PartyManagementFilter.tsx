import React from "react";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { isFlagEnabled } from "../../../helpers";
import { ItemManagementType } from "../../../State/Types";
import { useFilterOptions } from "../../Providers/FilterOptionsProvider";

const PartyManagementFilter = () => {
  const {
    filterOptions: { itemManagementType },
    updateFilterOptions,
  } = useFilterOptions();
  const options = Object.keys(ItemManagementType).map((key) => {
    return { value: key, text: key };
  });

  const onChangeItemManagement = (_d: any, data: DropdownProps) => {
    const { value } = data;
    if (value) {
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
            defaultValue={itemManagementType}
            onChange={onChangeItemManagement}
            options={options}
            />
        </>
      ) : (
          <>
        <label>Enable Store Stock Management:</label>
        <Form.Checkbox
          toggle
          checked={itemManagementType === ItemManagementType.Simple}
          onClick={() => {
            updateFilterOptions({
              itemManagementType:
                itemManagementType === ItemManagementType.Simple
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
