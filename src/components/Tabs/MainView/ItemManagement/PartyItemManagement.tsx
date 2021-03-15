import React from "react"
import { Button } from "semantic-ui-react";
import { GloomhavenItem, ItemManagementType } from "../../../../State/Types";
import { ItemsOwnedBy } from "../../../Providers/FilterOptions";
import { useFilterOptions } from "../../../Providers/FilterOptionsProvider";
import { useSearchOptions } from "../../../Providers/SearchOptionsProvider";
import { createClassImage } from "../ClassDropdown";

type Props = {
    item: GloomhavenItem;    
}

const PartyItemManagement = (props: Props) => {
    const {item} = props;
    const { updateSearchOptions } = useSearchOptions();
    const { filterOptions: {itemManagementType, classesInUse, itemsOwnedBy}, updateFilterOptions, lockSpoilerPanel }  = useFilterOptions();

    if (itemManagementType !== ItemManagementType.Party) { 
        return null;
    }
    const owners = (itemsOwnedBy && itemsOwnedBy[item.id]) || [];
    const ownersLength = (owners ? owners.length : 0);
    const classesAvailable = ownersLength ? classesInUse.filter(c => !owners.includes(c)) : classesInUse;

    const showAddButton = (ownersLength !== item.count) && classesAvailable.length > 0;
    return ( <>
            {`${ownersLength} / ${item.count}`}
            {owners&&owners.map((owner, index) => {
                return <Button
                    disabled={lockSpoilerPanel}
                    className={'i'+index}
                    key={`${item.id}-${owner}`}
                    basic
                    color='black'
                    icon='delete' 
                    onClick={() => { 
                        const newItemsOwnedBy: ItemsOwnedBy = Object.assign([], itemsOwnedBy);
                        const index = newItemsOwnedBy[item.id].findIndex( c => c === owner);
                        if (index != -1) {
                            newItemsOwnedBy[item.id].splice(index, 1);
                        }
                        updateFilterOptions({itemsOwnedBy: newItemsOwnedBy})
                    }}
            
                content={createClassImage(owner)}
            />
            })}
            {showAddButton &&
                <Button
                        disabled={lockSpoilerPanel}
                        className={`i${ownersLength} addClass`}
                        color={'black'}
                        onClick={() => { updateSearchOptions({selectedItem:item})}}
                        content={"+"}
            />
            }
        </>);
}

export default PartyItemManagement;