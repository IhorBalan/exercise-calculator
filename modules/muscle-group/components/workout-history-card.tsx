import { type Exercise } from '@/modules/exercise/types/exercise.types';
import { Training } from '@/modules/training/types/training.types';
import { getTrainingVolume } from '@/modules/volume/utils/volume.utils';
import { format } from 'date-fns';
import { Text, View } from 'react-native';

export interface WorkoutHistoryCardProps {
  date: string;
  trainingCount: number;
  trainings: (Training & { exercise: Exercise })[];
}

export function WorkoutHistoryCard({ date, trainingCount, trainings }: WorkoutHistoryCardProps) {
  return (
    <View className="bg-white p-4 rounded-3xl shadow-sm gap-6">
      <View className="flex-row items-center justify-between">
        <Text className="text-slate-900 text-base tracking-tight">
          {format(date, 'MMM d, yyyy')}
        </Text>
        <View className="bg-blue-100 px-2 py-1 rounded-lg">
          <Text className="text-blue-500 text-xs font-medium">{trainingCount} trainings</Text>
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
                {training.exercise.name}
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
  );
}
