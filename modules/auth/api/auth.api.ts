import { getAuth } from '@/lib/firebase';
import { signInWithEmailAndPassword as firebaseSignIn } from '@react-native-firebase/auth';

type SignInWithEmailAndPasswordParams = {
  email: string;
  password: string;
};

export const signInWithEmailAndPassword = async (params: SignInWithEmailAndPasswordParams) => {
  const auth = getAuth();
  const userCredential = await firebaseSignIn(auth, params.email, params.password);

  return userCredential;
};
