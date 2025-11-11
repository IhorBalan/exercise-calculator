import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  getFirestore,
} from '@react-native-firebase/firestore';
import { COLLECTIONS } from '@/modules/core/constants/api.constants';
import { type Exercise, type MuscleGroup } from '@/modules/muscle-group/types/muscle-group.types';

export const getMuscleGroups = async (): Promise<MuscleGroup[]> => {
  const firestore = getFirestore();
  const muscleGroupsRef = collection(firestore, COLLECTIONS.MUSCLE_GROUPS);
  const snapshot = await getDocs(muscleGroupsRef);

  return snapshot.docs.map((docSnapshot: any) => docSnapshot.data() as MuscleGroup);
};

export const getExercises = async (muscleGroupId: string): Promise<Exercise[]> => {
  const firestore = getFirestore();
  const exercisesRef = collection(firestore, COLLECTIONS.EXERCISES);
  const q = query(exercisesRef, where('muscleGroupId', '==', muscleGroupId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnapshot: any) => docSnapshot.data() as Exercise);
};

export const getExerciseById = async (exerciseId: string): Promise<Exercise | null> => {
  const firestore = getFirestore();
  const exerciseRef = doc(firestore, COLLECTIONS.EXERCISES, exerciseId);
  const snapshot = await getDoc(exerciseRef);

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();
  return data ? (data as Exercise) : null;
};
