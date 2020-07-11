import React from 'react'
import { Form, Button, Icon, Image } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../State/Reducer';
import { storeEnableStoreStockManagement, storeAll, storeProsperity, storeSoloClass } from '../../../State/SpoilerFilter';
import { SoloClassShorthand } from '../../../State/Types';
import SpoilerFilterItemList from './SpoilerFilterItemList';

type Props = {
}

const GloomhavenSoloClassShorthands: Array<SoloClassShorthand> = ['BR', 'TI', 'SW', 'SC', 'CH', 'MT', 'SK', 'QM', 'SU', 'NS', 'PH', 'BE', 'SS', 'DS', 'SB', 'EL', 'BT', 'DR'];

const SpoilerFilters = (props:Props) => {
    const {} = props;
    const dispatch = useDispatch();

    const { soloClass, item, enableStoreStockManagement, prosperity, all } = useSelector<RootState>( state => state.spoilerFilter) as RootState['spoilerFilter'];

    const toggleClassFilter = (key: SoloClassShorthand) => {
        if (soloClass.includes(key)) {
            soloClass.splice(soloClass.indexOf(key), 1);
        } else {
            soloClass.push(key)
        }
        dispatch(storeSoloClass(soloClass));
    }

    return (
        <>
            <Form>
                <Form.Group inline>
                    <label>Respecting Spoiler Settings:</label>
                    <Button
                        color={all ? 'red' : 'blue'}
                        onClick={() => dispatch(storeAll(!all))}
                    >
                        {all
                            ? <React.Fragment><Icon name={'eye'}/> disabled</React.Fragment>
                            : <React.Fragment><Icon name={'eye slash'}/> enabled</React.Fragment>
                        }
                    </Button>
                </Form.Group>

                <Form.Group inline>
                    <label>Enable Store Stock Management:</label>
                    <Form.Checkbox
                        toggle
                        checked={enableStoreStockManagement}
                        onClick={() => {
                            dispatch(storeEnableStoreStockManagement(!enableStoreStockManagement));
                        }}/>
                </Form.Group>

                <Form.Group inline>
                    <label>Prosperity:</label>
                    {[...Array(9).keys()].map(index => {
                        const nextProsperity = index + 1;
                        return (
                            <Form.Radio key={index} label={nextProsperity}
                                        checked={prosperity === nextProsperity}
                                        onChange={() => dispatch(storeProsperity(nextProsperity))}/>
                        )})}
                </Form.Group>

                <SpoilerFilterItemList start={(prosperity + 1) * 7 + 1} end={70} title="Prosperity Items"/>
                <SpoilerFilterItemList start={71} end={95} title="Random Item Design"/>
                <SpoilerFilterItemList start={96} end={133} title="Other Items"/>
                <SpoilerFilterItemList start={152} end={164} title="Fallen Circles Itmes"/>

                <Form.Group inline className={'inline-break'}>
                    <label>Solo Class Items:</label>
                    {GloomhavenSoloClassShorthands.map(key => (
                        <Image key={key} src={require(`../../../img/classes/${key}.png`)}
                            className={'icon' + (soloClass.includes(key) ? '' : ' disabled')}
                            onClick={() => toggleClassFilter(key)}/>
                    ))}
                </Form.Group>
            </Form>
        </>
    );
}

export default SpoilerFilters;
