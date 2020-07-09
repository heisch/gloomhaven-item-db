import { Store } from 'redux'
import { SoloClassShorthand, ItemViewDisplayType } from "./Types";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './Reducer';

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

const filterLocalStorageKey = 'ItemView:spoilerFilter';

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

export const restoreFromLocalStorage = () => {
    const storage = localStorage.getItem(filterLocalStorageKey);

    const initialSpoilerFilter: SpoilerFilter = {
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

    let spoilerFilter = initialSpoilerFilter;

    if (typeof storage === 'string') {
        const configFromStorage: OldSpoilerFilter = JSON.parse(storage);

        // convert from old object style to array
        if (!configFromStorage.soloClass.hasOwnProperty('length')) {
            const soloClass: Array<SoloClassShorthand> = [];
            Object.keys(configFromStorage.soloClass).forEach(k => {
                if (configFromStorage.soloClass[k] === true) {
                    soloClass.push(k as SoloClassShorthand);
                }
            });
            configFromStorage.soloClass = soloClass;
        }
        // convert from old object style to array
        if (!configFromStorage.item.hasOwnProperty('length')) {
            const items: Array<number> = [];
            Object.keys(configFromStorage.item).forEach(k => {
                if (configFromStorage.item[k] === true) {
                    items.push(parseInt(k));
                }
            });
            configFromStorage.item = items;
        }

        spoilerFilter = Object.assign({}, initialSpoilerFilter, configFromStorage);
    }

    return spoilerFilter;
}

export default SpoilerFilter;