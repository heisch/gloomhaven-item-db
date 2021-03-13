import React, { useEffect } from 'react'
import { Form, Image } from 'semantic-ui-react';
import SpoilerFilterItemList from './SpoilerFilterItemList';
import { ClassesInUse, fcClassList, ghClassList, SoloClassShorthand } from '../../../State/Types';
import { useGame } from '../../Game/GameProvider';
import { GameType } from '../../../games';
import { useFilterOptions } from '../../Providers/FilterOptionsProvider';
import { ClassList } from './ClassList';

const GHSpoilerFilter = () => {
    const { gameType } = useGame();
    const { filterOptions: {prosperity, soloClass}, updateFilterOptions}  = useFilterOptions();


    if (gameType !== GameType.Gloomhaven) {
        return null;
    }

    const toggleClassFilter = (key: ClassesInUse) => {
        const value = Object.assign([], soloClass);
        if (value.includes(key)) {
            value.splice(value.indexOf(key), 1);
        } else {
            value.push(key)
        }
        updateFilterOptions({soloClass: value})
    }

    let classList:ClassesInUse[] = [...ghClassList, ...fcClassList];

    return (
        <>
            <Form.Field>
                <Form.Group inline>
                    <label>Prosperity:</label>
                        {[...Array(9).keys()].map(index => {
                            const nextProsperity = index + 1;
                            return (
                                <Form.Radio key={index} label={nextProsperity}
                                            checked={prosperity === nextProsperity}
                                            onChange={() => updateFilterOptions({prosperity: nextProsperity})}/>
                        )})}
                </Form.Group>

                <SpoilerFilterItemList start={(prosperity + 1) * 7 + 1} end={70} title="Prosperity Items"/>
                <SpoilerFilterItemList start={71} end={95} title="Random Item Design"/>
                <SpoilerFilterItemList start={96} end={133} title="Other Items"/>
                <SpoilerFilterItemList start={152} end={163} title="Forgotten Circles Items"/>
            </Form.Field>

            <Form.Field>
                <Form.Group inline className={'inline-break'}>
                    <ClassList 
                        isEnabled={(className: ClassesInUse) => soloClass.includes(className)}  
                        label={"Solo Class Items:"} 
                        classes={classList} 
                        onClick={toggleClassFilter}/>
                </Form.Group>
            </Form.Field>
        </>
    )
}

export default GHSpoilerFilter;
