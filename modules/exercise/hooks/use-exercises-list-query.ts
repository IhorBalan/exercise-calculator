import { getExercises } from '@/modules/exercise/api/exercise.api';
import { useQuery } from '@tanstack/react-query';

const EXERCISES_LIST_QUERY_KEY = 'EXERCISES_LIST';

export function useExercisesListQuery(muscleGroupId: string) {
  return useQuery({
    queryKey: [EXERCISES_LIST_QUERY_KEY, muscleGroupId],
    queryFn: () => getExercises(muscleGroupId),
    enabled: !!muscleGroupId,
  });
}
