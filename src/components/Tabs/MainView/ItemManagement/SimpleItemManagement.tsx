import React from "react"
import { Checkbox } from "semantic-ui-react";
import { GloomhavenItem, ItemManagementType } from "../../../../State/Types";
import { useFilterOptions } from "../../../Providers/FilterOptionsProvider";

type Props = {
    item: GloomhavenItem;
}

const SimpleItemManagement = (props: Props) => {
    const { filterOptions: { itemsInUse, itemManagementType, lockSpoilerPanel}, updateFilterOptions} = useFilterOptions();
    const { item } = props;

    if (itemManagementType !== ItemManagementType.Simple) {
        return null;
    }
    const toggleItemInUse = (id: number, bit: number) => {

        const value = Object.assign({}, itemsInUse);
        value[id] = value[id] & bit ? value[id] ^ bit : value[id] | bit;

        if (value[id] === 0) {
            delete (value[id]);
        }

        updateFilterOptions({itemsInUse: value})
    }


    return <>{[...Array(item.count).keys()].map(index =>
        <Checkbox key={index}
                className={'i'+index}
                toggle
                disabled={lockSpoilerPanel}
                checked={!!(itemsInUse[item.id] & Math.pow(2, index))}
                onChange={() => toggleItemInUse(item.id, Math.pow(2, index))}/>)
    }
    </>
}

export default SimpleItemManagement;