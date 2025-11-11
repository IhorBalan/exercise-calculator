import { getFirestore } from '@/lib/firebase';
import { COLLECTIONS } from '@/modules/core/constants/api.constants';
import { getExerciseById } from '@/modules/muscle-group/api/muscle-group.api';
import { type Exercise } from '@/modules/muscle-group/types/muscle-group.types';
import { type Training } from '@/modules/training/types/training.types';

export const createTraining = async (
  training: Omit<Training, 'id' | 'createdAt' | 'updatedAt'>
) => {
  const firestore = getFirestore();
  const trainingRef = firestore.collection(COLLECTIONS.TRAININGS);

  await trainingRef.add({
    ...training,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
};

export const getTrainingsByMuscleGroupId = async (muscleGroupId?: string): Promise<Training[]> => {
  const firestore = getFirestore();
  const trainingRef = firestore.collection(COLLECTIONS.TRAININGS);
  const snapshot = await trainingRef.where('muscleGroupId', '==', muscleGroupId).get();

  return snapshot.docs.map(doc => doc.data() as Training);
};

export const getTrainingRecordsByMuscleGroupId = async (
  muscleGroupId?: string
): Promise<(Training & { exercise: Exercise })[]> => {
  const trainings = await getTrainingsByMuscleGroupId(muscleGroupId);

  const records: Training[] = [];

  for (let index = 0; index < trainings.length; index++) {
    const training = trainings[index];
    const isRecord = trainings
      .filter(t => t.exercienseId === training.exercienseId)
      .every(t => t.weight < training.weight);

    if (isRecord) {
      records.push(training);
    }
  }

  console.log('records', records);

  const result: (Training & { exercise: Exercise })[] = [];

  for (let index = 0; index < records.length; index++) {
    const record = records[index];
    const exercise = await getExerciseById(record.exercienseId);

    result.push({ ...record, exercise });
  }

  console.log('result', result);

  return result;
};
