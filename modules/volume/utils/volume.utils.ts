import type { Training } from '@/modules/training/types/training.types';

export const getTrainingVolume = (training: Training): number => {
  if (!training.sessions || training.sessions.length === 0) {
    return 0;
  }

  return training.sessions.reduce((acc, session) => acc + session.weight * session.reps, 0);
};

export const getTrainingsVolume = (trainings: Training[]): number => {
  return trainings.reduce((acc, training) => acc + getTrainingVolume(training), 0);
};
