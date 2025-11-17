import { getUserGlobalStats } from '@/modules/user/api/user.api';
import { useQuery } from '@tanstack/react-query';

export const USER_GLOBAL_STATS_QUERY_KEY = 'USER_GLOBAL_STATS';

export const useUserGlobalStatsQuery = () => {
  return useQuery({
    queryKey: [USER_GLOBAL_STATS_QUERY_KEY],
    queryFn: getUserGlobalStats,
  });
};
