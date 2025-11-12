import { getExercisesByQuery } from '@/modules/exercise/api/exercise.api';
import { useQuery } from '@tanstack/react-query';

const EXERCISES_SEARCH_QUERY_KEY = 'EXERCISES_SEARCH';

export const useExercisesSearchQuery = (searchQuery: string) => {
  return useQuery({
    queryKey: [EXERCISES_SEARCH_QUERY_KEY, searchQuery],
    queryFn: () => getExercisesByQuery(searchQuery),
    enabled: typeof searchQuery === 'string',
  });
};
