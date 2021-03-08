import React from 'react'
import { GloomhavenItem, SortProperty, SortDirection, ItemManagementType, ItemViewDisplayType } from '../../../State/Types';
import SearchOptions from './SearchOptions';
import { Message, Icon } from 'semantic-ui-react';
import ItemTable from './ItemTable';
import ItemGrid from './ItemGrid';
import PurchaseItem from './PurchaseItem';
import { useSearchOptions } from '../../Providers/SearchOptionsProvider';
import { useFilterOptions } from '../../Providers/FilterOptionsProvider';

type Props = {
    items : GloomhavenItem[];
}

const ItemList = (props:Props) => {
    const {items} = props;
    const { searchOptions: { property, direction}, updateSearchOptions} = useSearchOptions();
    const { filterOptions: { all, displayAs, itemManagementType } } = useFilterOptions();

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
