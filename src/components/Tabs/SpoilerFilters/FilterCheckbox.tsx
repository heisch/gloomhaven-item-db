import React from 'react'
import { Form } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { storeItem, getSpoilerFilter } from '../../../State/SpoilerFilter';

type Props = {
    id: number;
}

const FilterCheckbox = (props:Props) => {
    const { id } = props;
    const { item } = getSpoilerFilter();
    const dispatch = useDispatch();

    const toggleItemFilter = (key: number) => {
        if (item.includes(key)) {
            item.splice(item.indexOf(key), 1);
        } else {
            item.push(key)
        }
        dispatch(storeItem(item));
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
