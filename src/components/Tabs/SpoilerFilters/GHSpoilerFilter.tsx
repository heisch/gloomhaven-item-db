import React from 'react'
import { Form } from 'semantic-ui-react';
import SpoilerFilterItemList from './SpoilerFilterItemList';
import { ClassesInUse, envelopeXClassList, fcClassList, ghClassList } from '../../../State/Types';
import { useGame } from '../../Game/GameProvider';
import { GameType } from '../../../games';
import { useFilterOptions } from '../../Providers/FilterOptionsProvider';
import { ClassList } from './ClassList';

const GHSpoilerFilter = () => {
    const { gameType } = useGame();
    const { filterOptions: {prosperity, soloClass, envelopeX, discount}, updateFilterOptions}  = useFilterOptions();

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

    let classList:ClassesInUse[] = [...ghClassList];
    if (envelopeX) {
        classList = classList.concat(envelopeXClassList);
    }
    classList = classList.concat(fcClassList);

    return (
        <>
                <Form.Group inline>
                    <label>Reputation Discount:</label>
                    <Form.Select value={discount}
                            options={[
                                {value: -5, text: "-5 gold"}, // (19 - 20)
                                {value: -4, text: "-4 gold"}, // (15 - 18)
                                {value: -3, text: "-3 gold"}, // (11 - 14)
                                {value: -2, text: "-2 gold"}, // (7 - 13)
                                {value: -1, text: "-1 gold"}, // (3 - 6)
                                {value: 0, text: "none"}, // (-2 - 2)
                                {value: 1, text: "+1 gold"}, // (-3 - -6)
                                {value: 2, text: "+2 gold"}, // (-7 - -10)
                                {value: 3, text: "+3 gold"}, // (-11 - -14)
                                {value: 4, text: "+4 gold"}, // (-15 - -18)
                                {value: 5, text: "+5 gold"}, // (-19 - -20)
                            ]}
                            onChange={(obj, e) => {
                                updateFilterOptions({discount:parseInt(e.value as string)});
                            }}
                    />
                </Form.Group>


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
                        isUsed={(className: ClassesInUse) => soloClass.includes(className)}  
                        label={"Solo Class Items:"} 
                        classes={classList} 
                        onClick={toggleClassFilter}/>
                </Form.Group>
            </Form.Field>
        </>
    )
}

export default GHSpoilerFilter;
