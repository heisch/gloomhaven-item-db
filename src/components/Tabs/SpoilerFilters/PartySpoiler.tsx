import React from "react"
import { Form } from "semantic-ui-react"
import { isFlagEnabled } from "../../../helpers";
import { ClassesInUse, envelopeXClassList, fcClassList, ghClassList, ItemManagementType, jotlClassList } from "../../../State/Types";
import { useFilterOptions } from "../../Providers/FilterOptionsProvider";
import { useSearchOptions } from "../../Providers/SearchOptionsProvider";
import { ClassList } from "./ClassList";

export const PartySpoiler = () => {
    const partyModeEnabled = isFlagEnabled("partyMode");
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

    if (!partyModeEnabled || itemManagementType !== ItemManagementType.Party) {
        return null;
    }

    let ghList: ClassesInUse[] = [...ghClassList];
    if (envelopeX) {
        ghList = ghList.concat(envelopeXClassList);
    }

    return <Form.Group inline className={'inline-break'}>
                <label>Party Members:</label>
                <ClassList classes={ghList} label="Gloomhaven:" onClick={toggleClassFilter} isEnabled={(className: ClassesInUse) => classesInUse.includes(className)} />
                <ClassList classes={fcClassList} label="Forgotten Circles:" onClick={toggleClassFilter} isEnabled={(className: ClassesInUse) => classesInUse.includes(className)} />
                <ClassList classes={jotlClassList} label="Jaws of the Lion:" onClick={toggleClassFilter} isEnabled={(className: ClassesInUse) => classesInUse.includes(className)} />
            </Form.Group>
        
}

