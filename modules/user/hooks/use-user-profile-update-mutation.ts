import { updateUserProfile } from '@/modules/user/api/user.api';
import { useMutation } from '@tanstack/react-query';

export function useUserProfileUpdateMutation() {
  return useMutation({
    mutationFn: updateUserProfile,
  });
}
