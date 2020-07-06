import React from 'react'
import { GloomhavenItem } from '../../State/Types';
import { useSelector } from 'react-redux';
import { RootState } from '../../State/Reducer';
import SearchOptions from '../SearchOptions';
import { Message, Icon } from 'semantic-ui-react';
import ItemTable from '../ItemTable';
import ItemGrid from '../ItemGrid';

type Props = {
    items : GloomhavenItem[];
}

const ItemList = (props:Props) => {
    const {items} = props;
    const { displayAs, all } = useSelector<RootState>( state => state.spoilerFilter) as RootState['spoilerFilter'];

    return (
        <>
            <SearchOptions/>
            {all &&  (
                <Message negative>
                    <Message.Header><Icon name="exclamation triangle"/>Spoiler alert</Message.Header>
                    You are currently viewing all possible items.
                </Message>
            )}

            {displayAs === 'list' ? <ItemTable items={items}/> : <ItemGrid items={items}/>}

        </>
    );

}

export default ItemList;