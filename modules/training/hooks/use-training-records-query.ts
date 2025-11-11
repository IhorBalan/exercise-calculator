import { getTrainingRecordsByMuscleGroupId } from '@/modules/training/api/training.api';
import { useQuery } from '@tanstack/react-query';

const TRAINING_RECORDS_QUERY_KEY = 'TRAINING_RECORDS';

export const useTrainingRecordsQuery = (muscleGroupId?: string) => {
  return useQuery({
    queryKey: [TRAINING_RECORDS_QUERY_KEY, muscleGroupId],
    queryFn: async () => {
      console.log('before muscleGroupId', muscleGroupId);
      const res = await getTrainingRecordsByMuscleGroupId(muscleGroupId);
      console.log('res', res);
      return res;
    },
    enabled: !!muscleGroupId,
  });
};
