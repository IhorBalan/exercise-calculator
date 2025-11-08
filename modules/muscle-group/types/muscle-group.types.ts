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
