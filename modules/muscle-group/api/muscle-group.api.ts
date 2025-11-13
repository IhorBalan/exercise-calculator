import { COLLECTIONS } from '@/modules/core/constants/api.constants';
import { type MuscleGroup } from '@/modules/muscle-group/types/muscle-group.types';
import { getWeeklyVolumeByMuscleGroupId } from '@/modules/volume/api/volume.api';
import { collection, doc, getDoc, getDocs, getFirestore } from '@react-native-firebase/firestore';

export const getMuscleGroupsDetails = async (): Promise<
  (MuscleGroup & { volume: number; improvementPercentage: number })[]
> => {
  const firestore = getFirestore();
  const muscleGroupsRef = collection(firestore, COLLECTIONS.MUSCLE_GROUPS);
  const snapshot = await getDocs(muscleGroupsRef);

  const muscleGroups = snapshot.docs.map((docSnapshot: any) => docSnapshot.data() as MuscleGroup);

  const result: (MuscleGroup & { volume: number; improvementPercentage: number })[] = [];

  for (const muscleGroup of muscleGroups) {
    const { volume, improvementPercentage } = await getWeeklyVolumeByMuscleGroupId(muscleGroup.id);
    result.push({ ...muscleGroup, volume, improvementPercentage });
  }

  return result;
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
