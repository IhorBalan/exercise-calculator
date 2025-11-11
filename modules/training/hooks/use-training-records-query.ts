import { getTrainingRecordsByMuscleGroupId } from '@/modules/training/api/training.api';
import { useQuery } from '@tanstack/react-query';

const TRAINING_RECORDS_QUERY_KEY = 'TRAINING_RECORDS';

export const useTrainingRecordsQuery = (muscleGroupId?: string) => {
  console.log('muscleGroupId', muscleGroupId);
  return useQuery({
    queryKey: [TRAINING_RECORDS_QUERY_KEY, muscleGroupId],
    queryFn: () => getTrainingRecordsByMuscleGroupId(muscleGroupId),
    enabled: !!muscleGroupId,
  });
};
