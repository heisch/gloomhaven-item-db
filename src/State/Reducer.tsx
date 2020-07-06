import {combineReducers } from "redux";
import {spoilerFilter} from "./SpoilerFilter"
import {itemViewState} from "./ItemViewState"

const rootReducer = combineReducers( { itemViewState, spoilerFilter} );

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
