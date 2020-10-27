import React from 'react'
import { Form, Image } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { storeProsperity, storeSoloClass, getSpoilerFilter } from '../../../State/SpoilerFilter';
import SpoilerFilterItemList from './SpoilerFilterItemList';
import { SoloClassShorthand } from '../../../State/Types';
import { GameType } from '../../../games';

const GloomhavenSoloClassShorthands: Array<SoloClassShorthand> = ['BR', 'TI', 'SW', 'SC', 'CH', 'MT', 'SK', 'QM', 'SU', 'NS', 'PH', 'BE', 'SS', 'DS', 'SB', 'EL', 'BT', 'DR'];

type Props = {
    gameType: GameType;
}


const GHSpoilerFilter = (props: Props) => {
    const { gameType } = props;
    const { soloClass, prosperity } = getSpoilerFilter();
    const dispatch = useDispatch();

    const toggleClassFilter = (key: SoloClassShorthand) => {
        const value = Object.assign([], soloClass);
        if (value.includes(key)) {
            value.splice(value.indexOf(key), 1);
        } else {
            value.push(key)
        }
        dispatch(storeSoloClass({value, gameType}));
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
                                        onChange={() => dispatch(storeProsperity({value:nextProsperity, gameType}))}/>
                    )})}
            </Form.Group>

            <SpoilerFilterItemList gameType={gameType} start={(prosperity + 1) * 7 + 1} end={70} title="Prosperity Items"/>
            <SpoilerFilterItemList gameType={gameType} start={71} end={95} title="Random Item Design"/>
            <SpoilerFilterItemList gameType={gameType} start={96} end={133} title="Other Items"/>
            <SpoilerFilterItemList gameType={gameType} start={152} end={163} title="Forgotten Circles Itmes"/>

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
