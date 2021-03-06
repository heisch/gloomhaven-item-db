import React from "react"
import { getSpoilerFilter } from "../../../../State/SpoilerFilter";
import { GloomhavenItem, ItemManagementType } from "../../../../State/Types";

type Props = {
    item: GloomhavenItem;
}

const NoItemManagement = (props: Props) => {
    const { itemManagementType }  = getSpoilerFilter();
    const { item } = props;
    if (itemManagementType !== ItemManagementType.None) {
        return null;
    }

    return <>{item.count}</>

}

export default NoItemManagement;