import { getExerciseById } from '@/modules/exercise/api/exercise.api';
import { Exercise, MuscleGroup } from '@/modules/muscle-group/types/muscle-group.types';
import { useQuery } from '@tanstack/react-query';

const EXERCISE_BY_ID_QUERY_KEY = 'EXERCISE_BY_ID';

export const useExerciseByIdQuery = (exerciseId: string) => {
  return useQuery<(Exercise & { muscleGroup: MuscleGroup }) | null>({
    queryKey: [EXERCISE_BY_ID_QUERY_KEY, exerciseId],
    queryFn: () => getExerciseById(exerciseId),
    enabled: !!exerciseId,
  });
};
