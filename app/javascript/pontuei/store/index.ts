/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storageSession from "redux-persist/lib/storage/session";

import customerReducer from "features/customer/customerSlice";
import companyReducer from "features/company/companySlice";
import transactionReducer from "features/transaction/transactionSlice";
import productReducer from "features/product/productSlice";
import notificationReducer from "features/notification/notificationSlice";

export const persistKey = process.env.REACT_APP_STORAGE_ROOT_KEY as string;

const persistConfig = {
  key: persistKey,
  version: 1,
  storage: storageSession,
};

const reducers = combineReducers({
  company: companyReducer,
  customer: customerReducer,
  transaction: transactionReducer,
  product: productReducer,
  notification: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
