"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import UserProvider from "@/context/user.provider";
// import UserProvider from "@/src/context/user.provider";

export interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        {children}
        <Toaster />
      </UserProvider>
    </QueryClientProvider>
  );
}
