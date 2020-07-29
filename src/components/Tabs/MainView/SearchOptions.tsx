import React from 'react'
import { Form, Button, Input } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { storeDisplayAs, storeDiscount } from '../../../State/SpoilerFilter';
import { RootState } from '../../../State/Reducer';
import { storeFilterSearch, storeFilterSlot } from '../../../State/ItemViewState';
import { getSlotImageSrc } from '../../../helpers';
import { GloomhavenItemSlot, SortProperty} from '../../../State/Types';

type Props = {
    setSorting : (newProperty: SortProperty) => void;
}

const SearchOptions = (props:Props) => {
    const { setSorting } =  props;
    const gloomhavenItemSlots: Array<GloomhavenItemSlot> = ['Head', 'Body', 'Legs', 'One Hand', 'Two Hands', 'Small Item'];
    const { displayAs, discount } = useSelector<RootState>( state => state.spoilerFilter) as RootState['spoilerFilter'];
    const { property, search, slot } = useSelector<RootState>( state => state.itemViewState) as RootState['itemViewState'];
    const dispatch = useDispatch();

    const setFilterSlot = (slot?: GloomhavenItemSlot) => {
        dispatch(storeFilterSlot(slot));
    }

    return (
        <React.Fragment>
            <Form>
                <Form.Group inline>
                    <label>Render as:</label>
                    <Button.Group>
                        <Button color={displayAs === 'list' ? 'blue' : undefined} onClick={() => {
                                dispatch(storeDisplayAs('list'));
                            }}>List</Button>
                        <Button.Or/>
                        <Button color={displayAs === 'images' ? 'blue' : undefined} onClick={() => {
                                dispatch(storeDisplayAs('images'));
                            }}>Images</Button>
                    </Button.Group>
                </Form.Group>
                {displayAs === 'list' && <Form.Group inline>
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
                                dispatch(storeDiscount(typeof e.value === 'number' ? e.value : 0));
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
                    <Form.Radio label={'all'} checked={slot === undefined} onChange={() => setFilterSlot(undefined)}/>
                    {gloomhavenItemSlots.map(itemSlot => 
                        <Form.Radio key={itemSlot}
                                    label={<img className={'icon'} src={getSlotImageSrc(itemSlot)} alt={itemSlot}/>} 
                                    checked={itemSlot === slot} 
                                    onChange={() => setFilterSlot(itemSlot)} alt={itemSlot}/>)
                    }
                </Form.Group>
                <Form.Group inline>
                    <label>Find Item:</label>
                    <Input
                        value={search}
                        onChange={(e) => dispatch(storeFilterSearch(e.target.value))}
                        icon={{name: 'close', link: true, onClick: () => dispatch(storeFilterSearch(''))}}
                        placeholder={'Search...'}
                    />
                </Form.Group>
            </Form>
        </React.Fragment>
    );
}

export default SearchOptions;
