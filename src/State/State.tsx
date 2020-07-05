import { GloomhavenItemSlot, SortDirection, SortProperty, GloomhavenItem } from "./Types";

export interface ItemViewState {
    items: Array<GloomhavenItem>
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