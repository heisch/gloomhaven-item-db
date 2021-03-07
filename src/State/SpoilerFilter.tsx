import { createSelector } from "reselect";
import { SoloClassShorthand, ItemViewDisplayType, ClassesInUse, PullDownOptions, ItemManagementType } from "./Types";
import { RootState } from "./Reducer";
import memoize from 'lodash.memoize'
import { GameType } from "../games";
import { useGame } from "../components/Game/GameProvider";
import { useSelector } from "react-redux";
import { createSlice } from '@reduxjs/toolkit'
import { PayloadGameTypeAction } from "./GameTypeAction";

  export type ItemsOwnedBy = {
    [key:number] : PullDownOptions[]
  }

export interface SpoilerFilter {
    itemsOwnedBy: ItemsOwnedBy;
}

// todo: only keep during migration
export interface OldSpoilerFilter extends SpoilerFilter {
    item: Array<number> | any;
    soloClass: Array<SoloClassShorthand> | any;
}


export const initialSpoilerFilterState:SpoilerFilter = {
    itemsOwnedBy: {}
};

export type ItemOwnerData = {
    itemId: number;
    owner:PullDownOptions;
}

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

  const spoilerSlice = createSlice({
      name: "spoilerFilter",
      initialState: initialSpoilerMapState,
      reducers: {
        storeSpoilerFilter(state, action: PayloadGameTypeAction<SpoilerFilter>)
        {
            state[action.payload.gameType] = action.payload.value;
        },
        addItemOwner(state, action: PayloadGameTypeAction<ItemOwnerData>) {
            const gameState = state[action.payload.gameType]; 
            if (gameState) {
                if (!gameState.itemsOwnedBy[action.payload.value.itemId]) {
                    gameState.itemsOwnedBy[action.payload.value.itemId] = [];
                }
                gameState.itemsOwnedBy[action.payload.value.itemId].push(action.payload.value.owner);
            } 
        },
        removeItemOwner(state, action: PayloadGameTypeAction<ItemOwnerData>) {
            const gameState = state[action.payload.gameType]; 
            if (gameState) {
                if (!gameState.itemsOwnedBy[action.payload.value.itemId]) {
                    gameState.itemsOwnedBy[action.payload.value.itemId] = [];
                }
                const index = gameState.itemsOwnedBy[action.payload.value.itemId].findIndex( c => c === action.payload.value.owner);
                if (index != -1) {
                    gameState.itemsOwnedBy[action.payload.value.itemId].splice(index, 1);
                }
            } 
        }
      }
  })


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
    (state:RootState) => state.spoilerReducer,
    spoilerFilter => memoize(
      (type:GameType) => {
        const state = spoilerFilter[type];
        if (state === undefined)
          {
              throw new Error("Wrong type");
          }
          return state as SpoilerFilter;
      }
    )
  )

  export const getSpoilerFilter = () : SpoilerFilter => {
      const {gameType} = useGame();
    return useSelector(spoilerFilterSelector)(gameType);
  }

  export const allSpoilerFiltersSelector = createSelector(
    (state:RootState) => state.spoilerReducer,
    spoilerFilter => spoilerFilter
  )


  export const getAllSpoilerFilters = () : SpoilerMap => {
  return useSelector(allSpoilerFiltersSelector);
}


export const { addItemOwner, removeItemOwner, storeSpoilerFilter} = spoilerSlice.actions;

export default spoilerSlice.reducer;
