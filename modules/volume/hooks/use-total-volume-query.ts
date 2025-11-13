import { getTotalUserVolume } from '@/modules/volume/api/volume.api';
import { useQuery } from '@tanstack/react-query';

const TOTAL_VOLUME_QUERY_KEY = 'TOTAL_VOLUME';

export const useTotalVolumeQuery = () => {
  return useQuery({
    queryKey: [TOTAL_VOLUME_QUERY_KEY],
    queryFn: getTotalUserVolume,
  });
};
