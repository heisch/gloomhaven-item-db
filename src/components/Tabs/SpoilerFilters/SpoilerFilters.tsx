import React, { useState } from 'react'
import { Form, Button, Icon, Dropdown, DropdownProps } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { storeEnableStoreStockManagement, storeAll, getSpoilerFilter, addClass, removeClass } from '../../../State/SpoilerFilter';
import { useGame } from '../../Game/GameProvider';
import ClassDropdown, {createClassImage} from '../MainView/ClassDropdown';
import { ClassesInUse, ItemManagementType } from '../../../State/Types';

const classList: Array<ClassesInUse> = ['BR', 'TI', 'SW', 'SC', 'CH', 'MT', 'SK', 'QM', 'SU', 'NS', 'PH', 'BE', 'SS', 'DS', 'SB', 'EL', 'BT', 'DR'];


const SpoilerFilters = () => {
    const dispatch = useDispatch();
    const { spoilerFilter, gameType} = useGame();
    const { itemMangementType, all, classesInUse } = getSpoilerFilter();
    const classesAvailable = classList.filter(c => !classesInUse.includes(c));
    const [selectedClass, setSelectedClass] =  useState<ClassesInUse>(classesAvailable[0] || classesInUse[0]);

    const onChange = (newClass: ClassesInUse) => {
        setSelectedClass(newClass);
    }

    const onAddClass = () => {
        if (selectedClass) {
            dispatch(addClass({value: selectedClass, gameType}));
        }
    }

    const onRemoveClass = (classToRemove: ClassesInUse) => {
        console.log(classToRemove);
        dispatch(removeClass({value: classToRemove, gameType}))
    }

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
                defaultValue={itemMangementType}
                onChange={onChangeItemManagement}
                options={options}/>
            </Form.Group>

            {itemMangementType === ItemManagementType.Party && 
            <>
                <Form.Group inline>
                    <label> Add Member: </label>
                    <Button className="addUser" icon='add user' basic color='black' onClick={onAddClass}/>
                    <ClassDropdown className="classdropdown" optionsList={classesAvailable} onChange={onChange}/>
                </Form.Group>
                <Form.Group inline>
                    <label> Current Members: </label>
                    {classesInUse.map(className =>
                            <Button key={className}
                                    className={"deleteUser"}
                                    basic
                                    color='black'
                                    content={createClassImage(className)} 
                                    icon='delete' 
                                    onClick={() => onRemoveClass(className)}/>
                        )}                    
                </Form.Group>
            </>}

           {spoilerFilter}
      
        </Form>
    );
}

export default SpoilerFilters;
