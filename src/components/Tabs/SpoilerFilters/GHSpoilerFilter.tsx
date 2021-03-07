import React from 'react'
import { Form, Image } from 'semantic-ui-react';
import SpoilerFilterItemList from './SpoilerFilterItemList';
import { SoloClassShorthand } from '../../../State/Types';
import { useGame } from '../../Game/GameProvider';
import { GameType } from '../../../games';
import { useFilterOptions } from '../../Providers/FilterOptionsProvider';

const GloomhavenSoloClassShorthands: Array<SoloClassShorthand> = ['BR', 'TI', 'SW', 'SC', 'CH', 'MT', 'SK', 'QM', 'SU', 'NS', 'PH', 'BE', 'SS', 'DS', 'SB', 'EL', 'BT', 'DR'];

const GHSpoilerFilter = () => {
    const { gameType } = useGame();
    const { filterOptions: {prosperity, soloClass}, updateFilterOptions}  = useFilterOptions();

    if (gameType !== GameType.Gloomhaven) {
        return null;
    }

    const toggleClassFilter = (key: SoloClassShorthand) => {
        const value = Object.assign([], soloClass);
        if (value.includes(key)) {
            value.splice(value.indexOf(key), 1);
        } else {
            value.push(key)
        }
        updateFilterOptions({soloClass: value})
    }

    return (
        <>
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

            <Form.Group inline className={'inline-break'}>
                <label>Solo Class Items:</label>
                {GloomhavenSoloClassShorthands.map(key => (
                    <Image key={key} src={require(`../../../img/classes/${key}.png`)}
                        className={'icon' + (soloClass.includes(key) ? '' : ' disabled')}
                        onClick={() => toggleClassFilter(key)}/>
                ))}
            </Form.Group>
        </>
    )
}

export default GHSpoilerFilter;
