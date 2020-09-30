import {combineReducers } from "redux";
import spoilerReducer from "./SpoilerFilter"
import itemViewState from "./ItemViewState"

const rootReducer = combineReducers( { itemViewState, spoilerReducer} );

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
