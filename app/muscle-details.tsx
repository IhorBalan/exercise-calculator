import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Sample data - would be dynamic based on muscle group
const personalRecords = [
  { exercise: 'Bench Press', date: 'Nov 5, 2025', weight: '100 kg', reps: '5 reps' },
  { exercise: 'Incline Press', date: 'Nov 3, 2025', weight: '80 kg', reps: '8 reps' },
  { exercise: 'Dumbbell Fly', date: 'Nov 1, 2025', weight: '30 kg', reps: '12 reps' },
];

const workoutHistory = [
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
];

// Simple chart data for the last 5 weeks
const chartData = [
  { week: 'Week 1', value: 3200 },
  { week: 'Week 2', value: 3800 },
  { week: 'Week 3', value: 3500 },
  { week: 'Week 4', value: 4500 },
  { week: 'Week 5', value: 4200 },
];

export default function MuscleDetailsScreen() {
  const params = useLocalSearchParams();
  const muscleName = (params.name as string) || 'Chest';
  const muscleEmoji = (params.emoji as string) || '💪';
  const volume = (params.volume as string) || '4.2k kg';
  const growth = (params.growth as string) || '+31.3%';

  return (
    <SafeAreaView className="flex-1 bg-blue-50" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-8 pb-1 gap-1">
          <Pressable
            onPress={() => router.back()}
            className="w-9 h-9 rounded-xl bg-white items-center justify-center mb-4 active:opacity-80"
          >
            <Ionicons name="arrow-back" size={16} color="#000000" />
          </Pressable>

          <View className="flex-row items-center gap-3 mb-3">
            <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center">
              <Text className="text-xl">{muscleEmoji}</Text>
            </View>
            <Text className="text-slate-900 text-base tracking-tight">{muscleName}</Text>
          </View>

          <Text className="text-slate-600 text-base tracking-tight">
            Track your progress and personal records
          </Text>
        </View>

        {/* Volume Chart Card */}
        <View className="mx-4 mt-3 p-6 bg-white rounded-3xl shadow-sm">
          {/* Current Volume Header */}
          <View className="flex-row items-start justify-between mb-8">
            <View className="gap-1">
              <Text className="text-slate-600 text-base tracking-tight">Current Volume</Text>
              <Text className="text-slate-900 text-lg font-medium tracking-tight">{volume}</Text>
            </View>
            <View className="bg-blue-100 px-4 py-2 rounded-2xl flex-row items-center gap-1">
              <Ionicons name="trending-up" size={20} color="#3b82f6" />
              <Text className="text-blue-500 text-base tracking-tight">{growth}</Text>
            </View>
          </View>

          {/* Chart Placeholder - Simple visualization */}
          <View className="gap-2">
            <Text className="text-slate-500 text-sm tracking-tight">Last 5 weeks</Text>
            <View className="h-48 mt-4">
              {/* Simple bar representation */}
              <View className="flex-1 flex-row items-end justify-between gap-2">
                {chartData.map((item, index) => {
                  const maxValue = Math.max(...chartData.map(d => d.value));
                  const heightPercent = (item.value / maxValue) * 100;
                  return (
                    <View key={index} className="flex-1 items-center gap-2">
                      <View className="flex-1 justify-end items-center w-full">
                        <View
                          className="w-full bg-blue-500 rounded-t-lg"
                          style={{ height: `${heightPercent}%` }}
                        />
                      </View>
                      <Text className="text-slate-400 text-xs">{item.week}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>

        {/* Personal Records Section */}
        <View className="px-4 mt-6">
          <View className="flex-row items-center gap-2 mb-4">
            <Ionicons name="trophy" size={20} color="#0f172b" />
            <Text className="text-slate-900 text-base tracking-tight">Personal Records</Text>
          </View>

          <View className="gap-3">
            {personalRecords.map((record, index) => (
              <View
                key={index}
                className="bg-white p-4 rounded-2xl shadow-sm flex-row items-center justify-between"
              >
                <View className="flex-1 gap-1">
                  <Text className="text-slate-900 text-base tracking-tight">{record.exercise}</Text>
                  <Text className="text-slate-500 text-sm tracking-tight">{record.date}</Text>
                </View>
                <View className="items-end gap-0.5">
                  <Text className="text-slate-900 text-base tracking-tight">{record.weight}</Text>
                  <Text className="text-slate-500 text-sm tracking-tight">{record.reps}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Workout History Section */}
        <View className="px-4 mt-6 mb-6">
          <View className="flex-row items-center gap-2 mb-4">
            <Ionicons name="time" size={20} color="#0f172b" />
            <Text className="text-slate-900 text-base tracking-tight">Workout History</Text>
          </View>

          <View className="gap-4">
            {workoutHistory.map((workout, workoutIndex) => (
              <View key={workoutIndex} className="bg-white p-5 rounded-3xl shadow-sm gap-10">
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
                        <Text className="text-slate-900 text-base tracking-tight">
                          {exercise.name}
                        </Text>
                        <Text className="text-slate-600 text-base tracking-tight">
                          {exercise.volume}
                        </Text>
                      </View>
                      <Text className="text-slate-500 text-sm tracking-tight">
                        {exercise.sets} sets • {exercise.reps} reps • {exercise.weight}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
