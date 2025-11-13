import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export interface WeeklyActivityDataPoint {
  day: string;
  value: number;
  percentage: number;
}

export function WeeklyActivityCard() {
  const data = [];

  return (
    <View className="mx-4 mt-6 p-6 bg-white rounded-3xl shadow-sm">
      {/* Bar Chart */}
      {data.length === 0 ? (
        <View className="items-center justify-center">
          <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4">
            <Ionicons name="bar-chart-outline" size={32} color="#3b82f6" />
          </View>
          <Text className="text-slate-900 text-base font-medium tracking-tight mb-1">
            Weekly Activity
          </Text>
          <Text className="text-slate-500 text-sm max-w-[250px] text-center tracking-tight">
            Log workouts for a few days to see your weekly activity progress
          </Text>
        </View>
      ) : (
        <View className="flex-row items-end justify-between h-28 mb-3">
          {data.map((item, index) => (
            <View key={index} className="flex-1 items-center justify-end h-full gap-2">
              <Text className="text-slate-900 text-base font-medium tracking-tight mb-5">
                Weekly Activity
              </Text>
              <View className="flex-1 justify-end w-full items-center">
                {item.value > 0 && (
                  <View
                    className="w-8 bg-blue-500 rounded-t-lg"
                    style={{ height: `${item.percentage * 100}%` }}
                  />
                )}
              </View>
              <Text className="text-slate-400 text-xs">{item.day}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
