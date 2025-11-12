import { COLLECTIONS } from '@/modules/core/constants/api.constants';
import { type MuscleGroup } from '@/modules/muscle-group/types/muscle-group.types';
import { collection, doc, getDoc, getDocs, getFirestore } from '@react-native-firebase/firestore';

export const getMuscleGroups = async (): Promise<MuscleGroup[]> => {
  const firestore = getFirestore();
  const muscleGroupsRef = collection(firestore, COLLECTIONS.MUSCLE_GROUPS);
  const snapshot = await getDocs(muscleGroupsRef);

  return snapshot.docs.map((docSnapshot: any) => docSnapshot.data() as MuscleGroup);
};

export const getMuscleGroupById = async (muscleGroupId: string): Promise<MuscleGroup | null> => {
  const firestore = getFirestore();
  const muscleGroupRef = doc(firestore, COLLECTIONS.MUSCLE_GROUPS, muscleGroupId);
  const snapshot = await getDoc(muscleGroupRef);

  if (!snapshot.exists()) {
    throw new Error(`Muscle group with id ${muscleGroupId} not found`);
  }

  return snapshot.data() as MuscleGroup;
};
