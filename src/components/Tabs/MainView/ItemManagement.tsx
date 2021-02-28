import React, { useState } from 'react';
import { ClassesInUse, GloomhavenItem } from "../../../State/Types";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { storeItemsInUse, getSpoilerFilter, addItemOwner, removeItemOwner } from "../../../State/SpoilerFilter";
import { useGame } from '../../Game/GameProvider';
import ClassDropdown, { createClassImage } from './ClassDropdown';

type Props = {
    item : GloomhavenItem;
}

const ItemManagement = (props:Props) => {
    const { gameType } = useGame();
    const {item} = props;
    const { enableStoreStockManagement, lockSpoilerPanel, itemsInUse, itemsOwnedBy, classesInUse } = getSpoilerFilter();
    const owners = itemsOwnedBy[item.id];
    const classesAvailable = owners && owners.length > 0 ? classesInUse.filter(c => !owners.includes(c)) : classesInUse;
    const [buyer, setBuyer] = useState<ClassesInUse>(classesAvailable[0] || classesInUse[0]);

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

    const onChange = (newClass: ClassesInUse) => {
        setBuyer(newClass);
    }

    return (
        <>
            {`${owners && owners.length || 0} / ${item.count}`}
            {owners&&owners.map(owner => {
                return <Button
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
            {(owners && owners.length) != item.count && classesAvailable.length &&
                <Form.Group inline>
                <Button
                              color={'green'}
                            onClick={() => dispatch(addItemOwner({value:{itemId:item.id, owner:buyer},gameType}))}
                            content={"+"}
                />
                <ClassDropdown optionsList={classesAvailable} onChange={onChange}/>
                </Form.Group>
            }
        </>
        );
}

export default ItemManagement;
