import { getFirestore } from '@/lib/firebase';
import { COLLECTIONS } from '@/modules/core/constants/api.constants';
import { getMuscleGroupById } from '@/modules/muscle-group/api/muscle-group.api';
import { Exercise, MuscleGroup } from '@/modules/muscle-group/types/muscle-group.types';
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
