import { useMutation } from '@tanstack/react-query';
import { signInWithEmailAndPassword } from '../api/auth.api';

export function useSignInWithEmailAndPassword() {
  return useMutation({
    mutationFn: signInWithEmailAndPassword,
  });
}
