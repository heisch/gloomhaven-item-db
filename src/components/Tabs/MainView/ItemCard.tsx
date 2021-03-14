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
    const {gameType} = useGame();
    const [draw, setDraw] = useState(false);

    const getItemPath = () => {
        const { folder, name } = item;
        const filename = name.toLowerCase().replace(/\s/g, '-').replace(/'/, '');
        return require(`../../../../vendor/${gameType}/images/items/${folder}/${filename}.png`);
    }

    return (
        <div className={'item-card-wrapper'}>
            <img
                src={getItemPath()}
                alt={item.name}
                onLoad={() => setDraw(true)}
                className={'item-card'}/>
            {draw && <ItemId cost={item.id}/>}
            {draw && <ItemManagement item={item}/>}
        </div>
    )
}

export default ItemCard;
