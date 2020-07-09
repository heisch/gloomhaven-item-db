import { SoloClassShorthand, ItemViewDisplayType } from "./Types";

export const STORE_SPOILER_FILTER = 'STORE_SPOILER_FILTER';
export const STORE_PROSPERITY = 'STORE_PROSPERITY';
export const STORE_SOLO_CLASS = 'STORE_SOLO_CLASS'
export const STORE_ITEM = 'STORE_ITEM'
export const STORE_ITEMS_IN_USE = 'STORE_ITEMS_IN_USE'
export const STORE_ALL = 'STORE_ALL'
export const STORE_ENABLE_STORE_STOCK_MANAGEMENT = 'STORE_ENABLE_STORE_STOCK_MANAGEMENT';
export const STORE_DISPLAY_AS = 'STORE_DISPLAY_AS';
export const STORE_DISCOUNT = 'STORE_DISCOUNT';

export function storeSpoilerFilter(spoilerFilter: SpoilerFilter) {
    return { type: STORE_SPOILER_FILTER, spoilerFilter}
}

export function storeProsperity(prosperity: number) {
    return { type: STORE_PROSPERITY, prosperity}
}

export function storeSoloClass(soloClass: Array<SoloClassShorthand>) {
    return { type: STORE_SOLO_CLASS, soloClass}
}

export function storeItem(item:Array<number>) {
    return { type: STORE_ITEM, item}
}

export function storeItemsInUse(itemsInUse:any) {
    return { type: STORE_ITEMS_IN_USE, itemsInUse}
}

export function storeAll(all:boolean) {
    return { type: STORE_ALL, all}
}

export function storeEnableStoreStockManagement(enableStoreStockManagement:boolean) {
    return {type: STORE_ENABLE_STORE_STOCK_MANAGEMENT, enableStoreStockManagement};
}

export function storeDisplayAs(displayAs: string) {
    return {type: STORE_DISPLAY_AS, displayAs};
}

export function storeDiscount(discount: number) {
    return {type: STORE_DISCOUNT, discount};
}

export interface SpoilerFilter {
    all: boolean
    prosperity: number
    item: Array<number>
    itemsInUse: {
        [key: number]: number
    }
    soloClass: Array<SoloClassShorthand>
    discount: number
    displayAs: ItemViewDisplayType
    enableStoreStockManagement: boolean
    lockSpoilerPanel: boolean
}

// todo: only keep during migration
export interface OldSpoilerFilter extends SpoilerFilter {
    item: Array<number> | any
    soloClass: Array<SoloClassShorthand> | any
}


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

export function spoilerFilter(state = initialSpoilerFilterState, action:any) {
    let newState = state;
    switch (action.type)
    {
        case STORE_SPOILER_FILTER:
            newState = action.spoilerFilter;
            break;
        case STORE_PROSPERITY:
            newState = { ...state, prosperity: action.prosperity};
            break;
        case STORE_SOLO_CLASS:
            newState = { ...state, soloClass: action.soloClass};
            break;
        case STORE_ITEM:
            newState = { ...state, item: action.item};
            break;
        case STORE_ITEMS_IN_USE:
            newState = { ...state, itemsInUse: action.itemsInUse};
            break;
        case STORE_ALL:
            newState = { ...state, all: action.all};
            break;
        case STORE_ENABLE_STORE_STOCK_MANAGEMENT:
            newState = {...state, enableStoreStockManagement: action.enableStoreStockManagement};
            break;
        case STORE_DISPLAY_AS:
            newState = {...state, displayAs: action.displayAs};
            break;
        case STORE_DISCOUNT:
            newState = {...state, discount: action.discount};
            break;
        default:
            return state;
    }
    localStorage.setItem('ItemView:spoilerFilter', JSON.stringify(newState));
    return newState;
}

export default SpoilerFilter;