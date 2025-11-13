import { getFirestore } from '@/lib/firebase';
import { COLLECTIONS } from '@/modules/core/constants/api.constants';
import { getExerciseById } from '@/modules/exercise/api/exercise.api';
import { type Exercise } from '@/modules/exercise/types/exercise.types';
import { type Training } from '@/modules/training/types/training.types';
import { getUser } from '@/modules/user/api/user.api';
import { getTrainingVolume } from '@/modules/volume/utils/volume.utils';
import { addDoc, collection, getDocs, query, where } from '@react-native-firebase/firestore';

export const createTraining = async (
  training: Omit<Training, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
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

export const getTrainingHistoryByMuscleGroupId = async (
  muscleGroupId?: string
): Promise<(Training & { exercise: Exercise })[]> => {
  const trainings = await getTrainingsByMuscleGroupId(muscleGroupId);

  const result: (Training & { exercise: Exercise })[] = [];

  for (let index = 0; index < trainings.length; index++) {
    const training = trainings[index];

    const exercise = await getExerciseById(training.exercienseId);

    if (exercise) {
      result.push({ ...training, exercise });
    }
  }

  return result;
};

export const getTrainingRecordsByMuscleGroupId = async (
  muscleGroupId?: string
): Promise<(Training & { exercise: Exercise })[]> => {
  const trainings = await getTrainingsByMuscleGroupId(muscleGroupId);

  const records: Record<string, Training> = {};

  for (let index = 0; index < trainings.length; index++) {
    const training = trainings[index];

    if (records[training.exercienseId]) {
      if (getTrainingVolume(records[training.exercienseId]) < getTrainingVolume(training)) {
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

type GetTrainingsParams = {
  startDate: string;
  endDate: string;
};

export const getTrainings = async ({
  startDate,
  endDate,
}: GetTrainingsParams): Promise<Training[]> => {
  const user = getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const firestore = getFirestore();
  const trainingRef = collection(firestore, COLLECTIONS.TRAININGS);
  const q = query(trainingRef, where('date', '>=', startDate), where('date', '<=', endDate));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnapshot: any) => docSnapshot.data() as Training);
};

export const getAllTrainings = async (): Promise<Training[]> => {
  return getTrainings({
    startDate: new Date('2025-01-01').toISOString(),
    endDate: new Date().toISOString(),
  });
};
