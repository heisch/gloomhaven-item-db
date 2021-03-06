import React from 'react'
import { Form, Button, Input, DropdownProps } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { storeDisplayAs, storeDiscount, getSpoilerFilter } from '../../../State/SpoilerFilter';
import { getSlotImageSrc } from '../../../helpers';
import { ClassesInUse, GloomhavenItemSlot, PullDownOptions, SortProperty} from '../../../State/Types';
import { useGame } from '../../Game/GameProvider';
import { GameType } from '../../../games';
import { useSearchOptions } from '../../Providers/SearchOptionsProvider';
import ClassDropdown from './ClassDropdown';

type Props = {
    setSorting : (newProperty: SortProperty) => void;
}

const SearchOptions = (props:Props) => {
    const { setSorting } =  props;
    const { displayAs, discount, classesInUse } = getSpoilerFilter();
    const { searchOptions:{ property, search, slots, availableOnly }, setSearchOptions} = useSearchOptions();
    const dispatch = useDispatch();
    const { gameType, getItemFilterSlots } = useGame();

    const setFilterSlot = (slot?: GloomhavenItemSlot) => {
        if (!slot)
        {
            setSearchOptions({slots: undefined});
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
            setSearchOptions({slots: undefined});
        }
        else
            setSearchOptions({slots: value});
    }


    return (
        <React.Fragment>
            <Form>
                <Form.Group inline>
                    <label>Render as:</label>
                    <Button.Group>
                        <Button color={displayAs === 'list' ? 'blue' : undefined} onClick={() => {
                                dispatch(storeDisplayAs({value:'list', gameType}));
                            }}>List</Button>
                        <Button.Or/>
                        <Button color={displayAs === 'images' ? 'blue' : undefined} onClick={() => {
                                dispatch(storeDisplayAs({value:'images', gameType}));
                            }}>Images</Button>
                    </Button.Group>
                </Form.Group>
                {gameType === GameType.Gloomhaven && displayAs === 'list' && <Form.Group inline>
                    <label>Reputation Discount:</label>
                    <Form.Select value={discount}
                            options={[
                                {value: -5, text: "-5 gold"}, // (19 - 20)
                                {value: -4, text: "-4 gold"}, // (15 - 18)
                                {value: -3, text: "-3 gold"}, // (11 - 14)
                                {value: -2, text: "-2 gold"}, // (7 - 13)
                                {value: -1, text: "-1 gold"}, // (3 - 6)
                                {value: 0, text: "none"}, // (-2 - 2)
                                {value: 1, text: "+1 gold"}, // (-3 - -6)
                                {value: 2, text: "+2 gold"}, // (-7 - -10)
                                {value: 3, text: "+3 gold"}, // (-11 - -14)
                                {value: 4, text: "+4 gold"}, // (-15 - -18)
                                {value: 5, text: "+5 gold"}, // (-19 - -20)
                            ]}
                            onChange={(obj, e) => {
                                dispatch(storeDiscount({value:typeof e.value === 'number' ? e.value : 0, gameType}));
                            }}
                    />
                </Form.Group>}
                {displayAs === 'images' && <Form.Group inline>
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
                </Form.Group>}
                <Form.Group inline>
                    <label>Filter Slot:</label>
                    <Form.Radio label={'all'} checked={slots === undefined} onChange={() => setFilterSlot(undefined)}/>
                    {getItemFilterSlots().map(itemSlot => 
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
                        onChange={(e) => { setSearchOptions({search:e.target.value})}}
                        icon={{name: 'close', link: true, onClick: () => setSearchOptions({search:''})}}
                        placeholder={'Search...'}
                    />
                </Form.Group>
                <Form.Group inline> 
                    <label>Owner:</label>
                    <ClassDropdown  optionsList={[undefined, ...classesInUse]}  onChange={ (option:PullDownOptions) => setSearchOptions({selectedClass:option})} />
                </Form.Group>
                <Form.Group inline>
                    <label>Availability</label>
                    <Button.Group>
                        <Button color={availableOnly? 'blue' : undefined} onClick={() => {
                                setSearchOptions({availableOnly:true})
                            }}>Available</Button>
                        <Button.Or/>
                        <Button color={!availableOnly ? 'blue' : undefined} onClick={() => {
                                setSearchOptions({availableOnly:false})
                            }}>All</Button>
                    </Button.Group>
                </Form.Group>

            </Form>
        </React.Fragment>
    );
}

export default SearchOptions;
