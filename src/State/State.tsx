import { GloomhavenItemSlot, SortDirection, SortProperty, GloomhavenItem } from "./Types";
import {SpoilerFilter} from "./SpoilerFilter"

export interface ItemViewState {
    items: Array<GloomhavenItem>
    spoilerFilter: SpoilerFilter
    filter: {
        slot?: GloomhavenItemSlot
        search: string
    }
    sorting: {
        direction: SortDirection
        property: SortProperty
    }
    importModalOpen: boolean
    shareLockSpoilerPanel: boolean
}