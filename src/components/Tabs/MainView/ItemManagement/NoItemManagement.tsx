import React from "react"
import { GloomhavenItem, ItemManagementType } from "../../../../State/Types";
import { useFilterOptions } from "../../../Providers/FilterOptionsProvider";

type Props = {
    item: GloomhavenItem;
}

const NoItemManagement = (props: Props) => {
    const { filterOptions: {itemManagementType} }  = useFilterOptions();
    const { item } = props;
    if (itemManagementType !== ItemManagementType.None) {
        return null;
    }

    return <>{item.count}</>

}

export default NoItemManagement;