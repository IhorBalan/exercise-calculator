import { Text, View } from 'react-native';

export interface Exercise {
  name: string;
  volume: string;
  sets: number;
  reps: number;
  weight: string;
}

export interface WorkoutHistory {
  date: string;
  exerciseCount: number;
  exercises: Exercise[];
}

export interface WorkoutHistoryCardProps {
  workout: WorkoutHistory;
}

export function WorkoutHistoryCard({ workout }: WorkoutHistoryCardProps) {
  return (
    <View className="bg-white p-5 rounded-3xl shadow-sm gap-10">
      {/* Workout Header */}
      <View className="flex-row items-center justify-between">
        <Text className="text-slate-900 text-base tracking-tight">{workout.date}</Text>
        <View className="bg-blue-100 px-2 py-1 rounded-lg">
          <Text className="text-blue-500 text-xs font-medium">
            {workout.exerciseCount} exercises
          </Text>
        </View>
      </View>

      {/* Exercise List */}
      <View className="gap-3">
        {workout.exercises.map((exercise, exerciseIndex) => (
          <View key={exerciseIndex} className="bg-slate-50 p-3 rounded-2xl gap-2">
            <View className="flex-row items-start justify-between">
              <Text className="text-slate-900 text-base tracking-tight">{exercise.name}</Text>
              <Text className="text-slate-600 text-base tracking-tight">{exercise.volume}</Text>
            </View>
            <Text className="text-slate-500 text-sm tracking-tight">
              {exercise.sets} sets • {exercise.reps} reps • {exercise.weight}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
