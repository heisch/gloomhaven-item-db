import { GloomhavenItemSlot, SortDirection, SortProperty, GloomhavenItem } from "./Types";

export const STORE_FILTER_SLOT = 'STORE_FILTER_SLOT';
export const STORE_FILTER_SEARCH = 'STORE_FILTER_SEARCH';
export const STORE_SORTING_PROPERTY = 'STORE_SORTING_PROPERTY'
export const STORE_SORTING_DIRECTION = 'STORE_SORTING_DIRECTION'

export function storeFilterSlot(slot?: GloomhavenItemSlot) {
    return { type: STORE_FILTER_SLOT, slot}
}

export function storeFilterSearch(search: string) {
    return { type: STORE_FILTER_SEARCH, search}
}

export function storeSortingProperty(property: SortProperty) {
    return { type: STORE_SORTING_PROPERTY, property}
}

export function storeSortingDirection(direction: SortDirection) {
    return { type: STORE_SORTING_DIRECTION, direction}
}


export interface ItemViewState {
    slot?: GloomhavenItemSlot;
    search: string;
    direction: SortDirection;
    property: SortProperty;
}

const initialItemViewState : ItemViewState = {
    slot: undefined,
    search: '',
    direction: SortDirection.ascending,
    property: 'id'
};

export function itemViewState(state = initialItemViewState, action:any) {
    switch (action.type)
    {
        case STORE_FILTER_SLOT:
            return { ...state, slot: action.slot};
        case STORE_FILTER_SEARCH:
            return { ...state, search: action.search};
        case STORE_SORTING_PROPERTY:
            return { ...state, property: action.property};
        case STORE_SORTING_DIRECTION:
                return { ...state, direction: action.direction};
            default:
            return state;
    }
}

export default ItemViewState;
