import { WeeklyVolumeData, getWeeklyVolumeData } from '@/modules/volume/api/volume.api';
import { useQuery } from '@tanstack/react-query';

const WEEKLY_VOLUME_QUERY_KEY = 'WEEKLY_VOLUME';

export const useWeeklyVolumeQuery = () => {
  return useQuery<WeeklyVolumeData[]>({
    queryKey: [WEEKLY_VOLUME_QUERY_KEY],
    queryFn: getWeeklyVolumeData,
  });
};
