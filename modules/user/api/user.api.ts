import { getAuth, getFirestore } from '@/lib/firebase';
import { COLLECTIONS } from '@/modules/core/constants/api.constants';
import { omitUndefinedValues } from '@/modules/core/utils/object.utils';
import type { UserProfile } from '@/modules/user/types/user.types';
import { doc, getDoc, setDoc, updateDoc } from '@react-native-firebase/firestore';

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
