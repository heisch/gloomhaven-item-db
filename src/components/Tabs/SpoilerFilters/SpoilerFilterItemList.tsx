import React from 'react'
import { Form } from 'semantic-ui-react';
import FilterCheckbox from './FilterCheckbox';
import { GameType } from '../../../games';

type Range = {
    start:number;
    end: number;
}

type Props = {
    start?:number;
    end?:number;
    ranges?: Array<Range>;
    title: string;
    gameType: GameType;
}

const SpoilerFilterItemList = (props:Props) => {
    const {start, end, ranges, title, gameType} = props;

    if (start && end && ranges)
    {
        throw Error("Cannot use list with both start/end and ranges")
    }

    if (!start && !end && !ranges)
    {
        throw Error("You must specify a range")

    }

    let rangesToShow = ranges || [];
    if (rangesToShow.length === 0 && start && end)
    {
        rangesToShow.push({start, end});
    }

    const checkBoxes:Array<any> = [];
    rangesToShow.forEach(range=> {
       const { start, end} = range;
        for (let i = start; i <= end; i++) {
            checkBoxes.push(<FilterCheckbox key={`filter${i}`} id={i} gameType={gameType}/>);
        }
            
    });
    if (checkBoxes.length === 0)
    {
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
