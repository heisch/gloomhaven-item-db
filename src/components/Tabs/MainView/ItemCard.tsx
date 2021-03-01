import React, { useRef, useState } from 'react'
import { GloomhavenItem } from "../../../State/Types"
import { Label} from "semantic-ui-react";
import ItemManagement from "./ItemManagement";
import { useGame } from '../../Game/GameProvider';

type Props = {
    item : GloomhavenItem
}

const ItemId = ({cost: id}:{cost: number}) => {
    return (<Label className="itemCost"> #{id} </Label>); 
}

const ItemCard = (props:Props) => {
    const { item } = props;
    const game = useGame();
    const [draw, setDraw] = useState(false);
    return (
        <div className={'item-card-wrapper'}>
            <img
                src={game.getItemPath(item)}
                alt={item.name}
                onLoad={() => setDraw(true)}
                className={'item-card'}/>
            {draw && <ItemId cost={item.id}/>}
            {draw && <ItemManagement item={item}/>}
        </div>
    )
}

export default ItemCard;
