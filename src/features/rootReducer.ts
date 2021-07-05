import { combineReducers } from "@reduxjs/toolkit";
import counterSlice from "./counter";

const reducer = combineReducers({
  counterSlice,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
