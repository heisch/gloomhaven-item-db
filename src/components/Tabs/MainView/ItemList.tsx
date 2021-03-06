import React from 'react'
import { GloomhavenItem, SortProperty, SortDirection, ItemManagementType } from '../../../State/Types';
import SearchOptions from './SearchOptions';
import { Message, Icon } from 'semantic-ui-react';
import ItemTable from './ItemTable';
import ItemGrid from './ItemGrid';
import { getSpoilerFilter } from '../../../State/SpoilerFilter';
import PurchaseItem from './PurchaseItem';
import { useSearchOptions } from '../../Providers/SearchOptionsProvider';

type Props = {
    items : GloomhavenItem[];
}

const ItemList = (props:Props) => {
    const {items} = props;
    const { displayAs, all, itemManagementType } = getSpoilerFilter();
    const { searchOptions: { property, direction}, setSearchOptions} = useSearchOptions();

        const setSorting = (newProperty: SortProperty) => {
            let newDirection:SortDirection;
            if (property === newProperty) {
                newDirection = direction === SortDirection.ascending ? SortDirection.descending : SortDirection.ascending;
            } else {
                newDirection = SortDirection.ascending;
            }

            setSearchOptions({property: newProperty, direction: newDirection})
        }
        
    return (
        <>
            <SearchOptions setSorting={setSorting}/>
            {all &&  (
                <Message negative>
                    <Message.Header><Icon name="exclamation triangle"/>Spoiler alert</Message.Header>
                    You are currently viewing all possible items.
                </Message>
            )}
            {items.length === 0 && 
                <Message negative>
                    No items found matching your filters and/or search criteria
                </Message>
            }

            {displayAs === 'list' ? <ItemTable items={items} setSorting={setSorting}/> : <ItemGrid items={items}/>}
            
            { itemManagementType === ItemManagementType.Party && <PurchaseItem/>}

        </>
    );

}

export default ItemList;
