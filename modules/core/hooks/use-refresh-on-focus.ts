import { useFocusEffect } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

/**
 * Hook to refetch queries when a screen comes into focus
 * Skips the first focus (initial mount) to avoid duplicate requests
 *
 * @param queryKey - Optional query key to refetch specific queries. If not provided, refetches all stale active queries
 * @example
 * ```tsx
 * // Refetch all stale queries on focus
 * useRefreshOnFocus();
 *
 * // Refetch specific queries on focus
 * useRefreshOnFocus(['workouts']);
 * ```
 */
export function useRefreshOnFocus(queryKey?: string[]) {
  const queryClient = useQueryClient();
  const firstTimeRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      // Refetch stale active queries
      queryClient.refetchQueries({
        queryKey,
        stale: true,
        type: 'active',
      });
    }, [queryClient, queryKey])
  );
}
