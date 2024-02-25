import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import { thunk } from "redux-thunk";

export const storeGenerator = () => {
  let store;
  let persistor;

  const combinedReducers = combineReducers({});

  store = configureStore({
    reducer: combinedReducers,
    middleware: (gdm) => gdm().concat(thunk),
  });

  persistor = persistStore(store);

  if (typeof window === "undefined") {
    const persistConfig = {
      key: "app-poster",
      storage,
      blacklist: [],
    };

    const persistedReducer = persistReducer(persistConfig, combinedReducers);

    store = configureStore({
      reducer: persistedReducer,
      middleware: (gdm) => gdm().concat(thunk),
    });

    persistor = persistStore(store);
  }

  return { store, persistor };
};

export const store = storeGenerator().store;
export const persistor = storeGenerator().persistor;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
