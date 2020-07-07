import { GloomhavenItemSlot, SortDirection, SortProperty, GloomhavenItem } from "./Types";

export const STORE_FILTER_SLOT = 'STORE_FILTER_SLOT';
export const STORE_FILTER_SEARCH = 'STORE_FILTER_SEARCH';
export const STORE_SORTING_PROPERTY = 'STORE_SORTING_PROPERTY'

export function storeFilterSlot(slot?: GloomhavenItemSlot) {
    return { type: STORE_FILTER_SLOT, slot}
}

export function storeFilterSearch(search: string) {
    return { type: STORE_FILTER_SEARCH, search}
}

export function storeSortingProperty(property: SortProperty) {
    return { type: STORE_SORTING_PROPERTY, property}
}

export interface ItemViewState {
    filter: {
        slot?: GloomhavenItemSlot
        search: string
    }
    sorting: {
        direction: SortDirection
        property: SortProperty
    }
}

const initialItemViewState : ItemViewState = {
    filter: {
        slot: undefined,
        search: ''
    },
    sorting: {
        direction: SortDirection.ascending,
        property: 'id'
    },
};

export function itemViewState(state = initialItemViewState, action:any) {
    switch (action.type)
    {
        case STORE_FILTER_SLOT:
            return { ...state, filter: { ...state.filter, slot: action.slot}};
        case STORE_FILTER_SEARCH:
            return { ...state, filter: { ...state.filter, search: action.search}};
        case STORE_SORTING_PROPERTY:
            return { ...state, sorting: { ...state.sorting, priority: action.priority}};
        default:
            return state;
    }
}

export default ItemViewState;
