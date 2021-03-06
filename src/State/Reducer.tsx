import {combineReducers } from "redux";
import spoilerReducer from "./SpoilerFilter"

const rootReducer = combineReducers( { spoilerReducer} );

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
