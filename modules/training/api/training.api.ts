import { getFirestore } from '@/lib/firebase';
import { COLLECTIONS } from '@/modules/core/constants/api.constants';
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
