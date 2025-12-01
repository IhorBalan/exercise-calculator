import { deleteTraining } from '@/modules/training/api/training.api';
import { useMutation } from '@tanstack/react-query';

export const useTrainingDeleteMutation = () => {
  return useMutation<boolean, Error, string>({
    mutationFn: deleteTraining,
  });
};
