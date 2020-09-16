import { createSelector } from "reselect";
import { SoloClassShorthand, ItemViewDisplayType } from "./Types";
import { RootState } from "./Reducer";
import memoize from 'lodash.memoize'
import { GameType } from "../games";
import { useGame } from "../components/Game/GameProvider";
import { useSelector } from "react-redux";

export const STORE_SPOILER_FILTER = 'STORE_SPOILER_FILTER';
export const STORE_PROSPERITY = 'STORE_PROSPERITY';
export const STORE_SOLO_CLASS = 'STORE_SOLO_CLASS'
export const STORE_SCENARIO_COMPLETED = 'STORE_SCENARIO_COMPLETED'
export const STORE_ITEM = 'STORE_ITEM'
export const STORE_ITEMS_IN_USE = 'STORE_ITEMS_IN_USE'
export const STORE_ALL = 'STORE_ALL'
export const STORE_ENABLE_STORE_STOCK_MANAGEMENT = 'STORE_ENABLE_STORE_STOCK_MANAGEMENT';
export const STORE_DISPLAY_AS = 'STORE_DISPLAY_AS';
export const STORE_DISCOUNT = 'STORE_DISCOUNT';

export function storeSpoilerFilter(spoilerFilter: SpoilerFilter, gameType:GameType) {
    return { type: STORE_SPOILER_FILTER, spoilerFilter, gameType}
}

export function storeProsperity(prosperity: number, gameType:GameType) {
    return { type: STORE_PROSPERITY, prosperity, gameType}
}

export function storeSoloClass(soloClass: Array<SoloClassShorthand>, gameType:GameType) {
    return { type: STORE_SOLO_CLASS, soloClass, gameType}
}

export function storeScenarioCompleted(scenarioCompleted: Array<number>, gameType:GameType) {
    return { type: STORE_SCENARIO_COMPLETED, scenarioCompleted, gameType}
}

export function storeItem(item:Array<number>, gameType:GameType) {
    return { type: STORE_ITEM, item, gameType}
}

export function storeItemsInUse(itemsInUse:any, gameType:GameType) {
    return { type: STORE_ITEMS_IN_USE, itemsInUse, gameType}
}

export function storeAll(all:boolean, gameType:GameType) {
    return { type: STORE_ALL, all, gameType}
}

export function storeEnableStoreStockManagement(enableStoreStockManagement:boolean, gameType:GameType) {
    return {type: STORE_ENABLE_STORE_STOCK_MANAGEMENT, enableStoreStockManagement, gameType};
}

export function storeDisplayAs(displayAs: string, gameType:GameType) {
    return {type: STORE_DISPLAY_AS, displayAs, gameType};
}

export function storeDiscount(discount: number, gameType:GameType) {
    return {type: STORE_DISCOUNT, discount, gameType};
}

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
    scenarioCompleted: Array<number>
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
    scenarioCompleted: [],
};

export type SpoilerMap = {
    [K in GameType]?: SpoilerFilter;
  };

const initialSpoilerMapState = Object.values(GameType).reduce(
    (acc, value: GameType) => {
      acc[value] = initialSpoilerFilterState;
      return acc;
    },
    {} as SpoilerMap,
  );


export function spoilerFilter(state = initialSpoilerMapState, action:any) {
    switch (action.type)
    {
        case STORE_SPOILER_FILTER:
            return {...state, [action.gameType] : action.spoilerFilter};
        case STORE_PROSPERITY:
            return { ...state, [action.gameType] : {...state[action.gameType as GameType], prosperity: action.prosperity}};
        case STORE_SOLO_CLASS:
            return { ...state, [action.gameType] : {...state[action.gameType as GameType], soloClass: action.soloClass}};
        case STORE_SCENARIO_COMPLETED:
            return { ...state, [action.gameType] : {...state[action.gameType as GameType], scenarioCompleted: action.scenarioCompleted}};
        case STORE_ITEM:
            return { ...state, [action.gameType] : {...state[action.gameType as GameType], item: action.item}};
        case STORE_ITEMS_IN_USE:
            return { ...state, [action.gameType] : {...state[action.gameType as GameType], itemsInUse: action.itemsInUse}};
        case STORE_ALL:
            return { ...state, [action.gameType] : {...state[action.gameType as GameType], all: action.all}};
        case STORE_ENABLE_STORE_STOCK_MANAGEMENT:
            return {...state, [action.gameType] : {...state[action.gameType as GameType], enableStoreStockManagement: action.enableStoreStockManagement}};
        case STORE_DISPLAY_AS:
            return {...state, [action.gameType] : {...state[action.gameType as GameType], displayAs: action.displayAs}};
        case STORE_DISCOUNT:
            return {...state, [action.gameType] : {...state[action.gameType as GameType], discount: action.discount}};
        default:
            return state;
    }
}

export const restoreFromLocalStorage = (filterLocalStorageKey:string) => {
    const storage = localStorage.getItem(filterLocalStorageKey);

    let spoilerFilter = initialSpoilerFilterState;

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

        spoilerFilter = Object.assign({}, initialSpoilerFilterState, configFromStorage);
    }

    return spoilerFilter;
}

export const spoilerFilterSelector = createSelector(
    (state:RootState) => state.spoilerFilter,
    spoilerFilter => memoize(
      (type:GameType) => {
          if (spoilerFilter[type] === undefined)
          {
              throw new Error("Wrong type");
          }
          return spoilerFilter[type] as SpoilerFilter;
      }
    )
  )

  export const getSpoilerFilter = () : SpoilerFilter => {
      const {key} = useGame();
    return useSelector(spoilerFilterSelector)(key);
  }

export default SpoilerFilter;
