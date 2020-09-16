import React from 'react'
import { Form } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { storeItem, getSpoilerFilter } from '../../../State/SpoilerFilter';
import { useGame } from '../../Game/GameProvider';
import { GameType } from '../../../games';

type Props = {
    id: number;
    gameType:GameType;
}

const FilterCheckbox = (props:Props) => {
    const { id, gameType } = props;
    const { item } = getSpoilerFilter();
    const dispatch = useDispatch();

    const toggleItemFilter = (key: number) => {
        if (item.includes(key)) {
            item.splice(item.indexOf(key), 1);
        } else {
            item.push(key)
        }
        dispatch(storeItem(item, gameType));
    }

    return (
        <>
            <Form.Checkbox key={id} label={'#' + (id + '').padStart(3, '0')}
                    checked={item.includes(id)}
                    onChange={() => toggleItemFilter(id)}/>        
        </>
    );
}

export default FilterCheckbox;
