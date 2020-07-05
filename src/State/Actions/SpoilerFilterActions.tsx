import { SpoilerFilter } from "../SpoilerFilter"; 
import { SoloClassShorthand } from "../Types";

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

