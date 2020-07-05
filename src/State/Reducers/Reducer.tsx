import {combineReducers } from "redux";
import spoilerFilterReducer from "./SpoilerFilterReducer"
import itemViewStateReducer from "./ItemViewReducer"

const dbApp = combineReducers( { itemViewState:itemViewStateReducer, spoilerFilter: spoilerFilterReducer} );

export default dbApp;
