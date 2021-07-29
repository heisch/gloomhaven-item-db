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


  return (
    <Form.Group inline>
          <Form.Group inline>
            <label>Store Stock Management Type:</label>
            <Dropdown
              value={managementType}
              onChange={onChangeItemManagement}
              options={options}
            />
            <Popup closeOnDocumentClick hideOnScroll trigger={<Icon name={'question circle'} className={'blue'}/>} header={'Stock Management'} 
                    content={<Form.Group>
                              <b>Choose From three types</b><br/>
                              <b>None:</b> No management<br/>
                              <b>Simple:</b> Indicate that an item has been purchased.<br/>
                              <b>Party:</b> Indicate which member of your party has the item
                            </Form.Group>}
                    />
        </Form.Group>
    </Form.Group>
  );
};

export default PartyManagementFilter;
