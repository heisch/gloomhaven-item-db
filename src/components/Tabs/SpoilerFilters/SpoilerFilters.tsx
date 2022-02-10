import React from 'react'
import { Form, Button, Icon} from 'semantic-ui-react';
import { useFilterOptions } from '../../Providers/FilterOptionsProvider';
import GHSpoilerFilter from './GHSpoilerFilter';
import JOTLSpoilerFilter from './JOTLSpoilerFilter';
import PartyManagementFilter from './PartyManagementFilter';
import ConfirmClassDelete from './ConfirmClassDelete';
import { PartySpoiler } from './PartySpoiler';
import ConfirmEnvelopeX from './ConfirmEnvelopeX';
import { useSearchOptions } from '../../Providers/SearchOptionsProvider';
import { GameType } from '../../../games';
import { useRecoilValue } from 'recoil';
import { gameDataState } from '../../../State/GameTypeState';

const filters = {
    [GameType.Gloomhaven] : <GHSpoilerFilter/>, 
    [GameType.JawsOfTheLion] : <JOTLSpoilerFilter/>
}

const SpoilerFilters = () => {
    const { filterOptions: {all, envelopeX}, updateFilterOptions } = useFilterOptions();
    const { updateSearchOptions } = useSearchOptions();
    const {gameType} = useRecoilValue(gameDataState)

    return (
        <Form>
            <Form.Group inline>
                <label>Respecting Spoiler Settings:</label>
                <Button
                    color={all ? 'red' : 'blue'}
                    onClick={() => updateFilterOptions({all:!all})}
                >
                    {all
                        ? <React.Fragment><Icon name={'eye'}/> disabled</React.Fragment>
                        : <React.Fragment><Icon name={'eye slash'}/> enabled</React.Fragment>
                    }
                </Button>
            </Form.Group>

            <PartyManagementFilter/>
            {!envelopeX && <Button onClick={() => updateSearchOptions({confirmEnvelopeX: true})}>
                Envelope X
            </Button>}
            {filters[gameType]}
            <PartySpoiler/>
            <ConfirmClassDelete/>
            <ConfirmEnvelopeX/>
        </Form>
    );
}

export default SpoilerFilters;
