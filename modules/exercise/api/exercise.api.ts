import { getFirestore } from '@/lib/firebase';
import { COLLECTIONS } from '@/modules/core/constants/api.constants';
import { commonExercises } from '@/modules/exercise/data/common-exercises';
import { Exercise } from '@/modules/exercise/types/exercise.types';
import { getMuscleGroupById } from '@/modules/muscle-group/api/muscle-group.api';
import { type MuscleGroup } from '@/modules/muscle-group/types/muscle-group.types';
import { getUser } from '@/modules/user/api/user.api';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from '@react-native-firebase/firestore';

export type ExercisesPageResult = {
  exercises: (Exercise & { muscleGroup: MuscleGroup })[];
  lastDocId: string | null;
  lastDocName: string | null;
  hasMore: boolean;
};

// TODO: Using firebase query is not efficient as there is no easy way to event search for a substring.
// We should use other appoach like mongodb which has a lot more options.
// The problem however is that we can run node on device so we won't be able to use it.
// Anyway I think we will need to revise this, but for now it seems to be working.
export const getExercisesByQuery = async (
  searchQuery: string,
  limitCount: number = 20,
  lastDocId: string | null = null,
  lastDocName: string | null = null
): Promise<ExercisesPageResult> => {
  const user = getUser();

  if (!user) {
    throw new Error('User not found');
  }
  const firestore = getFirestore();
  const exercisesRef = collection(firestore, COLLECTIONS.EXERCISES);

  let q;
  if (searchQuery.trim() === '') {
    // If no search query, get all exercises with limit and order by name
    if (lastDocId) {
      // Get the last document to use as cursor
      const lastDocRef = doc(exercisesRef, lastDocId);
      const lastDocSnap = await getDoc(lastDocRef);
      if (lastDocSnap.exists()) {
        q = query(exercisesRef, orderBy('name'), startAfter(lastDocSnap), limit(limitCount));
      } else {
        q = query(exercisesRef, orderBy('name'), limit(limitCount));
      }
    } else {
      q = query(exercisesRef, orderBy('name'), limit(limitCount));
    }
  } else {
    // If there's a search query, fetch ALL exercises and filter client-side
    // Firestore doesn't support substring/contains queries, so for a reasonable
    // dataset size (50-200 exercises), fetching all is actually efficient
    // and allows proper substring matching anywhere in the name
    if (lastDocId) {
      // For pagination with search, continue from where we left off
      const lastDocRef = doc(exercisesRef, lastDocId);
      const lastDocSnap = await getDoc(lastDocRef);
      if (lastDocSnap.exists()) {
        q = query(exercisesRef, orderBy('name'), startAfter(lastDocSnap));
      } else {
        q = query(exercisesRef, orderBy('name'));
      }
    } else {
      // First page: fetch all exercises ordered by name
      q = query(exercisesRef, orderBy('name'));
    }
  }

  const snapshot = await getDocs(q);
  let exercises = snapshot.docs.map((docSnapshot: any) => ({
    ...docSnapshot.data(),
    id: docSnapshot.id,
  })) as Exercise[];

  // Filter client-side for partial name matches (case-insensitive)
  if (searchQuery.trim() !== '') {
    const normalizedSearch = searchQuery.toLowerCase().trim();
    exercises = exercises.filter(exercise =>
      exercise.name?.toLowerCase().includes(normalizedSearch)
    );
    // Apply pagination after filtering
    const startIndex = lastDocId ? exercises.findIndex(e => e.id === lastDocId) + 1 : 0;
    exercises = exercises.slice(startIndex, startIndex + limitCount);
  } else {
    // No search: apply normal pagination
    exercises = exercises.slice(0, limitCount);
  }

  const result: (Exercise & { muscleGroup: MuscleGroup })[] = [];

  for (const exercise of exercises) {
    const muscleGroup = await getMuscleGroupById(exercise.muscleGroupId);

    if (muscleGroup) {
      result.push({ ...exercise, muscleGroup });
    }
  }

  // For search queries, we need to check if we fetched the full batch
  // If we did and filtered results are less than limit, there might be more
  const fetchedFullBatch =
    snapshot.docs.length >=
    (searchQuery.trim() !== '' ? Math.max(limitCount * 5, 100) : limitCount);
  const lastDocument = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;
  const finalLastDocId = lastDocument?.id ?? null;
  const finalLastDocName = lastDocument?.data()?.name ?? null;

  // For search: hasMore if we fetched full batch (might have more matches)
  // For no search: hasMore if we got exactly the limit
  const hasMore =
    searchQuery.trim() !== ''
      ? fetchedFullBatch && result.length === limitCount
      : snapshot.docs.length === limitCount;

  return {
    exercises: result,
    lastDocId: finalLastDocId,
    lastDocName: finalLastDocName,
    hasMore,
  };
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

export const seedExercises = async (): Promise<{
  added: number;
  skipped: number;
  failed: number;
  total: number;
}> => {
  const user = getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const firestore = getFirestore();
  const exercisesRef = collection(firestore, COLLECTIONS.EXERCISES);
  const muscleGroupsRef = collection(firestore, COLLECTIONS.MUSCLE_GROUPS);

  // Get all muscle groups from the database
  const muscleGroupsSnapshot = await getDocs(muscleGroupsRef);
  const muscleGroups = muscleGroupsSnapshot.docs.map(
    (docSnapshot: any) => docSnapshot.data() as MuscleGroup
  );

  // Create a mapping of muscle group name (case-insensitive) to ID
  const muscleGroupMap = new Map<string, string>();
  for (const muscleGroup of muscleGroups) {
    const normalizedName = muscleGroup.name.toLowerCase().trim();
    muscleGroupMap.set(normalizedName, muscleGroup.id);
  }

  // Get all existing exercises to check for duplicates
  const existingExercisesSnapshot = await getDocs(exercisesRef);
  const existingExercises = existingExercisesSnapshot.docs.map(
    (docSnapshot: any) => docSnapshot.data() as Exercise
  );

  // Create a set of existing exercise names (case-insensitive for comparison)
  const existingExerciseNames = new Set(
    existingExercises.map((exercise: Exercise) => exercise.name.toLowerCase().trim())
  );

  let added = 0;
  let skipped = 0;
  let failed = 0;

  // Add exercises that don't already exist
  for (const exerciseSeed of commonExercises) {
    const normalizedName = exerciseSeed.name.toLowerCase().trim();

    // Skip if exercise already exists
    if (existingExerciseNames.has(normalizedName)) {
      skipped++;
      continue;
    }

    // Look up muscle group by name (case-insensitive)
    const normalizedMuscleGroupName = exerciseSeed.muscleGroupName.toLowerCase().trim();
    const muscleGroupId = muscleGroupMap.get(normalizedMuscleGroupName);

    // Skip if muscle group not found
    if (!muscleGroupId) {
      failed++;
      console.warn(
        `Muscle group "${exerciseSeed.muscleGroupName}" not found for exercise "${exerciseSeed.name}"`
      );
      continue;
    }

    // Create the exercise object with the resolved muscle group ID (without id field)
    const exerciseData = {
      name: exerciseSeed.name,
      muscleGroupId,
      description: exerciseSeed.description,
      instructions: exerciseSeed.instructions,
      type: exerciseSeed.type,
    };

    // Add the exercise to Firestore - Firestore will auto-generate the document ID
    const docRef = await addDoc(exercisesRef, exerciseData);

    // Update the document with the generated ID as a field
    const exerciseDoc = doc(firestore, COLLECTIONS.EXERCISES, docRef.id);
    await updateDoc(exerciseDoc, { id: docRef.id });

    // Update the set to prevent duplicates in the same batch
    existingExerciseNames.add(normalizedName);
    added++;
  }

  return {
    added,
    skipped,
    failed,
    total: commonExercises.length,
  };
};
