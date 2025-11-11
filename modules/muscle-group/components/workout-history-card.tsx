import { Training } from '@/modules/training/types/training.types';
import { format } from 'date-fns';
import { Text, View } from 'react-native';

export interface Exercise {
  name: string;
  volume: string;
  sets: number;
  reps: number;
  weight: string;
}

export interface WorkoutHistoryCardProps {
  date: string;
  trainingCount: number;
  trainings: Training[];
}

export function WorkoutHistoryCard({ date, trainingCount, trainings }: WorkoutHistoryCardProps) {
  return (
    <View className="bg-white p-6 rounded-3xl shadow-sm gap-6">
      {/* Workout Header */}
      <View className="flex-row items-center justify-between">
        <Text className="text-slate-900 text-base tracking-tight">
          {format(date, 'MMM d, yyyy')}
        </Text>
        <View className="bg-blue-100 px-2 py-1 rounded-lg">
          <Text className="text-blue-500 text-xs font-medium">{trainingCount} trainings</Text>
        </View>
      </View>

      {/* Exercise List */}
      <View className="gap-3">
        {trainings.map((training, trainingIndex) => (
          <View
            key={trainingIndex}
            className="bg-slate-50 p-3 rounded-xl gap-2 border border-slate-100"
          >
            <View className="flex-row items-start justify-between">
              <Text className="text-slate-900 text-base tracking-tight">{'exercise.name'}</Text>
              <Text className="text-slate-600 text-base tracking-tight">{'exercise.volume'}</Text>
            </View>
            <Text className="text-slate-500 text-sm tracking-tight">
              {training.sets} sets • {training.reps} reps • {training.weight}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
