import { GloomhavenItem, GloomhavenItemSlot, SortProperty } from "../Types";

export const STORE_ITEMS = 'STORE_ITEMS';
export const STORE_FILTER_SLOT = 'STORE_FILTER_SLOT';
export const STORE_FILTER_SEARCH = 'STORE_FILTER_SEARCH';
export const STORE_SORTING_PROPERTY = 'STORE_SORTING_PROPERTY'
export const STORE_IMPORT_MODAL_OPEN = 'STORE_IMPORT_MODAL_OPEN';
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

export function storeImportModalOpen(importModalOpen: boolean) {
    return { type: STORE_IMPORT_MODAL_OPEN, importModalOpen}
}


export function storeShareLockSpoilerPanel(shareLockSpoilerPanel: boolean) {
    return { type: STORE_SHARE_LOCK_SPOILER_PANEL, shareLockSpoilerPanel}
}