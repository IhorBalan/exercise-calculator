import { getAuth, getFirestore } from '@/lib/firebase';
import { COLLECTIONS } from '@/modules/core/constants/api.constants';
import { omitUndefinedValues } from '@/modules/core/utils/object.utils';
import { Training } from '@/modules/training/types/training.types';
import type { UserProfile } from '@/modules/user/types/user.types';
import { getTrainingsVolume } from '@/modules/volume/utils/volume.utils';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@react-native-firebase/firestore';
import { endOfMonth, startOfMonth } from 'date-fns';

export const getUser = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  return user;
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  const user = getUser();

  if (!user) {
    throw new Error('No user is currently signed in');
  }

  const firestore = getFirestore();
  const userDocRef = doc(firestore, COLLECTIONS.USERS, user.uid);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    return null;
  }

  const data = userDoc.data();

  if (!data) {
    return null;
  }

  return data as UserProfile;
};

export const updateUserProfile = async (
  params: Omit<UserProfile, 'id' | 'email'>
): Promise<UserProfile | null> => {
  const user = getUser();

  if (!user) {
    throw new Error('No user is currently signed in');
  }

  const firestore = getFirestore();
  const userDocRef = doc(firestore, COLLECTIONS.USERS, user.uid);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    // Update existing document
    await updateDoc(userDocRef, {
      ...omitUndefinedValues(params),
    });
  } else {
    // Create new document
    await setDoc(userDocRef, {
      id: user.uid,
      email: user.email,
      ...omitUndefinedValues(params),
      updatedAt: Date.now(),
      createdAt: Date.now(),
    });
  }

  return getUserProfile();
};

type UserGlobalStats = {
  trainings: {
    total: number;
    thisMonth: number;
  };
  volume: {
    total: number;
    avgWeekly: number;
  };
};

export const getUserGlobalStats = async (): Promise<UserGlobalStats> => {
  const user = getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const firestore = getFirestore();

  const trainingRef = collection(firestore, COLLECTIONS.TRAININGS);
  const allTrainingsQuery = query(trainingRef, where('userId', '==', user.uid));
  const allTrainingsSnapshot = await getDocs(allTrainingsQuery);

  const thisMonthTrainingsQuery = query(
    trainingRef,
    where('userId', '==', user.uid),
    where('date', '>=', startOfMonth(new Date()).toISOString()),
    where('date', '<=', endOfMonth(new Date()).toISOString())
  );
  const thisMonthTrainingsSnapshot = await getDocs(thisMonthTrainingsQuery);

  const trainingsTotal = allTrainingsSnapshot.size;
  const trainingsThisMonth = thisMonthTrainingsSnapshot.size;
  const volumeTotal = getTrainingsVolume(
    allTrainingsSnapshot.docs.map((doc: any) => doc.data() as Training)
  );

  return {
    trainings: {
      total: trainingsTotal,
      thisMonth: trainingsThisMonth,
    },
    volume: {
      total: volumeTotal,
      avgWeekly: 0,
    },
  };
};
