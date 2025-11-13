import { getFirestore } from '@/lib/firebase';
import { COLLECTIONS } from '@/modules/core/constants/api.constants';
import { Exercise } from '@/modules/exercise/types/exercise.types';
import { getMuscleGroupById } from '@/modules/muscle-group/api/muscle-group.api';
import { MuscleGroup } from '@/modules/muscle-group/types/muscle-group.types';
import { getUser } from '@/modules/user/api/user.api';
import { collection, doc, getDoc, getDocs, query, where } from '@react-native-firebase/firestore';

export const getExercisesByQuery = async (
  searchQuery: string
): Promise<(Exercise & { muscleGroup: MuscleGroup })[]> => {
  const user = getUser();

  if (!user) {
    throw new Error('User not found');
  }
  const firestore = getFirestore();
  const exercisesRef = collection(firestore, COLLECTIONS.EXERCISES);
  const q = query(
    exercisesRef,
    where('name', '>=', searchQuery),
    where('name', '<=', searchQuery + '\uf8ff')
  );
  const snapshot = await getDocs(q);
  const exercises = snapshot.docs.map((docSnapshot: any) => docSnapshot.data() as Exercise);

  const result: (Exercise & { muscleGroup: MuscleGroup })[] = [];

  for (const exercise of exercises) {
    const muscleGroup = await getMuscleGroupById(exercise.muscleGroupId);

    if (muscleGroup) {
      result.push({ ...exercise, muscleGroup });
    }
  }

  return result;
};

export const getExerciseById = async (
  exerciseId: string
): Promise<(Exercise & { muscleGroup: MuscleGroup }) | null> => {
  const firestore = getFirestore();
  const exerciseRef = doc(firestore, COLLECTIONS.EXERCISES, exerciseId);
  const snapshot = await getDoc(exerciseRef);

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  if (!data) {
    throw new Error('Exercise not found');
  }

  const muscleGroup = await getMuscleGroupById(data?.muscleGroupId);

  if (!muscleGroup) {
    throw new Error('Muscle group not found');
  }

  return { ...data, muscleGroup } as Exercise & { muscleGroup: MuscleGroup };
};

export const getExercisesByMuscleGroupId = async (muscleGroupId: string): Promise<Exercise[]> => {
  const user = getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const firestore = getFirestore();
  const exercisesRef = collection(firestore, COLLECTIONS.EXERCISES);
  const q = query(exercisesRef, where('muscleGroupId', '==', muscleGroupId));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnapshot: any) => docSnapshot.data() as Exercise);
};
