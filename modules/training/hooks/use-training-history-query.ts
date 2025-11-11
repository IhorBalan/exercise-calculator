import { getTrainingsByMuscleGroupId } from '@/modules/training/api/training.api';
import { useQuery } from '@tanstack/react-query';

const TRAINING_HISTORY_QUERY_KEY = 'TRAINING_HISTORY';

export function useTrainingHistoryQuery(muscleGroupId?: string) {
  return useQuery({
    queryKey: [TRAINING_HISTORY_QUERY_KEY, muscleGroupId],
    queryFn: () => getTrainingsByMuscleGroupId(muscleGroupId),
    enabled: !!muscleGroupId,
  });
}
