import { getFirestore } from '@/lib/firebase';
import { COLLECTIONS } from '@/modules/core/constants/api.constants';
import { getExerciseById } from '@/modules/exercise/api/exercise.api';
import { type Exercise } from '@/modules/exercise/types/exercise.types';
import { type Training } from '@/modules/training/types/training.types';
import { getUser } from '@/modules/user/api/user.api';
import { getTrainingVolume } from '@/modules/volume/utils/volume.utils';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from '@react-native-firebase/firestore';

export const createTraining = async (
  training: Omit<Training, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
): Promise<{
  id: string;
}> => {
  const user = getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const firestore = getFirestore();
  const trainingRef = collection(firestore, COLLECTIONS.TRAININGS);

  const res = await addDoc(trainingRef, {
    ...training,
    userId: user.uid,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  return {
    id: res.id,
  };
};

export const getTrainingById = async (trainingId?: string): Promise<Training> => {
  if (!trainingId) {
    throw new Error('Training ID is required');
  }

  const user = getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const firestore = getFirestore();
  const trainingRef = doc(firestore, COLLECTIONS.TRAININGS, trainingId);
  const trainingDoc = await getDoc(trainingRef);

  if (!trainingDoc.exists()) {
    throw new Error('Training not found');
  }

  return trainingDoc.data() as Training;
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

export const getTrainingHistoryOfExerciseQuery = async (
  exerciseId?: string
): Promise<Training[]> => {
  const user = getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const firestore = getFirestore();
  const trainingRef = collection(firestore, COLLECTIONS.TRAININGS);
  const q = query(
    trainingRef,
    where('exercienseId', '==', exerciseId),
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
      if (getTrainingVolume(records[training.exercienseId]) < getTrainingVolume(training)) {
        records[training.exercienseId] = training;
      }
    } else {
      records[training.exercienseId] = training;
    }
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
  const q = query(
    trainingRef,
    where('userId', '==', user.uid),
    where('date', '>=', startDate),
    where('date', '<=', endDate)
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnapshot: any) => docSnapshot.data() as Training);
};

export const getAllTrainings = async (): Promise<Training[]> => {
  return getTrainings({
    startDate: new Date('2025-01-01').toISOString(),
    endDate: new Date().toISOString(),
  });
};

export const getTrainingsByExerciseId = async (exerciseId: string): Promise<Training[]> => {
  const user = getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const firestore = getFirestore();
  const trainingRef = collection(firestore, COLLECTIONS.TRAININGS);
  const q = query(
    trainingRef,
    where('exercienseId', '==', exerciseId),
    where('userId', '==', user.uid)
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnapshot: any) => docSnapshot.data() as Training);
};

export const isNewRecord = async (
  newTraining: Omit<Training, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
): Promise<boolean> => {
  const existingTrainings = await getTrainingsByExerciseId(newTraining.exercienseId);
  const newVolume = getTrainingVolume(newTraining as Training);

  if (existingTrainings.length === 0) {
    return true; // First training for this exercise is always a record
  }

  const maxExistingVolume = Math.max(
    ...existingTrainings.map(training => getTrainingVolume(training))
  );

  return newVolume > maxExistingVolume;
};

export const getIsTrainingRecord = async (trainingId: string): Promise<boolean> => {
  const user = getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const firestore = getFirestore();
  const trainingCollectionRef = collection(firestore, COLLECTIONS.TRAININGS);

  const trainingRef = doc(trainingCollectionRef, trainingId);
  const trainingDoc = await getDoc(trainingRef);

  if (!trainingDoc.exists()) {
    throw new Error('Training not found');
  }

  const training = trainingDoc.data() as Training;

  const trainingsQuery = query(
    trainingCollectionRef,
    where('exercienseId', '==', training.exercienseId),
    where('userId', '==', user.uid)
  );
  const snapshot = await getDocs(trainingsQuery);

  const trainings = snapshot.docs
    .filter((docSnapshot: any) => docSnapshot.id !== trainingDoc.id)
    .map((docSnapshot: any) => docSnapshot.data() as Training);

  if (trainings.length === 0) {
    return true;
  }

  return (
    getTrainingVolume(training) > Math.max(...trainings.map((t: Training) => getTrainingVolume(t)))
  );
};
