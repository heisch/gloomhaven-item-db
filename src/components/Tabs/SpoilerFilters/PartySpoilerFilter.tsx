import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { Button, Form, Label } from "semantic-ui-react";
import { getSpoilerFilter, addClass} from "../../../State/SpoilerFilter";
import { ClassesInUse, ItemManagementType, PullDownOptions } from "../../../State/Types";
import { useGame } from "../../Game/GameProvider";
import ClassDropdown, { createClassImage } from "../MainView/ClassDropdown";
import {useSearchOptions} from "../../Providers/SearchOptionsProvider";
import ConfirmClassDelete from "./ConfirmClassDelete";

const classList: Array<ClassesInUse> = ['BR', 'TI', 'SW', 'SC', 'CH', 'MT', 'SK', 'QM', 'SU', 'NS', 'PH', 'BE', 'SS', 'DS', 'SB', 'EL', 'BT', 'DR'];

const PartySpoilerFilter = () => {
    const { gameType } = useGame();
    const { itemManagementType, classesInUse, itemsOwnedBy } = getSpoilerFilter();
    const { setSearchOptions } = useSearchOptions();
    const dispatch = useDispatch();

    const isClassAvailable = (className:ClassesInUse) => {
        if (classesInUse) {
            return !classesInUse.includes(className);
        }
        return true;
    }

    const classesAvailable = classList.filter(isClassAvailable);

    const [selectedClass, setSelectedClass] =  useState<PullDownOptions>(undefined);

    const onChange = (newClass: PullDownOptions) => {
        setSelectedClass(newClass);
    }

    const onAddClass = () => {
        if (selectedClass) {
            dispatch(addClass({value: selectedClass, gameType}));
            setSelectedClass(undefined);
        }
    }

    const onRemoveClass = (removingClass: ClassesInUse) => {
        setSearchOptions({removingClass})
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
                            <Button key={`classinue-${className}`} as='div' labelPosition='right' onClick={() => onRemoveClass(className)}>
                                <div style={{marginRight: "10px"}}>
                                    {createClassImage(className)}
                                </div>
                                <Label as='a' basic pointing='left'>
                                    Remove
                                </Label>
                            </Button>
                    ) : "None" }                    
            </Form.Group>
            <ConfirmClassDelete/>
        </>
}

export default PartySpoilerFilter;