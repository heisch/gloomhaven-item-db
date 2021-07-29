import React from "react"
import { Form, Popup, Icon } from "semantic-ui-react"
import { ClassesInUse, envelopeXClassList, fcClassList, ghClassList, ItemManagementType, jotlClassList } from "../../../State/Types";
import { useFilterOptions } from "../../Providers/FilterOptionsProvider";
import { useSearchOptions } from "../../Providers/SearchOptionsProvider";
import { ClassList } from "./ClassList";

export const PartySpoiler = () => {
    const { updateSearchOptions } = useSearchOptions();
    const { filterOptions: { classesInUse, envelopeX, itemManagementType}, updateFilterOptions} = useFilterOptions();

    const toggleClassFilter = (key:ClassesInUse) => {
        if (classesInUse.includes(key)) {
            updateSearchOptions({classToRemove:key})    
        }
        else {
            const newClassesInUse = Object.assign([], classesInUse);
            newClassesInUse.push(key);
            updateFilterOptions({classesInUse: newClassesInUse});
        }
    }

    if (itemManagementType !== ItemManagementType.Party) {
        return null;
    }

    let ghList: ClassesInUse[] = [...ghClassList];
    if (envelopeX) {
        ghList = ghList.concat(envelopeXClassList);
    }

    return <Form.Group inline className={'inline-break'}>
                <Form.Group inline>
                    <label>Party Members:</label>
                    {<Popup closeOnDocumentClick hideOnScroll trigger={<Icon name={'question circle'} className={'blue'}/>} header={'Party Members'} 
                    content={"Click on a class icon to add that class to you party.  You can then assign items to any members in a party. Clicking on member a second time will remove all items."}/>}
                </Form.Group>
                <ClassList classes={ghList} label="Gloomhaven:" onClick={toggleClassFilter} isUsed={(className: ClassesInUse) => classesInUse.includes(className)} />
                <ClassList classes={fcClassList} label="Forgotten Circles:" onClick={toggleClassFilter} isUsed={(className: ClassesInUse) => classesInUse.includes(className)} />
                <ClassList classes={jotlClassList} label="Jaws of the Lion:" onClick={toggleClassFilter} isUsed={(className: ClassesInUse) => classesInUse.includes(className)} />
            </Form.Group>
        
}

