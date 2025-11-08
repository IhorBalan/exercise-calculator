import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient } from '@tanstack/react-query';
import type { PersistedClient, Persister } from '@tanstack/react-query-persist-client';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

// Create a client with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: how long data is considered fresh (5 minutes)
      staleTime: 1000 * 60 * 5,
      // Cache time: how long unused data stays in cache (24 hours for persistence)
      gcTime: 1000 * 60 * 60 * 24,
      // Retry failed requests
      retry: 1,
      // Refetch on window focus (handled by React Native AppState)
      refetchOnWindowFocus: false,
      // Use cached data when offline
      networkMode: 'offlineFirst',
    },
    mutations: {
      // Retry failed mutations
      retry: 1,
    },
  },
});

// Create custom AsyncStorage persister
const asyncStoragePersister: Persister = {
  persistClient: async (client: PersistedClient) => {
    try {
      await AsyncStorage.setItem('REACT_QUERY_OFFLINE_CACHE', JSON.stringify(client));
    } catch (error) {
      console.error('Error persisting query client:', error);
    }
  },
  restoreClient: async (): Promise<PersistedClient | undefined> => {
    try {
      const cached = await AsyncStorage.getItem('REACT_QUERY_OFFLINE_CACHE');
      if (cached) {
        return JSON.parse(cached) as PersistedClient;
      }
    } catch (error) {
      console.error('Error restoring query client:', error);
    }
    return undefined;
  },
  removeClient: async () => {
    try {
      await AsyncStorage.removeItem('REACT_QUERY_OFFLINE_CACHE');
    } catch (error) {
      console.error('Error removing query client:', error);
    }
  },
};

// Persist query client to AsyncStorage
persistQueryClient({
  queryClient,
  persister: asyncStoragePersister,
  // Maximum age of cache (7 days)
  maxAge: 1000 * 60 * 60 * 24 * 7,
  // Dehydrate options - what to persist
  dehydrateOptions: {
    // Only persist successful queries
    shouldDehydrateQuery: query => {
      return query.state.status === 'success';
    },
  },
});
