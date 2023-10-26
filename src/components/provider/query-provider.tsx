"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 1000 * 60,
        cacheTime: 5 * 1000 * 60,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
