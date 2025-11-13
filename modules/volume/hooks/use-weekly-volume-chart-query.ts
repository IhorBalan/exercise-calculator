import { getWeeklyVolumeChartData } from '@/modules/volume/api/volume.api';
import { useQuery } from '@tanstack/react-query';

const WEEKLY_VOLUME_CHART_QUERY_KEY = 'WEEKLY_VOLUME_CHART';

export const useWeeklyVolumeChartQuery = () => {
  return useQuery({
    queryKey: [WEEKLY_VOLUME_CHART_QUERY_KEY],
    queryFn: getWeeklyVolumeChartData,
  });
};
