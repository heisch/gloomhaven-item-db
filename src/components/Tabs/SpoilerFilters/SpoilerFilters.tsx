import React from 'react'
import { Form, Button, Icon, Image } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../State/Reducer';
import { storeEnableStoreStockManagement, storeAll, storeProsperity, storeSoloClass } from '../../../State/SpoilerFilter';
import { SoloClassShorthand } from '../../../State/Types';
import FilterCheckbox from './FilterCheckbox';

type Props = {
}

const GloomhavenSoloClassShorthands: Array<SoloClassShorthand> = ['BR', 'TI', 'SW', 'SC', 'CH', 'MT', 'SK', 'QM', 'SU', 'NS', 'PH', 'BE', 'SS', 'DS', 'SB', 'EL', 'BT'];

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

                {prosperity < 9 && <Form.Group inline className={'inline-break'}>
                    <label>Prosperity Items:</label>
                    {/* 15-70 prosperity 2-9*/}
                    {[...Array(70 - (prosperity + 1) * 7).keys()].map((val) => {
                        const id = val + 1 + (prosperity + 1) * 7;
                        return <FilterCheckbox id={id}/>
                    })}
                </Form.Group>}

                <Form.Group inline className={'inline-break'}>
                    <label>Random Item Design:</label>
                    {/* 71-95 random item design*/}
                    {[...Array(25).keys()].map((val) => {
                        const id = val + 71;
                        return <FilterCheckbox id={id}/>
                    })}
                </Form.Group>


                <Form.Group inline className={'inline-break'}>
                    <label>Other Items:</label>
                    {/* 96-133 other items*/}
                    {[...Array(38).keys()].map((val) => {
                        const id = val + 96;
                        return <FilterCheckbox id={id}/>
                    })}
                </Form.Group>

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