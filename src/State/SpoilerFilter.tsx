import { createSelector } from "reselect";
import { SoloClassShorthand } from "./Types";
import { RootState } from "./Reducer";
import { GameType } from "../games";
import { useSelector } from "react-redux";
import { createSlice } from '@reduxjs/toolkit'
import { PayloadGameTypeAction } from "./GameTypeAction";
export interface SpoilerFilter {
}

// todo: only keep during migration
export interface OldSpoilerFilter extends SpoilerFilter {
    item: Array<number> | any;
    soloClass: Array<SoloClassShorthand> | any;
}


export const initialSpoilerFilterState:SpoilerFilter = {
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

  const spoilerSlice = createSlice({
      name: "spoilerFilter",
      initialState: initialSpoilerMapState,
      reducers: {
        storeSpoilerFilter(state, action: PayloadGameTypeAction<SpoilerFilter>)
        {
            state[action.payload.gameType] = action.payload.value;
        },
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

  export const allSpoilerFiltersSelector = createSelector(
    (state:RootState) => state.spoilerReducer,
    spoilerFilter => spoilerFilter
  )


  export const getAllSpoilerFilters = () : SpoilerMap => {
  return useSelector(allSpoilerFiltersSelector);
}


export const { storeSpoilerFilter} = spoilerSlice.actions;

export default spoilerSlice.reducer;
