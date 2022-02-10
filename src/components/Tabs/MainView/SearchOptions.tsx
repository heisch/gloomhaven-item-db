import React from 'react'
import { Form, Button, Input, Icon} from 'semantic-ui-react';
import { getSlotImageSrc } from '../../../helpers';
import { ClassesInUse, GloomhavenItemSlot, ItemManagementType, ItemViewDisplayType, SortDirection, SortProperty} from '../../../State/Types';
import { useSearchOptions } from '../../Providers/SearchOptionsProvider';
import { useFilterOptions } from '../../Providers/FilterOptionsProvider';
import { ClassList } from '../SpoilerFilters/ClassList';
import { useRecoilValue } from 'recoil';
import { gameDataState } from '../../../State/GameTypeState';

type Props = {
    setSorting : (newProperty: SortProperty) => void;
}

const SearchOptions = (props:Props) => {
    const { setSorting } =  props;
    const { searchOptions:{ property, search, slots, availableOnly, direction, selectedClass }, updateSearchOptions} = useSearchOptions();
    const { filterOptions: { displayAs, classesInUse, discount, itemManagementType }, updateFilterOptions} = useFilterOptions();
    const {filterSlots} = useRecoilValue(gameDataState)

    const setFilterSlot = (slot?: GloomhavenItemSlot) => {
        if (!slot)
        {
            updateSearchOptions({slots: undefined});
            return;
        }
        let value = Object.assign([], slots);
        const index = value.indexOf(slot);
        if (index !== -1) {
            value.splice(index, 1);
        } else {
            value.push(slot);
        }
        if (value.length === 0)
        {
            updateSearchOptions({slots: undefined});
        }
        else
            updateSearchOptions({slots: value});
    }

    const toggleSortDirection = () => {
        updateSearchOptions({direction: direction === SortDirection.ascending ? SortDirection.descending : SortDirection.ascending});
    }


    return (
        <React.Fragment>
            <Form>
                <Form.Group inline>
                    <label>Render as:</label>
                    <Button.Group>
                        <Button color={displayAs === ItemViewDisplayType.List ? 'blue' : undefined} onClick={() => {
                                updateFilterOptions({displayAs: ItemViewDisplayType.List})
                            }}>List</Button>
                        <Button.Or/>
                        <Button color={displayAs === ItemViewDisplayType.Images ? 'blue' : undefined} onClick={() => {
                                updateFilterOptions({displayAs: ItemViewDisplayType.Images})
                            }}>Images</Button>
                    </Button.Group>
                </Form.Group>
                <Form.Group inline>
                    <label>Filter Slot:</label>
                    <Form.Radio label={'all'} checked={slots === undefined} onChange={() => setFilterSlot(undefined)}/>
                    {filterSlots.map(itemSlot => 
                        <Form.Checkbox key={itemSlot}
                                    label={<img className={'icon'} src={getSlotImageSrc(itemSlot)} alt={itemSlot}/>} 
                                    checked={slots === undefined ? false : slots && slots.includes(itemSlot)} 
                                    onChange={() => setFilterSlot(itemSlot)} alt={itemSlot}/>)
                    }
                </Form.Group>
                <Form.Group inline>
                    <label>Find Item:</label>
                    <Input
                        value={search}
                        onChange={(e) => { updateSearchOptions({search:e.target.value})}}
                        icon={{name: 'close', link: true, onClick: () => updateSearchOptions({search:''})}}
                        placeholder={'Search...'}
                    />
                </Form.Group>
                {itemManagementType === ItemManagementType.Party &&
                    <Form.Group inline> 
                        <ClassList 
                            label={"Filter Owner:"} 
                            classes={classesInUse} 
                            onClick={ (option:ClassesInUse) => {
                                if (selectedClass === option) {
                                    updateSearchOptions({selectedClass:undefined});
                                }
                                else {
                                    updateSearchOptions({selectedClass:option})
                                }
                            }
                            }
                            isUsed={ (options:ClassesInUse) => selectedClass === options}
                            />
                    </Form.Group>
                }
                <Form.Group inline>
                    <label>Availability</label>
                    <Button.Group>
                        <Button color={availableOnly? 'blue' : undefined} onClick={() => {
                                updateSearchOptions({availableOnly:true})
                            }}>Available</Button>
                        <Button.Or/>
                        <Button color={!availableOnly ? 'blue' : undefined} onClick={() => {
                                updateSearchOptions({availableOnly:false})
                            }}>All</Button>
                    </Button.Group>
                </Form.Group>
                {displayAs === ItemViewDisplayType.Images &&
                <>
                 <Form.Group inline>
                    <label>Sort By:</label>
                    <Form.Select
                        value={property}
                        options={[
                            {value: 'id', text: 'Item Number'},
                            {value: 'slot', text: 'Equipment Slot'},
                            {value: 'cost', text: 'Cost'},
                            {value: 'name', text: 'Name'},
                            {value: 'source', text: 'Source'},
                            {value: 'use', text: 'Use'}
                        ]}
                        onChange={(obj, e) => setSorting(e.value as SortProperty)}
                    />
                    <Button 
                        icon={<Icon name={direction === SortDirection.ascending ? `angle up` : `angle down`}/>}
                        checked={direction === SortDirection.ascending}
                        onClick={() => toggleSortDirection()}/>                   
                </Form.Group> 
                <Form.Group inline>
                    <label>Store Discount:</label>
                    {`${discount}g`}
                </Form.Group>
                </>}
            </Form>
        </React.Fragment>
    );
}

export default SearchOptions;
