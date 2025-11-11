import { getMuscleGroups } from '@/modules/muscle-group/api/muscle-group.api';
import { useQuery } from '@tanstack/react-query';

const MUSCLE_GROUP_LIST_QUERY_KEY = 'MUSCLE_GROUP_LIST';

export function useMuscleGroupListQuery() {
  return useQuery({
    queryKey: [MUSCLE_GROUP_LIST_QUERY_KEY],
    queryFn: getMuscleGroups,
  });
}
