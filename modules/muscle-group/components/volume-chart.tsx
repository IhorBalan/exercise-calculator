import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export interface ChartDataPoint {
  week: string;
  value: number;
}

export interface VolumeChartProps {
  volume: string;
  growth: string;
  chartData: ChartDataPoint[];
}

export function VolumeChart({ volume, growth, chartData }: VolumeChartProps) {
  const hasData = chartData.length > 0 && chartData.some(d => d.value > 0);
  const maxValue = hasData ? Math.max(...chartData.map(d => d.value)) : 0;

  return (
    <View className="mx-4 bg-white rounded-3xl shadow-sm">
      {/* Current Volume Header */}
      {hasData && growth && (
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
      )}

      {/* Chart or Empty State */}
      {hasData ? (
        <View className="gap-2">
          <Text className="text-slate-500 text-sm tracking-tight">Last 5 weeks</Text>
          <View className="h-48 mt-4">
            {/* Simple bar representation */}
            <View className="flex-1 flex-row items-end justify-between gap-2">
              {chartData.map((item, index) => {
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
      ) : (
        <View className="items-center justify-center p-6">
          <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4">
            <Ionicons name="bar-chart-outline" size={32} color="#3b82f6" />
          </View>
          <Text className="text-slate-900 text-base font-medium tracking-tight mb-1">
            No activity for last 7 days
          </Text>
          <Text className="text-slate-500 text-sm max-w-[250px] text-center tracking-tight">
            Log workouts for a few days to see your volume progress
          </Text>
        </View>
      )}
    </View>
  );
}
