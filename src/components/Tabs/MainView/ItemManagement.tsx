import React from 'react';
import { GloomhavenItem } from "../../../State/Types";
import { Button, Checkbox } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { storeItemsInUse, getSpoilerFilter, removeItemOwner } from "../../../State/SpoilerFilter";
import { useGame } from '../../Game/GameProvider';
import { createClassImage } from './ClassDropdown';
import { storeSelectedItem } from '../../../State/ItemViewState';

type Props = {
    item : GloomhavenItem;
}

const ItemManagement = (props:Props) => {
    const { gameType } = useGame();
    const {item} = props;
    const { enableStoreStockManagement, lockSpoilerPanel, itemsInUse, itemsOwnedBy, classesInUse } = getSpoilerFilter();
    const owners = itemsOwnedBy[item.id];
    const classesAvailable = owners && owners.length > 0 ? classesInUse.filter(c => !owners.includes(c)) : classesInUse;

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

    const ownersLength = (owners ? owners.length : 0);
    const showAddButton = (ownersLength !== item.count) && classesAvailable.length;

    return (
        <>
            {`${(owners && owners.length) || 0} / ${item.count}`}
            {owners&&owners.map((owner, index) => {
                return <Button
                    className={'i'+index}
                    key={`${item.id}-${owner}`}
                    basic
                    color='black'
                    icon='delete' 
                  onClick={() => dispatch(removeItemOwner({value:{itemId:item.id, owner},gameType}))}
                  content={createClassImage(owner)}
              />
            })}
            {/* {[...Array(item.count).keys()].map(index =>
                <Checkbox key={index}
                        className={'i'+index}
                        toggle
                        disabled={lockSpoilerPanel}
                        checked={!!(itemsInUse[item.id] & Math.pow(2, index))}
                        onChange={() => toggleItemInUse(item.id, Math.pow(2, index))}/>
            )} */}
            {showAddButton &&
                <Button
                            className={`i${ownersLength} addClass`}
                            color={'black'}
                            onClick={() => dispatch(storeSelectedItem({value:item,gameType}))}
                            content={"+"}
                />
            }
        </>
        );
}

export default ItemManagement;
