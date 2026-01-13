import { getExercisesByQuery, type ExercisesPageResult } from '@/modules/exercise/api/exercise.api';
import { useInfiniteQuery } from '@tanstack/react-query';

const EXERCISES_SEARCH_QUERY_KEY = 'EXERCISES_SEARCH';

type PageParam = {
  lastDocId: string;
  lastDocName: string;
} | null;

export const useExercisesSearchQuery = (searchQuery: string, limitCount: number = 20) => {
  return useInfiniteQuery<ExercisesPageResult, Error>({
    queryKey: [EXERCISES_SEARCH_QUERY_KEY, searchQuery, limitCount],
    queryFn: ({ pageParam }) => {
      const cursor = pageParam as PageParam;
      return getExercisesByQuery(
        searchQuery,
        limitCount,
        cursor?.lastDocId ?? null,
        cursor?.lastDocName ?? null
      );
    },
    initialPageParam: null as PageParam,
    getNextPageParam: lastPage => {
      if (lastPage.hasMore && lastPage.lastDocId && lastPage.lastDocName) {
        return {
          lastDocId: lastPage.lastDocId,
          lastDocName: lastPage.lastDocName,
        };
      }
      return undefined;
    },
    enabled: typeof searchQuery === 'string',
  });
};
