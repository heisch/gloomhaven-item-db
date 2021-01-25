import { GloomhavenItemSlot, SortDirection, SortProperty } from "./Types";
import { GameType } from "../games";
import { createSelector } from "reselect";
import { RootState } from "./Reducer";
import memoize from 'lodash.memoize'
import { useGame } from "../components/Game/GameProvider";
import { useSelector } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadGameTypeAction } from "./GameTypeAction";

export interface ItemViewState {
    slots?: Array<GloomhavenItemSlot>;
    search: string;
    direction: SortDirection;
    property: SortProperty;
}

const initialItemViewState : ItemViewState = {
    slots: undefined,
    search: '',
    direction: SortDirection.ascending,
    property: 'id'
};

export type ItemViewStateMap = {
    [K in GameType]?: ItemViewState;
  };

const initialItemViewStateMapState = Object.values(GameType).reduce(
    (acc, value: GameType) => {
      acc[value] = initialItemViewState;
      return acc;
    },
    {} as ItemViewStateMap,
  );

const itemViewStateSlice = createSlice({
    name: "itemViewState",
    initialState: initialItemViewStateMapState,
    reducers: {
      storeItemViewState(state, action: PayloadGameTypeAction<ItemViewState>)
      {
          state[action.payload.gameType] = action.payload.value;
      },
      storeFilterSearch(state, action: PayloadGameTypeAction<string>){
          const gameState = state[action.payload.gameType]; 
          if (gameState) {
              gameState.search = action.payload.value;
         } 
      },
      storeSortingProperty(state, action: PayloadGameTypeAction<SortProperty>){
          const gameState = state[action.payload.gameType]; 
          if (gameState) {
              gameState.property = action.payload.value;
         } 
      },
      storeSortingDirection(state, action: PayloadGameTypeAction<SortDirection>){
          const gameState = state[action.payload.gameType]; 
          if (gameState) {
              gameState.direction = action.payload.value;
         } 
      },
      storeFilterSlots(state, action: PayloadGameTypeAction<Array<GloomhavenItemSlot>|undefined>){
        const gameState = state[action.payload.gameType]; 
        if (gameState) {
            gameState.slots = action.payload.value;
       } 
    },
  }
})


export const itemViewStateSelector = createSelector(
    (state:RootState) => state.itemViewState,
    itemViewState => memoize(
      (type:GameType) => {
          const state = itemViewState[type];

          if (state === undefined)
          {
              throw new Error("Wrong type");
          }
          return state as ItemViewState;
      }
    )
  )

  export const getItemViewState = () : ItemViewState => {
      const {gameType} = useGame();
    return useSelector(itemViewStateSelector)(gameType);
  }

export const { storeFilterSearch, storeSortingDirection, storeFilterSlots, storeSortingProperty, storeItemViewState } = itemViewStateSlice.actions;

export default itemViewStateSlice.reducer;
