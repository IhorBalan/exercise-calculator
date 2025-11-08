import { useQuery } from '@tanstack/react-query';
import { MuscleGroupWithProgress } from '../types/muscle-group.types';

const mockMuscleGroups: MuscleGroupWithProgress[] = [
  { id: '1', name: 'Chest', emoji: '💪', volume: 4200, growth: 0.08, color: 'bg-blue-50' },
  { id: '2', name: 'Back', emoji: '🏋️', volume: 5800, growth: 0.07, color: 'bg-emerald-50' },
  { id: '3', name: 'Shoulders', emoji: '🎯', volume: 2900, growth: 0.07, color: 'bg-purple-50' },
  { id: '4', name: 'Legs', emoji: '🦵', volume: 7200, growth: 0.06, color: 'bg-amber-50' },
  { id: '5', name: 'Arms', emoji: '💪', volume: 3100, growth: 0.09, color: 'bg-pink-50' },
  { id: '6', name: 'Core', emoji: '⭐', volume: 1900, growth: 0.09, color: 'bg-cyan-50' },
];

const fetchMuscleGroups = async (): Promise<MuscleGroupWithProgress[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockMuscleGroups;
};

const MUSCLE_GROUP_LIST_QUERY_KEY = 'MUSCLE_GROUP_LIST';

export function useMuscleGroupListQuery() {
  return useQuery({
    queryKey: [MUSCLE_GROUP_LIST_QUERY_KEY],
    queryFn: fetchMuscleGroups,
  });
}
