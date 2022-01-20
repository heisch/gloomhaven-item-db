import React from 'react'
import { GloomhavenItem, SortProperty, SortDirection, ItemManagementType, ItemViewDisplayType } from '../../../State/Types';
import SearchOptions from './SearchOptions';
import { Message, Icon } from 'semantic-ui-react';
import ItemTable from './ItemTable';
import ItemGrid from './ItemGrid';
import PurchaseItem from './PurchaseItem';
import { useSearchOptions } from '../../Providers/SearchOptionsProvider';
import { useFilterOptions } from '../../Providers/FilterOptionsProvider';
import useItems from '../../../hooks/useItems';
import { useFirebase } from '../../Firebase';

const ItemList = () => {
    const items = useItems();
    const { searchOptions: { property, direction}, updateSearchOptions} = useSearchOptions();
    const { filterOptions: { all, displayAs, itemManagementType }, dataChanged } = useFilterOptions();

        const setSorting = (newProperty: SortProperty) => {
            let newDirection:SortDirection;
            if (property === newProperty) {
                newDirection = direction === SortDirection.ascending ? SortDirection.descending : SortDirection.ascending;
            } else {
                newDirection = SortDirection.ascending;
            }

            updateSearchOptions({property: newProperty, direction: newDirection})
        }
        
    return (
        <>
            {dataChanged &&  (
                <Message negative>
                    <Message.Header><Icon name="exclamation triangle"/>Data out of sync</Message.Header>
                    Spoiler configuration differs from cloud storage. Remember to export your data.
                </Message>
            )}
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

            {displayAs === ItemViewDisplayType.List ? <ItemTable items={items} setSorting={setSorting}/> : <ItemGrid items={items}/>}
            
            { itemManagementType === ItemManagementType.Party && <PurchaseItem/>}

        </>
    );

}

export default ItemList;
