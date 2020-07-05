import { SpoilerFilter } from "../SpoilerFilter";
import { STORE_SPOILER_FILTER, STORE_PROSPERITY, STORE_SOLO_CLASS, STORE_ITEM, STORE_ITEMS_IN_USE, STORE_ALL, STORE_ENABLE_STORE_STOCK_MANAGEMENT, STORE_DISPLAY_AS, STORE_DISCOUNT } from "../Actions/SpoilerFilterActions";

const initialSpoilerFilterState:SpoilerFilter = {
    all: false,
    prosperity: 1,
    item: [],
    itemsInUse: {},
    soloClass: [],
    discount: 0,
    displayAs: 'list',
    enableStoreStockManagement: false,
    lockSpoilerPanel: false,
};

function spoilerFilter(state = initialSpoilerFilterState, action:any) {
    switch (action.type)
    {
        case STORE_SPOILER_FILTER:
            return action.spoilerFilter;
        case STORE_PROSPERITY:
            return { ...state, prosperity: action.prosperity};
        case STORE_SOLO_CLASS:
            return { ...state, soloClass: action.soloClass};
        case STORE_ITEM:
            return { ...state, item: action.item};
        case STORE_ITEMS_IN_USE:
            return { ...state, itemsInUse: action.itemsInUse};
        case STORE_ALL:
            return { ...state, all: action.all};
        case STORE_ENABLE_STORE_STOCK_MANAGEMENT:
            return {...state, enableStoreStockManagement: action.enableStoreStockManagement};
        case STORE_DISPLAY_AS:
            return {...state, displayAs: action.displayAs};
        case STORE_DISCOUNT:
            return {...state, discount: action.discount};
        default:
            return state;
    }    
}

export default spoilerFilter;
