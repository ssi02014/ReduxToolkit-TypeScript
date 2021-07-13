import { combineReducers } from "@reduxjs/toolkit";
import counterSlice from "./counter";
import todoReducer from "./todos";

const reducer = combineReducers({
  counterSlice,
  todoReducer,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
