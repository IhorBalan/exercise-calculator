import { getUser } from '@/modules/user/api/user.api';
import { useQuery } from '@tanstack/react-query';

export function useUserQuery() {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
}
