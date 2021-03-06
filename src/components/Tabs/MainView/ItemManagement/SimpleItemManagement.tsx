import React from "react"
import { useDispatch } from "react-redux";
import { Checkbox } from "semantic-ui-react";
import { getSpoilerFilter, storeItemsInUse } from "../../../../State/SpoilerFilter";
import { GloomhavenItem, ItemManagementType } from "../../../../State/Types";
import { useGame } from "../../../Game/GameProvider";

type Props = {
    item: GloomhavenItem;
}

const SimpleItemManagement = (props: Props) => {
    const {gameType} = useGame();
    const { itemManagementType, itemsInUse, lockSpoilerPanel }  = getSpoilerFilter();
    const { item } = props;
    const dispatch = useDispatch();

    if (itemManagementType !== ItemManagementType.Simple) {
        return null;
    }
    const toggleItemInUse = (id: number, bit: number) => {

        const value = Object.assign({}, itemsInUse);
        value[id] = value[id] & bit ? value[id] ^ bit : value[id] | bit;

        if (value[id] === 0) {
            delete (value[id]);
        }

        dispatch(storeItemsInUse({value, gameType}));
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