"use client";

import * as React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        {children}
        <Toaster />
      </Provider>
    </PersistGate>
  );
}
