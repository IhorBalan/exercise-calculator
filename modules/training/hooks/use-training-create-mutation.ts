import { createTraining } from '@/modules/training/api/training.api';
import { useMutation } from '@tanstack/react-query';

export const useTrainingCreateMutation = () => {
  return useMutation({
    mutationFn: createTraining,
  });
};
