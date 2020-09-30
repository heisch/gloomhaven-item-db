import { GloomhavenItemSlot, SortDirection, SortProperty } from "./Types";
import { GameType } from "../games";
import { createSelector } from "reselect";
import { RootState } from "./Reducer";
import memoize from 'lodash.memoize'
import { useGame } from "../components/Game/GameProvider";
import { useSelector } from "react-redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameTypeAction } from "./GameTypeAction";

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
      storeItemViewState(state, action: PayloadAction<GameTypeAction<ItemViewState>>)
      {
          state[action.payload.gameType] = action.payload.value;
      },
      storeFilterSearch(state, action: PayloadAction<GameTypeAction<string>>) {
          const gameState = state[action.payload.gameType]; 
          if (gameState) {
              gameState.search = action.payload.value;
          } 
      },
      storeSortingProperty(state, action: PayloadAction<GameTypeAction<SortProperty>>) {
          const gameState = state[action.payload.gameType]; 
          if (gameState) {
              gameState.property = action.payload.value;
          } 
      },
      storeSortingDirection(state, action: PayloadAction<GameTypeAction<SortDirection>>) {
          const gameState = state[action.payload.gameType]; 
          if (gameState) {
              gameState.direction = action.payload.value;
          } 
      },
      storeFilterSlots(state, action: PayloadAction<GameTypeAction<Array<GloomhavenItemSlot>|undefined>>) {
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
      const {key} = useGame();
    return useSelector(itemViewStateSelector)(key);
  }

export const { storeFilterSearch, storeSortingDirection, storeFilterSlots, storeSortingProperty, storeItemViewState } = itemViewStateSlice.actions;

export default itemViewStateSlice.reducer;
