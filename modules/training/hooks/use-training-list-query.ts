import { getTrainings, GetTrainingsParams } from '@/modules/training/api/training.api';
import { useQuery } from '@tanstack/react-query';
export const TRAINING_LIST_QUERY_KEY = 'TRAINING_LIST';

export const useTrainingListQuery = (params: GetTrainingsParams) => {
  return useQuery({
    queryKey: [TRAINING_LIST_QUERY_KEY, params],
    queryFn: () => getTrainings(params),
  });
};
