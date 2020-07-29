import React from 'react'
import { Form } from 'semantic-ui-react';
import FilterCheckbox from './FilterCheckbox';

type Props = {
    start: number;
    end: number;
    title: string;
}

const SpoilerFilterItemList = (props:Props) => {
    const {start, end, title} = props;

    const checkBoxes = [];
    for (let i = start; i <= end; i++) {
        checkBoxes.push(<FilterCheckbox key={`filter${i}`} id={i}/>);
    }

    if (start >= end) {
        return null;
    }

    return (
        <Form.Group inline className={'inline-break'}>
            <label>{title}:</label>
            {checkBoxes}
        </Form.Group>
    );
}

export default SpoilerFilterItemList;
