import {combineReducers } from "redux";
import {spoilerFilter} from "./SpoilerFilter"
import {itemViewState} from "./ItemViewState"

const dbApp = combineReducers( { itemViewState, spoilerFilter} );

export default dbApp;
