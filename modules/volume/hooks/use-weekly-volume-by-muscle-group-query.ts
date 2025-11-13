import {
  getWeeklyVolumeChartByMuscleGroupId,
  WeeklyVolumeData,
} from '@/modules/volume/api/volume.api';
import { useQuery } from '@tanstack/react-query';

const WEEKLY_VOLUME_BY_MUSCLE_GROUP_QUERY_KEY = 'WEEKLY_VOLUME_BY_MUSCLE_GROUP';

export const useWeeklyVolumeByMuscleGroupQuery = (muscleGroupId: string) => {
  return useQuery<WeeklyVolumeData[]>({
    queryKey: [WEEKLY_VOLUME_BY_MUSCLE_GROUP_QUERY_KEY, muscleGroupId],
    queryFn: () => getWeeklyVolumeChartByMuscleGroupId(muscleGroupId),
    enabled: !!muscleGroupId,
  });
};
