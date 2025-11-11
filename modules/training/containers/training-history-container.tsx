import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { WorkoutHistoryCard } from '@/modules/muscle-group/components/workout-history-card';
import { Training } from '@/modules/training/types/training.types';
import { useMemo } from 'react';
import { WorkoutHistoryEmptyState } from '../components/workout-history-empty-state';
import { useTrainingHistoryQuery } from '../hooks/use-training-history-query';

export interface WorkoutHistoryContainerProps {
  muscleGroupId?: string;
  className?: string;
}

export function WorkoutHistoryContainer({
  muscleGroupId,
  className = 'px-4 mb-24',
}: WorkoutHistoryContainerProps) {
  const { data: trainings = [], isLoading } = useTrainingHistoryQuery(muscleGroupId);

  const trainingHistory = useMemo(
    () =>
      trainings.reduce(
        (acc, training) => {
          const date = training.date;
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(training);
          return acc;
        },
        {} as Record<string, Training[]>
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
          {Object.entries(trainingHistory).map(([date, trainings], trainingIndex) => (
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
