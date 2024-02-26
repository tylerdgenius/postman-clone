"use client";

import { HomeFeature } from "@/features";
import { persistor, store } from "@/state";
import { ToastContextProvider } from "@/toast/ToastContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function Home() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContextProvider>
          <main>
            <HomeFeature />
          </main>
        </ToastContextProvider>
      </PersistGate>
    </Provider>
  );
}
