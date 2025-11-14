import { getTrainingById } from '@/modules/training/api/training.api';
import { useQuery } from '@tanstack/react-query';

const TRAINING_BY_ID_QUERY_KEY = 'TRAINING_BY_ID';

export const useTrainingByIdQuery = (trainingId?: string) => {
  return useQuery({
    queryKey: [TRAINING_BY_ID_QUERY_KEY, trainingId],
    queryFn: () => getTrainingById(trainingId),
    enabled: !!trainingId,
  });
};
