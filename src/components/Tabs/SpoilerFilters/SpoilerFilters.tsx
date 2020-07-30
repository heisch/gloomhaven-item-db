import React from 'react'
import { Form, Button, Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../State/Reducer';
import { storeEnableStoreStockManagement, storeAll } from '../../../State/SpoilerFilter';
import { useGame, GameType } from '../../Game/GameProvider';
import GHSpoilerFilter from './GHSpoilerFilter';
import JOTLSpoilerFilter from './JOTLSpoilerFilter';

type Props = {
}

const SpoilerFilters = (props:Props) => {
    const {} = props;
    const dispatch = useDispatch();
    const gameType = useGame();

    const { enableStoreStockManagement, all } = useSelector<RootState>( state => state.spoilerFilter) as RootState['spoilerFilter'];

    return (
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

            {gameType == GameType.GH && <GHSpoilerFilter/>}
            {gameType == GameType.JOTL && <JOTLSpoilerFilter/>}
      
        </Form>
    );
}

export default SpoilerFilters;
