import React from 'react'
import { GloomhavenItem } from "../../../State/Types"
import ItemManagement from "./ItemManagement";
import { useGame, GameType } from '../../Game/GameProvider';

type Props = {
    item : GloomhavenItem
}

const ItemCard = (props:Props) => {
    const { item } = props;
    const gameType = useGame();

    const getGHItemImageSrc = (): string => {
        let folder = "";
        let name = item.name.toLowerCase().replace(/\s/g, '-').replace(/'/, '');
        if (item.id >= 152 && item.id <= 165) {
            folder = '152-165';
        } else if (item.id >= 64 && item.id <= 151) {
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

    const getJOTLItemImageSrc = (): string => {
        let folder = "";
        let name = item.name.toLowerCase().replace(/\s/g, '-').replace(/'/, '');
        if (item.id >= 27) {
            folder = '27-36';
        } else if (item.id >= 21) {
            folder = '21-26';
        } else if (item.id >= 15) {
            folder = '15-20';
        } else if (item.id == 14) {
            folder = '14';
        } else  {
            folder = '1-13';
        }
        const req = require(`../../../../vendor/jotl/images/items/${folder}/${name}.png`);
        return req;
    }

    const getItemImageSrc = () : string => {
        switch (gameType)
        {
            case GameType.GH:
                return getGHItemImageSrc();
            case GameType.JOTL:
                return getJOTLItemImageSrc();
        }
    };


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
