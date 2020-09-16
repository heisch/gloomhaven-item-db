import React from 'react';
import { GloomhavenItem } from "../../../State/Types";
import { Checkbox } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { storeItemsInUse, getSpoilerFilter } from "../../../State/SpoilerFilter";

type Props = {
    item : GloomhavenItem;
}

const ItemManagement = (props:Props) => {
    const {item} = props;
    const { enableStoreStockManagement, lockSpoilerPanel, itemsInUse } = getSpoilerFilter();
    const dispatch = useDispatch();

    if (!enableStoreStockManagement) {
        return (<>
                {item.count}
                </>)
    }

    const toggleItemInUse = (id: number, bit: number) => {

        itemsInUse[id] = itemsInUse[id] & bit ? itemsInUse[id] ^ bit : itemsInUse[id] | bit;

        if (itemsInUse[id] === 0) {
            delete (itemsInUse[id]);
        }

        dispatch(storeItemsInUse(itemsInUse));
    }


    return (
        <>
            {[...Array(item.count).keys()].map(index =>
                <Checkbox key={index}
                        className={'i'+index}
                        toggle
                        disabled={lockSpoilerPanel}
                        checked={!!(itemsInUse[item.id] & Math.pow(2, index))}
                        onChange={() => toggleItemInUse(item.id, Math.pow(2, index))}/>
            )}
        </>
        );
}

export default ItemManagement;
