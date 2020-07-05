import { SpoilerFilter } from "./SpoilerFilter"; 
import { GloomhavenItem, GloomhavenItemSlot, SortProperty } from "./Types";

export const STORE_ITEMS = 'STORE_ITEMS';
export const STORE_FILTER_SLOT = 'STORE_FILTER_SLOT';
export const STORE_FILTER_SEARCH = 'STORE_FILTER_SEARCH';
export const STORE_SORTING_PROPERTY = 'STORE_SORTING_PROPERTY'
export const STORE_PROSPERITY = 'STORE_PROPERITY';
export const STORE_IMPORT_MODAL_OPEN = 'STORE_IMPORT_MODAL_OPEN';
export const STORE_SPOILER_FILTER = 'STORE_SPOILER_FILTER';
export const STORE_SHARE_LOCK_SPOILER_PANEL = 'STORE_SHARE_LOCK_SPOILER_PANEL';

export function storeItems(items: Array<GloomhavenItem>) {
    return { type: STORE_ITEMS, items}
}

export function storeFilterSlot(slot?: GloomhavenItemSlot) {
    return { type: STORE_FILTER_SLOT, slot}
}

export function storeFilterSearch(search: string) {
    return { type: STORE_FILTER_SEARCH, search}
}

export function storeSortingProperty(property: SortProperty) {
    return { type: STORE_FILTER_SLOT, property}
}

export function storeProsperity(prosperity: number) {
    return { type: STORE_PROSPERITY, prosperity}
}

export function storeImportModalOpen(importModalOpen: boolean) {
    return { type: STORE_IMPORT_MODAL_OPEN, importModalOpen}
}

export function storeSpoilerFilter(spoilerFilter: SpoilerFilter) {
    return { type: STORE_SPOILER_FILTER, spoilerFilter}
}

export function storeShareLockSpoilerPanel(shareLockSpoilerPanel: boolean) {
    return { type: STORE_SHARE_LOCK_SPOILER_PANEL, shareLockSpoilerPanel}
}