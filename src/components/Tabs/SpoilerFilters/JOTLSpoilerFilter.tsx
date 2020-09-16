import React from 'react'
import SpoilerFilterItemList from './SpoilerFilterItemList';
import { Form } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { storeScenarioCompleted, getSpoilerFilter } from '../../../State/SpoilerFilter';
import { useGame } from '../../Game/GameProvider';
import { GameType } from '../../../games';

type Props = {
    gameType: GameType;
}

const JOTLSpoilerFilter = (props:Props) => {
    const { gameType } = props;
    const scenariosOfImportance = [2, 9, 15];
    const { scenarioCompleted } = getSpoilerFilter();
    const dispatch = useDispatch();

    const toggleScenarioCompleted = (key: number) => {
        if (scenarioCompleted.includes(key)) {
            scenarioCompleted.splice(scenarioCompleted.indexOf(key), 1);
        } else {
            scenarioCompleted.push(key)
        }
        dispatch(storeScenarioCompleted(scenarioCompleted, gameType));
    }

    return (
        <>
            <Form.Group inline className={'inline-break'}>
                <label>Scenarios Completed:</label>
                {scenariosOfImportance.map( (id) => {
                    return <Form.Checkbox key={id} label={'#' + (id + '').padStart(3, '0')}
                        checked={scenarioCompleted.includes(id)}
                        onChange={() => toggleScenarioCompleted(id)}/> 
                })}
            </Form.Group>
            <SpoilerFilterItemList gameType={gameType} ranges={[{start:14, end:14}, {start:27, end:36}]} title="Items"/>
        </>
    )
}

export default JOTLSpoilerFilter;
