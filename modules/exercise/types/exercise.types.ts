export type Exercise = {
  id: string;
  name: string;
  muscleGroupId: string;
  description: string;
  image?: string;
  instructions?: string;
  type: 'BODYWEIGHT_EXERCISE' | 'EQUIPMENT_EXERCISE';
};
