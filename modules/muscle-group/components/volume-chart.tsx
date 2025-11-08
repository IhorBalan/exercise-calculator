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
  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
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
  );
}
