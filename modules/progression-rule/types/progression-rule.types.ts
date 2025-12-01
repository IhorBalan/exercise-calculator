type RepsRule = {
  min: number;
  max: number;
  addPerWeek: number;
};

type WeightRule = {
  increment: number;
  priority: 'INCREASE_REPS_FIRST';
};

export type ProgressionRule = {
  id: string;
  muscleGroupId: string;
  exerciseId: string;
  repsRule: RepsRule;
  weightRule: WeightRule;
  createdAt: number;
  updatedAt: number;
};
