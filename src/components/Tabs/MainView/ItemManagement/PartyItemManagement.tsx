import React from "react"
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { storeSelectedItem } from "../../../../State/ItemViewState";
import { getSpoilerFilter, removeItemOwner } from "../../../../State/SpoilerFilter";
import { GloomhavenItem, ItemManagementType } from "../../../../State/Types";
import { useGame } from "../../../Game/GameProvider";
import { createClassImage } from "../ClassDropdown";

type Props = {
    item: GloomhavenItem;    
}

const PartyItemManagement = (props: Props) => {
    const { gameType } = useGame();
    const {item} = props;
    const { itemManagementType, itemsOwnedBy, classesInUse } = getSpoilerFilter();
    const dispatch = useDispatch();

    if (itemManagementType !== ItemManagementType.Party) { 
        return null;
    }
    const owners = (itemsOwnedBy && itemsOwnedBy[item.id]) || [];
    const ownersLength = (owners ? owners.length : 0);
    const classesAvailable = ownersLength ? classesInUse.filter(c => !owners.includes(c)) : classesInUse;

    const showAddButton = (ownersLength !== item.count) && classesAvailable.length;
    return ( <>
            {`${ownersLength} / ${item.count}`}
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

export default PartyItemManagement;