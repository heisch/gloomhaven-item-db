import React from 'react'
import { GloomhavenItem } from "../../../State/Types"
import ItemManagement from "./ItemManagement";
import { useGame } from '../../Game/GameProvider';

type Props = {
    item : GloomhavenItem
}

const ItemCard = (props:Props) => {
    const { item } = props;
    const game = useGame();

    return (
        <div className={'item-card-wrapper'}>
            <img
                src={game.getItemPath(item)}
                alt={item.name}
                className={'item-card'}/>
            <ItemManagement item={item}/>
        </div>
    )
}

export default ItemCard;
