import { getTrainingRecordsByMuscleGroupId } from '@/modules/training/api/training.api';
import { useQuery } from '@tanstack/react-query';

export const TRAINING_RECORDS_QUERY_KEY = 'TRAINING_RECORDS';

export const useTrainingRecordsQuery = (muscleGroupId?: string) => {
  return useQuery({
    queryKey: [TRAINING_RECORDS_QUERY_KEY, muscleGroupId],
    queryFn: () => getTrainingRecordsByMuscleGroupId(muscleGroupId),
    enabled: !!muscleGroupId,
  });
};
