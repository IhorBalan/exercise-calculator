import { getAuth } from '@/lib/firebase';
import { updateProfile } from '@react-native-firebase/auth';

export const getUser = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  return user;
};

type UpdateUserParams = {
  displayName?: string | null;
  photoURL?: string | null;
};

export const updateUser = async (params: UpdateUserParams) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('No user is currently signed in');
  }

  await updateProfile(currentUser, params);

  return currentUser;
};
