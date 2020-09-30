import React from 'react'
import { GloomhavenItem, SortProperty, SortDirection } from '../../../State/Types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../State/Reducer';
import SearchOptions from './SearchOptions';
import { Message, Icon } from 'semantic-ui-react';
import ItemTable from './ItemTable';
import ItemGrid from './ItemGrid';
import { storeSortingProperty, storeSortingDirection, getItemViewState } from '../../../State/ItemViewState';
import { getSpoilerFilter } from '../../../State/SpoilerFilter';
import { useGame } from '../../Game/GameProvider';

type Props = {
    items : GloomhavenItem[];
}

const ItemList = (props:Props) => {
    const {items} = props;
    const { key: gameType } = useGame();
    const { displayAs, all } = getSpoilerFilter();
    const { property, direction } = getItemViewState();
    const dispatch = useDispatch();

        const setSorting = (newProperty: SortProperty) => {
            let newDirection:SortDirection;
            if (property === newProperty) {
                newDirection = direction === SortDirection.ascending ? SortDirection.descending : SortDirection.ascending;
            } else {
                newDirection = SortDirection.ascending;
            }

            dispatch(storeSortingProperty({value:newProperty, gameType}));
            dispatch(storeSortingDirection({value:newDirection, gameType}));
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
