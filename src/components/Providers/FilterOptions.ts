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
    soloClass: ClassesInUse[];
    discount: number;
    displayAs: ItemViewDisplayType;
    itemManagementType: ItemManagementType;
    scenarioCompleted: number[]
    classesInUse: ClassesInUse[];
    itemsOwnedBy: ItemsOwnedBy;
    envelopeX: boolean;
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
    scenarioCompleted: [],
    classesInUse: [],
    itemsOwnedBy: {},
    envelopeX: false
};

export interface OldFilterOptions extends FilterOptions {
    item: Array<number> | any;
    soloClass: Array<SoloClassShorthand> | any;
}
