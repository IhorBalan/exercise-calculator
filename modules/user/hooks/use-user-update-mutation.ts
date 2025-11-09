import { useMutation } from '@tanstack/react-query';
import { updateUser } from '@/modules/user/api/user.api';

export function useUserUpdateMutation() {
  return useMutation({
    mutationFn: updateUser,
  });
}
