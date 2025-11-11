import { getFirestore } from '@/lib/firebase';
import { COLLECTIONS } from '@/modules/core/constants/api.constants';
import { type Exercise, type MuscleGroup } from '@/modules/muscle-group/types/muscle-group.types';

export const getMuscleGroups = async (): Promise<MuscleGroup[]> => {
  const firestore = getFirestore();
  const muscleGroupsRef = firestore.collection(COLLECTIONS.MUSCLE_GROUPS);
  const snapshot = await muscleGroupsRef.get();

  return snapshot.docs.map(doc => doc.data() as MuscleGroup);
};

export const getExercises = async (muscleGroupId: string): Promise<Exercise[]> => {
  const firestore = getFirestore();
  const exercisesRef = firestore.collection(COLLECTIONS.EXERCISES);
  const snapshot = await exercisesRef.where('muscleGroupId', '==', muscleGroupId).get();

  return snapshot.docs.map(doc => doc.data() as Exercise);
};

export const getExerciseById = async (exerciseId: string): Promise<Exercise> => {
  const firestore = getFirestore();
  const exerciseRef = firestore.collection(COLLECTIONS.EXERCISES).doc(exerciseId);
  const snapshot = await exerciseRef.get();

  return snapshot.data() as Exercise;
};
