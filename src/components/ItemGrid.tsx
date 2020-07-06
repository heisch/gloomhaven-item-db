import React from 'react'
import { GloomhavenItem } from '../State/Types'
import ItemCard from './ItemCard';

type Props = {
    items : GloomhavenItem[];
}

const ItemGrid = (props:Props) => {
    const {items} = props;
    return (
        <>
            {items.map(item => (
                <ItemCard key={item.id} item={item}/>
                ))}
        </>
    );
}

export default ItemGrid;