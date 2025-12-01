export type WorkoutSession = {
  id: string;
  reps: number;
  weight: number;
};

export type Training = {
  muscleGroupId: string;
  exerciseId: string;
  sessions?: WorkoutSession[];
  date: string;
  userId: string;
  createdAt: number;
  updatedAt: number;
};
