import { getFirestore } from '@/lib/firebase';
import { COLLECTIONS } from '@/modules/core/constants/api.constants';
import { getExerciseById } from '@/modules/muscle-group/api/muscle-group.api';
import { type Exercise } from '@/modules/muscle-group/types/muscle-group.types';
import { type Training } from '@/modules/training/types/training.types';
import { getUser } from '@/modules/user/api/user.api';
import { addDoc, collection, getDocs, query, where } from '@react-native-firebase/firestore';

export const createTraining = async (
  training: Omit<Training, 'id' | 'createdAt' | 'updatedAt'>
) => {
  const user = getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const firestore = getFirestore();
  const trainingRef = collection(firestore, COLLECTIONS.TRAININGS);

  await addDoc(trainingRef, {
    ...training,
    userId: user.uid,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
};

export const getTrainingsByMuscleGroupId = async (muscleGroupId?: string): Promise<Training[]> => {
  const user = getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const firestore = getFirestore();
  const trainingRef = collection(firestore, COLLECTIONS.TRAININGS);
  const q = query(
    trainingRef,
    where('muscleGroupId', '==', muscleGroupId),
    where('userId', '==', user.uid)
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnapshot: any) => docSnapshot.data() as Training);
};

export const getTrainingRecordsByMuscleGroupId = async (
  muscleGroupId?: string
): Promise<(Training & { exercise: Exercise })[]> => {
  const trainings = await getTrainingsByMuscleGroupId(muscleGroupId);

  const records: Record<string, Training> = {};

  for (let index = 0; index < trainings.length; index++) {
    const training = trainings[index];

    if (records[training.exercienseId]) {
      if (records[training.exercienseId].weight < training.weight) {
        records[training.exercienseId] = training;
      }
    } else {
      records[training.exercienseId] = training;
    }

    console.log('training', training);
  }

  const result: (Training & { exercise: Exercise })[] = [];

  for (const record of Object.values(records)) {
    const exercise = await getExerciseById(record.exercienseId);

    if (exercise) {
      result.push({ ...record, exercise });
    }
  }

  return result;
};
