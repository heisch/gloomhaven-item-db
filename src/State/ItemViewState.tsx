import { GloomhavenItemSlot, SortDirection, SortProperty } from "./Types";
import { GameType } from "../games";
import { createSelector } from "reselect";
import { RootState } from "./Reducer";
import memoize from 'lodash.memoize'
import { useGame } from "../components/Game/GameProvider";
import { useSelector } from "react-redux";

export const STORE_FILTER_SLOTS = 'STORE_FILTER_SLOTS';
export const STORE_FILTER_SEARCH = 'STORE_FILTER_SEARCH';
export const STORE_SORTING_PROPERTY = 'STORE_SORTING_PROPERTY'
export const STORE_SORTING_DIRECTION = 'STORE_SORTING_DIRECTION'

export function storeFilterSlots(slots: Array<GloomhavenItemSlot> | undefined, gameType:GameType) {
    return { type: STORE_FILTER_SLOTS, slots, gameType}
}

export function storeFilterSearch(search: string, gameType:GameType) {
    return { type: STORE_FILTER_SEARCH, search, gameType}
}

export function storeSortingProperty(property: SortProperty, gameType:GameType) {
    return { type: STORE_SORTING_PROPERTY, property, gameType}
}

export function storeSortingDirection(direction: SortDirection, gameType:GameType) {
    return { type: STORE_SORTING_DIRECTION, direction, gameType}
}


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

export function itemViewState(state = initialItemViewStateMapState, action:any) {
    switch (action.type)
    {
        case STORE_FILTER_SLOTS:
            return { ...state, [action.gameType] : {...state[action.gameType as GameType], slots: action.slots}};
        case STORE_FILTER_SEARCH:
            return { ...state, [action.gameType] : {...state[action.gameType as GameType], search: action.search}};
        case STORE_SORTING_PROPERTY:
            return { ...state, [action.gameType] : {...state[action.gameType as GameType], property: action.property}};
        case STORE_SORTING_DIRECTION:
            return { ...state, [action.gameType] : {...state[action.gameType as GameType], direction: action.direction}};
        default:
            return state;
    }
}

export const itemViewStateSelector = createSelector(
    (state:RootState) => state.itemViewState,
    itemViewState => memoize(
      (type:GameType) => {
          if (itemViewState[type] === undefined)
          {
              throw new Error("Wrong type");
          }
          return itemViewState[type] as ItemViewState;
      }
    )
  )

  export const getItemViewState = () : ItemViewState => {
      const {key} = useGame();
    return useSelector(itemViewStateSelector)(key);
  }


export default ItemViewState;
