import { createSelector } from "reselect";
import { RootState } from "./Reducer";
import { GameType } from "../games";
import { useSelector } from "react-redux";
import { createSlice } from '@reduxjs/toolkit'
export interface SpoilerFilter {
}

// todo: only keep during migration
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
      }
  })

  export const allSpoilerFiltersSelector = createSelector(
    (state:RootState) => state.spoilerReducer,
    spoilerFilter => spoilerFilter
  )


  export const getAllSpoilerFilters = () : SpoilerMap => {
  return useSelector(allSpoilerFiltersSelector);
}

export default spoilerSlice.reducer;
