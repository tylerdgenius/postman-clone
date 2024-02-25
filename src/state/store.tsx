import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import { thunk } from "redux-thunk";
import { apiPostSliceReducer } from "./reducers";

const storeGenerator = () => {
  let store;

  const combinedReducers = combineReducers({
    apiPostSliceReducer,
  });

  const isClient = typeof window !== "undefined";

  if (isClient) {
    const persistConfig = {
      key: "root",
      storage,
      blacklist: [],
    };

    const persistedReducer = persistReducer(persistConfig, combinedReducers);

    store = configureStore({
      reducer: persistedReducer,
      middleware: (gdm) =>
        gdm({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }).concat(thunk),
    });

    const persistor = persistStore(store);

    return { store, persistor };
  }

  store = configureStore({
    reducer: combinedReducers,
    middleware: (gdm) =>
      gdm({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(thunk),
  });

  const persistor = persistStore(store);

  return { store, persistor };
};

export const store = storeGenerator().store;
export const persistor = storeGenerator().persistor;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
