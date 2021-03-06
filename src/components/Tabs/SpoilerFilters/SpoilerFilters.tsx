import React from 'react'
import { Form, Button, Icon, Dropdown, DropdownProps } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { storeEnableStoreStockManagement, storeAll, getSpoilerFilter } from '../../../State/SpoilerFilter';
import { useGame } from '../../Game/GameProvider';
import { ItemManagementType } from '../../../State/Types';
import PartySpoilerFilter from './PartySpoilerFilter';

const SpoilerFilters = () => {
    const dispatch = useDispatch();
    const { spoilerFilter, gameType} = useGame();
    const { itemManagementType, all } = getSpoilerFilter();

    const options = Object.keys(ItemManagementType).map( key => {
        return {value: key, text:key}
    })

    const onChangeItemManagement= (_d:any, data:DropdownProps) => {
        const { value } = data;
        if (value) {
            const type =  value as ItemManagementType;
            dispatch(storeEnableStoreStockManagement({value: type, gameType}));
        }
    }

    return (
        <Form>
            <Form.Group inline>
                <label>Respecting Spoiler Settings:</label>
                <Button
                    color={all ? 'red' : 'blue'}
                    onClick={() => dispatch(storeAll({value:!all,gameType}))}
                >
                    {all
                        ? <React.Fragment><Icon name={'eye'}/> disabled</React.Fragment>
                        : <React.Fragment><Icon name={'eye slash'}/> enabled</React.Fragment>
                    }
                </Button>
            </Form.Group>

            <Form.Group inline>
                <label>Enable Store Stock Management:</label>
                <Dropdown
                defaultValue={itemManagementType}
                onChange={onChangeItemManagement}
                options={options}/>
            </Form.Group>

            <PartySpoilerFilter/>

           {spoilerFilter}
      
        </Form>
    );
}

export default SpoilerFilters;
