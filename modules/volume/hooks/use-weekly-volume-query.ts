import { getWeeklyVolume } from '@/modules/volume/api/volume.api';
import { useQuery } from '@tanstack/react-query';

export const WEEKLY_VOLUME_QUERY_KEY = 'WEEKLY_VOLUME';

export const useWeeklyVolumeQuery = () => {
  return useQuery({
    queryKey: [WEEKLY_VOLUME_QUERY_KEY],
    queryFn: getWeeklyVolume,
  });
};
