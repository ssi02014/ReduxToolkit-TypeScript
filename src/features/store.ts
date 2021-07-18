import {
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import reducer from "./rootReducer";
import storage from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";

const { logger } = require("redux-logger");

const persistConfig = {
  key: "root",
  storage,
};

const middleware = [...getDefaultMiddleware(), logger];

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
