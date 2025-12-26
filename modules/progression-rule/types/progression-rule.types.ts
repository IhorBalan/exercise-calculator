type RepsRule = {
  increment: number;
  min: number;
  max: number;
};

type WeightRule = {
  increment: number;
  min: number;
  max: number;
};

type SetsRule = {
  min: number;
  max: number;
};

export type ProgressionRule = {
  id: string;
  muscleGroupId: string;
  exerciseId: string;
  repsRule: RepsRule;
  weightRule: WeightRule;
  setsRule: SetsRule;
  createdAt: number;
  updatedAt: number;
};
