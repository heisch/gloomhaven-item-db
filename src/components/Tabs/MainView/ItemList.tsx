import React from 'react'
import { GloomhavenItem, SortProperty, SortDirection } from '../../../State/Types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../State/Reducer';
import SearchOptions from './SearchOptions';
import { Message, Icon } from 'semantic-ui-react';
import ItemTable from './ItemTable';
import ItemGrid from './ItemGrid';
import { storeSortingProperty, storeSortingDirection } from '../../../State/ItemViewState';

type Props = {
    items : GloomhavenItem[];
}

const ItemList = (props:Props) => {
    const {items} = props;
    const { displayAs, all } = useSelector<RootState>( state => state.spoilerFilter) as RootState['spoilerFilter'];
    const { property, direction } = useSelector<RootState>( state => state.itemViewState) as RootState['itemViewState'];
    const dispatch = useDispatch();

        const setSorting = (newProperty: SortProperty) => {
            let newDirection:SortDirection;
            if (property === newProperty) {
                newDirection = direction === SortDirection.ascending ? SortDirection.descending : SortDirection.ascending;
            } else {
                newDirection = SortDirection.ascending;
            }

            console.log(newProperty, newDirection);
    
            dispatch(storeSortingProperty(newProperty));
            dispatch(storeSortingDirection(newDirection));
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

            {displayAs === 'list' ? <ItemTable items={items} setSorting={setSorting}/> : <ItemGrid items={items}/>}

        </>
    );

}

export default ItemList;