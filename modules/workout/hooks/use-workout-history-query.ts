import type { WorkoutHistory } from '@/modules/muscle-group/components/workout-history-card';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

// Mock workout history data - would be fetched from API based on muscle group
const mockWorkoutHistoryByMuscleGroup: Record<string, WorkoutHistory[]> = {
  '1': [
    {
      date: 'Nov 8, 2025',
      exerciseCount: 3,
      exercises: [
        { name: 'Bench Press', volume: '2,880 kg', sets: 4, reps: 8, weight: '90 kg' },
        { name: 'Incline Press', volume: '2,100 kg', sets: 3, reps: 10, weight: '70 kg' },
        { name: 'Cable Crossover', volume: '900 kg', sets: 3, reps: 12, weight: '25 kg' },
      ],
    },
    {
      date: 'Nov 5, 2025',
      exerciseCount: 2,
      exercises: [
        { name: 'Bench Press', volume: '1,500 kg', sets: 3, reps: 5, weight: '100 kg' },
        { name: 'Dumbbell Fly', volume: '1,080 kg', sets: 3, reps: 12, weight: '30 kg' },
      ],
    },
    {
      date: 'Nov 3, 2025',
      exerciseCount: 2,
      exercises: [
        { name: 'Incline Press', volume: '2,560 kg', sets: 4, reps: 8, weight: '80 kg' },
        { name: 'Push-ups', volume: '0 kg', sets: 3, reps: 20, weight: 'Bodyweight' },
      ],
    },
  ],
  '2': [
    {
      date: 'Nov 7, 2025',
      exerciseCount: 2,
      exercises: [
        { name: 'Deadlift', volume: '3,200 kg', sets: 4, reps: 5, weight: '160 kg' },
        { name: 'Pull-ups', volume: '0 kg', sets: 3, reps: 10, weight: 'Bodyweight' },
      ],
    },
  ],
};

const fetchWorkoutHistory = async (muscleGroupId?: string): Promise<WorkoutHistory[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  if (!muscleGroupId) {
    return [];
  }

  return mockWorkoutHistoryByMuscleGroup[muscleGroupId] || [];
};

const WORKOUT_HISTORY_QUERY_KEY = 'WORKOUT_HISTORY';

export function useWorkoutHistoryQuery(muscleGroupId?: string) {
  console.log('useWorkoutHistoryQuery', muscleGroupId);
  return useQuery({
    queryKey: [WORKOUT_HISTORY_QUERY_KEY, muscleGroupId],
    queryFn: () => fetchWorkoutHistory(muscleGroupId),
    enabled: !!muscleGroupId, // Only fetch if muscleGroupId is provided
    // Keep previous data while loading new data (for smooth transitions)
    placeholderData: keepPreviousData,
    // Keep data fresh for 5 minutes (matches global config)
    staleTime: 1000 * 60 * 5,
    // Keep unused data in cache for 24 hours (matches global config for persistence)
    gcTime: 1000 * 60 * 60 * 24,
    // Retry on failure (will use cached data if offline)
    retry: 1,
    // Use cached data when offline or on error
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
}
