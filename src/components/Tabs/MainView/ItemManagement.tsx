import React from 'react';
import { GloomhavenItem } from "../../../State/Types";
import { Checkbox } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { storeItemsInUse, getSpoilerFilter } from "../../../State/SpoilerFilter";
import { useGame } from '../../Game/GameProvider';

type Props = {
    item : GloomhavenItem;
}

const ItemManagement = (props:Props) => {
    const { key:gameType } = useGame();
    const {item} = props;
    const { enableStoreStockManagement, lockSpoilerPanel, itemsInUse } = getSpoilerFilter();
    const dispatch = useDispatch();

    if (!enableStoreStockManagement) {
        return (<>
                {item.count}
                </>)
    }

    const toggleItemInUse = (id: number, bit: number) => {

        const value = Object.assign({}, itemsInUse);
        value[id] = value[id] & bit ? value[id] ^ bit : value[id] | bit;

        if (value[id] === 0) {
            delete (value[id]);
        }

        dispatch(storeItemsInUse({value, gameType}));
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
