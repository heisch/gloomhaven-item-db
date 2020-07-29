import React from 'react'
import { Form } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../State/Reducer';
import { storeItem } from '../../../State/SpoilerFilter';

type Props = {
    id: number;
}

const FilterCheckbox = (props:Props) => {
    const { id } = props;
    const { item } = useSelector<RootState>( state => state.spoilerFilter) as RootState['spoilerFilter'];
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
