import React from 'react'
import { GloomhavenItem } from "../../../State/Types"
import ItemManagement from "./ItemManagement";

type Props = {
    item : GloomhavenItem
}

const ItemCard = (props:Props) => {
    const { item } = props;

    const getItemImageSrc = (): string => {
        let folder = "";
        let name = item.name.toLowerCase().replace(/\s/g, '-').replace(/'/, '');
        if (item.id >= 64) {
            folder = '64-151';
        } else if (item.id <= 14) {
            folder = '1-14';
        } else {
            let range_from = item.id % 7 === 0
                ? Math.floor((item.id - 1) / 7) * 7
                : Math.floor((item.id) / 7) * 7;
            folder = (range_from + 1) + '-' + (range_from + 7);
        }
        const req = require(`../../../../vendor/any2cards/images/items/${folder}/${name}.png`);
        return req;
    }

    return (
        <div className={'item-card-wrapper'}>
            <img
                src={getItemImageSrc()}
                alt={item.name}
                className={'item-card'}/>
            <ItemManagement item={item}/>
        </div>
    )
}

export default ItemCard;
