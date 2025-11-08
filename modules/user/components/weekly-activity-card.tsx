import { Text, View } from 'react-native';

export interface WeeklyActivityDataPoint {
  day: string;
  value: number;
  percentage: number;
}

export interface WeeklyActivityCardProps {
  data: WeeklyActivityDataPoint[];
}

export function WeeklyActivityCard({ data }: WeeklyActivityCardProps) {
  return (
    <View className="mx-4 mt-6 p-6 bg-white rounded-3xl shadow-sm">
      <Text className="text-slate-900 text-base font-medium tracking-tight mb-5">
        Weekly Activity
      </Text>

      {/* Bar Chart */}
      <View className="flex-row items-end justify-between h-28 mb-3">
        {data.map((item, index) => (
          <View key={index} className="flex-1 items-center justify-end h-full gap-2">
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
    </View>
  );
}
