import {combineReducers } from "redux";

import { ItemViewState } from "./State";
import { SortDirection } from "./Types";
import { STORE_ITEMS, STORE_PROSPERITY, STORE_IMPORT_MODAL_OPEN, STORE_SPOILER_FILTER, STORE_FILTER_SLOT, STORE_SORTING_PROPERTY, STORE_FILTER_SEARCH, STORE_SHARE_LOCK_SPOILER_PANEL } from "./Actions";

const initialState : ItemViewState = {
    items: [],
    spoilerFilter: {
        all: false,
        prosperity: 1,
        item: [],
        itemsInUse: {},
        soloClass: [],
        discount: 0,
        displayAs: 'list',
        enableStoreStockManagement: false,
        lockSpoilerPanel: false,
    },
    filter: {
        slot: undefined,
        search: ''
    },
    sorting: {
        direction: SortDirection.ascending,
        property: 'id'
    },
    importModalOpen: false,
    shareLockSpoilerPanel: false
};

function stateReducer(state = initialState, action:any) {
    switch (action.type)
    {
        case STORE_ITEMS:
            return { ...state, items: action.items};
        case STORE_FILTER_SLOT:
            return { ...state, filter: { ...state.filter, slot: action.slot}};
        case STORE_FILTER_SEARCH:
            return { ...state, filter: { ...state.filter, search: action.search}};
        case STORE_SORTING_PROPERTY:
            return { ...state, sorting: { ...state.sorting, priority: action.priority}};
        case STORE_PROSPERITY:
            return { ...state, prosperity: action.properity};
        case STORE_IMPORT_MODAL_OPEN:
            return { ...state, importModalOpen: action.importModalOpen};
        case STORE_SPOILER_FILTER:
            return { ...state, spoilerFilter: action.spoilerFilter};
        case STORE_SHARE_LOCK_SPOILER_PANEL:
            return { ...state, shareLockSpoilerPanel: action.shareLockSpoilerPanel};
        default:
            return state;
    }
}

const dbApp = combineReducers( { stateReducer} );

export default dbApp;
