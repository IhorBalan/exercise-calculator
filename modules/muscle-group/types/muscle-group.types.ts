export type MuscleGroup = {
  id: string;
  name: string;
  emoji: string;
  color: string;
};

export type MuscleGroupWithProgress = MuscleGroup & {
  volume: number;
  growth: number;
};

export type Exercise = {
  id: string;
  name: string;
  muscleGroupId: string;
  description: string;
};
