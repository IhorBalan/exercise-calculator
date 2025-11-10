import { getAuth, getFirestore } from '@/lib/firebase';
import { COLLECTIONS } from '@/modules/core/constants/api.constants';
import { omitUndefinedValues } from '@/modules/core/utils/object.utils';
import type { UserProfile } from '@/modules/user/types/user.types';

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

  const firestoreInstance = getFirestore();
  const userDocRef = firestoreInstance.collection(COLLECTIONS.USERS).doc(user.uid);
  const userDoc = await userDocRef.get();

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
  const userDocRef = firestore.collection(COLLECTIONS.USERS).doc(user.uid);
  const userDoc = await userDocRef.get();

  if (userDoc.exists()) {
    // Update existing document
    await userDocRef.update({
      ...omitUndefinedValues(params),
    });
  } else {
    // Create new document
    await userDocRef.set({
      id: user.uid,
      email: user.email,
      ...omitUndefinedValues(params),
      updatedAt: Date.now(),
      createdAt: Date.now(),
    });
  }

  return getUserProfile();
};
