export type WorkoutSession = {
  id: string;
  reps: number;
  weight: number;
};

export type Training = {
  id: string;
  muscleGroupId: string;
  exercienseId: string;
  sessions?: WorkoutSession[];
  date: string;
  userId: string;
  createdAt: number;
  updatedAt: number;
};
