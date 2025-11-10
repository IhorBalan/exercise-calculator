import { getAuth } from '@/lib/firebase';
import { getUserProfile } from '@/modules/user/api/user.api';
import { useQuery } from '@tanstack/react-query';

export function useUserProfileQuery() {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  return useQuery({
    queryKey: ['USER_PROFILE', currentUser?.uid],
    queryFn: getUserProfile,
    enabled: !!currentUser?.uid,
  });
}
