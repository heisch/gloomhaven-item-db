import { ClassesInUse, ItemManagementType, ItemViewDisplayType, PullDownOptions, SoloClassShorthand } from "../../State/Types";

export type ItemsOwnedBy = {
    [key:number] : PullDownOptions[]
  }
  
export type ItemsInUse = {
    [key:number]: number;
  };
export interface FilterOptions {
    all: boolean;
    prosperity: number;
    item: number [];
    itemsInUse: ItemsInUse;
    soloClass: SoloClassShorthand[];
    discount: number;
    displayAs: ItemViewDisplayType;
    itemManagementType: ItemManagementType;
    lockSpoilerPanel: boolean;
    scenarioCompleted: number[]
    classesInUse: ClassesInUse[];
    itemsOwnedBy: ItemsOwnedBy;
}
export const initialFilterOptions : FilterOptions = {
    all: false,
    prosperity: 1,
    item: [],
    itemsInUse: {},
    soloClass: [],
    discount: 0,
    displayAs: ItemViewDisplayType.List,
    itemManagementType: ItemManagementType.None,
    lockSpoilerPanel: false,
    scenarioCompleted: [],
    classesInUse: [],
    itemsOwnedBy: {},
};