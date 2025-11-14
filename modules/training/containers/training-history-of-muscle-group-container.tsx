import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { Exercise } from '@/modules/exercise/types/exercise.types';
import { WorkoutHistoryCard } from '@/modules/muscle-group/components/workout-history-card';
import { WorkoutHistoryEmptyState } from '@/modules/training/components/workout-history-empty-state';
import { useTrainingHistoryOfMuscleGroupQuery } from '@/modules/training/hooks/use-training-history-of-muscle-group-query';
import { Training } from '@/modules/training/types/training.types';
import { startOfDay } from 'date-fns';
import { useMemo } from 'react';

export interface WorkoutHistoryContainerProps {
  muscleGroupId?: string;
  className?: string;
}

export function WorkoutHistoryContainer({
  muscleGroupId,
  className = 'px-4 mb-24',
}: WorkoutHistoryContainerProps) {
  const { data: trainings = [], isLoading } = useTrainingHistoryOfMuscleGroupQuery(muscleGroupId);

  const trainingHistory = useMemo(
    () =>
      trainings.reduce(
        (acc, training) => {
          const date = startOfDay(training.date).toISOString();

          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(training);
          acc[date].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          return acc;
        },
        {} as Record<string, (Training & { exercise: Exercise })[]>
      ),
    [trainings]
  );
  return (
    <View className={className}>
      <View className="flex-row items-center gap-2 mb-4">
        <Ionicons name="time-outline" size={20} color="#d946ef" />
        <Text className="text-slate-900 text-base tracking-tight">Training History</Text>
      </View>

      {isLoading ? (
        <View className="bg-white p-8 rounded-3xl shadow-sm items-center justify-center">
          <Text className="text-slate-500 text-sm mt-3">Loading workout history...</Text>
        </View>
      ) : trainings.length === 0 ? (
        <WorkoutHistoryEmptyState />
      ) : (
        <View className="gap-4">
          {Object.entries(trainingHistory)
            .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
            .map(([date, trainings], trainingIndex) => (
              <WorkoutHistoryCard
                key={trainingIndex}
                date={date}
                trainingCount={trainings.length}
                trainings={trainings}
              />
            ))}
        </View>
      )}
    </View>
  );
}
