import { QueryClient } from '@tanstack/react-query';

// Create a client with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: how long data is considered fresh (5 minutes)
      staleTime: 1000 * 60 * 5,
      // Cache time: how long unused data stays in cache (10 minutes)
      gcTime: 1000 * 60 * 10,
      // Retry failed requests
      retry: 1,
      // Refetch on window focus (handled by React Native AppState)
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Retry failed mutations
      retry: 1,
    },
  },
});
