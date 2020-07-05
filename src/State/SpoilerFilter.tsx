import { SoloClassShorthand, ItemViewDisplayType } from "./Types";

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