import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { Button, Form, Label } from "semantic-ui-react";
import { getSpoilerFilter, addClass, removeClass } from "../../../State/SpoilerFilter";
import { ClassesInUse, ItemManagementType } from "../../../State/Types";
import { useGame } from "../../Game/GameProvider";
import ClassDropdown, { createClassImage } from "../MainView/ClassDropdown";

const classList: Array<ClassesInUse> = ['BR', 'TI', 'SW', 'SC', 'CH', 'MT', 'SK', 'QM', 'SU', 'NS', 'PH', 'BE', 'SS', 'DS', 'SB', 'EL', 'BT', 'DR'];

const PartySpoilerFilter = () => {
    const { gameType } = useGame();
    const { itemManagementType, classesInUse } = getSpoilerFilter();
    const dispatch = useDispatch();

    const isClassAvailable = (className:ClassesInUse) => {
        if (classesInUse) {
            return !classesInUse.includes(className);
        }
        return true;
    }

    const classesAvailable = classList.filter(isClassAvailable);

    const [selectedClass, setSelectedClass] =  useState<ClassesInUse>(classesAvailable[0]);


    const onChange = (newClass: ClassesInUse) => {
        setSelectedClass(newClass);
    }

    const onAddClass = () => {
        if (selectedClass) {
            dispatch(addClass({value: selectedClass, gameType}));
        }
    }

    const onRemoveClass = (classToRemove: ClassesInUse) => {
        dispatch(removeClass({value: classToRemove, gameType}))
    }

    if (itemManagementType !== ItemManagementType.Party) {
        return null;
    }


    return <>
            <Form.Group inline>
                <label> Add Member: </label>
                <Button as='div' labelPosition='right' onClick={onAddClass}>
                                <div style={{marginRight: "10px"}}>
                                    <Label as='a' basic pointing='right'>
                                    Add
                                    </Label>
                                </div>
                                <ClassDropdown className="classdropdown" optionsList={classesAvailable} onChange={onChange}/>
                            </Button>
            </Form.Group>
            <Form.Group inline>
                <label> Current Members: </label>
                {classesInUse ? classesInUse.map(className => 
                            <Button as='div' labelPosition='right' onClick={() => onRemoveClass(className)}>
                                <div style={{marginRight: "10px"}}>
                                    {createClassImage(className)}
                                </div>
                                <Label as='a' basic pointing='left'>
                                    Remove
                                </Label>
                            </Button>
                    ) : "None" }                    
            </Form.Group>
        </>
}

export default PartySpoilerFilter;