import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export function WorkoutHistoryEmptyState() {
  return (
    <View className="bg-white p-6 rounded-3xl shadow-sm items-center justify-center">
      <View className="w-16 h-16 bg-fuchsia-100 rounded-full items-center justify-center mb-4">
        <Ionicons name="calendar-outline" size={32} color="#d946ef" />
      </View>
      <Text className="text-slate-900 text-base font-medium tracking-tight mb-1">
        No workouts yet
      </Text>
      <Text className="text-slate-500 text-sm max-w-[250px] text-center tracking-tight">
        Start tracking your workouts to see your history here
      </Text>
    </View>
  );
}
