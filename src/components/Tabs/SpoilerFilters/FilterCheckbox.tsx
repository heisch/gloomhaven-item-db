import React from 'react'
import { Form } from 'semantic-ui-react';
import { useFilterOptions } from '../../Providers/FilterOptionsProvider';

type Props = {
    id: number;
}

const FilterCheckbox = (props:Props) => {
    const { id } = props;
    const { filterOptions: {item}, updateFilterOptions } = useFilterOptions();

    const toggleItemFilter = (key: number) => {
        const value = Object.assign([], item);
        if (value.includes(key)) {
            value.splice(value.indexOf(key), 1);
        } else {
            value.push(key)
        }
        updateFilterOptions({item:value});
    }

    return <Form.Checkbox key={id} label={'#' + (id + '').padStart(3, '0')}
                    checked={item.includes(id)}
                    onChange={() => toggleItemFilter(id)}/>;
}

export default FilterCheckbox;
