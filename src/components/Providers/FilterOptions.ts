export interface FilterOptions {
    all: boolean;
    prosperity: number;
    // item: Array<number>;
    // itemsInUse: ItemsInUse;
    // soloClass: Array<SoloClassShorthand>;
    discount: number;
    // displayAs: ItemViewDisplayType;
    // itemManagementType: ItemManagementType;
    // lockSpoilerPanel: boolean;
    // scenarioCompleted: Array<number>;
    // classesInUse: ClassesInUse[];
    // itemsOwnedBy: ItemsOwnedBy;
}
export const initialFilterOptions : FilterOptions = {
    all: false,
    prosperity: 1,
    // item: Array<number>,
    // itemsInUse: ItemsInUse,
    // soloClass: Array<SoloClassShorthand>,
    discount: 0,
    // displayAs: ItemViewDisplayType,
    // itemManagementType: ItemManagementType,
    // lockSpoilerPanel: boolean,
    // scenarioCompleted: Array<number>,
    // classesInUse: ClassesInUse[],
    // itemsOwnedBy: ItemsOwnedBy,

};