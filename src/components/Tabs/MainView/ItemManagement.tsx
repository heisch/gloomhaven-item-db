import React from 'react';
import { GloomhavenItem, ItemManagementType } from "../../../State/Types";
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
    const { itemMangementType, lockSpoilerPanel, itemsInUse, itemsOwnedBy, classesInUse } = getSpoilerFilter();

    const dispatch = useDispatch();

    if (itemMangementType === ItemManagementType.None) {
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

    if (itemMangementType === ItemManagementType.Party) {
        const owners = itemsOwnedBy[item.id];
        const classesAvailable = owners && owners.length > 0 ? classesInUse.filter(c => !owners.includes(c)) : classesInUse;
    
        const ownersLength = (owners ? owners.length : 0);
        const showAddButton = (ownersLength !== item.count) && classesAvailable.length;
        return ( <>
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
                {showAddButton &&
                    <Button
                                className={`i${ownersLength} addClass`}
                                color={'black'}
                                onClick={() => dispatch(storeSelectedItem({value:item,gameType}))}
                                content={"+"}
                    />
                }
            </>);
    }

    if (itemMangementType === ItemManagementType.Simple) {
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

    return null;
}

export default ItemManagement;
