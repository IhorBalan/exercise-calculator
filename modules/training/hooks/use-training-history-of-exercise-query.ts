import { getTrainingHistoryOfExerciseQuery } from '@/modules/training/api/training.api';
import { useQuery } from '@tanstack/react-query';

export const TRAINING_HISTORY_OF_EXERCISE_QUERY_KEY = 'TRAINING_HISTORY_OF_EXERCISE';

export const useTrainingHistoryOfExerciseQuery = (exerciseId?: string) => {
  return useQuery({
    queryKey: [TRAINING_HISTORY_OF_EXERCISE_QUERY_KEY, exerciseId],
    queryFn: () => getTrainingHistoryOfExerciseQuery(exerciseId),
    enabled: !!exerciseId,
  });
};
