import { WorkoutHistoryEmptyState } from '@/modules/training/components/workout-history-empty-state';
import { Training } from '@/modules/training/types/training.types';
import { getTrainingVolume } from '@/modules/volume/utils/volume.utils';
import { Ionicons } from '@expo/vector-icons';
import { format, startOfDay } from 'date-fns';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useTrainingHistoryOfExerciseQuery } from '../hooks/use-training-history-of-exercise-query';

export function TrainingHistoryOfExerciseContainer({ exerciseId }: { exerciseId: string }) {
  const { data: trainings = [], isLoading } = useTrainingHistoryOfExerciseQuery(exerciseId);

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
        {} as Record<string, Training[]>
      ),
    [trainings]
  );
  return (
    <View className="">
      <View className="flex-row items-center gap-2 mb-4">
        <Text className="text-slate-900 text-base font-medium tracking-tight mb-2">
          Training History
        </Text>
      </View>

      {isLoading ? (
        <View className="bg-white p-8 rounded-3xl shadow-sm items-center justify-center">
          <Text className="text-slate-500 text-sm mt-3">Loading training history...</Text>
        </View>
      ) : trainings.length === 0 ? (
        <WorkoutHistoryEmptyState />
      ) : (
        <View className="gap-6">
          {Object.entries(trainingHistory)
            .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
            .map(([date, trainings], trainingIndex) => (
              <View key={trainingIndex} className="gap-4">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <Ionicons name="calendar-outline" size={20} color="#000" />
                    <Text className="text-slate-900 text-base tracking-tight">
                      {format(date, 'MMM d, yyyy')}
                    </Text>
                  </View>
                  <View className="bg-blue-100 px-2 py-1 rounded-lg">
                    <Text className="text-blue-500 text-xs font-medium">
                      {trainings.length} trainings
                    </Text>
                  </View>
                </View>

                <View className="gap-3">
                  {trainings.map((training, trainingIndex) => (
                    <View
                      key={trainingIndex}
                      className="bg-slate-50 p-3 rounded-xl gap-2 border border-slate-100"
                    >
                      <View className="flex-row items-start justify-between">
                        <Text className="text-slate-900 text-base tracking-tight">
                          {format(training.date, 'HH:mm')}
                        </Text>
                        <Text className="text-slate-600 text-base tracking-tight">
                          {getTrainingVolume(training)} kg
                        </Text>
                      </View>
                      <Text className="text-slate-500 text-sm tracking-tight">
                        {training.sets} sets • {training.reps} reps • {training.weight} kg
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
        </View>
      )}
    </View>
  );
}
