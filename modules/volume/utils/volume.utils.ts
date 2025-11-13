import type { Training } from '@/modules/training/types/training.types';

export const getTrainingVolume = (training: Training): number => {
  return Math.max(training.weight, 1) * training.sets * training.reps;
};

export const getTrainingsVolume = (trainings: Training[]): number => {
  return trainings.reduce((acc, training) => acc + getTrainingVolume(training), 0);
};
