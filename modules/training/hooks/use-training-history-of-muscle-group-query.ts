import { getTrainingHistoryByMuscleGroupId } from '@/modules/training/api/training.api';
import { useQuery } from '@tanstack/react-query';

export const TRAINING_HISTORY_OF_MUSCLE_GROUP_QUERY_KEY = 'TRAINING_HISTORY_OF_MUSCLE_GROUP';

export function useTrainingHistoryOfMuscleGroupQuery(muscleGroupId?: string) {
  return useQuery({
    queryKey: [TRAINING_HISTORY_OF_MUSCLE_GROUP_QUERY_KEY, muscleGroupId],
    queryFn: () => getTrainingHistoryByMuscleGroupId(muscleGroupId),
    enabled: !!muscleGroupId,
  });
}
