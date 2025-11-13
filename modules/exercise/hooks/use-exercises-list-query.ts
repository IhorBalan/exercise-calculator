import { getExercisesByMuscleGroupId } from '@/modules/exercise/api/exercise.api';
import { useQuery } from '@tanstack/react-query';

const EXERCISES_BY_MUSCLE_GROUP_ID_QUERY_KEY = 'EXERCISES_BY_MUSCLE_GROUP_ID';

export function useExercisesListQuery(muscleGroupId: string) {
  return useQuery({
    queryKey: [EXERCISES_BY_MUSCLE_GROUP_ID_QUERY_KEY, muscleGroupId],
    queryFn: () => getExercisesByMuscleGroupId(muscleGroupId),
    enabled: !!muscleGroupId,
  });
}
